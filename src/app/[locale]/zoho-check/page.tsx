'use client';

import { useState, useEffect } from 'react';
import CheckHero from '@/components/zoho-check/CheckHero';
import StepInput from '@/components/zoho-check/StepInput';
import StepLoading from '@/components/zoho-check/StepLoading';
import StepResults from '@/components/zoho-check/StepResults';
import { CheckFormData, ExtractionResult, AnalysisResult } from '@/types/zoho-check';

type CheckStep = 'input' | 'extracting' | 'analyzing' | 'results' | 'error';

export default function ZohoCheckPage() {
  const [step, setStep] = useState<CheckStep>('input');
  const [formData, setFormData] = useState<CheckFormData | null>(null);
  const [extractionData, setExtractionData] = useState<ExtractionResult | null>(null);
  const [analysisData, setAnalysisData] = useState<AnalysisResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loadingPhase, setLoadingPhase] = useState<1 | 2 | 3>(1);
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    setMounted(true);
    const updateActiveDot = () => {
      const container = document.getElementById('zoho-check-root');
      if (!container) return;
      const sectionHeight = window.innerHeight;
      const scrollPosition = container.scrollTop;
      const currentSection = Math.round(scrollPosition / sectionHeight);
      setActiveSection(currentSection);
    };

    const container = document.getElementById('zoho-check-root');
    if (container) {
      container.addEventListener('scroll', updateActiveDot);
      updateActiveDot();
    }

    return () => {
      container?.removeEventListener('scroll', updateActiveDot);
    };
  }, []);

  const scrollToSection = (index: number) => {
    const container = document.getElementById('zoho-check-root');
    if (container) {
      container.scrollTo({
        top: index * window.innerHeight,
        behavior: 'smooth',
      });
    }
  };

  async function handleSubmit(data: CheckFormData) {
    setFormData(data);
    setStep('extracting');
    setLoadingPhase(1);

    try {
      const extractRes = await fetch('/api/zoho-check/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!extractRes.ok) {
        const err = await extractRes.json();
        throw new Error(err.error || 'Extraktion fehlgeschlagen');
      }

      const extraction: ExtractionResult = await extractRes.json();
      setExtractionData(extraction);
      setLoadingPhase(2);

      await new Promise(r => setTimeout(r, 800));
      setLoadingPhase(3);

      const analyzeRes = await fetch('/api/zoho-check/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ extraction, licenseType: data.licenseType }),
      });

      if (!analyzeRes.ok) {
        const err = await analyzeRes.json();
        throw new Error(err.error || 'Analyse fehlgeschlagen');
      }

      const { analysis }: { analysis: AnalysisResult } = await analyzeRes.json();
      setAnalysisData(analysis);

      fetch('/api/zoho-check/crm-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          website: data.website,
          licenseType: data.licenseType,
          moduleList: data.moduleList,
          analysis,
          extraction,
        }),
      }).catch(console.error);

      setStep('results');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Ein unbekannter Fehler ist aufgetreten.');
      setStep('error');
    }
  }

  function handleRetry() {
    setStep('input');
    setErrorMessage(null);
    setExtractionData(null);
    setAnalysisData(null);
  }

  return (
    <>
      <main>
        <CheckHero />

        {step === 'input' && (
          <StepInput onSubmit={handleSubmit} />
        )}

        {(step === 'extracting' || step === 'analyzing') && (
          <StepLoading phase={loadingPhase} />
        )}

        {step === 'error' && (
          <section
            className="section section-white"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <div className="max-w-lg text-center px-6">
              <h2 className="text-2xl font-bold mb-4 text-black">Analyse fehlgeschlagen</h2>
              <p className="text-gray-600 mb-8">{errorMessage}</p>
              <button
                onClick={handleRetry}
                className="bg-black text-white px-8 py-3 font-medium hover:opacity-80 transition-opacity"
              >
                Erneut versuchen
              </button>
            </div>
          </section>
        )}

        {step === 'results' && analysisData && extractionData && formData && (
          <StepResults
            analysis={analysisData}
            extraction={extractionData}
            email={formData.email}
          />
        )}
      </main>

      {mounted && (
        <div className="section-dots">
          {[0, 1].map(index => (
            <div
              key={index}
              className={`section-dot ${activeSection === index ? 'active' : ''}`}
              onClick={() => scrollToSection(index)}
              role="button"
              aria-label={`Abschnitt ${index + 1}`}
            />
          ))}
        </div>
      )}
    </>
  );
}
