import { NextResponse } from 'next/server';

export function middleware(req) {
  const { nextUrl: url } = req;
  const pathname = url.pathname;

  // List of non-existent URLs
  const nonExistentPaths = [
    '/2d-3d-animation-course-in-lahore',
    '/blog/business/5-easy-ways-to-make-money-online-from-home.txt',
    '/digital-media-marketing-course-in-rawalpindi',
    '/course/private-label-and-wholesale-business-on-amazon-course-in-lahore-pakistan',
    '/blog/marketing/impact-of-corona-virus-on-search-marketing.html',
    '/gallery-image/19',
    '/news-detail/22',
    '/course/professional-red-hat-certified-system-administrator-course-in-lahore-pakistan',
    '/course/chatapp-bootcamp-in-lahore',
    '/blogd/post',
    '/blog/designing/top-7-free-online-cv-maker--websites-can-help-you-to-get--jobs.txt',
    '/blog/marketing/a-comprehensive-guide-to-understanding-fiver-fee-affiliate-payments.html',
    '/assets/index-fbNWI9eb.js:46:39655',
    '/event-detail/344',
    '/blog/business/top-8-platforms-that-offer-best-interview-preparation.html',
    '/blog/education/short-courses-in-gujranwala.txt',
    '/blog/education/unlock-your-potential-this-ramadan-with-our-discounted-bootcamps.txt',
    '/blog/marketing/online-marketing-influence-startups.txt',
    '/event-detail/91',
    '/blog/education/short-courses-in-iqbal-town-lahore.txt',
    '/event-detail/74',
    '/?s=%7Bsearch_term_string%7D',
    '/admission?fbclid=IwAR0cxP2Yb9fvKAUPcCPUTpf7_qPCv9lvjDjDpV7Jv3KaJRTJwIImGAO1Eug',
    '/blog/education/best-institution-offering-digital-marketing-course-in-pakistan.html',
    '/blog/education/pny-trainings-grand-opening-johar-town-branch.txt',
    '/blog/short-courses-in-azad-kashmir/short-courses-in-azad-kashmir.html',
    '/digital-media-marketing-courses?fbclid=IwAR0QpS59Iuq5ukbvEoKf48_dOWnTppdPtGmtP4CObh0WxpdaP4L2uAt0eD0',
    '/event-detail/26',
    '/?page_id=916',
    '/blog/education/pny-trainings-grand-opening-johar-town-branch.html',
    '/specialpage/youtube-course-in-rawalpindi',
    '/?trk=public_post_main-feed-card-text',
    '/blog/short-courses-in-islamabad/rising-trend-of-web-designing-and-development-in-islamabad.html',
    '/short-courses-in-lahore?ref=producthunt',
    '/assets/index-fbNWI9eb.js:44:19519',
    '/assets/index-BZVe44za.js:44:19519',
    '/course/make-up-artist-coures-in-lahore-pakistan',
    '/assets/index-BPtrFVPw.js:46:39727',
    '/event-detail/120',
    '/event-detail/320',
    '/blog/marketing/how-to-earn-from-facebook-in-pakistan.txt',
    '/blog/short-course-in-sialkot/short-courses-in-sialkot.txt',
    '/assets/index-fbNWI9eb.js:46:35875',
    '/cisco-ccna-training-in-lahore/1000',
    '/imagesshow/34',
    '/android-game-development//1000',
    '/imagesshow/14',
    '/assets/index-2x2CFk6z.js:46:35875',
    '/assets/index-fbNWI9eb.js:88:6378',
    '/specialpage/freelancing-course-in-rawalpindi',
    '/gallery-image/18',
    '/imagesshow/16#!',
    '/imagesshow/22#!',
    '/imagesshow/19#!',
    '/imagesshow/25#!',
    '/blog/short-course-in-sialkot/short-courses-in-sialkot.html',
    '/imagesshow/24#!',
    '/imagesshow/35#!',
    '/imagesshow/17',
    '/imagesshow/17#!',
    '/imagesshow/12',
    '/imagesshow/12#!',
    '/imagesshow/16',
    '/imagesshow/31',
    '/imagesshow/18',
    '/imagesshow/18#!',
    '/imagesshow/19',
    '/blog/marketing/a-beginners-guide-to-freelancing-in-pakistan.html',
    '/course/pearson-test-of-english-course-in-lahore-pakistan',
    '/workshop/best-facebook-marketing-course-training-in-lahore-pakistan/',
    '/advance-front-end-web-developer-course-in-lahore-pakistan?fbclid=IwAR2IqKKO-IeYGyq9TytNbPhPqvf1UBmhfEh6xLSFjhXGaVjJ79aiWrbxVmw',
    '/blog/technology/cyber-security-future-in-pakistan.txt',
    '/blog/technology/why-is-everyone-talking-about-working-of-virtual-reality.html',
    '/blog/marketing/a-beginners-guide-to-freelancing-in-pakistan.txt',
    '/assets/index-BZVe44za.js:46:39727',
    '/assets/index-Cly8gLsO.js:46:39655',
    '/assets/index-2x2CFk6z.js:46:39508',
    '/ajax/newsletter_subscribe',
    '/assets/index-BOnib558.js:2:6336',
    '/assets/index-BwVABSof.js:46:44737',
    '/blog/marketing/12-best-seo-practices-you-need-to-follow.html',
    '/assets/index-sqrJ7CgH.js:44:19519',
    '/event-detail/342',
    '/blog/marketing/famous-platforms-that-rule-in-the-world.txt',
    '/blog/technology/how-to-start-freelancing-step-by-step-guide.html',
    '/blog/marketing/how-to-find-your-brands-target-audience.html',
    '/blog/marketing/the-ultimate-guide-to-ai-tools-for-digital-marketers-in-2023.txt',
    '/social-media-marketing-expert-course-in-lahore-pakistan?fbclid=IwAR0ZHaJqyl4cngdShB9m84CBxU7ujonMea367KkCYXGEwedq--llexolZDg',
    '/assets/index-C7xInKPP.js:46:39727',
    '/assets/index-fbNWI9eb.js:46:3139',
    '/assets/index-D02cOnxD.js:44:19519',
    '/blog/marketing/direct-vs-indirect-marketing.html',
    '/blog/technology/importance-of-edge-computing.html',
    '/assets/index-D02cOnxD.js:46:39727',
    '/blog/education/top-8-sites-to-get-the-free-online-education.html',
    '/blog/marketing/use-these-12-seo-tools-to-rank-higher-on-search-engines.html',
    '/assets/index-fbNWI9eb.js:31:1559',
    '/blog/business/good-news-for-freelancers--withdraw-funds-from-payoneer-to-jazz-cash.html',
    // Add the remaining paths here based on your provided list
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
