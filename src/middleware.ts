import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'default-fallback-secret-dr-yasmen-dash-32-chars-long'
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // We only protect paths starting with /admin, excluding /admin/login
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const tokenCookie = request.cookies.get('admin_session');

    if (!tokenCookie) {
      // Redirect to login page if no session cookie exists
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }

    try {
      // Verify token is valid and not expired
      await jwtVerify(tokenCookie.value, JWT_SECRET);
      return NextResponse.next();
    } catch (error) {
      // Invalid/expired token: clear cookie and redirect to login
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.cookies.delete('admin_session');
      return response;
    }
  }

  // Prevent logged-in users from accessing the login page again
  if (pathname === '/admin/login') {
    const tokenCookie = request.cookies.get('admin_session');
    if (tokenCookie) {
      try {
        await jwtVerify(tokenCookie.value, JWT_SECRET);
        // If valid, redirect to admin home
        return NextResponse.redirect(new URL('/admin', request.url));
      } catch (error) {
        // If invalid, let it pass (cookie will be cleared or overwritten during login)
      }
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/admin/:path*', '/admin'],
};
