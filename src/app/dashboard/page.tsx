'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

import { Alert } from '../../types/alert';
import dynamic from 'next/dynamic';


const MapView = dynamic(() => import('../../components/MapView'), { ssr: false });
interface AlertWithLocation extends Alert {
  location: {
    lat: number;
    lng: number;
  };
}

export default function Dashboard() {
  const [alerts, setAlerts] = useState<AlertWithLocation[]>([]);
  const router = useRouter();

  const logout = () => {
    Cookies.remove('token');
    router.push('/login');
  };

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await axios.get('/api/alert');
        const mappedAlerts: AlertWithLocation[] = res.data.alerts.map(
          (alert: Alert & { latitude?: number; longitude?: number }) => ({
            ...alert,
            location: {
              lat: alert.latitude || 0,
              lng: alert.longitude || 0,
            },
          })
        );
        setAlerts(mappedAlerts);
      } catch (error) {
        console.error('Failed to fetch alerts:', error);
      }
    };
    fetchAlerts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 pt-24">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Disaster Alert Dashboard</h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="bg-white shadow rounded-lg p-4">
        <ul>
          {alerts.map((alert) => (
            <li key={alert._id} className="py-2">
              <h3 className="font-medium">{alert.title}</h3>
              <p className="text-sm text-gray-600">{alert.date}</p>
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <MapView alerts={alerts} />
        </div>
      </div>
    </div>
  );
}
