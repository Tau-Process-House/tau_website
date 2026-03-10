'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { CheckFormData, LicenseType } from '@/types/zoho-check';
import ModuleGuidePanel from './ModuleGuidePanel';

const GENERIC_DOMAINS = new Set([
  'gmail.com', 'googlemail.com', 'yahoo.com', 'yahoo.de', 'hotmail.com',
  'hotmail.de', 'web.de', 'gmx.de', 'gmx.net', 'outlook.com', 'outlook.de',
  'icloud.com', 't-online.de', 'freenet.de', 'posteo.de', 'aol.com',
  'protonmail.com', 'proton.me', 'tutanota.com', 'mail.ru', 'live.com',
  'live.de', 'msn.com', 'me.com', 'mac.com',
]);

interface Props {
  onSubmit: (data: CheckFormData) => void;
}

const LICENSE_OPTIONS: { value: LicenseType; label: string; description: string }[] = [
  { value: 'standalone', label: 'Zoho CRM Standalone', description: 'Nur Zoho CRM, ohne weitere Zoho-Apps' },
  { value: 'bundle',     label: 'Mehrere Zoho Apps',   description: 'Zoho CRM + weitere Zoho-Anwendungen' },
  { value: 'zoho-one',  label: 'Zoho One',             description: 'Die All-in-One Zoho Suite' },
];

const BENEFITS = [
  'Erkennt ungenutzte und fehlende Module',
  'Bewertet Ihre Lizenz-Effizienz',
  'Gibt konkrete Quick Wins mit Aufwand & Impact',
];

export default function StepInput({ onSubmit }: Props) {
  const [email, setEmail] = useState('');
  const [showWebsiteField, setShowWebsiteField] = useState(false);
  const [website, setWebsite] = useState('');
  const [licenseType, setLicenseType] = useState<LicenseType>('zoho-one');
  const [moduleList, setModuleList] = useState('');
  const [gdprConsent, setGdprConsent] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleEmailBlur = useCallback(() => {
    const domain = email.split('@')[1]?.toLowerCase();
    if (domain && GENERIC_DOMAINS.has(domain)) {
      setShowWebsiteField(true);
    } else {
      setShowWebsiteField(false);
    }
  }, [email]);

  function validate(): boolean {
    const newErrors: Record<string, string> = {};
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
    }
    if (showWebsiteField && !website) {
      newErrors.website = 'Bitte geben Sie die Webseite Ihres Unternehmens ein.';
    }
    if (moduleList.trim().length < 10) {
      newErrors.moduleList = 'Bitte fügen Sie Ihre CRM-Modulliste ein (mindestens 3 Module).';
    }
    if (!gdprConsent) {
      newErrors.gdpr = 'Bitte stimmen Sie der Datenverarbeitung zu.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ email, website: showWebsiteField ? website : undefined, licenseType, moduleList, gdprConsent });
  }

  const selectedLicense = LICENSE_OPTIONS.find(o => o.value === licenseType)!;

  return (
    <section
      id="analyse-form"
      style={{ height: '100dvh', scrollSnapAlign: 'start', display: 'flex', overflow: 'hidden' }}
    >
      {/* ── Left panel: black, branding & benefits ── */}
      {/* pl-20 (5rem) ensures text clears the fixed navigation dots at left: 2rem */}
      <div
        className="hidden md:flex flex-col justify-center pl-20 pr-12 py-16"
        style={{ width: '42%', flexShrink: 0, backgroundColor: '#000', color: '#fff' }}
      >
        <p className="text-xs tracking-widest uppercase text-gray-400 mb-10">
          Tau Process House
        </p>

        <h2 className="text-3xl font-bold leading-snug mb-6">
          Wie gut ist Ihr<br />Zoho CRM<br />wirklich aufgestellt?
        </h2>

        <p className="text-gray-400 text-sm mb-10 leading-relaxed">
          Kostenlose Struktur-Analyse in 60 Sekunden.<br />
          KI-gestützt. Keine Installation. Kein Anruf.
        </p>

        <ul className="space-y-4">
          {BENEFITS.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-300 text-sm">
              <span className="mt-0.5 flex-shrink-0 text-white">●</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Right panel: white, form — flex column so my-auto centers the inner card ── */}
      <div
        className="flex-1 overflow-y-auto flex flex-col"
        style={{ backgroundColor: '#fff' }}
      >
        <div className="my-auto w-full max-w-lg mx-auto px-8 py-12">

          {/* Mobile-only heading */}
          <div className="md:hidden mb-8">
            <p className="text-xs tracking-widest uppercase text-gray-400 mb-2">Tau Process House</p>
            <h2 className="text-2xl font-bold text-black">CRM-Analyse starten</h2>
            <p className="text-gray-500 text-sm mt-1">Drei Angaben — fertig. Ca. 60 Sekunden.</p>
          </div>

          {/* Desktop heading */}
          <div className="hidden md:block mb-8">
            <h2 className="text-2xl font-bold text-black mb-1">Analyse starten</h2>
            <p className="text-gray-400 text-sm">Drei Angaben — fertig. Ca. 60 Sekunden.</p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-7">

            {/* Step 1: Email */}
            <div>
              <label className="block text-xs font-bold tracking-widest uppercase text-black mb-2">
                01 — Geschäfts-E-Mail
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onBlur={handleEmailBlur}
                placeholder="name@ihr-unternehmen.de"
                className="w-full border-b-2 border-black px-0 py-3 text-black bg-transparent focus:outline-none placeholder-gray-300"
                style={{ borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}

              {showWebsiteField && (
                <div className="mt-4 pl-4 border-l-2 border-gray-300">
                  <p className="text-xs text-gray-500 mb-3">
                    Private E-Mail erkannt — bitte Unternehmens-Webseite angeben.
                  </p>
                  <label className="block text-xs font-bold tracking-widest uppercase text-black mb-2">
                    Webseite Ihres Unternehmens
                  </label>
                  <input
                    type="url"
                    value={website}
                    onChange={e => setWebsite(e.target.value)}
                    placeholder="https://ihr-unternehmen.de"
                    className="w-full border-b-2 border-black px-0 py-3 text-black bg-transparent focus:outline-none placeholder-gray-300"
                    style={{ borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}
                  />
                  {errors.website && <p className="mt-1 text-sm text-red-600">{errors.website}</p>}
                </div>
              )}
            </div>

            {/* Step 2: License — custom on-theme dropdown */}
            <div>
              <label className="block text-xs font-bold tracking-widest uppercase text-black mb-2">
                02 — Zoho-Lizenzmodell
              </label>
              <div className="relative" ref={dropdownRef}>
                {/* Trigger button — matches underline style of other inputs */}
                <button
                  type="button"
                  onClick={() => setDropdownOpen(o => !o)}
                  className="w-full flex items-center justify-between border-b-2 border-black py-3 text-black bg-transparent focus:outline-none text-left"
                >
                  <span className="text-sm">{selectedLicense.label}</span>
                  <span className="text-xs text-gray-500 ml-2 hidden sm:inline">
                    {selectedLicense.description}
                  </span>
                  <span className="ml-auto pl-4 flex-shrink-0 text-black">
                    {dropdownOpen ? '↑' : '↓'}
                  </span>
                </button>

                {/* Dropdown panel */}
                {dropdownOpen && (
                  <div className="absolute top-full left-0 right-0 bg-white border border-black z-20 shadow-lg">
                    {LICENSE_OPTIONS.map(opt => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => { setLicenseType(opt.value); setDropdownOpen(false); }}
                        className={`w-full text-left px-4 py-3 transition-colors border-b border-gray-100 last:border-0 ${
                          licenseType === opt.value
                            ? 'bg-black text-white'
                            : 'text-black hover:bg-black hover:text-white'
                        }`}
                      >
                        <div className="text-sm font-semibold">{opt.label}</div>
                        <div className={`text-xs mt-0.5 ${licenseType === opt.value ? 'text-gray-300' : 'text-gray-500'}`}>
                          {opt.description}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Step 3: Module List */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold tracking-widest uppercase text-black">
                  03 — CRM-Modulliste
                </label>
                <button
                  type="button"
                  onClick={() => setGuideOpen(!guideOpen)}
                  className={`text-xs tracking-wide underline transition-colors flex-shrink-0 ml-4 ${
                    guideOpen ? 'text-black font-bold' : 'text-gray-400 hover:text-black'
                  }`}
                >
                  {guideOpen ? '← Schließen' : 'So kopieren →'}
                </button>
              </div>
              <p className="text-xs text-gray-400 mb-3">
                Zoho CRM → Einstellungen → Module &amp; Felder → Strg+A → Strg+C → hier einfügen
              </p>
              <textarea
                value={moduleList}
                onChange={e => setModuleList(e.target.value)}
                rows={6}
                placeholder={'Leads\t\tLeads\nKontakte\t\tContacts\nAccounts\t\tAccounts\n...'}
                className="w-full border border-gray-200 px-4 py-3 text-black text-sm bg-gray-50 focus:outline-none focus:border-black focus:bg-white placeholder-gray-300 resize-none transition-colors"
              />
              {errors.moduleList && <p className="mt-1 text-sm text-red-600">{errors.moduleList}</p>}

              {guideOpen && (
                <div className="mt-4">
                  <ModuleGuidePanel open={guideOpen} onClose={() => setGuideOpen(false)} />
                </div>
              )}
            </div>

            {/* GDPR */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={gdprConsent}
                  onChange={e => setGdprConsent(e.target.checked)}
                  className="mt-1 flex-shrink-0 accent-black"
                />
                <span className="text-xs text-gray-500 leading-relaxed">
                  Ich stimme der Verarbeitung meiner Daten zur Erstellung der Analyse zu.{' '}
                  <a href="/privacy" className="underline hover:text-black" target="_blank">
                    Datenschutzhinweis
                  </a>
                </span>
              </label>
              {errors.gdpr && <p className="mt-1 text-sm text-red-600">{errors.gdpr}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-4 font-semibold tracking-wide hover:opacity-80 transition-opacity"
            >
              Analyse starten →
            </button>

          </form>
        </div>
      </div>
    </section>
  );
}
