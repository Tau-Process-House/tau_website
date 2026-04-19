import { Link } from '@/i18n/navigation';
import imprintData from '@/data/imprint.json';
import type { ImprintContent } from '@/types/content';

const imprint = imprintData as ImprintContent;

export default async function Imprint({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = (f: { de: string; en: string }) => f[locale as 'de' | 'en'] ?? f.de;

  const l = imprint.labels;

  return (
    <main className="min-h-screen bg-black text-white py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-block mb-12 hover:underline">
          {loc(l.backLink)}
        </Link>

        <h1 className="text-4xl font-bold mb-12">{loc(l.title)}</h1>

        <section className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">{loc(l.infoTitle)}</h2>
            <p>{imprint.owner}</p>
            <p>{imprint.address.street}</p>
            <p>{imprint.address.zip} {imprint.address.city}</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">{loc(l.contactTitle)}</h2>
            <p>Email: {imprint.contact.email}</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">{loc(l.vatTitle)}</h2>
            <p>{loc(l.vatText)}</p>
            <p>{imprint.vatId}</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">{loc(l.responsibleTitle)}</h2>
            <p>{imprint.owner}</p>
            <p>{imprint.address.street}</p>
            <p>{imprint.address.zip} {imprint.address.city}</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">{loc(l.disputeTitle)}</h2>
            <p>{loc(l.disputeText1)}</p>
            <p className="mt-4">{loc(l.disputeText2)}</p>
            <p className="mt-4">{loc(l.disputeText3)}</p>
          </div>
        </section>
      </div>
    </main>
  );
}
