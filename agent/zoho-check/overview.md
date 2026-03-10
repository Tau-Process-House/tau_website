# Zoho-Check Feature — Übersicht

> `/zoho-check` — Kostenloser CRM-Analyse-Funnel als Lead-Qualifizierung

---

## Was es ist

Self-Service-Tool: Nutzer gibt seine Zoho-CRM-Modulliste ein und erhält sofort eine KI-gestützte Analyse seiner CRM-Struktur. Das Ergebnis wird als PDF per E-Mail gesendet. Im Hintergrund wird automatisch ein Lead in Zoho CRM angelegt.

**Vollständiges UI/UX-Konzept:** → `konzepte/crm-check-landingpage.md`

---

## Dateien

```
src/
├── app/zoho-check/
│   ├── layout.tsx              ← Metadata, Canonical URL
│   └── page.tsx                ← Multi-Step-State: input → extracting → analyzing → results
│
├── app/api/zoho-check/
│   ├── extract/route.ts        ← Website-Scraping + Modul-Parsing (AI + Regex-Fallback)
│   ├── analyze/route.ts        ← KI-Analyse via OpenRouter (Gemini 2.5 Pro)
│   ├── send-pdf/route.ts       ← PDF generieren + E-Mail via Resend
│   └── crm-lead/route.ts       ← Lead in Zoho CRM anlegen (non-blocking)
│
├── components/zoho-check/
│   ├── CheckHero.tsx           ← Scroll-Snap Hero (100dvh, schwarz)
│   ├── StepInput.tsx           ← Formular: E-Mail, Lizenz, Modulliste, DSGVO
│   ├── ModuleGuidePanel.tsx    ← Sidebar-Anleitung: Modulliste kopieren
│   ├── StepLoading.tsx         ← Ladescreen mit Phasen-Fortschritt
│   ├── PdfEmailModal.tsx       ← Double-Opt-In Modal für PDF-Versand
│   └── StepResults.tsx         ← Ergebnisanzeige: Akkordeons + CTAs
│
├── lib/zoho-check/
│   ├── module-classifier.ts    ← Klassifizierung: default / integration / custom
│   ├── prompts.ts              ← KI-Prompts (OpenRouter)
│   └── pdf-generator.tsx       ← @react-pdf/renderer Dokument (server-only)
│
├── types/zoho-check.ts         ← Alle TypeScript-Interfaces
└── data/work.json              ← CRM-Check als Produkt-Karte (für OurWorkSection)
```

---

## API-Ablauf

```
Nutzer Submit
  ↓
POST /api/zoho-check/extract    → Website scrapen + Module klassifizieren
  ↓
POST /api/zoho-check/analyze    → KI-Analyse (AnalysisResult)
  ↓
Ergebnis anzeigen
  ↓ (Nutzer klickt "PDF erhalten")
POST /api/zoho-check/send-pdf   → PDF rendern + E-Mail senden
  ↓ (parallel/background)
POST /api/zoho-check/crm-lead   → Lead in Zoho CRM anlegen
```

---

## Umgebungsvariablen (`.env.local`)

| Variable | Zweck | Pflicht |
|----------|-------|---------|
| `OPENROUTER_API_KEY` | KI-Analyse + Modul-Parsing | Ja |
| `RESEND_API_KEY` | PDF-E-Mail-Versand | Ja |
| `FROM_EMAIL` | Absender-Adresse | Nein (default: crm-check@tauprocess.de) |
| `ZOHO_CRM_CLIENT_ID` | Zoho OAuth | Nein |
| `ZOHO_CRM_CLIENT_SECRET` | Zoho OAuth | Nein |
| `ZOHO_CRM_REFRESH_TOKEN` | Zoho OAuth | Nein |

Vorlage: `.env.local.example` im Projektroot.

---

## Zoho CRM Lead-Anlage

**Route:** `POST /api/zoho-check/crm-lead`

- Legt Lead an mit: Email, Company (aus Website/Domain), Lead Source = "CRM-Check Tool", Score + Empfehlung in Description
- **Notiz 1** "CRM-Check: Modul-Übersicht" — formatierte Modulliste via `buildModuleAnalysisText(extraction.modules)`
- **Notiz 2** "CRM-Check: KI-Analyse" — Fließtext via `formatAnalysisAsText(analysis)` (keine JSON)
- Non-blocking: Fehler werden geloggt, beeinflussen nicht die User Experience

**OAuth:** Zoho EU-Endpoint (`accounts.zoho.eu`), Refresh-Token-Flow. Einmalig manuell einrichten via https://api-console.zoho.eu

---

## Bekannte Einschränkungen

- Modul-Parsing fällt auf Regex zurück wenn OpenRouter nicht verfügbar (weniger präzise)
- Website-Scraping hat 10s Timeout; generische E-Mail-Domains lösen Website-Feld aus
- PDF-Generierung (`pdf-generator.tsx`) darf nur in API-Routes aufgerufen werden, nicht in Client Components
- Ohne API-Keys: Formular und Regex-Fallback funktionieren, aber keine KI-Analyse, kein PDF-Versand
