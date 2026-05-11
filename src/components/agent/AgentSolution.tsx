'use client';
import Image from 'next/image';

const FONT = 'Arial, Helvetica, sans-serif';
const GOLD = '#C8962E';
const LINE_LEN = 64; // px — also defines column gap
const LINE_W = 1.5;
const DOT_SIZE = 8;

interface ModelLogo { id: string; name: string; logo: string; }
interface ZohoLogo { src: string; alt: string; }

interface AgentSolutionProps {
  sectionLabel: string;
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  modelsCaption: string;
  models: ModelLogo[];
  zohoApps: { title: string; caption: string; logos: ZohoLogo[] };
  connector: { title: string; caption: string };
  chat: { title: string; caption: string; userMessage: string; agentMessage: string };
}

const lineCommon = {
  position: 'absolute' as const,
  background: GOLD,
  opacity: 0.7,
  boxShadow: `0 0 8px ${GOLD}55`,
};

const dotCommon = {
  position: 'absolute' as const,
  width: DOT_SIZE,
  height: DOT_SIZE,
  borderRadius: '50%',
  background: GOLD,
  boxShadow: `0 0 10px ${GOLD}99`,
};

function StaticZohoChatPreview({ userMessage, agentMessage }: { userMessage: string; agentMessage: string }) {
  return (
    <div style={{
      borderRadius: 8, overflow: 'hidden',
      boxShadow: '0 16px 32px rgba(0,0,0,0.45)',
      border: '1px solid rgba(255,255,255,0.1)',
      fontFamily: FONT,
      width: '100%',
    }}>
      {/* Browser chrome */}
      <div style={{ backgroundColor: '#2a2a2a', padding: '6px 8px', display: 'flex', alignItems: 'center', gap: 5 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#ff5f57' }} />
        <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#febc2e' }} />
        <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#28c840' }} />
        <div style={{ flex: 1, marginLeft: 6, height: 16, borderRadius: 3, backgroundColor: '#3a3a3a', display: 'flex', alignItems: 'center', paddingLeft: 6 }}>
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 8, fontFamily: 'monospace' }}>
            crm.zoho.eu · Leads
          </span>
        </div>
      </div>

      {/* Zoho CRM app */}
      <div style={{ display: 'flex', height: 230, backgroundColor: '#f2f3f5' }}>
        {/* Left sidebar */}
        <div style={{ width: 36, backgroundColor: '#1a1d2e', flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 6, gap: 2 }}>
          <div style={{ width: 24, height: 22, borderRadius: 4, marginBottom: 6, backgroundColor: '#e8531d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#fff', fontSize: 11, fontWeight: 800 }}>Z</span>
          </div>
          {[{ i: '≡', a: false }, { i: '◎', a: true }, { i: '◈', a: false }, { i: '◉', a: false }].map(({ i, a }, idx) => (
            <div key={idx} style={{ width: 28, height: 24, borderRadius: 4, backgroundColor: a ? 'rgba(255,255,255,0.12)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: a ? '#fff' : 'rgba(255,255,255,0.3)', fontSize: 11 }}>{i}</span>
            </div>
          ))}
        </div>

        {/* Main + Agent panel */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ backgroundColor: '#fff', borderBottom: '1px solid #e0e0e0', padding: '5px 8px', display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
            <span style={{ color: '#0057a8', fontSize: 8 }}>← Leads</span>
            <span style={{ color: '#222', fontSize: 8, fontWeight: 600, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              rimbas.itb · Solarenergie
            </span>
            <div style={{ display: 'flex', gap: 3, flexShrink: 0 }}>
              <div style={{ fontSize: 7, padding: '2px 5px', borderRadius: 2, backgroundColor: '#0f62fe', color: '#fff' }}>Send Email</div>
              <div style={{ fontSize: 7, padding: '2px 5px', borderRadius: 2, backgroundColor: '#f5f5f5', color: '#444', border: '1px solid #ddd' }}>Edit</div>
            </div>
          </div>

          <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
            <div style={{ flex: 1, padding: '8px 10px', backgroundColor: '#f8f8f8', overflow: 'hidden' }}>
              <div style={{ fontSize: 7, color: '#999', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>Overview</div>
              {[
                { label: 'Email', value: 'rimbas@gmail.com' },
                { label: 'Company', value: 'Solarenergie GmbH' },
                { label: 'Source', value: 'Web' },
                { label: 'Status', value: 'New' },
              ].map((f) => (
                <div key={f.label} style={{ marginBottom: 5, display: 'flex', gap: 6, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 7, color: '#aaa', minWidth: 42, flexShrink: 0, paddingTop: 1 }}>{f.label}</span>
                  <span style={{ fontSize: 7, fontWeight: 500, color: '#333', lineHeight: 1.3 }}>{f.value}</span>
                </div>
              ))}
            </div>

            <div style={{ width: 130, borderLeft: '1px solid #ddd', flexShrink: 0, display: 'flex', flexDirection: 'column', backgroundColor: '#0c0c0c' }}>
              <div style={{ backgroundColor: '#161616', padding: '5px 7px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', flexShrink: 0 }}>
                <span style={{ color: '#fff', fontSize: 8, fontWeight: 700 }}>Tau Agent</span>
                <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 9 }}>↗</span>
              </div>
              <div style={{ padding: '4px 7px', borderBottom: '1px solid rgba(255,255,255,0.05)', backgroundColor: '#111', flexShrink: 0 }}>
                <div style={{ fontSize: 6, color: GOLD, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 1 }}>Leads</div>
                <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.4)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>rimbas@gmail.com</div>
              </div>
              <div style={{ flex: 1, padding: 6, overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ alignSelf: 'flex-end', backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: '6px 6px 2px 6px', padding: '3px 5px', fontSize: 7, color: 'rgba(255,255,255,0.7)', maxWidth: '90%' }}>
                  {userMessage}
                </div>
                <div style={{ alignSelf: 'flex-start', backgroundColor: 'rgba(200,150,46,0.1)', border: `1px solid ${GOLD}33`, borderRadius: '6px 6px 6px 2px', padding: '3px 5px', fontSize: 7, color: 'rgba(255,255,255,0.75)', maxWidth: '95%' }}>
                  {agentMessage}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 12,
  backgroundColor: 'rgba(255,255,255,0.02)',
  padding: '1.5rem',
  display: 'flex',
  flexDirection: 'column',
};

const cardHeaderStyle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.5)',
  marginBottom: '1rem',
};

export default function AgentSolution({
  sectionLabel, titleLine1, titleLine2, subtitle,
  modelsCaption, models, zohoApps, connector, chat,
}: AgentSolutionProps) {
  return (
    <section
      id="solution"
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

        {/* Diagram */}
        <div className="agent-solution-diagram" style={{ position: 'relative', width: '100%' }}>

          {/* AI Models card — centered above */}
          <div className="agent-solution-ai-row" style={{
            display: 'flex', justifyContent: 'center',
            marginBottom: LINE_LEN + DOT_SIZE,
          }}>
            <div style={{ ...cardStyle, minWidth: 320 }}>
              <div style={cardHeaderStyle}>{modelsCaption}</div>
              <div style={{
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                gap: '1.5rem',
              }}>
                {models.map((m) => {
                  const needsInvert = m.id === 'openai';
                  return (
                    <div
                      key={m.id}
                      style={{
                        width: 56, height: 56, borderRadius: 12,
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                        overflow: 'hidden',
                      }}
                    >
                      <Image
                        src={m.logo}
                        alt={m.name}
                        width={36}
                        height={36}
                        style={{
                          objectFit: 'contain',
                          maxWidth: '70%',
                          maxHeight: '70%',
                          height: 'auto',
                          width: 'auto',
                          filter: needsInvert ? 'invert(1) brightness(1.1)' : undefined,
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Three columns */}
          <div className="agent-solution-cols" style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            alignItems: 'stretch',
            columnGap: LINE_LEN,
            position: 'relative',
          }}>

            {/* Left: Zoho Apps */}
            <div style={cardStyle}>
              <div style={cardHeaderStyle}>{zohoApps.title}</div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
                gap: '0.75rem', marginBottom: '1rem', flexGrow: 1,
              }}>
                {zohoApps.logos.map((l) => (
                  <div
                    key={l.src}
                    style={{
                      aspectRatio: '1 / 1',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 8,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      padding: 8,
                    }}
                  >
                    <Image src={l.src} alt={l.alt} width={40} height={40} style={{ objectFit: 'contain', maxWidth: '100%', height: 'auto' }} />
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.4 }}>
                {zohoApps.caption}
              </div>
            </div>

            {/* Middle: Tau Connector (highlighted) */}
            <div style={{
              border: `1px solid ${GOLD}55`, borderRadius: 12,
              backgroundColor: 'rgba(200,150,46,0.06)',
              boxShadow: '0 0 40px rgba(200,150,46,0.12)',
              padding: '1.5rem',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              minWidth: 240, position: 'relative',
            }}>
              <div style={{
                fontSize: 12, fontWeight: 700, letterSpacing: '0.1em',
                textTransform: 'uppercase', color: GOLD, marginBottom: '0.75rem',
              }}>
                {connector.title}
              </div>
              <div style={{
                width: 110, height: 110, borderRadius: '50%',
                background: '#fff',
                border: `1px solid ${GOLD}66`,
                boxShadow: `0 0 24px ${GOLD}33`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '1rem',
                overflow: 'hidden',
              }}>
                <Image
                  src="/img/logo.svg"
                  alt="Tau Process House"
                  width={110}
                  height={110}
                  style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                />
              </div>
              <div style={{
                fontSize: 13, color: 'rgba(255,255,255,0.7)',
                lineHeight: 1.4, textAlign: 'center', maxWidth: 220,
              }}>
                {connector.caption}
              </div>

              {/* === Three uniform connection lines + dots === */}

              {/* Top: vertical line going UP to AI card */}
              <span style={{
                ...lineCommon,
                left: '50%', top: 0,
                width: LINE_W,
                height: LINE_LEN,
                transform: `translate(-50%, -100%)`,
              }} />
              {/* Top dot at connector edge */}
              <span style={{
                ...dotCommon,
                left: '50%', top: 0,
                transform: 'translate(-50%, -50%)',
              }} />

              {/* Left: horizontal line going LEFT to Zoho card */}
              <span style={{
                ...lineCommon,
                left: 0, top: '50%',
                width: LINE_LEN,
                height: LINE_W,
                transform: 'translate(-100%, -50%)',
              }} />
              {/* Left dot at connector edge */}
              <span style={{
                ...dotCommon,
                left: 0, top: '50%',
                transform: 'translate(-50%, -50%)',
              }} />

              {/* Right: horizontal line going RIGHT to Chat card */}
              <span style={{
                ...lineCommon,
                right: 0, top: '50%',
                width: LINE_LEN,
                height: LINE_W,
                transform: 'translate(100%, -50%)',
              }} />
              {/* Right dot at connector edge */}
              <span style={{
                ...dotCommon,
                right: 0, top: '50%',
                transform: 'translate(50%, -50%)',
              }} />
            </div>

            {/* Right: Chat preview (CRM-styled, static) */}
            <div style={cardStyle}>
              <div style={cardHeaderStyle}>{chat.title}</div>
              <div style={{ flexGrow: 1, marginBottom: '1rem' }}>
                <StaticZohoChatPreview
                  userMessage={chat.userMessage}
                  agentMessage={chat.agentMessage}
                />
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.4 }}>
                {chat.caption}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          :global(.agent-solution-cols) {
            grid-template-columns: 1fr !important;
          }
          :global(.agent-solution-cols > div:nth-child(2)) {
            min-width: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
