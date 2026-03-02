# Website-Verbesserungen: Tau Process House

> Erstellt: März 2026 | Prioritäten: 🔴 Kritisch · 🟠 Hoch · 🟡 Mittel · 🟢 Nice-to-have

---

## Was gut funktioniert ✅

Bevor die Verbesserungspunkte aufgeführt werden: Die Website hat eine solide Grundlage.

- **Saubere Komponentenstruktur** – jede Sektion ist eine eigene Datei, gut wartbar
- **Scroll-Snap One-Pager** – flüssiger, moderner Scrolleffekt, klare User Journey
- **Dynamische Imports** – `next/dynamic` sorgt für Code-Splitting, bessere Ladezeit
- **Inter-Font mit `display: swap`** – verhindert unsichtbaren Text während des Ladens
- **Google Analytics + CookieYes** – Tracking-Infrastruktur vorhanden
- **TypeScript** – Typensicherheit, bessere Wartbarkeit
- **Responsive Design** – Mobile-Anpassungen vorhanden (dvh, Swipe im Karussell)
- **Framer Motion** – dezente, professionelle Animationen
- **Impressum** – rechtliche Grundlage vorhanden
- **Aria-Labels auf Navigationsdots** – Barrierefreiheit ansatzweise berücksichtigt
- **Git-Versionierung** – Änderungsverlauf nachvollziehbar

---

## Verbesserungen

---

### 🔴 KRITISCH – Sofort beheben

---

#### 1. DSGVO: Google Analytics lädt vor Cookie-Consent

**Problem:** Google Analytics ist mit `strategy="afterInteractive"` eingebunden und feuert unmittelbar nach dem Seitenload. CookieYes lädt mit `strategy="lazyOnload"` – also *danach*. Das bedeutet: Tracking findet statt, bevor der Nutzer seine Einwilligung gegeben hat.

**Risiko:** Verstoß gegen DSGVO/TTDSG, mögliche Abmahnungen und Bußgelder.

**Lösung:** GA4 erst nach expliziter Einwilligung aktivieren. Optionen:
- CookieYes bietet einen Callback (`dataLayer`-Push nach Consent), der GA4 nachladen kann
- `gtag('consent', 'default', { analytics_storage: 'denied' })` als Startpunkt setzen und nach Consent updaten (Google Consent Mode v2)

**Beispiel für Consent Mode v2 (vor dem GA-Script einfügen):**
```javascript
gtag('consent', 'default', {
  'analytics_storage': 'denied',
  'ad_storage': 'denied',
  'wait_for_update': 500
});
```

---

#### 2. Fehlende Datenschutzerklärung

**Problem:** Für eine geschäftliche Website aus Deutschland ist eine **Datenschutzerklärung** (Privacy Policy) gesetzlich vorgeschrieben (DSGVO Art. 13/14). Aktuell gibt es nur ein Impressum.

**Risiko:** Gleich wie oben – rechtliche Konsequenzen.

**Lösung:** Seite `/privacy` (oder `/datenschutz`) erstellen mit Angaben zu:
- Welche Daten werden erhoben (GA4, CookieYes, Kontakt-E-Mail)
- Zweck der Verarbeitung
- Aufbewahrungsdauer
- Rechte der Nutzer (Auskunft, Löschung, Widerspruch)
- Verweis auf Google Analytics Datenverarbeitung

Link von ContactSection und Imprint aus verlinken.

---

#### 3. E-Mail-Adresse stimmt nicht mit `mailto`-Ziel überein

**Problem:** In `ContactSection.tsx` wird `info@tauprocess.de` angezeigt, aber der `href`-Wert lautet `mailto:rimbas.itb+info@gmail.com`. Klickt ein Nutzer auf die Adresse, öffnet sein Mailprogramm mit der falschen Adresse.

**Datei:** `src/components/ContactSection.tsx`, Zeile 11–12

**Aktueller Code:**
```tsx
<a href="mailto:rimbas.itb+info@gmail.com" className="text-xl hover:underline">
  info@tauprocess.de
</a>
```

**Fix:** `href` auf `mailto:info@tauprocess.de` ändern (oder die angezeigte Adresse anpassen, falls die Gmail-Adresse beabsichtigt ist).

---

### 🟠 HOCH – Bald beheben

---

#### 4. Platzhalter-Teammitglied entfernen

**Problem:** Der TeamCarousel enthält noch den Eintrag `[Your Name Here]` mit `placeholder.png`. Das sieht unprofessionell aus.

**Datei:** `src/components/TeamCarousel.tsx`, Zeilen 18–24

**Lösung:** Entweder mit einem echten Teammitglied befüllen oder den Eintrag entfernen. Wenn Recruiting-Interesse gezeigt werden soll, lieber einen gesonderten Hinweis in der ContactSection hinzufügen.

---

#### 5. `[x]`-Bullet-Punkte in HowSection sind unformatiert

**Problem:** Die Listen in `HowSection.tsx` nutzen `[x]` als Bullet-Marker (wie in einer Markdown-Checkliste). Im Browser werden diese als roher Text angezeigt – unfertig wirkend.

**Datei:** `src/components/HowSection.tsx`, Zeilen 10–13 und 17–20

**Lösung:** Entweder echte `<ul><li>`-Elemente mit custom Styling verwenden, oder CSS-Checkmark-Icons (`::before { content: '✓' }`) einsetzen, oder Tailwind-Icons/SVG-Icons.

---

#### 6. SEO: Metadaten sind minimal

**Problem:** Die `metadata` in `layout.tsx` enthält nur `title` und `description`. Für moderne SEO und Social Sharing fehlen:

- `og:title`, `og:description`, `og:image` (Open Graph für LinkedIn/Twitter-Vorschauen)
- `twitter:card`
- Canonical URL
- Strukturierte Daten (JSON-LD: Organization, LocalBusiness)

**Datei:** `src/app/layout.tsx`

**Lösung:** Next.js App Router unterstützt vollständige Metadaten-Objekte:
```typescript
export const metadata: Metadata = {
  title: "Tau Process House",
  description: "Process Automation for your company",
  openGraph: {
    title: "Tau Process House",
    description: "Process Automation for your company",
    url: "https://tauprocess.de",
    siteName: "Tau Process House",
    images: [{ url: "/img/og-image.png", width: 1200, height: 630 }],
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tau Process House",
    description: "Process Automation for your company",
    images: ["/img/og-image.png"],
  },
};
```

---

#### 7. Fehlende `sitemap.xml` und `robots.txt`

**Problem:** Ohne diese Dateien wissen Suchmaschinen nicht, wie die Seite gecrawlt werden soll. Next.js App Router unterstützt beide nativ.

**Lösung:** Dateien `src/app/sitemap.ts` und `src/app/robots.ts` erstellen:

```typescript
// src/app/sitemap.ts
export default function sitemap() {
  return [
    { url: 'https://tauprocess.de', lastModified: new Date() },
    { url: 'https://tauprocess.de/imprint', lastModified: new Date() },
  ];
}
```

```typescript
// src/app/robots.ts
export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://tauprocess.de/sitemap.xml',
  };
}
```

---

#### 8. `imprint/page.tsx` unnötig als Client Component

**Problem:** Die Impressum-Seite ist mit `'use client'` markiert, nutzt aber keine Client-Features (keine Hooks, keine Browser-APIs, keine Event-Handler). Das verhindert Server-Side-Rendering und schadet Performance und SEO.

**Datei:** `src/app/imprint/page.tsx`, Zeile 1

**Fix:** `'use client'` entfernen. Die Seite wird dann als Server Component gerendert.

---

#### 9. EU-ODR-Link ist kein anklickbarer Link

**Problem:** In der Impressum-Seite wird die EU-ODR-Plattform als Klartext-URL angezeigt, nicht als anklickbarer Hyperlink.

**Datei:** `src/app/imprint/page.tsx`, Zeile 45

**Aktuell:**
```tsx
<p>The European Commission provides a platform for online dispute resolution (ODR): https://ec.europa.eu/consumers/odr</p>
```

**Fix:**
```tsx
<p>
  The European Commission provides a platform for online dispute resolution (ODR):{" "}
  <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="underline">
    https://ec.europa.eu/consumers/odr
  </a>
</p>
```

---

### 🟡 MITTEL – Im nächsten Entwicklungszyklus

---

#### 10. Doppelte Media-Query-Regel in globals.css

**Problem:** Im Mobile-Breakpoint (`max-width: 768px`) gibt es zwei aufeinanderfolgende, widersprüchliche Regeln für `.section-black h2`:

```css
.section-black h2 { margin-bottom: 2rem !important; }  /* Zeile 127–129 */
.section-black h2 { margin-bottom: 0.5rem !important; } /* Zeile 131–133 */
```

Die zweite Regel überschreibt die erste. Die erste hat keinen Effekt.

**Datei:** `src/app/globals.css`, Zeilen 126–133

**Fix:** Die erste Regel entfernen oder beide in eine sinnvolle zusammenführen.

---

#### 11. Übermäßige Nutzung von `!important` im CSS

**Problem:** In `globals.css` werden viele Styles mit `!important` erzwungen, um Tailwind-Defaults zu überschreiben. Das ist ein Zeichen, dass die Tailwind-Konfiguration und das globale CSS strukturell nicht gut abgestimmt sind.

**Betroffene Regeln:** Padding auf `.max-w-6xl`, `.max-w-5xl`, `.max-w-3xl`, Margin auf `.section-black h2`, Padding auf `.p-6.rounded-lg`.

**Lösung:** Tailwind `tailwind.config.ts` um eigene Werte erweitern, oder Padding/Spacing direkt in den Komponenten via Tailwind-Klassen steuern statt im globalen CSS zu überschreiben.

---

#### 12. Hartcodierte Sektions-Anzahl in Navigationsdots

**Problem:** In `page.tsx` ist die Anzahl der Navigationsdots mit `[0, 1, 2, 3, 4, 5]` fest einprogrammiert. Wird eine Sektion hinzugefügt oder entfernt, muss dies manuell angepasst werden.

**Datei:** `src/app/page.tsx`, Zeile 66

**Fix:** Die Anzahl aus einem Array von Sektionsnamen ableiten, das an zentraler Stelle gepflegt wird:
```tsx
const sections = ['Hero', 'What', 'How', 'Why', 'Team', 'Contact'];
// ...
{sections.map((_, index) => (
  <div key={index} ... />
))}
```

---

#### 13. TeamCarousel: Keine Keyboard-Navigation

**Problem:** Das Team-Karussell unterstützt nur Maus-Klick und Touch-Swipe. Tastatur-Nutzer (Tab + Enter/Pfeiltasten) sowie Screen-Reader-Nutzer haben keinen Zugriff auf die Navigation.

**Datei:** `src/components/TeamCarousel.tsx`

**Lösung:**
- `onKeyDown`-Handler für Pfeil-Links/Rechts hinzufügen
- `role="region"` und `aria-label="Team members"` auf den Container
- `aria-label` auf die Vor/Zurück-Buttons mit aktuellem Mitgliedsnamen

---

#### 14. `page.tsx` als Client Component begrenzt SSR/SSG

**Problem:** Die Hauptseite `page.tsx` ist vollständig als `'use client'` markiert. Das verhindert Server-Side Rendering für die gesamte Seite und schadet SEO (Crawler sehen bei JavaScript-Problemen keine Inhalte) und initialer Ladeperformance.

**Lösung:** State-Logik (Navigationsdots, Scroll-Listener) in eine separate Client-Komponente auslagern (z.B. `SectionNavigation.tsx`), während die Sektionen selbst als Server Components gerendert werden.

---

#### 15. Kein 404-Handling und keine Error-Boundary

**Problem:** Bei nicht gefundenen Routen zeigt Next.js die Default-404-Seite. Es gibt keine `not-found.tsx` oder `error.tsx`.

**Lösung:**
```
src/app/not-found.tsx   ← Custom 404-Seite im Stil der Website
src/app/error.tsx       ← Globale Error-Boundary
```

---

#### 16. Kein CTA (Call to Action) auf der Hero-Sektion

**Problem:** Die Startseite zeigt nur Logo und Tagline. Es gibt kein Element, das den Nutzer zur nächsten Aktion leitet – weder einen "Jetzt kontaktieren"-Button noch einen Hinweis zum Scrollen.

**Empfehlung:** Einen Scroll-Indikator (z.B. animierter Pfeil nach unten) oder einen CTA-Button "Get in touch" hinzufügen, der zur ContactSection scrollt.

---

### 🟢 NICE-TO-HAVE – Langfristig

---

#### 17. Ungenutzte Default-Assets entfernen

**Problem:** `public/file.svg`, `public/globe.svg`, `public/next.svg`, `public/window.svg` sind Next.js-Boilerplate-Assets, die nicht auf der Website verwendet werden.

**Fix:** Diese Dateien löschen – kleineres Deployment-Paket, saubereres Repository.

---

#### 18. Logo-Formate konsolidieren

**Problem:** Das Logo existiert in drei Formaten: `.png`, `.svg`, `.webp`. Nur `.webp` wird tatsächlich verwendet.

**Empfehlung:** `.png` und `.svg` behalten (`.svg` für Skalierbarkeit ideal), `.png` und `.webp` nach Bedarf. Jedoch: Für den Web-Einsatz wäre `.svg` als primäres Format optimal (verlustfrei, skalierbar, kleiner). Das `alt`-Attribut "Process House Logo" (statt "Tau Process House Logo") könnte präzisiert werden.

---

#### 19. Teamdaten aus dem Code auslagern

**Problem:** Die Teamdaten (Namen, Rollen, Fotos, Zitate) sind direkt in `TeamCarousel.tsx` hartcodiert. Das erschwert das Aktualisieren ohne Entwickler-Eingriff.

**Lösung:** Daten in eine separate Datei auslagern, z.B. `src/data/team.ts`, oder perspektivisch aus einem CMS (Contentful, Sanity, Notion API) laden.

---

#### 20. `body`-Font: Konflikt zwischen globalem CSS und Next.js Font

**Problem:** `globals.css` setzt `font-family: Arial, Helvetica, sans-serif` auf `body`. Gleichzeitig wird Inter über `next/font` geladen und als Klasse auf `<html>` gesetzt. Die CSS-Kaskade sorgt dafür, dass Inter gewinnt (da er als Klasse näher am Element steht), aber die Redundanz im CSS ist verwirrend.

**Fix:** Die `font-family`-Regel in `globals.css` entfernen, da Inter über Next.js Font vollständig konfiguriert wird.

---

## Zusammenfassung nach Priorität

| Priorität | Anzahl | Themen |
|---|---|---|
| 🔴 Kritisch | 3 | DSGVO/Analytics, Datenschutzerklärung, E-Mail-Bug |
| 🟠 Hoch | 6 | Platzhalter Team, `[x]`-Bullets, SEO/Meta, Sitemap, Client Component Imprint, ODR-Link |
| 🟡 Mittel | 6 | CSS-Doppelregel, `!important`, Dots hardcoded, Keyboard-Nav, SSR, 404/Error |
| 🟢 Nice-to-have | 4 | Default-Assets, Logo, Teamdaten, Font-Konflikt |

**Empfohlene Reihenfolge:** Zuerst die kritischen Punkte (1–3) angehen, da diese rechtliche und funktionale Auswirkungen haben. Danach die hohen Punkte (4–9), die das professionelle Erscheinungsbild und die Auffindbarkeit betreffen.
