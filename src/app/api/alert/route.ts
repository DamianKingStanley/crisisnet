import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import Alert from '../../../models/Alert';

export async function GET() {
  await connectToDatabase();

  try {
    const alerts = await Alert.find().sort({ date: -1 }).limit(100).lean();
    return NextResponse.json(alerts, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch alerts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  await connectToDatabase();

  try {
    const data = await request.json();
    const alert = await Alert.create(data);
    return NextResponse.json(alert, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create alert' }, { status: 500 });
  }
}
