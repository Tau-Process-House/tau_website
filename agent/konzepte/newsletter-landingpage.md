# Newsletter-Landingpage — Konzept (`/[locale]/zoho-news`)

> **Status:** Entwurf · Felix-Review ausstehend
> **Verwandte Dokumente:**
> - Backend-Service & Datenmodell: `Tau Process House/Zoho Automations/news_feed/Konzept.md`
> - Subpage-Pattern: `agent/konzepte/tau-agent-launch.md`, `agent/konzepte/agent-teaser-section.md`
> - Style: `agent/guides/style_guide.md`

---

## 1. Ziel

Eine eigenständige Unterseite für den **Zoho News Feed / Newsletter** — analog zu `/tau-zoho-agent`. Sie soll:

- den (kostenlosen) Newsletter als Lead-Magnet positionieren
- dem Besucher in unter 30 Sekunden klar machen, **was er bekommt** (kuratierte Zoho-Updates als Use-Cases — nicht als Feature-Liste)
- **was er tun muss** (E-Mail + genutzte Zoho-Apps angeben → bestätigen → letzten Newsletter erhalten)
- die Anmeldung über ein **eingebettetes Zoho Form** abschließen lassen
- als Funnel-Eintritt für den späteren Pro-Tier (Systemanalyse, 29–49 €/Monat) dienen — siehe `news_feed/Konzept.md`, Kapitel 10

---

## 2. Position im Website-Gefüge

### 2.1 Neue Route

```
/[locale]/zoho-news     ← neue Unterseite, scroll-snap-frei (klassischer Long-Scroll)
```

**Slug-Empfehlung:** `zoho-news` (kurz, sprechend, sprachneutral, SEO-relevant für „Zoho News" / „Zoho Updates"). Alternativen: `news`, `newsletter`, `zoho-updates`. *Entscheidung Felix.*

### 2.2 Hauptseiten-Teaser (Iteration 2 — optional)

Ein Newsletter-Teaser-Slide auf der Hauptseite ist möglich, aber **nicht im MVP**. Begründung: die Hauptseite hat heute 6 Slides (Hero / Philosophy / Services / Tau-Agent-Teaser / Team / Contact). Eine 7. Slide würde den Scroll-Snap überlasten. Der Newsletter wird im MVP über folgende Punkte erreicht:

- TopNav-Link „Newsletter" (geplant in `tau-agent-launch.md` 1.6 — TopNav existiert noch nicht, wird mitgebaut)
- Footer-Link in `ContactSection` und in der `AgentFooter`-Komponente
- CTA-Block am Ende der Tau-Agent-Subpage („Bleib auf dem Laufenden")
- CTA-Block in der `/zoho-check`-Ergebnis-Page („Hol dir monatliche Updates zu deinem Setup")

Ein dedizierter Hauptseiten-Slide kann in Iteration 2 nachgerüstet werden — Konzept analog `agent-teaser-section.md`.

---

## 3. Subpage-Struktur — Drei Sektionen

Die Subpage folgt dem Tau-Process-House-Style-Guide (SW/Grau, Inter, kantenscharf), nicht dem Agent-Stil (Goldakzent #C8962E ist hier verboten).

```
┌─────────────────────────────────────────────────────────────┐
│  TopNav (transparent → blur on scroll)                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Sektion 1 — Hero / Wertversprechen                  weiß    │
│  „Monatliche Zoho-Updates — kuratiert auf dein Setup"        │
│  Subtitel + 3 Use-Case-Cards                                 │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│  Sektion 2 — So funktioniert es                      schwarz │
│  3-Step-Flow: Anmelden → Bestätigen → Letzten Newsletter     │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│  Sektion 3 — Anmeldung                               weiß    │
│  Zoho-Form-Embed (E-Mail + Multi-Select Zoho-Apps)          │
│  + DSGVO-Hinweis + Datenschutz-Link                          │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│  Footer (analog AgentFooter, kein Goldakzent)                │
└─────────────────────────────────────────────────────────────┘
```

### 3.1 Sektion 1 — Hero & Wertversprechen

**Ziel:** Use-Case-Framing, nicht Feature-Liste.

**Inhalt (DE, EN-Übersetzungen analog):**

| Element | Text |
|---|---|
| Pre-Label (T3) | `MONATLICH · KOSTENLOS` |
| Headline (T1) | `Ein Zoho-Newsletter,` `der nichts mit Marketing zu tun hat.` |
| Subtitel (T4) | `Zoho veröffentlicht jeden Monat hunderte Updates über 40+ Produkte. Wir lesen alles, behalten nur das, was deine Zoho-Apps betrifft, und übersetzen es in Use-Cases — was kannst du damit machen, das vorher nicht ging?` |
| Beleg (T5) | `Zuletzt 47 Updates kuratiert · 17 Zoho-Quellen · monatlich` (dynamisch befüllbar aus News-Feed-Backend) |

**3 Use-Case-Karten** (anstelle einer Feature-Aufzählung) — zeigen exemplarisch, wie ein Eintrag im Newsletter aussieht:

| Karte | Format |
|---|---|
| Karte 1 | **Statt** „Webhook-Custom-Headers verfügbar" → **wird** „Du kannst jetzt CRM-Webhooks an Systeme schicken, die einen API-Key im Header verlangen — z. B. dein DATEV-Konnektor. Vorher: Workaround über Deluge nötig." |
| Karte 2 | **Statt** „Blueprint Deluge-Trigger" → **wird** „Wenn du heute manuell Status-Wechsel im Sales-Prozess validierst, kannst du das ab jetzt im Blueprint via Deluge prüfen — der manuelle Schritt entfällt." |
| Karte 3 | **Statt** „Zoho Books — Multi-Currency Bank Feed" → **wird** „Wenn du Kunden in mehreren Währungen abrechnest, kannst du jetzt einen Bankauszug in EUR und USD direkt importieren statt ihn manuell zu splitten." |

Jede Karte = T2-Heading „Vorher / Jetzt" + zwei T4-Absätze. Visuelles Pattern: zweispaltig (links = Zoho-Originaltext, rechts = Use-Case-Übersetzung) oder als Flip-Card analog `OurServicesSection`.

**Keine** Anmelde-CTA in Sektion 1 — der Anker ist Sektion 3.

### 3.2 Sektion 2 — So funktioniert es

**Ziel:** klare Erwartung an den Anmeldeprozess, baut Vertrauen auf.

3-Step-Komponente, schwarzer Hintergrund, weiße Schrift, T2 + T4. Pattern analog zu `AgentHowItWorks`.

| Step | Headline | Beschreibung |
|---|---|---|
| 1 | `Anmelden` | `E-Mail-Adresse eintragen und auswählen, welche Zoho-Apps du nutzt (CRM, Books, Desk …). Nur diese Apps tauchen in deinem Newsletter auf.` |
| 2 | `E-Mail bestätigen` | `Wir schicken dir einen Bestätigungslink (Double-Opt-In, DSGVO-konform). Erst danach landen Updates bei dir.` |
| 3 | `Letzten Newsletter erhalten` | `Direkt nach der Bestätigung bekommst du die letzte Ausgabe — damit du sofort siehst, was dich erwartet.` |

**Visuell:** drei nummerierte Karten nebeneinander (Desktop), gestapelt (Mobile). Symbol pro Step: Mail-Icon, Check-Icon, Newsletter-Icon (alle aus Lucide, schwarz/weiß).

**Optional (Iteration 2):** kleines Vorschau-Bild der Newsletter-Ausgabe als Hover-Asset.

### 3.3 Sektion 3 — Anmeldung (Zoho Form)

**Ziel:** Conversion. Reibung minimal halten.

**Komponente:** `NewsletterSignupSection.tsx` mit eingebettetem Zoho Form.

**Form-Felder (im Zoho Form konfiguriert):**

| Feld | Typ | Pflicht | Notiz |
|---|---|---|---|
| Vorname | Text | optional | für persönliche Anrede im Newsletter |
| E-Mail | E-Mail | ja | mit Format-Validierung |
| Genutzte Zoho-Apps | Multi-Select-Checkbox-Liste | ja, mind. 1 | initial: CRM, Books, Desk, Projects, Mail, Forms, Deluge, Analytics, Inventory, Sign, Campaigns, Cliq, WorkDrive, One — exakt die im News-Feed-Service registrierten Quellen |
| Frequenz | Single-Choice | optional | Default „Monatlich" — Vorbereitung für späteren wöchentlich/sofort-Tier |
| DSGVO-Checkbox | Bool | ja | Pflichtfeld mit Link zur Datenschutzerklärung |

**Embed-Variante (Empfehlung):**

Zoho Forms bietet drei Embed-Optionen:

| Variante | Pro | Contra |
|---|---|---|
| **iFrame** | sofort einsatzbereit, Felix kann Formfelder in Zoho ändern ohne Code-Deploy | optisch nicht 100 % zum Style Guide passend, kein Dark-Mode-Theme ohne Zoho-Pro |
| **JavaScript-Embed** | bessere Style-Anpassung möglich | schwerer mit Next.js zu integrieren, GA4-Consent-Mode-konform machen |
| **Custom-React-Form gegen Zoho Forms API** | volle Style-Kontrolle | Aufwand höher, MVP-Scope sprengt |

**MVP-Empfehlung: iFrame**. Style-Anpassungen werden über das Zoho-Form-Theme gemacht. Für Iteration 2 → Custom-React-Form, falls Conversion-Daten zeigen, dass das iFrame Friction erzeugt.

**Datenschutz-Hinweis (T5, unter dem Form):**

> Du kannst dich jederzeit mit einem Klick abmelden. Wir geben deine Daten nicht weiter und nutzen sie ausschließlich, um dir den Newsletter zu schicken. Mehr in unserer [Datenschutzerklärung](/privacy).

---

## 4. Datenfluss & Backend-Integration

### 4.1 Architektur-Skizze

```
┌──────────────────┐    ┌─────────────────┐    ┌──────────────────┐
│  Website         │    │  Zoho Form      │    │  Zoho CRM        │
│  /zoho-news      │───▶│  (Newsletter    │───▶│  Custom Module   │
│  (iFrame Embed)  │    │  Signup)        │    │  „Newsletter_    │
└──────────────────┘    └─────────────────┘    │   Subscribers"   │
                                ↓               └────────┬─────────┘
                        Double-Opt-In Mail              │
                        (Zoho Form Built-in)            │
                                                ┌───────▼────────┐
                                                │ news_feed      │
                                                │ Service        │
                                                │ (Port 5005)    │
                                                │                │
                                                │ - Pull Subs via│
                                                │   Zoho API     │
                                                │ - Build digest │
                                                │ - Render HTML  │
                                                │ - Send via     │
                                                │   Resend/SMTP  │
                                                └────────────────┘
```

### 4.2 Wo lebt der Subscriber?

**Empfehlung: Zoho CRM Custom Module „Newsletter_Subscribers"** (Single Source of Truth) statt JSON-Datei im news_feed-Service. Begründung:

- Felix nutzt Zoho CRM ohnehin als Lead-Datenbank
- Newsletter-Subscriber sind potenzielle Pro-Tier-Kunden — Lead-Tracking direkt im CRM
- DSGVO-Lösch-/Auskunftsrechte zentral ein einzigem System
- Bestehende OAuth-Infrastruktur (genutzt von `/zoho-check/crm-lead/`) wird wiederverwendet

**Alternative (einfacher MVP):** Zoho Form schreibt in seinen eigenen Form-Storage und news_feed liest via Zoho Forms API. Spart das Anlegen eines CRM-Moduls, koppelt aber Subscriber an Zoho Forms statt CRM. → für ersten Wurf okay, sollte vor dem Pro-Tier-Launch in CRM migriert werden.

**Entscheidung Felix:** CRM Custom Module direkt vs. erst Zoho Forms Storage, später migrieren.

### 4.3 Subscriber-Schema (CRM Custom Module)

| CRM-Feld | Typ | Beispiel |
|---|---|---|
| Email | Email | `kunde@beispiel.de` |
| First_Name | Text | `Lena` |
| Used_Zoho_Apps | Multi-Select | `["Zoho CRM", "Zoho Books", "Zoho Sign"]` |
| Frequency | Pick-List | `monthly` / `weekly` / `breaking_only` |
| Confirmed | Bool | `true` (nach Double-Opt-In) |
| Confirmation_Token | Text | Zufallsstring, 1× verwendbar |
| Created_At | DateTime | `2026-05-10T14:32:00Z` |
| Confirmed_At | DateTime | `2026-05-10T14:35:21Z` |
| Last_Sent_At | DateTime | `2026-06-01T08:00:00Z` |
| Plan | Pick-List | `free` / `pro` (für später) |
| Status | Pick-List | `active` / `unsubscribed` / `bounced` |
| Source | Text | `Website - /zoho-news` (Lead-Source-Tracking) |

### 4.4 Confirmation-Flow & „letzten Newsletter erhalten"

```
1. User submitted Zoho Form
   → Zoho Form schreibt Lead/Subscriber-Record (Confirmed=false)

2. Zoho Form schickt Bestätigungs-Mail (built-in Feature)
   ODER:
   news_feed-Service triggered Bestätigungs-Mail via Zoho-Workflow-Webhook
   → Mail enthält Link `/api/newsletter/confirm?token=…`

3. User klickt Bestätigungslink
   → Next.js API-Route `src/app/api/newsletter/confirm/route.ts`:
     a) Token validieren gegen CRM-Record
     b) Confirmed=true setzen, Confirmed_At schreiben
     c) Letzte Newsletter-Ausgabe (HTML) aus news_feed-Service holen
     d) Personalisieren auf gewählte Apps
     e) Sofort versenden via Resend
     f) Redirect auf `/[locale]/zoho-news/confirmed` (Bestätigungs-Page)

4. Monatlicher Versand:
   news_feed APScheduler Job (1. des Monats, 08:00):
     - alle Confirmed=true Subscriber laden
     - pro Subscriber: Artikel der letzten 30 Tage filtern auf Used_Zoho_Apps
     - Use-Case-Texte aus LLM-Cache laden (siehe 5.1)
     - HTML-Mail rendern + senden
     - Last_Sent_At setzen
```

**„Letzten Newsletter erhalten"** = Schritt 3.c–e oben. Voraussetzung: news_feed-Service muss eine Endpoint-Route haben, die den **letzten gerenderten Newsletter** als HTML zurückgibt (`GET /api/newsletter/latest?apps=Zoho+CRM,Zoho+Books`). Für den allerersten Subscriber existiert noch kein „letzter Newsletter" — Fallback: aktuellen Stand der letzten 30 Tage zur Confirmation-Zeit rendern.

---

## 5. News-Feed-Service: Was muss geändert werden?

Diese Änderungen leben im Repo `Tau Process House/Zoho Automations/news_feed/`. Dokumentation entsprechend in dessen `agent/`-Ordner anlegen.

### 5.1 Use-Case-Übersetzung (neu)

Aktuell speichert der Service Roh-Artikel (`title`, `body_text`, `excerpt`). Für den Newsletter brauchen wir eine **kuratierte Use-Case-Beschreibung** statt der reinen Feature-Notiz.

**Pipeline-Erweiterung:** nach dem Crawl läuft ein LLM-Schritt (OpenRouter, Modell ähnlich `/zoho-check`), der pro Artikel folgende Felder erzeugt und im JSON ergänzt:

| Neues Feld | Inhalt |
|---|---|
| `use_case_title` | „Was kann der Anwender jetzt tun, was vorher nicht ging?" — 1 Satz |
| `use_case_description` | 2–3 Sätze: Vorher-Zustand, Nachher-Zustand, konkretes Anwendungsbeispiel |
| `affected_personas` | `["sales", "ops", "finance", "support", "admin"]` — wer profitiert davon |
| `practical_impact` | Pick-List: `quick_win` / `medium_effort` / `architecture_change` |

**Cache:** generierte Texte werden im Artikel-JSON persistiert, nicht bei jedem Versand neu generiert. Kostenkontrolle: ~1442 CRM-Artikel × 1 Cent ≈ 14 € einmalig + ~50 neue Artikel/Monat × 1 Cent ≈ 0,50 €/Monat.

**Prompt-Konvention:** liegt in `news_feed/prompts/use_case_translation.md` (analog `lead_import_agent/prompts/`).

### 5.2 Newsletter-Builder (neu)

Neue Datei `news_feed/newsletter/builder.py`:

```python
class NewsletterBuilder:
    def build_for_subscriber(self, sub: Subscriber, period: tuple[date, date]) -> str:
        """Rendert HTML-Newsletter für einen Subscriber im Zeitraum."""

    def build_latest(self, used_apps: list[str]) -> str:
        """Rendert die zuletzt versandte Ausgabe (für Welcome-Mail)."""
```

**Template:** `news_feed/templates/newsletter.html` (Jinja2). Aufbau:

```
[Tau Process House Logo, schwarz auf weiß]

Hallo {{ first_name | default("") }},

dein Zoho-Update für {{ month_label }}:

{% for app in subscriber.apps %}
  ## {{ app }}

  {% for article in articles_by_app[app] %}
    ### {{ article.use_case_title }}

    {{ article.use_case_description }}

    [Mehr Details →]({{ article.source_url }})
  {% endfor %}
{% endfor %}

---
Du bekommst diesen Newsletter, weil du dich auf tauprocess.de
angemeldet hast. [Abmelden]({{ unsubscribe_url }})
```

Stil: Plain-HTML, Inter-Fallback Helvetica, schwarz/weiß, kantenscharf — kompatibel zum Style Guide. Keine Bilder im MVP außer Logo (Reduktion Spam-Filter-Risiko).

### 5.3 Versand-Pipeline (neu)

| Komponente | Status | Notiz |
|---|---|---|
| Resend API-Anbindung | ✓ existiert (`/zoho-check`) | wiederverwenden, Domain `tauprocess.de` ist verifiziert |
| APScheduler Job | offen | täglicher Crawl 06:00, monatlicher Versand 1. des Monats 08:00 |
| Bounce-Handling | offen | Resend-Webhook → Subscriber-Status `bounced` |
| Unsubscribe-Endpoint | neu | `/api/newsletter/unsubscribe?token=…` auf Website oder im news_feed-Service direkt |

### 5.4 Subscriber-API für Website (neu)

Drei neue HTTP-Endpoints im news_feed-Service (Port 5005), aufgerufen von Next.js API-Routes:

| Endpoint | Zweck |
|---|---|
| `POST /api/subscribers/confirm` | Token validieren, Confirmed-Flag setzen |
| `GET /api/newsletter/latest?apps=…` | letzte Ausgabe als HTML, gefiltert auf Apps |
| `POST /api/subscribers/unsubscribe` | Token validieren, Status auf `unsubscribed` setzen |

Authentifizierung: shared secret in Env (`NEWS_FEED_INTERNAL_TOKEN`). Service ist nicht öffentlich erreichbar; Calls gehen Server-zu-Server zwischen Vercel-Deployment und news_feed-Server.

**Hosting des news_feed-Services:** aktuell läuft der Service lokal über den Service Launcher. Für Production muss er auf einen Server (Hetzner/Vercel-Serverless ginge mit Refactor). → **Felix-Entscheidung: wo läuft news_feed in Production?** Dies ist der größte Blocker für den MVP.

---

## 6. Komponenten-Inventar Website

| Pfad | Status | Zweck |
|---|---|---|
| `src/app/[locale]/zoho-news/layout.tsx` | neu | Metadaten, JSON-LD WebPage, og:image |
| `src/app/[locale]/zoho-news/page.tsx` | neu | komponiert die 3 Sektionen |
| `src/app/[locale]/zoho-news/confirmed/page.tsx` | neu | Bestätigungs-Seite nach Double-Opt-In |
| `src/components/newsletter/NewsletterHero.tsx` | neu | Sektion 1 + Use-Case-Karten |
| `src/components/newsletter/NewsletterHowItWorks.tsx` | neu | Sektion 2 — 3-Step-Flow |
| `src/components/newsletter/NewsletterSignupSection.tsx` | neu | Sektion 3 — Zoho Form Embed |
| `src/data/newsletter.json` | neu | bilingual, alle Texte |
| `src/types/content.ts` | erweitern | `NewsletterContent` Typ |
| `src/app/api/newsletter/confirm/route.ts` | neu | Confirmation-Token-Handler |
| `src/app/api/newsletter/unsubscribe/route.ts` | neu | Unsubscribe-Handler |
| `public/img/og-newsletter.png` | neu (optional) | OG-Image, 1200×630 |

---

## 7. Bilingualität & SEO

- Alle Texte bilingual in `src/data/newsletter.json` (analog `agent.json`-Pattern)
- Eigene Metadaten in `src/data/metadata.json` ergänzen (Block `newsletter`)
- Sitemap-Eintrag in `src/app/sitemap.ts` mit hreflang DE/EN
- JSON-LD: `WebPage` + `Service`-Schema (Newsletter-Service ist gratis, aber strukturiert deklariert)
- llms.txt-Erweiterung: Hinweis auf Newsletter (für AI-Sichtbarkeit)

---

## 8. GA4-Events

| Event | Trigger | Properties |
|---|---|---|
| `newsletter_page_view` | Visit `/zoho-news` | `locale` |
| `newsletter_form_view` | Form-iFrame in Viewport | `locale` |
| `newsletter_form_submit` | Postmessage vom Zoho-Form (Submit-Erfolg) | `locale`, `apps_count` |
| `newsletter_confirmed` | Auf `/zoho-news/confirmed` | `locale` |

Hinweis: Submit-Tracking via iFrame braucht ein `postMessage`-Setup im Zoho Form (HTML-Block am Ende mit Script, das `parent.postMessage(...)` aufruft).

---

## 9. MVP-Scope (Iteration 1, geschätzt 1–2 Wochen)

### In Scope

- Subpage `/zoho-news` mit allen 3 Sektionen, bilingual
- Zoho Form als iFrame eingebettet (Felix legt das Form in Zoho selbst an)
- Confirmation-Endpoint auf der Website (Token aus CRM lesen, Confirmed-Flag setzen)
- „Letzten Newsletter"-Versand via news_feed `GET /api/newsletter/latest` + Resend
- Use-Case-Übersetzung im news_feed (LLM-Schritt) für die letzten 30 Tage Artikel
- Newsletter-HTML-Template
- Unsubscribe-Flow
- Manueller Test-Versand (kein Cron noch)

### Out of Scope (Iteration 2+)

- Hauptseiten-Teaser-Slide für den Newsletter
- Pro-Tier mit OAuth-CRM-Analyse (siehe `news_feed/Konzept.md` 7.2)
- Custom-React-Form statt iFrame
- A/B-Tests auf Use-Case-Karten
- Bounce-Handling-Webhook
- Frequenz-Optionen (sofort bei Breaking Changes)
- Newsletter-Archiv-Seite (öffentlich abrufbare alte Ausgaben)
- LinkedIn-Cross-Posting des Use-Case-Highlights

---

## 10. Akzeptanzkriterien MVP

- [ ] `/de/zoho-news` und `/en/zoho-news` rufen die Subpage in der jeweiligen Sprache auf
- [ ] 3 Sektionen sichtbar, scroll-frei (kein Snap, klassischer Long-Scroll)
- [ ] Zoho Form lädt und ist abschickbar
- [ ] Submit erzeugt CRM-Record mit `Confirmed=false`
- [ ] Bestätigungs-Mail kommt innerhalb 60 s
- [ ] Klick auf Bestätigungslink → Confirmed=true + sofortiger Versand der letzten Ausgabe
- [ ] Letzte Ausgabe ist auf die gewählten Apps gefiltert
- [ ] Unsubscribe-Link in jeder Newsletter-Mail funktioniert
- [ ] Lighthouse-Score ≥ 90 für `/zoho-news`
- [ ] Datenschutz-Verweis in Sektion 3 funktioniert
- [ ] GA4-Events feuern nach Consent
- [ ] `agent/website-architecture.md` aktualisiert
- [ ] `news_feed/agent/start.md` neu angelegt mit aktuellem Stand

---

## 11. Offene Entscheidungen (Felix)

1. **Slug:** `/zoho-news` vs. `/newsletter` vs. `/zoho-updates` vs. `/news`?
2. **Subscriber-Storage:** Zoho CRM Custom Module (sauber, mehr Aufwand) vs. Zoho Forms Storage (schnell, aber Migrationsschuld)?
3. **Hosting news_feed-Service in Production:** Hetzner-VM, Render, Fly.io, Vercel-Cron+KV? Aktuell nur lokal.
4. **Zoho-Form-Variante:** iFrame-Embed (MVP, schnell) oder direkt Custom-Form gegen Zoho-Forms-API?
5. **Versand-Domain:** `news@tauprocess.de` vs. `newsletter@tauprocess.de` vs. `updates@tauprocess.de`?
6. **Frequenz:** monatlich (wie aktuell vorgeschlagen) oder zweiwöchentlich? Begründung der monatlichen Wahl: Use-Case-Aufbereitung kostet LLM-Tokens und Felix-Review-Zeit; monatlich passt besser zu DACH-B2B-Lesegewohnheiten.
7. **Footer/CTA-Platzierung:** zusätzlich zur Subpage einen Newsletter-Plug am Ende der Tau-Agent-Subpage? Begründung dafür: höchste Conversion-Wahrscheinlichkeit, weil dort schon Zoho-affine Besucher sind.
8. **Archiv:** sollen alte Newsletter öffentlich auf `/zoho-news/archiv/<yyyy-mm>` abrufbar sein (SEO-Plus, kostet Wartung)?

---

## 12. Risiken

| Risiko | Auswirkung | Gegenmaßnahme |
|---|---|---|
| iFrame-Embed sieht stylistisch fremd aus | niedrigere Conversion | Iteration 2: Custom-React-Form |
| LLM-Use-Case-Übersetzung halluziniert / schwankt in Qualität | Newsletter unprofessionell | Felix-Review-Schritt vor erstem Versand; Cache-by-Hand für Kuratiertes |
| news_feed-Service nicht in Production deployt | MVP nicht launchfähig | Entscheidung 11.3 vor Implementierung treffen |
| DSGVO: Tracking via iFrame + GA4 | Consent-Mode-Probleme | iFrame erst nach CookieYes-Consent rendern (lazy mount) |
| Zoho-Form ohne natives Multi-Select-mit-vorbefüllten-Apps | umständliche Anmeldung | App-Liste regelmäßig synchron halten zu `news_feed/data/sources.json` |

---

*Erstellt: 2026-05-10 · Version 0.1 · Autor: Felix + Claude*
