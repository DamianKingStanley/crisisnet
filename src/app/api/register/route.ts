import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import {connectToDatabase} from '../../../lib/mongodb';
import User from '../../../models/User';

export async function POST(req: NextRequest) {
  await connectToDatabase();
  const { name, email, password } = await req.json();

  const existing = await User.findOne({ email });
  if (existing) return NextResponse.json({ message: 'Email already exists' }, { status: 400 });

  const passwordHash = await bcrypt.hash(password, 10);
  await User.create({ name, email, passwordHash });

  return NextResponse.json({ message: 'User created' }, { status: 201 });
}
