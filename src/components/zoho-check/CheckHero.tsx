'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function CheckHero() {
  return (
    <section className="section section-black">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center text-center px-6 max-w-2xl mx-auto"
      >
        <div className="mb-8">
          <Image
            src="/img/logo.webp"
            alt="Tau Process House Logo"
            width={80}
            height={80}
            className="mx-auto mb-6"
          />
          <p className="text-sm tracking-widest uppercase text-gray-400 mb-4">Tau Process House</p>
        </div>

        <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
          Wie gut ist Ihr Zoho CRM<br />wirklich aufgestellt?
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-10">
          Kostenlose Struktur-Analyse in 60 Sekunden.<br />
          KI-gestützt. Keine Installation. Kein Anruf.
        </p>

        <ul className="text-left space-y-3 mb-12 text-gray-300 w-full max-w-sm">
          {[
            'Erkennt ungenutzte und fehlende Module',
            'Bewertet Ihre Lizenz-Effizienz',
            'Gibt konkrete Quick Wins mit Aufwand & Impact',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-1 text-white flex-shrink-0">●</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* Button is centered because parent is flex + items-center */}
        <button
          onClick={() => {
            document.getElementById('zoho-check-root')?.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
          }}
          className="border border-white text-white px-8 py-3 hover:opacity-70 transition-opacity font-semibold"
        >
          ↓ Jetzt analysieren
        </button>
      </motion.div>
    </section>
  );
}
