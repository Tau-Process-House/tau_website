# Konzept: JSON-basiertes Content-Management-System

## Ziel

Alle Texte, Bilder und Daten der Webseite sollen über JSON-Dateien steuerbar sein, ohne Komponentencode ändern zu müssen. Das bestehende `next-intl`-System bleibt für reine UI-Labels erhalten; alle inhaltlichen/redaktionellen Daten wandern in strukturierte JSON-Dateien unter `src/data/`.

---

## Ist-Zustand

### Bereits JSON-gesteuert
| Bereich | Datei | Typ |
|---------|-------|-----|
| FAQ-Inhalte | `src/data/faq.json` | Bilingual `{ de, en }` |
| Our Work (Cases, Solutions, Products) | `src/data/work.json` | Bilingual `{ de, en }` |
| UI-Labels & kurze Texte | `src/messages/de.json` / `en.json` | next-intl |

### Noch hardcoded in Komponenten
| Bereich | Was ist hardcoded | Wo |
|---------|-------------------|----|
| **Hero** | `"Process House"` (Titel) | `HeroSection.tsx` Z.27 |
| **KPI** | Zahlenwerte `5`, `25`, Suffixe `+` | `KpiSection.tsx` Z.58-59 |
| **Team** | Namen, Bildpfade, Reihenfolge | `TeamCarousel.tsx` Z.10-41 |
| **Contact** | E-Mail `info@tauprocess.de`, join.com URL | `ContactSection.tsx` Z.15,22 |
| **Services** | Zoho-Logo-Pfad `/img/zoho-logo-white.svg` | `OurServicesSection.tsx` Z.28 |
| **Imprint** | Adresse, Telefon, VAT-ID | `imprint/page.tsx` |
| **Privacy** | Kompletter deutscher Rechtstext | `privacy/page.tsx` |

---

## Soll-Zustand: Architektur

### Prinzip

```
src/data/                         ← Redaktionelle Inhalte (Content)
├── hero.json                     ← NEU
├── philosophy.json               ← NEU (aus messages extrahiert)
├── services.json                 ← NEU (aus messages extrahiert)
├── kpi.json                      ← NEU
├── team.json                     ← NEU
├── contact.json                  ← NEU
├── faq.json                      ← BESTEHT (unverändert)
├── work.json                     ← BESTEHT (unverändert)
├── imprint.json                  ← NEU
└── metadata.json                 ← NEU (SEO-Daten aus messages extrahiert)

src/messages/de.json / en.json    ← NUR noch UI-Labels
                                     (Navigation, Buttons, Accessibility)
```

### Einheitliches Datenformat

Alle Content-JSON-Dateien nutzen dasselbe Pattern wie `faq.json` und `work.json`:

```typescript
// Bilingualer String
type LocalizedString = { de: string; en: string };

// Bilingualer optionaler String
type LocalizedOptional = { de?: string; en?: string };
```

### Shared Helper

Bestehender `useLoc()`-Helper aus `OurWorkSection.tsx` wird in einen shared Utility extrahiert:

```typescript
// src/lib/use-localized.ts
export function useLocalized() {
  const locale = useLocale();
  return (field: { de: string; en: string }) => field[locale] ?? field.de;
}
```

---

## Neue JSON-Dateien: Struktur

### 1. `src/data/hero.json`

```json
{
  "title": "Process House",
  "tagline": { "de": "where processes want to live", "en": "where processes want to live" },
  "logo": {
    "src": "/img/logo.webp",
    "alt": { "de": "Process House Logo", "en": "Process House Logo" }
  }
}
```

### 2. `src/data/philosophy.json`

```json
{
  "title": { "de": "Unsere Philosophie", "en": "Our Philosophy" },
  "paragraphs": [
    {
      "de": "Wir entwickeln IT-Systeme um Menschen stärken, nicht Sie zu ersetzen.",
      "en": "We build IT systems to empower people, not replace them."
    },
    {
      "de": "Unser Ziel ist die perfekte Mensch-Maschine Symbiose...",
      "en": "Our goal is the perfect human-machine symbiosis..."
    }
  ],
  "vennLabels": {
    "people":     { "de": "Menschen",    "en": "People" },
    "technology": { "de": "Technologie", "en": "Technology" },
    "process":    { "de": "Prozess",     "en": "Process" }
  }
}
```

### 3. `src/data/services.json`

```json
{
  "title": { "de": "Unsere Leistungen", "en": "Our Services" },
  "platform": {
    "name": "Zoho One",
    "logo": "/img/zoho-logo-white.svg",
    "description": {
      "de": "Alle unsere Lösungen basieren auf Zoho One, der All-in-One-Plattform für Unternehmenserfolg.",
      "en": "All our solutions are built on Zoho One, the all-in-one platform for business success."
    }
  },
  "mobileHint": {
    "de": "tippen für Details · wischen zum Navigieren",
    "en": "tap for details · swipe to navigate"
  },
  "steps": [
    {
      "number": "01",
      "title":       { "de": "Beratung",          "en": "Consulting" },
      "description": { "de": "Wir starten mit...", "en": "We start with..." }
    },
    {
      "number": "02",
      "title":       { "de": "Migration & Setup",  "en": "Migration & Setup" },
      "description": { "de": "Wir bauen deine...",  "en": "We build your..." }
    },
    {
      "number": "03",
      "title":       { "de": "Entwicklung",         "en": "Development" },
      "description": { "de": "Wir bauen dein...",   "en": "We build your..." }
    },
    {
      "number": "04",
      "title":       { "de": "Training & Rollout",  "en": "Training & Rollout" },
      "description": { "de": "Wir schulen...",      "en": "We train..." }
    }
  ]
}
```

### 4. `src/data/kpi.json`

```json
{
  "items": [
    {
      "target": 5,
      "suffix": "+",
      "label": { "de": "Jahre Zoho Erfahrung", "en": "Years Zoho Experience" }
    },
    {
      "target": 25,
      "suffix": "+",
      "label": { "de": "Implementierungen", "en": "Implementations" }
    }
  ]
}
```

### 5. `src/data/team.json`

```json
{
  "title": { "de": "Wer wir sind", "en": "Who we are" },
  "prevAlt": { "de": "Vorheriges Teammitglied", "en": "Previous team member" },
  "nextAlt": { "de": "Nächstes Teammitglied", "en": "Next team member" },
  "members": [
    {
      "id": "felix",
      "name": "Felix Rimbakowsky",
      "image": "/team/felix.jpg",
      "role":  { "de": "Gründer & CEO", "en": "Founder & CEO" },
      "quote": {
        "de": "Prozesse sind die Brücke zwischen der Vision und der Realität eines Unternehmens",
        "en": "Processes are the bridge between a company's vision and its reality"
      },
      "visible": true
    },
    {
      "id": "luca",
      "name": "Luca Bleckmann",
      "image": "/team/luca.png",
      "role":  { "de": "Lead Project Manager", "en": "Lead Project Manager" },
      "quote": { "de": "Technologie sollte dem Menschen dienen...", "en": "Technology should serve people..." },
      "visible": true
    },
    {
      "id": "placeholder",
      "name": "[Your Name Here]",
      "image": "/team/placeholder.png",
      "role":  { "de": "Zukünftiges Teammitglied", "en": "Future Team Member" },
      "quote": { "de": "Werde Teil unseres Teams...", "en": "Join our team..." },
      "visible": true
    },
    {
      "id": "moritz",
      "name": "Moritz Bruder",
      "image": "/team/moritz.jpeg",
      "role":  { "de": "Technical Advisor", "en": "Technical Advisor" },
      "quote": { "de": "Automatisierung bedeutet...", "en": "Automation means..." },
      "visible": true
    },
    {
      "id": "bhuvenesh",
      "name": "Bhuvenesh Verma",
      "image": "/team/bhuvenesh.jpg",
      "role":  { "de": "AI Developer", "en": "AI Developer" },
      "quote": { "de": "Agenten, die zuhören...", "en": "Agents that listen..." },
      "visible": true
    }
  ]
}
```

### 6. `src/data/contact.json`

```json
{
  "title": { "de": "Kontakt", "en": "Contact" },
  "clients": {
    "heading": { "de": "Für Kunden", "en": "For Clients" },
    "email": "info@tauprocess.de"
  },
  "applicants": {
    "heading": { "de": "Für Bewerber", "en": "For Applicants" },
    "label": { "de": "Stellenanzeigen", "en": "Job Postings" },
    "url": "https://join.com/companies/tauprocess"
  },
  "footerLinks": {
    "imprint": { "de": "Impressum", "en": "Imprint" },
    "privacy": { "de": "Datenschutz", "en": "Privacy" },
    "faq":     { "de": "FAQ",         "en": "FAQ" }
  }
}
```

### 7. `src/data/imprint.json`

```json
{
  "company": "Tau Process House",
  "owner": "Felix Rimbakowsky",
  "address": {
    "street": "Heidestraße 73",
    "zip": "30659",
    "city": "Hannover",
    "country": "Deutschland"
  },
  "contact": {
    "email": "info@tauprocess.de"
  },
  "vatId": "DE366345370",
  "labels": {
    "backLink":         { "de": "← Zurück zur Startseite",     "en": "← Back to homepage" },
    "title":            { "de": "Impressum",                    "en": "Imprint" },
    "infoTitle":        { "de": "Angaben gemäß § 5 TMG",       "en": "Information per § 5 TMG" },
    "contactTitle":     { "de": "Kontakt",                      "en": "Contact" },
    "vatTitle":         { "de": "Umsatzsteuer-ID",              "en": "VAT ID" },
    "responsibleTitle": { "de": "Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV", "en": "..." },
    "disputeTitle":     { "de": "Streitschlichtung",            "en": "Dispute Resolution" }
  }
}
```

### 8. `src/data/metadata.json`

```json
{
  "site": {
    "defaultTitle": {
      "de": "Felix Rimbakowsky · Zoho-Experte & Prozessautomatisierung",
      "en": "Felix Rimbakowsky · Zoho Expert & Process Automation"
    },
    "titleTemplate": "%s | Tau Process House",
    "description": {
      "de": "Felix Rimbakowsky ist Zoho-Experte aus Berlin & Hannover...",
      "en": "Felix Rimbakowsky is a Zoho expert from Berlin & Hanover..."
    },
    "ogLocale": { "de": "de_DE", "en": "en_US" }
  },
  "faq": {
    "title": {
      "de": "FAQ — Häufige Fragen zu Zoho & Zusammenarbeit",
      "en": "FAQ — Frequently Asked Questions about Zoho"
    }
  }
}
```

---

## Was bleibt in `messages/de.json` & `en.json`?

Nach der Migration enthalten die next-intl Dateien **nur noch reine UI-Labels**:

```json
{
  "nav": {
    "dotLabel": "Zu Abschnitt {n} springen"
  }
}
```

Alles andere (Inhalte, SEO-Daten, Team-Daten, KPIs etc.) lebt in `src/data/*.json`.

---

## Änderungsliste

### Phase 1: Infrastruktur (1 Datei)

| # | Änderung | Datei |
|---|----------|-------|
| 1.1 | Shared `useLocalized()` Hook erstellen | `src/lib/use-localized.ts` (NEU) |

### Phase 2: JSON-Dateien anlegen (8 Dateien)

| # | Änderung | Datei |
|---|----------|-------|
| 2.1 | Hero-Content extrahieren | `src/data/hero.json` (NEU) |
| 2.2 | Philosophy-Content extrahieren | `src/data/philosophy.json` (NEU) |
| 2.3 | Services-Content extrahieren | `src/data/services.json` (NEU) |
| 2.4 | KPI-Daten extrahieren | `src/data/kpi.json` (NEU) |
| 2.5 | Team-Daten extrahieren | `src/data/team.json` (NEU) |
| 2.6 | Contact-Daten extrahieren | `src/data/contact.json` (NEU) |
| 2.7 | Imprint-Daten extrahieren | `src/data/imprint.json` (NEU) |
| 2.8 | Metadata/SEO extrahieren | `src/data/metadata.json` (NEU) |

### Phase 3: Komponenten umstellen (7 Dateien)

| # | Änderung | Datei | Was passiert |
|---|----------|-------|-------------|
| 3.1 | `HeroSection.tsx` | Liest aus `hero.json`, entfernt `useTranslations('hero')` | Titel + Logo + Tagline aus JSON |
| 3.2 | `WhatSection.tsx` | Liest aus `philosophy.json`, entfernt `useTranslations('philosophy')` | Titel + Absätze + Venn-Labels aus JSON |
| 3.3 | `OurServicesSection.tsx` | Liest aus `services.json`, entfernt `useTranslations('services')` | Titel + Banner + Steps aus JSON |
| 3.4 | `KpiSection.tsx` | Liest aus `kpi.json`, entfernt `useTranslations('kpi')` + hardcoded Werte | Zahlen + Labels aus JSON |
| 3.5 | `TeamCarousel.tsx` | Liest aus `team.json`, entfernt `useTranslations('team')` + hardcoded Array | Alles aus JSON, `visible`-Flag zum Ein-/Ausblenden |
| 3.6 | `ContactSection.tsx` | Liest aus `contact.json`, entfernt `useTranslations('contact')` | E-Mail, URLs, Labels aus JSON |
| 3.7 | `imprint/page.tsx` | Liest aus `imprint.json`, entfernt `useTranslations('imprint')` + hardcoded Adressen | Alles aus JSON |

### Phase 4: Layout & SEO umstellen (1 Datei)

| # | Änderung | Datei |
|---|----------|-------|
| 4.1 | Metadata aus `metadata.json` laden statt aus `messages` | `[locale]/layout.tsx` |

### Phase 5: Messages aufräumen (2 Dateien)

| # | Änderung | Datei |
|---|----------|-------|
| 5.1 | Alle migrierten Namespaces entfernen | `src/messages/de.json` |
| 5.2 | Alle migrierten Namespaces entfernen | `src/messages/en.json` |

### Phase 6: TypeScript-Typen (1 Datei)

| # | Änderung | Datei |
|---|----------|-------|
| 6.1 | Content-Typen für alle JSON-Dateien definieren | `src/types/content.ts` (NEU) |

### Phase 7: Agent-Dokumentation (1 Datei)

| # | Änderung | Datei |
|---|----------|-------|
| 7.1 | `website-architecture.md` aktualisieren | Neue Dateistruktur dokumentieren |

---

## Zusammenfassung der Dateien

| Aktion | Anzahl |
|--------|--------|
| **Neue Dateien** | 11 (`use-localized.ts`, 8 JSON-Dateien, `content.ts`, Doku) |
| **Geänderte Dateien** | 11 (7 Komponenten, 1 Layout, 2 Messages, 1 Doku) |
| **Gelöschte Dateien** | 0 |
| **Gesamt-Änderungen** | 22 Dateien |

---

## Sonderfall: Privacy Page

Die Datenschutzseite (`privacy/page.tsx`) enthält deutschen Rechtstext, der gesetzlich vorgegeben ist. Dieser bleibt vorerst hardcoded, da:
- Nur auf Deutsch erforderlich (DSGVO)
- Selten geändert wird
- Bei Änderung ohnehin juristisch geprüft werden muss

Optional: Könnte später in eine `src/data/privacy.json` migriert werden.

---

## Vorteile dieses Systems

1. **Ein Ort für alle Inhalte**: `src/data/` — kein Suchen in Komponenten nötig
2. **Konsistentes Format**: Alle Dateien nutzen `{ de, en }` Pattern
3. **Erweiterbar**: Neue Sprache = neues Feld in allen JSON-Dateien
4. **Versionierbar**: JSON-Änderungen sind im Git-Diff klar lesbar
5. **Kein CMS nötig**: Bleibt statisch, aber leicht pflegbar
6. **Visibility-Flags**: Team-Mitglieder und andere Inhalte ein-/ausblendbar
