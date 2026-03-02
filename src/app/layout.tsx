import type { Metadata } from "next";
import "./globals.css";
import Script from 'next/script'

const siteUrl = 'https://tauprocess.de';

export const metadata: Metadata = {
  title: {
    default: "Felix Rimbakowsky · Zoho-Experte & Prozessautomatisierung",
    template: "%s | Tau Process House"
  },
  description:
    "Felix Rimbakowsky ist Zoho-Experte aus Berlin & Hannover mit über 5 Jahren Erfahrung. Tau Process House implementiert Zoho One für KMU: CRM, Projekte, Abrechnung und Automatisierung — flexibel auf Stundenbasis, ohne Agenturoverhead.",
  icons: {
    icon: [{ url: 'favicon.ico', href: 'favicon.ico' }]
  },
  openGraph: {
    title: "Felix Rimbakowsky · Zoho-Experte | Tau Process House",
    description:
      "Zoho One Implementierung auf Stundenbasis — CRM, Projekte, Abrechnung, Automatisierung. 5+ Jahre Zoho-Erfahrung, Zugang zu Zoho Premium Support, Berlin & Hannover.",
    url: siteUrl,
    siteName: "Tau Process House",
    locale: "de_DE",
    type: "website",
    images: [
      {
        url: `${siteUrl}/img/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Felix Rimbakowsky — Zoho-Experte & Tau Process House",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Felix Rimbakowsky · Zoho-Experte | Tau Process House",
    description:
      "Zoho One Implementierung auf Stundenbasis. CRM, Projekte, Abrechnung, Automatisierung für KMU.",
    images: [`${siteUrl}/img/og-image.png`],
  },
  alternates: {
    canonical: siteUrl,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#felix`,
      "name": "Felix Rimbakowsky",
      "jobTitle": "Zoho-Experte & Freelance-Berater",
      "description":
        "Felix Rimbakowsky ist freiberuflicher Zoho-Experte mit über 5 Jahren Erfahrung in der Implementierung von Zoho One für kleine und mittelständische Unternehmen. Er arbeitet eng mit einem Zoho Premium Partner zusammen und bietet direkten Zugang zu Zoho Premium Support. Als Freelancer arbeitet er auf Stundenbasis — ohne Agenturoverhead, aber mit tiefer Fachexpertise.",
      "url": siteUrl,
      "email": "info@tauprocess.de",
      "knowsAbout": [
        "Zoho One", "Zoho CRM", "Zoho Projects", "Zoho Books",
        "Zoho Flow", "Zoho Analytics", "Prozessautomatisierung",
        "CRM-Implementierung", "ERP-Migration", "Business Process Management",
        "Lead Management", "Rechnungsautomatisierung"
      ],
      "worksFor": { "@id": `${siteUrl}/#org` },
    },
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": `${siteUrl}/#org`,
      "name": "Tau Process House",
      "url": siteUrl,
      "logo": `${siteUrl}/img/logo.webp`,
      "description":
        "Tau Process House ist das Beratungsunternehmen von Felix Rimbakowsky. Spezialisiert auf Zoho One Implementierungen für KMU — von der Prozessanalyse über Migration und Entwicklung bis zum Rollout. Auf Stundenbasis, flexibel und ohne unnötigen Overhead.",
      "email": "info@tauprocess.de",
      "founder": { "@id": `${siteUrl}/#felix` },
      "areaServed": ["Berlin", "Hannover", "Deutschland", "DACH"],
      "knowsAbout": [
        "Zoho One", "Zoho CRM", "Zoho Projects", "Zoho Books",
        "Zoho Flow", "Prozessautomatisierung", "CRM-Implementierung"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Zoho-Beratungsleistungen",
        "itemListElement": [
          { "@type": "Offer", "name": "Zoho One Consulting & Prozessanalyse" },
          { "@type": "Offer", "name": "Zoho One Migration & Setup" },
          { "@type": "Offer", "name": "Iterative Zoho-Entwicklung & Automatisierung" },
          { "@type": "Offer", "name": "Zoho Training & Rollout-Begleitung" },
          { "@type": "Offer", "name": "Lead Enrichment Agent (149 €/Monat)" },
          { "@type": "Offer", "name": "Document Automation Suite (99 €/Monat)" }
        ]
      }
    }
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className="antialiased">
      <head>
        <link rel="preconnect" href="https://cdn-cookieyes.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Google Consent Mode v2: Standardmäßig auf "denied" setzen, BEVOR GA lädt */}
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
        {children}
        {/* CookieYes wird mit afterInteractive geladen und aktualisiert danach den Consent-Status via gtag('consent', 'update', ...) */}
        <Script
          id="cookieyes"
          strategy="afterInteractive"
          src="https://cdn-cookieyes.com/client_data/b45a3cd385ffd614b2659a4a/script.js"
        />
      </body>
    </html>
  );
}
