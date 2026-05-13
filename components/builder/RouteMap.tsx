"use client";
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix standard marker icon issue in Leaflet + Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function FitBounds({ geometry }: { geometry: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (geometry.length > 0) {
      const bounds = L.latLngBounds(geometry.map(coord => [coord[1], coord[0]] as [number, number]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [geometry, map]);
  return null;
}

export default function RouteMap({ geometry, waypoints }: { geometry: [number, number][], waypoints: [number, number][] }) {
  const hasRoute = geometry && geometry.length > 0;
  
  // ORS returns [lng, lat], Leaflet needs [lat, lng]
  const polylineCoords = hasRoute ? geometry.map(coord => [coord[1], coord[0]] as [number, number]) : [];

  return (
    <div className="flex-1 min-h-[300px] border border-brand-border rounded-md overflow-hidden relative z-0">
      <MapContainer 
        center={[39.8283, -98.5795]} 
        zoom={4} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {hasRoute && (
          <>
            <Polyline positions={polylineCoords} color="#3b82f6" weight={5} opacity={0.8} />
            <FitBounds geometry={geometry} />
            {waypoints?.map((wp, i) => (
               <Marker key={i} position={[wp[1], wp[0]]} />
            ))}
          </>
        )}
      </MapContainer>
    </div>
  );
}
