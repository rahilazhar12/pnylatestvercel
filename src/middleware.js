import { NextResponse } from 'next/server';

export function middleware(req) {
  const { nextUrl: url } = req;
  const pathname = url.pathname;

  // List of non-existent URLs
  const nonExistentPaths = [
    '/2d-3d-animation-course-in-lahore',
    '/blog/business/5-easy-ways-to-make-money-online-from-home.txt',
    '/https://www.pnytrainings.com/course/private-label-and-wholesale-business-on-amazon-course-in-lahore-pakistan',
    '/https://www.pnytrainings.com/blog/marketing/impact-of-corona-virus-on-search-marketing.html',
    '/https://www.pnytrainings.com/gallery-image/19',
    '/https://www.pnytrainings.com/news-detail/22',


  ];

  // 1. Return 410 for non-existent paths
  if (nonExistentPaths.includes(pathname)) {
    return new NextResponse('Page has been permanently removed.', { status: 410 });
  }

  // Allow specific social media query parameters to avoid unnecessary 404 redirects
  const allowedQueryParams = ['fbclid', 'utm_source', 'utm_medium', 'utm_campaign'];
  const searchParams = new URLSearchParams(url.search);

  // 2. Redirect to 404 if there are any disallowed query parameters
  const hasDisallowedParams = Array.from(searchParams.keys()).some(
    (param) => !allowedQueryParams.includes(param)
  );
  if (hasDisallowedParams) {
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
