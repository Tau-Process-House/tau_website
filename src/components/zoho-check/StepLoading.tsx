'use client';

import { motion } from 'framer-motion';

interface Props {
  phase: 1 | 2 | 3;
}

const PHASE_LABELS: Record<1 | 2 | 3, string> = {
  1: 'Website wird analysiert …',
  2: 'Module werden klassifiziert …',
  3: 'KI-Analyse wird erstellt …',
};

export default function StepLoading({ phase }: Props) {
  return (
    // Uses .section and .section-black for 100dvh + scroll-snap-align: start + flex centering
    <section className="section section-black">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center text-center px-6"
      >
        {/* Spinning circle — pure CSS, no layout-shifting text */}
        <div
          className="rounded-full border-4 border-white mb-8"
          style={{
            width: 56,
            height: 56,
            borderTopColor: 'transparent',
            animation: 'spin 0.9s linear infinite',
          }}
        />

        {/* Static headline — fixed height so it never jumps */}
        <h2 className="text-2xl font-bold text-white mb-3">
          Ihre CRM-Struktur wird analysiert
        </h2>

        {/* Phase label changes, but is below the headline so no layout shift above */}
        <p className="text-gray-400 text-sm" style={{ minWidth: 260 }}>
          {PHASE_LABELS[phase]}
        </p>

        <p className="text-gray-600 text-xs mt-3">
          Dies dauert ca. 30–60 Sekunden.
        </p>
      </motion.div>

      {/* Keyframe for the spinner — injected once via a style tag */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </section>
  );
}
