'use client';

import { motion } from 'framer-motion';
import { Download, FileText, AlertTriangle, CheckCircle2, XCircle, TrendingUp, Lightbulb, ArrowRight, Award } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface ScoreBreakdown {
  category: string;
  score: number;
  maxScore: number;
  weight: number;
  percentage: number;
  status: 'excellent' | 'good' | 'needs-work' | 'critical';
  issues: string[];
}

interface FinancialImpactDetail {
  range: string;
  assumptions: string[];
  methodology: string;
  compounding: {
    now: string;
    threeMonths: string;
    sixMonths: string;
  };
}

interface ScoringLayers {
  deterministic: {
    checksRun: number;
    checksPassed: number;
    checksFailed: number;
  };
  heuristic: {
    principlesEvaluated: number;
    violationsFound: number;
    score: number;
  };
  industryPatterns: {
    patternsMatched: number;
    gapsIdentified: number;
  };
}

interface UXDebtIssue {
  title: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  impact: string;
  estimatedCost: string;
  category: string;
  practitionerNote?: string;
  specificActions?: string[];
  whyThisMatters?: string;
  tradeoffs?: string;
}

interface AnalysisResult {
  score: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  financialImpact: string;
  financialImpactDetail: FinancialImpactDetail;
  issues: UXDebtIssue[];
  quickWins: string[];
  scalabilityRisks: string[];
  recommendedRoadmap: {
    immediate: string[];
    shortTerm: string[];
    longTerm: string[];
  };
  scoreBreakdown: ScoreBreakdown[];
  scoringLayers: ScoringLayers;
  analyzedUrl?: string;
}

interface ResultsProps {
  result: AnalysisResult;
  productUrl: string;
  onDownloadPDF: () => void;
  onDownloadCSV: () => void;
  isGenerating?: boolean;
}

// Professional color constants - Navy & Teal
const COLORS = {
  navy900: 'hsl(216, 33%, 12%)',
  navy800: 'hsl(215, 28%, 17%)',
  navy700: 'hsl(215, 25%, 27%)',
  navy600: 'hsl(215, 19%, 35%)',
  navy500: 'hsl(215, 16%, 47%)',
  navy200: 'hsl(214, 32%, 91%)',
  navy100: 'hsl(210, 40%, 96%)',
  navy50: 'hsl(210, 40%, 98%)',
  
  teal700: 'hsl(173, 80%, 24%)',
  teal600: 'hsl(173, 70%, 31%)',
  teal500: 'hsl(173, 58%, 39%)',
  teal400: 'hsl(173, 58%, 55%)',
  teal100: 'hsl(173, 58%, 92%)',
  teal50: 'hsl(173, 58%, 96%)',
  
  blue600: 'hsl(201, 96%, 32%)',
  blue500: 'hsl(201, 96%, 40%)',
  
  emerald700: 'hsl(142, 76%, 26%)',
  emerald600: 'hsl(142, 76%, 36%)',
  emerald500: 'hsl(142, 76%, 42%)',
  emerald100: 'hsl(142, 76%, 92%)',
  emerald50: 'hsl(142, 76%, 96%)',
  
  amber700: 'hsl(38, 92%, 30%)',
  amber600: 'hsl(38, 92%, 40%)',
  amber500: 'hsl(38, 92%, 50%)',
  amber100: 'hsl(38, 92%, 92%)',
  amber50: 'hsl(38, 92%, 96%)',
  
  red700: 'hsl(0, 84%, 35%)',
  red600: 'hsl(0, 84%, 45%)',
  red500: 'hsl(0, 84%, 60%)',
  red100: 'hsl(0, 84%, 92%)',
  red50: 'hsl(0, 84%, 96%)',
};

export function Results({ result, productUrl, onDownloadPDF, onDownloadCSV, isGenerating }: ResultsProps) {
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return COLORS.emerald600;
    if (score >= 60) return COLORS.blue600;
    if (score >= 40) return COLORS.amber600;
    return COLORS.red600;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return COLORS.emerald600;
      case 'good': return COLORS.blue600;
      case 'needs-work': return COLORS.amber600;
      case 'critical': return COLORS.red600;
      default: return COLORS.navy500;
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'excellent': return COLORS.emerald50;
      case 'good': return COLORS.teal50;
      case 'needs-work': return COLORS.amber50;
      case 'critical': return COLORS.red50;
      default: return COLORS.navy50;
    }
  };

  const getStatusBorder = (status: string) => {
    switch (status) {
      case 'excellent': return COLORS.emerald600;
      case 'good': return COLORS.blue600;
      case 'needs-work': return COLORS.amber600;
      case 'critical': return COLORS.red600;
      default: return COLORS.navy200;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Executive Summary - PERFECT READABILITY */}
      <Card className="p-8 bg-white border-2 shadow-lg" style={{ borderColor: COLORS.navy200 }}>
        <div className="space-y-6">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold" style={{ color: COLORS.navy900, fontFamily: 'JetBrains Mono, monospace' }}>
                Executive Summary
              </h2>
              <p className="font-semibold" style={{ color: COLORS.navy700 }}>
                Analysis for:{' '}
                <span className="font-bold" style={{ color: COLORS.teal700 }}>
                  {productUrl || result.analyzedUrl}
                </span>
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={onDownloadCSV}
                variant="outline"
                className="font-semibold"
                style={{
                  borderWidth: '2px',
                  borderColor: COLORS.navy200,
                  color: COLORS.navy800
                }}
                disabled={isGenerating}
              >
                <FileText className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
              <Button
                onClick={onDownloadPDF}
                className="font-semibold shadow-md gradient-professional text-white"
                disabled={isGenerating}
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* UX Debt Score */}
            <div className="p-6 bg-white rounded-xl border-2" style={{ borderColor: COLORS.navy200 }}>
              <div className="text-xs font-bold mb-2 uppercase" 
                style={{ 
                  color: COLORS.navy600,
                  fontFamily: 'JetBrains Mono, monospace',
                  letterSpacing: '0.05em'
                }}
              >
                UX Debt Score
              </div>
              <div className="text-5xl font-bold mb-2" 
                style={{ 
                  color: getScoreColor(result.score),
                  fontFamily: 'JetBrains Mono, monospace'
                }}
              >
                {result.score}/100
              </div>
              <div className="text-sm font-bold" style={{ color: COLORS.navy700 }}>
                Risk: <span style={{ color: getScoreColor(result.score) }}>
                  {result.riskLevel.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Financial Impact */}
            <div className="p-6 bg-white rounded-xl border-2" style={{ borderColor: COLORS.amber600 }}>
              <div className="text-xs font-bold mb-2 uppercase" 
                style={{ 
                  color: COLORS.amber700,
                  fontFamily: 'JetBrains Mono, monospace',
                  letterSpacing: '0.05em'
                }}
              >
                Financial Impact
              </div>
              <div className="text-2xl font-bold mb-1" 
                style={{ 
                  color: COLORS.amber700,
                  fontFamily: 'JetBrains Mono, monospace'
                }}
              >
                {result.financialImpactDetail.range}
              </div>
              <div className="text-sm font-bold" style={{ color: COLORS.navy700 }}>
                per month in lost revenue
              </div>
            </div>

            {/* Issues Found */}
            <div className="p-6 bg-white rounded-xl border-2" style={{ borderColor: COLORS.red600 }}>
              <div className="text-xs font-bold mb-2 uppercase" 
                style={{ 
                  color: COLORS.red700,
                  fontFamily: 'JetBrains Mono, monospace',
                  letterSpacing: '0.05em'
                }}
              >
                Issues Found
              </div>
              <div className="text-5xl font-bold mb-1" 
                style={{ 
                  color: COLORS.red600,
                  fontFamily: 'JetBrains Mono, monospace'
                }}
              >
                {result.issues.length}
              </div>
              <div className="text-sm font-bold" style={{ color: COLORS.navy700 }}>
                {result.issues.filter(i => i.severity === 'critical').length} critical
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Wins - COMPLETELY FIXED - DARK TEXT ON WHITE */}
      <Card className="p-8 bg-white border-2 shadow-lg" style={{ borderColor: COLORS.emerald600 }}>
        <div className="flex items-center gap-3 mb-6">
          <Award className="w-8 h-8" style={{ color: COLORS.emerald600 }} />
          <h2 className="text-2xl font-bold" 
            style={{ 
              color: COLORS.navy900,
              fontFamily: 'JetBrains Mono, monospace'
            }}
          >
            Quick Wins (Weeks 1-2)
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {result.quickWins.map((win, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-start gap-3 p-4 bg-white rounded-lg border-2"
              style={{ borderColor: COLORS.emerald600 }}
            >
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: COLORS.emerald600 }} />
              <span className="font-semibold" style={{ color: COLORS.navy800 }}>
                {win}
              </span>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Scalability Risks - COMPLETELY FIXED - DARK TEXT ON WHITE */}
      {result.scalabilityRisks.length > 0 && (
        <Card className="p-8 bg-white border-2 shadow-lg" style={{ borderColor: COLORS.red600 }}>
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-8 h-8" style={{ color: COLORS.red600 }} />
            <h2 className="text-2xl font-bold" 
              style={{ 
                color: COLORS.navy900,
                fontFamily: 'JetBrains Mono, monospace'
              }}
            >
              Scalability Risks
            </h2>
          </div>
          <ul className="space-y-3">
            {result.scalabilityRisks.map((risk, index) => (
              <li key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg border-2"
                style={{ borderColor: COLORS.red600 }}
              >
                <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: COLORS.red600 }} />
                <span className="font-semibold" style={{ color: COLORS.navy800 }}>
                  {risk}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Score Breakdown */}
      <Card className="p-8 bg-white border-2 shadow-lg" style={{ borderColor: COLORS.navy200 }}>
        <h2 className="text-2xl font-bold mb-6" 
          style={{ 
            color: COLORS.navy900,
            fontFamily: 'JetBrains Mono, monospace'
          }}
        >
          Score Breakdown
        </h2>
        
        <div className="mb-8 p-6 rounded-xl" style={{ backgroundColor: COLORS.navy50 }}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={result.scoreBreakdown}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.navy200} />
              <XAxis 
                dataKey="category"
                stroke={COLORS.navy800}
                style={{ 
                  fontSize: '12px',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontWeight: 600,
                  fill: COLORS.navy800
                }}
              />
              <YAxis 
                stroke={COLORS.navy800}
                style={{ 
                  fontSize: '12px',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontWeight: 600,
                  fill: COLORS.navy800
                }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: `2px solid ${COLORS.navy200}`,
                  borderRadius: '8px',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontWeight: 600,
                  color: COLORS.navy900
                }}
                labelStyle={{ color: COLORS.navy900, fontWeight: 700 }}
              />
              <Bar dataKey="score" radius={[8, 8, 0, 0]}>
                {result.scoreBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getStatusColor(entry.status)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-4">
          {result.scoreBreakdown.map((breakdown, index) => (
            <motion.div
              key={breakdown.category}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 bg-white rounded-xl border-2"
              style={{ borderColor: COLORS.navy200 }}
            >
              <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-bold" 
                    style={{ 
                      color: COLORS.navy900,
                      fontFamily: 'JetBrains Mono, monospace'
                    }}
                  >
                    {breakdown.category}
                  </h3>
                  <span 
                    className="px-3 py-1 rounded-full text-xs font-bold border-2"
                    style={{ 
                      backgroundColor: getStatusBg(breakdown.status),
                      borderColor: getStatusBorder(breakdown.status),
                      color: getStatusColor(breakdown.status),
                      fontFamily: 'JetBrains Mono, monospace'
                    }}
                  >
                    {breakdown.status.toUpperCase().replace('-', ' ')}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold" 
                    style={{ 
                      color: getStatusColor(breakdown.status),
                      fontFamily: 'JetBrains Mono, monospace'
                    }}
                  >
                    {breakdown.score}/{breakdown.maxScore}
                  </div>
                  <div className="text-sm font-semibold" style={{ color: COLORS.navy600 }}>
                    ({breakdown.percentage}%)
                  </div>
                </div>
              </div>

              <div className="w-full h-2 rounded-full mb-4" style={{ backgroundColor: COLORS.navy100 }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${breakdown.percentage}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: getStatusColor(breakdown.status) }}
                />
              </div>

              {breakdown.issues.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs font-bold uppercase" 
                    style={{ 
                      color: COLORS.navy700,
                      fontFamily: 'JetBrains Mono, monospace',
                      letterSpacing: '0.05em'
                    }}
                  >
                    Issues:
                  </div>
                  <ul className="space-y-1">
                    {breakdown.issues.map((issue, idx) => (
                      <li key={idx} className="text-sm font-medium flex items-start gap-2"
                        style={{ color: COLORS.navy800 }}
                      >
                        <span style={{ color: COLORS.red600 }} className="mt-1 font-bold">•</span>
                        <span>{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Top Blockers */}
      <Card className="p-8 bg-white border-2 shadow-lg" style={{ borderColor: COLORS.navy200 }}>
        <h2 className="text-2xl font-bold mb-6" 
          style={{ 
            color: COLORS.navy900,
            fontFamily: 'JetBrains Mono, monospace'
          }}
        >
          Top Blockers
        </h2>
        <div className="space-y-6">
          {result.issues.slice(0, 3).map((issue, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 bg-white rounded-xl border-2"
              style={{ borderColor: COLORS.navy200 }}
            >
              <div className="mb-4">
                <h3 className="text-xl font-bold mb-2" style={{ color: COLORS.navy900 }}>
                  {issue.title}
                </h3>
                <p className="font-medium mb-3" style={{ color: COLORS.navy700 }}>
                  {issue.impact}
                </p>
                <div className="inline-block px-3 py-1 rounded-lg border-2 text-sm font-bold"
                  style={{
                    backgroundColor: COLORS.amber50,
                    borderColor: COLORS.amber600,
                    color: COLORS.amber700,
                    fontFamily: 'JetBrains Mono, monospace'
                  }}
                >
                  Cost: {issue.estimatedCost}
                </div>
              </div>

              {issue.practitionerNote && (
                <div className="mb-4 p-4 border-2 rounded-lg"
                  style={{
                    backgroundColor: COLORS.teal50,
                    borderColor: COLORS.teal600
                  }}
                >
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-5 h-5 flex-shrink-0 mt-1" style={{ color: COLORS.teal700 }} />
                    <div>
                      <div className="text-xs font-bold mb-1 uppercase" 
                        style={{ 
                          color: COLORS.teal700,
                          fontFamily: 'JetBrains Mono, monospace',
                          letterSpacing: '0.05em'
                        }}
                      >
                        Practitioner Note
                      </div>
                      <p className="text-sm font-medium italic" style={{ color: COLORS.navy800 }}>
                        {issue.practitionerNote}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {issue.specificActions && issue.specificActions.length > 0 && (
                <div className="mb-4">
                  <div className="text-xs font-bold mb-3 uppercase" 
                    style={{ 
                      color: COLORS.navy700,
                      fontFamily: 'JetBrains Mono, monospace',
                      letterSpacing: '0.05em'
                    }}
                  >
                    Specific Actions
                  </div>
                  <div className="space-y-2">
                    {issue.specificActions.map((action, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <input 
                          type="checkbox" 
                          className="mt-1 w-4 h-4 rounded"
                          id={`action-${index}-${idx}`}
                        />
                        <label 
                          htmlFor={`action-${index}-${idx}`} 
                          className="text-sm font-medium cursor-pointer"
                          style={{ color: COLORS.navy800 }}
                        >
                          {action}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Recommended Roadmap */}
      <Card className="p-8 bg-white border-2 shadow-lg" style={{ borderColor: COLORS.navy200 }}>
        <h2 className="text-2xl font-bold mb-6" 
          style={{ 
            color: COLORS.navy900,
            fontFamily: 'JetBrains Mono, monospace'
          }}
        >
          Recommended Roadmap
        </h2>
        
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.red600 }}></div>
              <h3 className="text-lg font-bold" 
                style={{ 
                  color: COLORS.navy900,
                  fontFamily: 'JetBrains Mono, monospace'
                }}
              >
                IMMEDIATE (Weeks 1-2)
              </h3>
            </div>
            <ul className="space-y-2 pl-5">
              {result.recommendedRoadmap.immediate.map((item, index) => (
                <li key={index} className="flex items-start gap-2 font-medium"
                  style={{ color: COLORS.navy800 }}
                >
                  <ArrowRight className="w-4 h-4 flex-shrink-0 mt-1" style={{ color: COLORS.red600 }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.amber600 }}></div>
              <h3 className="text-lg font-bold" 
                style={{ 
                  color: COLORS.navy900,
                  fontFamily: 'JetBrains Mono, monospace'
                }}
              >
                FOUNDATION (Weeks 3-6)
              </h3>
            </div>
            <ul className="space-y-2 pl-5">
              {result.recommendedRoadmap.shortTerm.map((item, index) => (
                <li key={index} className="flex items-start gap-2 font-medium"
                  style={{ color: COLORS.navy800 }}
                >
                  <ArrowRight className="w-4 h-4 flex-shrink-0 mt-1" style={{ color: COLORS.amber600 }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.blue600 }}></div>
              <h3 className="text-lg font-bold" 
                style={{ 
                  color: COLORS.navy900,
                  fontFamily: 'JetBrains Mono, monospace'
                }}
              >
                SCALABILITY (Weeks 7-12)
              </h3>
            </div>
            <ul className="space-y-2 pl-5">
              {result.recommendedRoadmap.longTerm.map((item, index) => (
                <li key={index} className="flex items-start gap-2 font-medium"
                  style={{ color: COLORS.navy800 }}
                >
                  <ArrowRight className="w-4 h-4 flex-shrink-0 mt-1" style={{ color: COLORS.blue600 }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>

      {/* Final CTA */}
      <Card className="p-8 border-2 shadow-xl gradient-professional">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-white" 
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            Ready to Fix Your UX Debt?
          </h2>
          <p className="text-white text-lg font-medium">
            This isn't optimization—this is survival. The companies that wait spend 10x more.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              onClick={onDownloadPDF}
              size="lg"
              className="bg-white hover:bg-gray-100 font-bold shadow-lg"
              style={{ color: COLORS.navy900 }}
              disabled={isGenerating}
            >
              <Download className="w-4 h-4 mr-2" />
              Download Full Report
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}