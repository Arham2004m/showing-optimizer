"use client";

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const iconUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png';
const iconRetinaUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png';
const shadowUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function ItineraryMap({ stops }: { stops: any[] }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-brand-card border border-brand-border rounded-xl shadow-sm h-[300px] md:h-[400px] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-2 text-brand-text-secondary">
          <span className="material-symbols-outlined text-[32px]">map</span>
          <p className="text-[14px]">Loading map...</p>
        </div>
      </div>
    );
  }

  const validStops = stops.filter(s => s.latlng);
  const parsedBounds = validStops.map(s => {
    let lat = 0, lng = 0;
    if (typeof s.latlng === 'string') {
      const match = s.latlng.match(/\(([^,]+),([^)]+)\)/);
      if (match) {
        lat = parseFloat(match[1]);
        lng = parseFloat(match[2]);
      }
    } else if (Array.isArray(s.latlng)) {
      lat = s.latlng[0];
      lng = s.latlng[1];
    } else if (s.latlng && s.latlng.lat !== undefined) {
      lat = s.latlng.lat;
      lng = s.latlng.lng;
    }
    return [lat, lng] as [number, number];
  }).filter(b => b[0] !== 0 || b[1] !== 0);

  const bounds: L.LatLngBoundsExpression = parsedBounds.length > 0
    ? parsedBounds
    : [[37.7749, -122.4194], [37.7749, -122.4194]];

  const center = bounds[0] as [number, number];

  return (
    <div className="bg-brand-card border border-brand-border rounded-xl overflow-hidden shadow-sm h-[300px] md:h-[400px] relative z-0">
      <MapContainer
        center={center}
        zoom={12}
        bounds={parsedBounds.length > 1 ? bounds : undefined}
        style={{ height: '100%', width: '100%', zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        {validStops.map((stop, i) => {
          let lat = 0, lng = 0;
          if (typeof stop.latlng === 'string') {
            const match = stop.latlng.match(/\(([^,]+),([^)]+)\)/);
            if (match) {
              lat = parseFloat(match[1]);
              lng = parseFloat(match[2]);
            }
          } else if (Array.isArray(stop.latlng)) {
            lat = stop.latlng[0];
            lng = stop.latlng[1];
          } else if (stop.latlng && stop.latlng.lat !== undefined) {
            lat = stop.latlng.lat;
            lng = stop.latlng.lng;
          }

          if (!lat || !lng) return null;

          return (
            <Marker key={stop.id} position={[lat, lng]}>
              <Popup>
                <div className="text-[14px] font-semibold">{stop.address}</div>
                {stop.scheduled_time && (
                  <div className="text-[12px] text-brand-text-secondary mt-1">
                    {new Date(stop.scheduled_time).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                  </div>
                )}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
      <div className="absolute bottom-4 right-4 bg-brand-bg/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-brand-border text-[12px] font-medium leading-[1] tracking-[0.05em] text-brand-text shadow-sm z-[1000] pointer-events-none">
        Route Overview
      </div>
    </div>
  );
}
