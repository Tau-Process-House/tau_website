'use client';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

const HeroSection = dynamic(() => import('@/components/HeroSection'));
const WhatSection = dynamic(() => import('@/components/WhatSection'));
const OurServicesSection = dynamic(() => import('@/components/OurServicesSection'));
const TauAgentTeaserSection = dynamic(() => import('@/components/TauAgentTeaserSection'));
const TeamCarousel = dynamic(() => import('@/components/TeamCarousel'));
const ContactSection = dynamic(() => import('@/components/ContactSection'));

// TauAgentTeaserSection is at index 3 (0-based)
const AGENT_TEASER_INDEX = 3;

export default function Home() {
  const t = useTranslations('team');
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get('to') !== 'agent') return;
    const container = document.querySelector('.section-container');
    if (!container) return;
    container.scrollTo({ top: AGENT_TEASER_INDEX * window.innerHeight, behavior: 'instant' });
  }, [searchParams]);

  return (
    <main className="section-container">
      <HeroSection />
      <WhatSection />
      <OurServicesSection />
      <TauAgentTeaserSection />
      <section className="section section-black">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">{t('title')}</h2>
          <TeamCarousel />
        </div>
      </section>
      <ContactSection />
    </main>
  );
}
