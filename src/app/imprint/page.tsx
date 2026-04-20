'use client';
import React from 'react';
import Link from 'next/link';

export default function Imprint() {
  return (
    <main className="min-h-screen bg-black text-white py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-block mb-12 hover:underline">
          ← Back to Main Page
        </Link>

        <h1 className="text-4xl font-bold mb-12">Imprint</h1>

        <section className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Information according to § 5 TMG</h2>
            <p>Felix Rimbakowsky</p>
            <p>Großbeerenstraße 71</p>
            <p>10963 Berlin</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Contact</h2>
            <p>Email: rimbas.itb@gmail.com</p>
          </div>

          {/* Conditionally render VAT ID section */}
            <div>
              <h2 className="text-2xl font-bold mb-4">VAT ID</h2>
              <p>Value Added Tax Identification Number according to §27 a Value Added Tax Act:</p>
              <p>DE356214879</p>
            </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Responsible for content according to § 55 Abs. 2 RStV</h2>
            <p>Felix Rimbakowsky</p>
            <p>Großbeerenstraße 71</p>
            <p>10963 Berlin</p>
          </div>

           <div>
            <h2 className="text-2xl font-bold mb-4">Dispute Resolution</h2>
            <p>The European Commission provides a platform for online dispute resolution (ODR): https://ec.europa.eu/consumers/odr</p>
            <p className="mt-4">You can find our email address above in the imprint.</p>
            <p className="mt-4">We are not willing or obliged to participate in dispute resolution proceedings before a consumer arbitration board.</p>
          </div>
        </section>
      </div>
    </main>
  );
}