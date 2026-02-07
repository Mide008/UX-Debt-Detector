// app/api/generate-csv/route.ts - FIXED VERSION
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { result, productUrl } = body;

    if (!result) {
      return NextResponse.json(
        { error: 'No analysis result provided' },
        { status: 400 }
      );
    }

    // Build CSV content
    const lines: string[] = [];

    // Header
    lines.push('UX DEBT ANALYSIS REPORT');
    lines.push(`Product URL,${escapeCSV(productUrl || result.analyzedUrl || 'Unknown')}`);
    lines.push(`Analysis Date,${new Date().toLocaleDateString()}`);
    lines.push(`Overall Score,${result.score}/100`);
    lines.push(`Risk Level,${(result.riskLevel || 'medium').toUpperCase()}`);
    lines.push(`Financial Impact,${result.financialImpact || 'N/A'}`);
    lines.push('');

    // Score Breakdown
    if (result.scoreBreakdown && result.scoreBreakdown.length > 0) {
      lines.push('SCORE BREAKDOWN');
      lines.push('Category,Score,Max Score,Percentage,Status,Issues');
      result.scoreBreakdown.forEach((breakdown: any) => {
        const issuesText = (breakdown.issues || []).join('; ');
        lines.push(
          `${escapeCSV(breakdown.category)},` +
          `${breakdown.score},` +
          `${breakdown.maxScore},` +
          `${breakdown.percentage}%,` +
          `${(breakdown.status || 'unknown').toUpperCase()},` +
          `${escapeCSV(issuesText)}`
        );
      });
      lines.push('');
    }

    // Issues
    if (result.issues && result.issues.length > 0) {
      lines.push('DETAILED ISSUES');
      lines.push('Priority,Title,Severity,Category,Impact,Estimated Cost,Why This Matters,Specific Actions,Trade-offs,Practitioner Note');
      
      result.issues.forEach((issue: any, index: number) => {
        const specificActions = (issue.specificActions || []).join('; ');
        
        lines.push(
          `${index + 1},` +
          `${escapeCSV(issue.title || '')},` +
          `${(issue.severity || 'medium').toUpperCase()},` +
          `${escapeCSV(issue.category || '')},` +
          `${escapeCSV(issue.impact || '')},` +
          `${escapeCSV(issue.estimatedCost || '')},` +
          `${escapeCSV(issue.whyThisMatters || '')},` +
          `${escapeCSV(specificActions)},` +
          `${escapeCSV(issue.tradeoffs || '')},` +
          `${escapeCSV(issue.practitionerNote || '')}`
        );
      });
      lines.push('');
    }

    // Quick Wins
    if (result.quickWins && result.quickWins.length > 0) {
      lines.push('QUICK WINS (Weeks 1-2)');
      result.quickWins.forEach((win: string, index: number) => {
        lines.push(`${index + 1},${escapeCSV(win)}`);
      });
      lines.push('');
    }

    // Scalability Risks
    if (result.scalabilityRisks && result.scalabilityRisks.length > 0) {
      lines.push('SCALABILITY RISKS');
      result.scalabilityRisks.forEach((risk: string, index: number) => {
        lines.push(`${index + 1},${escapeCSV(risk)}`);
      });
    }

    const csvContent = lines.join('\n');

    // Return CSV file with proper headers
    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="ux-debt-analysis-${Date.now()}.csv"`,
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error('CSV generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate CSV. Please try again.' },
      { status: 500 }
    );
  }
}

// Helper function to escape CSV values properly
function escapeCSV(value: string): string {
  if (!value) return '';
  
  // Convert to string if not already
  const stringValue = String(value);
  
  // If the value contains commas, quotes, or newlines, wrap it in quotes
  if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
    // Escape existing quotes by doubling them
    const escaped = stringValue.replace(/"/g, '""');
    return `"${escaped}"`;
  }
  
  return stringValue;
}