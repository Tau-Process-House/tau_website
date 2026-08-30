'use client';
import { motion } from 'framer-motion';
import ZohoChatPreview, { ZohoChatPreviewProps } from './ZohoChatPreview';

const FONT = 'Arial, Helvetica, sans-serif';

interface AgentHeroProps {
  pill: { text: string; tag?: string };
  titleLine1: string;
  titlePre: string;
  titleGold: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  meta: string[];
  chatDemo: ZohoChatPreviewProps;
}

export default function AgentHero({
  pill, titleLine1, titlePre, titleGold, subtitle,
  primaryCta, secondaryCta, meta, chatDemo,
}: AgentHeroProps) {
  return (
    <section
      id="top"
      style={{
        scrollSnapAlign: 'start',
        backgroundColor: '#000', color: '#fff',
        height: '100dvh', display: 'flex', flexDirection: 'column', overflowY: 'auto',
        paddingTop: 100, paddingBottom: 80,
        fontFamily: FONT,
      }}
    >
      <div style={{ maxWidth: 1200, margin: 'auto', padding: '0 2rem', width: '100%' }}>
        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}
          className="agent-hero-grid"
        >

          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              border: '1px solid rgba(200,150,46,0.3)', borderRadius: 999,
              padding: '5px 12px', marginBottom: 28,
              backgroundColor: 'rgba(200,150,46,0.08)',
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#C8962E' }} />
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>{pill.text}</span>
              {pill.tag && (
                <span style={{
                  backgroundColor: '#C8962E', color: '#000', fontWeight: 700,
                  fontSize: 10, padding: '2px 7px', borderRadius: 999, letterSpacing: '0.05em',
                }}>
                  {pill.tag}
                </span>
              )}
            </div>

            <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.25rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: 20 }}>
              {titleLine1}<br />
              {titlePre} <span style={{ color: '#C8962E' }}>{titleGold}</span>
            </h1>

            <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.6)', lineHeight: 1.65, marginBottom: 32, maxWidth: 480 }}>
              {subtitle}
            </p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24 }}>
              <a
                href={primaryCta.href}
                style={{
                  backgroundColor: '#C8962E', color: '#000',
                  fontWeight: 700, fontSize: 15, padding: '0.75rem 1.5rem',
                  borderRadius: 8, textDecoration: 'none', transition: 'background-color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#E8B84A')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#C8962E')}
              >
                {primaryCta.label}
              </a>
              <a
                href={secondaryCta.href}
                style={{
                  backgroundColor: 'transparent', color: 'rgba(255,255,255,0.75)',
                  fontWeight: 600, fontSize: 15, padding: '0.75rem 1.5rem',
                  borderRadius: 8, textDecoration: 'none',
                  border: '1px solid rgba(255,255,255,0.2)', transition: 'border-color 0.2s, color 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'rgba(255,255,255,0.75)'; }}
              >
                {secondaryCta.label}
              </a>
            </div>

            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              {meta.map((item) => (
                <span key={item} style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.45)', fontSize: 13 }}>
                  <span style={{ color: '#C8962E' }}>✓</span> {item}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right: Zoho CRM chat preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <ZohoChatPreview {...chatDemo} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
