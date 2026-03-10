'use client';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

const HeroSection = dynamic(() => import('@/components/HeroSection'));
const WhatSection = dynamic(() => import('@/components/WhatSection'));
const OurServicesSection = dynamic(() => import('@/components/OurServicesSection'));
const KpiSection = dynamic(() => import('@/components/KpiSection'));
const OurWorkSection = dynamic(() => import('@/components/OurWorkSection'));
const TeamCarousel = dynamic(() => import('@/components/TeamCarousel'));
const ContactSection = dynamic(() => import('@/components/ContactSection'));

const SHOW_OUR_WORK = process.env.NEXT_PUBLIC_SHOW_OUR_WORK === 'true';

export default function Home() {
  const t = useTranslations('team');
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    setMounted(true);
    const updateActiveDot = () => {
      const container = document.querySelector('.section-container');
      if (!container) return;
      const sectionHeight = window.innerHeight;
      const scrollPosition = container.scrollTop;
      const currentSection = Math.round(scrollPosition / sectionHeight);
      setActiveSection(currentSection);
    };

    const container = document.querySelector('.section-container');
    if (container) {
      container.addEventListener('scroll', updateActiveDot);
      updateActiveDot();
    }

    return () => {
      container?.removeEventListener('scroll', updateActiveDot);
    };
  }, []);

  const scrollToSection = (index: number) => {
    const container = document.querySelector('.section-container');
    if (container) {
      container.scrollTo({
        top: index * window.innerHeight,
        behavior: 'smooth',
      });
    }
  };

  // Number of dots depends on whether OurWork or KPI section is shown
  // Sections: Hero, Philosophy, Services, [KPI or OurWork], Team, Contact
  const sectionCount = 6;

  return (
    <>
      <main className="section-container">
        <HeroSection />
        <WhatSection />
        <OurServicesSection />
        {SHOW_OUR_WORK ? <OurWorkSection /> : <KpiSection />}
        <section className="section section-black">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">{t('title')}</h2>
            <TeamCarousel />
          </div>
        </section>
        <ContactSection />
      </main>
      {mounted && (
        <div className="section-dots">
          {Array.from({ length: sectionCount }, (_, index) => (
            <div
              key={index}
              className={`section-dot ${activeSection === index ? 'active' : ''}`}
              onClick={() => scrollToSection(index)}
              role="button"
              aria-label={`Section ${index + 1}`}
            />
          ))}
        </div>
      )}
    </>
  );
}
