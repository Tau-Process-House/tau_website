import Link from 'next/link';

export default function ContactSection() {
  return (
    <section className="section section-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">Contact</h2>
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="p-6 rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-4">For clients</h3>
            <a href="mailto:info@tauprocess.de" className="text-xl hover:underline">
              info@tauprocess.de
            </a>
          </div>
          <div className="p-6 rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-4">For applicants</h3>
            <a
              href="https://join.com/companies/tauprocess"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:underline"
            >
              Job Postings
            </a>
          </div>
        </div>
        <div className="text-center mt-8 flex justify-center gap-6">
          <Link href="/imprint" className="text-sm hover:underline">
            Imprint
          </Link>
          <Link href="/privacy" className="text-sm hover:underline">
            Privacy Policy
          </Link>
          <Link href="/faq" className="text-sm hover:underline">
            FAQ
          </Link>
        </div>
      </div>
    </section>
  );
} 