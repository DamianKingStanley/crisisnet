import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAlert extends Document {
  reliefwebId: string;
  title: string;
  date: Date;
  type: string;
  country: string;
  status: string;
  description?: string;
  url?: string;
}

const AlertSchema = new Schema<IAlert>({
  reliefwebId: { type: String, unique: true, required: true },
  title: { type: String, required: true },
  date: { type: Date, required: true },
  type: { type: String, required: true },
  country: { type: String, required: true },
  status: { type: String, required: true },
  description: { type: String },
  url: { type: String },
});

// Check if model already exists to prevent OverwriteModelError
const Alert: Model<IAlert> = mongoose.models.Alert || mongoose.model<IAlert>('Alert', AlertSchema);

export default Alert;