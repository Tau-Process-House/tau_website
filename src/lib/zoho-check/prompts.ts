import { CompanyInfo, ZohoModule, ModuleStats } from '@/types/zoho-check';

export function buildAnalysisPrompt(
  companyInfo: CompanyInfo,
  modules: ZohoModule[],
  moduleStats: ModuleStats,
  moduleAnalysisText: string,
  licenseType: string
): string {
  const licenseLabel = {
    'standalone': 'Zoho CRM Standalone',
    'bundle': 'Mehrere Zoho Anwendungen (Bundle)',
    'zoho-one': 'Zoho One Paket',
  }[licenseType] || licenseType;

  return `Du bist ein erfahrener Zoho CRM Berater. Analysiere die folgende CRM-Konfiguration eines Unternehmens und erstelle eine strategische Bewertung.

## UNTERNEHMENSINFORMATIONEN
${JSON.stringify(companyInfo, null, 2)}

## LIZENZTYP
${licenseLabel}

## MODUL-ANALYSE
${moduleAnalysisText}

## MODUL-STATISTIKEN
- Gesamt: ${moduleStats.total}
- Standard-Module: ${moduleStats.default}
- Integrations-Module: ${moduleStats.integration}
- Custom-Module: ${moduleStats.custom}

## ANALYSE-HEURISTIKEN (wende diese an):
1. Lizenz-Underutilization: Zoho One + wenige Integrationsmodule → Ungenutztes Potenzial aufzeigen
2. Upgrade-Empfehlung: Standalone + viele Custom Module → Upgrade auf Bundle/Zoho One empfehlen
3. Überladenes System: Kleines Unternehmen + viele Custom Module (>5) → Konsolidierung empfehlen
4. Fehlende Integrationen: Viele Timesheet/Expense Module → Zoho Projects fehlt vermutlich
5. Vertragslücke: Viele Sign/Contract Module → Zoho Sign + Contracts prüfen
6. Branchenfit: B2B Dienstleistung ohne Projects → Gap-Analyse anstoßen

## AUSGABE-ANWEISUNG
Antworte AUSSCHLIESSLICH mit validem JSON im folgenden Format (kein Markdown-Wrapper, kein erklärender Text):

{
  "executive_summary": {
    "headline": "1-2 prägnante Sätze zur Gesamtbewertung",
    "crm_maturity_score": 1,
    "crm_maturity_label": "Anfänger | Entwicklung | Solide | Fortgeschritten | Exzellent",
    "key_findings": ["Finding 1", "Finding 2", "Finding 3"],
    "primary_recommendation": "Die wichtigste einzelne Empfehlung"
  },
  "company_profile": {
    "industry": "Erkannte Branche",
    "business_model": "B2B | B2C | B2B2C",
    "estimated_size": "Klein | Mittel | Groß | Unbekannt",
    "core_products": ["Produkt/Dienstleistung 1"],
    "target_customers": "Wen bedient das Unternehmen",
    "unique_selling_points": ["USP 1"]
  },
  "module_analysis": {
    "total_modules": 0,
    "default_modules_count": 0,
    "integration_modules_count": 0,
    "custom_modules_count": 0,
    "module_ratio_assessment": "Bewertung des Modul-Mix",
    "notable_modules": {
      "well_utilized": ["Module die gut passen"],
      "underutilized_integrations": ["Integrationen die mehr genutzt werden könnten"],
      "questionable_custom": ["Custom Module die hinterfragt werden sollten"]
    }
  },
  "license_fit_analysis": {
    "current_license": "${licenseLabel}",
    "license_utilization_score": 1,
    "wasted_potential": "Was wird nicht genutzt",
    "recommendation": "Upgrade | Downgrade | Optimieren"
  },
  "gap_analysis": {
    "missing_standard_modules": [{"module": "Name", "reason": "Warum fehlend?", "priority": "Hoch | Mittel | Niedrig"}],
    "missing_integrations": [{"integration": "Name", "use_case": "Anwendungsfall", "priority": "Hoch | Mittel | Niedrig"}],
    "process_gaps": [{"gap": "Lücke", "impact": "Auswirkung", "priority": "Hoch | Mittel | Niedrig"}]
  },
  "recommendations": {
    "quick_wins": [{"title": "Titel", "description": "Beschreibung", "effort": "Gering | Mittel | Hoch", "impact": "Gering | Mittel | Hoch", "timeframe": "z.B. 1-2 Wochen"}],
    "strategic_initiatives": [{"title": "Titel", "description": "Beschreibung", "effort": "Gering | Mittel | Hoch", "impact": "Gering | Mittel | Hoch", "timeframe": "z.B. 3-6 Monate"}],
    "consultation_opportunities": [{"service": "Leistung", "value_proposition": "Mehrwert", "estimated_effort": "Aufwand"}]
  },
  "risk_assessment": {
    "technical_risks": ["Risiko 1"],
    "business_risks": ["Risiko 1"],
    "mitigation_strategies": ["Strategie 1"]
  },
  "next_steps": {
    "immediate_actions": ["Aktion 1", "Aktion 2"],
    "consultation_topics": ["Thema 1", "Thema 2"],
    "estimated_optimization_potential": "Einschätzung des Optimierungspotenzials"
  }
}`;
}

export const MODULE_PARSING_PROMPT = `Du bist ein Datenextraktions-Assistent für Zoho CRM.
Extrahiere aus dem folgenden Text alle CRM-Module und gib sie als JSON-Array zurück.

Jedes Modul hat folgende Felder:
- display_name: Der angezeigte Name (deutsch oder englisch)
- api_name: Der technische API-Name

Regeln:
- Ignoriere Header-Zeilen wie "In den Registerkarten angezeigt als" oder "API-Name"
- Stoppe bei "Rückmeldung", "Smartchat", "Feedback"
- Gib AUSSCHLIESSLICH ein JSON-Array zurück, kein erläuternder Text

Format:
[{"display_name": "...", "api_name": "..."}, ...]

MODUL-TEXT:
`;
