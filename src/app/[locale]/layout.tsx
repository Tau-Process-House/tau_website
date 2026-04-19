import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import Script from 'next/script';
import ConditionalLanguageToggle from '@/components/ConditionalLanguageToggle';
import metaData from '@/data/metadata.json';
import type { MetadataContent } from '@/types/content';
import '../globals.css';

const meta = metaData as MetadataContent;
const siteUrl = meta.site.url;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = (f: { de: string; en: string }) => f[locale as 'de' | 'en'] ?? f.de;

  return {
    title: {
      default: loc(meta.site.title),
      template: meta.site.titleTemplate,
    },
    description: loc(meta.site.description),
    icons: {
      icon: [{ url: 'favicon.ico', href: 'favicon.ico' }],
    },
    openGraph: {
      title: loc(meta.site.ogTitle),
      description: loc(meta.site.ogDescription),
      url: siteUrl,
      siteName: meta.site.name,
      locale: loc(meta.site.ogLocale),
      type: 'website',
      images: [
        {
          url: `${siteUrl}/img/og-image.png`,
          width: 1200,
          height: 630,
          alt: loc(meta.site.ogImageAlt),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: loc(meta.site.twitterTitle),
      description: loc(meta.site.twitterDescription),
      images: [`${siteUrl}/img/og-image.png`],
    },
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: {
        de: `${siteUrl}/de`,
        en: `${siteUrl}/en`,
      },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();
  const loc = (f: { de: string; en: string }) => f[locale as 'de' | 'en'] ?? f.de;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${siteUrl}/#felix`,
        name: meta.person.name,
        jobTitle: loc(meta.person.jobTitle),
        description: loc(meta.person.description),
        url: siteUrl,
        email: meta.person.email,
        knowsAbout: meta.person.knowsAbout,
        worksFor: { '@id': `${siteUrl}/#org` },
      },
      {
        '@type': ['Organization', 'ProfessionalService'],
        '@id': `${siteUrl}/#org`,
        name: meta.organization.name,
        url: siteUrl,
        logo: `${siteUrl}/img/logo.webp`,
        description: loc(meta.organization.description),
        email: meta.site.email,
        founder: { '@id': `${siteUrl}/#felix` },
        areaServed: meta.organization.areaServed,
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: loc(meta.organization.offerCatalogName),
          itemListElement: meta.organization.offers.map((offer) => ({
            '@type': 'Offer',
            name: loc(offer),
          })),
        },
      },
    ],
  };

  return (
    <html lang={locale} className="antialiased">
      <head>
        <link rel="preconnect" href="https://cdn-cookieyes.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Google Consent Mode v2 — default denied before GA loads */}
        <Script id="google-consent-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              'analytics_storage': 'denied',
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'wait_for_update': 500
            });
          `}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-WJFGRZMTSF"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WJFGRZMTSF');
          `}
        </Script>
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ConditionalLanguageToggle />
          {children}
        </NextIntlClientProvider>
        <Script
          id="cookieyes"
          strategy="afterInteractive"
          src="https://cdn-cookieyes.com/client_data/b45a3cd385ffd614b2659a4a/script.js"
        />
      </body>
    </html>
  );
}
