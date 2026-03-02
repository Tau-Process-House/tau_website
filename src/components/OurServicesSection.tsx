'use client';
import { useState } from 'react';
import { motion, PanInfo } from 'framer-motion';
import Image from 'next/image';

const FONT = 'Arial, Helvetica, sans-serif';

const steps = [
  {
    number: '01',
    title: 'Consulting',
    description:
      'We start by capturing the current state of your processes. Through structured requirement gathering with all stakeholders, we define a clear target state and design the Zoho system architecture.',
  },
  {
    number: '02',
    title: 'Migration & Setup',
    description:
      'We design and build your Zoho environment from scratch, or migrate your existing systems. Data structures, modules, and applications are configured precisely to match your target architecture.',
  },
  {
    number: '03',
    title: 'Development',
    description:
      'We build your system step by step in iterative development cycles: first the structure, then a complete end-to-end process (e.g. lead → invoice), then automation of individual steps.',
  },
  {
    number: '04',
    title: 'Training & Rollout',
    description:
      'We train every user group, run hands-on workshops, and stay available during and after go-live for continues support — ensuring real adoption, not just a handover.',
  },
];

function ZohoLogo() {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return (
      <span
        className="font-bold tracking-tight"
        style={{ color: '#E42527', fontSize: '3rem', fontFamily: FONT }}
      >
        ZOHO
      </span>
    );
  }

  return (
    <div className="relative mx-auto w-1/2" style={{ height: '4rem' }}>
      <Image
        src="/img/zoho-logo-white.svg"
        alt="Zoho"
        fill
        className="object-contain"
        onError={() => setImgError(true)}
      />
    </div>
  );
}

export default function OurServicesSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [showMobileDesc, setShowMobileDesc] = useState(false);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x > 50) {
      setMobileIndex((prev) => (prev - 1 + steps.length) % steps.length);
      setShowMobileDesc(false);
    } else if (info.offset.x < -50) {
      setMobileIndex((prev) => (prev + 1) % steps.length);
      setShowMobileDesc(false);
    }
  };

  return (
    <section className="section section-black">
      <div className="w-full max-w-6xl mx-auto px-8 py-10 flex flex-col gap-6 md:gap-8">
        <h2
          className="font-bold text-center"
          style={{ fontSize: '3rem', fontFamily: FONT }}
        >
          Our Services
        </h2>

        {/* Zoho Foundation — logo left, text right, 20% margin around container */}
        <div className="mx-0 md:mx-[20%]">
          <div className="grid grid-cols-2 items-center gap-4 md:gap-8 mt-4 mb-4 md:mt-[40px] md:mb-[40px]">
            <div className="flex justify-center">
              <ZohoLogo />
            </div>
            <p
              className="text-white"
              style={{ fontSize: '20px', fontFamily: FONT }}
            >
              All our solutions are built on and around Zoho One, the all-in-one platform for business success.
            </p>
          </div>
        </div>

        {/* Desktop: 4 cards in a row */}
        <div className="hidden md:flex items-stretch gap-4">
          {steps.map((step, i) => (
            <div
              key={i}
              className="relative flex-1 rounded-lg border border-white/15 bg-white/5 cursor-default overflow-hidden"
              style={{ height: '20rem' }}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Front face */}
              <motion.div
                className="absolute inset-0 p-5 flex flex-col justify-between pointer-events-none"
                animate={{ opacity: hoveredCard === i ? 0 : 1 }}
                transition={{ duration: 0.2 }}
              >
                <span
                  className="text-white/25 font-mono tracking-widest"
                  style={{ fontSize: '20px', fontFamily: FONT }}
                >
                  {step.number}
                </span>
                <span
                  className="font-bold leading-snug"
                  style={{ fontSize: '24px', fontFamily: FONT }}
                >
                  {step.title}
                </span>
              </motion.div>

              {/* Back face */}
              <motion.div
                className="absolute inset-0 p-5 flex items-center pointer-events-none"
                style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
                animate={{ opacity: hoveredCard === i ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <p
                  className="leading-relaxed"
                  style={{ fontSize: '18px', color: 'white', fontFamily: FONT }}
                >
                  {step.description}
                </p>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Mobile: step indicators + single swipeable card */}
        <div className="md:hidden flex flex-col gap-4">
          <div className="flex justify-center gap-3">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setMobileIndex(i);
                  setShowMobileDesc(false);
                }}
                className={`w-8 h-8 rounded-full border transition-all font-mono ${
                  mobileIndex === i
                    ? 'border-white bg-white text-black font-bold'
                    : 'border-white/30 text-white/40'
                }`}
                style={{ fontSize: '20px', fontFamily: FONT }}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            className="relative rounded-lg border border-white/15 bg-white/5 overflow-hidden cursor-pointer select-none"
            style={{ height: '16rem' }}
            onClick={() => setShowMobileDesc((prev) => !prev)}
          >
            <motion.div
              className="absolute inset-0 p-5 flex flex-col justify-between pointer-events-none"
              animate={{ opacity: showMobileDesc ? 0 : 1 }}
              transition={{ duration: 0.2 }}
            >
              <span
                className="text-white/25 font-mono tracking-widest"
                style={{ fontSize: '20px', fontFamily: FONT }}
              >
                {steps[mobileIndex].number}
              </span>
              <div>
                <span
                  className="font-bold"
                  style={{ fontSize: '24px', fontFamily: FONT }}
                >
                  {steps[mobileIndex].title}
                </span>
                <p
                  className="text-white/35 mt-2"
                  style={{ fontSize: '14px', fontFamily: FONT }}
                >
                  tap for details · swipe to navigate
                </p>
              </div>
            </motion.div>

            <motion.div
              className="absolute inset-0 p-5 flex items-center pointer-events-none"
              style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
              animate={{ opacity: showMobileDesc ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <p
                className="leading-relaxed"
                style={{ fontSize: '20px', color: 'white', fontFamily: FONT }}
              >
                {steps[mobileIndex].description}
              </p>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
