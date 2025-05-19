import mongoose, { Schema, Document } from 'mongoose';

export interface AlertDocument extends Document {
  reliefwebId: string;
  title: string;
  date: Date;
  type: string;
  country: string;
  status: string;
  description?: string;
  url?: string;
  location?: {
    type: 'Point';
    coordinates: [number, number];
  };
  embedding?: number[];
  
}

const AlertSchema = new Schema<AlertDocument>({
  reliefwebId: { type: String, unique: true, required: true },
  title: { type: String, required: true },
  date: { type: Date, required: true },
  type: { type: String, required: true },
  country: { type: String, required: true },
  status: { type: String, required: true },
  description: { type: String },
  url: { type: String },
    location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  },
  embedding: {
    type: [Number],
    required: false,
   
  },
});

const Alert = mongoose.models.Alert || mongoose.model<AlertDocument>('Alert', AlertSchema);

export default Alert;
