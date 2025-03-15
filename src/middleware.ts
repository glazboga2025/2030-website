import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host') || '';
  
  // Проверяем, является ли запрос к поддомену blog
  const isBlogSubdomain = hostname.startsWith('blog.');
  
  // Если это поддомен blog, перенаправляем на страницу блога без префикса /blog
  if (isBlogSubdomain) {
    return NextResponse.rewrite(new URL(`/blog${url.pathname}`, request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api|_next|_static|_vercel|[\\w-]+\\.\\w+).*)',
  ],
}; 