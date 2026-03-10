# Website-Architektur: Tau Process House

> Stand: März 2026 (JSON Content-System vollständig umgebaut)

---

## 1. Tech Stack

| Schicht | Technologie | Version |
|---|---|---|
| Framework | Next.js (App Router) | 15.1.6 |
| i18n | next-intl | ^4 |
| UI-Bibliothek | React | 19.0.0 |
| Sprache | TypeScript | ^5 |
| Styling | Tailwind CSS + globales CSS | ^3.4.1 |
| Animationen | Framer Motion | ^12.4.1 |
| Fonts | Inter (via `next/font/google`) | – |
| Analytics | Google Analytics 4 (GA4) | – |
| Cookie-Consent | CookieYes | – |
| Hosting | Vercel | – |

---

## 2. Ordnerstruktur

```
tau-process-house/
├── public/
│   ├── img/
│   │   ├── logo.webp           ← aktiv verwendet
│   │   ├── logo.png
│   │   └── logo.svg
│   ├── team/
│   │   ├── felix.jpg
│   │   ├── luca.png
│   │   ├── moritz.jpeg
│   │   └── bhuvenesh.jpg
│   └── llms.txt                ← LLM-Crawler-Info (tauprocess.de/llms.txt)
│
├── src/
│   ├── app/
│   │   ├── favicon.ico
│   │   ├── globals.css         ← Scroll-Snap, Section-Klassen, Tailwind-Import
│   │   ├── layout.tsx          ← Root Layout: minimal (children pass-through)
│   │   ├── robots.ts           ← robots.txt (erlaubt GPTBot, ClaudeBot etc.)
│   │   ├── sitemap.ts          ← sitemap.xml (bilingual mit hreflang)
│   │   └── [locale]/           ← Locale-Routing (de | en)
│   │       ├── layout.tsx      ← Haupt-Layout: Metadata, JSON-LD, GA4, Cookies, LanguageToggle
│   │       ├── page.tsx        ← Hauptseite (One-Pager, 'use client')
│   │       ├── imprint/
│   │       │   └── page.tsx
│   │       ├── privacy/
│   │       │   └── page.tsx
│   │       ├── faq/
│   │       │   └── page.tsx    ← FAQ-Seite mit FAQPage JSON-LD (bilingual)
│   │       └── zoho-check/
│   │           ├── layout.tsx
│   │           └── page.tsx    ← CRM-Check-Funnel ('use client', multi-step)
│   │
│   ├── components/
│   │   ├── HeroSection.tsx            ← useTranslations('hero')
│   │   ├── WhatSection.tsx            ← useTranslations('philosophy')
│   │   ├── OurServicesSection.tsx     ← useTranslations('services')
│   │   ├── KpiSection.tsx             ← useTranslations('kpi')
│   │   ├── OurWorkSection.tsx         ← aktiv; Anzeige via NEXT_PUBLIC_SHOW_OUR_WORK steuern
│   │   ├── TeamCarousel.tsx           ← useTranslations('team')
│   │   ├── ContactSection.tsx         ← useTranslations('contact')
│   │   ├── LanguageToggle.tsx         ← DE/EN Umschalter (fixed top-right)
│   │   └── zoho-check/
│   │       ├── CheckHero.tsx
│   │       ├── StepInput.tsx
│   │       ├── ModuleGuidePanel.tsx
│   │       ├── StepLoading.tsx
│   │       ├── PdfEmailModal.tsx
│   │       └── StepResults.tsx
│   │
│   ├── data/                   ← ALLE redaktionellen Inhalte hier pflegen
│   │   ├── hero.json           ← Titel, Tagline, Logo-Pfad
│   │   ├── philosophy.json     ← Abschnitt "Unsere Philosophie": Texte, Venn-Labels
│   │   ├── services.json       ← Leistungen: Titel, Zoho-Banner, 4 Steps
│   │   ├── kpi.json            ← KPI-Zahlen, Suffixe, Labels
│   │   ├── team.json           ← Team-Mitglieder (visible-Flag zum Ein-/Ausblenden)
│   │   ├── contact.json        ← E-Mail, Jobportal-URL, Footer-Links
│   │   ├── imprint.json        ← Adresse, Kontakt, USt-ID, Labels
│   │   ├── metadata.json       ← SEO-Titel/Description, OG, Twitter, JSON-LD Person+Org
│   │   ├── faq.json            ← FAQ-Seite-Labels (page.*) + 8 FAQ-Einträge (items[])
│   │   └── work.json           ← Case Studies, Produkte + Solutions (für OurWorkSection)
│   ├── i18n/
│   │   ├── routing.ts          ← Locale-Konfiguration (de | en, default: de)
│   │   ├── request.ts          ← next-intl Server-Konfiguration
│   │   └── navigation.ts       ← Lokalisierte Link/Router-Helpers
│   ├── messages/
│   │   ├── de.json             ← NUR noch nav.dotLabel (alle Inhalte in src/data/)
│   │   └── en.json             ← NUR noch nav.dotLabel
│   ├── middleware.ts            ← Locale-Detection & Redirect
│   │
│   ├── types/
│   │   ├── content.ts          ← TypeScript-Typen für alle src/data/*.json Dateien
│   │   ├── work.ts
│   │   └── zoho-check.ts
│   │
│   ├── lib/
│   │   ├── use-localized.ts    ← Shared Hook: useLocalized() für Client-Komponenten
│   │   └── zoho-check/
│   │       ├── module-classifier.ts
│   │       ├── prompts.ts
│   │       └── pdf-generator.tsx
│   │
│   └── app/api/zoho-check/
│       ├── extract/route.ts
│       ├── analyze/route.ts
│       ├── send-pdf/route.ts
│       └── crm-lead/route.ts
│
├── agent/                      ← Dokumentation für Agents (diese Dateien)
├── .env.local.example
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

---

## 3. Seitenstruktur (One-Pager)

Vertikaler Full-Screen-One-Pager mit **CSS Scroll-Snap** (`scroll-snap-type: y mandatory`). Aktuell **5 aktive Sektionen** in `page.tsx`.

```
┌─────────────────────────────────┐
│  [●] ← Navigationsdots (links)  │
│                                 │
│  1 — HeroSection                │  schwarz
│  Logo + "Process House"         │
├─────────────────────────────────┤
│  2 — OurPhilosophySection       │  weiß
│  "Our Philosophy"               │
│  Venn: strategy ∩ technology    │
├─────────────────────────────────┤
│  3 — OurServicesSection         │  schwarz
│  "Our Services"                 │
│  Zoho-Banner (Logo + Text)      │
│  4 Journey-Karten (Hover-Flip)  │
├─────────────────────────────────┤
│  4 — KpiSection                 │  weiß
│  "5+ Jahre · 25+ Impl."         │
│  Count-up Animation (0.8s)      │
├─────────────────────────────────┤
│  5 — TeamCarousel               │  schwarz
│  "Who we are"                   │
│  Swipe/Drag-Karussell           │
├─────────────────────────────────┤
│  6 — ContactSection             │  weiß
│  "Contact"                      │
│  FAQ · Imprint · Privacy        │
└─────────────────────────────────┘

Separate Routen (jeweils /de/ und /en/):
  /[locale]/faq          → FAQ-Seite (bilingual, mit FAQPage JSON-LD)
  /[locale]/imprint      → Impressum
  /[locale]/privacy      → Datenschutzerklärung
  /[locale]/zoho-check   → CRM-Check-Funnel (eigenständige Seite)
```

> **Hinweis:** `OurWorkSection` ist aktiv eingebunden. Die Anzeige wird via `NEXT_PUBLIC_SHOW_OUR_WORK` in `.env.local` gesteuert. Default: `false` → KpiSection wird gezeigt. Auf `true` setzen, um OurWorkSection anzuzeigen.

---

## 4. Komponenten-Überblick

### `app/layout.tsx` (Root Layout)
- Minimal: gibt `children` direkt weiter, kein HTML/Body (das macht `[locale]/layout.tsx`)

### `app/[locale]/layout.tsx` (Haupt-Layout — Server Component)
- `lang={locale}` dynamisch, GA4, CookieYes, Google Consent Mode v2
- `NextIntlClientProvider` wrapping, `LanguageToggle` eingebunden
- `generateMetadata()` mit `getTranslations()` — bilingual
- JSON-LD `@graph`: `Person` (Felix) + `Organization` (Tau Process House), sprachabhängig
- `alternates.languages` für hreflang DE/EN

### `app/[locale]/page.tsx` (Hauptseite)
- `'use client'` — Scroll-Listener, Navigationsdots-State
- Sektionen via `next/dynamic` geladen
- `useTranslations('team')` für "Who we are" Titel

### `middleware.ts`
- `next-intl/middleware` — Locale-Detection, Redirect `/` → `/de`
- Matcher: alle Pfade außer `/api`, `/_next`, statische Dateien

### Komponenten (alle JSON-gesteuert via `useLocalized()`)
- **HeroSection** — liest aus `data/hero.json`
- **WhatSection** — liest aus `data/philosophy.json`, Venn-Diagramm
- **OurServicesSection** — liest aus `data/services.json`, 4 Karten, Zoho-Banner
- **KpiSection** — liest aus `data/kpi.json`, Count-up Animation
- **TeamCarousel** — liest aus `data/team.json`, `visible: false` blendet Mitglieder aus
- **ContactSection** — liest aus `data/contact.json`, lokalisierte Links via `@/i18n/navigation`
- **LanguageToggle** — Fixed top-right, Pill-Style DE | EN

### `faq/page.tsx`
- Server Component, kein next-intl mehr
- Liest alle Labels aus `data/faq.json` (Abschnitt `page.*`)
- FAQ-Items aus `data/faq.json` (Abschnitt `items[]`, `published`-Flag)
- SEO-Metadata aus `data/metadata.json`
- Bilinguales FAQPage JSON-LD Schema

### `[locale]/layout.tsx`
- Metadata (Title, Description, OG, Twitter) aus `data/metadata.json`
- JSON-LD `@graph` (Person + Organization) aus `data/metadata.json`
- kein `getTranslations()` mehr — nur noch `getMessages()` für `NextIntlClientProvider`

### `imprint/page.tsx`
- Server Component, kein next-intl mehr
- Adresse, VAT-ID, alle Labels aus `data/imprint.json`

### `OurWorkSection.tsx`
- Filter-Galerie: All / Solutions / Case Studies / Products
- JSON-gesteuert via `src/data/work.json` (bilingual: alle Textfelder als `{ de, en }`)
- Drei Detail-Komponenten: `CaseStudyDetail`, `ProductDetail`, `SolutionDetail`
- Lokalisierung via `useLocale()` + `useLoc()`-Helper
- Aktivierung via `NEXT_PUBLIC_SHOW_OUR_WORK=true` in `.env.local`
- Vollständige Datenschema-Dokumentation: `agent/konzepte/our-work-datenschema.md`

---

## 5. Externe Abhängigkeiten & Integrationen

| Service | Zweck | Einbindung |
|---|---|---|
| Google Analytics 4 | Tracking | Script in `[locale]/layout.tsx`, `afterInteractive`, Consent Mode v2 |
| CookieYes | DSGVO Cookie-Consent | Script in `[locale]/layout.tsx`, `afterInteractive` |
| next-intl | i18n (DE/EN) | Middleware, `[locale]/`-Routing, JSON-Übersetzungsdateien |
| Google Fonts | Inter | `next/font/google` |
| join.com | Stellenanzeigen | Externer Link in ContactSection |
| OpenRouter API | KI-Analyse (zoho-check) | Server-seitig via `OPENROUTER_API_KEY` |
| Resend | E-Mail-Versand (zoho-check PDF) | Server-seitig via `RESEND_API_KEY` |
| Zoho CRM | Lead-Anlage | Server-seitig via OAuth Refresh Token |

---

## 6. Umgebungsvariablen (Auszug relevante Feature-Flags)

| Variable | Default | Zweck |
|---|---|---|
| `NEXT_PUBLIC_SHOW_OUR_WORK` | `false` | `true` → OurWorkSection wird angezeigt statt KpiSection |

---

## 7. Content-Pflege: Wo was ändern

| Was ändern | Datei |
|---|---|
| Hero-Titel, Tagline, Logo | `src/data/hero.json` |
| Philosophie-Texte, Venn-Labels | `src/data/philosophy.json` |
| Leistungen (Titel, Steps, Zoho-Banner) | `src/data/services.json` |
| KPI-Zahlen & Labels | `src/data/kpi.json` |
| Team: Namen, Bilder, Rollen, Zitate | `src/data/team.json` (+ `visible: false` zum Ausblenden) |
| Kontakt-E-Mail, Jobportal-URL | `src/data/contact.json` |
| Impressum: Adresse, E-Mail, USt-ID | `src/data/imprint.json` |
| SEO-Titles, Descriptions, OG-Daten | `src/data/metadata.json` |
| FAQ-Fragen & Antworten | `src/data/faq.json` → `items[]` (+ `published: false` zum Ausblenden) |
| FAQ-Seiten-Labels (Titel, CTA etc.) | `src/data/faq.json` → `page.*` |
| Our Work (Cases, Solutions, Products) | `src/data/work.json` |
| Team-Bild hinzufügen | `public/team/` ablegen, Pfad in `team.json` eintragen |

---

## 8. Offene Asset-Aufgabe

| Datei | Beschreibung | Status |
|-------|-------------|--------|
| `/public/img/og-image.png` | 1200×630px OG-Bild für Social-Previews | **fehlend** |

---

## 9. Konzept-Dokumentation

Vollständiges Konzept des JSON Content-Systems: `agent/konzepte/content-management-system.md`
