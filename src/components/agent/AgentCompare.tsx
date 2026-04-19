const FONT = 'Arial, Helvetica, sans-serif';

interface Stat { number: string; desc: string; }
interface Side { label: string; stats: Stat[]; }

interface AgentCompareProps {
  sectionLabel: string;
  titleLine1: string;
  titleLine2: string;
  before: Side;
  after: Side;
}

export default function AgentCompare({ sectionLabel, titleLine1, titleLine2, before, after }: AgentCompareProps) {
  return (
    <section id="problem" style={{
      backgroundColor: '#000', color: '#fff', padding: '6rem 0',
      minHeight: '100dvh', display: 'flex', alignItems: 'center',
      borderTop: '1px solid rgba(255,255,255,0.07)', fontFamily: FONT,
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ color: '#C8962E', fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
            {sectionLabel}
          </div>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', fontWeight: 800, lineHeight: 1.2 }}>
            {titleLine1}<br />{titleLine2}
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="agent-compare-grid">
          {[
            { side: before, isAfter: false },
            { side: after,  isAfter: true },
          ].map(({ side, isAfter }) => (
            <div
              key={side.label}
              style={{
                border: isAfter ? '1px solid rgba(200,150,46,0.3)' : '1px solid rgba(255,255,255,0.08)',
                borderRadius: 12, padding: '2rem',
                backgroundColor: isAfter ? 'rgba(200,150,46,0.04)' : 'rgba(255,255,255,0.02)',
              }}
            >
              <div style={{
                fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                color: isAfter ? '#C8962E' : 'rgba(255,255,255,0.4)', marginBottom: '1.5rem',
              }}>
                {side.label}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                {side.stats.map((stat) => (
                  <div key={stat.desc}>
                    <div style={{
                      fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 800,
                      color: isAfter ? '#C8962E' : 'rgba(255,255,255,0.9)',
                      marginBottom: 4, lineHeight: 1,
                    }}>
                      {stat.number}
                    </div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.4 }}>
                      {stat.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
