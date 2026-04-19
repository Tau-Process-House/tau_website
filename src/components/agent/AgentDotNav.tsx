'use client';
import { useState, useEffect } from 'react';

const SECTIONS = ['top', 'problem', 'capabilities', 'how', 'ecosystem', 'faq', 'cta'];

export default function AgentDotNav() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const update = () => {
      const threshold = window.scrollY + window.innerHeight * 0.4;
      let current = 0;
      for (let i = 0; i < SECTIONS.length; i++) {
        const el = document.getElementById(SECTIONS[i]);
        if (el && el.offsetTop <= threshold) current = i;
      }
      setActive(current);
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      aria-label="Section navigation"
      style={{
        position: 'fixed', left: '2rem', top: '50%',
        transform: 'translateY(-50%)', zIndex: 40,
        display: 'flex', flexDirection: 'column', gap: '1rem',
      }}
    >
      {SECTIONS.map((id, i) => (
        <button
          key={id}
          onClick={() => scrollTo(id)}
          aria-label={`Scroll to section ${i + 1}`}
          style={{
            width: 8, height: 8, borderRadius: '50%', border: 'none',
            padding: 0, cursor: 'pointer',
            backgroundColor: i === active
              ? 'rgba(200,150,46,0.9)'
              : 'rgba(128,128,128,0.5)',
            transform: i === active ? 'scale(1.5)' : 'scale(1)',
            transition: 'background-color 0.3s, transform 0.3s',
          }}
        />
      ))}
    </nav>
  );
}
