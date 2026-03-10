'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnalysisResult, ExtractionResult } from '@/types/zoho-check';

interface Props {
  open: boolean;
  onClose: () => void;
  email: string;
  analysis: AnalysisResult;
  extraction: ExtractionResult;
}

export default function PdfEmailModal({ open, onClose, email, analysis, extraction }: Props) {
  const [sendEmail, setSendEmail] = useState(email);
  const [optIn, setOptIn] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSend() {
    setStatus('sending');
    try {
      const res = await fetch('/api/zoho-check/send-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: sendEmail, analysis, extraction, optIn }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Versand fehlgeschlagen');
      }
      setStatus('sent');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Fehler beim Versenden');
      setStatus('error');
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white max-w-md w-full p-8"
            onClick={e => e.stopPropagation()}
          >
            {status === 'sent' ? (
              <div className="text-center">
                <div className="text-4xl mb-4">✓</div>
                <h3 className="text-xl font-bold text-black mb-2">E-Mail wird versendet</h3>
                <p className="text-gray-600 mb-6">Die Analyse als PDF wurde an <strong>{sendEmail}</strong> gesendet. Bitte prüfen Sie auch Ihren Spam-Ordner.</p>
                <button onClick={onClose} className="bg-black text-white px-8 py-3 font-semibold hover:opacity-80 transition-opacity">
                  Schließen
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-black">Analyse per E-Mail erhalten</h3>
                  <button onClick={onClose} className="text-gray-400 hover:text-black text-xl leading-none">×</button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold tracking-widest uppercase text-black mb-2">
                      E-Mail-Adresse
                    </label>
                    <input
                      type="email"
                      value={sendEmail}
                      onChange={e => setSendEmail(e.target.value)}
                      className="w-full border border-black px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={optIn}
                      onChange={e => setOptIn(e.target.checked)}
                      className="mt-1 flex-shrink-0"
                    />
                    <span className="text-sm text-gray-600">
                      Ich möchte gelegentlich Tipps zu Zoho CRM und Prozessoptimierung von Tau Process House erhalten. (Abmeldung jederzeit möglich)
                    </span>
                  </label>

                  {status === 'error' && (
                    <p className="text-sm text-red-600">{errorMsg}</p>
                  )}

                  <button
                    onClick={handleSend}
                    disabled={status === 'sending' || !sendEmail}
                    className="w-full bg-black text-white py-3 font-semibold hover:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === 'sending' ? 'Wird gesendet…' : 'PDF jetzt zusenden'}
                  </button>

                  <p className="text-xs text-gray-400 text-center">
                    Mit dem Absenden bestätigen Sie die{' '}
                    <a href="/privacy" className="underline" target="_blank">Datenschutzerklärung</a>.
                  </p>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
