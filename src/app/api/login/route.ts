import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {connectToDatabase} from '../../../lib/mongodb';
import User from '../../../models/User';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: NextRequest) {
  await connectToDatabase();
  const { email, password } = await req.json();

  const user = await User.findOne({ email });
  if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 });

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });

  const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

  return NextResponse.json({ token, user: { name: user.name, email: user.email } });
}
