import PDFDocument from 'pdfkit';
import { AnalysisResult, ExtractionResult } from '@/types/zoho-check';

function safe(val: unknown, fallback = ''): string {
  if (val === null || val === undefined) return fallback;
  return String(val);
}

function safeArr<T>(val: T[] | null | undefined): T[] {
  return Array.isArray(val) ? val : [];
}

export interface PdfOptions {
  analysis: AnalysisResult;
  extraction: ExtractionResult;
  email: string;
  date: string;
}

export async function generateCrmAnalysisPdf(opts: PdfOptions): Promise<Buffer> {
  const { analysis, extraction, email, date } = opts;

  const exec = analysis?.executive_summary ?? {};
  const moduleStats = extraction?.module_stats ?? { total: 0, default: 0, custom: 0, integration: 0 };
  const licenseAnalysis = analysis?.license_fit_analysis ?? {};
  const gapAnalysis = analysis?.gap_analysis ?? {};
  const recommendations = analysis?.recommendations ?? {};
  const quickWins = safeArr((recommendations as { quick_wins?: unknown[] }).quick_wins).slice(0, 3);
  const nextSteps = analysis?.next_steps ?? {};
  const immediateActions = safeArr((nextSteps as { immediate_actions?: string[] }).immediate_actions);

  const allGaps = [
    ...safeArr((gapAnalysis as { missing_standard_modules?: unknown[] }).missing_standard_modules),
    ...safeArr((gapAnalysis as { missing_integrations?: unknown[] }).missing_integrations),
    ...safeArr((gapAnalysis as { process_gaps?: unknown[] }).process_gaps),
  ].slice(0, 6);

  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', margin: 40, bufferPages: true });
    const chunks: Buffer[] = [];

    doc.on('data', (chunk: Buffer) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    const W = doc.page.width - 80; // usable width
    const BLACK = '#000000';
    const WHITE = '#ffffff';
    const GREY = '#666666';
    const LIGHT = '#f5f5f5';

    // ── Helper ──────────────────────────────────────────────────────────────
    function header(title: string, subtitle: string) {
      doc.rect(40, doc.y, W, 56).fill(BLACK);
      doc.fillColor(WHITE).font('Helvetica-Bold').fontSize(18).text(title, 56, doc.y - 48);
      doc.fillColor('#cccccc').font('Helvetica').fontSize(9).text(subtitle, 56, doc.y + 2);
      doc.fillColor(BLACK).moveDown(1.5);
    }

    function sectionTitle(text: string) {
      doc.moveDown(0.5);
      doc.font('Helvetica-Bold').fontSize(12).fillColor(BLACK).text(text);
      doc
        .moveTo(40, doc.y + 2)
        .lineTo(40 + W, doc.y + 2)
        .strokeColor(BLACK)
        .lineWidth(0.5)
        .stroke();
      doc.moveDown(0.5);
    }

    function bulletLine(text: string, indent = 0) {
      doc
        .font('Helvetica')
        .fontSize(9)
        .fillColor(BLACK)
        .text(`• ${safe(text)}`, 40 + indent, doc.y, { width: W - indent });
    }

    function numberedLine(n: number, text: string) {
      doc
        .font('Helvetica')
        .fontSize(9)
        .fillColor(BLACK)
        .text(`${n}. ${safe(text)}`, 40, doc.y, { width: W });
    }

    function labelValue(label: string, value: string) {
      doc
        .font('Helvetica-Bold').fontSize(9).fillColor(GREY).text(label + ': ', 40, doc.y, { continued: true, width: W })
        .font('Helvetica').fillColor(BLACK).text(value);
    }

    function statBoxes(stats: Array<{ label: string; value: number | string }>) {
      const boxW = (W - (stats.length - 1) * 8) / stats.length;
      const startX = 40;
      const startY = doc.y;
      const boxH = 40;
      stats.forEach((s, i) => {
        const x = startX + i * (boxW + 8);
        doc.rect(x, startY, boxW, boxH).fill(LIGHT);
        doc.font('Helvetica-Bold').fontSize(20).fillColor(BLACK).text(String(s.value), x, startY + 4, { width: boxW, align: 'center' });
        doc.font('Helvetica').fontSize(7).fillColor(GREY).text(s.label, x, startY + 26, { width: boxW, align: 'center' });
      });
      doc.y = startY + boxH + 10;
    }

    // ── PAGE 1 ───────────────────────────────────────────────────────────────
    header(
      'Zoho CRM Struktur-Analyse',
      `Erstellt von Tau Process House · ${date} · ${email}`
    );

    // Score box
    const scoreY = doc.y;
    doc.rect(40, scoreY, W, 52).fill(LIGHT);
    doc
      .moveTo(40, scoreY).lineTo(40, scoreY + 52)
      .strokeColor(BLACK).lineWidth(4).stroke();
    doc
      .font('Helvetica-Bold').fontSize(32).fillColor(BLACK)
      .text(`${safe(exec.crm_maturity_score, '0')}/5`, 56, scoreY + 6, { width: 60 });
    doc
      .font('Helvetica-Bold').fontSize(13).fillColor(BLACK)
      .text(safe(exec.crm_maturity_label, 'CRM-Reifegrad'), 128, scoreY + 6, { width: W - 90 });
    doc
      .font('Helvetica').fontSize(9).fillColor('#333333')
      .text(safe(exec.headline), 128, scoreY + 24, { width: W - 90 });
    doc.y = scoreY + 62;

    // Key Findings
    sectionTitle('Wichtigste Erkenntnisse');
    safeArr(exec.key_findings as string[]).forEach((f) => bulletLine(f));

    // Module Stats
    doc.moveDown(0.5);
    sectionTitle('Modul-Statistiken');
    statBoxes([
      { label: 'Module gesamt', value: moduleStats.total ?? 0 },
      { label: 'Standard', value: moduleStats.default ?? 0 },
      { label: 'Integrationen', value: moduleStats.integration ?? 0 },
      { label: 'Custom', value: moduleStats.custom ?? 0 },
    ]);

    // License
    sectionTitle('Lizenz-Analyse');
    labelValue('Aktuelle Lizenz', safe(licenseAnalysis.current_license, '—'));
    labelValue('Nutzungsgrad', `${safe(licenseAnalysis.license_utilization_score, '—')}/5`);
    labelValue('Empfehlung', safe(licenseAnalysis.recommendation));
    if (licenseAnalysis.wasted_potential) {
      labelValue('Ungenutztes Potenzial', safe(licenseAnalysis.wasted_potential));
    }

    // Footer page 1
    doc
      .font('Helvetica').fontSize(7).fillColor(GREY)
      .text('Tau Process House · info@tauprocess.de · tauprocess.de', 40, doc.page.height - 30, { width: W / 2 })
      .text('Seite 1 von 2', 40, doc.page.height - 30, { width: W, align: 'right' });

    // ── PAGE 2 ───────────────────────────────────────────────────────────────
    doc.addPage();
    header('Empfehlungen & Maßnahmen', `Tau Process House · ${email}`);

    // Quick Wins
    if (quickWins.length > 0) {
      sectionTitle('Quick Wins');
      quickWins.forEach((qw: unknown) => {
        const q = qw as { title?: string; description?: string; effort?: string; impact?: string; timeframe?: string };
        doc
          .moveTo(40, doc.y).lineTo(42, doc.y + 28)
          .strokeColor(BLACK).lineWidth(2).stroke();
        doc.font('Helvetica-Bold').fontSize(9).fillColor(BLACK).text(safe(q.title), 50, doc.y, { width: W - 10 });
        doc.font('Helvetica').fontSize(8).fillColor('#333333').text(safe(q.description), 50, doc.y, { width: W - 10 });
        doc.font('Helvetica').fontSize(7).fillColor(GREY)
          .text(`Aufwand: ${safe(q.effort)} · Impact: ${safe(q.impact)} · Zeitrahmen: ${safe(q.timeframe)}`, 50, doc.y, { width: W - 10 });
        doc.moveDown(0.6);
      });
    }

    // Gap Analysis
    if (allGaps.length > 0) {
      sectionTitle('Gap-Analyse');
      allGaps.forEach((gap: unknown) => {
        const g = gap as { priority?: string; module?: string; integration?: string; gap?: string; reason?: string; use_case?: string; impact?: string };
        const prio = safe(g.priority, '—');
        const name = safe(g.module ?? g.integration ?? g.gap);
        const desc = safe(g.reason ?? g.use_case ?? g.impact);
        bulletLine(`[${prio}] ${name}: ${desc}`);
      });
    }

    // Next Steps
    if (immediateActions.length > 0) {
      doc.moveDown(0.5);
      sectionTitle('Nächste Schritte');
      immediateActions.forEach((a: string, i: number) => numberedLine(i + 1, a));
    }

    // Primary Recommendation callout
    doc.moveDown(1);
    const ctaY = doc.y;
    doc.rect(40, ctaY, W, 44).fill(BLACK);
    doc.font('Helvetica-Bold').fontSize(11).fillColor(WHITE).text('Primäre Empfehlung', 56, ctaY + 6, { width: W - 32 });
    doc.font('Helvetica').fontSize(9).fillColor('#cccccc').text(safe(exec.primary_recommendation), 56, ctaY + 22, { width: W - 32 });
    doc.y = ctaY + 54;

    // CTA box
    const ctaBoxY = doc.y;
    doc.rect(40, ctaBoxY, W, 38).stroke();
    doc.font('Helvetica-Bold').fontSize(10).fillColor(BLACK).text('Interesse an einer vertieften Analyse?', 52, ctaBoxY + 6, { width: W - 24 });
    doc.font('Helvetica').fontSize(8).fillColor('#333333').text('Sprechen Sie mit uns über Ihre CRM-Optimierung. Kostenloser Ersttermin: info@tauprocess.de', 52, ctaBoxY + 20, { width: W - 24 });

    // Footer page 2
    doc
      .font('Helvetica').fontSize(7).fillColor(GREY)
      .text('Tau Process House · info@tauprocess.de · tauprocess.de', 40, doc.page.height - 30, { width: W / 2 })
      .text('Seite 2 von 2', 40, doc.page.height - 30, { width: W, align: 'right' });

    doc.end();
  });
}
