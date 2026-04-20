export interface KPI {
  metric: string;
  before?: string;
  after?: string;
  improvement: string;
}

export interface CaseStudy {
  id: string;
  type: 'caseStudy';
  client: string;
  industry: string;
  headline: string;
  tagline: string;
  challenge: string;
  solution: {
    summary: string;
    apps: string[];
    description: string;
  };
  artifacts: string[];
  kpis: KPI[];
  tags: string[];
  published: boolean;
}

export interface Product {
  id: string;
  type: 'product';
  name: string;
  tagline: string;
  problem: string;
  description: string;
  showcase: {
    type: 'image' | 'video';
    url: string;
    alt: string;
  };
  results: KPI[];
  pricing: {
    model: string;
    price: number;
    currency: string;
    label: string;
  };
  cta: {
    label: string;
    href: string;
  };
  tags: string[];
  published: boolean;
}

export type WorkItem = CaseStudy | Product;
