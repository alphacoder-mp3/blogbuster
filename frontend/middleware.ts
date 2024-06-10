import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token'); // Retrieve the token from the cookies

  if (token) {
    req.headers.set('Authorization', `Bearer ${token}`);
  }

  return NextResponse.next({
    request: {
      headers: req.headers,
    },
  });
}

// Specify the routes where you want the middleware to run
export const config = {
  matcher: ['/api/v1/blog'],
};
