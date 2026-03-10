# Tau Process House — Konzept & Roadmap

> Stand: März 2026

---

## Offene Aufgaben

### SEO & LLM

| # | Aufgabe | Priorität | Datei |
|---|---------|-----------|-------|
| 1 | OG-Image erstellen (1200×630px) | P1 | `/public/img/og-image.png` |
| 2 | H1 in HeroSection SEO-optimieren | P2 | `HeroSection.tsx` |

### Landing Pages

| # | Aufgabe | Priorität | Route |
|---|---------|-----------|-------|
| 3 | LP: CRM Health Check | P1 | `/crm-health-check` |
| 4 | LP: Zoho Migration | P2 | `/zoho-migration` |
| 5 | Sitemap um Landing Pages ergänzen | nach LP-Erstellung | `sitemap.ts` |

---

## Bereits umgesetzt

- `title`, `description`, `lang="de"` — `layout.tsx`
- Open Graph + Twitter Card Meta-Tags — `layout.tsx`
- JSON-LD Person + Organization Schema — `layout.tsx`
- `robots.ts` mit LLM-Bot-Erlaubnis
- `sitemap.ts` (/, /faq, /imprint, /privacy)
- `llms.txt` mit Felix-Profil und LLM-CTA-Text
- FAQ-Seite `/faq` mit FAQPage JSON-LD
- FAQ-Link in ContactSection

---

## Landing-Page-Konzept (kurz)

Jede Landing Page ist eine eigenständige Next.js Server Component ohne Scroll-Snap.

**Prinzip:** Eigene `metadata`, minimaler Header mit Logo, einzelner primärer CTA, Footer mit Link zu `tauprocess.de`.

- `/crm-health-check` — Zielgruppe: Zoho-CRM-Nutzer mit Problemen. CTA: „Kostenlosen CRM-Check buchen" (Calendly/mailto)
- `/zoho-migration` — Zielgruppe: Unternehmen, die von anderem System migrieren. CTA: „Migrationsgespräch vereinbaren"

Vollständiges Konzept für `/zoho-check` (implementierter Self-Service-Funnel): → `konzepte/crm-check-landingpage.md`

---

## Sektionsübersicht (implementierter Stand)

### Our Services
- Zoho-Banner (Logo links, Text rechts, 20% Margin)
- 4 Journey-Karten mit Hover-Flip (Consulting → Migration → Iterative Dev → Training)
- Kartenhöhe 20rem, Beschreibung 18px

### KPI (vorübergehend statt Our Work)
- 2 große Kennzahlen: `5+` Jahre Zoho Erfahrung, `25+` Implementierungen
- Count-up Animation 0.8s, startet bei jedem Viewport-Eintritt neu

### Our Work (auskommentiert)
- Filter-Galerie, Detail-Panel
- Wartet auf Case-Study-Inhalte in `src/data/work.json`
