# Konzept: CRM-Check Landing Page
> `/zoho-check` — Lead Funnel für Zoho CRM Beratungsprojekte

**Status:** Konzept v2 (überarbeitet März 2026)
**Basis:** MVP `CRM Struktur Guesser` (Flask/Vanilla JS)
**Ziel-Stack:** Next.js 15, TypeScript, Tailwind CSS, Next.js API Routes

---

## 1. Zielsetzung

Die Landing Page dient als **kostenloser Self-Service-Einstieg** in den Tau Process House Beratungsprozess für Zoho CRM. Ein potenzieller Kunde:

1. findet die Seite organisch (Suche) oder über die „Our Work"-Sektion der Hauptseite
2. gibt seine CRM-Daten ein (keine technischen Kenntnisse nötig)
3. erhält sofort eine KI-gestützte Analyse seiner CRM-Struktur — ohne Gate
4. kann die Analyse per E-Mail als PDF erhalten (→ Double-Opt-In für Marketing)
5. wird direkt im Ergebnis zur Beratung eingeladen

**Kernmechanik:** Der Nutzer liefert die Lead-Qualifikation selbst. Mit dem Formular-Submit wird automatisch ein Lead in Zoho CRM angelegt inkl. Modulliste und Analyse-Output. Der PDF-E-Mail-Button ist der Double-Opt-In für weitere Kommunikation.

---

## 2. URL & Integration in die Bestehende Website

### Neue Route: `/zoho-check`

Die Landing Page ist eine **eigenständige Next.js-Seite** (kein Teil des One-Pagers) — analog zu `/imprint`, aber als vollwertige, mehrstufige Seite gebaut. Deutsch als Seitensprache, da Zielgruppe DACH-Markt.

```
tau-process-house/
└── src/
    ├── app/
    │   ├── page.tsx                    ← bestehend (One-Pager)
    │   ├── imprint/page.tsx            ← bestehend
    │   └── zoho-check/
    │       └── page.tsx                ← NEU: Landing Page (lang="de")
    │
    ├── components/
    │   └── zoho-check/                 ← NEU: Eigener Komponenten-Ordner
    │       ├── CheckHero.tsx           ← Scroll-Snap Hero (100dvh)
    │       ├── StepInput.tsx           ← Formular mit Sidebar-Guide
    │       ├── GenericEmailModal.tsx   ← Popup bei generischer E-Mail
    │       ├── ModuleGuidePanel.tsx    ← Scrollbare Schritt-Anleitung (1/3)
    │       ├── StepLoading.tsx         ← Ladescreen (100dvh)
    │       ├── StepResults.tsx         ← Ergebnis + PDF-CTA + Beratungs-CTA
    │       └── PdfEmailModal.tsx       ← Double-Opt-In Modal
    │
    └── app/
        └── api/
            └── zoho-check/             ← NEU: API-Endpunkte
                ├── extract/route.ts    ← POST: Website-Analyse + Modul-Parsing
                ├── analyze/route.ts    ← POST: KI-Analyse via OpenRouter
                ├── send-pdf/route.ts   ← POST: PDF generieren + E-Mail versenden
                └── crm-lead/route.ts   ← POST: Lead in Zoho CRM anlegen
```

### Verlinkung vom One-Pager

Der Link zur Landing Page kommt aus der zukünftigen **„Our Work"-Sektion** des One-Pagers, in der der CRM-Check als kostenloses Produkt präsentiert wird — nicht als generischer Hinweis, sondern als eigenständige Karte mit Produktcharakter:

```
┌─────────────────────────────────────────────┐
│  [Our Work]                                 │
│                                             │
│  ┌──────────────────────┐                   │
│  │  🔍 CRM-Check        │  ← Produkt-Card   │
│  │  Kostenlos           │                   │
│  │  Ihre Zoho-Struktur  │                   │
│  │  in 60 Sek. analysiert│                  │
│  │  [ Jetzt testen → ]  │                   │
│  └──────────────────────┘                   │
└─────────────────────────────────────────────┘
```

---

## 3. Seitenstruktur — Hybrid Scroll-Ansatz

### Warum kein reines Scroll-Snap?

Scroll-Snap funktioniert gut mit **festen, vorhersehbaren Sektionshöhen**. Der Funnel hat aber eine dynamische Inhaltshöhe: Das Ergebnis-Panel kann je nach Analyse kurz oder sehr lang sein, und die Akkordeons ändern die Höhe beim Aufklappen. Ein erzwungenes Scroll-Snap würde die Ergebnis-Sektion abschneiden oder sperrig wirken.

**Gewählter Ansatz — Hybrid:**

- **Zone A (Hero):** Vollbild-Scroll-Snap (100dvh) — identische Sprache zur Hauptseite
- **Zone C (Loading):** Ebenfalls Vollbild, ersetzt Zone B im gleichen DOM-Slot
- **Zone B + D:** Klassisches Scrollen ohne Snap-Zwang, volle Designkonsistenz durch Farbwechsel

Damit fühlt sich der Einstieg wie die Hauptseite an (schnappender Vollbild-Hero), und der Funnel-Teil scrollt danach natürlich.

```
┌────────────────────────────────────────────────────────┐
│  ZONE A — HERO (100dvh, Scroll-Snap)                   │
│  Headline + Subline + Trust-Signale                    │
│  Hintergrund: Schwarz                                  │
├────────────────────────────────────────────────────────┤
│  ZONE B — FORMULAR  (Zustand 1: Eingabe)               │  ← klassisch
│  E-Mail + Lizenz + Modulliste + Sidebar-Guide          │  scrollbar
│  Hintergrund: Weiß                                     │
├ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┤
│  ZONE C — LOADING (100dvh, ersetzt Zone B)             │
│  Phasen-Fortschritt-Animation                          │
│  Hintergrund: Schwarz                                  │
├ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┤
│  ZONE D — ERGEBNIS + CTA (ersetzt Zone B+C)            │  ← klassisch
│  Executive Summary → Akkordeons → PDF-Mail → Beratung  │  scrollbar
│  Hintergrund: abwechselnd Weiß / Schwarz               │
└────────────────────────────────────────────────────────┘
```

---

## 4. Detailliertes UI-Konzept

### Zone A — Hero

**Design:** 100dvh, schwarzer Hintergrund, weißer Text — konform mit `.section-black`. Framer Motion Fade-in wie `HeroSection.tsx` der Hauptseite.

```
┌────────────────────────────────────────────────────────┐
│                                                        │
│         [Tau Process House Logo]                       │
│                                                        │
│    Wie gut ist Ihr Zoho CRM wirklich aufgestellt?      │
│    ─────────────────────────────────────────────       │
│    Kostenlose Struktur-Analyse in 60 Sekunden.         │
│    KI-gestützt. Keine Installation. Kein Anruf.        │
│                                                        │
│    ● Erkennt ungenutzte Module                         │
│    ● Bewertet Ihre Lizenz-Effizienz                    │
│    ● Gibt konkrete Quick Wins                          │
│                                                        │
│    [ ↓ Jetzt analysieren ]                             │
│                                                        │
└────────────────────────────────────────────────────────┘
```

**Komponente:** `CheckHero.tsx`

---

### Zone B — Formular (Zustand 1)

**Grundlayout:** Weißer Hintergrund. Wenn der Sidebar-Guide geschlossen ist, nimmt das Formular die volle Breite ein. Wenn er geöffnet ist, teilt sich die Ansicht in **2/3 Formular + 1/3 Guide**.

```
┌─────────────────────────────┬──────────────────────────┐
│  FORMULAR (2/3)             │  SCHRITT-ANLEITUNG (1/3)  │
│                             │  [nur wenn geöffnet]      │
│  Schritt 1 — Geschäfts-     │                           │
│  E-Mail                     │  Wie kopiere ich die       │
│  ┌──────────────────────┐   │  Modulliste?              │
│  │ name@unternehmen.de  │   │  ─────────────────────    │
│  └──────────────────────┘   │  Schritt 1 von 4          │
│                             │  [Screenshot Zoho UI]     │
│  Schritt 2 — Lizenzmodell   │                           │
│  ○ CRM Standalone           │  Zoho CRM öffnen und      │
│  ○ Mehrere Zoho Apps        │  zu Einstellungen         │
│  ● Zoho One                 │  navigieren.              │
│                             │                           │
│  Schritt 3 — Modulliste     │  Schritt 2 von 4          │
│  [ So kopieren Sie die      │  [Screenshot Zoho UI]     │
│    Liste → ]  ←  öffnet     │                           │
│    Sidebar                  │  „Module & Felder"        │
│  ┌──────────────────────┐   │  anklicken.               │
│  │  Leads  Leads        │   │                           │
│  │  Kontakte  Contacts  │   │  [ ↑ ]  [ ↓ ]             │
│  │  ...                 │   │  scrollbare Schritte      │
│  └──────────────────────┘   │                           │
│                             │  [ × Schließen ]          │
│  ☐ Ich stimme der Daten-    │                           │
│    verarbeitung zu          │                           │
│                             │                           │
│  [ Analyse starten → ]      │                           │
└─────────────────────────────┴──────────────────────────┘
```

**UX-Details Zone B:**

**E-Mail-Validierung mit Domain-Check:**
- Beim Verlassen des E-Mail-Feldes (onBlur) wird die Domain gegen eine Liste generischer Provider geprüft (gmail.com, googlemail.com, yahoo.com, yahoo.de, hotmail.com, hotmail.de, web.de, gmx.de, gmx.net, outlook.com, icloud.com, t-online.de, freenet.de, posteo.de u.a.)
- Bei Treffern erscheint ein **Modal/Overlay**:

```
┌─────────────────────────────────────────────────────┐
│                                                      │
│  Wir haben eine private E-Mail-Adresse erkannt.      │
│                                                      │
│  Für eine präzisere Analyse benötigen wir die        │
│  Website Ihres Unternehmens.                         │
│                                                      │
│  Webseite Ihres Unternehmens (optional):             │
│  ┌───────────────────────────────────────────────┐  │
│  │  https://ihr-unternehmen.de                   │  │
│  └───────────────────────────────────────────────┘  │
│                                                      │
│  [ Ohne Website weiter ]   [ Bestätigen ]            │
│                                                      │
└─────────────────────────────────────────────────────┘
```

→ Die eingegebene Website-URL wird an die `/extract`-API übergeben statt die E-Mail-Domain. Wenn „Ohne Website weiter" gewählt wird, entfällt der Website-Analyse-Teil; die KI analysiert nur die Modulliste.

**Sidebar-Guide — Schritt-für-Schritt-Anleitung:**
- Ausgelöst durch Klick auf „So kopieren Sie die Liste →"
- Slide-in Animation von rechts (Framer Motion), nimmt 1/3 der Seitenbreite ein
- Inhalt: 4 nummerierte Schritte mit je einem Screenshot-Bild (Zoho CRM UI)
  1. „Zoho CRM öffnen → oben rechts auf das Einstellungs-Zahnrad klicken"
  2. „Im Menü links ‚Module & Felder' auswählen"
  3. „Die gesamte Tabelle markieren (Strg+A / Cmd+A) und kopieren (Strg+C / Cmd+C)"
  4. „Den kopierten Text in das Feld links einfügen"
- Vertikal scrollbar innerhalb des Panels
- Schließen: per × Button oder Klick außerhalb
- Auf Mobile: Panel erscheint als Vollbild-Overlay (bottom-sheet)
- Bilder: Werden als statische `.webp`-Assets unter `/public/guide/` abgelegt

**DSGVO-Checkbox:** Pflichtfeld mit Link zu `/privacy`

**Komponenten:** `StepInput.tsx`, `GenericEmailModal.tsx`, `ModuleGuidePanel.tsx`

---

### Zone C — Loading (Zustand 2)

**Design:** Vollbild (min-height: 100dvh), schwarzer Hintergrund — visuell identisch zu einer `.section-black` der Hauptseite.

```
┌────────────────────────────────────────────────────────┐
│                                                        │
│  Ihre CRM-Struktur wird analysiert…                    │
│                                                        │
│  [████░░]  Phase 1: Website wird analysiert ✓          │
│  [████░░]  Phase 2: Module werden klassifiziert ✓      │
│  [██░░░░]  Phase 3: KI-Analyse wird erstellt…          │
│                                                        │
│  Dies dauert ca. 30–60 Sekunden.                       │
│                                                        │
└────────────────────────────────────────────────────────┘
```

Der Fortschrittsbalken läuft phasenweise: Phase 1 schließt ab wenn `/extract` antwortet, Phase 3 wenn `/analyze` antwortet. Phase 2 ist ein animierter Zwischenzustand.

**Komponente:** `StepLoading.tsx`

---

### Zone D — Ergebnis + CTA (Zustand 3)

Zone D und die frühere Zone E sind zu einer einzigen scrollbaren Seite zusammengeführt. Der Abschnitt wechselt bewusst zwischen Weiß und Schwarz, um Inhalt und CTAs visuell zu trennen.

```
╔════════════════════════════════════════════════════════╗
║  ERGEBNIS-BLOCK (Hintergrund: Weiß)                    ║
╠════════════════════════════════════════════════════════╣
║  ┌──────────────────────────────────────────────────┐  ║
║  │  EXECUTIVE SUMMARY            Score: ████░ 4/5   │  ║
║  │  ──────────────────────────────────────────────  │  ║
║  │  „Ihr CRM ist solide aufgebaut, zeigt aber bei   │  ║
║  │   Integrationsmodulen ungenutztes Potenzial."    │  ║
║  │                                                  │  ║
║  │  ✓ 24 Module erkannt (8 Custom, 4 Integ.)        │  ║
║  │  ✓ Lizenz-Fit: Zoho One wird gut genutzt         │  ║
║  │  ! Zoho Projects-Integration fehlt               │  ║
║  └──────────────────────────────────────────────────┘  ║
║                                                        ║
║  [▼] Modul-Analyse      [▼] Gap-Analyse                ║
║  [▼] Quick Wins         [▼] Strategische Schritte      ║
╠════════════════════════════════════════════════════════╣
║  PDF-BLOCK (Hintergrund: Schwarz)                      ║
╠════════════════════════════════════════════════════════╣
║                                                        ║
║  Analyse sichern & teilen                              ║
║  ─────────────────────────────────────────────         ║
║  Erhalten Sie die vollständige Analyse als             ║
║  PDF per E-Mail — kostenlos und sofort.                ║
║                                                        ║
║  [ 📄 Analyse als PDF per E-Mail erhalten ]            ║
║                                                        ║
╠════════════════════════════════════════════════════════╣
║  BERATUNGS-CTA (Hintergrund: Weiß)                     ║
╠════════════════════════════════════════════════════════╣
║                                                        ║
║  Interesse an einer vertieften Analyse?                ║
║                                                        ║
║  In einem kostenlosen 30-Minuten-Gespräch zeigen       ║
║  wir, wie sich die Quick Wins konkret umsetzen         ║
║  lassen — und was mittel- bis langfristig möglich ist. ║
║                                                        ║
║  [ Termin vereinbaren ]   [ info@tauprocess.de ]       ║
║                                                        ║
║  ← Zurück zur Hauptseite                               ║
╚════════════════════════════════════════════════════════╝
```

**PDF-Double-Opt-In-Flow:**

Klick auf „Analyse als PDF per E-Mail erhalten" öffnet ein Modal:

```
┌────────────────────────────────────────────────────────┐
│                                                        │
│  Wohin sollen wir die Analyse schicken?                │
│                                                        │
│  ┌──────────────────────────────────────────────────┐  │
│  │  name@unternehmen.de  ← vorausgefüllt            │  │
│  └──────────────────────────────────────────────────┘  │
│                                                        │
│  ☐ Ich möchte gelegentlich Tipps zu Zoho CRM und       │
│    Prozessoptimierung von Tau Process House erhalten.  │
│    (Abmeldung jederzeit möglich)                       │
│                                                        │
│  [ PDF jetzt zusenden ]                                │
│                                                        │
│  Mit dem Absenden bestätige ich die                    │
│  Datenschutzerklärung.                                 │
└────────────────────────────────────────────────────────┘
```

→ Die Checkbox ist das explizite Opt-In für E-Mail-Marketing (DSGVO-konform, nicht vorausgewählt). Das PDF wird unabhängig vom Opt-In-Status gesendet — die Checkbox ist ein Bonus-Feld, kein Gate.

**Komponenten:** `StepResults.tsx`, `PdfEmailModal.tsx`

---

## 5. Technische Architektur (Next.js Integration)

### API-Route: `/api/zoho-check/extract`

**Methode:** `POST`

```typescript
// Eingabe
{ email: string; website?: string; licenseType: string; moduleList: string }
// website ist optional — wird gesetzt wenn generische E-Mail erkannt wurde

// Ausgabe
{ company_info: CompanyInfo; modules: Module[]; module_stats: ModuleStats }
```

**Implementierung:**
1. Domain aus `website` (falls vorhanden) oder E-Mail extrahieren
2. `fetch()` auf `https://<domain>` — server-seitig, kein CORS-Problem
3. HTML parsen mit `cheerio` oder `node-html-parser`
4. Keyword-Scoring für Branche / B2B / B2C
5. Modul-Parsing: KI-gestützt (OpenRouter/Gemini Flash), dann Regex-Fallback
6. `OPENROUTER_API_KEY` aus `process.env` (niemals im Client)

### API-Route: `/api/zoho-check/analyze`

**Methode:** `POST`

```typescript
// Eingabe
{ company_info: CompanyInfo; modules: Module[]; module_stats: ModuleStats; licenseType: string }

// Ausgabe
{ analysis: AnalysisResult }
```

### API-Route: `/api/zoho-check/crm-lead`

**Methode:** `POST` — wird server-seitig nach `/analyze` automatisch aufgerufen (nicht vom Client)

```typescript
// Eingabe
{ email: string; licenseType: string; moduleList: string; analysis: AnalysisResult; website?: string }

// Aktion
// → Zoho CRM API: Neuen Lead anlegen
// → Lead-Felder: Email, Company (aus Domain/Website), Lead Source = "CRM-Check Tool"
// → Notiz/Anhang 1: Rohe Modulliste
// → Notiz/Anhang 2: JSON-Analyse-Output
```

**Umgebungsvariablen:**
```
ZOHO_CRM_CLIENT_ID=...
ZOHO_CRM_CLIENT_SECRET=...
ZOHO_CRM_REFRESH_TOKEN=...   ← einmalig per OAuth generiert
```

Der Refresh-Token-Flow für Zoho CRM OAuth muss einmalig manuell eingerichtet werden.

### API-Route: `/api/zoho-check/send-pdf`

**Methode:** `POST`

```typescript
// Eingabe
{ email: string; analysis: AnalysisResult; optIn: boolean }

// Aktion
// 1. PDF aus AnalysisResult generieren (@react-pdf/renderer, server-seitig)
// 2. PDF per E-Mail versenden (z.B. via Resend oder nodemailer + SMTP)
// 3. Wenn optIn === true: E-Mail-Adresse in Marketing-Liste aufnehmen
```

### Umgebungsvariablen gesamt (`.env.local`)

```
OPENROUTER_API_KEY=sk-or-...
ZOHO_CRM_CLIENT_ID=...
ZOHO_CRM_CLIENT_SECRET=...
ZOHO_CRM_REFRESH_TOKEN=...
RESEND_API_KEY=...         ← oder SMTP_HOST / SMTP_USER / SMTP_PASS
FROM_EMAIL=crm-check@tauprocess.de
```

### TypeScript-Typen

`src/types/zoho-check.ts` — enthält alle Interfaces: `CompanyInfo`, `Module`, `ModuleStats`, `AnalysisResult`, `CheckFormData`

---

## 6. State-Management (Client-Seite)

```typescript
type CheckStep = 'input' | 'extracting' | 'analyzing' | 'results' | 'error'

// In zoho-check/page.tsx:
const [step, setStep] = useState<CheckStep>('input')
const [formData, setFormData] = useState<CheckFormData | null>(null)
const [extractionData, setExtractionData] = useState<ExtractionResult | null>(null)
const [analysisData, setAnalysisData] = useState<AnalysisResult | null>(null)
const [errorMessage, setErrorMessage] = useState<string | null>(null)
```

Ablauf:
1. Submit → `setStep('extracting')` → `POST /api/zoho-check/extract`
2. Extraktion OK → `setStep('analyzing')` → `POST /api/zoho-check/analyze`
3. Analyse OK → CRM-Lead wird server-seitig ausgelöst → `setStep('results')`
4. Fehler → `setStep('error')` + Fehlermeldung + „Erneut versuchen"-Button

---

## 7. Design-Konsistenz mit der Hauptseite

| Element | Hauptseite | CRM-Check |
|---------|-----------|-----------|
| Schriftart | Inter | Geerbt via `layout.tsx` |
| Farben | Schwarz + Weiß | Identisch, `.section-black` / `.section-white` |
| Hero-Animation | Framer Motion Fade-in | Identisch in `CheckHero.tsx` |
| Logo | `/public/img/logo.webp` | In `CheckHero.tsx` eingebunden |
| Scroll-Snap | 6 Sektionen | Nur für Hero (Zone A) + Loading (Zone C) |
| Navigation Dots | 6 Punkte | Nicht vorhanden (mehrstufige Seite) |
| Sprache | Englisch | Deutsch (Zielgruppe DACH) |
| Analytics | GA4 | GA4 + Custom Events pro Funnel-Schritt |

**GA4 Custom Events:**
- `crm_check_started` (bei Submit)
- `crm_check_completed` (bei Ergebnis)
- `crm_check_pdf_requested` (bei PDF-Anfrage)
- `crm_check_consult_clicked` (bei CTA-Klick)

---

## 8. SEO-Strategie

### Empfehlung: Hauptdomain, kein Subdomain

Eine Subdomain (`crm-check.tauprocess.de`) würde SEO-technisch als eigenständige Domain behandelt und bekäme keinen Link-Juice vom Hauptdomain. Da der CRM-Check als Teil des Tau Process House Portfolios positioniert ist (kein unabhängiges Produkt), ist `/zoho-check` auf der Hauptdomain klar die bessere Wahl.

### SEO für die Landing Page selbst

```typescript
// src/app/zoho-check/page.tsx
export const metadata: Metadata = {
  title: 'Kostenloser Zoho CRM Check | Tau Process House',
  description: 'Analysieren Sie Ihre Zoho CRM-Struktur in 60 Sekunden. KI-gestützte Bewertung von Modulen, Lizenz-Fit und Quick Wins — kostenlos.',
}
```

**Strukturierte Daten (JSON-LD):**
- `SoftwareApplication`-Schema für den CRM-Check selbst
- `HowTo`-Schema für die Schritt-Anleitung „Wie kopiere ich die Modulliste"
- `FAQPage`-Schema für häufige Fragen (s. unten)

**FAQ-Sektion unter dem Formular** (sichtbar vor dem Absenden, hilft SEO):
- „Was genau analysiert der CRM-Check?"
- „Werden meine Daten gespeichert?"
- „Für welche Zoho-Lizenzen funktioniert das Tool?"
- „Wie lange dauert die Analyse?"
- „Was passiert nach der Analyse?"

### Blog-Posts auf tauprocess.de

Blog-Posts sind die stärkste Hebel für organische Sichtbarkeit. Empfohlene Themen mit Verlinkung auf `/zoho-check`:

| Post-Titel | Ziel-Keyword | Priorität |
|------------|-------------|-----------|
| „Zoho CRM Module: Welche brauchen Sie wirklich?" | zoho crm module übersicht | Hoch |
| „Zoho One vs. Zoho CRM — welches Lizenzmodell passt zu Ihrem Unternehmen?" | zoho one vergleich | Hoch |
| „5 häufige Fehler bei der Zoho CRM Einführung" | zoho crm einführung fehler | Mittel |
| „Wie Sie Ihr Zoho CRM in 4 Schritten optimieren" | zoho crm optimieren | Mittel |
| „CRM-Audit: Warum regelmäßige Struktur-Reviews entscheidend sind" | crm audit | Niedrig |

**Jeder Post endet mit einem CTA-Block:**
> *„Wie gut ist Ihr Zoho CRM wirklich aufgestellt? Finden Sie es in 60 Sekunden heraus — kostenlos. →* **[Zum CRM-Check](https://tauprocess.de/zoho-check)**"

Blog-Posts benötigen eine neue Route (`/blog` oder `/insights`) auf der Hauptseite — separates Konzept.

### Interner Link-Aufbau

```
/ (Hauptseite)
└── Our Work Sektion → /zoho-check
└── /blog/zoho-crm-module → /zoho-check
└── /blog/zoho-one-vergleich → /zoho-check
└── /imprint → kein Link nötig
```

---

## 9. DSGVO & Datenschutz

- **Analyse-Durchführung:** Erfordert Zustimmung zur Datenverarbeitung (Pflicht-Checkbox im Formular)
- **PDF-Versand:** Separates, freiwilliges Opt-In im PDF-Modal
- **Marketing-Opt-In:** Explizit und nicht vorausgewählt — gemäß DSGVO
- **CRM-Lead-Anlage:** Wird in der Datenschutzerklärung genannt als legitimes Interesse (§ 6 Abs. 1 lit. f DSGVO)
- **Datenhaltung:** Analysedaten werden im Zoho CRM des Unternehmens gespeichert (kein externer Drittanbieter)
- Link zu `/privacy` an zwei Stellen: Formular-Checkbox + PDF-Modal

---

## 10. Rate Limiting

IP-basiertes Rate Limiting in den API-Routen:

```typescript
// Einfach: in-memory Map (resets bei Serverstart — ausreichend für MVP)
// Besser: Vercel KV für persistentes Rate Limiting über Serverinstanzen
const LIMIT = 5 // Anfragen pro IP pro Stunde
```

Alternativ: Vercel Firewall (ab Pro-Plan) für rule-basiertes Rate Limiting ohne Code.

---

## 11. Implementierungs-Reihenfolge (Empfehlung)

| Schritt | Aufgabe | Aufwand |
|---------|---------|---------|
| 1 | TypeScript-Typen (`zoho-check.ts`) | 1h |
| 2 | API `/extract` implementieren + testen | 3h |
| 3 | API `/analyze` implementieren + testen | 2h |
| 4 | `CheckHero.tsx` (Scroll-Snap, Fade-in) | 1h |
| 5 | `StepInput.tsx` Grundformular | 2h |
| 6 | `GenericEmailModal.tsx` (Domain-Check) | 1h |
| 7 | `ModuleGuidePanel.tsx` (Sidebar + Assets) | 2h |
| 8 | `StepLoading.tsx` + State in `page.tsx` | 1h |
| 9 | `StepResults.tsx` (Akkordeons, Score, CTAs) | 3h |
| 10 | `PdfEmailModal.tsx` + API `/send-pdf` | 2h |
| 11 | API `/crm-lead` (Zoho CRM OAuth + Lead) | 3h |
| 12 | DSGVO-Checkboxen, Rate Limiting, Error Handling | 1h |
| 13 | SEO-Metadaten, JSON-LD, FAQ-Sektion, GA4-Events | 2h |
| 14 | Our-Work-Karte im One-Pager verlinken | 0.5h |
| **∑** | **Gesamt-Aufwand (geschätzt)** | **~24h** |

---

## 12. Entscheidungen (final)

| Frage | Entscheidung |
|-------|-------------|
| Ergebnis-Gate | Kein Gate — Analyse sofort sichtbar |
| PDF-Gate | PDF nur per E-Mail (kein direkter Download) |
| E-Mail-Opt-In | Freiwillige Checkbox im PDF-Modal (Double-Opt-In) |
| Lead-Speicherung | Zoho CRM via API — mit Modulliste + Analyse als Notizen |
| Sprache | Deutsch |
| Branding | Klar als Tau Process House Seite |
| URL | `/zoho-check` auf Hauptdomain (kein Subdomain) |
| SEO-Strategie | Landing Page SEO + Blog-Posts auf Hauptdomain |
| Scroll-Verhalten | Hybrid: Snap für Hero + Loading, klassisch für Formular + Ergebnis |
