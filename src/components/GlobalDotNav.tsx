'use client';
import { useState, useEffect } from 'react';
import { usePathname } from '@/i18n/navigation';

const MAIN_COUNT = 6;
const AGENT_SECTIONS = ['top', 'problem', 'solution', 'pricing', 'faq', 'cta'];

export default function GlobalDotNav() {
  const pathname = usePathname();
  const isAgent = pathname.startsWith('/tau-zoho-agent');
  const isMain = pathname === '/';
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!isMain) return;
    const container = document.querySelector('.section-container');
    if (!container) return;
    const update = () => setActiveIndex(Math.round(container.scrollTop / window.innerHeight));
    container.addEventListener('scroll', update, { passive: true });
    update();
    return () => container.removeEventListener('scroll', update);
  }, [isMain]);

  useEffect(() => {
    if (!isAgent) return;
    const container = document.getElementById('agent-scroll');
    if (!container) return;
    const update = () => {
      const threshold = container.scrollTop + container.clientHeight * 0.4;
      let current = 0;
      for (let i = 0; i < AGENT_SECTIONS.length; i++) {
        const el = document.getElementById(AGENT_SECTIONS[i]);
        if (el && el.offsetTop <= threshold) current = i;
      }
      setActiveIndex(current);
    };
    container.addEventListener('scroll', update, { passive: true });
    update();
    return () => container.removeEventListener('scroll', update);
  }, [isAgent]);

  if (!isMain && !isAgent) return null;

  const scrollMainTo = (i: number) => {
    document.querySelector('.section-container')?.scrollTo({ top: i * window.innerHeight, behavior: 'smooth' });
  };

  const scrollAgentTo = (id: string) => {
    const container = document.getElementById('agent-scroll');
    container?.scrollTo({ top: document.getElementById(id)?.offsetTop ?? 0, behavior: 'smooth' });
  };

  const navStyle: React.CSSProperties = {
    position: 'fixed', left: '2rem', top: '50%',
    transform: 'translateY(-50%)', zIndex: 50,
    display: 'flex', flexDirection: 'column', gap: 20,
  };

  if (isMain) {
    return (
      <div className="global-dot-nav" style={navStyle}>
        {Array.from({ length: MAIN_COUNT }, (_, i) => (
          <button
            key={i}
            onClick={() => scrollMainTo(i)}
            aria-label={`Abschnitt ${i + 1}`}
            style={{
              width: 8, height: 8, borderRadius: '50%', border: 'none', padding: 0,
              cursor: 'pointer',
              backgroundColor: i === activeIndex ? 'rgba(220,220,220,0.9)' : 'rgba(180,180,180,0.35)',
              transform: i === activeIndex ? 'scale(1.5)' : 'scale(1)',
              transition: 'background-color 0.3s, transform 0.3s',
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="global-dot-nav" style={navStyle}>
      {AGENT_SECTIONS.map((id, i) => (
        <button
          key={id}
          onClick={() => scrollAgentTo(id)}
          aria-label={`Agent Abschnitt ${i + 1}`}
          style={{
            width: 8, height: 8, borderRadius: '50%', border: 'none', padding: 0,
            cursor: 'pointer',
            backgroundColor: i === activeIndex ? 'rgba(200,150,46,0.9)' : 'rgba(200,150,46,0.3)',
            transform: i === activeIndex ? 'scale(1.5)' : 'scale(1)',
            transition: 'background-color 0.3s, transform 0.3s',
          }}
        />
      ))}
    </div>
  );
}
