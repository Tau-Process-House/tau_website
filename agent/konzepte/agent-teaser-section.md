# Agent-Teaser-Slide auf der Hauptseite — Konzept

> **Status:** Entwurf · Felix-Review ausstehend
> **Ersetzt:** `KpiSection` (Slide 4 im One-Pager)
> **Verlinkt zu:** `/[locale]/tau-zoho-agent`
> **Verwandte Dokumente:** `tau-agent-launch.md` (Sektion 1.5 wird durch dieses Dokument ersetzt)

---

## 1. Ziel

Die vierte Slide der Hauptseite (aktuell KPI-Zahlen „5+ Jahre · 25+ Implementierungen") wird durch eine **Produkt-Teaser-Slide für den Tau Zoho Agent** ersetzt. Sie soll:

- den Tau Zoho Agent als eigenständiges SaaS-Produkt sichtbar machen
- Besucher der Hauptseite zur Subpage `/tau-zoho-agent` führen (Primary CTA)
- in 5 Sekunden vermitteln: *Was ist es, für wen, was bringt es*
- markentreu zu beiden Welten bleiben (Tau-Hauptseite ↔ Agent-Produktwelt)

Die KPIs entfallen ersatzlos. Sie sind kein Lead-Treiber und stehen indirekt bereits in `agent.json` (Erfahrung, Implementierungen) bzw. in der Team-Sektion.

---

## 2. Position im One-Pager

```
1 — Hero                       schwarz
2 — Our Philosophy             weiß
3 — Our Services               schwarz
4 — Tau Agent Teaser  ◄ NEU    split: schwarz | weiß
5 — Team                       schwarz
6 — Contact                    weiß
```

**Section-Count bleibt bei 6** — kein Anpassungsbedarf an `section-dots` in `page.tsx`.

**Light/Dark-Rhythmus:** Split-Layout durchbricht den klaren Wechsel bewusst — die Slide wirkt dadurch als visueller „Bruch" und zieht Aufmerksamkeit auf sich. Die rechte (weiße) Hälfte bildet die Brücke zur folgenden schwarzen Team-Sektion.

---

## 3. Layout — Split-Design

### 3.1 Desktop (≥ 768px)

Horizontal geteilte Vollbild-Sektion, **40 / 60** (links schmaler, rechts mehr Platz für Headline + CTA):

```
┌──────────────────────┬──────────────────────────────────────┐
│ ░░░░░░░░░░░░░░░░░░░░ │                                      │
│ ░  ● Beta · NEU    ░ │  NEUES PRODUKT                       │
│ ░  (Pill, gold)    ░ │  ─────────────                       │
│ ░                  ░ │                                      │
│ ░                  ░ │  Dein Zoho CRM,                      │
│ ░  ┌────────────┐  ░ │  auf Autopilot.                      │
│ ░  │            │  ░ │                                      │
│ ░  │  Hero-     │  ░ │  Der KI-Agent, der Leads, Deals,     │
│ ░  │  Visual    │  ░ │  Support und Berichte übernimmt —    │
│ ░  │  / Logo    │  ░ │  damit dein Vertrieb abschließt,     │
│ ░  │            │  ░ │  statt zu klicken.                   │
│ ░  └────────────┘  ░ │                                      │
│ ░                  ░ │  ✓ Lead-Scoring & Routing in Echtzeit│
│ ░  TAU ZOHO AGENT  ░ │  ✓ Pipeline-Automation & Reports     │
│ ░  (Wortmarke)     ░ │  ✓ Natürlichsprachliche CRM-Befehle  │
│ ░░░░░░░░░░░░░░░░░░░░ │                                      │
│   schwarz #000       │   [ Mehr über Tau Agent erfahren → ] │
│   Goldakzent #C8962E │                                      │
└──────────────────────┴──────────────────────────────────────┘
        40%                              60%
```

### 3.2 Mobile (< 768px)

Vertikaler Stack — schwarzer Block oben, weißer Block unten. Höhe weiterhin 100 dvh, beide Blöcke teilen sich den Viewport.

```
┌────────────────────┐
│ ░░░░░░░░░░░░░░░░░░ │
│ ░  ● Beta · NEU  ░ │   ~40 dvh
│ ░  [Hero-Visual] ░ │   schwarz
│ ░  TAU AGENT     ░ │
│ ░░░░░░░░░░░░░░░░░░ │
├────────────────────┤
│                    │
│  Dein Zoho CRM,    │
│  auf Autopilot.    │   ~60 dvh
│                    │   weiß
│  Subtitel…         │
│                    │
│  ✓ Bullet 1        │
│  ✓ Bullet 2        │
│  ✓ Bullet 3        │
│                    │
│  [ Mehr → ]        │
└────────────────────┘
```

Bullets können auf Mobile auf 2 reduziert werden, falls Platz knapp wird.

---

## 4. Inhalte (bilingual)

Texte stammen direkt aus `agent.json` (Hero-Block) — sorgt für Konsistenz mit der Subpage und reduziert Pflegeaufwand.

| Element | Deutsch | English |
|---|---|---|
| Pre-Label (rechts oben, T3) | `NEUES PRODUKT` | `NEW PRODUCT` |
| Beta-Pill (links oben) | `Beta · Neu` (mit goldenem Punkt) | `Beta · New` |
| Headline (rechts, T1) | `Dein Zoho CRM,` `auf Autopilot.` | `Your Zoho CRM,` `on autopilot.` |
| Subtitel (rechts, T4) | `Der KI-Agent, der Leads, Deals, Support und Berichte übernimmt — damit dein Vertrieb abschließt, statt zu klicken.` | `The AI agent that handles leads, deals, support and reporting — so your sales team closes, not clicks.` |
| Bullet 1 | `Lead-Scoring & Routing in Echtzeit` | `Real-time lead scoring & routing` |
| Bullet 2 | `Pipeline-Automation & Reports` | `Pipeline automation & reports` |
| Bullet 3 | `Natürlichsprachliche CRM-Befehle` | `Natural-language CRM commands` |
| Wortmarke (links unten) | `TAU ZOHO AGENT` | `TAU ZOHO AGENT` |
| Primary CTA | `Mehr über Tau Agent erfahren →` | `Learn more about Tau Agent →` |

**Datenhaltung:** Neuer Datenblock `teaser` in `src/data/agent.json` — vermeidet Duplikate und hält bilinguale Inhalte zentral. Alternativ `src/data/agent-teaser.json` als eigene Datei (Pattern wie andere Sektionen). Empfehlung: **eigene Datei** (`agent-teaser.json`), weil die Slide ein Hauptseiten-Element ist und die `agent.json` reinsertenbezogen bleibt.

---

## 5. Markenbalance: Tau-Stil ↔ Agent-Produktwelt

Die Slide muss zwei Designsprachen sauber trennen — anhand der Bildachse.

### Linke Hälfte (schwarz) — Agent-Produktwelt

| Element | Wert |
|---|---|
| Hintergrund | `#000000` |
| Akzentfarbe | `#C8962E` (Gold, NUR auf dieser Hälfte erlaubt) |
| Schriftart | Inter (Hauptseite) — *kein Wechsel zu Arial*, um die Hauptseite konsistent zu halten |
| Beta-Pill | abgerundet (`border-radius: 999px`), wie auf Subpage — einzige Ausnahme zur Tau-Regel „kantenscharf" |
| Hero-Visual | Statisches Bild / Mockup (siehe Sektion 7) |
| Wortmarke | `TAU ZOHO AGENT` in T3 (14 px, bold, uppercase, tracking-widest, weiß) |

### Rechte Hälfte (weiß) — Tau-Hauptseite

Strikt nach `style_guide.md`:

| Element | Stil | Token |
|---|---|---|
| Pre-Label | T3 (14 px, bold, uppercase, tracking-widest, `text-gray-600`) | `NEUES PRODUKT` |
| Headline | T1 (`text-5xl md:text-7xl`, bold, leading-tight, schwarz) | siehe Tabelle |
| Subtitel | T4 (`text-base`, normal, leading-relaxed, schwarz) | – |
| Bullets | T4 + ✓-Symbol in `text-gray-600` | 3 Items, max 1 Zeile pro Bullet |
| Primary CTA | Schwarzer Button, weißer Text, T3-Schrift, `12px 32px` Padding, **kein** border-radius | – |

**Goldfarben sind auf der weißen Hälfte verboten** — sie würden den Tau-Style brechen. Der Brückenschlag zwischen den Welten passiert ausschließlich visuell durch die Bildachse, nicht durch Farbübergriffe.

---

## 6. Animation & Interaktion

Bewusst **keine** Count-up- oder komplexe Scroll-Animation (Visual ist statisch nach User-Wahl).

**Erlaubte Mikro-Interaktionen:**
- Beim Scroll-In (`IntersectionObserver`): einmaliger Fade-Up beider Hälften, Versatz 100 ms (links zuerst, rechts danach), Dauer 600 ms — analog zu `framer-motion`-Pattern in `AgentHero.tsx`
- Hover auf Primary CTA: `opacity: 0.8` (Tau-Regel — kein Farbwechsel)
- Hover auf Beta-Pill: keine

---

## 7. Hero-Visual — Asset-Anforderung

Das statische Bild in der linken Hälfte ist **noch zu erstellen**. Vorschläge zur Auswahl:

| Variante | Beschreibung | Aufwand |
|---|---|---|
| **A — Tau-Agent-UI-Screenshot** | Screenshot der Chat-Oberfläche aus der Subpage (statisch, ohne Animation), z. B. mit dem Lead-Beispiel „Lena Vogel" | gering — Screenshot der bestehenden `ChatPreview`-Komponente |
| **B — Lead-Karten-Mockup** | Klare, abstrahierte Lead-Karte mit Name + Score + Tags + Tau-Logo-Wasserzeichen | mittel — Designarbeit nötig |
| **C — Logo-Composition** | Großes Tau-Process-House-Logo + „×" + Zoho-Logo, schlicht zentriert | gering — Logo-Komposition genügt |
| **D — Abstrakte Marke** | Großes „τ"-Symbol mit Goldakzent, Subline „TAU ZOHO AGENT" | gering — typografisch lösbar |

**Empfehlung:** Variante **A** (UI-Screenshot) — zeigt das Produkt direkt, schafft sofort Verständnis, höchste Conversion-Wahrscheinlichkeit. Format: 1:1 oder 4:3, optimiert als WebP, max 200 kB. Pfad: `public/img/agent-teaser-hero.webp`.

**Fallback bis Asset existiert:** Variante **D** als rein typografische Lösung — sofort baubar, keine Designressourcen nötig.

---

## 8. Akzeptanzkriterien

- [ ] Slide ersetzt `KpiSection` in `src/app/[locale]/page.tsx`
- [ ] Scroll-Snap funktioniert (100 dvh, snap-aligned)
- [ ] Section-Dots-Logik unverändert (`sectionCount` bleibt 6)
- [ ] Bilingual (DE/EN) korrekt
- [ ] Primary CTA verlinkt auf `/${locale}/tau-zoho-agent` via `@/i18n/navigation` (nicht hartcodiert)
- [ ] CTA feuert GA4-Event `mainpage_to_agent_click` mit `source: 'teaser'` (siehe `tau-agent-launch.md` Sektion 1.7)
- [ ] Mobile-Stack funktioniert ohne Scroll innerhalb der Slide
- [ ] `KpiSection.tsx` und `kpi.json` werden **nicht** gelöscht — bleiben für späteren Wiedereinsatz erhalten, nur aus `page.tsx` entfernt
- [ ] `website-architecture.md` aktualisiert (KPI als Slide 4 → Tau-Agent-Teaser)
- [ ] `tau-agent-launch.md` Sektion 1.5 entfernt oder auf dieses Dokument verweisen lassen
- [ ] Lighthouse-Score Hauptseite ≥ 90 unverändert

---

## 9. Offene Entscheidungen für Felix

1. **Hero-Visual:** Welche der vier Varianten (A–D)? Wer erstellt das Asset?
2. **Pre-Label-Text:** „NEUES PRODUKT" oder lieber „BETA-LAUNCH" / „LIVE BETA" / „LAUNCH 2026"?
3. **Datenhaltung:** Eigene Datei `agent-teaser.json` oder Block in `agent.json`? *(Empfehlung: eigene Datei.)*
4. **CTA-Wortlaut:** „Mehr über Tau Agent erfahren →" vs. „Tau Agent ansehen →" vs. „Zum Produkt →"? Spezifischer Wortlaut beeinflusst Klickrate.
5. **Beta-Pill anzeigen?** Falls Felix den Beta-Status auf der Hauptseite nicht hervorheben möchte, fällt die Pill weg.
6. **Section-Übersicht** — soll die Sektion in der `nav.dotLabel`-Liste einen eigenen Tooltip bekommen (z. B. „Tau Agent")?

---

## 10. Komponenten-Struktur (knapper Implementierungs-Outline)

> Wird nach Umsetzung gemäß Agent-Konvention aus diesem Dokument entfernt.

- **Neue Komponente:** `src/components/TauAgentTeaserSection.tsx` (`'use client'`)
- **Neue Datendatei:** `src/data/agent-teaser.json` (bilingual, Schema analog `hero.json`)
- **Neuer Type:** in `src/types/content.ts` ergänzen (`AgentTeaserContent`)
- **Asset:** `public/img/agent-teaser-hero.webp` (oder gewählte Variante)
- **Änderung in `page.tsx`:** Import + Ersatz von `<KpiSection />` durch `<TauAgentTeaserSection />` (Feature-Flag entfällt — Slide ist permanent)
- **Lokalisierter Link:** `Link` aus `@/i18n/navigation`, `href="/tau-zoho-agent"`
