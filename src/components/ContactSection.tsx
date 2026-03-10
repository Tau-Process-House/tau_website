'use client';
import { useLocalized } from '@/lib/use-localized';
import { Link } from '@/i18n/navigation';
import contactData from '@/data/contact.json';
import type { ContactContent } from '@/types/content';

const contact = contactData as ContactContent;

export default function ContactSection() {
  const loc = useLocalized();

  return (
    <section className="section section-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">{loc(contact.title)}</h2>
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="p-6 rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-4">{loc(contact.clients.heading)}</h3>
            <a href={`mailto:${contact.clients.email}`} className="text-xl hover:underline">
              {contact.clients.email}
            </a>
          </div>
          <div className="p-6 rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-4">{loc(contact.applicants.heading)}</h3>
            <a
              href={contact.applicants.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:underline"
            >
              {loc(contact.applicants.label)}
            </a>
          </div>
        </div>
        <div className="text-center mt-8 flex justify-center gap-6">
          <Link href="/imprint" className="text-sm hover:underline">
            {loc(contact.footerLinks.imprint)}
          </Link>
          <Link href="/privacy" className="text-sm hover:underline">
            {loc(contact.footerLinks.privacy)}
          </Link>
          <Link href="/faq" className="text-sm hover:underline">
            {loc(contact.footerLinks.faq)}
          </Link>
        </div>
      </div>
    </section>
  );
}
