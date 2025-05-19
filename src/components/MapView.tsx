'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { Alert } from '../types/alert';


// Fix marker icon issue in Next.js
// Type assertion to unknown before casting to any to avoid 'any' directly
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// interface Alert {
//   _id: string;
//   title: string;
//   country: string;
//   date: string;
//   location: { lat: number; lng: number };
// }

interface MapViewProps {
  alerts: Alert[];
}

export default function MapView({ alerts }: MapViewProps) {
 

  return (
    <div className="h-[500px] w-full rounded-lg shadow">
      <MapContainer className="h-full w-full z-0">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {alerts.map((alert) => (
          <Marker
            key={alert._id}
            position={[alert.location.lat, alert.location.lng]}
          >
            <Popup>
              <strong>{alert.title}</strong><br />
              {alert.country}<br />
              {new Date(alert.date).toLocaleDateString()}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
