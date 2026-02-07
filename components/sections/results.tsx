'use client';

import { motion } from 'framer-motion';
import { Download, FileText, AlertTriangle, CheckCircle2, XCircle, TrendingUp, Lightbulb, ArrowRight } from 'lucide-react';
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
}

interface ResultsProps {
  result: AnalysisResult;
  productUrl: string;
  onDownloadPDF: () => void;
  onDownloadCSV: () => void;
  isGenerating?: boolean;
}

export function Results({ result, productUrl, onDownloadPDF, onDownloadCSV, isGenerating }: ResultsProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-amber-500';
    if (score >= 40) return 'text-orange-500';
    return 'text-red-500';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return '#10b981';
      case 'good': return '#3b82f6';
      case 'needs-work': return '#f59e0b';
      case 'critical': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'excellent': return 'EXCELLENT';
      case 'good': return 'GOOD';
      case 'needs-work': return 'NEEDS WORK';
      case 'critical': return 'CRITICAL';
      default: return 'UNKNOWN';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <XCircle className="w-5 h-5 text-red-500" />;
      case 'high': return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      case 'medium': return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'low': return <CheckCircle2 className="w-5 h-5 text-blue-500" />;
      default: return <AlertTriangle className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Executive Summary */}
      <Card className="p-8 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 border-purple-500/20">
        <div className="space-y-6">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-white font-mono">Executive Summary</h2>
              <p className="text-slate-400">Analysis for: <span className="text-purple-400">{productUrl}</span></p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={onDownloadCSV}
                variant="outline"
                className="border-purple-500/50 hover:bg-purple-500/10"
                disabled={isGenerating}
              >
                <FileText className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
              <Button
                onClick={onDownloadPDF}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                disabled={isGenerating}
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* UX Debt Score */}
            <div className="p-6 bg-slate-800/50 rounded-lg border border-slate-700/50">
              <div className="text-sm text-slate-400 mb-2 font-mono">UX DEBT SCORE</div>
              <div className={`text-5xl font-bold font-mono ${getScoreColor(result.score)}`}>
                {result.score}/100
              </div>
              <div className="mt-2 text-sm font-mono text-slate-400">
                Risk Level: <span className={`font-bold ${
                  result.riskLevel === 'critical' ? 'text-red-500' :
                  result.riskLevel === 'high' ? 'text-orange-500' :
                  result.riskLevel === 'medium' ? 'text-amber-500' :
                  'text-green-500'
                }`}>{result.riskLevel.toUpperCase()}</span>
              </div>
            </div>

            {/* Financial Impact */}
            <div className="p-6 bg-slate-800/50 rounded-lg border border-slate-700/50">
              <div className="text-sm text-slate-400 mb-2 font-mono">FINANCIAL IMPACT</div>
              <div className="text-2xl font-bold text-amber-500 font-mono">
                {result.financialImpactDetail.range}
              </div>
              <div className="mt-2 text-sm text-slate-400">per month in lost revenue</div>
            </div>

            {/* Issues Found */}
            <div className="p-6 bg-slate-800/50 rounded-lg border border-slate-700/50">
              <div className="text-sm text-slate-400 mb-2 font-mono">ISSUES FOUND</div>
              <div className="text-5xl font-bold text-red-500 font-mono">
                {result.issues.length}
              </div>
              <div className="mt-2 text-sm text-slate-400">
                {result.issues.filter(i => i.severity === 'critical').length} critical
              </div>
            </div>
          </div>

          {/* Risk Assessment */}
          <div className="p-6 bg-amber-500/10 border border-amber-500/30 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-amber-500 font-mono">Risk Assessment</h3>
                <p className="text-slate-300">
                  {result.riskLevel === 'critical' && "Critical risk. Your UX debt is at dangerous levels. These issues will be 5x more expensive to fix in 6 months."}
                  {result.riskLevel === 'high' && "High risk. Your UX debt is compounding. These issues will be 3x more expensive to fix in 6 months."}
                  {result.riskLevel === 'medium' && "Moderate risk. Address these issues before they compound. Prevention is cheaper than remediation."}
                  {result.riskLevel === 'low' && "Low risk. You're in good shape, but stay vigilant. Small issues can grow if ignored."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Score Breakdown Visualization */}
      <Card className="p-8 bg-slate-900/50 border-purple-500/20">
        <h2 className="text-2xl font-bold text-white mb-6 font-mono">Score Breakdown</h2>
        
        {/* Bar Chart */}
        <div className="mb-8">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={result.scoreBreakdown}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="category" 
                stroke="#9ca3af"
                style={{ fontSize: '12px', fontFamily: 'Space Mono, monospace' }}
              />
              <YAxis 
                stroke="#9ca3af"
                style={{ fontSize: '12px', fontFamily: 'Space Mono, monospace' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #a855f7',
                  borderRadius: '8px',
                  fontFamily: 'Space Mono, monospace'
                }}
                labelStyle={{ color: '#e2e8f0' }}
              />
              <Bar dataKey="score" radius={[8, 8, 0, 0]}>
                {result.scoreBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getStatusColor(entry.status)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Detailed Breakdown */}
        <div className="space-y-4">
          {result.scoreBreakdown.map((breakdown, index) => (
            <motion.div
              key={breakdown.category}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 bg-slate-800/30 rounded-lg border border-slate-700/50"
            >
              <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-bold text-white font-mono">{breakdown.category}</h3>
                  <span 
                    className="px-3 py-1 rounded-full text-xs font-bold font-mono"
                    style={{ 
                      backgroundColor: `${getStatusColor(breakdown.status)}20`,
                      color: getStatusColor(breakdown.status)
                    }}
                  >
                    {getStatusLabel(breakdown.status)}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold font-mono" style={{ color: getStatusColor(breakdown.status) }}>
                    {breakdown.score}/{breakdown.maxScore}
                  </div>
                  <div className="text-sm text-slate-400">({breakdown.percentage}%)</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-slate-700/50 rounded-full mb-4 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${breakdown.percentage}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: getStatusColor(breakdown.status) }}
                />
              </div>

              {/* Issues */}
              {breakdown.issues.length > 0 && (
                <div className="space-y-2">
                  <div className="text-sm font-mono text-slate-400">Issues:</div>
                  <ul className="space-y-1">
                    {breakdown.issues.map((issue, idx) => (
                      <li key={idx} className="text-sm text-slate-300 flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
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

      {/* Scoring Transparency */}
      <Card className="p-8 bg-slate-900/50 border-purple-500/20">
        <h2 className="text-2xl font-bold text-white mb-6 font-mono">Scoring Methodology</h2>
        <p className="text-slate-300 mb-6">
          Your score is calculated using a three-layer approach for maximum transparency and accuracy:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Layer 1: Deterministic */}
          <div className="p-6 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <div className="text-blue-400 font-mono text-sm mb-2">LAYER 1</div>
            <h3 className="text-lg font-bold text-white mb-4">Deterministic Checks</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Checks Run:</span>
                <span className="text-white font-mono">{result.scoringLayers.deterministic.checksRun}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Passed:</span>
                <span className="text-green-400 font-mono">{result.scoringLayers.deterministic.checksPassed}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Failed:</span>
                <span className="text-red-400 font-mono">{result.scoringLayers.deterministic.checksFailed}</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-4">
              Automated checks for form fields, color contrast, touch targets, load times, etc.
            </p>
          </div>

          {/* Layer 2: Heuristic */}
          <div className="p-6 bg-purple-500/10 border border-purple-500/30 rounded-lg">
            <div className="text-purple-400 font-mono text-sm mb-2">LAYER 2</div>
            <h3 className="text-lg font-bold text-white mb-4">Heuristic Evaluation</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Principles:</span>
                <span className="text-white font-mono">{result.scoringLayers.heuristic.principlesEvaluated}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Violations:</span>
                <span className="text-red-400 font-mono">{result.scoringLayers.heuristic.violationsFound}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Score:</span>
                <span className="text-purple-400 font-mono">{result.scoringLayers.heuristic.score}/100</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-4">
              Based on Nielsen's 10 usability heuristics and UX best practices.
            </p>
          </div>

          {/* Layer 3: Industry Patterns */}
          <div className="p-6 bg-amber-500/10 border border-amber-500/30 rounded-lg">
            <div className="text-amber-400 font-mono text-sm mb-2">LAYER 3</div>
            <h3 className="text-lg font-bold text-white mb-4">Industry Patterns</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Matched:</span>
                <span className="text-green-400 font-mono">{result.scoringLayers.industryPatterns.patternsMatched}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Gaps Found:</span>
                <span className="text-red-400 font-mono">{result.scoringLayers.industryPatterns.gapsIdentified}</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-4">
              Industry-specific patterns for SaaS, E-commerce, Fintech, etc.
            </p>
          </div>
        </div>
      </Card>

      {/* Financial Impact Detail */}
      <Card className="p-8 bg-slate-900/50 border-purple-500/20">
        <h2 className="text-2xl font-bold text-white mb-6 font-mono">Financial Impact Analysis</h2>
        
        <div className="space-y-6">
          {/* Impact Range */}
          <div>
            <div className="text-sm text-slate-400 mb-2 font-mono">ESTIMATED MONTHLY LOSS</div>
            <div className="text-4xl font-bold text-amber-500 font-mono">
              {result.financialImpactDetail.range}
            </div>
          </div>

          {/* Assumptions */}
          <div>
            <h3 className="text-lg font-bold text-white mb-3 font-mono">Assumptions</h3>
            <ul className="space-y-2">
              {result.financialImpactDetail.assumptions.map((assumption, index) => (
                <li key={index} className="flex items-start gap-2 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-1" />
                  <span>{assumption}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Methodology */}
          <div className="p-6 bg-slate-800/30 rounded-lg border border-slate-700/50">
            <h3 className="text-lg font-bold text-white mb-3 font-mono">Methodology</h3>
            <p className="text-slate-300 leading-relaxed">{result.financialImpactDetail.methodology}</p>
          </div>

          {/* Compounding Cost */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 font-mono flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-red-500" />
              Compounding Cost Over Time
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
                <div className="text-sm text-slate-400 mb-1 font-mono">NOW</div>
                <div className="text-2xl font-bold text-amber-500 font-mono">
                  {result.financialImpactDetail.compounding.now}
                </div>
              </div>
              <div className="p-4 bg-slate-800/30 rounded-lg border border-orange-500/30">
                <div className="text-sm text-slate-400 mb-1 font-mono">3 MONTHS</div>
                <div className="text-2xl font-bold text-orange-500 font-mono">
                  {result.financialImpactDetail.compounding.threeMonths}
                </div>
                <div className="text-xs text-slate-400 mt-1">Debt compounds</div>
              </div>
              <div className="p-4 bg-slate-800/30 rounded-lg border border-red-500/30">
                <div className="text-sm text-slate-400 mb-1 font-mono">6 MONTHS</div>
                <div className="text-2xl font-bold text-red-500 font-mono">
                  {result.financialImpactDetail.compounding.sixMonths}
                </div>
                <div className="text-xs text-slate-400 mt-1">Exponential growth</div>
              </div>
            </div>
            <p className="text-sm text-slate-400 mt-4 italic">
              The longer you wait, the more expensive fixes become. Prevention costs less than remediation.
            </p>
          </div>
        </div>
      </Card>

      {/* Top Blockers with Practitioner Notes */}
      <Card className="p-8 bg-slate-900/50 border-purple-500/20">
        <h2 className="text-2xl font-bold text-white mb-6 font-mono">Top Blockers</h2>
        <div className="space-y-6">
          {result.issues.slice(0, 3).map((issue, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 bg-slate-800/30 rounded-lg border border-slate-700/50"
            >
              <div className="flex items-start gap-4 mb-4">
                {getSeverityIcon(issue.severity)}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="text-xl font-bold text-white">{issue.title}</h3>
                    <span className="px-2 py-1 bg-slate-700/50 rounded text-xs font-mono text-slate-400">
                      {issue.category}
                    </span>
                  </div>
                  <p className="text-slate-300 mb-3">{issue.impact}</p>
                  <div className="text-sm text-amber-500 font-mono">
                    Estimated Fix Cost: {issue.estimatedCost}
                  </div>
                </div>
              </div>

              {/* Practitioner Note */}
              {issue.practitionerNote && (
                <div className="mb-4 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-5 h-5 text-purple-400 flex-shrink-0 mt-1" />
                    <div>
                      <div className="text-sm font-mono text-purple-400 mb-1">PRACTITIONER NOTE</div>
                      <p className="text-slate-300 text-sm italic">{issue.practitionerNote}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Why This Matters */}
              {issue.whyThisMatters && (
                <div className="mb-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <div className="text-sm font-mono text-blue-400 mb-2">WHY THIS MATTERS</div>
                  <p className="text-slate-300 text-sm">{issue.whyThisMatters}</p>
                </div>
              )}

              {/* Specific Actions */}
              {issue.specificActions && issue.specificActions.length > 0 && (
                <div className="mb-4">
                  <div className="text-sm font-mono text-slate-400 mb-3">SPECIFIC ACTIONS</div>
                  <div className="space-y-2">
                    {issue.specificActions.map((action, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-slate-300">
                        <input 
                          type="checkbox" 
                          className="mt-1 w-4 h-4 rounded border-slate-600 bg-slate-800"
                          id={`action-${index}-${idx}`}
                        />
                        <label htmlFor={`action-${index}-${idx}`} className="text-sm cursor-pointer">
                          {action}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Trade-offs */}
              {issue.tradeoffs && (
                <div className="p-4 bg-slate-700/30 border border-slate-600/30 rounded-lg">
                  <div className="text-sm font-mono text-slate-400 mb-2">TRADE-OFFS</div>
                  <p className="text-slate-300 text-sm">{issue.tradeoffs}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Quick Wins */}
      <Card className="p-8 bg-gradient-to-br from-green-900/20 to-slate-900 border-green-500/20">
        <h2 className="text-2xl font-bold text-white mb-6 font-mono">Quick Wins (Weeks 1-2)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {result.quickWins.map((win, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-start gap-3 p-4 bg-slate-800/30 rounded-lg border border-green-500/20"
            >
              <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <span className="text-slate-300">{win}</span>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Recommended Roadmap */}
      <Card className="p-8 bg-slate-900/50 border-purple-500/20">
        <h2 className="text-2xl font-bold text-white mb-6 font-mono">Recommended Roadmap</h2>
        
        <div className="space-y-6">
          {/* Immediate */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <h3 className="text-lg font-bold text-white font-mono">IMMEDIATE (Weeks 1-2)</h3>
            </div>
            <ul className="space-y-2 pl-5">
              {result.recommendedRoadmap.immediate.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-slate-300">
                  <ArrowRight className="w-4 h-4 text-red-400 flex-shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Short Term */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <h3 className="text-lg font-bold text-white font-mono">FOUNDATION FIXES (Weeks 3-6)</h3>
            </div>
            <ul className="space-y-2 pl-5">
              {result.recommendedRoadmap.shortTerm.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-slate-300">
                  <ArrowRight className="w-4 h-4 text-amber-400 flex-shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Long Term */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <h3 className="text-lg font-bold text-white font-mono">SCALABILITY (Weeks 7-12)</h3>
            </div>
            <ul className="space-y-2 pl-5">
              {result.recommendedRoadmap.longTerm.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-slate-300">
                  <ArrowRight className="w-4 h-4 text-blue-400 flex-shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>

      {/* Scalability Risks */}
      {result.scalabilityRisks.length > 0 && (
        <Card className="p-8 bg-gradient-to-br from-red-900/20 to-slate-900 border-red-500/20">
          <h2 className="text-2xl font-bold text-white mb-6 font-mono flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            Scalability Risks
          </h2>
          <ul className="space-y-3">
            {result.scalabilityRisks.map((risk, index) => (
              <li key={index} className="flex items-start gap-3 text-slate-300">
                <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <span>{risk}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* CTA */}
      <Card className="p-8 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-white font-mono">Ready to Fix Your UX Debt?</h2>
          <p className="text-white/80">
            This isn't optimization—this is survival. The companies that wait spend 10x more.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              onClick={onDownloadPDF}
              size="lg"
              className="bg-white text-purple-600 hover:bg-white/90 font-mono"
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
