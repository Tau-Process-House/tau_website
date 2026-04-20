import { NextRequest, NextResponse } from 'next/server';
import { AnalysisResult, ExtractionResult } from '@/types/zoho-check';
import { buildModuleAnalysisText } from '@/lib/zoho-check/module-classifier';

function formatAnalysisAsText(a: AnalysisResult): string {
  const sep = '\n──────────\n';
  let t = '';

  // Executive Summary
  t += `ZUSAMMENFASSUNG\n`;
  t += `${a.executive_summary.headline}\n`;
  t += `CRM-Reife: ${a.executive_summary.crm_maturity_score}/5 – ${a.executive_summary.crm_maturity_label}\n`;
  t += `Kernbefunde:\n${a.executive_summary.key_findings.map(f => `  • ${f}`).join('\n')}\n`;
  t += `Primäre Empfehlung: ${a.executive_summary.primary_recommendation}`;
  t += sep;

  // Unternehmensprofil
  t += `UNTERNEHMENSPROFIL\n`;
  t += `Branche: ${a.company_profile.industry} | Modell: ${a.company_profile.business_model} | Größe: ${a.company_profile.estimated_size}\n`;
  t += `Produkte/Dienste: ${a.company_profile.core_products.join(', ')}\n`;
  t += `Zielkunden: ${a.company_profile.target_customers}\n`;
  t += `USPs: ${a.company_profile.unique_selling_points.join(', ')}`;
  t += sep;

  // Modul-Analyse
  const ma = a.module_analysis;
  t += `MODUL-ANALYSE\n`;
  t += `Gesamt: ${ma.total_modules} | Default: ${ma.default_modules_count} | Integrationen: ${ma.integration_modules_count} | Custom: ${ma.custom_modules_count}\n`;
  t += `Bewertung: ${ma.module_ratio_assessment}\n`;
  if (ma.notable_modules.well_utilized.length)
    t += `Gut genutzt: ${ma.notable_modules.well_utilized.join(', ')}\n`;
  if (ma.notable_modules.underutilized_integrations.length)
    t += `Untergenutzte Integrationen: ${ma.notable_modules.underutilized_integrations.join(', ')}\n`;
  if (ma.notable_modules.questionable_custom.length)
    t += `Fragliche Custom-Module: ${ma.notable_modules.questionable_custom.join(', ')}`;
  t += sep;

  // Lizenz-Analyse
  const lf = a.license_fit_analysis;
  t += `LIZENZ-ANALYSE\n`;
  t += `Aktuelle Lizenz: ${lf.current_license} | Nutzungsgrad: ${lf.license_utilization_score}/10\n`;
  t += `Ungenutztes Potenzial: ${lf.wasted_potential}\n`;
  t += `Empfehlung: ${lf.recommendation}`;
  t += sep;

  // Gap-Analyse
  const ga = a.gap_analysis;
  t += `GAP-ANALYSE\n`;
  if (ga.missing_standard_modules.length) {
    t += `Fehlende Standard-Module:\n`;
    t += ga.missing_standard_modules.map(g => `  • ${g.module || ''}: ${g.reason || g.use_case || ''} [${g.priority}]`).join('\n') + '\n';
  }
  if (ga.missing_integrations.length) {
    t += `Fehlende Integrationen:\n`;
    t += ga.missing_integrations.map(g => `  • ${g.integration || ''}: ${g.use_case || ''} [${g.priority}]`).join('\n') + '\n';
  }
  if (ga.process_gaps.length) {
    t += `Prozess-Lücken:\n`;
    t += ga.process_gaps.map(g => `  • ${g.gap || ''}: ${g.impact || ''} [${g.priority}]`).join('\n');
  }
  t += sep;

  // Empfehlungen
  const rec = a.recommendations;
  t += `EMPFEHLUNGEN\n`;
  if (rec.quick_wins.length) {
    t += `Quick Wins:\n`;
    t += rec.quick_wins.map(q => `  • ${q.title}: ${q.description} (${q.timeframe})`).join('\n') + '\n';
  }
  if (rec.strategic_initiatives.length) {
    t += `Strategische Initiativen:\n`;
    t += rec.strategic_initiatives.map(s => `  • ${s.title}: ${s.description} (${s.timeframe})`).join('\n') + '\n';
  }
  if (rec.consultation_opportunities.length) {
    t += `Beratungsansätze:\n`;
    t += rec.consultation_opportunities.map(c => `  • ${c.service}: ${c.value_proposition}`).join('\n');
  }
  t += sep;

  // Nächste Schritte
  const ns = a.next_steps;
  t += `NÄCHSTE SCHRITTE\n`;
  t += `Sofortmaßnahmen:\n${ns.immediate_actions.map(a => `  • ${a}`).join('\n')}\n`;
  t += `Gesprächsthemen:\n${ns.consultation_topics.map(c => `  • ${c}`).join('\n')}\n`;
  t += `Optimierungspotenzial: ${ns.estimated_optimization_potential}`;

  return t;
}

// Zoho CRM OAuth credentials - set in .env.local:
// ZOHO_CRM_CLIENT_ID, ZOHO_CRM_CLIENT_SECRET, ZOHO_CRM_REFRESH_TOKEN
// Required scopes: ZohoCRM.modules.leads.CREATE, ZohoCRM.modules.notes.CREATE
// Accounts URL: https://accounts.zoho.eu (for EU-hosted CRM)

const ZOHO_ACCOUNTS_URL = 'https://accounts.zoho.eu';
const ZOHO_CRM_URL = 'https://www.zohoapis.eu/crm/v3';

async function getZohoAccessToken(): Promise<string> {
  const response = await fetch(`${ZOHO_ACCOUNTS_URL}/oauth/v2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: process.env.ZOHO_CRM_CLIENT_ID!,
      client_secret: process.env.ZOHO_CRM_CLIENT_SECRET!,
      refresh_token: process.env.ZOHO_CRM_REFRESH_TOKEN!,
    }),
  });

  const data = await response.json();
  if (!data.access_token) throw new Error('Failed to get Zoho access token');
  return data.access_token;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, licenseType, analysis, extraction, website }: {
      email: string;
      licenseType: string;
      analysis: AnalysisResult;
      extraction: ExtractionResult;
      website?: string;
    } = body;

    // Validate env vars
    if (!process.env.ZOHO_CRM_CLIENT_ID || !process.env.ZOHO_CRM_CLIENT_SECRET || !process.env.ZOHO_CRM_REFRESH_TOKEN) {
      // TODO: Configure Zoho CRM OAuth credentials in .env.local
      console.warn('Zoho CRM credentials not configured. Lead not saved.');
      return NextResponse.json({ success: true, note: 'CRM credentials not configured' });
    }

    const accessToken = await getZohoAccessToken();

    const licenseLabel = {
      'standalone': 'Zoho CRM Standalone',
      'bundle': 'Mehrere Zoho Anwendungen',
      'zoho-one': 'Zoho One',
    }[licenseType] || licenseType;

    // Create Lead
    const leadData = {
      data: [{
        Last_Name: email.split('@')[0],
        Email: email,
        Company: extraction.company_info.company_name || extraction.company_info.domain,
        Website: website || `https://${extraction.company_info.domain}`,
        Lead_Source: 'CRM-Check Tool',
        Description: `CRM-Check via tauprocess.de/zoho-check\n\nLizenz: ${licenseLabel}\nScore: ${analysis.executive_summary.crm_maturity_score}/5 (${analysis.executive_summary.crm_maturity_label})\n\nPrimäre Empfehlung: ${analysis.executive_summary.primary_recommendation}`,
      }],
    };

    const leadResponse = await fetch(`${ZOHO_CRM_URL}/Leads`, {
      method: 'POST',
      headers: {
        'Authorization': `Zoho-oauthtoken ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leadData),
    });

    const leadResult = await leadResponse.json();
    const leadId = leadResult.data?.[0]?.details?.id;

    if (!leadId) {
      throw new Error('Failed to create lead: ' + JSON.stringify(leadResult));
    }

    // Add note with cleaned module list
    await fetch(`${ZOHO_CRM_URL}/Notes`, {
      method: 'POST',
      headers: {
        'Authorization': `Zoho-oauthtoken ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: [{
          Note_Title: 'CRM-Check: Modul-Übersicht',
          Note_Content: buildModuleAnalysisText(extraction.modules).slice(0, 5000),
          Parent_Id: leadId,
          se_module: 'Leads',
        }],
      }),
    });

    // Add note with analysis as readable text
    await fetch(`${ZOHO_CRM_URL}/Notes`, {
      method: 'POST',
      headers: {
        'Authorization': `Zoho-oauthtoken ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: [{
          Note_Title: 'CRM-Check: KI-Analyse',
          Note_Content: formatAnalysisAsText(analysis).slice(0, 8000),
          Parent_Id: leadId,
          se_module: 'Leads',
        }],
      }),
    });

    return NextResponse.json({ success: true, leadId });
  } catch (error) {
    console.error('CRM lead error:', error);
    // Don't fail the user flow if CRM fails - just log
    return NextResponse.json({ success: false, error: String(error) });
  }
}
