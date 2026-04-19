'use client';
import { useEffect } from 'react';

const FONT = 'Arial, Helvetica, sans-serif';
const ZOHO_DIV_ID = 'zf_div_PEw73Ou9EexcH6qZG2VzbwSyiJrXfgGiG3MRQIADkN8';
const FORM_SRC = 'https://forms.zohopublic.eu/rimbasitb/form/TauAgentSignUp/formperma/PEw73Ou9EexcH6qZG2VzbwSyiJrXfgGiG3MRQIADkN8?zf_rszfm=1';

interface AgentCtaProps {
  sectionLabel: string;
  titleLine1: string;
  titleLine2Pre: string;
  titleLine2Gold: string;
  subtitle: string;
  footnote: string;
}

export default function AgentCta({
  sectionLabel, titleLine1, titleLine2Pre, titleLine2Gold, subtitle, footnote,
}: AgentCtaProps) {
  useEffect(() => {
    const container = document.getElementById(ZOHO_DIV_ID);
    if (!container || container.querySelector('iframe')) return;

    const iframe = document.createElement('iframe');
    iframe.src = FORM_SRC;
    iframe.style.border = 'none';
    iframe.style.height = '500px';
    iframe.style.width = '100%';
    iframe.setAttribute('aria-label', 'Tau Agent SignUp');
    container.appendChild(iframe);

    const handleMessage = (event: MessageEvent) => {
      if (typeof event.data !== 'string') return;
      const parts = event.data.split('|');
      if (parts.length !== 2 && parts.length !== 3) return;

      const [perma, rawHeight] = parts;
      const newHeight = (parseInt(rawHeight, 10) + 15) + 'px';
      const el = document.getElementById(ZOHO_DIV_ID)?.querySelector('iframe') as HTMLIFrameElement | null;
      if (!el || !el.src.includes('formperma') || !el.src.includes(perma)) return;

      if (parts.length === 3) el.scrollIntoView();
      if (el.style.height !== newHeight) {
        parts.length === 3
          ? setTimeout(() => { el.style.height = newHeight; }, 500)
          : (el.style.height = newHeight);
      }
    };

    window.addEventListener('message', handleMessage, false);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <section id="cta" style={{
      backgroundColor: '#000', color: '#fff', padding: '6rem 0',
      minHeight: '100dvh', display: 'flex', alignItems: 'center',
      borderTop: '1px solid rgba(255,255,255,0.07)', fontFamily: FONT, textAlign: 'center',
    }}>
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '0 2rem', width: '100%' }}>
        <div style={{ color: '#C8962E', fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>
          {sectionLabel}
        </div>

        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.75rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: 16 }}>
          {titleLine1}<br />
          {titleLine2Pre} <span style={{ color: '#C8962E' }}>{titleLine2Gold}</span>
        </h2>

        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, marginBottom: 36 }}>
          {subtitle}
        </p>

        <div id={ZOHO_DIV_ID} style={{ width: '100%' }} />

        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 24 }}>
          {footnote}
        </p>
      </div>
    </section>
  );
}
