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
  installUrl: string;
  installLabel: string;
  installHint: string;
  steps: string[];
  secondaryLabel: string;
}

export default function AgentCta({
  sectionLabel, titleLine1, titleLine2Pre, titleLine2Gold, subtitle, footnote,
  installUrl, installLabel, installHint, steps, secondaryLabel,
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
        if (parts.length === 3) {
          setTimeout(() => { el.style.height = newHeight; }, 500);
        } else {
          el.style.height = newHeight;
        }
      }
    };

    window.addEventListener('message', handleMessage, false);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <section id="cta" style={{
      backgroundColor: '#000', color: '#fff', padding: '6rem 0',
      flex: '1 1 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center',
      borderTop: '1px solid rgba(255,255,255,0.07)', fontFamily: FONT, textAlign: 'center',
    }}>
      <div style={{ maxWidth: 640, margin: 'auto', padding: '0 2rem', width: '100%' }}>
        <div style={{ color: '#C8962E', fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>
          {sectionLabel}
        </div>

        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.75rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: 16 }}>
          {titleLine1}<br />
          {titleLine2Pre} <span style={{ color: '#C8962E' }}>{titleLine2Gold}</span>
        </h2>

        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, marginBottom: 28 }}>
          {subtitle}
        </p>

        <ol role="list" style={{
          listStyle: 'none', padding: 0, margin: '0 auto 32px', maxWidth: 460,
          display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'left',
        }}>
          {steps.map((s, i) => (
            <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>
              <span style={{
                flexShrink: 0, width: 22, height: 22, borderRadius: 999,
                backgroundColor: 'rgba(200,150,46,0.15)', color: '#C8962E',
                fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{i + 1}</span>
              <span>{s}</span>
            </li>
          ))}
        </ol>

        <a
          href={installUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block', backgroundColor: '#C8962E', color: '#000',
            fontWeight: 700, fontSize: 16, padding: '0.9rem 2rem',
            borderRadius: 8, textDecoration: 'none',
          }}
        >
          {installLabel}
        </a>

        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 16, maxWidth: 460, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.5 }}>
          {installHint}
        </p>

        <details style={{ marginTop: 32 }}>
          <summary style={{ cursor: 'pointer', fontSize: 13, color: 'rgba(255,255,255,0.55)', listStyle: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            {secondaryLabel}
            <span style={{ fontSize: 11, opacity: 0.6 }}>▾</span>
          </summary>
          <div id={ZOHO_DIV_ID} style={{ width: '100%', marginTop: 20 }} />
        </details>

        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 24 }}>
          {footnote}
        </p>
      </div>
    </section>
  );
}
