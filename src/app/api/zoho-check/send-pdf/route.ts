import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { generateCrmAnalysisPdf } from '@/lib/zoho-check/pdf-generator';
import { AnalysisResult, ExtractionResult } from '@/types/zoho-check';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, analysis, extraction, optIn }: {
      email: string;
      analysis: AnalysisResult;
      extraction: ExtractionResult;
      optIn: boolean;
    } = body;

    if (!email || !analysis || !extraction) {
      return NextResponse.json({ error: 'Fehlende Daten.' }, { status: 400 });
    }

    const date = new Date().toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });

    // Generate PDF using pdfkit (no React dependency)
    const pdfBuffer = await generateCrmAnalysisPdf({ analysis, extraction, email, date });

    // Send email via Resend
    const { error: sendError } = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'info@tauprocess.de',
      to: email,
      bcc: 'rimbas.itb+crmcheck@gmail.com',
      subject: `Ihre Zoho CRM Analyse von Tau Process House — ${date}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #000; padding: 24px;">
            <h1 style="color: #fff; margin: 0; font-size: 20px;">Tau Process House</h1>
            <p style="color: #ccc; margin: 8px 0 0;">Ihre Zoho CRM Analyse</p>
          </div>
          <div style="padding: 24px;">
            <p>Guten Tag,</p>
            <p>anbei finden Sie Ihre persönliche Zoho CRM Struktur-Analyse. Das Dokument enthält:</p>
            <ul>
              <li>Executive Summary mit CRM-Reifegrad-Score</li>
              <li>Modul-Statistiken und Bewertung</li>
              <li>Quick Wins und konkrete Handlungsempfehlungen</li>
              <li>Gap-Analyse und strategische Schritte</li>
            </ul>
            <p><strong>Primäre Empfehlung:</strong> ${analysis.executive_summary?.primary_recommendation ?? ''}</p>
            ${optIn ? '<p style="color: #666; font-size: 12px;">Sie erhalten gelegentlich weitere Tipps zu Zoho CRM und Prozessoptimierung von Tau Process House. Abmeldung jederzeit möglich.</p>' : ''}
            <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
            <p>Haben Sie Fragen oder möchten einen kostenlosen Beratungstermin vereinbaren?</p>
            <a href="mailto:info@tauprocess.de" style="background: #000; color: #fff; padding: 12px 24px; text-decoration: none; display: inline-block;">info@tauprocess.de</a>
          </div>
          <div style="background: #f5f5f5; padding: 16px; font-size: 12px; color: #666;">
            Tau Process House · tauprocess.de · info@tauprocess.de
          </div>
        </div>
      `,
      attachments: [
        {
          filename: `zoho-crm-analyse-${date.replace(/\./g, '-')}.pdf`,
          content: pdfBuffer,
        },
      ],
    });

    if (sendError) {
      throw new Error(sendError.message);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Send PDF error:', error);
    return NextResponse.json({ error: 'Fehler beim Versenden der E-Mail. Bitte versuchen Sie es erneut.' }, { status: 500 });
  }
}
