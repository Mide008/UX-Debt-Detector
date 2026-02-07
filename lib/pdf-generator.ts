// lib/pdf-generator.ts - SIMPLIFIED AND FIXED VERSION
import { jsPDF } from 'jspdf';

interface AnalysisResult {
  score: number;
  riskLevel: string;
  financialImpact: string;
  financialImpactDetail?: any;
  issues: any[];
  quickWins: string[];
  scalabilityRisks?: string[];
  recommendedRoadmap?: any;
  scoreBreakdown?: any[];
  scoringLayers?: any;
  analyzedUrl?: string;
}

export function generatePDF(result: AnalysisResult, productUrl: string): jsPDF {
  const doc = new jsPDF();
  let y = 20;
  const margin = 20;
  const pageWidth = doc.internal.pageSize.getWidth();
  const contentWidth = pageWidth - (margin * 2);

  // Helper: Check if we need new page
  const checkPage = (space: number) => {
    if (y + space > 270) {
      doc.addPage();
      y = 20;
    }
  };

  // Helper: Add text
  const addText = (text: string, size = 10, bold = false) => {
    checkPage(10);
    doc.setFontSize(size);
    doc.setFont('helvetica', bold ? 'bold' : 'normal');
    const lines = doc.splitTextToSize(text, contentWidth);
    doc.text(lines, margin, y);
    y += (lines.length * (size * 0.5)) + 3;
  };

  // === COVER PAGE ===
  doc.setFillColor(147, 51, 234); // Purple
  doc.rect(0, 0, pageWidth, 60, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('UX DEBT ANALYSIS', margin, 35);
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Professional UX Assessment Report', margin, 48);
  
  doc.setTextColor(0, 0, 0);
  y = 80;

  addText(`Product: ${productUrl || result.analyzedUrl || 'Analysis'}`, 12, true);
  addText(`Date: ${new Date().toLocaleDateString()}`);
  addText(`Score: ${result.score}/100`, 12, true);
  addText(`Risk Level: ${(result.riskLevel || 'medium').toUpperCase()}`);
  addText(`Financial Impact: ${result.financialImpact || 'Calculating...'}`);
  y += 10;

  // === SCORE BREAKDOWN ===
  if (result.scoreBreakdown && result.scoreBreakdown.length > 0) {
    checkPage(30);
    addText('SCORE BREAKDOWN', 16, true);
    y += 5;

    result.scoreBreakdown.forEach((breakdown: any) => {
      checkPage(20);
      addText(`${breakdown.category}: ${breakdown.score}/${breakdown.maxScore} (${breakdown.percentage}%)`, 11, true);
      
      if (breakdown.issues && breakdown.issues.length > 0) {
        breakdown.issues.forEach((issue: string) => {
          addText(`• ${issue}`, 9);
        });
      }
      y += 5;
    });
  }

  // === TOP ISSUES ===
  doc.addPage();
  y = 20;
  
  addText('TOP ISSUES', 16, true);
  y += 5;

  const topIssues = result.issues.slice(0, 5);
  topIssues.forEach((issue: any, index: number) => {
    checkPage(40);
    
    addText(`${index + 1}. ${issue.title}`, 12, true);
    addText(`Severity: ${(issue.severity || 'medium').toUpperCase()} | Cost: ${issue.estimatedCost || 'TBD'}`);
    addText(`Impact: ${issue.impact || 'Needs attention'}`, 9);
    
    if (issue.specificActions && issue.specificActions.length > 0) {
      addText('Actions:', 10, true);
      issue.specificActions.slice(0, 3).forEach((action: string) => {
        addText(`• ${action}`, 9);
      });
    }
    
    y += 10;
  });

  // === QUICK WINS ===
  doc.addPage();
  y = 20;
  
  addText('QUICK WINS', 16, true);
  y += 5;

  result.quickWins.forEach((win: string) => {
    checkPage(10);
    addText(`• ${win}`, 10);
  });

  y += 10;

  // === ROADMAP ===
  if (result.recommendedRoadmap) {
    checkPage(30);
    addText('RECOMMENDED ROADMAP', 16, true);
    y += 5;

    if (result.recommendedRoadmap.immediate) {
      addText('IMMEDIATE (Weeks 1-2):', 12, true);
      result.recommendedRoadmap.immediate.forEach((item: string) => {
        checkPage(8);
        addText(`• ${item}`, 9);
      });
      y += 5;
    }

    if (result.recommendedRoadmap.shortTerm) {
      checkPage(15);
      addText('SHORT-TERM (Weeks 3-6):', 12, true);
      result.recommendedRoadmap.shortTerm.forEach((item: string) => {
        checkPage(8);
        addText(`• ${item}`, 9);
      });
      y += 5;
    }

    if (result.recommendedRoadmap.longTerm) {
      checkPage(15);
      addText('LONG-TERM (Weeks 7-12):', 12, true);
      result.recommendedRoadmap.longTerm.forEach((item: string) => {
        checkPage(8);
        addText(`• ${item}`, 9);
      });
    }
  }

  // === FINAL PAGE ===
  doc.addPage();
  y = 20;

  doc.setFillColor(147, 51, 234);
  doc.rect(0, 0, pageWidth, 60, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('Ready to Fix Your UX Debt?', margin, 35);
  
  doc.setTextColor(0, 0, 0);
  y = 80;

  addText('NEXT STEPS:', 14, true);
  addText('1. Share this report with your team');
  addText('2. Prioritize Quick Wins for immediate implementation');
  addText('3. Schedule time for critical issues in next sprint');
  addText('4. Set up monthly UX debt reviews');
  
  y += 10;
  addText('Prevention costs less than remediation. Fix issues now while they\'re still surgical.', 10, true);

  return doc;
}