# Tau Agent „Live-Stellung" + Blog/SEO — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Die Webseite vom „Beta-Warteliste"-Stand auf den realen Live-Stand bringen (Agent ist direkt im Zoho Marketplace installierbar, SSO-Login, 14-Tage-Trial mit 10 Mio. Tokens) **und** eine zweisprachige Blog-Infrastruktur mit drei SEO-Artikeln aufbauen, die auf die Produktseite einzahlen.

**Architecture:** Inhalte liegen zentral in `src/data/*.json` (i18n als `{de,en}`-Objekte). Die Agentenseite rendert aus `src/data/agent.json`. Routing via `next-intl` (`[locale]` = `de`|`en`, default `de`). Der Blog wird als neue App-Router-Route `src/app/[locale]/blog` ergänzt; Artikel als MDX-Dateien pro Sprache, serverseitig kompiliert (`next-mdx-remote/rsc` + `gray-matter`). SEO über `sitemap.ts`, `generateMetadata` und JSON-LD.

**Tech Stack:** Next.js 15 (App Router, RSC), TypeScript, next-intl, MDX (`next-mdx-remote`, `gray-matter`), Vercel.

---

## Wichtige Fakten / Single Source of Truth

Diese Werte werden im Plan mehrfach referenziert — bei Änderung hier zentral anpassen:

- **Install-Link (Marketplace, privates Plugin):**
  `https://crm.zoho.eu/market/installPrivatePlugin.do?portalName=felixrim98&nameSpace=tauzohoagent&versionIndex=4498495000000318002`
- **Trial:** 14 Tage kostenlos, **10 Mio. Tokens** inklusive, keine Kreditkarte.
- **Danach Chat-Plan:** **29 €/User·Monat**, **~24 Mio. Tokens/Monat inklusive** (Default-Modell Gemini Flash 3 Preview, 0,5 €/Mio.). **Die 12 € Credits werden NICHT genannt** — nur die Tokenzahl.
- **Modelle inklusive** (kein eigener OpenAI/Claude-Key nötig). Claude / ChatGPT / Gemini.
- **Install-Flow:** Admin installiert das Plugin aus dem Marketplace → Nutzer melden sich per **Single Sign-On direkt im CRM** an → Trial startet.
- **Hinweis:** Es ist ein *privates* Plugin (`installPrivatePlugin.do`) — nur per Direktlink installierbar, nicht über die öffentliche Marketplace-Suche. CTA-Texte müssen „von deinem Zoho-Admin installieren lassen" andeuten.
- Site-URL: `https://tauprocess.de`. Kontakt: `hello@tauprocess.de`.

---

# TEIL A — Website auf Live-Stand bringen

## Task 1: Install-Link zentral hinterlegen + Hero/Nav-CTAs umstellen

**Files:**
- Modify: `src/data/agent.json` (Felder `installUrl`, `nav`, `hero`)

- [ ] **Step 1: Install-URL als Top-Level-Feld ergänzen**

In `src/data/agent.json` direkt nach dem `meta`-Block ein neues Feld einfügen:

```json
  "installUrl": "https://crm.zoho.eu/market/installPrivatePlugin.do?portalName=felixrim98&nameSpace=tauzohoagent&versionIndex=4498495000000318002",
```

- [ ] **Step 2: Nav-CTA auf Install umstellen**

`nav.ctaLabel` und `nav.ctaHref` ersetzen:

```json
    "ctaLabel": { "de": "Kostenlos installieren →", "en": "Install free →" },
    "ctaHref": "https://crm.zoho.eu/market/installPrivatePlugin.do?portalName=felixrim98&nameSpace=tauzohoagent&versionIndex=4498495000000318002",
```

- [ ] **Step 3: Hero-Pill, CTAs und Meta umstellen**

Im `hero`-Block ersetzen:

```json
    "pill": {
      "text": { "de": "Jetzt live im Zoho Marketplace", "en": "Now live on the Zoho Marketplace" },
      "tag": "Beta"
    },
```

```json
    "primaryCta": { "label": { "de": "14 Tage kostenlos testen →", "en": "Start a 14-day free trial →" }, "href": "https://crm.zoho.eu/market/installPrivatePlugin.do?portalName=felixrim98&nameSpace=tauzohoagent&versionIndex=4498495000000318002" },
    "secondaryCta": { "label": { "de": "90-Sek. Demo ansehen", "en": "Watch a 90-sec demo" }, "href": "#solution" },
    "meta": [
      { "de": "10 Mio. Tokens inklusive", "en": "10M tokens included" },
      { "de": "Keine Kreditkarte nötig", "en": "No credit card required" },
      { "de": "Anmeldung per SSO im CRM", "en": "Single sign-on inside your CRM" }
    ],
```

> Hinweis: `hero.primaryCta.href` ist eine externe URL. `AgentHero.tsx` rendert ein normales `<a href>` — funktioniert ohne Codeänderung. Optional in einem späteren Schritt `target="_blank" rel="noopener"` ergänzen (siehe Task 3, Step 4).

- [ ] **Step 4: Build prüfen**

Run: `npm run build`
Expected: Build erfolgreich, keine TS-/JSON-Fehler.

- [ ] **Step 5: Commit**

```bash
git add src/data/agent.json
git commit -m "Tau Agent: Install-Link hinterlegt, Hero/Nav-CTAs auf 14-Tage-Trial umgestellt"
```

---

## Task 2: „Beta/Coming-Soon/Q2 2026"-Framing entfernen + Trial-/Token-Texte angleichen

**Files:**
- Modify: `src/data/agent.json` (`pricing`, `finalCta`)

- [ ] **Step 1: Pricing-Subtitle + Chat-Tier-Features auf Token-Botschaft umstellen**

`pricing.subtitle` ersetzen:

```json
    "subtitle": {
      "de": "Starte mit 14 Tagen kostenlos und 10 Mio. Tokens. Danach 29 €/User pro Monat — Pro und Enterprise folgen.",
      "en": "Start free for 14 days with 10M tokens. Then €29/user per month — Pro and Enterprise are on the way."
    },
```

Im Chat-Tier (`pricing.tiers[0]`) die Tagline beibehalten, aber das Feature mit dem „12 € Token-Guthaben" ersetzen durch die **Tokenzahl** (12 € → nicht nennen):

```json
        "features": [
          { "de": "Chat-Interface mit allen führenden Modellen (Claude, OpenAI, Gemini)", "en": "Chat interface with all leading models (Claude, OpenAI, Gemini)" },
          { "de": "Modelle inklusive — kein eigener API-Key nötig", "en": "Models included — no API key of your own required" },
          { "de": "Zoho-Anbindung via proprietärem Tau-Connector", "en": "Zoho integration via the proprietary Tau connector" },
          { "de": "~24 Mio. Tokens pro User & Monat inklusive", "en": "~24M tokens per user & month included" },
          { "de": "AI-Safe-Log, anonymisiert, Hosting in Deutschland", "en": "AI-safe log, anonymized, hosted in Germany" },
          { "de": "E-Mail-Support mit 48h-SLA", "en": "Email support with 48h SLA" }
        ]
```

- [ ] **Step 2: Pricing-CTA-Label auf Install umstellen**

```json
    "ctaAvailableLabel": { "de": "Jetzt installieren →", "en": "Install now →" },
    "ctaHref": "https://crm.zoho.eu/market/installPrivatePlugin.do?portalName=felixrim98&nameSpace=tauzohoagent&versionIndex=4498495000000318002",
```

> `AgentPricing.tsx` rendert `ctaHref` als `<a href>` (Zeile ~215) — externe URL funktioniert ohne Codeänderung.

- [ ] **Step 3: finalCta „Q2 2026 / Früher Zugang" entfernen**

```json
  "finalCta": {
    "label": { "de": "Jetzt starten", "en": "Get started" },
    "titleLine1": { "de": "Hör auf, durch dein CRM zu klicken.", "en": "Stop clicking through your CRM." },
    "titleLine2Pre": { "de": "Lass es", "en": "Start letting it" },
    "titleLine2Gold": { "de": "sich selbst steuern.", "en": "run itself." },
    "subtitle": { "de": "In 5 Minuten installiert. 14 Tage kostenlos, 10 Mio. Tokens inklusive, keine Kreditkarte.", "en": "Installed in 5 minutes. 14 days free, 10M tokens included, no credit card." },
    "footnote": { "de": "Entwickelt von Zoho-Experten der Tau Process House GmbH", "en": "Built by Zoho experts at Tau Process House" },
    "formPlaceholder": "you@company.com",
    "formButton": { "de": "Anmelden", "en": "Join" }
  },
```

- [ ] **Step 4: Build prüfen**

Run: `npm run build`
Expected: Build erfolgreich.

- [ ] **Step 5: Commit**

```bash
git add src/data/agent.json
git commit -m "Tau Agent: Beta-Warteliste-Framing entfernt, Pricing auf Token-Botschaft (24 Mio./Monat) umgestellt"
```

---

## Task 3: CTA-Sektion — Warteliste-Formular durch Install-CTA ersetzen (Formular sekundär)

**Files:**
- Modify: `src/components/agent/AgentCta.tsx`
- Modify: `src/data/agent.json` (`finalCta` — neue Felder für Install-Button)

Die `AgentCta`-Sektion ist aktuell ein eingebettetes Zoho-Warteliste-iframe. Neuer Aufbau: großer **Install-Button** + 3-Schritt-Erklärung (Admin installiert → SSO-Login → Trial). Das Formular bleibt als sekundärer „Fragen? Demo buchen"-Block erhalten, aber optisch nachgeordnet.

- [ ] **Step 1: Neue CTA-Felder in agent.json ergänzen**

Im `finalCta`-Block (zusätzlich zu den bestehenden Feldern) ergänzen:

```json
    "installLabel": { "de": "Im Zoho Marketplace installieren →", "en": "Install on the Zoho Marketplace →" },
    "installHint": { "de": "Installation durch einen Zoho-Admin. Danach melden sich alle Nutzer per SSO direkt im CRM an.", "en": "Installed by a Zoho admin. After that, every user signs in via SSO directly inside the CRM." },
    "steps": [
      { "de": "Admin installiert das Plugin aus dem Marketplace", "en": "Admin installs the plugin from the Marketplace" },
      { "de": "Nutzer melden sich per Single Sign-On im CRM an", "en": "Users sign in via single sign-on inside the CRM" },
      { "de": "14 Tage kostenlos testen — 10 Mio. Tokens inklusive", "en": "Try it free for 14 days — 10M tokens included" }
    ],
    "secondaryLabel": { "de": "Lieber zuerst Fragen klären? Demo anfragen.", "en": "Prefer to ask questions first? Request a demo." }
```

- [ ] **Step 2: `AgentCta.tsx` — Props erweitern**

Interface ersetzen:

```tsx
interface AgentCtaProps {
  sectionLabel: string;
  titleLine1: string;
  titleLine2Pre: string;
  titleLine2Gold: string;
  subtitle: string;
  footnote: string;
  installUrl: string;
  installLabel: string;
  installHint: string;
  steps: string[];
  secondaryLabel: string;
}
```

- [ ] **Step 3: `AgentCta.tsx` — Render-Body ersetzen**

Den `return (...)`-Block ersetzen durch (Install-Button primär, Formular sekundär unter einem Toggle/Detail):

```tsx
  return (
    <section id="cta" style={{
      backgroundColor: '#000', color: '#fff', padding: '6rem 0',
      flex: '1 1 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center',
      borderTop: '1px solid rgba(255,255,255,0.07)', fontFamily: FONT, textAlign: 'center',
    }}>
      <div style={{ maxWidth: 640, margin: 'auto', padding: '0 2rem', width: '100%' }}>
        <div style={{ color: '#C8962E', fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>
          {sectionLabel}
        </div>

        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.75rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: 16 }}>
          {titleLine1}<br />
          {titleLine2Pre} <span style={{ color: '#C8962E' }}>{titleLine2Gold}</span>
        </h2>

        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, marginBottom: 28 }}>
          {subtitle}
        </p>

        {/* 3-Schritt-Ablauf */}
        <ol style={{
          listStyle: 'none', padding: 0, margin: '0 auto 32px', maxWidth: 460,
          display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'left',
        }}>
          {steps.map((s, i) => (
            <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>
              <span style={{
                flexShrink: 0, width: 22, height: 22, borderRadius: 999,
                backgroundColor: 'rgba(200,150,46,0.15)', color: '#C8962E',
                fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{i + 1}</span>
              <span>{s}</span>
            </li>
          ))}
        </ol>

        {/* Primärer Install-CTA */}
        <a
          href={installUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block', backgroundColor: '#C8962E', color: '#000',
            fontWeight: 700, fontSize: 16, padding: '0.9rem 2rem',
            borderRadius: 8, textDecoration: 'none',
          }}
        >
          {installLabel}
        </a>

        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 16, maxWidth: 460, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.5 }}>
          {installHint}
        </p>

        {/* Sekundär: Demo-Formular ausklappbar */}
        <details style={{ marginTop: 32 }}>
          <summary style={{ cursor: 'pointer', fontSize: 13, color: 'rgba(255,255,255,0.55)', listStyle: 'none' }}>
            {secondaryLabel}
          </summary>
          <div id={ZOHO_DIV_ID} style={{ width: '100%', marginTop: 20 }} />
        </details>

        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 24 }}>
          {footnote}
        </p>
      </div>
    </section>
  );
```

> Das bestehende `useEffect` (iframe-Injection in `ZOHO_DIV_ID`) **bleibt unverändert** — es füllt jetzt den ausklappbaren `<details>`-Block. Da das `div` erst nach Öffnen sichtbar wird, das iframe aber beim Mount injiziert wird, funktioniert es weiterhin (nur initial verborgen).

- [ ] **Step 4: Aufrufer in `page.tsx` anpassen — neue Props durchreichen**

In `src/app/[locale]/tau-zoho-agent/page.tsx` den `<AgentCta .../>`-Aufruf (ca. Zeile 150) ersetzen:

```tsx
          <AgentCta
            sectionLabel={loc(d.finalCta.label)}
            titleLine1={loc(d.finalCta.titleLine1)}
            titleLine2Pre={loc(d.finalCta.titleLine2Pre)}
            titleLine2Gold={loc(d.finalCta.titleLine2Gold)}
            subtitle={loc(d.finalCta.subtitle)}
            footnote={loc(d.finalCta.footnote)}
            installUrl={d.installUrl}
            installLabel={loc(d.finalCta.installLabel)}
            installHint={loc(d.finalCta.installHint)}
            steps={d.finalCta.steps.map(loc)}
            secondaryLabel={loc(d.finalCta.secondaryLabel)}
          />
```

- [ ] **Step 5: Build + visuelle Prüfung**

Run: `npm run build` → Expected: erfolgreich.
Run: `npm run dev` → `/de/tau-zoho-agent` öffnen, zur CTA-Sektion scrollen. Install-Button sichtbar, Klick öffnet Marketplace-Link im neuen Tab. „Demo anfragen" klappt das Formular aus.

- [ ] **Step 6: Commit**

```bash
git add src/components/agent/AgentCta.tsx src/data/agent.json "src/app/[locale]/tau-zoho-agent/page.tsx"
git commit -m "Tau Agent: CTA-Sektion auf Install-Button + 3-Schritt-Flow umgebaut, Demo-Formular sekundär"
```

---

## Task 4: FAQ um Installations-/Trial-/Modell-Fragen erweitern

**Files:**
- Modify: `src/data/agent.json` (`faq.items`)

- [ ] **Step 1: Drei neue FAQ-Items an den Anfang von `faq.items` setzen**

Vor das bestehende erste Item (`"open": true`) drei neue Items einfügen; beim ersten neuen `"open": true`, beim bisherigen ersten Item `open` auf `false` ändern:

```json
      {
        "q": { "de": "Wie installiere ich Tau Agent?", "en": "How do I install Tau Agent?" },
        "a": { "de": "Ein Zoho-Admin installiert das Plugin mit einem Klick aus dem Zoho Marketplace. Danach melden sich alle Nutzer per Single Sign-On direkt im CRM an — keine separate Anmeldung, kein eigener API-Key. Die 14-tägige Testphase startet sofort.", "en": "A Zoho admin installs the plugin from the Zoho Marketplace with one click. After that, all users sign in via single sign-on directly inside the CRM — no separate login, no API key of your own. The 14-day trial starts immediately." },
        "open": true
      },
      {
        "q": { "de": "Was kostet die Testphase?", "en": "How much is the trial?" },
        "a": { "de": "Die Testphase ist 14 Tage kostenlos und enthält 10 Mio. Tokens — ohne Kreditkarte. Danach kostet der Chat-Plan 29 €/User pro Monat mit rund 24 Mio. inkludierten Tokens monatlich.", "en": "The trial is free for 14 days and includes 10M tokens — no credit card. After that the Chat plan is €29/user per month with roughly 24M tokens included each month." },
        "open": false
      },
      {
        "q": { "de": "Brauche ich einen eigenen OpenAI- oder Claude-Key?", "en": "Do I need my own OpenAI or Claude key?" },
        "a": { "de": "Nein. Der Zugang zu allen führenden Modellen (Claude, ChatGPT, Gemini) ist im Plan inklusive — abgerechnet über dein inkludiertes Token-Kontingent. Du musst nichts separat einrichten.", "en": "No. Access to all leading models (Claude, ChatGPT, Gemini) is included in the plan — billed against your included token allowance. There is nothing to set up separately." },
        "open": false
      },
```

- [ ] **Step 2: Build prüfen**

Run: `npm run build` → Expected: erfolgreich, valides JSON.

- [ ] **Step 3: Commit**

```bash
git add src/data/agent.json
git commit -m "Tau Agent: FAQ um Installation, Testphase und inkludierte Modelle erweitert"
```

---

## Task 5: SEO-Technik der Agentenseite — Sitemap-Fix, JSON-LD, OG-Bild

**Files:**
- Modify: `src/app/sitemap.ts`
- Modify: `src/app/[locale]/tau-zoho-agent/layout.tsx`
- (Optional/Asset) Create: `public/og/tau-zoho-agent.png` (1200×630)

- [ ] **Step 1: Agentenseite in die Sitemap aufnehmen**

In `src/app/sitemap.ts` innerhalb des `return [...]` (nach den Home-Pages) ergänzen:

```ts
    // Tau Zoho Agent (Produktseite — hohe Priorität)
    ...localizedEntry('/tau-zoho-agent', 'weekly', 0.9, now),
```

- [ ] **Step 2: JSON-LD (SoftwareApplication + FAQPage) im Agent-Layout ergänzen**

In `src/app/[locale]/tau-zoho-agent/layout.tsx` den Default-Export ersetzen, sodass strukturierte Daten gerendert werden. `generateMetadata` bleibt; zusätzlich `images` im openGraph ergänzen:

```tsx
import type { Metadata } from 'next';
import agentData from '@/data/agent.json';

const siteUrl = 'https://tauprocess.de';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = (f: { de: string; en: string }) => f[locale as 'de' | 'en'] ?? f.en;

  return {
    title: loc(agentData.meta.title),
    description: loc(agentData.meta.description),
    alternates: {
      canonical: `${siteUrl}/${locale}/tau-zoho-agent`,
      languages: {
        de: `${siteUrl}/de/tau-zoho-agent`,
        en: `${siteUrl}/en/tau-zoho-agent`,
      },
    },
    openGraph: {
      title: loc(agentData.meta.title),
      description: loc(agentData.meta.description),
      url: `${siteUrl}/${locale}/tau-zoho-agent`,
      images: [`${siteUrl}/og/tau-zoho-agent.png`],
      type: 'website',
    },
  };
}

export default async function AgentLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = (f: { de: string; en: string }) => f[locale as 'de' | 'en'] ?? f.en;

  const softwareLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Tau Zoho Agent',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web (Zoho CRM)',
    description: loc(agentData.meta.description),
    url: `${siteUrl}/${locale}/tau-zoho-agent`,
    offers: {
      '@type': 'Offer',
      price: '29',
      priceCurrency: 'EUR',
      description: loc({
        de: '14 Tage kostenlos testen, 10 Mio. Tokens inklusive. Danach 29 €/User pro Monat.',
        en: '14-day free trial, 10M tokens included. Then €29/user per month.',
      }),
    },
    publisher: {
      '@type': 'Organization',
      name: 'Tau Process House GmbH',
      url: siteUrl,
    },
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: agentData.faq.items.map((item) => ({
      '@type': 'Question',
      name: loc(item.q),
      acceptedAnswer: { '@type': 'Answer', text: loc(item.a) },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      {children}
    </>
  );
}
```

- [ ] **Step 3: OG-Bild ablegen (optional, sonst Schritt überspringen)**

Lege `public/og/tau-zoho-agent.png` (1200×630, schwarzer Hintergrund, Wortmarke „TAU ZOHO AGENT", Gold-Akzent) ab. Falls noch kein Asset existiert: in der `images`-Zeile auf ein vorhandenes Logo verweisen oder `images` vorerst weglassen.

- [ ] **Step 4: Build + Validierung**

Run: `npm run build` → Expected: erfolgreich.
Manuell: gerenderte Seite ansehen, im HTML-Quelltext zwei `application/ld+json`-Blöcke prüfen. Optional via Google Rich Results Test validieren.

- [ ] **Step 5: Commit**

```bash
git add src/app/sitemap.ts "src/app/[locale]/tau-zoho-agent/layout.tsx"
git commit -m "SEO: Agentenseite in Sitemap aufgenommen, SoftwareApplication- und FAQPage-JSON-LD + OG-Bild ergänzt"
```

---

## Task 6: Startseiten-Teaser an Live-Stand angleichen

**Files:**
- Modify: `src/data/agent-teaser.json`

- [ ] **Step 1: Teaser-Pill und CTA auf Live/Install umstellen**

```json
  "betaPill": { "de": "Jetzt live", "en": "Now live" },
```

CTA-Block beibehalten (führt auf die Produktseite — korrekt), optional Bullet 1 schärfen:

```json
  "bullets": [
    { "de": "Direkt im CRM — Claude, ChatGPT & Gemini inklusive", "en": "Right inside your CRM — Claude, ChatGPT & Gemini included" },
    { "de": "Lead-Scoring & Enrichment in Echtzeit", "en": "Real-time lead scoring & enrichment" },
    { "de": "Natürlichsprachliche CRM-Befehle", "en": "Natural-language CRM commands" }
  ],
```

- [ ] **Step 2: Build + Commit**

Run: `npm run build` → Expected: erfolgreich.

```bash
git add src/data/agent-teaser.json
git commit -m "Startseite: Tau-Agent-Teaser auf Live-Stand (inkl. Modelle direkt im CRM)"
```

---

# TEIL B — Blog-Infrastruktur + drei SEO-Artikel

## Task 7: Blog-Abhängigkeiten + Post-Loader anlegen

**Files:**
- Modify: `package.json` (Dependencies)
- Create: `src/content/blog/` (Verzeichnis für MDX)
- Create: `src/lib/blog.ts` (Loader)
- Create: `src/types/blog.ts`

- [ ] **Step 1: Dependencies installieren**

Run:
```bash
npm install next-mdx-remote gray-matter
```
Expected: Beide Pakete in `package.json` unter `dependencies`. (Hinweis Vercel/React 19: `.npmrc` mit `legacy-peer-deps=true` existiert bereits laut Git-History — keine zusätzliche Peer-Dep-Konfiguration nötig.)

- [ ] **Step 2: Typen definieren**

Create `src/types/blog.ts`:

```ts
export interface BlogFrontmatter {
  title: string;
  description: string;
  date: string;        // ISO, z.B. "2026-06-05"
  slug: string;
  locale: 'de' | 'en';
  keywords: string[];
  ogImage?: string;
  author?: string;
}

export interface BlogPostMeta extends BlogFrontmatter {}

export interface BlogPost extends BlogFrontmatter {
  content: string;     // roher MDX-Body
}
```

- [ ] **Step 3: Loader schreiben**

Create `src/lib/blog.ts`:

```ts
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { BlogPost, BlogPostMeta } from '@/types/blog';

const BLOG_DIR = path.join(process.cwd(), 'src', 'content', 'blog');

// Dateikonvention: <slug>.<locale>.mdx  (z.B. tau-agent-live.de.mdx)
function parseFilename(file: string): { slug: string; locale: 'de' | 'en' } | null {
  const m = file.match(/^(.+)\.(de|en)\.mdx$/);
  if (!m) return null;
  return { slug: m[1], locale: m[2] as 'de' | 'en' };
}

export function getAllPostsMeta(locale: 'de' | 'en'): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR)
    .map((file) => ({ file, parsed: parseFilename(file) }))
    .filter((x) => x.parsed?.locale === locale)
    .map(({ file }) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8');
      const { data } = matter(raw);
      return data as BlogPostMeta;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string, locale: 'de' | 'en'): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.${locale}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  return { ...(data as BlogPost), content };
}

export function getAllSlugs(): { slug: string; locale: 'de' | 'en' }[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR)
    .map(parseFilename)
    .filter((x): x is { slug: string; locale: 'de' | 'en' } => x !== null);
}
```

- [ ] **Step 4: Verzeichnis sicherstellen + Build**

Lege `src/content/blog/.gitkeep` an, damit das Verzeichnis existiert.
Run: `npm run build` → Expected: erfolgreich (noch keine Posts, leere Liste).

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json src/lib/blog.ts src/types/blog.ts src/content/blog/.gitkeep
git commit -m "Blog: MDX-Abhängigkeiten + Post-Loader (gray-matter, next-mdx-remote)"
```

---

## Task 8: Blog-Übersichtsseite

**Files:**
- Create: `src/app/[locale]/blog/page.tsx`

- [ ] **Step 1: Übersichtsseite schreiben**

Create `src/app/[locale]/blog/page.tsx`:

```tsx
import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllPostsMeta } from '@/lib/blog';

const siteUrl = 'https://tauprocess.de';

export async function generateMetadata({
  params,
}: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isDe = locale === 'de';
  return {
    title: isDe ? 'Blog — Tau Process House' : 'Blog — Tau Process House',
    description: isDe
      ? 'Artikel zu KI im Zoho CRM, dem Tau Agent und dem Zoho MCP Server.'
      : 'Articles on AI inside Zoho CRM, the Tau Agent and the Zoho MCP server.',
    alternates: {
      canonical: `${siteUrl}/${locale}/blog`,
      languages: { de: `${siteUrl}/de/blog`, en: `${siteUrl}/en/blog` },
    },
  };
}

export default async function BlogIndex({
  params,
}: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = (locale === 'de' ? 'de' : 'en') as 'de' | 'en';
  const posts = getAllPostsMeta(loc);

  return (
    <main style={{ backgroundColor: '#000', color: '#fff', minHeight: '100dvh', padding: '8rem 2rem 4rem', fontFamily: 'Arial, Helvetica, sans-serif' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: 32 }}>Blog</h1>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 28 }}>
          {posts.map((p) => (
            <li key={p.slug} style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: 24 }}>
              <Link href={`/${loc}/blog/${p.slug}`} style={{ color: '#fff', textDecoration: 'none' }}>
                <div style={{ fontSize: 12, color: '#C8962E', marginBottom: 8 }}>{p.date}</div>
                <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>{p.title}</h2>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15, lineHeight: 1.6 }}>{p.description}</p>
              </Link>
            </li>
          ))}
          {posts.length === 0 && (
            <li style={{ color: 'rgba(255,255,255,0.5)' }}>
              {loc === 'de' ? 'Noch keine Artikel.' : 'No articles yet.'}
            </li>
          )}
        </ul>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Build prüfen**

Run: `npm run build` → Expected: erfolgreich, `/de/blog` + `/en/blog` werden generiert.

- [ ] **Step 3: Commit**

```bash
git add "src/app/[locale]/blog/page.tsx"
git commit -m "Blog: Übersichtsseite (/[locale]/blog)"
```

---

## Task 9: Blog-Detailseite mit MDX-Rendering + JSON-LD

**Files:**
- Create: `src/app/[locale]/blog/[slug]/page.tsx`

- [ ] **Step 1: Detailseite schreiben**

Create `src/app/[locale]/blog/[slug]/page.tsx`:

```tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPost, getAllSlugs } from '@/lib/blog';

const siteUrl = 'https://tauprocess.de';

export function generateStaticParams() {
  return getAllSlugs().map(({ slug, locale }) => ({ slug, locale }));
}

export async function generateMetadata({
  params,
}: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const loc = (locale === 'de' ? 'de' : 'en') as 'de' | 'en';
  const post = getPost(slug, loc);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: `${siteUrl}/${loc}/blog/${slug}`,
      languages: {
        de: `${siteUrl}/de/blog/${slug}`,
        en: `${siteUrl}/en/blog/${slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${siteUrl}/${loc}/blog/${slug}`,
      type: 'article',
      images: post.ogImage ? [post.ogImage] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const loc = (locale === 'de' ? 'de' : 'en') as 'de' | 'en';
  const post = getPost(slug, loc);
  if (!post) notFound();

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    inLanguage: loc,
    author: { '@type': 'Organization', name: post.author ?? 'Tau Process House GmbH' },
    publisher: { '@type': 'Organization', name: 'Tau Process House GmbH', url: siteUrl },
    mainEntityOfPage: `${siteUrl}/${loc}/blog/${slug}`,
  };

  return (
    <main style={{ backgroundColor: '#000', color: '#fff', minHeight: '100dvh', padding: '8rem 2rem 4rem', fontFamily: 'Arial, Helvetica, sans-serif' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <article className="blog-prose" style={{ maxWidth: 720, margin: '0 auto' }}>
        <Link href={`/${loc}/blog`} style={{ color: '#C8962E', fontSize: 13, textDecoration: 'none' }}>
          {loc === 'de' ? '← Zurück zum Blog' : '← Back to blog'}
        </Link>
        <div style={{ fontSize: 12, color: '#C8962E', margin: '24px 0 8px' }}>{post.date}</div>
        <h1 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.75rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: 24 }}>{post.title}</h1>
        <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: 17, lineHeight: 1.75 }}>
          <MDXRemote source={post.content} />
        </div>
        {/* Produkt-CTA am Artikelende */}
        <div style={{ marginTop: 48, padding: 24, border: '1px solid rgba(200,150,46,0.3)', borderRadius: 12, backgroundColor: 'rgba(200,150,46,0.05)' }}>
          <p style={{ fontWeight: 700, marginBottom: 12 }}>
            {loc === 'de' ? 'Tau Agent direkt in deinem Zoho CRM testen' : 'Try Tau Agent inside your Zoho CRM'}
          </p>
          <Link href={`/${loc}/tau-zoho-agent`} style={{ color: '#C8962E', textDecoration: 'none', fontWeight: 700 }}>
            {loc === 'de' ? 'Zur Produktseite →' : 'Go to the product page →'}
          </Link>
        </div>
      </article>
    </main>
  );
}
```

- [ ] **Step 2: Minimales Prosa-Styling ergänzen (optional, globale CSS)**

Falls Überschriften/Listen im MDX zu eng wirken, in `src/app/[locale]/layout.tsx` oder globaler CSS `.blog-prose h2 { ... }` etc. ergänzen. (Kann nach Task 11 visuell entschieden werden.)

- [ ] **Step 3: Build prüfen (noch ohne Posts → Route existiert, generiert 0 Seiten)**

Run: `npm run build` → Expected: erfolgreich.

- [ ] **Step 4: Commit**

```bash
git add "src/app/[locale]/blog/[slug]/page.tsx"
git commit -m "Blog: Detailseite mit MDX-Rendering, BlogPosting-JSON-LD und Produkt-CTA"
```

---

## Task 10: Blog in Sitemap + Navigation aufnehmen

**Files:**
- Modify: `src/app/sitemap.ts`
- Modify: `src/data/agent.json` (`footer.links`) und/oder globale Nav

- [ ] **Step 1: Blog-Index + dynamische Post-URLs in Sitemap**

In `src/app/sitemap.ts` oben importieren und im `return` ergänzen:

```ts
import { getAllPostsMeta } from '@/lib/blog'
```

```ts
    // Blog-Übersicht
    ...localizedEntry('/blog', 'weekly', 0.7, now),
    // Blog-Artikel (pro Sprache)
    ...(['de', 'en'] as const).flatMap((l) =>
      getAllPostsMeta(l).map((p) => ({
        url: `${base}/${l}/blog/${p.slug}`,
        lastModified: new Date(p.date),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
        alternates: {
          languages: {
            de: `${base}/de/blog/${p.slug}`,
            en: `${base}/en/blog/${p.slug}`,
          },
        },
      }))
    ),
```

- [ ] **Step 2: Blog-Link in den Agenten-Footer aufnehmen**

In `src/data/agent.json` → `footer.links` einen Eintrag ergänzen:

```json
      { "label": { "de": "Blog", "en": "Blog" }, "href": "/blog" },
```

- [ ] **Step 3: Build prüfen**

Run: `npm run build` → Expected: erfolgreich; `sitemap.xml` enthält Blog-Einträge nach Task 11–13.

- [ ] **Step 4: Commit**

```bash
git add src/app/sitemap.ts src/data/agent.json
git commit -m "SEO: Blog in Sitemap und Footer-Navigation aufgenommen"
```

---

## Task 11: Artikel 1 — „Tau Agent ist live" (Launch/Announcement)

**Files:**
- Create: `src/content/blog/tau-agent-live.de.mdx`
- Create: `src/content/blog/tau-agent-live.en.mdx`

**Brief / SEO:**
- Slug: `tau-agent-live`
- Ziel-Keywords (DE): „Zoho CRM KI-Agent", „KI im Zoho CRM", „Zoho CRM Automatisierung"
- Ziel-Keywords (EN): „Zoho CRM AI agent", „AI inside Zoho CRM"
- Suchintention: Awareness/Announcement. Primär für LinkedIn/Newsletter, sekundär Brand-Suche.
- Pflicht-CTA: Install-Link + Link zur Produktseite.

- [ ] **Step 1: DE-Artikel schreiben** — `tau-agent-live.de.mdx`

Frontmatter (exakt):

```mdx
---
title: "Tau Agent ist live: Dein Zoho CRM auf Autopilot"
description: "Der Tau Agent ist ab sofort im Zoho Marketplace installierbar. KI-Modelle wie Claude, ChatGPT und Gemini arbeiten direkt in deinem CRM — 14 Tage kostenlos."
date: "2026-06-05"
slug: "tau-agent-live"
locale: "de"
keywords: ["Zoho CRM KI-Agent", "KI im Zoho CRM", "Zoho CRM Automatisierung", "Tau Agent"]
author: "Tau Process House GmbH"
---
```

Inhalt (H2-Struktur, vollständig auszuformulieren beim Schreiben — ~700–900 Wörter):
1. **Lead-Absatz:** Was ist neu — Tau Agent ist live und mit einem Klick installierbar. Direkt der Nutzen: KI, die *im* CRM arbeitet, statt daneben.
2. `## Was der Tau Agent macht` — Lead-Recherche/Enrichment, Deal-Pipeline, Reporting, natürlichsprachliche Befehle (aus `agent.json` capabilities als Quelle).
3. `## So sieht das in der Praxis aus` — das Lead-Research-Szenario aus `agent.json` (Thomas Müller / Solarenergie GmbH) als konkretes Beispiel nacherzählen.
4. `## Installation in unter 5 Minuten` — Admin installiert aus Marketplace → SSO → Trial. 10 Mio. Tokens, keine Karte.
5. `## Preis` — 14 Tage kostenlos, danach 29 €/User·Monat mit ~24 Mio. Tokens/Monat. (12 € NICHT nennen.)
6. **Abschluss-CTA:** „[Jetzt installieren](INSTALL_URL)" + Link zur Produktseite `/de/tau-zoho-agent`.

INSTALL_URL = der Marketplace-Link aus „Wichtige Fakten".

- [ ] **Step 2: EN-Artikel schreiben** — `tau-agent-live.en.mdx`

Gleiche Struktur, Frontmatter `locale: "en"`, übersetzte Keywords. Inhalt als eigenständige englische Fassung (keine reine MT).

- [ ] **Step 3: Build + visuelle Prüfung**

Run: `npm run build` → Expected: `/de/blog/tau-agent-live` + `/en/...` werden statisch generiert.
`npm run dev` → beide Seiten öffnen, MDX rendert, CTA-Links funktionieren.

- [ ] **Step 4: Commit**

```bash
git add src/content/blog/tau-agent-live.de.mdx src/content/blog/tau-agent-live.en.mdx
git commit -m "Blog: Artikel 'Tau Agent ist live' (DE/EN)"
```

---

## Task 12: Artikel 2 — „ChatGPT & Claude direkt im Zoho CRM" (High-Intent)

**Files:**
- Create: `src/content/blog/ki-modelle-direkt-im-zoho-crm.de.mdx`
- Create: `src/content/blog/ai-models-inside-zoho-crm.en.mdx`

> Hinweis: Unterschiedliche Slugs pro Sprache sind erlaubt, ABER der Loader paart Artikel über denselben Slug für hreflang. **Entscheidung:** identischen Slug für beide Sprachen verwenden, damit `alternates.languages` korrekt sind. Daher beide Dateien mit Slug `ki-modelle-direkt-im-zoho-crm`:
> - `ki-modelle-direkt-im-zoho-crm.de.mdx`
> - `ki-modelle-direkt-im-zoho-crm.en.mdx`

**Brief / SEO (stärkster Artikel):**
- Slug: `ki-modelle-direkt-im-zoho-crm`
- Ziel-Keywords (DE): „ChatGPT in Zoho CRM", „Claude in Zoho CRM", „KI-Modell im CRM nutzen", „Zoho CRM ChatGPT Integration"
- Ziel-Keywords (EN): „ChatGPT in Zoho CRM", „Claude in Zoho CRM", „AI model inside Zoho CRM", „Zoho CRM ChatGPT integration"
- Suchintention: **kaufnah / Problemlösung**. Differenzierung „integriert vs. nativ im CRM".

- [ ] **Step 1: DE-Artikel schreiben** — `ki-modelle-direkt-im-zoho-crm.de.mdx`

Frontmatter:

```mdx
---
title: "ChatGPT & Claude direkt im Zoho CRM nutzen — nicht nur integrieren"
description: "Die meisten KI-Integrationen schicken deine CRM-Daten nach außen. Mit dem Tau Agent arbeiten ChatGPT, Claude und Gemini direkt in deinem Zoho CRM — per SSO, ohne eigenen API-Key."
date: "2026-06-06"
slug: "ki-modelle-direkt-im-zoho-crm"
locale: "de"
keywords: ["ChatGPT in Zoho CRM", "Claude in Zoho CRM", "KI-Modell im CRM", "Zoho CRM ChatGPT Integration", "AI im Zoho CRM"]
author: "Tau Process House GmbH"
---
```

Inhalt (~900–1100 Wörter, H2-Struktur):
1. **Lead/Problem:** „Du willst ChatGPT oder Claude für dein CRM nutzen — aber nicht ständig Daten kopieren." Die typischen Wege heute (Copy-Paste, Zapier, externe Tabs) und ihr Bruch.
2. `## „Integriert" reicht nicht — du willst es *im* CRM` — Unterschied zwischen Daten rausschicken vs. Agent arbeitet im CRM-Kontext (sieht den geöffneten Lead/Deal).
3. `## Wie der Tau Agent das löst` — SSO, Tau-Connector, Modelle inklusive, kein API-Key. Datenschutz: OAuth-only, kein Daten-Storage, Hosting in DE.
4. `## Beispiel: Lead recherchieren ohne das CRM zu verlassen` — konkretes Szenario.
5. `## Welche Modelle?` — Claude, ChatGPT, Gemini; Default Gemini Flash 3 Preview; ~24 Mio. Tokens/Monat im Chat-Plan.
6. `## In 5 Minuten startklar` — Install-Flow + 14 Tage / 10 Mio. Tokens.
7. **CTA.**

- [ ] **Step 2: EN-Artikel schreiben** — `ki-modelle-direkt-im-zoho-crm.en.mdx`

Frontmatter `locale: "en"`, gleicher Slug, englische Keywords. Titel z.B. „Use ChatGPT & Claude directly inside Zoho CRM — not just integrated".

- [ ] **Step 3: Build + Prüfung**

Run: `npm run build` → Expected: beide Sprachseiten generiert, hreflang korrekt.

- [ ] **Step 4: Commit**

```bash
git add src/content/blog/ki-modelle-direkt-im-zoho-crm.de.mdx src/content/blog/ki-modelle-direkt-im-zoho-crm.en.mdx
git commit -m "Blog: Artikel 'KI-Modelle direkt im Zoho CRM' (DE/EN, High-Intent)"
```

---

## Task 13: Artikel 3 — „Der Zoho MCP Server" (technisch, Long-Tail)

**Files:**
- Create: `src/content/blog/zoho-mcp-server.de.mdx`
- Create: `src/content/blog/zoho-mcp-server.en.mdx`

**Brief / SEO:**
- Slug: `zoho-mcp-server`
- Ziel-Keywords (DE/EN): „Zoho MCP Server", „Model Context Protocol Zoho", „Zoho CRM MCP", „MCP Zoho integration"
- Suchintention: technisch/Entwickler, geringe Konkurrenz → realistische Top-Rankings.

- [ ] **Step 1: DE-Artikel schreiben** — `zoho-mcp-server.de.mdx`

Frontmatter:

```mdx
---
title: "Der Zoho MCP Server: Wie wir KI-Modelle mit Zoho verbinden"
description: "Das Model Context Protocol (MCP) macht Zoho-Daten für KI-Modelle nutzbar. Wir erklären, was ein Zoho MCP Server ist und wie der Tau Agent darauf aufsetzt."
date: "2026-06-07"
slug: "zoho-mcp-server"
locale: "de"
keywords: ["Zoho MCP Server", "Model Context Protocol Zoho", "Zoho CRM MCP", "MCP Zoho"]
author: "Tau Process House GmbH"
---
```

Inhalt (~800–1000 Wörter):
1. **Lead:** Kurz: Was ist MCP (Model Context Protocol) und warum es für CRM-KI relevant ist.
2. `## Was ein MCP Server für Zoho leistet` — Tools/Ressourcen, standardisierter Zugriff auf Module, Felder, Records.
3. `## Wie der Tau-Connector MCP nutzt` — Architektur auf hoher Ebene (ohne Internas/Secrets): Modell ↔ Tau-Connector/MCP ↔ Zoho-API. OAuth-only, kein Daten-Storage.
4. `## Sicherheit & Kontrolle` — Aktionen protokolliert/reversibel, Guardrails, Hosting DE.
5. `## Für wen das relevant ist` — Teams, die KI nicht nur als Chat, sondern als handelnden Agenten im CRM wollen.
6. **CTA.**

> WICHTIG: Keine internen Implementierungsdetails, Endpunkte, Tokens oder Credentials veröffentlichen. Nur Architektur auf Konzeptebene.

- [ ] **Step 2: EN-Artikel schreiben** — `zoho-mcp-server.en.mdx`

`locale: "en"`, gleicher Slug. Titel z.B. „The Zoho MCP Server: How we connect AI models to Zoho".

- [ ] **Step 3: Build + Prüfung**

Run: `npm run build` → Expected: erfolgreich, Sitemap enthält jetzt alle drei Artikel × 2 Sprachen.

- [ ] **Step 4: Commit**

```bash
git add src/content/blog/zoho-mcp-server.de.mdx src/content/blog/zoho-mcp-server.en.mdx
git commit -m "Blog: Artikel 'Zoho MCP Server' (DE/EN, technisch)"
```

---

# Abschluss & Verifikation (nach allen Tasks)

- [ ] **Gesamt-Build:** `npm run build` — keine Fehler, alle Routen generiert.
- [ ] **Lint:** `npm run lint` — sauber (Git-History zeigt, dass ESLint-Build-Sauberkeit erwartet wird).
- [ ] **Sitemap manuell prüfen:** `/sitemap.xml` enthält `tau-zoho-agent`, `blog`, und 3 Artikel × 2 Sprachen.
- [ ] **Funktionscheck Produktseite:** Alle CTAs (Hero, Nav, Pricing, finale CTA) führen auf den Install-Link; kein „Q2 2026 / Coming Soon / Warteliste"-Text mehr sichtbar.
- [ ] **JSON-LD validieren:** Agentenseite (SoftwareApplication + FAQPage) und ein Blog-Artikel (BlogPosting) via Google Rich Results Test.
- [ ] **Deploy auf Vercel** und Live-Smoke-Test der Install-Links.

---

## Self-Review-Notizen (vom Planautor)

- **Spec-Abdeckung Aufgabe 1:** Install-Link (T1), Warteliste→Install (T1/T2/T3), Beta/Q2-Framing raus (T2/T6), Trial/Token-Botschaft mit Tokenzahl statt 12 € (T2/T4), FAQ (T4), Sitemap-Fix + JSON-LD (T5). ✓
- **Spec-Abdeckung Aufgabe 2:** Blog-Infra (T7–T10), Artikel 1 Launch (T11), Artikel 2 ChatGPT/Claude im CRM (T12), Artikel 3 Zoho MCP (T13). ✓
- **Offene Entscheidung für die Umsetzung:** OG-Bild für Agentenseite/Blog (Asset muss erstellt werden — T5 Step 3 optional). Falls kein Designasset vorhanden, `images` vorerst weglassen.
- **Risiko:** `next-mdx-remote/rsc` + React 19 — bei Peer-Dep-Problemen greift das bestehende `.npmrc` (`legacy-peer-deps`). Falls Build-Probleme: Alternative `@next/mdx` evaluieren.
- **Konsistenz:** Slug-Strategie für hreflang vereinheitlicht (identischer Slug pro Sprachpaar) — siehe T12-Hinweis.
