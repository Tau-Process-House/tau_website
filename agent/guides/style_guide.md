# Tau Process House — Style Guide

> Referenz für alle Agents und Entwickler. Ziel: konsistente Typografie und Gestaltung über alle Seiten und Komponenten hinweg.

---

## 1. Markenidentität

**Farben**

| Token | Hex | Verwendung |
|---|---|---|
| `black` | `#000000` | Primäre Hintergrundfarbe (Dark Sections), primärer Text auf weißem Grund |
| `white` | `#ffffff` | Sekundäre Hintergrundfarbe (Light Sections), primärer Text auf schwarzem Grund |
| `grey-600` | `#666666` | Sekundärer Text, Captions, Labels |
| `grey-100` | `#f5f5f5` | Helle Hintergründe (Cards, Stat-Boxen) |
| `grey-200` | `#eeeeee` | Trennlinien, Borders |

**Keine weiteren Farben verwenden.** Tau Process House verwendet ausschließlich Schwarz, Weiß und Grautöne — keine Akzentfarben, keine Primärfarben.

---

## 2. Schriftsystem

**Einzige Schriftfamilie: Inter**

Inter wird via `next/font/google` geladen und als CSS-Variable `--font-inter` bereitgestellt. Fallback: `Arial, Helvetica, sans-serif`.

```css
/* globals.css — bereits gesetzt */
font-family: var(--font-inter, Arial, Helvetica, sans-serif);
```

Für PDF-Dokumente (pdfkit): `Helvetica` / `Helvetica-Bold` als systemseitige Äquivalente.

---

## 3. Typografie-Skala (5 Stile)

Exakt 5 Textstile sind erlaubt. Kein anderer Stil darf ohne Aktualisierung dieses Guides eingeführt werden.

### T1 — Display / Hero
Für den dominierenden Seitentitel, den Kernaussage-Headline.

| Eigenschaft | Wert |
|---|---|
| Tailwind | `text-5xl md:text-7xl` |
| Größe | 48px (mobil) → 72px (desktop) |
| Gewicht | `font-bold` (700) |
| Zeilenhöhe | `leading-tight` (1.25) |
| Buchstabenabstand | `tracking-tight` |
| Farbe | Kontrastfarbe zur Section (weiß auf schwarz, schwarz auf weiß) |

**Verwendung:** HeroSection-Headline, Landingpage-Haupttitel (z. B. `/zoho-check` Hero).

---

### T2 — Heading / Section Title
Für Sektionsüberschriften und Kartenüberschriften.

| Eigenschaft | Wert |
|---|---|
| Tailwind | `text-2xl md:text-3xl` |
| Größe | 24px → 30px |
| Gewicht | `font-semibold` (600) |
| Zeilenhöhe | `leading-snug` (1.375) |
| Buchstabenabstand | `tracking-normal` |
| Farbe | Kontrastfarbe zur Section |

**Verwendung:** "What we do", "How we do it", Accordion-Titel, Card-Headlines.

---

### T3 — Subheading / Label
Für Unterüberschriften, Feldlabels, Badge-Text, Navigations-Items.

| Eigenschaft | Wert |
|---|---|
| Tailwind | `text-sm` |
| Größe | 14px |
| Gewicht | `font-bold` (700) |
| Zeilenhöhe | `leading-normal` (1.5) |
| Buchstabenabstand | `tracking-widest` oder `uppercase tracking-wider` |
| Farbe | `text-current` oder `text-gray-600` |

**Verwendung:** Kategorienbezeichnungen, Badges, Formular-Labels, Section-Vortitel ("Quick Wins", "Gap-Analyse").

---

### T4 — Body / Fließtext
Für alle Absätze, Beschreibungen, Erklärungstexte.

| Eigenschaft | Wert |
|---|---|
| Tailwind | `text-base` |
| Größe | 16px |
| Gewicht | `font-normal` (400) |
| Zeilenhöhe | `leading-relaxed` (1.625) |
| Buchstabenabstand | `tracking-normal` |
| Farbe | `text-current` |

**Verwendung:** Beschreibungen auf der Hauptseite, Fließtext in Analyseresultaten, Email-Texte.

---

### T5 — Caption / Meta
Für kleinste Hinweistexte, Fuß- und Hilfsnotizen.

| Eigenschaft | Wert |
|---|---|
| Tailwind | `text-xs` |
| Größe | 12px |
| Gewicht | `font-normal` (400) |
| Zeilenhöhe | `leading-normal` (1.5) |
| Buchstabenabstand | `tracking-normal` |
| Farbe | `text-gray-600` (#666) |

**Verwendung:** Datenschutzhinweise, Timestamps, Footer-Texte, Input-Hilfetexte.

---

## 4. Typografie-Hierarchie-Zusammenfassung

```
T1 Display     48–72px  Bold 700     → Einmal pro Seite, Hauptaussage
T2 Heading     24–30px  Semibold 600 → Pro Sektion oder Karte
T3 Subheading  14px     Bold 700     → Labels, Badges, Kategorie
T4 Body        16px     Normal 400   → Fließtext, Beschreibungen
T5 Caption     12px     Normal 400   → Metainfo, Hinweise, Footer
```

Zwischen T1 und T2 besteht immer ein klarer Größensprung. Niemals zwei T1-Texte nebeneinander.

---

## 5. Sektions-Muster (Dark / Light)

Die Website wechselt konsequent zwischen Dark und Light Sections:

| Section | Hintergrund | Texte T1–T4 | Caption T5 |
|---|---|---|---|
| Dark (`.section-black`) | `#000` | `#ffffff` | `#999999` |
| Light (`.section-white`) | `#ffffff` | `#000000` | `#666666` |

**Niemals** Grau-Hintergründe für Full-Screen-Sections verwenden.

---

## 6. Interaktive Elemente

### Primary Button (auf Dark Section)
```css
background: #ffffff;
color: #000000;
font: 14px / 1 Inter Bold (T3);
padding: 12px 32px;
border: none;
```

### Primary Button (auf Light Section)
```css
background: #000000;
color: #ffffff;
font: 14px / 1 Inter Bold (T3);
padding: 12px 32px;
border: none;
```

### Ghost Button / Link
```css
background: transparent;
color: currentColor;
font: 14px Inter Normal (T5-Gewicht);
border: 1px solid currentColor;
padding: 10px 28px;
```

**Keine Hover-Farben außer Opacity-Reduktion** (`opacity: 0.8`). Kein Farbwechsel.

---

## 7. Formularfelder

```css
/* Input / Select / Textarea */
background: transparent;
border: 1px solid #000 (auf Light) / 1px solid #fff (auf Dark);
color: #000 / #fff;
font: 14px Inter Normal (T4-Größe, aber keine leading-relaxed hier);
padding: 10px 14px;
border-radius: 0;   /* kein Radius — Tau Process Style ist kantenscharf */
```

**Kein border-radius** auf Formularelementen oder Buttons. Der Stil ist geometrisch und kantenscharf.

---

## 8. Abstands-System

Konsistente Abstände auf Basis eines 8px-Grids:

| Token | Wert | Verwendung |
|---|---|---|
| `gap-1` | 4px | Innerhalb von Badges |
| `gap-2` | 8px | Zwischen Label und Feld |
| `gap-4` | 16px | Zwischen Absätzen |
| `gap-6` | 24px | Zwischen Karten / Sektions-Elementen |
| `gap-8` | 32px | Karten-Padding, Sektions-Padding horizontal |
| `gap-12` | 48px | Vertikaler Abstand zwischen Sektions-Blöcken |
| `gap-16` | 64px | Sektions-Padding vertikal (Desktop) |

---

## 9. PDF-Dokumente (pdfkit)

Da PDFs keine Web-Fonts laden, gelten folgende Äquivalente:

| Web-Stil | PDF-Font |
|---|---|
| T1 Display (Bold) | `Helvetica-Bold`, 24–32pt |
| T2 Heading (Semibold) | `Helvetica-Bold`, 13–16pt |
| T3 Subheading (Bold) | `Helvetica-Bold`, 9–10pt, UPPERCASE |
| T4 Body (Normal) | `Helvetica`, 9–10pt |
| T5 Caption (Normal) | `Helvetica`, 7–8pt, Farbe #999 |

---

## 10. Was verboten ist

- Farbige Texte außer Schwarz, Weiß und Grau
- Andere Schriftfamilien (kein Roboto, Poppins, etc.)
- `border-radius` auf Buttons, Inputs oder Karten (außer Team-Profilbild)
- `font-thin` (100), `font-extralight` (200), `font-light` (300) — zu schwach für die Marke
- `font-extrabold` (800), `font-black` (900) — zu aggressiv
- Animierte Texte außer Fade-In via Framer Motion
- Drop shadows auf Texten
