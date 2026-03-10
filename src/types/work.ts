// Bilingual string — all visible text fields use this type
export type LocalizedString = {
  de: string;
  en: string;
};

export interface KPI {
  metric: LocalizedString;
  before?: string;
  after?: string;
  improvement: string;
}

export interface CaseStudy {
  id: string;
  type: 'caseStudy';
  client: string;            // Company name — not localized
  industry: LocalizedString;
  headline: LocalizedString;
  tagline: LocalizedString;
  challenge: LocalizedString;
  solution: {
    summary: LocalizedString;
    apps: string[];          // App names (e.g. "Zoho CRM") — not localized
    description: LocalizedString;
  };
  artifacts: LocalizedString[];
  kpis: KPI[];
  tags: string[];            // Tag labels — not localized
  published: boolean;
}

export interface Product {
  id: string;
  type: 'product';
  name: LocalizedString;
  tagline: LocalizedString;
  problem: LocalizedString;
  description: LocalizedString;
  showcase: {
    type: 'image' | 'video';
    url: string;
    alt: LocalizedString;
  };
  results: KPI[];
  pricing: {
    model: string;
    price: number;
    currency: string;
    label: string;           // Price label — not localized (numeric + currency)
  };
  cta: {
    label: LocalizedString;
    href: string;
  };
  tags: string[];
  published: boolean;
}

export interface SolutionComponent {
  name: string;              // App/component names — not localized
  role: LocalizedString;
}

export interface Solution {
  id: string;
  type: 'solution';
  name: LocalizedString;
  tagline: LocalizedString;
  // Für wen ist die Lösung gedacht und welches Problem wird gelöst?
  target: {
    audience: LocalizedString;
    problem: LocalizedString;
  };
  // Wie sieht die Lösung aus, welche Komponenten werden wie genutzt?
  architecture: {
    summary: LocalizedString;
    components: SolutionComponent[];
    description: LocalizedString;
  };
  // Was erhält der Kunde mit der Lösung, was wird mit der Lösung abgedeckt?
  deliverables: LocalizedString[];
  tags: string[];
  published: boolean;
}

export type WorkItem = CaseStudy | Product | Solution;
