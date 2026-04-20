'use client';
import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useTransition } from 'react';
import Link from 'next/link';

const FONT = 'Arial, Helvetica, sans-serif';

interface NavLink { label: string; href: string; }

interface AgentNavProps {
  backLabel: string;
  ctaLabel: string;
  ctaHref: string;
  links: NavLink[];
}

function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleSwitch = (target: 'de' | 'en') => {
    if (target === locale) return;
    startTransition(() => router.replace(pathname, { locale: target }));
  };

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 0,
      borderRadius: 999, border: '1px solid rgba(255,255,255,0.2)',
      overflow: 'hidden', backgroundColor: 'rgba(255,255,255,0.06)',
      opacity: isPending ? 0.6 : 1, transition: 'opacity 0.2s',
      fontSize: 12, fontWeight: 600, letterSpacing: '0.05em',
    }}>
      {(['de', 'en'] as const).map((lang) => (
        <button
          key={lang}
          onClick={() => handleSwitch(lang)}
          disabled={lang === locale}
          style={{
            padding: '0.3rem 0.6rem', cursor: lang === locale ? 'default' : 'pointer',
            backgroundColor: lang === locale ? 'rgba(255,255,255,0.9)' : 'transparent',
            color: lang === locale ? '#000' : 'rgba(255,255,255,0.55)',
            border: 'none', outline: 'none', fontFamily: FONT,
            fontSize: 'inherit', fontWeight: 'inherit', letterSpacing: 'inherit',
            transition: 'background-color 0.2s, color 0.2s', lineHeight: 1,
          }}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export default function AgentNav({ backLabel, ctaLabel, ctaHref, links }: AgentNavProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      height: 64,
      backgroundColor: scrolled ? 'rgba(0,0,0,0.85)' : 'rgba(0,0,0,0.6)',
      backdropFilter: 'blur(12px)',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
      transition: 'background-color 0.3s, border-color 0.3s',
      fontFamily: FONT,
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto', padding: '0 2rem',
        height: '100%', display: 'flex', alignItems: 'center', gap: '2rem',
      }}>
        {/* Logo / back link */}
        <Link
          href="/"
          style={{
            color: 'rgba(255,255,255,0.55)', textDecoration: 'none',
            fontSize: 13, whiteSpace: 'nowrap', flexShrink: 0,
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
        >
          {backLabel}
        </Link>

        <div style={{
          width: 1, height: 16, backgroundColor: 'rgba(255,255,255,0.15)', flexShrink: 0,
        }} />

        <span style={{ color: '#fff', fontWeight: 600, fontSize: 15, flexShrink: 0 }}>
          Tau Agent
        </span>

        {/* Section links */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '1.5rem',
          flex: 1, justifyContent: 'center',
        }} className="agent-nav-links">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                color: 'rgba(255,255,255,0.55)', textDecoration: 'none',
                fontSize: 14, transition: 'color 0.2s', whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right: lang + CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
          <LanguageSwitcher />
          <a
            href={ctaHref}
            style={{
              backgroundColor: '#C8962E', color: '#000',
              fontWeight: 700, fontSize: 13, padding: '0.45rem 1rem',
              borderRadius: 6, textDecoration: 'none', whiteSpace: 'nowrap',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#E8B84A')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#C8962E')}
          >
            {ctaLabel}
          </a>
        </div>
      </div>
    </nav>
  );
}
