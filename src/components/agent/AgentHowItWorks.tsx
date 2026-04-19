const FONT = 'Arial, Helvetica, sans-serif';
const MONO = '"SF Mono", Menlo, Consolas, "Liberation Mono", monospace';

interface DemoLine { type: string; text: string; }
interface Step { num: string; stepLabel: string; title: string; desc: string; demoLines: DemoLine[]; }

interface AgentHowItWorksProps {
  sectionLabel: string;
  title: string;
  subtitle: string;
  steps: Step[];
}

const lineColor: Record<string, string> = {
  prompt:    '#C8962E',
  success:   'rgba(100,220,100,0.8)',
  input:     'rgba(255,255,255,0.55)',
  highlight: '#fff',
  running:   'rgba(100,220,100,0.8)',
  stats:     'rgba(255,255,255,0.55)',
};

export default function AgentHowItWorks({ sectionLabel, title, subtitle, steps }: AgentHowItWorksProps) {
  return (
    <section id="how" style={{
      backgroundColor: '#000', color: '#fff', padding: '6rem 0',
      minHeight: '100dvh', display: 'flex', alignItems: 'center',
      borderTop: '1px solid rgba(255,255,255,0.07)', fontFamily: FONT,
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{ color: '#C8962E', fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
            {sectionLabel}
          </div>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', fontWeight: 800, marginBottom: 12 }}>
            {title}
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', maxWidth: 480, margin: '0 auto' }}>
            {subtitle}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }} className="agent-how-grid">
          {steps.map((step) => (
            <div
              key={step.num}
              style={{
                border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '2rem',
                backgroundColor: 'rgba(255,255,255,0.02)', display: 'flex', flexDirection: 'column', gap: 16,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                <span style={{ fontSize: 28, fontWeight: 800, color: 'rgba(255,255,255,0.1)', fontFamily: MONO }}>
                  {step.num}
                </span>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C8962E' }}>
                  {step.stepLabel}
                </span>
              </div>

              <div>
                <h3 style={{ fontWeight: 700, fontSize: 17, marginBottom: 8 }}>{step.title}</h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>{step.desc}</p>
              </div>

              {/* Code block */}
              <div style={{
                backgroundColor: '#0a0a0a', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 8, padding: '12px 14px', fontFamily: MONO, fontSize: 12,
                display: 'flex', flexDirection: 'column', gap: 3, marginTop: 'auto',
              }}>
                {step.demoLines.map((line, i) => (
                  <div key={i} style={{ color: lineColor[line.type], whiteSpace: 'pre' }}>
                    {line.text}
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
