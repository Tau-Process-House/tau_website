# i18n-Konzept: Zweisprachige Website (DE/EN)

> Stand: März 2026

---

## 1. Zielsetzung

Die gesamte Website von Tau Process House soll zweisprachig (Deutsch/Englisch) angeboten werden. Die Sprachumschaltung erfolgt über einen Toggle-Switch (DE | EN) im Hero-Bereich. Es wird kein CMS eingesetzt — alle Übersetzungen werden über JSON-Dateien verwaltet.

---

## 2. Empfohlene Bibliothek: `next-intl`

**Warum `next-intl`?**

- Offizielle Empfehlung für Next.js App Router (v15)
- Arbeitet nativ mit JSON-Übersetzungsdateien
- Unterstützt Server- und Client-Components
- Type-safe mit TypeScript
- Leichtgewichtig, kein Build-Step nötig
- Aktive Community, regelmäßige Updates

**Alternative (verworfen):** Eigener React-Context + JSON-Loader. Funktioniert, aber man muss Routing, SEO, Metadata-Handling und Hydration selbst lösen — `next-intl` hat das alles eingebaut.

---

## 3. URL-Strategie

### Empfehlung: Prefix-basierte Routen (kein Redirect)

```
tauprocess.de/de          → Deutsche Startseite
tauprocess.de/en          → Englische Startseite
tauprocess.de/de/faq      → FAQ (Deutsch)
tauprocess.de/en/faq      → FAQ (Englisch)
tauprocess.de/de/zoho-check → CRM-Check (Deutsch)
tauprocess.de/en/zoho-check → CRM-Check (Englisch)
```

**Root-URL (`tauprocess.de/`):** Redirect auf `/de` (Deutsch als Default, da DACH-Markt primär).

**Warum Prefix statt Subdomain?**
- Besser für SEO (eine Domain, kein Duplicate-Content-Risiko)
- Einfacher zu deployen auf Vercel
- `hreflang`-Tags verknüpfen die Sprachversionen automatisch

---

## 4. Ordnerstruktur nach Umbau

### 4.1 Übersetzungsdateien

```
src/
├── i18n/
│   ├── request.ts              ← next-intl Konfiguration
│   ├── routing.ts              ← Locale-Routing Konfiguration
│   └── navigation.ts           ← Lokalisierte Navigation-Helpers
│
├── messages/
│   ├── de.json                 ← Alle deutschen Texte
│   └── en.json                 ← Alle englischen Texte
```

### 4.2 App-Router Anpassung

```
src/app/
├── [locale]/                   ← Dynamisches Locale-Segment
│   ├── layout.tsx              ← Root Layout mit locale-Parameter
│   ├── page.tsx                ← Hauptseite
│   ├── faq/
│   │   └── page.tsx
│   ├── imprint/
│   │   └── page.tsx
│   ├── privacy/
│   │   └── page.tsx
│   └── zoho-check/
│       ├── layout.tsx
│       └── page.tsx
├── globals.css                 ← Bleibt unverändert
├── favicon.ico
├── robots.ts
└── sitemap.ts                  ← Erweitert um hreflang
```

### 4.3 Middleware

```
src/
├── middleware.ts                ← Locale-Detection & Redirect
```

---

## 5. Aufbau der Übersetzungsdateien

Die JSON-Dateien sind nach Sektionen/Seiten strukturiert. Jeder Schlüssel entspricht einer Komponente oder einem Seitenbereich.

### Beispiel `messages/de.json`

```json
{
  "hero": {
    "tagline": "where processes want to live"
  },
  "philosophy": {
    "title": "Our Philosophy",
    "description": "People, processes and technology – it's not about one or the other...",
    "people": "People",
    "process": "Process",
    "technology": "Technology"
  },
  "services": {
    "title": "Our Services",
    "zohoBanner": "As a certified Zoho Partner, we implement the full Zoho suite...",
    "steps": {
      "consulting": {
        "title": "Consulting",
        "description": "We start by capturing your current processes..."
      },
      "migration": {
        "title": "Migration & Setup",
        "description": "We handle the technical migration..."
      },
      "development": {
        "title": "Iterative Development",
        "description": "We believe in continuous improvement..."
      },
      "training": {
        "title": "Training",
        "description": "Your team gets hands-on training..."
      }
    }
  },
  "kpi": {
    "title": "Our Track Record",
    "years": "Jahre Zoho Erfahrung",
    "implementations": "Implementierungen"
  },
  "team": {
    "title": "Who we are",
    "members": {
      "felix": {
        "role": "Founder & Zoho Expert",
        "quote": "..."
      }
    }
  },
  "contact": {
    "title": "Contact",
    "clientsHeading": "For clients",
    "applicantsHeading": "For applicants"
  },
  "nav": {
    "faq": "FAQ",
    "imprint": "Impressum",
    "privacy": "Datenschutz"
  },
  "faq": {
    "title": "Häufig gestellte Fragen",
    "cta": "Frage nicht dabei? Schreiben Sie uns."
  },
  "zohoCheck": {
    "headline": "Kostenloser CRM-Check",
    "subheadline": "Finden Sie heraus, wie gut Ihr CRM aufgestellt ist."
  },
  "metadata": {
    "title": "Felix Rimbakowsky · Zoho-Experte & Prozessautomatisierung",
    "description": "Zoho-Beratung, Implementierung und Automatisierung..."
  }
}
```

### Beispiel `messages/en.json`

```json
{
  "hero": {
    "tagline": "where processes want to live"
  },
  "philosophy": {
    "title": "Our Philosophy",
    "description": "People, processes and technology – it's not about one or the other..."
  },
  "services": {
    "title": "Our Services"
  },
  "kpi": {
    "years": "Years of Zoho Experience",
    "implementations": "Implementations"
  },
  "contact": {
    "title": "Contact"
  },
  "nav": {
    "imprint": "Legal Notice",
    "privacy": "Privacy Policy"
  },
  "metadata": {
    "title": "Felix Rimbakowsky · Zoho Expert & Process Automation",
    "description": "Zoho consulting, implementation and automation..."
  }
}
```

### Daten-Dateien (faq.json, work.json)

Auch die bestehenden JSON-Dateien bekommen Sprachschlüssel:

```json
// faq.json — vorher:
{ "question": "Was kostet eine Zoho-Implementierung?", "answer": "..." }

// faq.json — nachher:
{
  "question": {
    "de": "Was kostet eine Zoho-Implementierung?",
    "en": "How much does a Zoho implementation cost?"
  },
  "answer": {
    "de": "Die Kosten hängen vom Umfang ab...",
    "en": "Costs depend on the scope..."
  }
}
```

---

## 6. Sprachumschaltung: Toggle-Switch

### Position & Design

- **Position:** Oben rechts im Hero-Bereich (fixed oder absolut innerhalb der Hero-Section)
- **Design:** Minimalistischer Pill-Toggle, passend zum schwarz/weißen Design
- **Verhalten:** Klick wechselt die Sprache und navigiert zur entsprechenden Locale-Route (z.B. `/de` → `/en`)

### Komponente: `LanguageToggle.tsx`

```
src/components/LanguageToggle.tsx
```

Der Toggle nutzt `next-intl`s `useRouter` und `useLocale`, um die aktuelle Sprache zu erkennen und beim Klick auf die gleiche Seite in der anderen Sprache zu navigieren.

### Sichtbarkeit

Der Toggle wird **auf allen Seiten** angezeigt (nicht nur Hero), da er im Layout eingebunden wird. Er ist jedoch visuell im Hero-Bereich positioniert (z.B. fixed top-right mit angepasstem z-index).

---

## 7. Notwendige Änderungen (Übersicht)

### 7.1 Neue Dateien erstellen

| Datei | Zweck |
|-------|-------|
| `src/messages/de.json` | Deutsche Übersetzungstexte |
| `src/messages/en.json` | Englische Übersetzungstexte |
| `src/i18n/request.ts` | next-intl Konfiguration |
| `src/i18n/routing.ts` | Locale-Routen definieren |
| `src/i18n/navigation.ts` | Lokalisierte Link/Router-Helpers |
| `src/middleware.ts` | Locale-Erkennung & Redirect |
| `src/components/LanguageToggle.tsx` | DE/EN Umschalter |

### 7.2 Bestehende Dateien anpassen

| Datei | Änderung |
|-------|----------|
| `src/app/layout.tsx` | → `src/app/[locale]/layout.tsx` verschieben, `lang`-Attribut dynamisch |
| `src/app/page.tsx` | → `src/app/[locale]/page.tsx` verschieben |
| `src/app/faq/page.tsx` | → `src/app/[locale]/faq/page.tsx` verschieben |
| `src/app/imprint/page.tsx` | → `src/app/[locale]/imprint/page.tsx` |
| `src/app/privacy/page.tsx` | → `src/app/[locale]/privacy/page.tsx` |
| `src/app/zoho-check/*` | → `src/app/[locale]/zoho-check/*` |
| `src/app/sitemap.ts` | hreflang-Einträge für DE/EN hinzufügen |
| `src/app/robots.ts` | Bleibt gleich (keine Locale-Abhängigkeit) |
| Alle Komponenten (Hero, Services, KPI, Team, Contact...) | Hardcoded Strings durch `useTranslations()`-Aufrufe ersetzen |
| `src/data/faq.json` | Mehrsprachige Felder (`de`/`en`) |
| `src/data/work.json` | Mehrsprachige Felder (`de`/`en`) |

### 7.3 SEO-Anpassungen

- **`<html lang="...">`** dynamisch basierend auf aktiver Locale
- **`hreflang`-Tags** im `<head>` für jede Seite (Verweis auf DE- und EN-Version)
- **Open-Graph / Twitter-Meta** pro Sprache über `next-intl`s `generateMetadata`
- **JSON-LD Schema** sprachabhängig anpassen (besonders `knowsAbout`, `description`)
- **Sitemap** erweitern mit `alternateRefs` für beide Sprachen

---

## 8. Workflow für zukünftige zweisprachige Content-Pflege

### Schritt-für-Schritt: Neuen Text hinzufügen

1. **Schlüssel definieren** — z.B. `services.newStep.title`
2. **In `de.json` eintragen** — deutschen Text schreiben
3. **In `en.json` eintragen** — englischen Text schreiben
4. **In der Komponente verwenden:**
   ```tsx
   const t = useTranslations('services');
   return <h3>{t('newStep.title')}</h3>;
   ```

### Schritt-für-Schritt: Bestehenden Text ändern

1. Schlüssel in `de.json` und/oder `en.json` finden
2. Text ändern
3. Fertig — kein Code-Change nötig

### Schritt-für-Schritt: Neue Seite hinzufügen

1. Seite unter `src/app/[locale]/neue-seite/page.tsx` erstellen
2. Übersetzungsschlüssel in beiden JSON-Dateien anlegen
3. `useTranslations()` in der Seite verwenden
4. Sitemap aktualisieren

### Empfehlung: Fehlende Übersetzungen

`next-intl` kann so konfiguriert werden, dass bei fehlenden Schlüsseln ein Fallback auf die Default-Locale (Deutsch) greift. So wird nie eine leere Stelle angezeigt, selbst wenn ein englischer Text noch fehlt.

---

## 9. Implementierungsreihenfolge

| # | Schritt | Aufwand |
|---|---------|---------|
| 1 | `next-intl` installieren & Grundkonfiguration | Klein |
| 2 | Middleware für Locale-Routing erstellen | Klein |
| 3 | App-Verzeichnis umstrukturieren (`[locale]/`) | Mittel |
| 4 | Übersetzungsdateien anlegen (DE zuerst, da Content existiert) | Mittel |
| 5 | Komponenten umstellen (hardcoded → `useTranslations()`) | Groß |
| 6 | Language-Toggle Komponente bauen | Klein |
| 7 | Metadata & JSON-LD lokalisieren | Mittel |
| 8 | Daten-Dateien (faq.json, work.json) mehrsprachig machen | Mittel |
| 9 | SEO: hreflang, Sitemap, robots | Klein |
| 10 | Englische Übersetzungen schreiben | Mittel |
| 11 | Testen (beide Sprachen, SEO, Toggle, Redirects) | Mittel |

**Geschätzter Gesamtaufwand:** ca. 6–10 Stunden Implementierung + Content-Übersetzung

---

## 10. Technische Details

### next-intl Konfiguration (Kernkonzept)

```typescript
// src/i18n/routing.ts
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['de', 'en'],
  defaultLocale: 'de'
});
```

```typescript
// src/i18n/request.ts
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale)) {
    locale = routing.defaultLocale;
  }
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
```

```typescript
// src/middleware.ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/', '/(de|en)/:path*']
};
```

### Verwendung in Komponenten

```tsx
// Client Component
'use client';
import { useTranslations } from 'next-intl';

export function HeroSection() {
  const t = useTranslations('hero');
  return <p>{t('tagline')}</p>;
}
```

```tsx
// Server Component (z.B. Metadata)
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return { title: t('title'), description: t('description') };
}
```
