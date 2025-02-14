'use client';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

// Vereinfachte dynamische Imports
const HeroSection = dynamic(() => import('@/components/HeroSection'));
const WhatSection = dynamic(() => import('@/components/WhatSection'));
const HowSection = dynamic(() => import('@/components/HowSection'));
const WhySection = dynamic(() => import('@/components/WhySection'));
const TeamCarousel = dynamic(() => import('@/components/TeamCarousel'));
const ContactSection = dynamic(() => import('@/components/ContactSection'));

export default function Home() {
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
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <main className="section-container">
        <HeroSection />
        <WhatSection />
        <HowSection />
        <WhySection />
        <section className="section section-black">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">Who we are</h2>
            <TeamCarousel />
          </div>
        </section>
        <ContactSection />
      </main>
      {mounted && (
        <div className="section-dots">
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <div
              key={index}
              className={`section-dot ${activeSection === index ? 'active' : ''}`}
              onClick={() => scrollToSection(index)}
              role="button"
              aria-label={`Scroll to section ${index + 1}`}
            />
          ))}
        </div>
      )}
    </>
  );
}
