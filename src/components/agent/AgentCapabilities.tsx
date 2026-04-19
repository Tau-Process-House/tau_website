'use client';

const FONT = 'Arial, Helvetica, sans-serif';

interface CapItem { icon: string; title: string; desc: string; tags: string[]; }

interface AgentCapabilitiesProps {
  sectionLabel: string;
  titlePart1: string;
  titleGold: string;
  subtitle: string;
  items: CapItem[];
}

export default function AgentCapabilities({ sectionLabel, titlePart1, titleGold, subtitle, items }: AgentCapabilitiesProps) {
  return (
    <section id="capabilities" style={{
      backgroundColor: '#000', color: '#fff', padding: '6rem 0',
      minHeight: '100dvh', display: 'flex', alignItems: 'center',
      borderTop: '1px solid rgba(255,255,255,0.07)', fontFamily: FONT,
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem', width: '100%' }}>
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ color: '#C8962E', fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
            {sectionLabel}
          </div>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', fontWeight: 800, maxWidth: 600, marginBottom: 14, lineHeight: 1.2 }}>
            {titlePart1} <span style={{ color: '#C8962E' }}>{titleGold}</span>
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)', maxWidth: 600, lineHeight: 1.6 }}>
            {subtitle}
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem',
        }} className="agent-cap-grid">
          {items.map((item) => (
            <div
              key={item.title}
              style={{
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 10, padding: '1.5rem',
                backgroundColor: 'rgba(255,255,255,0.02)',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,150,46,0.3)')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)')}
            >
              <div style={{ fontSize: 22, marginBottom: 12, color: 'rgba(255,255,255,0.4)' }}>
                {item.icon}
              </div>
              <h4 style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{item.title}</h4>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: 14 }}>
                {item.desc}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {item.tags.map((tag) => (
                  <span key={tag} style={{
                    fontSize: 11, padding: '2px 8px', borderRadius: 999,
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.4)',
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
