export type LicenseType = 'standalone' | 'bundle' | 'zoho-one';

export interface CheckFormData {
  email: string;
  website?: string; // set when generic email domain detected
  licenseType: LicenseType;
  moduleList: string;
  gdprConsent: boolean;
}

export interface CompanyInfo {
  domain: string;
  company_name: string;
  website_accessible: boolean;
  industry: string[];
  business_type: 'B2B' | 'B2C' | 'both' | 'unknown';
  description: string;
  size_estimate: string;
}

export interface ZohoModule {
  display_name: string;
  api_name: string;
  type: 'default' | 'custom' | 'integration';
}

export interface ModuleStats {
  total: number;
  default: number;
  custom: number;
  integration: number;
}

export interface ExtractionResult {
  company_info: CompanyInfo;
  modules: ZohoModule[];
  module_stats: ModuleStats;
  module_analysis_text: string;
}

export interface QuickWin {
  title: string;
  description: string;
  effort: string;
  impact: string;
  timeframe: string;
}

export interface StrategicInitiative {
  title: string;
  description: string;
  effort: string;
  impact: string;
  timeframe: string;
}

export interface GapItem {
  module?: string;
  integration?: string;
  gap?: string;
  reason?: string;
  use_case?: string;
  impact?: string;
  priority: string;
}

export interface AnalysisResult {
  executive_summary: {
    headline: string;
    crm_maturity_score: number;
    crm_maturity_label: string;
    key_findings: string[];
    primary_recommendation: string;
  };
  company_profile: {
    industry: string;
    business_model: string;
    estimated_size: string;
    core_products: string[];
    target_customers: string;
    unique_selling_points: string[];
  };
  module_analysis: {
    total_modules: number;
    default_modules_count: number;
    integration_modules_count: number;
    custom_modules_count: number;
    module_ratio_assessment: string;
    notable_modules: {
      well_utilized: string[];
      underutilized_integrations: string[];
      questionable_custom: string[];
    };
  };
  license_fit_analysis: {
    current_license: string;
    license_utilization_score: number;
    wasted_potential: string;
    recommendation: string;
  };
  gap_analysis: {
    missing_standard_modules: GapItem[];
    missing_integrations: GapItem[];
    process_gaps: GapItem[];
  };
  recommendations: {
    quick_wins: QuickWin[];
    strategic_initiatives: StrategicInitiative[];
    consultation_opportunities: Array<{ service: string; value_proposition: string; estimated_effort: string }>;
  };
  risk_assessment: {
    technical_risks: string[];
    business_risks: string[];
    mitigation_strategies: string[];
  };
  next_steps: {
    immediate_actions: string[];
    consultation_topics: string[];
    estimated_optimization_potential: string;
  };
}
