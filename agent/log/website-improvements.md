# Website-Verbesserungen: Tau Process House

> Stand: März 2026 | Prioritäten: 🔴 Kritisch · 🟠 Hoch · 🟡 Mittel · 🟢 Nice-to-have

---

## ✅ Behoben

| # | Thema | Details |
|---|-------|---------|
| 1 | SEO-Metadaten | Title, description, Open Graph, Twitter Card — jetzt bilingual via `next-intl` |
| 2 | JSON-LD | Person (Felix) + Organization Schema mit `founder`/`worksFor`, `knowsAbout`, `hasOfferCatalog` — jetzt sprachabhängig in `[locale]/layout.tsx` |
| 3 | sitemap.ts | Bilingual mit hreflang-Alternates für DE/EN |
| 4 | robots.ts | GPTBot, ClaudeBot, PerplexityBot explizit erlaubt |
| 5 | llms.txt | `/public/llms.txt` mit Felix-Profil und CTA-Text |
| 6 | FAQ-Seite | `/faq` mit FAQPage JSON-LD, bilingual (faq.json mit `question.de`/`question.en`) |
| 7 | Datenschutzerklärung | `/privacy` vorhanden |
| 8 | E-Mail-Link | ContactSection: `mailto:info@tauprocess.de` |
| 9 | OurWork Detail-Bug | `key="detail-panel"` (fix) |
| 10 | OurServices Karten | Höhe 20rem, Beschreibungstext 18px, Pfeile entfernt |
| 11 | Zoho-Banner Position | Über den Karten, `margin: '0 20%'`, 2-Spalten-Grid |
| 12 | KPI-Animation | 0.8s, neu bei jedem Viewport-Eintritt |
| 13 | Komponenten-Umbenennung | WhatSection / HowSection → bestehende Namen, alle mit `useTranslations()` |
| 14 | i18n-Infrastruktur | `next-intl` mit `[locale]/`-Routing, DE/EN Toggle, Übersetzungsdateien, Middleware |
| 15 | Google Consent Mode v2 | `gtag('consent', 'default', {...denied})` VOR GA-Script in `[locale]/layout.tsx` |
| 16 | `<html lang>` dynamisch | `lang={locale}` statt hardcodiert `"de"` |
| 17 | hreflang-Tags | `alternates.languages` in Metadata für alle Seiten |
| 18 | imprint `'use client'` entfernt | Imprint ist jetzt Server Component via `getTranslations()` |

---

## 🔴 Kritisch — Offen

### 1. `.env.local` enthält Klartext-Secrets

**Alle API-Keys liegen im `.env.local`:**
- `OPENROUTER_API_KEY`
- `RESEND_API_KEY`
- `ZOHO_CRM_CLIENT_ID` / `CLIENT_SECRET` / `REFRESH_TOKEN`

**Risiko:** Falls `.env.local` jemals in die Git-Historie geraten ist, sind alle Credentials kompromittiert.

**Fix:**
1. Prüfen, ob `.env.local` in der Git-Historie ist (`git log --all --full-history -- .env.local`)
2. Falls ja: Alle Credentials sofort rotieren (OpenRouter, Resend, Zoho CRM)
3. `.env.local` aus Git-Historie entfernen (`git filter-repo`)
4. Sicherstellen, dass `.env.local` in `.gitignore` steht

---

### 2. Hardcoded BCC-E-Mail in `/api/zoho-check/send-pdf`

```typescript
bcc: 'rimbas.itb+crmcheck@gmail.com',
```

Jede PDF-Mail wird an eine persönliche Gmail-Adresse BCC'd. Das ist:
- DSGVO-relevant (nicht in Datenschutzerklärung erwähnt)
- Sollte über Umgebungsvariable konfigurierbar sein

**Fix:** `bcc: process.env.BCC_EMAIL || undefined` + in Datenschutzerklärung dokumentieren.

---

### 3. Kein Rate-Limiting auf API-Routen

Alle `/api/zoho-check/`-Endpunkte haben kein Rate-Limiting:
- `/extract` — ruft OpenRouter API auf (kostenpflichtig)
- `/analyze` — nutzt Gemini Pro (kostenpflichtig)
- `/send-pdf` — sendet E-Mails via Resend

**Risiko:** Angreifer können unbegrenzt API-Calls auslösen → Kostenexplosion, DoS.

**Fix:** Rate-Limiting via `@vercel/kv` + `@upstash/ratelimit` oder Middleware mit IP-basiertem Throttling (z.B. 5 Anfragen/Stunde pro IP).

---

## 🟠 Hoch — Offen

### 4. Unzureichende Input-Validierung in API-Routen

`/api/zoho-check/extract` prüft nur ob Felder existieren, aber nicht:
- E-Mail-Format (nur client-seitig)
- Maximale Länge von `moduleList` (könnte MBs an Text enthalten)
- URL-Validierung für `website`

**Fix:** Zod-Schema-Validierung für alle Eingaben:
```typescript
const schema = z.object({
  email: z.string().email().max(254),
  moduleList: z.string().min(10).max(50000),
  licenseType: z.enum(['standalone', 'bundle', 'zoho-one']),
});
```

### 5. Fehlender CORS-Schutz auf POST-Endpunkten

API-Routen akzeptieren POST-Requests ohne Origin-Prüfung. Externe Websites können Formulare an die API senden.

**Fix:** Origin-Header prüfen in allen POST-Handlern:
```typescript
const origin = request.headers.get('origin');
if (origin && !origin.includes('tauprocess.de')) {
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}
```

### 6. Fehlende Security-Header in `next.config.ts`

Kein CSP, kein X-Frame-Options, kein HSTS. Das ermöglicht:
- Clickjacking (Iframe-Embedding)
- MIME-Sniffing
- Kein erzwungenes HTTPS

**Fix:** `headers()` in `next.config.ts` hinzufügen:
```typescript
async headers() {
  return [{
    source: '/(.*)',
    headers: [
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
    ],
  }];
}
```

### 7. OG-Image fehlt

`/public/img/og-image.png` (1200×630px) wird in Metadata referenziert, existiert aber nicht. Social-Previews zeigen kein Bild.

**Fix:** Bild erstellen und unter `/public/img/og-image.png` speichern.

### 8. CRM-Lead-Fallback gibt `success: true` bei fehlendem CRM

```typescript
if (!process.env.ZOHO_CRM_CLIENT_ID) {
  return NextResponse.json({ success: true, note: '...' });
}
```

Gibt Erfolg zurück, auch wenn Lead nicht gespeichert wurde.

**Fix:** `success: false` + Monitoring-Alert.

---

## 🟡 Mittel — Offen

### 9. i18n-Lücke: Zoho-Check-Komponenten komplett deutsch hartcodiert

Alle `/src/components/zoho-check/`-Dateien nutzen hartcodierten deutschen Text:
- `CheckHero.tsx` — "Wie gut ist Ihr Zoho CRM wirklich aufgestellt?"
- `StepLoading.tsx` — "Website wird analysiert …", "Module werden klassifiziert …"
- `StepInput.tsx` — "CRM-Analyse starten", "Schritt 1 — Ihre Geschäfts-E-Mail"
- `ModuleGuidePanel.tsx` — Alle Guide-Schritte
- `StepResults.tsx` — Alle Ergebnis-Labels
- `PdfEmailModal.tsx` — Modal-Texte

**Fix:** Alle Strings in `messages/de.json` + `messages/en.json` unter `zohoCheck`-Namespace extrahieren und `useTranslations('zohoCheck')` verwenden.

### 10. Fehlende ARIA-Labels und Keyboard-Navigation

- Buttons ohne `aria-label` (besonders in zoho-check)
- Carousel ohne Keyboard-Navigation (Pfeiltasten)
- Formulare ohne `aria-describedby` für Fehlermeldungen
- Kein `role="alert"` auf Fehlerzuständen

### 11. OurWorkSection reaktivieren

Sobald Case-Study-Inhalte in `src/data/work.json` bereit sind. `work.json` braucht auch bilinguales Format wie `faq.json`.

### 12. `console.error` in Client-Code exponiert

```typescript
.catch(console.error); // In zoho-check/page.tsx
```

Interne Fehler werden in der Browser-Konsole geloggt. Besser: Silent fail + Monitoring.

---

## 🟢 Nice-to-have — Offen

### 13. Platzhalter-Teammitglied entfernen

`[Your Name Here]` mit `placeholder.png` wird öffentlich im Carousel angezeigt.

### 14. Error Boundary fehlt

Kein React Error Boundary. Component-Fehler crashen die gesamte Seite.

### 15. Default-Next.js-Assets entfernen

`public/file.svg`, `public/globe.svg`, `public/next.svg`, `public/window.svg` — ungenutzt.

### 16. Navigationsdots: Hartcodierte Anzahl

`[0, 1, 2, 3, 4].map(...)` in `page.tsx` — bei Sektionsänderung manuell anpassen.

### 17. Canonical-URL Optimierung

Aktuell: `canonical: https://tauprocess.de/de`. Besser für Default-Locale: `canonical: https://tauprocess.de` (ohne `/de`-Prefix).
