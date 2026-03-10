import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kostenloser Zoho CRM Check | Tau Process House',
  description: 'Analysieren Sie Ihre Zoho CRM-Struktur in 60 Sekunden. KI-gestützte Bewertung von Modulen, Lizenz-Fit und Quick Wins — kostenlos von Tau Process House.',
  openGraph: {
    title: 'Kostenloser Zoho CRM Struktur-Check',
    description: 'KI-gestützte Analyse Ihrer Zoho CRM Konfiguration. Kostenlos von Tau Process House.',
    url: 'https://tauprocess.de/zoho-check',
  },
  alternates: {
    canonical: 'https://tauprocess.de/zoho-check',
  },
};

export default function ZohoCheckLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        overflowY: 'scroll',
        overflowX: 'hidden',
        scrollSnapType: 'y mandatory',
        WebkitOverflowScrolling: 'touch',
        backgroundColor: '#000',
      }}
      id="zoho-check-root"
    >
      {children}
    </div>
  );
}
