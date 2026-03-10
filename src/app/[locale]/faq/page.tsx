import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import faqData from '@/data/faq.json';
import metaData from '@/data/metadata.json';
import type { FaqPageContent, MetadataContent } from '@/types/content';

const FONT = 'Arial, Helvetica, sans-serif';

const faq = faqData as FaqPageContent;
const meta = metaData as MetadataContent;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = (f: { de: string; en: string }) => f[locale as 'de' | 'en'] ?? f.de;
  const siteUrl = meta.site.url;

  return {
    title: loc(meta.faq.title),
    description: loc(meta.faq.description),
    alternates: {
      canonical: `${siteUrl}/${locale}/faq`,
      languages: {
        de: `${siteUrl}/de/faq`,
        en: `${siteUrl}/en/faq`,
      },
    },
    openGraph: {
      title: loc(meta.faq.ogTitle),
      description: loc(meta.faq.ogDescription),
      url: `${siteUrl}/${locale}/faq`,
    },
  };
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = (f: { de: string; en: string }) => f[locale as 'de' | 'en'] ?? f.de;

  const page = faq.page;
  const faqs = faq.items.filter((f) => f.published);

  // JSON-LD FAQPage schema — optimised for Google AI Overview and LLMs
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: loc(item.question),
      acceptedAnswer: {
        '@type': 'Answer',
        text: loc(item.answer),
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main
        style={{
          fontFamily: FONT,
          backgroundColor: '#fff',
          color: '#000',
          minHeight: '100vh',
          padding: '4rem 1.5rem',
        }}
      >
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          {/* Back link */}
          <Link
            href="/"
            style={{
              display: 'inline-block',
              fontSize: '14px',
              color: 'rgba(0,0,0,0.4)',
              textDecoration: 'none',
              marginBottom: '2.5rem',
              fontFamily: FONT,
            }}
          >
            {loc(page.backLink)}
          </Link>

          <h1
            style={{
              fontSize: '2.5rem',
              fontWeight: 700,
              marginBottom: '0.5rem',
              fontFamily: FONT,
            }}
          >
            {loc(page.title)}
          </h1>
          <p
            style={{
              fontSize: '18px',
              color: 'rgba(0,0,0,0.5)',
              marginBottom: '3.5rem',
              fontFamily: FONT,
            }}
          >
            {loc(page.subtitle)}
          </p>

          {/* FAQ list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {faqs.map((item, i) => (
              <div
                key={item.id}
                style={{
                  borderTop: '1px solid rgba(0,0,0,0.08)',
                  paddingTop: '1.75rem',
                  paddingBottom: '1.75rem',
                  borderBottom:
                    i === faqs.length - 1 ? '1px solid rgba(0,0,0,0.08)' : undefined,
                }}
              >
                <h2
                  style={{
                    fontSize: '20px',
                    fontWeight: 700,
                    marginBottom: '0.75rem',
                    fontFamily: FONT,
                    lineHeight: '1.4',
                  }}
                >
                  {loc(item.question)}
                </h2>
                <p
                  style={{
                    fontSize: '17px',
                    color: 'rgba(0,0,0,0.7)',
                    lineHeight: '1.65',
                    fontFamily: FONT,
                    margin: 0,
                  }}
                >
                  {loc(item.answer)}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div
            style={{
              marginTop: '4rem',
              padding: '2rem',
              border: '1px solid rgba(0,0,0,0.1)',
              borderRadius: '12px',
              backgroundColor: 'rgba(0,0,0,0.02)',
            }}
          >
            <p
              style={{
                fontSize: '20px',
                fontWeight: 700,
                marginBottom: '0.5rem',
                fontFamily: FONT,
              }}
            >
              {loc(page.ctaTitle)}
            </p>
            <p
              style={{
                fontSize: '17px',
                color: 'rgba(0,0,0,0.6)',
                marginBottom: '1.25rem',
                fontFamily: FONT,
              }}
            >
              {loc(page.ctaText)}
            </p>
            <a
              href={`mailto:${page.ctaEmail}`}
              style={{
                display: 'inline-block',
                backgroundColor: '#000',
                color: '#fff',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                fontSize: '17px',
                fontWeight: 600,
                textDecoration: 'none',
                fontFamily: FONT,
              }}
            >
              {page.ctaEmail} →
            </a>
          </div>

          {/* Footer */}
          <div
            style={{
              marginTop: '4rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid rgba(0,0,0,0.06)',
              display: 'flex',
              gap: '1.5rem',
              fontSize: '13px',
              color: 'rgba(0,0,0,0.35)',
              fontFamily: FONT,
            }}
          >
            <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              {loc(page.footerLinks.home)}
            </Link>
            <Link href="/imprint" style={{ color: 'inherit', textDecoration: 'none' }}>
              {loc(page.footerLinks.imprint)}
            </Link>
            <Link href="/privacy" style={{ color: 'inherit', textDecoration: 'none' }}>
              {loc(page.footerLinks.privacy)}
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
