import type { Metadata } from 'next';
import agentData from '@/data/agent.json';

const siteUrl = 'https://tauprocess.de';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = (f: { de: string; en: string }) => f[locale as 'de' | 'en'] ?? f.en;

  return {
    title: loc(agentData.meta.title),
    description: loc(agentData.meta.description),
    alternates: {
      canonical: `${siteUrl}/${locale}/tau-zoho-agent`,
      languages: {
        de: `${siteUrl}/de/tau-zoho-agent`,
        en: `${siteUrl}/en/tau-zoho-agent`,
      },
    },
    openGraph: {
      title: loc(agentData.meta.title),
      description: loc(agentData.meta.description),
      url: `${siteUrl}/${locale}/tau-zoho-agent`,
      type: 'website',
    },
  };
}

export default async function AgentLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = (f: { de: string; en: string }) => f[locale as 'de' | 'en'] ?? f.en;

  const softwareLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Tau Zoho Agent',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web (Zoho CRM)',
    description: loc(agentData.meta.description),
    url: `${siteUrl}/${locale}/tau-zoho-agent`,
    offers: {
      '@type': 'Offer',
      price: '29',
      priceCurrency: 'EUR',
      category: 'subscription',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '29',
        priceCurrency: 'EUR',
        unitText: loc({ de: 'User/Monat', en: 'user/month' }),
        referenceQuantity: {
          '@type': 'QuantitativeValue',
          value: 1,
          unitCode: 'MON',
        },
      },
      description: loc({
        de: '14 Tage kostenlos testen, ohne Kreditkarte. Danach 29 €/User pro Monat.',
        en: '14-day free trial, no credit card. Then €29/user per month.',
      }),
    },
    publisher: {
      '@type': 'Organization',
      name: 'Tau Process House',
      url: siteUrl,
    },
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: agentData.faq.items.map((item) => ({
      '@type': 'Question',
      name: loc(item.q),
      acceptedAnswer: { '@type': 'Answer', text: loc(item.a) },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      {children}
    </>
  );
}
