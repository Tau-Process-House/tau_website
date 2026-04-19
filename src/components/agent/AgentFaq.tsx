'use client';
import { useState } from 'react';

const FONT = 'Arial, Helvetica, sans-serif';

interface FaqItem { q: string; a: string; open?: boolean; }

interface AgentFaqProps {
  sectionLabel: string;
  title: string;
  items: FaqItem[];
}

export default function AgentFaq({ sectionLabel, title, items }: AgentFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(
    items.findIndex((i) => i.open) ?? 0
  );

  return (
    <section id="faq" style={{
      backgroundColor: '#000', color: '#fff', padding: '6rem 0',
      minHeight: '100dvh', display: 'flex', alignItems: 'center',
      borderTop: '1px solid rgba(255,255,255,0.07)', fontFamily: FONT,
    }}>
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '0 2rem', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ color: '#C8962E', fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
            {sectionLabel}
          </div>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.25rem)', fontWeight: 800 }}>{title}</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                style={{
                  borderTop: '1px solid rgba(255,255,255,0.08)',
                  borderBottom: i === items.length - 1 ? '1px solid rgba(255,255,255,0.08)' : undefined,
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  style={{
                    width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '1.25rem 0', background: 'none', border: 'none', cursor: 'pointer',
                    textAlign: 'left', color: '#fff', fontFamily: FONT,
                  }}
                  aria-expanded={isOpen}
                >
                  <span style={{ fontWeight: 600, fontSize: 16, paddingRight: 16 }}>{item.q}</span>
                  <span style={{
                    fontSize: 20, color: isOpen ? '#C8962E' : 'rgba(255,255,255,0.4)',
                    flexShrink: 0, transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                    display: 'inline-block', transition: 'transform 0.25s, color 0.2s',
                  }}>
                    +
                  </span>
                </button>
                {isOpen && (
                  <div style={{ paddingBottom: '1.25rem' }}>
                    <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, margin: 0 }}>
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
