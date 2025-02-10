'use client';
import dynamic from 'next/dynamic';

// Dynamische Imports für alle Sektionen
const HeroSection = dynamic(() => import('@/components/HeroSection'), {
  loading: () => <div className="section section-black">Loading...</div>
});

const WhatSection = dynamic(() => import('@/components/WhatSection'), {
  loading: () => <div className="section section-white">Loading...</div>
});

const HowSection = dynamic(() => import('@/components/HowSection'), {
  loading: () => <div className="section section-black">Loading...</div>
});

const WhySection = dynamic(() => import('@/components/WhySection'), {
  loading: () => <div className="section section-white">Loading...</div>
});

const TeamCarousel = dynamic(() => import('@/components/TeamCarousel'), {
  loading: () => <div className="section section-black">Loading...</div>
});

const ContactSection = dynamic(() => import('@/components/ContactSection'), {
  loading: () => <div className="section section-white">Loading...</div>
});

export default function Home() {
  return (
    <main className="section-container">
      <HeroSection />
      <WhatSection />
      <HowSection />
      <WhySection />
      <section className="section section-black">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">Who we are</h2>
          <div className="flex justify-center">
            <TeamCarousel />
          </div>
        </div>
      </section>
      <ContactSection />
    </main>
  );
}
