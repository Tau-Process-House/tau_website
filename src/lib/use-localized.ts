'use client';
import { useLocale } from 'next-intl';
import type { LocalizedString } from '@/types/content';

/**
 * Shared hook: gibt eine Funktion zurück, die einen bilingualen String
 * { de, en } in den aktuell aktiven Locale-String auflöst.
 *
 * Verwendung in Client-Komponenten:
 *   const loc = useLocalized();
 *   loc(data.title)  →  "Unsere Philosophie" (DE) oder "Our Philosophy" (EN)
 *
 * Für Server-Komponenten den Locale-Parameter direkt verwenden:
 *   const loc = (f: LocalizedString) => f[locale as 'de' | 'en'] ?? f.de;
 */
export function useLocalized() {
  const locale = useLocale();
  return (field: LocalizedString): string =>
    field[locale as 'de' | 'en'] ?? field.de;
}
