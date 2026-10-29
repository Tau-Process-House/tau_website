'use client';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';

const HeroSection = dynamic(() => import('@/components/HeroSection'));
const WhatSection = dynamic(() => import('@/components/WhatSection'));
const OurServicesSection = dynamic(() => import('@/components/OurServicesSection'));
const TeamCarousel = dynamic(() => import('@/components/TeamCarousel'));
const ContactSection = dynamic(() => import('@/components/ContactSection'));

export default function Home() {
  const t = useTranslations('team');

  return (
    <main className="section-container">
      <HeroSection />
      <WhatSection />
      <OurServicesSection />
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
