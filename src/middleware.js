import { NextResponse } from 'next/server';

export function middleware(req) {
  const { nextUrl: url } = req;
  const pathname = url.pathname;

  // List of non-existent URLs
  const nonExistentPaths = [
    '/2d-3d-animation-course-in-lahore',
    '/page2',
    '/page3'
    // Add all paths that should return 410
  ];

  // 1. Return 410 for non-existent paths
  if (nonExistentPaths.includes(pathname)) {
    return new NextResponse('Page has been permanently removed.', { status: 410 });
  }

  // 2. Check if URL contains a query string (redirect to 404)
  if (url.search) {
    const redirectUrl = new URL('/404', url.origin);
    return NextResponse.redirect(redirectUrl);
  }

  // 3. Check if pathname ends with .html or .txt (except robots.txt)
  if (pathname !== '/robots.txt' && (pathname.endsWith('.html') || pathname.endsWith('.txt'))) {
    const redirectUrl = new URL('/404', url.origin);
    return NextResponse.redirect(redirectUrl);
  }

  // Proceed to the next middleware or request handler
  return NextResponse.next();
}
