# Our Work — Datenschema & Implementierungsreferenz

> Dieses Dokument beschreibt vollständig, wie `src/data/work.json` aufgebaut ist und wie die `OurWorkSection` die Daten verarbeitet. Es richtet sich an Agents, die neue Work-Einträge anlegen oder bestehende bearbeiten.

---

## 1. Überblick

Die Datei `src/data/work.json` ist die einzige Datenquelle für die „Our Work"-Sektion der Website. Sie enthält drei voneinander unabhängige Arrays:

| Array | Typ-Bezeichner | Zweck |
|---|---|---|
| `caseStudies` | `"caseStudy"` | Konkrete Kundenprojekte mit messbaren Ergebnissen |
| `solutions` | `"solution"` | Allgemeingültige Lösungsarchitekturen ohne Kundenbezug |
| `products` | `"product"` | Fertige, kaufbare Zoho-Produkte mit Preis |

Die Sektion wird nur angezeigt, wenn in `.env.local` die Variable `NEXT_PUBLIC_SHOW_OUR_WORK=true` gesetzt ist. Andernfalls erscheint die KPI-Sektion.

---

## 2. Sprachunterstützung (Bilingual)

Alle sichtbaren Textfelder sind **zweisprachig** und folgen diesem Muster:

```json
"feldname": {
  "de": "Deutscher Text",
  "en": "English text"
}
```

Felder, die **nicht** lokalisiert werden (einsprachig bleiben):
- `id`, `type`, `published` — technische Felder
- `tags` — kurze Label-Strings (z. B. `"Zoho CRM"`, `"AI"`)
- `client` (bei Case Studies) — Firmenname
- `apps` (bei Case Studies) — App-Namen (z. B. `"Zoho Projects"`)
- `showcase.url` (bei Products) — Bildpfad
- `pricing.model`, `pricing.price`, `pricing.currency`, `pricing.label` (bei Products) — Preisangaben
- `cta.href` (bei Products) — Mailto-Link
- `architecture.components[].name` (bei Solutions) — App-/Komponentenname

---

## 3. Das `published`-Flag

Jeder Eintrag in allen drei Arrays hat ein `published`-Feld:

```json
"published": true   // Eintrag wird auf der Website angezeigt
"published": false  // Eintrag ist ausgeblendet (Entwurf / deaktiviert)
```

Die Filterlogik in `OurWorkSection.tsx` wertet dieses Flag aus — ein Eintrag mit `false` erscheint nie auf der Website, bleibt aber in der JSON-Datei erhalten.

---

## 4. Datenstruktur: Case Study (`type: "caseStudy"`)

Case Studies dokumentieren abgeschlossene Kundenprojekte mit konkreten Vorher/Nachher-KPIs.

```json
{
  "id": "case-001",
  "type": "caseStudy",
  "client": "Firmenname GmbH",
  "industry": { "de": "Branche auf Deutsch", "en": "Industry in English" },
  "headline": { "de": "Überschrift", "en": "Headline" },
  "tagline": { "de": "Kurze Zusammenfassung (1 Satz)", "en": "Short summary (1 sentence)" },
  "challenge": {
    "de": "Beschreibung des Problems vor der Implementierung (2–4 Sätze).",
    "en": "Description of the problem before implementation (2–4 sentences)."
  },
  "solution": {
    "summary": {
      "de": "Kurzbeschreibung der Lösung (1 Satz).",
      "en": "Short description of the solution (1 sentence)."
    },
    "apps": ["Zoho CRM", "Zoho Projects", "Zoho Books"],
    "description": {
      "de": "Detaillierte Beschreibung, wie die Apps zusammenspielen (3–5 Sätze).",
      "en": "Detailed description of how the apps work together (3–5 sentences)."
    }
  },
  "artifacts": [
    { "de": "Konkrete Lieferergebnis 1", "en": "Concrete deliverable 1" },
    { "de": "Konkrete Lieferergebnis 2", "en": "Concrete deliverable 2" }
  ],
  "kpis": [
    {
      "metric": { "de": "Metrikname", "en": "Metric name" },
      "before": "14 days",
      "after": "2 days",
      "improvement": "-86%"
    }
  ],
  "tags": ["Zoho One", "Automation", "CRM"],
  "published": true
}
```

### Feldbeschreibungen Case Study

| Feld | Typ | Beschreibung |
|---|---|---|
| `id` | `string` | Eindeutige ID, Muster: `case-001`, `case-002`, … |
| `type` | `"caseStudy"` | Immer genau dieser String |
| `client` | `string` | Kundenname (einsprachig) |
| `industry` | `LocalizedString` | Branche des Kunden |
| `headline` | `LocalizedString` | Hauptüberschrift der Case Study |
| `tagline` | `LocalizedString` | 1-Satz-Zusammenfassung, erscheint auf der Karte |
| `challenge` | `LocalizedString` | Ausgangsproblem vor der Implementierung |
| `solution.summary` | `LocalizedString` | 1-Satz-Lösung |
| `solution.apps` | `string[]` | Liste der verwendeten Zoho-Apps |
| `solution.description` | `LocalizedString` | Detaillierter Prozessablauf |
| `artifacts` | `LocalizedString[]` | Liste konkreter Deliverables |
| `kpis` | `KPI[]` | Messbare Ergebnisse (siehe unten) |
| `kpis[].metric` | `LocalizedString` | Name der Metrik |
| `kpis[].before` | `string` (optional) | Wert vor der Implementierung |
| `kpis[].after` | `string` (optional) | Wert nach der Implementierung |
| `kpis[].improvement` | `string` | Verbesserung, z. B. `"-86%"` oder `"+75%"` |
| `tags` | `string[]` | Schlagwörter für die Filteransicht |
| `published` | `boolean` | Sichtbarkeit auf der Website |

---

## 5. Datenstruktur: Solution (`type: "solution"`)

Solutions beschreiben allgemeingültige Lösungsarchitekturen — ohne konkreten Kundenbezug. Sie haben immer drei inhaltliche Blöcke: **Für wen**, **Die Lösung**, **Was der Kunde erhält**.

```json
{
  "id": "sol-001",
  "type": "solution",
  "name": { "de": "Lösungsname auf Deutsch", "en": "Solution name in English" },
  "tagline": { "de": "Kurze Beschreibung (1 Satz)", "en": "Short description (1 sentence)" },
  "target": {
    "audience": {
      "de": "Für wen ist die Lösung gedacht? Zielgruppe, Unternehmensgröße, Kontext (2–3 Sätze).",
      "en": "Who is this solution for? Target group, company size, context (2–3 sentences)."
    },
    "problem": {
      "de": "Welches Problem wird gelöst? Schmerzpunkte der Zielgruppe (2–4 Sätze).",
      "en": "What problem does it solve? Pain points of the target group (2–4 sentences)."
    }
  },
  "architecture": {
    "summary": {
      "de": "Kurzbeschreibung der Lösungsarchitektur (1 Satz).",
      "en": "Short description of the solution architecture (1 sentence)."
    },
    "components": [
      {
        "name": "Zoho CRM",
        "role": {
          "de": "Welche Rolle spielt diese Komponente? (2–3 Sätze)",
          "en": "What role does this component play? (2–3 sentences)"
        }
      }
    ],
    "description": {
      "de": "End-to-End-Beschreibung des Datenflusses und der Zusammenarbeit der Komponenten (4–6 Sätze).",
      "en": "End-to-end description of the data flow and component interaction (4–6 sentences)."
    }
  },
  "deliverables": [
    { "de": "Konkretes Lieferergebnis 1", "en": "Concrete deliverable 1" },
    { "de": "Konkretes Lieferergebnis 2", "en": "Concrete deliverable 2" }
  ],
  "tags": ["Zoho CRM", "Zoho Projects", "Agenturen"],
  "published": true
}
```

### Feldbeschreibungen Solution

| Feld | Typ | Beschreibung |
|---|---|---|
| `id` | `string` | Eindeutige ID, Muster: `sol-001`, `sol-002`, … |
| `type` | `"solution"` | Immer genau dieser String |
| `name` | `LocalizedString` | Name der Lösung |
| `tagline` | `LocalizedString` | 1-Satz-Zusammenfassung, erscheint auf der Karte |
| `target.audience` | `LocalizedString` | Für wen ist die Lösung gedacht? |
| `target.problem` | `LocalizedString` | Welches Problem wird gelöst? |
| `architecture.summary` | `LocalizedString` | Kurzbeschreibung der Architektur |
| `architecture.components` | `SolutionComponent[]` | Liste der beteiligten Apps/Systeme |
| `architecture.components[].name` | `string` | App-Name (einsprachig, z. B. `"Zoho CRM"`) |
| `architecture.components[].role` | `LocalizedString` | Rolle dieser Komponente in der Lösung |
| `architecture.description` | `LocalizedString` | Detaillierter End-to-End-Prozessablauf |
| `deliverables` | `LocalizedString[]` | Was erhält der Kunde konkret? |
| `tags` | `string[]` | Schlagwörter für die Filteransicht |
| `published` | `boolean` | Sichtbarkeit auf der Website |

---

## 6. Datenstruktur: Product (`type: "product"`)

Products sind fertige, kaufbare Zoho-Lösungen mit Preisangabe und Call-to-Action.

```json
{
  "id": "prod-001",
  "type": "product",
  "name": { "de": "Produktname", "en": "Product name" },
  "tagline": { "de": "Kurze Beschreibung (1 Satz)", "en": "Short description (1 sentence)" },
  "problem": {
    "de": "Welches Problem löst das Produkt? (2–3 Sätze)",
    "en": "What problem does the product solve? (2–3 sentences)"
  },
  "description": {
    "de": "Wie funktioniert das Produkt? Technische und prozessuale Details (3–5 Sätze).",
    "en": "How does the product work? Technical and process details (3–5 sentences)."
  },
  "showcase": {
    "type": "image",
    "url": "/products/dateiname-screenshot.png",
    "alt": {
      "de": "Bildbeschreibung auf Deutsch",
      "en": "Image description in English"
    }
  },
  "results": [
    {
      "metric": { "de": "Metrikname", "en": "Metric name" },
      "improvement": "+75%"
    }
  ],
  "pricing": {
    "model": "monthly",
    "price": 149,
    "currency": "EUR",
    "label": "149 € / month"
  },
  "cta": {
    "label": { "de": "CTA-Text auf Deutsch", "en": "CTA text in English" },
    "href": "mailto:info@tauprocess.de?subject=Produktname"
  },
  "tags": ["AI", "Zoho CRM", "Automation"],
  "published": true
}
```

### Feldbeschreibungen Product

| Feld | Typ | Beschreibung |
|---|---|---|
| `id` | `string` | Eindeutige ID, Muster: `prod-001`, `prod-002`, … |
| `type` | `"product"` | Immer genau dieser String |
| `name` | `LocalizedString` | Produktname |
| `tagline` | `LocalizedString` | 1-Satz-Zusammenfassung, erscheint auf der Karte |
| `problem` | `LocalizedString` | Welches Problem löst das Produkt? |
| `description` | `LocalizedString` | Wie funktioniert das Produkt? |
| `showcase.type` | `"image" \| "video"` | Art der Medienvorschau |
| `showcase.url` | `string` | Pfad zur Bilddatei unter `/public/products/` |
| `showcase.alt` | `LocalizedString` | Barrierefreiheits-Alttext |
| `results` | `KPI[]` | Messbare Ergebnisse bei Kunden (ohne `before`/`after`) |
| `results[].metric` | `LocalizedString` | Name der Metrik |
| `results[].improvement` | `string` | Verbesserungswert, z. B. `"+70%"` |
| `pricing.model` | `string` | Abrechnungsmodell, z. B. `"monthly"` |
| `pricing.price` | `number` | Preis als Zahl |
| `pricing.currency` | `string` | Währungscode, z. B. `"EUR"` |
| `pricing.label` | `string` | Anzeigetext, z. B. `"149 € / month"` (einsprachig) |
| `cta.label` | `LocalizedString` | Text des CTA-Buttons |
| `cta.href` | `string` | Ziel-URL, typischerweise `mailto:` (einsprachig) |
| `tags` | `string[]` | Schlagwörter für die Filteransicht |
| `published` | `boolean` | Sichtbarkeit auf der Website |

---

## 7. ID-Konventionen

| Typ | Schema | Beispiele |
|---|---|---|
| Case Study | `case-XXX` | `case-001`, `case-002`, `case-010` |
| Solution | `sol-XXX` | `sol-001`, `sol-002` |
| Product | `prod-XXX` | `prod-001`, `prod-002` |

Immer dreistellig mit führenden Nullen. Fortlaufend nummerieren — nie eine bestehende ID wiederverwenden.

---

## 8. Anzeigereihenfolge auf der Website

In `OurWorkSection.tsx` werden die drei Arrays zu einer gemeinsamen Liste zusammengeführt. Die Sortierung erfolgt nach dem Interleaving-Prinzip: Solutions zuerst, dann Case Studies, dann Products — jeweils abwechselnd nach Index.

```
Index 0: sol-001, case-001, prod-001
Index 1: sol-002, case-002, prod-002
...
```

Die Filterbuttons auf der Seite lauten: **All · Solutions · Case Studies · Products**

---

## 9. TypeScript-Typen

Die Typdefinitionen liegen in `src/types/work.ts`. Beim Anlegen neuer Felder müssen die Typen dort ebenfalls aktualisiert werden.

```typescript
// Kerntyp für alle lokalisierten Textfelder
type LocalizedString = { de: string; en: string; }

// Alle drei Item-Typen
type WorkItem = CaseStudy | Product | Solution;
```

---

## 10. Checkliste: Neuen Eintrag anlegen

1. **Typ bestimmen:** `caseStudy`, `solution` oder `product`?
2. **ID vergeben:** Nächste freie ID im entsprechenden Array ermitteln
3. **Alle Pflichtfelder befüllen:** Kein Textfeld darf fehlen — immer `de` UND `en`
4. **`published: false` setzen** bis der Inhalt freigegeben ist
5. **TypeScript prüfen:** `npx tsc --noEmit` im Projektroot ausführen
6. **Auf `published: true` setzen** wenn der Inhalt fertig und freigegeben ist

---

## 11. Dateipfad-Referenz

| Datei | Zweck |
|---|---|
| `src/data/work.json` | Alle Work-Einträge (Quelldatei) |
| `src/types/work.ts` | TypeScript-Interfaces für alle Typen |
| `src/components/OurWorkSection.tsx` | Rendert die Sektion, liest work.json ein |
| `.env.local` | `NEXT_PUBLIC_SHOW_OUR_WORK=true/false` |
