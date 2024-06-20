import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token'); // Retrieve the token from the cookies
  const authRoutes = ['/', '/dashboard', '/profile', '/settings'];
  console.log({ req });
  console.log('Request URL:', req.nextUrl.pathname); // Log the request URL
  console.log('Token:', token);
  if (authRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL('/signin', req.url)); // Redirect to /signin if no token is present
    }
  }

  if (req.nextUrl.pathname.startsWith('/')) {
    return NextResponse.rewrite(new URL('/signin', req.url));
  }
  if (token) {
    req.headers.set('Authorization', `${token}`);
  }

  return NextResponse.next({
    request: {
      headers: req.headers,
    },
  });
}

// Specify the routes where you want the middleware to run
export const config = {
  matcher: ['/api/v1/blog', '/', '/*', '/:path*'],
};
