import fetch from 'node-fetch';
import mongoose, { Schema, Document, Model } from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import * as vertex from '@google-cloud/aiplatform';

// Point to service account key file
// const keyFilePath = path.join(process.cwd(), 'keys', 'vertex-key.json');
const keyFilePath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

const { PredictionServiceClient } = vertex.v1;

const client = new PredictionServiceClient({
  keyFilename: keyFilePath,
  projectId: process.env.projectID,
});

export default client;


const location = 'us-central1';
const model = 'textembedding-gecko@001';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is not defined in .env file');
}

// Embedding
export async function getEmbedding(text: string): Promise<number[]> {
  const request = {
    endpoint: `projects/rosy-proposal-420211/locations/${location}/publishers/google/models/${model}`,
    
    instances: [{ stringValue: text }],
  };

  interface PredictionResponse {
    predictions?: {
      embeddings?: {
        values?: number[];
      };
    }[];
  }

  const response = await client.predict(request) as PredictionResponse;
  const embeddings = response.predictions?.[0]?.embeddings?.values;

  if (!embeddings) throw new Error('Failed to retrieve embeddings');

  return embeddings;
}

// Alert Model
interface IAlert extends Document {
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

const AlertSchema = new Schema<IAlert>({
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

// Get existing model or create new one
const Alert: Model<IAlert> = mongoose.models.Alert || mongoose.model<IAlert>('Alert', AlertSchema);

// ReliefWeb Model
interface ReliefWebDisaster {
  id: string;
  fields: {
    name: string;
    date: {
      created: string;
    };
    type: string[];
    country: {
      name: string;
    }[];
    status: string;
    description?: string;
    url?: string;
  };
}

interface ReliefWebResponse {
  data: ReliefWebDisaster[];
}

// Database connection function
async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI as string);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
}

// 4. Main data fetching function
async function fetchReliefWebData() {
  try {
    await connectToDatabase();

    const url = 'https://api.reliefweb.int/v1/disasters?appname=rwint-user-0&profile=list&preset=latest&slim=1';

    console.log('⏳ Fetching ReliefWeb data...');
    const res = await fetch(url);
    
    if (!res.ok) {
      throw new Error(`Failed to fetch ReliefWeb data: ${res.statusText}`);
    }

    const json: ReliefWebResponse = await res.json();
    const disasters = json.data;

    if (!disasters || !disasters.length) {
      console.log('ℹ️ No disasters found in the response');
      return;
    }

    console.log(`📊 Found ${disasters.length} disasters to process`);

    // Process each disaster
    const results = await Promise.allSettled(
      disasters.map(async (disaster) => {
        const {
          id,
          fields: { name, date, type, country, status, description, url },
        } = disaster;

        // Normalize data
        const disasterDate = new Date(date.created);
        const countryName = country.map(c => c.name).join(', ');
        const disasterType = type.join(', ');

        let embedding: number[] | undefined = undefined;

try {
  embedding = await getEmbedding(name + ' ' + (description || ''));
} catch (embeddingError) {
  console.warn(`⚠️ Failed to embed disaster ${id}:`, embeddingError);
}

        await Alert.findOneAndUpdate(
          { reliefwebId: id },
          {
            reliefwebId: id,
            title: name,
            date: disasterDate,
            type: disasterType,
            country: countryName,
            status,
            description,
            url,
             embedding,
          },
          { upsert: true, new: true }
        );

        return id;
      })
    );

    // Analyze results
    const successful = results.filter(r => r.status === 'fulfilled').length;
    const failed = results.filter(r => r.status === 'rejected').length;

    console.log(`✅ Successfully processed ${successful} alerts`);
    if (failed > 0) {
      console.warn(`⚠️ Failed to process ${failed} alerts`);
    }

  } catch (error) {
    console.error('❌ Error in fetchReliefWebData:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🛑 MongoDB connection closed');
    process.exit(0);
  }
}

// Run the script
fetchReliefWebData();