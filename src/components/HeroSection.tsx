'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLocalized } from '@/lib/use-localized';
import heroData from '@/data/hero.json';
import type { HeroContent } from '@/types/content';

const hero = heroData as HeroContent;

export default function HeroSection() {
  const loc = useLocalized();

  return (
    <section className="section section-black">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-black mb-6">
            <Image
              src={hero.logo.src}
              alt={loc(hero.logo.alt)}
              width={128}
              height={128}
              className="mx-auto"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{hero.title}</h1>
          <p className="text-xl md:text-2xl">{loc(hero.tagline)}</p>
        </div>
      </motion.div>
    </section>
  );
}
