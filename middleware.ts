import { NextResponse, type NextRequest } from 'next/server';

// Simple middleware that doesn't enforce authentication
// This allows your app to work while you fix the authentication issues
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  /*
   * Playwright starts the dev server and requires a 200 status to
   * begin the tests, so this ensures that the tests can start
   */
  if (pathname.startsWith('/ping')) {
    return new Response('pong', { status: 200 });
  }

  // Public paths that don't require authentication check
  if (
    pathname.startsWith('/api/') ||
    pathname === '/' ||
    pathname.startsWith('/auth/') ||
    pathname.startsWith('/demo')
  ) {
    return NextResponse.next();
  }

  // For now, we'll let all paths through without authentication checks
  // This will be handled by the ProtectedRoute component with DEV_MODE=true
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/chat/:id',
    '/api/:path*',
    '/login',
    '/register',

    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
