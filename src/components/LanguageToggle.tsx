'use client';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useTransition } from 'react';

export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchTo = locale === 'de' ? 'en' : 'de';

  const handleSwitch = (targetLocale: 'de' | 'en') => {
    if (targetLocale === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: targetLocale });
    });
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '1.25rem',
        right: '1.25rem',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        gap: '0',
        borderRadius: '999px',
        border: '1px solid rgba(255,255,255,0.25)',
        overflow: 'hidden',
        backgroundColor: 'rgba(0,0,0,0.4)',
        backdropFilter: 'blur(8px)',
        opacity: isPending ? 0.6 : 1,
        transition: 'opacity 0.2s',
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: '13px',
        fontWeight: 600,
        letterSpacing: '0.05em',
        userSelect: 'none',
      }}
    >
      {(['de', 'en'] as const).map((lang) => (
        <button
          key={lang}
          onClick={() => handleSwitch(lang)}
          disabled={lang === locale}
          style={{
            padding: '0.35rem 0.75rem',
            cursor: lang === locale ? 'default' : 'pointer',
            backgroundColor: lang === locale ? 'rgba(255,255,255,0.95)' : 'transparent',
            color: lang === locale ? '#000' : 'rgba(255,255,255,0.65)',
            border: 'none',
            outline: 'none',
            fontFamily: 'inherit',
            fontSize: 'inherit',
            fontWeight: 'inherit',
            letterSpacing: 'inherit',
            transition: 'background-color 0.2s, color 0.2s',
            lineHeight: 1,
          }}
          aria-label={`Switch to ${lang === 'de' ? 'German' : 'English'}`}
          aria-pressed={lang === locale}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
