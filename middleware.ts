// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const PUBLIC_PATHS = ['/login'];

export function middleware(req: NextRequest) {
  const token = req.cookies.get('crisis-token')?.value || '';

  const isPublic = PUBLIC_PATHS.some(path => req.nextUrl.pathname.startsWith(path));

  if (!isPublic && !token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/alert/:path*'],
};
