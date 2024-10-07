import { NextResponse } from 'next/server';

export function middleware(req) {
  const { nextUrl: url } = req;

  // // Check if the URL contains a query string

  // if (url.search) {
  //   // Construct absolute URL for the redirect
  //   const redirectUrl = new URL('/404', url.origin);
  //   return NextResponse.redirect(redirectUrl);
  // }

  // Check if the URL pathname ends with .html or .txt

  const pathname = url.pathname;

  // Check if the file is robots.txt
  if (pathname === '/robots.txt') {
    return NextResponse.next();
  }

  // Redirect all other .html and .txt files to 404
  if (pathname.endsWith('.html') || pathname.endsWith('.txt')) {
    const redirectUrl = new URL('/404', url.origin);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}
