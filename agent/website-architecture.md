# Website-Architektur: Tau Process House

> Analyse-Stand: März 2026

---

## 1. Tech Stack

| Schicht | Technologie | Version |
|---|---|---|
| Framework | Next.js (App Router) | 15.1.6 |
| UI-Bibliothek | React | 19.0.0 |
| Sprache | TypeScript | ^5 |
| Styling | Tailwind CSS + globales CSS | ^3.4.1 |
| Animationen | Framer Motion | ^12.4.1 |
| Scroll-Erkennung | react-intersection-observer | ^9.15.1 |
| Fonts | Google Fonts – Inter (via `next/font`) | – |
| Analytics | Google Analytics 4 (GA4) | – |
| Cookie-Consent | CookieYes | – |
| Hosting | Vercel (vermutlich, basierend auf next.svg im public-Ordner) | – |

---

## 2. Ordnerstruktur

```
tau-process-house/
├── public/
│   ├── img/
│   │   ├── logo.png
│   │   ├── logo.svg
│   │   └── logo.webp          ← aktiv verwendetes Format
│   ├── team/
│   │   ├── felix.jpg
│   │   ├── luca.png
│   │   ├── moritz.jpeg
│   │   ├── bhuvenesh.jpg
│   │   └── placeholder.png
│   ├── file.svg               ← Next.js Default (ungenutzt)
│   ├── globe.svg              ← Next.js Default (ungenutzt)
│   ├── next.svg               ← Next.js Default (ungenutzt)
│   └── window.svg             ← Next.js Default (ungenutzt)
│
├── src/
│   ├── app/
│   │   ├── favicon.ico
│   │   ├── globals.css        ← Globales Styling + Tailwind
│   │   ├── layout.tsx         ← Root Layout: Metadata, Fonts, Analytics, Cookies
│   │   ├── page.tsx           ← Hauptseite (One-Pager)
│   │   └── imprint/
│   │       └── page.tsx       ← Impressum-Seite
│   │
│   └── components/
│       ├── HeroSection.tsx    ← Sektion 1: Logo + Tagline
│       ├── WhatSection.tsx    ← Sektion 2: Was wir tun (Venn-Diagramm)
│       ├── HowSection.tsx     ← Sektion 3: Wie wir es tun (2 Spalten)
│       ├── WhySection.tsx     ← Sektion 4: Warum wir (3 Cards)
│       ├── TeamCarousel.tsx   ← Sektion 5 (eingebettet): Team-Karussell
│       └── ContactSection.tsx ← Sektion 6: Kontakt + Impressum-Link
│
├── next.config.ts             ← Next.js Config (Bild-Whitelist)
├── tailwind.config.ts         ← Tailwind-Konfiguration
├── tsconfig.json              ← TypeScript-Konfiguration
├── postcss.config.mjs         ← PostCSS für Tailwind
├── eslint.config.mjs          ← ESLint-Regeln
└── package.json
```

---

## 3. Seitenstruktur (One-Pager)

Die Website ist als **vertikaler Full-Screen-One-Pager** aufgebaut. Alle Sektionen sind gleichzeitig im DOM geladen, der Nutzer scrollt mit **CSS Scroll-Snap** zwischen ihnen.

```
┌─────────────────────────────────┐
│  [●] ← Navigationsdots (links)  │
│                                 │
│  Sektion 1 – HeroSection        │  Hintergrund: Schwarz
│  Logo + "Process House"         │  Farbe: Weiß
│  "where processes want to live" │
├─────────────────────────────────┤
│  Sektion 2 – WhatSection        │  Hintergrund: Weiß
│  "What we do"                   │  Farbe: Schwarz
│  Venn-Diagramm: strategy ∩      │
│  technology = process           │
├─────────────────────────────────┤
│  Sektion 3 – HowSection         │  Hintergrund: Schwarz
│  "How we do it"                 │  Farbe: Weiß
│  Technology | Methodology       │
│  (2-Spalten-Grid)               │
├─────────────────────────────────┤
│  Sektion 4 – WhySection         │  Hintergrund: Weiß
│  "Why us"                       │  Farbe: Schwarz
│  Expertise | Custom | Sustain.  │
│  (3-Spalten-Grid)               │
├─────────────────────────────────┤
│  Sektion 5 – Team               │  Hintergrund: Schwarz
│  "Who we are"                   │  Farbe: Weiß
│  TeamCarousel (Swipe/Drag)      │
├─────────────────────────────────┤
│  Sektion 6 – ContactSection     │  Hintergrund: Weiß
│  "Contact"                      │  Farbe: Schwarz
│  For Clients | For Applicants   │
│  Impressum-Link                 │
└─────────────────────────────────┘

Separate Route: /imprint           Eigenständige Seite (schwarz)
```

---

## 4. Navigation

- **Scroll-Snap**: CSS `scroll-snap-type: y mandatory` sorgt für magnetisches Einrasten an Sektionen
- **Navigationsdots**: 6 fixe Punkte (links, vertikal zentriert), zeigen aktive Sektion; Klick scrollt zur Sektion
- **Kein klassisches Menü / Header**: Die Navigation ist vollständig auf die Dots reduziert
- **Imprint-Link**: Nur im Footer von ContactSection; öffnet `/imprint` als eigene Seite

---

## 5. Komponenten-Überblick

### `layout.tsx` (Root Layout)
- Lädt Inter-Font mit `display: 'swap'` für bessere Performance
- Setzt globale Metadaten (`title`, `description`, `favicon`)
- Bindet **Google Analytics 4** mit `strategy="afterInteractive"` ein
- Bindet **CookieYes** mit `strategy="lazyOnload"` ein
- `lang="en"` auf dem HTML-Element

### `page.tsx` (Hauptseite)
- Ist als `'use client'` markiert (clientseitig gerendert)
- Lädt alle Sektions-Komponenten via `next/dynamic` (Lazy Loading)
- Verwaltet den aktiven Sektion-Index via `useState`
- Liest Scroll-Position aus dem `.section-container`-Element

### `HeroSection.tsx`
- Einfache Fade-in-Animation via Framer Motion
- Zeigt Logo (`.webp`) und Headline
- Kein CTA (Call to Action)

### `WhatSection.tsx`
- Reines JSX, keine Animationen, kein Client-State
- Visualisiert die Kernbotschaft über ein CSS-basiertes Venn-Diagramm

### `HowSection.tsx`
- Reines JSX, kein Client-State
- Zeigt zwei Listen (Technology / Methodology) mit `[x]`-Präfixen als Bullet-Style

### `WhySection.tsx`
- Reines JSX, kein Client-State
- 3-Spalten-Grid mit Kurztext-Cards

### `TeamCarousel.tsx`
- `'use client'` – komplexeste Komponente
- Erkennt Mobilgerät via `window.innerWidth` im `useEffect`
- Unterstützt Swipe/Drag (Framer Motion) und Klick auf Nachbar-Cards
- Datenhaltung: Team-Mitglieder als hartcodiertes Array im File selbst
- Enthält noch einen Platzhalter-Eintrag "[Your Name Here]"

### `ContactSection.tsx`
- Kein Client-State
- Zeigt zwei Kontaktwege (E-Mail / Job-Portal)
- E-Mail-Anzeige (`info@tauprocess.de`) und `mailto`-Ziel (`rimbas.itb+info@gmail.com`) stimmen **nicht überein**

### `imprint/page.tsx`
- Eigenständige Route (`/imprint`)
- Ist als `'use client'` markiert, obwohl kein Client-Feature verwendet wird
- Enthält Impressumspflichtangaben nach § 5 TMG, USt-ID und EU-ODR-Hinweis

---

## 6. Styling-Architektur

Das Styling kombiniert zwei Ansätze:

**Tailwind CSS** für komponentennahe Utility-Klassen direkt in JSX.

**Globales CSS** (`globals.css`) für wiederverwendbare, layout-kritische Klassen:

| Klasse | Verwendung |
|---|---|
| `.section` | Vollbild-Section (100dvh, flex-center, scroll-snap) |
| `.section-black` | Dunkle Sektion (Hintergrund schwarz, Text weiß) |
| `.section-white` | Helle Sektion (Hintergrund weiß, Text schwarz) |
| `.section-container` | Scroll-Container (overflow-y scroll, snap-type mandatory) |
| `.section-dots` | Fixierte Navigationspunkte (links, z-index 50) |
| `.section-dot` | Einzelner Navigationspunkt |
| `.team-card` | Team-Karte (via @apply) |
| `.team-image` | Team-Profilbild (rund, 192px) |
| `.team-quote` | Kursives Zitat mit typografischen Anführungszeichen |

Media Queries: `max-width: 768px` (mobile) und `min-width: 769px` (desktop). Tailwind-Breakpoints (`md:`) werden parallel genutzt.

---

## 7. Externe Abhängigkeiten & Integrationen

| Service | Zweck | Einbindung |
|---|---|---|
| Google Analytics 4 | Seitenaufruf-Tracking | Script-Tag in `layout.tsx`, `afterInteractive` |
| CookieYes | DSGVO Cookie-Consent-Banner | Script-Tag in `layout.tsx`, `lazyOnload` |
| Google Fonts (CDN) | Inter-Font | `next/font/google` |
| join.com | Stellenanzeigen | Externer Link in ContactSection |
| cdn-cookieyes.com | Preconnect im `<head>` | `<link rel="preconnect">` |

---

## 8. Git & Deployment

- Repository mit `.git`-Verzeichnis vorhanden
- Branch: `master`
- Kein `.env`-File sichtbar; keine CI/CD-Konfigurationsdatei im Ordner
- `package.json` enthält Standard-Next.js-Scripts: `dev`, `build`, `start`, `lint`
- Entwicklungsserver mit Turbopack: `next dev --turbopack`
