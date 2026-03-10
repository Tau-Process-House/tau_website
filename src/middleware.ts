import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - /api routes
  // - /_next (Next.js internals)
  // - /_vercel (Vercel internals)
  // - /img, /team, /favicon.ico, etc. (static files)
  matcher: [
    '/((?!api|_next|_vercel|img|team|.*\\..*).*)',
  ],
};
