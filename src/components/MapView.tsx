'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { Alert } from '../types/alert';

delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface AlertWithLocation extends Alert {
  location: {
    lat: number;
    lng: number;
  };
}

interface MapViewProps {
  alerts: AlertWithLocation[];
}

export default function MapView({ alerts }: MapViewProps) {
  const defaultCenter: [number, number] = [0, 0];
  const center: [number, number] =
    alerts.length > 0
      ? [
          alerts.reduce((sum, alert) => sum + alert.location.lat, 0) / alerts.length,
          alerts.reduce((sum, alert) => sum + alert.location.lng, 0) / alerts.length,
        ]
      : defaultCenter;

  return (
    <div className="h-[500px] w-full rounded-lg shadow">
      <MapContainer center={center} zoom={5} className="h-full w-full z-0">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {alerts.map((alert) => (
          <Marker key={alert._id} position={[alert.location.lat, alert.location.lng]}>
            <Popup>
              <strong>{alert.title}</strong>
              <br />
              {alert.country}
              <br />
              {new Date(alert.date).toLocaleDateString()}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
