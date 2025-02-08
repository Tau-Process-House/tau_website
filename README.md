# tau process house Website

Dies ist die offizielle Website der tau process house GmbH, die Prozessautomatisierungslösungen anbietet.

## Technologien

- Next.js 14
- TypeScript
- Tailwind CSS
- Framer Motion
- React Intersection Observer

## Entwicklung

### Voraussetzungen

- Node.js 18.17 oder höher
- npm 9.6.7 oder höher

### Installation

1. Repository klonen:
```bash
git clone [repository-url]
```

2. In das Projektverzeichnis wechseln:
```bash
cd tau-process-house
```

3. Abhängigkeiten installieren:
```bash
npm install
```

4. Entwicklungsserver starten:
```bash
npm run dev
```

Die Website ist dann unter `http://localhost:3000` verfügbar.

### Build

Um eine Produktionsversion zu erstellen:

```bash
npm run build
```

Um die Produktionsversion lokal zu testen:

```bash
npm run start
```

## Projektstruktur

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Hauptseite
│   ├── layout.tsx         # Root Layout
│   ├── globals.css        # Globale Styles
│   └── imprint/          # Impressum
├── components/            # React Komponenten
└── styles/               # Zusätzliche Styles
```

## Deployment

Die Website kann auf verschiedenen Hosting-Plattformen deployed werden, die Next.js unterstützen, wie zum Beispiel:

- Vercel
- Netlify
- AWS
- Google Cloud Platform

## Lizenz

Alle Rechte vorbehalten © tau process house GmbH
