import createMiddleware from 'next-intl/middleware';
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

// Create the next-intl middleware
const intlMiddleware = createMiddleware({
  locales: ['en', 'id'],
  defaultLocale: 'id'
});

// Combine with authentication middleware
export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    // Check if the user is trying to access admin routes
    if (pathname.includes('/dashboard/admin')) {
      if (token?.role !== 'admin') {
        // Redirect non-admin users to user dashboard
        const locale = pathname.split('/')[1];
        return NextResponse.redirect(new URL(`/${locale}/dashboard/user`, req.url));
      }
    }

    // Apply i18n middleware for all routes
    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname;

        // Protected routes that require authentication
        const protectedPaths = ['/dashboard', '/profile'];

        // Check if current path includes any protected path
        const isProtected = protectedPaths.some(path =>
          pathname.includes(path)
        );

        if (isProtected) {
          return !!token; // Return true if token exists
        }

        return true; // Allow access to non-protected routes
      },
    },
    pages: {
      signIn: '/auth/login',
    },
  }
);

export const config = {
  matcher: ['/', '/(id|en)/:path*']
};
