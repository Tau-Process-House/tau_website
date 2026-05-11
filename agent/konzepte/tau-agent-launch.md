# Website-Iterationen – Tau Zoho Agent Launch

> Konkrete Änderungen am Website-Repo `Freiberufler/Webseite/tau-process-house`.
> Übergeordneter Plan: `launch.md`. Tech-Kontext: `root_AI/projects/tauprocess-website.md`.

---

## Ist-Stand

- **Produkt-Page existiert**: `/[locale]/tau-zoho-agent/page.tsx` mit 9 Komponenten in `src/components/agent/`
- **JSON-Daten**: `src/data/agent.json` (alle Inhalte bilingual)
- **Hauptseite**: 5-Sektionen-One-Pager, kein direkter Link zur Tau-Agent-Page
- **Lead-Mechanik**: existiert bereits für `/zoho-check` (API-Route + Zoho CRM Lead-Anlage) – kann adaptiert werden

---

## Iteration 1 — Launch-MVP (Woche 1-2)

**Ziel:** Pricing-Sektion live, Lead-Forms funktional, Hauptseite-Integration, Compare-Sektion mit echten Daten.

### 1.1 Pricing-Sektion auf `/tau-zoho-agent`

**Neue Komponente:** `src/components/agent/AgentPricing.tsx`
**Neuer Datenblock in:** `src/data/agent.json` unter `pricing`

**Struktur:**
- 3 Karten nebeneinander (Mobile: untereinander)
- Karte „Chat" mit Preis 29€/User/Monat, Features-Liste, CTA „Jetzt anfragen" → Lead-Form (Tier=`chat`)
- Karte „Pro" mit „Coming Soon"-Badge, Features-Liste, CTA „Auf Warteliste" → Lead-Form (Tier=`pro`)
- Karte „Enterprise" mit „Coming Soon"-Badge, Features-Liste, CTA „Beratung anfragen" → Lead-Form (Tier=`enterprise`)
- Optional: Toggle „Monatlich / Jährlich" für später

**JSON-Schema-Vorschlag:**
```json
"pricing": {
  "section": {
    "title": { "de": "Pricing", "en": "Pricing" },
    "subtitle": { "de": "Transparent, fair, DACH.", "en": "Transparent, fair, made in Europe." }
  },
  "tiers": [
    {
      "id": "chat",
      "name": "Chat",
      "price": "29",
      "currency": "€",
      "interval": { "de": "/User/Monat", "en": "/user/month" },
      "vatNote": { "de": "excl. MwSt.", "en": "excl. VAT" },
      "available": true,
      "features": [...],
      "ctaLabel": { "de": "Jetzt anfragen", "en": "Request access" }
    },
    {
      "id": "pro",
      "name": "Pro",
      "price": null,
      "available": false,
      "comingSoon": true,
      "features": [...],
      "ctaLabel": { "de": "Auf Warteliste", "en": "Join waitlist" }
    },
    {
      "id": "enterprise",
      "name": "Enterprise",
      "price": null,
      "available": false,
      "features": [...],
      "ctaLabel": { "de": "Beratung anfragen", "en": "Request consultation" }
    }
  ]
}
```

**Akzeptanzkriterien:**
- 3 Karten responsive
- CTA öffnet Modal/Form mit `tier`-Tag
- Aria-Labels für Accessibility
- Feature-Listen visuell konsistent (Icons aus Lucide o.ä.)

### 1.2 Lead-Form mit Tier-Tag

**Neue API-Route:** `src/app/api/tau-zoho-agent/lead/route.ts`
**Neue Komponente:** `src/components/agent/AgentLeadModal.tsx`

**Felder:**
- E-Mail (required)
- Vorname (required)
- Nachname (required)
- Firma (required)
- Anzahl gewünschter User (number, optional)
- Tier (hidden, aus CTA befüllt)
- Notizen (textarea, optional)
- DSGVO-Checkbox (required)

**Backend-Logik:**
- Validierung
- Zoho CRM Lead anlegen via OAuth (gleicher Flow wie `/zoho-check/crm-lead/`)
- Lead-Source-Feld: `Website - Tau Zoho Agent - <tier>`
- Bestätigungs-Mail via Resend (Template TBD)
- Slack/E-Mail-Notification an Felix

**ENV-Variablen:** Bestehende Zoho-OAuth + Resend reichen.

**Akzeptanzkriterien:**
- Form-Submit erstellt Lead mit korrektem Tier-Tag
- Felix bekommt Notification < 60s
- User sieht Bestätigungs-Screen
- Keine Lead-Verlustpunkte (Server-Errors → Retry oder Lead-Speicherung in Backup)

### 1.3 Compare-Sektion stärken (`AgentCompare.tsx`)

Bestehende Komponente erweitern.

**Inhalt:**
- Side-by-Side-Tabelle Tau vs. Zia mit ✓/✗
- Mind. 6 konkrete Aufgaben:
  1. Lead anlegen aus E-Mail-Body
  2. Workflow für Mahnwesen-Eskalation
  3. Vergleich: 5 Deals der letzten 30 Tage analysieren
  4. „Top 3 inaktive Leads" mit Reaktivierungsvorschlag
  5. Datei-Upload → Lead-Anreicherung über Web-Suche
  6. Multi-System-Sync mit Drittsystem (z.B. Buchhaltung)
- Pro Aufgabe: kurze Beschreibung + 1 Satz „Tau-Lösung" + 1 Satz „Zia-Limitation"
- Optional: Screenshot-Toggle für 2-3 Beispiele
- Disclaimer: „Stand 2026-05, basiert auf Zia-Funktionsumfang von <Datum>"

**Datenfluss:** Komponente liest aus `agent.json` → `compare`. Schema bereits vorhanden, ggf. erweitern.

**Akzeptanzkriterien:**
- Mind. 6 Vergleichszeilen
- Bilingual
- Mobil scrollbar (horizontal)
- Disclaimer sichtbar

### 1.4 DACH-Datenschutz-Block

**Neue Komponente:** `src/components/agent/AgentTrustBlock.tsx`
**Neuer Datenblock in:** `agent.json` unter `trust`

**Inhalt:**
- AI-Safe-Log-Erklärung (anonymisiert, Server in DE)
- DSGVO-Konformität
- Zoho-Premium-Partner-Badge (Digital Zolutions)
- Hosting-Transparenz: „OpenRouter mit AVV als Subprozessor, Server in DE"
- Optional: Trust-Logos (TÜV, etc. – falls verfügbar)

**Position:** Zwischen `Capabilities` und `HowItWorks` oder vor `Pricing`.

### 1.5 Hauptseite-Integration ✅ Umgesetzt

> Detailkonzept: `agent-teaser-section.md`

**Komponente:** `src/components/TauAgentTeaserSection.tsx`
**Datei:** `src/data/agent-teaser.json`

**Inhalt:**
- Fullscreen-Sektion (`section section-black` Pattern)
- Scroll-Snap-konform (100dvh)
- Großer Titel „Tau Zoho Agent"
- 3-4 Bullet-Points (Modelle, MCP-nativ, DSGVO, Zia-besser)
- Bewegtes Demo-GIF/Video (TBD: Werkstudent erstellt)
- Großer CTA-Button → `/[locale]/tau-zoho-agent`
- Optional: kleines Pricing-Snippet „Ab 29€/User/Monat"

**Position in `[locale]/page.tsx`:**
- Zwischen `OurServicesSection` und `KpiSection` (= neue Position 4)
- KpiSection rückt auf 5
- TeamCarousel auf 6
- ContactSection auf 7

**Navigationsdots:** Auto-update durch bestehende Logik (an die 5→6 Anpassung denken).

**Akzeptanzkriterien:**
- Scroll-Snap funktioniert
- Mobile + Desktop responsive
- Bilingual
- CTA hat GA4-Event

### 1.6 Top-Nav (minimal)

**Neue Komponente:** `src/components/TopNav.tsx`
**Inhalt:**
- Fixed top, transparenter Hintergrund mit Backdrop-Blur
- Nur 2 Items:
  - „Tau Zoho Agent" → `/[locale]/tau-zoho-agent` (mit „Neu"-Badge)
  - LanguageToggle (bestehend, integrieren)
- Mobile: nur Logo + Tau-Agent-Link

**Einbindung:** In `[locale]/layout.tsx`.

**Akzeptanzkriterien:**
- Hauptseite-Look bleibt clean
- Auf Tau-Agent-Page nicht doppelt mit AgentNav (dort verstecken oder hidden)

### 1.7 GA4-Custom-Events

**Events einbauen** (in den jeweiligen Komponenten via `gtag('event', ...)` mit Consent-Check):

| Event-Name | Trigger | Properties |
|---|---|---|
| `tau_agent_page_view` | Visit `/tau-zoho-agent` | locale |
| `tau_agent_pricing_view` | Pricing-Sektion in Viewport | locale |
| `tau_agent_tier_clicked` | CTA auf Tier-Karte | tier (chat/pro/enterprise), locale |
| `tau_agent_lead_form_open` | Modal öffnet | tier |
| `tau_agent_lead_form_submit` | Form abgeschickt | tier, success (bool) |
| `tau_agent_compare_interaction` | User scrollt/öffnet Compare-Inhalte | – |
| `mainpage_to_agent_click` | Click auf Teaser-CTA Hauptseite | source (teaser/topnav) |

**Hinweis:** Consent-Mode v2 ist bereits aktiv, Events feuern nur nach Consent.

### 1.8 Iteration 1 – Definition of Done

- [ ] Alle Komponenten gebaut + gestylt (Tailwind, framer-motion-Animationen wo passend)
- [ ] `agent.json` um `pricing`, `trust`, ggf. `teaser` erweitert
- [ ] Lead-Form-API funktioniert + Zoho-Lead wird erstellt
- [ ] Compare-Sektion mit 6 echten Beispielen
- [ ] Hauptseite-Integration live
- [ ] Top-Nav live
- [ ] Bilingual: alle Texte DE + EN
- [ ] GA4-Events feuern (manuell getestet im DebugView)
- [ ] Lighthouse-Score ≥ 90 für `/tau-zoho-agent`
- [ ] `agent/website-architecture.md` aktualisiert
- [ ] Felix-Review + Werkstudent-Review

---

## Iteration 2 — SEO-Tiefe (Woche 2-3)

### 2.1 Vergleichsseite `/tau-zoho-agent/vergleich-zia`

**Neue Route:** `src/app/[locale]/tau-zoho-agent/vergleich-zia/page.tsx`

**Inhalt:**
- H1: „Tau Zoho Agent vs. Zia – Welcher KI-Assistent für Zoho ist besser?"
- Einleitung (200-300 Wörter, KI-Markt-Kontext)
- Große Vergleichstabelle (mehr Zeilen als auf Landing)
- Detail-Sektionen pro Aufgabe mit Screenshots
- FAQ-Schema für „Was ist Zia?", „Welche Alternativen?", etc.
- CTA zur Landing-Page-Pricing-Sektion

**Slug-Strategie:** `vergleich-zia` (DE) bzw. `compare-zia` (EN). Routing über next-intl-Pfade.

**SEO-Setup:**
- Eigenes JSON-LD (Article + ComparativeReview)
- Title/Meta speziell für „Zia Alternative"
- In sitemap.xml mit priority 0.9

### 2.2 Blog-Hub `/tau-zoho-agent/wissen/` (oder `/wissen/`)

**Routing:** `src/app/[locale]/wissen/page.tsx` (Index) + `[slug]/page.tsx`

**MDX oder JSON?** Empfehlung: JSON-Datei pro Artikel in `src/data/wissen/`, Custom-Renderer mit Markdown-Support. Bleibt im Pattern.

**Erste 3 Artikel:**
1. „Zia vs. Tau: Vergleich an 5 echten CRM-Aufgaben"
2. „DSGVO + KI in Zoho: Worauf DACH-Unternehmen achten"
3. „MCP für Zoho – wie offene Agenten funktionieren"

### 2.3 FAQ massiv erweitern

`src/data/faq.json` → mind. 10 zusätzliche Items zu Zoho-AI-Themen.
GEO-Optimierung beachten (siehe `seo-geo-plan.md` Sektion 5b).

### 2.4 OG-Image für `/tau-zoho-agent`

`public/img/og-tau-agent.png` (1200×630) erstellen + im Layout einbinden.

### 2.5 llms.txt erweitern

Strategischer Inhalt aus `seo-geo-plan.md` Sektion 5a.

---

## Iteration 3 — Self-Service (Woche 4-6)

### 3.1 Stripe-Checkout für Chat-Tier

- Stripe-Account einrichten (B2B EU, Reverse Charge)
- Checkout-Page `/[locale]/tau-zoho-agent/checkout` (Hosted oder embedded)
- Webhook für Subscription-Events
- 7-Tage-Trial mit Credit-Limit (z.B. 5€ Credits frei)

### 3.2 Onboarding-Flow

- Nach Checkout: User landet auf Tau-App (separates Repo)
- Zoho-OAuth-Flow für CRM-Anbindung
- Initial-Tutorial (3 Steps)

### 3.3 User-Dashboard (Tau-App, nicht Website)

- Eigenes Subdomain `app.tauprocess.de` oder Pfad
- Org-Übersicht, User-Verwaltung, Token-Verbrauch
- AI-Safe-Log-Viewer

### 3.4 Marketing-Assets aktualisieren

- Hauptseite-Teaser-CTA von „Anfragen" → „Kostenlos testen"
- Pricing-Karten von „Anfragen" → „7 Tage kostenlos starten"
- Vergleichsseite mit Trial-CTA

---

## Komponenten-Inventar (geplante Erweiterungen)

| Pfad | Status | Iteration |
|---|---|---|
| `src/components/agent/AgentPricing.tsx` | Neu | 1 |
| `src/components/agent/AgentLeadModal.tsx` | Neu | 1 |
| `src/components/agent/AgentTrustBlock.tsx` | Neu | 1 |
| `src/components/agent/AgentCompare.tsx` | Existiert, erweitern | 1 |
| `src/components/TauAgentTeaserSection.tsx` | Neu | 1 |
| `src/components/TopNav.tsx` | Neu | 1 |
| `src/app/api/tau-zoho-agent/lead/route.ts` | Neu | 1 |
| `src/app/[locale]/tau-zoho-agent/vergleich-zia/page.tsx` | Neu | 2 |
| `src/app/[locale]/wissen/page.tsx` + `[slug]/page.tsx` | Neu | 2 |
| `src/data/agent.json` | Erweitern | 1 |
| `src/data/wissen/<artikel>.json` | Neu | 2 |

---

## Risiken & offene Fragen

- [ ] **Demo-Video/GIF** – wer erstellt? Werkstudent? Format? Hosting (lokal vs. Vercel-Blob vs. YouTube embed)?
- [ ] **Screenshots Tau vs. Zia** – Felix muss konkrete Aufgaben durchspielen oder Werkstudent dokumentiert
- [ ] **Mobile-Tests** auf der neuen Hauptseite-Sektion-Anzahl (vorher 5, nachher 6) – Scroll-Snap-Verhalten checken
- [ ] **Pricing-Versionierung** – wenn Preise sich ändern, JSON-Update genug oder brauchen wir Stripe-Sync?
- [ ] **Englische Übersetzungen** – wer macht das? Felix, Werkstudent, oder DeepL als Erstwurf?
- [ ] **Konflikt AgentNav vs. neuer TopNav** – auf Tau-Agent-Page nur AgentNav anzeigen, auf Hauptseite nur TopNav
