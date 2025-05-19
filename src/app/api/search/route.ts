import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Alert from '../../../models/Alert';
import { getEmbedding } from '../../../lib/embedding';

const MONGODB_URI = process.env.MONGODB_URI;

async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(MONGODB_URI as string);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const query = body.query;
    if (!query || typeof query !== 'string') {
      return NextResponse.json({ message: 'Query is required and must be a string' }, { status: 400 });
    }

    await connectToDatabase();

    const queryEmbedding = await getEmbedding(query);

    const results = await Alert.aggregate([
      {
        $search: {
          index: 'default',
          knnBeta: {
            vector: queryEmbedding,
            path: 'embedding',
            k: 5,
          },
        },
      },
      {
        $project: {
          reliefwebId: 1,
          title: 1,
          date: 1,
          type: 1,
          country: 1,
          status: 1,
          description: 1,
          url: 1,
          score: { $meta: 'searchScore' },
        },
      },
    ]);

    return NextResponse.json({ results });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
