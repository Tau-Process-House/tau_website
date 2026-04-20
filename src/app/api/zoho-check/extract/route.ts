import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'node-html-parser';
import { classifyModule } from '@/lib/zoho-check/module-classifier';
import { MODULE_PARSING_PROMPT } from '@/lib/zoho-check/prompts';
import { ZohoModule, CompanyInfo, ExtractionResult } from '@/types/zoho-check';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_BASE = 'https://openrouter.ai/api/v1/chat/completions';
const FAST_MODEL = 'google/gemini-2.0-flash-001';

async function scrapeWebsite(domain: string): Promise<{
  title: string;
  description: string;
  headings: string[];
  bodyText: string;
  accessible: boolean;
}> {
  try {
    const url = domain.startsWith('http') ? domain : `https://${domain}`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; TauProcessBot/1.0)' },
    });
    clearTimeout(timeout);

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const html = await response.text();
    const root = parse(html);

    const title = root.querySelector('title')?.text?.trim() || '';
    const description = root.querySelector('meta[name="description"]')?.getAttribute('content')
      || root.querySelector('meta[property="og:description"]')?.getAttribute('content')
      || '';

    const headings = root.querySelectorAll('h1, h2, h3')
      .map(h => h.text.trim())
      .filter(h => h.length > 2)
      .slice(0, 20);

    // Remove scripts, styles, nav, footer for cleaner text
    ['script', 'style', 'nav', 'footer', 'header'].forEach(tag => {
      root.querySelectorAll(tag).forEach(el => el.remove());
    });

    const bodyText = (root.querySelector('main') || root.querySelector('body'))
      ?.text
      ?.replace(/\s+/g, ' ')
      ?.trim()
      ?.slice(0, 4000) || '';

    return { title, description, headings, bodyText, accessible: true };
  } catch {
    return { title: '', description: '', headings: [], bodyText: '', accessible: false };
  }
}

function analyzeCompany(domain: string, scraped: Awaited<ReturnType<typeof scrapeWebsite>>): CompanyInfo {
  const allText = `${scraped.title} ${scraped.description} ${scraped.headings.join(' ')} ${scraped.bodyText}`.toLowerCase();

  const INDUSTRY_KEYWORDS: Record<string, string[]> = {
    'Software & IT': ['software', 'saas', 'app', 'platform', 'cloud', 'api', 'tech', 'digital'],
    'Beratung': ['beratung', 'consulting', 'berater', 'strategie', 'advisory'],
    'Handel': ['handel', 'shop', 'ecommerce', 'online-shop', 'vertrieb', 'verkauf'],
    'Industrie & Fertigung': ['produktion', 'fertigung', 'industrie', 'manufacturing', 'maschinen'],
    'Dienstleistungen': ['service', 'dienstleistung', 'agentur', 'agency'],
    'Finanzen': ['finanzen', 'fintech', 'versicherung', 'bank', 'kredit'],
    'Gesundheit': ['gesundheit', 'medizin', 'pharma', 'klinik', 'arzt'],
    'Bildung': ['bildung', 'schulung', 'training', 'weiterbildung', 'akademie'],
  };

  const industryScores: Record<string, number> = {};
  for (const [industry, keywords] of Object.entries(INDUSTRY_KEYWORDS)) {
    let score = 0;
    for (const kw of keywords) {
      const headingMatches = scraped.headings.join(' ').toLowerCase().split(kw).length - 1;
      score += headingMatches * 3;
      score += (allText.split(kw).length - 1);
    }
    if (score > 0) industryScores[industry] = score;
  }

  const topIndustries = Object.entries(industryScores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([k]) => k);

  const b2bKeywords = ['b2b', 'unternehmen', 'business', 'corporate', 'firma', 'kunden', 'enterprise'];
  const b2cKeywords = ['verbraucher', 'consumer', 'privat', 'person', 'nutzer', 'user', 'endkunde'];

  const b2bScore = b2bKeywords.reduce((acc, kw) => acc + (allText.split(kw).length - 1), 0);
  const b2cScore = b2cKeywords.reduce((acc, kw) => acc + (allText.split(kw).length - 1), 0);

  let businessType: CompanyInfo['business_type'] = 'unknown';
  if (b2bScore > b2cScore * 2) businessType = 'B2B';
  else if (b2cScore > b2bScore * 2) businessType = 'B2C';
  else if (b2bScore > 0 || b2cScore > 0) businessType = 'both';

  const sizeKeywords = { 'Startup': ['startup', 'gründer'], 'Klein': ['kleinunternehmen', 'freelancer', 'freiberufler'], 'Mittel': ['mittelstand', 'kmu', 'team'], 'Groß': ['international', 'konzern', 'weltweiter'] };
  let sizeEstimate = 'Unbekannt';
  for (const [size, kws] of Object.entries(sizeKeywords)) {
    if (kws.some(kw => allText.includes(kw))) { sizeEstimate = size; break; }
  }

  return {
    domain,
    company_name: scraped.title.split('|')[0].split('-')[0].trim() || domain,
    website_accessible: scraped.accessible,
    industry: topIndustries.length > 0 ? topIndustries : ['Unbekannt'],
    business_type: businessType,
    description: scraped.description.slice(0, 500) || scraped.bodyText.slice(0, 300),
    size_estimate: sizeEstimate,
  };
}

async function parseModulesWithAI(rawText: string): Promise<ZohoModule[] | null> {
  if (!OPENROUTER_API_KEY) return null;

  try {
    const response = await fetch(OPENROUTER_BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: FAST_MODEL,
        messages: [
          { role: 'user', content: MODULE_PARSING_PROMPT + rawText }
        ],
        temperature: 0.1,
        max_tokens: 2000,
      }),
    });

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '';

    // Extract JSON array
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (!jsonMatch) return null;

    const parsed = JSON.parse(jsonMatch[0]);
    if (!Array.isArray(parsed)) return null;

    return parsed.map((m: { display_name?: string; api_name?: string }) => ({
      display_name: m.display_name || '',
      api_name: m.api_name || '',
      type: classifyModule(m.display_name || '', m.api_name || ''),
    }));
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, website, moduleList } = body;

    if (!email || !moduleList) {
      return NextResponse.json({ error: 'E-Mail und Modulliste sind erforderlich.' }, { status: 400 });
    }

    // Determine domain to scrape
    let domain: string;
    if (website) {
      domain = website.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
    } else {
      domain = email.split('@')[1] || '';
    }

    // Scrape website
    const scraped = await scrapeWebsite(domain);
    const companyInfo = analyzeCompany(domain, scraped);

    // Parse modules: try AI first, fallback to regex
    const { parseModuleList, buildModuleAnalysisText: buildAnalysis } = await import('@/lib/zoho-check/module-classifier');
    let modules = await parseModulesWithAI(moduleList);
    if (!modules || modules.length === 0) {
      modules = parseModuleList(moduleList);
    }

    const moduleStats = {
      total: modules.length,
      default: modules.filter(m => m.type === 'default').length,
      custom: modules.filter(m => m.type === 'custom').length,
      integration: modules.filter(m => m.type === 'integration').length,
    };

    const moduleAnalysisText = buildAnalysis(modules);

    const result: ExtractionResult = {
      company_info: companyInfo,
      modules,
      module_stats: moduleStats,
      module_analysis_text: moduleAnalysisText,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Extract error:', error);
    return NextResponse.json({ error: 'Fehler bei der Extraktion. Bitte versuchen Sie es erneut.' }, { status: 500 });
  }
}
