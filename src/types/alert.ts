export interface Alert {
  reliefwebId: string;
  title: string;
  date: string;
  type: string;
  country: string;
  status: string;
  description?: string;
  url?: string;
  score: number;
_id?: string;
latitude?: number;
longitude?: number;
[key: string]: unknown;
location: { lat: number; lng: number };

    

}
