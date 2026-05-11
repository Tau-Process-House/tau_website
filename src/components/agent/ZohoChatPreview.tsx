'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const FONT = 'Arial, Helvetica, sans-serif';
const TYPING_SPEED = 52;

export interface CrmField {
  label: string;
  value: string;
  isNew?: boolean;
}
export interface ChatStep {
  type: 'user' | 'thinking' | 'agent';
  text?: string;
  timestamp?: string;
}
export interface ChatScenario {
  id: string;
  crmModule: string;
  crmBreadcrumb: string;
  crmEmail: string;
  crmFields: CrmField[];
  updatedCrmFields?: CrmField[];
  steps: ChatStep[];
}
export interface ZohoChatPreviewProps {
  agentTitle: string;
  inputPlaceholder: string;
  langBadge: string;
  scenario: ChatScenario;
  agentPanelWidth?: number;
}

function ThinkingDots() {
  return (
    <div style={{ display: 'flex', gap: 4, padding: '10px 12px', alignItems: 'center' }}>
      {[0, 1, 2].map(i => (
        <motion.span
          key={i}
          style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', backgroundColor: '#C8962E' }}
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.15, 0.8] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

export default function ZohoChatPreview({
  agentTitle, inputPlaceholder, langBadge, scenario, agentPanelWidth = 215,
}: ZohoChatPreviewProps) {
  const [phase, setPhase] = useState(0);
  const [inputText, setInputText] = useState('');
  const [tick, setTick] = useState(0);
  const [fieldsUpdated, setFieldsUpdated] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  const userSteps = scenario.steps.filter(s => s.type === 'user');
  const agentSteps = scenario.steps.filter(s => s.type === 'agent');
  const text1 = userSteps[0]?.text ?? '';
  const text2 = userSteps[1]?.text ?? '';
  const agentMsg1 = agentSteps[0];
  const agentMsg2 = agentSteps[1];

  const typing1Duration = text1.length * TYPING_SPEED + 400;
  const typing2Duration = Math.max(text2.length * TYPING_SPEED + 400, 600);

  useEffect(() => {
    setPhase(0);
    setInputText('');
    setFieldsUpdated(false);

    // phase 1: type msg1
    // phase 2: msg1 sent → thinking
    // phase 3: agent research response
    // phase 4: type msg2 ("Ja")
    // phase 5: msg2 sent → loading (2 sec)
    // phase 6: fields update  ← triggers left-side animation
    // phase 7: success message
    // reset: loop
    const base = 700;
    const p2 = base + typing1Duration;
    const p3 = p2 + 2600;
    const p4 = p3 + 2800;
    const p5 = p4 + typing2Duration;
    const p6 = p5 + 2000;
    const p7 = p6 + 300;
    const rst = p7 + 5000;

    const timers = [
      setTimeout(() => setPhase(1), base),
      setTimeout(() => setPhase(2), p2),
      setTimeout(() => setPhase(3), p3),
      setTimeout(() => setPhase(4), p4),
      setTimeout(() => setPhase(5), p5),
      setTimeout(() => { setPhase(6); setFieldsUpdated(true); }, p6),
      setTimeout(() => setPhase(7), p7),
      setTimeout(() => setTick(n => n + 1), rst),
    ];
    return () => timers.forEach(clearTimeout);
  }, [tick, typing1Duration, typing2Duration]);

  // Typewriter
  useEffect(() => {
    const activeText = phase === 1 ? text1 : phase === 4 ? text2 : null;
    if (!activeText) return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      if (i <= activeText.length) setInputText(activeText.slice(0, i));
      else clearInterval(id);
    }, TYPING_SPEED);
    return () => clearInterval(id);
  }, [phase, text1, text2]);

  // Clear input on send
  useEffect(() => {
    if (phase === 2 || phase === 5) setInputText('');
  }, [phase]);

  // Auto-scroll chat
  useEffect(() => {
    const el = chatRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [phase]);

  const activeText = phase === 1 ? text1 : phase === 4 ? text2 : '';
  const showCursor = (phase === 1 || phase === 4) && inputText.length < activeText.length;
  const sendActive = (phase === 1 || phase === 4) && inputText.length > 1;

  const currentFields = fieldsUpdated && scenario.updatedCrmFields?.length
    ? scenario.updatedCrmFields
    : scenario.crmFields;

  return (
    <div style={{
      borderRadius: 10, overflow: 'hidden',
      boxShadow: '0 24px 64px rgba(0,0,0,0.55)',
      border: '1px solid rgba(255,255,255,0.1)',
      fontFamily: FONT,
    }}>
      {/* Browser chrome */}
      <div style={{ backgroundColor: '#2a2a2a', padding: '7px 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#ff5f57' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#febc2e' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#28c840' }} />
        <div style={{ flex: 1, marginLeft: 8, height: 20, borderRadius: 4, backgroundColor: '#3a3a3a', display: 'flex', alignItems: 'center', paddingLeft: 8 }}>
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 9, fontFamily: 'monospace' }}>
            crm.zoho.eu · {scenario.crmModule}
          </span>
        </div>
      </div>

      {/* Zoho CRM app */}
      <div style={{ display: 'flex', height: 400, backgroundColor: '#f2f3f5' }}>

        {/* Left sidebar */}
        <div style={{ width: 50, backgroundColor: '#1a1d2e', flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 8, gap: 3 }}>
          <div style={{ width: 30, height: 26, borderRadius: 5, marginBottom: 8, backgroundColor: '#e8531d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#fff', fontSize: 14, fontWeight: 800 }}>Z</span>
          </div>
          {[{ i: '≡', a: false }, { i: '◎', a: true }, { i: '◈', a: false }, { i: '◉', a: false }, { i: '△', a: false }].map(({ i, a }, idx) => (
            <div key={idx} style={{ width: 38, height: 30, borderRadius: 6, backgroundColor: a ? 'rgba(255,255,255,0.12)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: a ? '#fff' : 'rgba(255,255,255,0.3)', fontSize: 14 }}>{i}</span>
            </div>
          ))}
        </div>

        {/* Main content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

          {/* Top bar */}
          <div style={{ backgroundColor: '#fff', borderBottom: '1px solid #e0e0e0', padding: '7px 12px', display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <span style={{ color: '#0057a8', fontSize: 10 }}>← {scenario.crmModule}</span>
            <span style={{ color: '#222', fontSize: 10, fontWeight: 600, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {scenario.crmBreadcrumb}
            </span>
            <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
              <div style={{ fontSize: 9, padding: '3px 7px', borderRadius: 3, backgroundColor: '#0f62fe', color: '#fff' }}>Send Email</div>
              <div style={{ fontSize: 9, padding: '3px 7px', borderRadius: 3, backgroundColor: '#f5f5f5', color: '#444', border: '1px solid #ddd' }}>Edit</div>
            </div>
          </div>

          {/* Record + Agent panel */}
          <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

            {/* CRM record fields — animated update */}
            <div style={{ flex: 1, padding: '12px 14px', backgroundColor: '#f8f8f8', overflow: 'hidden' }}>
              <div style={{ fontSize: 9, color: '#999', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>
                Overview
              </div>
              {currentFields.map((f, idx) => (
                <motion.div
                  key={`${fieldsUpdated ? 'u' : 'i'}-${f.label}`}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.07 }}
                  style={{ marginBottom: 7, display: 'flex', gap: 8, alignItems: 'flex-start' }}
                >
                  <span style={{ fontSize: 9, color: '#aaa', minWidth: 56, flexShrink: 0, paddingTop: 1 }}>{f.label}</span>
                  <span style={{ fontSize: 9, fontWeight: 500, color: f.isNew ? '#a06c10' : '#333', lineHeight: 1.3 }}>
                    {f.value}
                    {f.isNew && (
                      <span style={{ marginLeft: 4, fontSize: 7, backgroundColor: 'rgba(200,150,46,0.12)', color: '#C8962E', borderRadius: 3, padding: '1px 4px', fontWeight: 700 }}>
                        new
                      </span>
                    )}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Tau Agent sidebar */}
            <div style={{ width: agentPanelWidth, borderLeft: '1px solid #ddd', flexShrink: 0, display: 'flex', flexDirection: 'column', backgroundColor: '#0c0c0c' }}>

              {/* Agent header */}
              <div style={{ backgroundColor: '#161616', padding: '7px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', flexShrink: 0 }}>
                <span style={{ color: '#fff', fontSize: 11, fontWeight: 700 }}>{agentTitle}</span>
                <div style={{ display: 'flex', gap: 8 }}>
                  <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>⊞</span>
                  <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>↗</span>
                </div>
              </div>

              {/* Record context */}
              <div style={{ padding: '5px 10px', borderBottom: '1px solid rgba(255,255,255,0.05)', backgroundColor: '#111', flexShrink: 0 }}>
                <div style={{ fontSize: 8, color: '#C8962E', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 2 }}>{scenario.crmModule}</div>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{scenario.crmEmail}</div>
              </div>

              {/* Chat messages */}
              <div
                ref={chatRef}
                style={{ flex: 1, padding: '8px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 6, scrollbarWidth: 'none' }}
              >
                {/* Timestamp */}
                {phase >= 2 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    style={{ textAlign: 'center', fontSize: 8, color: 'rgba(255,255,255,0.2)', flexShrink: 0 }}>
                    {agentMsg1?.timestamp ?? '17:21'}
                  </motion.div>
                )}

                {/* User message 1 */}
                {phase >= 2 && (
                  <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}
                    style={{ alignSelf: 'flex-end', backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: '8px 8px 2px 8px', padding: '5px 8px', fontSize: 9, color: 'rgba(255,255,255,0.7)', maxWidth: '88%', flexShrink: 0 }}>
                    {text1}
                  </motion.div>
                )}

                {/* Thinking 1 */}
                {phase === 2 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    style={{ alignSelf: 'flex-start', backgroundColor: '#1e1e2a', borderRadius: '2px 8px 8px 8px', flexShrink: 0 }}>
                    <ThinkingDots />
                  </motion.div>
                )}

                {/* Agent response 1 — research results + question */}
                {phase >= 3 && agentMsg1?.text && (
                  <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
                    style={{ alignSelf: 'flex-start', backgroundColor: '#1a1a28', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '2px 8px 8px 8px', padding: '8px 10px', fontSize: 9, color: 'rgba(255,255,255,0.75)', lineHeight: 1.65, whiteSpace: 'pre-line', maxWidth: '95%', flexShrink: 0 }}>
                    {agentMsg1.text}
                    <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.2)', marginTop: 5 }}>{agentMsg1.timestamp}</div>
                  </motion.div>
                )}

                {/* User message 2 ("Ja") */}
                {phase >= 5 && (
                  <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}
                    style={{ alignSelf: 'flex-end', backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: '8px 8px 2px 8px', padding: '5px 8px', fontSize: 9, color: 'rgba(255,255,255,0.7)', maxWidth: '88%', flexShrink: 0 }}>
                    {text2}
                  </motion.div>
                )}

                {/* Thinking 2 — updating record */}
                {phase === 5 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    style={{ alignSelf: 'flex-start', backgroundColor: '#1e1e2a', borderRadius: '2px 8px 8px 8px', flexShrink: 0 }}>
                    <ThinkingDots />
                  </motion.div>
                )}

                {/* Agent response 2 — success */}
                {phase >= 7 && agentMsg2?.text && (
                  <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
                    style={{ alignSelf: 'flex-start', backgroundColor: '#0c160c', border: '1px solid rgba(80,180,80,0.2)', borderRadius: '2px 8px 8px 8px', padding: '7px 10px', fontSize: 9, color: 'rgba(100,220,100,0.85)', lineHeight: 1.5, maxWidth: '95%', flexShrink: 0 }}>
                    {agentMsg2.text}
                    <div style={{ fontSize: 8, color: 'rgba(100,220,100,0.3)', marginTop: 4 }}>{agentMsg2.timestamp}</div>
                  </motion.div>
                )}
              </div>

              {/* Input bar */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '6px 8px', display: 'flex', alignItems: 'center', gap: 5, backgroundColor: '#111', flexShrink: 0 }}>
                <div style={{ fontSize: 8, padding: '2px 5px', borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.4)', flexShrink: 0 }}>
                  {langBadge}
                </div>
                <span style={{ flex: 1, fontSize: 9, color: (phase === 1 || phase === 4) ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.22)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {(phase === 1 || phase === 4)
                    ? inputText + (showCursor ? '|' : '')
                    : inputPlaceholder}
                </span>
                <div style={{ width: 22, height: 22, borderRadius: 4, flexShrink: 0, backgroundColor: sendActive ? '#0f62fe' : 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background-color 0.3s' }}>
                  <span style={{ color: sendActive ? '#fff' : 'rgba(255,255,255,0.2)', fontSize: 11, transition: 'color 0.3s' }}>↑</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
