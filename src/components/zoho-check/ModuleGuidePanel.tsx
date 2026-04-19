'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  open: boolean;
  onClose: () => void;
}

const GUIDE_STEPS = [
  {
    title: 'Zoho CRM öffnen & Einstellungen aufrufen',
    description: 'Melden Sie sich in Ihrem Zoho CRM an. Klicken Sie oben rechts auf das Zahnrad-Symbol (⚙), um die Einstellungen zu öffnen.',
  },
  {
    title: '„Module & Felder" auswählen',
    description: 'Im Einstellungsmenü finden Sie links unter „Anpassung" den Punkt „Module & Felder". Klicken Sie darauf.',
  },
  {
    title: 'Alle Module markieren',
    description: 'Die Tabelle zeigt alle Ihre CRM-Module. Klicken Sie in die Tabelle und markieren Sie alles mit Strg+A (Windows) bzw. Cmd+A (Mac).',
  },
  {
    title: 'Kopieren & Einfügen',
    description: 'Kopieren Sie die markierten Daten mit Strg+C (Windows) bzw. Cmd+C (Mac) und fügen Sie sie dann in das Textfeld links ein (Strg+V / Cmd+V).',
  },
];

export default function ModuleGuidePanel({ open, onClose }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.3 }}
          className="hidden md:flex flex-col border-l border-gray-200 bg-gray-50 overflow-y-auto"
          style={{ width: '100%', maxHeight: 'calc(100vh - 100px)' }}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-gray-50 z-10">
            <h3 className="font-semibold text-black text-sm">Wie kopiere ich die Modulliste?</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-black transition-colors text-lg leading-none"
              aria-label="Anleitung schließen"
            >
              ×
            </button>
          </div>

          <div className="p-4 space-y-6">
            {GUIDE_STEPS.map((step, i) => (
              <div key={i}>
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-6 h-6 bg-black text-white text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <h4 className="font-semibold text-black text-sm leading-snug">{step.title}</h4>
                </div>

                {/* Screenshot placeholder */}
                <div className="ml-9 mb-3">
                  <div
                    className="bg-gray-200 border border-gray-300 flex items-center justify-center text-gray-400 text-xs"
                    style={{ height: 120 }}
                  >
                    Screenshot {i + 1}/{GUIDE_STEPS.length}
                  </div>
                </div>

                <p className="ml-9 text-gray-600 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}

            <div className="ml-9 p-3 bg-black text-white text-xs">
              <strong>Tipp:</strong> Die Liste enthält zwei Spalten: den angezeigten Namen und den API-Namen.
              Beide werden für die Analyse benötigt.
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
