'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AnalysisResult, ExtractionResult } from '@/types/zoho-check';
import PdfEmailModal from './PdfEmailModal';

interface Props {
  analysis: AnalysisResult;
  extraction: ExtractionResult;
  email: string;
}

function ScoreBar({ score }: { score: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(i => (
        <div
          key={i}
          className={`h-3 flex-1 ${i <= score ? 'bg-black' : 'bg-gray-200'}`}
        />
      ))}
    </div>
  );
}

function AccordionItem({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t border-gray-200">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left font-semibold text-black hover:opacity-60 transition-opacity"
      >
        <span>{title}</span>
        <span className="text-lg">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="pb-6 overflow-hidden"
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}

function PriorityBadge({ priority }: { priority: string }) {
  const p = priority?.toLowerCase();
  if (p === 'hoch' || p === 'high')
    return <span className="text-xs font-bold bg-black text-white px-2 py-0.5">HOCH</span>;
  if (p === 'mittel' || p === 'medium')
    return <span className="text-xs font-bold bg-gray-600 text-white px-2 py-0.5">MITTEL</span>;
  return <span className="text-xs font-bold bg-gray-300 text-black px-2 py-0.5">NIEDRIG</span>;
}

export default function StepResults({ analysis, extraction, email }: Props) {
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const es = analysis.executive_summary;
  const stats = extraction.module_stats;

  return (
    // Snap section: 100dvh fixed height, snaps into place.
    // All results content scrolls internally via overflow-y: auto.
    <section
      style={{ height: '100dvh', scrollSnapAlign: 'start', overflowY: 'auto', backgroundColor: '#fff' }}
    >
      <PdfEmailModal
        open={pdfModalOpen}
        onClose={() => setPdfModalOpen(false)}
        email={email}
        analysis={analysis}
        extraction={extraction}
      />

      {/* Executive Summary — White */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs tracking-widest uppercase text-gray-400 mb-6">Ihre Analyse</p>

            {/* Score Card */}
            <div className="border border-black p-6 md:p-8 mb-8">
              <div className="flex items-start gap-6 mb-4">
                <div className="text-center flex-shrink-0">
                  <div className="text-5xl font-bold text-black">{es.crm_maturity_score}</div>
                  <div className="text-xs text-gray-400">von 5</div>
                </div>
                <div className="flex-1">
                  <div className="font-bold text-lg text-black mb-1">{es.crm_maturity_label}</div>
                  <ScoreBar score={es.crm_maturity_score} />
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">{es.headline}</p>
            </div>

            {/* Key Findings */}
            <div className="mb-8">
              <h3 className="text-xs font-bold tracking-widest uppercase text-black mb-4">Wichtigste Erkenntnisse</h3>
              <ul className="space-y-3">
                {es.key_findings.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-black">
                    <span className="mt-1 flex-shrink-0 text-black">●</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Module Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              {[
                { label: 'Module gesamt', value: stats.total },
                { label: 'Standard', value: stats.default },
                { label: 'Integrationen', value: stats.integration },
                { label: 'Custom', value: stats.custom },
              ].map(stat => (
                <div key={stat.label} className="bg-gray-50 p-4 text-center">
                  <div className="text-3xl font-bold text-black">{stat.value}</div>
                  <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Accordions */}
            <div className="border-b border-gray-200">
              {/* Module Analysis */}
              <AccordionItem title="Modul-Analyse">
                <p className="text-gray-700 mb-4">{analysis.module_analysis.module_ratio_assessment}</p>
                {analysis.module_analysis.notable_modules.well_utilized.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs font-bold uppercase text-black mb-2">Gut genutzt</p>
                    <ul className="space-y-1">
                      {analysis.module_analysis.notable_modules.well_utilized.map((m, i) => (
                        <li key={i} className="text-sm text-gray-700 flex items-start gap-2"><span>✓</span><span>{m}</span></li>
                      ))}
                    </ul>
                  </div>
                )}
                {analysis.module_analysis.notable_modules.underutilized_integrations.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs font-bold uppercase text-black mb-2">Ungenutzte Integrationen</p>
                    <ul className="space-y-1">
                      {analysis.module_analysis.notable_modules.underutilized_integrations.map((m, i) => (
                        <li key={i} className="text-sm text-gray-700 flex items-start gap-2"><span>!</span><span>{m}</span></li>
                      ))}
                    </ul>
                  </div>
                )}
                {analysis.module_analysis.notable_modules.questionable_custom.length > 0 && (
                  <div>
                    <p className="text-xs font-bold uppercase text-black mb-2">Custom-Module hinterfragen</p>
                    <ul className="space-y-1">
                      {analysis.module_analysis.notable_modules.questionable_custom.map((m, i) => (
                        <li key={i} className="text-sm text-gray-700 flex items-start gap-2"><span>?</span><span>{m}</span></li>
                      ))}
                    </ul>
                  </div>
                )}
              </AccordionItem>

              {/* License Fit */}
              <AccordionItem title="Lizenz-Analyse">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500 w-32">Nutzungsgrad:</span>
                    <ScoreBar score={analysis.license_fit_analysis.license_utilization_score} />
                    <span className="text-sm font-bold">{analysis.license_fit_analysis.license_utilization_score}/5</span>
                  </div>
                  <p className="text-sm text-gray-700"><strong>Empfehlung:</strong> {analysis.license_fit_analysis.recommendation}</p>
                  {analysis.license_fit_analysis.wasted_potential && (
                    <p className="text-sm text-gray-700"><strong>Ungenutztes Potenzial:</strong> {analysis.license_fit_analysis.wasted_potential}</p>
                  )}
                </div>
              </AccordionItem>

              {/* Gap Analysis */}
              <AccordionItem title="Gap-Analyse">
                <div className="space-y-6">
                  {analysis.gap_analysis.missing_standard_modules.length > 0 && (
                    <div>
                      <p className="text-xs font-bold uppercase text-black mb-3">Fehlende Standard-Module</p>
                      <div className="space-y-3">
                        {analysis.gap_analysis.missing_standard_modules.map((g, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <PriorityBadge priority={g.priority} />
                            <div>
                              <p className="text-sm font-semibold text-black">{g.module}</p>
                              <p className="text-sm text-gray-600">{g.reason}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {analysis.gap_analysis.missing_integrations.length > 0 && (
                    <div>
                      <p className="text-xs font-bold uppercase text-black mb-3">Fehlende Integrationen</p>
                      <div className="space-y-3">
                        {analysis.gap_analysis.missing_integrations.map((g, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <PriorityBadge priority={g.priority} />
                            <div>
                              <p className="text-sm font-semibold text-black">{g.integration}</p>
                              <p className="text-sm text-gray-600">{g.use_case}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {analysis.gap_analysis.process_gaps.length > 0 && (
                    <div>
                      <p className="text-xs font-bold uppercase text-black mb-3">Prozess-Lücken</p>
                      <div className="space-y-3">
                        {analysis.gap_analysis.process_gaps.map((g, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <PriorityBadge priority={g.priority} />
                            <div>
                              <p className="text-sm font-semibold text-black">{g.gap}</p>
                              <p className="text-sm text-gray-600">{g.impact}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </AccordionItem>

              {/* Quick Wins */}
              <AccordionItem title="Quick Wins">
                <div className="space-y-4">
                  {analysis.recommendations.quick_wins.map((qw, i) => (
                    <div key={i} className="border-l-4 border-black pl-4">
                      <p className="font-semibold text-black">{qw.title}</p>
                      <p className="text-sm text-gray-700 mt-1">{qw.description}</p>
                      <div className="flex gap-4 mt-2 text-xs text-gray-500">
                        <span>Aufwand: <strong className="text-black">{qw.effort}</strong></span>
                        <span>Impact: <strong className="text-black">{qw.impact}</strong></span>
                        <span>Zeitrahmen: <strong className="text-black">{qw.timeframe}</strong></span>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionItem>

              {/* Strategic Steps */}
              <AccordionItem title="Strategische Schritte">
                <div className="space-y-4">
                  {analysis.recommendations.strategic_initiatives.map((s, i) => (
                    <div key={i} className="border-l-2 border-gray-300 pl-4">
                      <p className="font-semibold text-black">{s.title}</p>
                      <p className="text-sm text-gray-700 mt-1">{s.description}</p>
                      <div className="flex gap-4 mt-2 text-xs text-gray-500">
                        <span>Aufwand: <strong className="text-black">{s.effort}</strong></span>
                        <span>Zeitrahmen: <strong className="text-black">{s.timeframe}</strong></span>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionItem>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PDF Block — Black */}
      <section className="bg-black py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Analyse sichern & teilen</h2>
          <p className="text-gray-400 mb-8">
            Erhalten Sie die vollständige Analyse als PDF per E-Mail — kostenlos und sofort.
          </p>
          <button
            onClick={() => setPdfModalOpen(true)}
            className="border border-white text-white px-8 py-4 font-semibold hover:opacity-70 transition-opacity"
          >
            📄 Analyse als PDF per E-Mail erhalten
          </button>
        </div>
      </section>

      {/* Consultation CTA — White */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-widest uppercase text-gray-400 mb-4">Nächster Schritt</p>
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
            Interesse an einer vertieften Analyse?
          </h2>
          <p className="text-gray-600 mb-8 max-w-xl">
            In einem kostenlosen 30-Minuten-Gespräch zeigen wir, wie sich die Quick Wins konkret umsetzen lassen — und was mittel- bis langfristig möglich ist.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a
              href={`mailto:info@tauprocess.de?subject=CRM-Check Beratungsgespräch&body=Hallo,%0A%0Aich habe den CRM-Check auf tauprocess.de genutzt und würde gerne einen Beratungstermin vereinbaren.%0A%0AMeine Analyse-Referenz: ${email}%0A%0AMit freundlichen Grüßen`}
              className="bg-black text-white px-8 py-4 font-semibold hover:opacity-80 transition-opacity text-center"
            >
              Beratungsgespräch anfragen
            </a>
          </div>

          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-black transition-colors underline"
          >
            ← Zurück zur Hauptseite
          </Link>
        </div>
      </section>
    </section>
  );
}
