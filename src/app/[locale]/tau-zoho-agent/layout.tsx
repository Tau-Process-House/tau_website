import type { Metadata } from 'next';
import agentData from '@/data/agent.json';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = (f: { de: string; en: string }) => f[locale as 'de' | 'en'] ?? f.en;
  const siteUrl = 'https://tauprocess.de';

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
    },
  };
}

export default function AgentLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
