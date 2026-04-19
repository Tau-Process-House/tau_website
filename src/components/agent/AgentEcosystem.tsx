'use client';
import Image from 'next/image';

const FONT = 'Arial, Helvetica, sans-serif';
const MONO = '"SF Mono", Menlo, Consolas, "Liberation Mono", monospace';

interface OrbitApp { n: string; logo: string; }

interface AgentEcosystemProps {
  sectionLabel: string;
  titlePart1: string;
  titleGold: string;
  subtitle: string;
  hub: { name: string; sub: string };
  orbit: OrbitApp[];
}

export default function AgentEcosystem({
  sectionLabel, titlePart1, titleGold, subtitle, hub, orbit,
}: AgentEcosystemProps) {
  return (
    <section
      id="ecosystem"
      style={{
        backgroundColor: '#000',
        color: '#fff',
        padding: '6rem 0',
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        fontFamily: FONT,
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem', width: '100%' }}>
        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}
          className="agent-eco-grid"
        >
          {/* Left: text */}
          <div>
            <div style={{ color: '#C8962E', fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
              {sectionLabel}
            </div>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: 16 }}>
              {titlePart1}{' '}
              <span style={{ color: '#C8962E' }}>{titleGold}</span>
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', lineHeight: 1.65 }}>
              {subtitle}
            </p>
          </div>

          {/* Right: diagram */}
          <div style={{ position: 'relative', aspectRatio: '1', maxWidth: 380, margin: '0 auto', width: '100%' }}>
            {/* Hub */}
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: 96,
                height: 96,
                borderRadius: '50%',
                backgroundColor: 'rgba(200,150,46,0.12)',
                border: '1px solid rgba(200,150,46,0.4)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2,
              }}
            >
              <div style={{ fontWeight: 700, fontSize: 13 }}>{hub.name}</div>
              <div style={{ fontSize: 9, color: '#C8962E', fontFamily: MONO, letterSpacing: '0.08em', marginTop: 2 }}>
                {hub.sub}
              </div>
            </div>

            {/* Orbit circle */}
            <div
              style={{
                position: 'absolute',
                left: '15%',
                top: '15%',
                right: '15%',
                bottom: '15%',
                borderRadius: '50%',
                border: '1px dashed rgba(255,255,255,0.08)',
              }}
            />

            {/* Orbit apps */}
            {orbit.map((app, i) => {
              const angle = (i / orbit.length) * 2 * Math.PI - Math.PI / 2;
              const px = 50 + 38 * Math.cos(angle);
              const py = 50 + 38 * Math.sin(angle);
              return (
                <div
                  key={app.n}
                  style={{
                    position: 'absolute',
                    left: `${px}%`,
                    top: `${py}%`,
                    transform: 'translate(-50%, -50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      backgroundColor: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                    }}
                  >
                    <Image
                      src={app.logo}
                      alt={app.n}
                      width={28}
                      height={28}
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                  <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', whiteSpace: 'nowrap' }}>
                    {app.n}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
