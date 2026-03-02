import type { Metadata } from 'next'
import Link from 'next/link'
import faqData from '@/data/faq.json'

const FONT = 'Arial, Helvetica, sans-serif'

export const metadata: Metadata = {
  title: 'FAQ — Häufige Fragen zu Zoho & Zusammenarbeit',
  description:
    'Antworten auf häufige Fragen rund um Zoho One, CRM-Implementierung, Kosten eines Zoho-Freelancers und die Zusammenarbeit mit Felix Rimbakowsky / Tau Process House.',
  alternates: {
    canonical: 'https://tauprocess.de/faq',
  },
  openGraph: {
    title: 'FAQ | Tau Process House',
    description:
      'Was kostet ein Zoho-Freelancer? Wie läuft eine Zoho-Implementierung ab? Antworten auf die wichtigsten Fragen.',
    url: 'https://tauprocess.de/faq',
  },
}

interface FaqItem {
  id: string
  question: string
  answer: string
  published: boolean
}

const faqs: FaqItem[] = (faqData as FaqItem[]).filter((f) => f.published)

// JSON-LD FAQPage schema — optimiert für Google AI Overview und LLMs
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': faqs.map((faq) => ({
    '@type': 'Question',
    'name': faq.question,
    'acceptedAnswer': {
      '@type': 'Answer',
      'text': faq.answer,
    },
  })),
}

export default function FaqPage() {
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
            ← tauprocess.de
          </Link>

          <h1
            style={{
              fontSize: '2.5rem',
              fontWeight: 700,
              marginBottom: '0.5rem',
              fontFamily: FONT,
            }}
          >
            Häufige Fragen
          </h1>
          <p
            style={{
              fontSize: '18px',
              color: 'rgba(0,0,0,0.5)',
              marginBottom: '3.5rem',
              fontFamily: FONT,
            }}
          >
            Zoho One, CRM-Implementierung, Kosten und Zusammenarbeit mit Felix Rimbakowsky.
          </p>

          {/* FAQ list */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0',
            }}
          >
            {faqs.map((faq, i) => (
              <div
                key={faq.id}
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
                  {faq.question}
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
                  {faq.answer}
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
              Noch eine Frage?
            </p>
            <p
              style={{
                fontSize: '17px',
                color: 'rgba(0,0,0,0.6)',
                marginBottom: '1.25rem',
                fontFamily: FONT,
              }}
            >
              Felix antwortet persönlich — in der Regel innerhalb eines Werktags.
            </p>
            <a
              href="mailto:info@tauprocess.de"
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
              info@tauprocess.de →
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
              Startseite
            </Link>
            <Link href="/imprint" style={{ color: 'inherit', textDecoration: 'none' }}>
              Impressum
            </Link>
            <Link href="/privacy" style={{ color: 'inherit', textDecoration: 'none' }}>
              Datenschutz
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
