'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="section-container">
      {/* Hero Section */}
      <section className="section section-black">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <div className="mb-8">
            
            <div className="w-32 h-32 mx-auto bg-black mb-6"><img src="/img/logo.png" alt="Process House Logo" className="w-32 h-32 mx-auto mb-6" /></div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Process House</h1>
            <p className="text-xl md:text-2xl">where processes want to live</p>
          </div>
        </motion.div>
      </section>

      {/* What Section */}
      <section className="section section-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center">What we do</h2>
          
          <div className="text-center mb-0">
            <p className="text-xl mb-2">Processes are created when strategy is implemented through technology.</p>
            <p className="text-xl">Let's connect your strategy with our technology.</p>
          </div>
          
          <div className="relative w-full max-w-md mx-auto aspect-square">
            {/* Venn diagram */}
            <div className="absolute w-60 h-60 rounded-full bg-transparent border-2 border-black top-1/2 -translate-y-1/2 left-1/2 -translate-x-[75%] flex items-center justify-start">
              <span className="text-lg font-bold ml-6">strategy</span>
            </div>
            <div className="absolute w-60 h-60 rounded-full bg-transparent border-2 border-black top-1/2 -translate-y-1/2 right-1/2 translate-x-[75%] flex items-center justify-end">
              <span className="text-lg font-bold mr-2">technology</span>
            </div>
            {/* Intersection text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <span className="text-lg font-bold">process</span>
            </div>
          </div>
        </div>
      </section>

      {/* How Section */}
      <section className="section section-black">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">How we do it</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Technology</h3>
              <ul className="space-y-4">
                <li>• Strong foundations, future-proofed</li>
                <li>• Seamless integration with your best-in-class tools</li>
                <li>• Leveraging your existing ecosystem</li>
              </ul>
            </div>
            <div className="p-6 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Methodology</h3>
              <ul className="space-y-4">
                <li>• Designing streamlined, future-state processes</li>
                <li>• Implementing within your existing environment</li>
                <li>• Continuous tracking, automation and optimization</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="section section-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">Why us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Expertise</h3>
              <p>Proven track record in process optimization and automation in various industries</p>
            </div>
            <div className="p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Custom Solutions</h3>
              <p>Each client is unique, we tailor our solution to your specific business requirements</p>
            </div>
            <div className="p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Sustainable</h3>
              <p>Built on leading platforms, ensuring continuous updates and adaptability to future technologies</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section section-black">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">Contact</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="p-6 rounded-lg text-center">
              <h3 className="text-2xl font-bold mb-4">For clients</h3>
              <a href="mailto:info@tau-process.de" className="text-xl hover:underline">
                info@tau-process.de
              </a>
            </div>
            <div className="p-6 rounded-lg text-center">
              <h3 className="text-2xl font-bold mb-4">For applicants</h3>
              <a
                href="https://www.linkedin.com/company/tau-process-house"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl hover:underline"
              >
                Job Postings
              </a>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link href="/imprint" className="text-sm hover:underline">
              Imprint
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
