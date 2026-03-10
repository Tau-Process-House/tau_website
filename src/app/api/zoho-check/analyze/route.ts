import { NextRequest, NextResponse } from 'next/server';
import { buildAnalysisPrompt } from '@/lib/zoho-check/prompts';
import { AnalysisResult, ExtractionResult } from '@/types/zoho-check';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_BASE = 'https://openrouter.ai/api/v1/chat/completions';
const ANALYSIS_MODEL = 'google/gemini-2.5-pro-preview-03-25';

/**
 * Attempts to repair common JSON issues produced by LLMs:
 * - Trailing commas before } or ]
 * - Unescaped newlines inside string values
 * - Single quotes instead of double quotes (basic cases)
 */
function repairJson(raw: string): string {
  return raw
    // Remove trailing commas before closing braces/brackets
    .replace(/,(\s*[}\]])/g, '$1')
    // Replace literal tab characters inside strings with \t
    .replace(/(?<=":[\s]*"[^"]*)\t(?=[^"]*")/g, '\\t')
    // Remove BOM or zero-width chars
    .replace(/^\uFEFF/, '')
    .trim();
}

/**
 * Tries multiple strategies to extract and parse a JSON object from LLM output.
 * 1. ```json ... ``` fenced block
 * 2. First { ... } block (greedy, largest match)
 * 3. Same with repair applied
 */
function extractJson(content: string): AnalysisResult {
  const strategies: Array<() => string | null> = [
    // Strategy 1: fenced ```json block
    () => {
      const m = content.match(/```json\s*([\s\S]*?)\s*```/);
      return m ? m[1] : null;
    },
    // Strategy 2: fenced ``` block (no language tag)
    () => {
      const m = content.match(/```\s*([\s\S]*?)\s*```/);
      return m ? m[1] : null;
    },
    // Strategy 3: find outermost { } by bracket matching
    () => {
      const start = content.indexOf('{');
      if (start === -1) return null;
      let depth = 0;
      let inString = false;
      let escape = false;
      for (let i = start; i < content.length; i++) {
        const ch = content[i];
        if (escape) { escape = false; continue; }
        if (ch === '\\' && inString) { escape = true; continue; }
        if (ch === '"') { inString = !inString; continue; }
        if (inString) continue;
        if (ch === '{') depth++;
        else if (ch === '}') {
          depth--;
          if (depth === 0) return content.slice(start, i + 1);
        }
      }
      // Bracket matching failed — return from first { to end
      return content.slice(start);
    },
  ];

  for (const strategy of strategies) {
    const candidate = strategy();
    if (!candidate) continue;

    // Try parsing as-is first
    try {
      return JSON.parse(candidate);
    } catch {
      // Try with repair
      try {
        return JSON.parse(repairJson(candidate));
      } catch {
        // Try this strategy's output with repair, then continue
        continue;
      }
    }
  }

  throw new Error('Kein valides JSON in der KI-Antwort gefunden');
}

export async function POST(request: NextRequest) {
  try {
    if (!OPENROUTER_API_KEY) {
      return NextResponse.json({ error: 'API-Konfiguration fehlt.' }, { status: 500 });
    }

    const body = await request.json();
    const { extraction, licenseType }: { extraction: ExtractionResult; licenseType: string } = body;

    if (!extraction || !licenseType) {
      return NextResponse.json({ error: 'Fehlende Analysedaten.' }, { status: 400 });
    }

    const prompt = buildAnalysisPrompt(
      extraction.company_info,
      extraction.modules,
      extraction.module_stats,
      extraction.module_analysis_text,
      licenseType
    );

    const response = await fetch(OPENROUTER_BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://tauprocess.de',
        'X-Title': 'Tau Process House CRM Check',
      },
      body: JSON.stringify({
        model: ANALYSIS_MODEL,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 8192,
        // Ask for JSON output explicitly where supported
        response_format: { type: 'json_object' },
      }),
    });

    if (!response.ok) {
      const errBody = await response.text();
      throw new Error(`OpenRouter error ${response.status}: ${errBody}`);
    }

    const data = await response.json();
    const content: string = data.choices?.[0]?.message?.content || '';

    if (!content) {
      throw new Error('Leere Antwort vom KI-Modell');
    }

    const analysis = extractJson(content);

    return NextResponse.json({ analysis });
  } catch (error) {
    console.error('Analyze error:', error);
    return NextResponse.json(
      { error: 'Fehler bei der KI-Analyse. Bitte versuchen Sie es erneut.' },
      { status: 500 }
    );
  }
}
