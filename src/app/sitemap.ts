import { MetadataRoute } from 'next'

const locales = ['de', 'en'] as const;
const base = 'https://tauprocess.de';

type ChangeFrequency = 'monthly' | 'yearly' | 'weekly' | 'daily' | 'always' | 'hourly' | 'never';

function localizedEntry(
  path: string,
  changeFrequency: ChangeFrequency,
  priority: number,
  now: Date
) {
  return locales.map((locale) => ({
    url: `${base}/${locale}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [l, `${base}/${l}${path}`])
      ),
    },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    // Root redirect (canonical)
    {
      url: base,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1,
    },
    // Localized home pages
    ...localizedEntry('', 'monthly', 1, now),
    // Localized sub-pages
    ...localizedEntry('/faq', 'monthly', 0.8, now),
    ...localizedEntry('/imprint', 'yearly', 0.2, now),
    ...localizedEntry('/privacy', 'yearly', 0.2, now),
  ];
}
