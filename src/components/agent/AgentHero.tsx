'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const FONT = 'Arial, Helvetica, sans-serif';
const MONO = '"SF Mono", Menlo, Consolas, "Liberation Mono", monospace';

interface LeadField { label: string; value: string; bold?: boolean; muted?: string; accent?: boolean; }
interface Chip { icon: string; text: string; }

interface ChatData {
  title: string;
  envPill: string;
  userPrompt: string;
  userTime: string;
  toolCall: string;
  assistantTime: string;
  replyIntro: string;
  leadFields: LeadField[];
  replyFooterBold: string;
  replyFooterSuffix: string;
  nextPrompt: string;
  inputPlaceholder: string;
  chips: Chip[];
}

interface AgentHeroProps {
  pill: { text: string; tag: string };
  titleLine1: string;
  titlePre: string;
  titleGold: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  meta: string[];
  chat: ChatData;
}

function ChatPreview({ data }: { data: ChatData }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 600),
      setTimeout(() => setPhase(2), 1600),
      setTimeout(() => setPhase(3), 2800),
      setTimeout(() => setPhase(4), 3600),
      setTimeout(() => setPhase(5), 4400),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const fadeIn = { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4 } };

  return (
    <div style={{
      backgroundColor: '#0a0a0a',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 12, overflow: 'hidden',
      fontFamily: FONT, fontSize: 13, color: '#fff',
      boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
    }}>
      {/* Title bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 14px', borderBottom: '1px solid rgba(255,255,255,0.08)',
        backgroundColor: 'rgba(255,255,255,0.03)',
      }}>
        <span style={{ fontWeight: 700, fontSize: 13 }}>{data.title}</span>
        <span style={{
          fontSize: 11, padding: '2px 8px', borderRadius: 999,
          backgroundColor: 'rgba(200,150,46,0.15)', color: '#C8962E',
          border: '1px solid rgba(200,150,46,0.25)', fontFamily: MONO,
        }}>
          {data.envPill}
        </span>
      </div>

      {/* Chat body */}
      <div style={{ padding: '16px 14px', minHeight: 280, display: 'flex', flexDirection: 'column', gap: 12 }}>

        {/* User message */}
        {phase >= 1 && (
          <motion.div {...fadeIn} style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, alignItems: 'flex-start' }}>
            <div style={{
              backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '10px 10px 2px 10px',
              padding: '8px 12px', maxWidth: '75%',
            }}>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10, marginBottom: 3, fontFamily: MONO }}>You · {data.userTime}</div>
              <div style={{ color: '#fff' }}>{data.userPrompt}</div>
            </div>
          </motion.div>
        )}

        {/* Tool call */}
        {phase >= 2 && (
          <motion.div {...fadeIn} style={{
            backgroundColor: 'rgba(200,150,46,0.06)', border: '1px solid rgba(200,150,46,0.2)',
            borderRadius: 8, padding: '6px 10px', fontFamily: MONO, fontSize: 11,
            color: 'rgba(200,150,46,0.8)',
          }}>
            ⟳ {data.toolCall}
          </motion.div>
        )}

        {/* Agent reply */}
        {phase >= 3 && (
          <motion.div {...fadeIn} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
            <div style={{
              backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '10px 10px 10px 2px', padding: '10px 12px', flex: 1,
            }}>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, marginBottom: 6, fontFamily: MONO }}>Tau Agent · {data.assistantTime}</div>
              <div style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 10, fontSize: 12 }}>{data.replyIntro}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 10 }}>
                {data.leadFields.map((f) => (
                  <div key={f.label} style={{ display: 'flex', gap: 8, fontSize: 12 }}>
                    <span style={{ color: 'rgba(255,255,255,0.35)', minWidth: 54, fontFamily: MONO, fontSize: 11 }}>{f.label}</span>
                    <span style={{ color: f.accent ? '#C8962E' : f.bold ? '#fff' : 'rgba(255,255,255,0.75)', fontWeight: f.bold ? 600 : 400 }}>
                      {f.value}
                      {f.muted && <span style={{ color: 'rgba(255,255,255,0.35)', marginLeft: 4 }}>· {f.muted}</span>}
                    </span>
                  </div>
                ))}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 12, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 8 }}>
                Auto-routed to <strong style={{ color: '#fff' }}>{data.replyFooterBold}</strong>{data.replyFooterSuffix}
              </div>
            </div>
          </motion.div>
        )}

        {/* Chips */}
        {phase >= 4 && (
          <motion.div {...fadeIn} style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {data.chips.map((c) => (
              <span key={c.text} style={{
                fontSize: 11, padding: '3px 8px', borderRadius: 999,
                backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.5)', fontFamily: MONO,
              }}>
                {c.icon} {c.text}
              </span>
            ))}
          </motion.div>
        )}
      </div>

      {/* Input bar */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.08)', padding: '10px 14px',
        display: 'flex', alignItems: 'center', gap: 8,
        backgroundColor: 'rgba(255,255,255,0.02)',
      }}>
        {phase >= 5 ? (
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, flex: 1, fontFamily: MONO }}>
            {data.nextPrompt}
            <span style={{ animation: 'blink 1s step-end infinite', marginLeft: 1 }}>|</span>
          </span>
        ) : (
          <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 13, flex: 1 }}>{data.inputPlaceholder}</span>
        )}
        <div style={{
          width: 28, height: 28, borderRadius: 6,
          backgroundColor: phase >= 5 ? '#C8962E' : 'rgba(255,255,255,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background-color 0.4s',
        }}>
          <span style={{ color: phase >= 5 ? '#000' : 'rgba(255,255,255,0.3)', fontSize: 14 }}>↑</span>
        </div>
      </div>
    </div>
  );
}

export default function AgentHero({
  pill, titleLine1, titlePre, titleGold, subtitle,
  primaryCta, secondaryCta, meta, chat,
}: AgentHeroProps) {
  return (
    <section
      id="top"
      style={{
        backgroundColor: '#000', color: '#fff',
        minHeight: '100dvh', display: 'flex', alignItems: 'center',
        paddingTop: 100, paddingBottom: 80,
        fontFamily: FONT,
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center',
        }} className="agent-hero-grid">

          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Pill */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              border: '1px solid rgba(200,150,46,0.3)', borderRadius: 999,
              padding: '5px 12px', marginBottom: 28,
              backgroundColor: 'rgba(200,150,46,0.08)',
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#C8962E' }} />
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>{pill.text}</span>
              <span style={{
                backgroundColor: '#C8962E', color: '#000', fontWeight: 700,
                fontSize: 10, padding: '2px 7px', borderRadius: 999, letterSpacing: '0.05em',
              }}>
                {pill.tag}
              </span>
            </div>

            {/* Title */}
            <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.25rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: 20 }}>
              {titleLine1}<br />
              {titlePre} <span style={{ color: '#C8962E' }}>{titleGold}</span>
            </h1>

            <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.6)', lineHeight: 1.65, marginBottom: 32, maxWidth: 480 }}>
              {subtitle}
            </p>

            {/* CTAs */}
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

            {/* Meta checkmarks */}
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              {meta.map((item) => (
                <span key={item} style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.45)', fontSize: 13 }}>
                  <span style={{ color: '#C8962E' }}>✓</span> {item}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right: chat preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <ChatPreview data={chat} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
