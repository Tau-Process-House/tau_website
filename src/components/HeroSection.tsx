'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function HeroSection() {
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
              src="/img/logo.webp" 
              alt="Process House Logo" 
              width={128} 
              height={128} 
              className="mx-auto mb-6" 
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Process House</h1>
          <p className="text-xl md:text-2xl">where processes want to live</p>
        </div>
      </motion.div>
    </section>
  );
} 