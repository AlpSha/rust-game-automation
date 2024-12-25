import { NextRequest, NextResponse } from 'next/server';

export default function middleware(req: NextRequest) {
  const url = new URL(req.url);

  // Handle root path "/"
  if (url.pathname === '/') {
    // Redirect to the orders path
    const redirectPath = `/orders`;
    return NextResponse.redirect(new URL(redirectPath, req.url));
  }

  return NextResponse.next();
}

export const config = {};
