import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { startAddress, properties, startTime } = await request.json();

    if (!startAddress || !properties || properties.length === 0) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    const apiKey = process.env.NEXT_PUBLIC_ORS_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Missing ORS API Key' }, { status: 500 });
    }

    // Geocode Helper
    const geocode = async (address: string) => {
      const res = await fetch(`https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${encodeURIComponent(address)}`);
      const data = await res.json();
      if (!data.features || data.features.length === 0) throw new Error(`Geocoding failed for ${address}`);
      return data.features[0].geometry.coordinates; // [lng, lat]
    };

    // Step A: Geocode all addresses
    const startCoord = await geocode(startAddress);
    const propCoords = await Promise.all(properties.map((p: string) => geocode(p)));
    
    const allCoords = [startCoord, ...propCoords];

    // Step B: Get Directions
    const dirRes = await fetch('https://api.openrouteservice.org/v2/directions/driving-car/geojson', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey
      },
      body: JSON.stringify({
        coordinates: allCoords
      })
    });

    const dirData = await dirRes.json();
    if (dirData.error) {
      return NextResponse.json({ error: dirData.error.message }, { status: 500 });
    }

    const route = dirData.features[0];
    const segments = route.properties.segments;
    const geometry = route.geometry.coordinates;

    // Step C: Calculate Times
    const [startHour, startMinute] = (startTime || "09:00").split(':').map(Number);
    let currentTime = new Date();
    currentTime.setHours(startHour, startMinute, 0, 0);

    const formatTime = (d: Date) => {
      return new Intl.DateTimeFormat("en-US", { hour: "2-digit", minute: "2-digit" }).format(d);
    };

    const formatDuration = (seconds: number) => {
      const m = Math.round(seconds / 60);
      return `${m} min drive`;
    };

    const itinerary = [];
    
    itinerary.push({
      address: startAddress,
      arrivalTime: formatTime(currentTime),
      departureTime: formatTime(currentTime),
      travelToNext: formatDuration(segments[0].duration),
      isStart: true
    });

    for (let i = 0; i < properties.length; i++) {
      const travelSecs = segments[i].duration;
      currentTime = new Date(currentTime.getTime() + travelSecs * 1000);
      
      const arrTime = formatTime(currentTime);
      
      currentTime = new Date(currentTime.getTime() + 30 * 60000); // 30 min showing
      const depTime = formatTime(currentTime);

      const toNext = i < properties.length - 1 ? formatDuration(segments[i+1].duration) : null;

      itinerary.push({
        address: properties[i],
        arrivalTime: arrTime,
        departureTime: depTime,
        travelToNext: toNext,
        isStart: false
      });
    }

    return NextResponse.json({ itinerary, geometry, waypoints: allCoords });

  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
