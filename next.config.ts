import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  serverExternalPackages: ['pdfkit'],
  // Tau-Agent-Seite vorübergehend offline (temporärer Redirect, Code bleibt erhalten)
  async redirects() {
    return [
      { source: '/tau-zoho-agent/:path*', destination: '/', permanent: false },
      { source: '/:locale(de|en)/tau-zoho-agent/:path*', destination: '/:locale', permanent: false },
      // CRM-Check offline (Datenschutz): Seite und API entfernt, Weiterleitung auf Startseite
      { source: '/zoho-check/:path*', destination: '/', permanent: false },
      { source: '/:locale(de|en)/zoho-check/:path*', destination: '/:locale', permanent: false },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn-cookieyes.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
