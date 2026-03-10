# Tau Process House — Agent Start

## Projekt-Überblick

**Tau Process House** ist die Website von Felix Rimbakowsky, einem Zoho-Berater (Freelancer + Netzwerk, Berlin & Hannover). Die Seite dient als Unternehmenswebsite und Lead-Funnel.

- **URL:** https://tauprocess.de
- **Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS, Framer Motion
- **Hosting:** Vercel (vermutet)
- **Sprache:** Bilingual DE/EN via `next-intl`, Default: `de` (DACH-Markt)

---

## Agent-Ordner-Struktur

```
agent/
├── start.md                        ← Diese Datei — Einstiegspunkt
├── website-architecture.md         ← Aktuelle Datei- und Komponentenstruktur
├── guides/
│   └── style_guide.md              ← Designregeln: Farben, Typografie, Abstände
├── konzepte/
│   ├── konzept.md                  ← SEO/LLM-Roadmap + offene Aufgaben
│   └── crm-check-landingpage.md    ← Vollständiges Konzept der /zoho-check Seite
├── log/
│   └── website-improvements.md    ← Offene und behobene Verbesserungspunkte
└── zoho-check/
    └── overview.md                 ← Zoho-Check-Feature: Dateien, API, Konfiguration
```

### Wann welche Datei lesen?

| Ich will…                                      | Datei lesen                       |
|------------------------------------------------|-----------------------------------|
| Dateien und Komponenten finden                 | `website-architecture.md`         |
| Am Design/Styling arbeiten                     | `guides/style_guide.md`           |
| SEO, LLM oder Roadmap verstehen                | `konzepte/konzept.md`             |
| Am `/zoho-check`-Feature arbeiten              | `zoho-check/overview.md`          |
| Das zoho-check Konzept im Detail verstehen     | `konzepte/crm-check-landingpage.md` |
| Bekannte Bugs oder To-dos nachschlagen         | `log/website-improvements.md`     |

---

## Technischer Kernkontext

**One-Pager-Struktur** (`src/app/[locale]/page.tsx`): 5 Sektionen mit CSS Scroll-Snap (`scroll-snap-type: y mandatory`), `100dvh` pro Sektion.

```
Hero → Our Philosophy → Our Services → KPI → Who we are → Contact
```

**Zusätzliche Routen:** `/[locale]/faq`, `/[locale]/imprint`, `/[locale]/privacy`, `/[locale]/zoho-check`

**i18n:** `next-intl` mit `[locale]/`-Routing (de | en), Middleware-Redirect, LanguageToggle-Komponente

**Übersetzungsdateien:** `src/messages/de.json`, `src/messages/en.json`

**Globale Klassen** (globals.css): `.section`, `.section-black`, `.section-white`, `.section-container`, `.section-dots`

**Daten-Dateien:** `src/data/faq.json` (bilingual), `src/data/work.json`

---

## Regeln für Agent-Updates

Nach jeder Änderung am System:

1. **`website-architecture.md` aktualisieren** wenn Dateien/Komponenten hinzugefügt, umbenannt oder gelöscht wurden.
2. **`log/website-improvements.md` aktualisieren** wenn ein bekanntes Problem behoben wurde (als ✅ markieren) oder ein neues entdeckt wurde.
3. **`konzepte/konzept.md` aktualisieren** wenn ein Konzeptpunkt umgesetzt wurde (Zeile entfernen oder Status ändern).
4. **`zoho-check/overview.md` aktualisieren** bei Änderungen am `/zoho-check`-Feature, API-Routen oder Umgebungsvariablen.
5. **Keine Implementierungsanleitungen hinterlassen** — nach Umsetzung Schritt-für-Schritt-Anleitungen aus Konzeptdokumenten entfernen.

### Dateien, die regelmäßig aktualisiert werden müssen

| Datei | Auslöser |
|-------|---------|
| `website-architecture.md` | Neue Komponente, neue Route, Umbenennung |
| `log/website-improvements.md` | Bug behoben oder neu entdeckt |
| `konzepte/konzept.md` | Konzept-Punkt umgesetzt |
| `zoho-check/overview.md` | Änderung am Zoho-Check-Feature |
