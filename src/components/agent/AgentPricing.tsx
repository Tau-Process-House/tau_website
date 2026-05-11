'use client';

const FONT = 'Arial, Helvetica, sans-serif';
const GOLD = '#C8962E';

interface PricingTier {
  id: string;
  name: string;
  price?: string;
  currency?: string;
  available: boolean;
  highlight?: boolean;
  tagline: string;
  features: string[];
}

interface AgentPricingProps {
  sectionLabel: string;
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  perUserMonth: string;
  vatNote: string;
  onRequest: string;
  comingSoonLabel: string;
  ctaAvailableLabel: string;
  ctaHref: string;
  tiers: PricingTier[];
}

export default function AgentPricing({
  sectionLabel, titleLine1, titleLine2, subtitle,
  perUserMonth, vatNote, onRequest, comingSoonLabel,
  ctaAvailableLabel, ctaHref, tiers,
}: AgentPricingProps) {
  return (
    <section
      id="pricing"
      style={{
        scrollSnapAlign: 'start',
        backgroundColor: '#000',
        color: '#fff',
        padding: '6rem 0',
        height: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        fontFamily: FONT,
      }}
    >
      <div style={{ maxWidth: 1200, margin: 'auto', padding: '0 2rem', width: '100%' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{
            color: GOLD, fontSize: 12, fontWeight: 700,
            letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12,
          }}>
            {sectionLabel}
          </div>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: 16 }}>
            {titleLine1}<br />{titleLine2}
          </h2>
          <p style={{
            fontSize: 'clamp(0.95rem, 1.2vw, 1.05rem)',
            color: 'rgba(255,255,255,0.65)',
            maxWidth: 720, margin: '0 auto', lineHeight: 1.55,
          }}>
            {subtitle}
          </p>
        </div>

        {/* Tier cards */}
        <div className="agent-pricing-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.5rem',
          alignItems: 'stretch',
        }}>
          {tiers.map((tier) => {
            const isHighlight = !!tier.highlight;
            return (
              <div
                key={tier.id}
                style={{
                  position: 'relative',
                  border: isHighlight ? `1px solid ${GOLD}66` : '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 12,
                  backgroundColor: isHighlight ? 'rgba(200,150,46,0.05)' : 'rgba(255,255,255,0.02)',
                  boxShadow: isHighlight ? '0 0 40px rgba(200,150,46,0.1)' : 'none',
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  opacity: tier.available ? 1 : 0.85,
                }}
              >
                {/* Coming Soon badge */}
                {!tier.available && (
                  <div style={{
                    position: 'absolute', top: 16, right: 16,
                    fontSize: 10, fontWeight: 700,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    padding: '4px 10px',
                    border: '1px solid rgba(255,255,255,0.18)',
                    borderRadius: 999,
                    color: 'rgba(255,255,255,0.55)',
                    backgroundColor: 'rgba(255,255,255,0.04)',
                  }}>
                    {comingSoonLabel}
                  </div>
                )}

                {/* Tier name */}
                <div style={{
                  fontSize: 14, fontWeight: 700, letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: isHighlight ? GOLD : 'rgba(255,255,255,0.6)',
                  marginBottom: 16,
                }}>
                  {tier.name}
                </div>

                {/* Price */}
                <div style={{ marginBottom: 12 }}>
                  {tier.available && tier.price ? (
                    <>
                      <span style={{
                        fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                        fontWeight: 800,
                        color: '#fff',
                        lineHeight: 1,
                      }}>
                        {tier.currency ?? '€'}{tier.price}
                      </span>
                      <span style={{
                        marginLeft: 8,
                        fontSize: 13,
                        color: 'rgba(255,255,255,0.5)',
                      }}>
                        {perUserMonth}
                      </span>
                    </>
                  ) : (
                    <span style={{
                      fontSize: 'clamp(1.4rem, 2.2vw, 1.75rem)',
                      fontWeight: 700,
                      color: 'rgba(255,255,255,0.7)',
                      lineHeight: 1,
                    }}>
                      {onRequest}
                    </span>
                  )}
                </div>

                {/* VAT note */}
                {tier.available && tier.price && (
                  <div style={{
                    fontSize: 11,
                    color: 'rgba(255,255,255,0.35)',
                    marginBottom: 16,
                  }}>
                    {vatNote}
                  </div>
                )}

                {/* Tagline */}
                <p style={{
                  fontSize: 13,
                  color: 'rgba(255,255,255,0.65)',
                  lineHeight: 1.5,
                  marginBottom: 20,
                  minHeight: 38,
                }}>
                  {tier.tagline}
                </p>

                {/* Features */}
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                  marginBottom: 24,
                  flexGrow: 1,
                }}>
                  {tier.features.map((f, i) => (
                    <li
                      key={i}
                      style={{
                        display: 'flex',
                        gap: 10,
                        fontSize: 13,
                        color: 'rgba(255,255,255,0.78)',
                        lineHeight: 1.45,
                      }}
                    >
                      <span style={{
                        color: isHighlight ? GOLD : 'rgba(255,255,255,0.45)',
                        flexShrink: 0,
                        fontWeight: 700,
                        marginTop: 1,
                      }}>
                        ✓
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                {tier.available ? (
                  <a
                    href={ctaHref}
                    style={{
                      display: 'inline-block',
                      textAlign: 'center',
                      padding: '12px 18px',
                      borderRadius: 8,
                      backgroundColor: GOLD,
                      color: '#000',
                      fontSize: 13,
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      textDecoration: 'none',
                      border: `1px solid ${GOLD}`,
                    }}
                  >
                    {ctaAvailableLabel}
                  </a>
                ) : (
                  <div
                    aria-disabled="true"
                    style={{
                      textAlign: 'center',
                      padding: '12px 18px',
                      borderRadius: 8,
                      backgroundColor: 'rgba(255,255,255,0.04)',
                      color: 'rgba(255,255,255,0.5)',
                      fontSize: 13,
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                  >
                    {comingSoonLabel}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          :global(.agent-pricing-grid) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
