/** Bilingualer String — wird in allen src/data/*.json Dateien verwendet */
export type LocalizedString = { de: string; en: string };

// ─── Hero ──────────────────────────────────────────────────────────────────
export interface HeroContent {
  title: string;
  tagline: LocalizedString;
  logo: {
    src: string;
    alt: LocalizedString;
  };
}

// ─── Philosophy ────────────────────────────────────────────────────────────
export interface PhilosophyContent {
  title: LocalizedString;
  paragraphs: LocalizedString[];
  vennLabels: {
    people: LocalizedString;
    technology: LocalizedString;
    process: LocalizedString;
  };
}

// ─── Services ──────────────────────────────────────────────────────────────
export interface ServiceStep {
  number: string;
  title: LocalizedString;
  description: LocalizedString;
}

export interface ServicesContent {
  title: LocalizedString;
  platform: {
    name: string;
    logo: string;
    description: LocalizedString;
  };
  mobileHint: LocalizedString;
  steps: ServiceStep[];
}

// ─── KPI ───────────────────────────────────────────────────────────────────
export interface KpiItem {
  target: number;
  suffix: string;
  label: LocalizedString;
}

export interface KpiContent {
  items: KpiItem[];
}

// ─── Team ──────────────────────────────────────────────────────────────────
export interface TeamMember {
  id: string;
  name: string;
  image: string;
  role: LocalizedString;
  quote: LocalizedString;
  visible: boolean;
}

export interface TeamContent {
  title: LocalizedString;
  prevAlt: LocalizedString;
  nextAlt: LocalizedString;
  members: TeamMember[];
}

// ─── Contact ───────────────────────────────────────────────────────────────
export interface ContactContent {
  title: LocalizedString;
  clients: {
    heading: LocalizedString;
    email: string;
  };
  applicants: {
    heading: LocalizedString;
    label: LocalizedString;
    url: string;
  };
  footerLinks: {
    imprint: LocalizedString;
    privacy: LocalizedString;
    faq: LocalizedString;
  };
}

// ─── Imprint ───────────────────────────────────────────────────────────────
export interface ImprintContent {
  owner: string;
  address: {
    street: string;
    zip: string;
    city: string;
  };
  contact: {
    email: string;
  };
  vatId: string;
  labels: {
    backLink: LocalizedString;
    title: LocalizedString;
    infoTitle: LocalizedString;
    contactTitle: LocalizedString;
    vatTitle: LocalizedString;
    vatText: LocalizedString;
    responsibleTitle: LocalizedString;
    disputeTitle: LocalizedString;
    disputeText1: LocalizedString;
    disputeText2: LocalizedString;
    disputeText3: LocalizedString;
  };
}

// ─── FAQ Page ──────────────────────────────────────────────────────────────
export interface FaqItem {
  id: string;
  question: LocalizedString;
  answer: LocalizedString;
  published: boolean;
}

export interface FaqPageContent {
  page: {
    title: LocalizedString;
    subtitle: LocalizedString;
    backLink: LocalizedString;
    ctaTitle: LocalizedString;
    ctaText: LocalizedString;
    ctaEmail: string;
    footerLinks: {
      home: LocalizedString;
      imprint: LocalizedString;
      privacy: LocalizedString;
    };
  };
  items: FaqItem[];
}

// ─── Metadata ──────────────────────────────────────────────────────────────
export interface MetadataContent {
  site: {
    name: string;
    url: string;
    email: string;
    title: LocalizedString;
    titleTemplate: string;
    description: LocalizedString;
    ogTitle: LocalizedString;
    ogDescription: LocalizedString;
    ogLocale: LocalizedString;
    ogImageAlt: LocalizedString;
    twitterTitle: LocalizedString;
    twitterDescription: LocalizedString;
  };
  faq: {
    title: LocalizedString;
    description: LocalizedString;
    ogTitle: LocalizedString;
    ogDescription: LocalizedString;
  };
  person: {
    name: string;
    email: string;
    jobTitle: LocalizedString;
    description: LocalizedString;
    knowsAbout: string[];
  };
  organization: {
    name: string;
    description: LocalizedString;
    areaServed: string[];
    offerCatalogName: LocalizedString;
    offers: LocalizedString[];
  };
}
