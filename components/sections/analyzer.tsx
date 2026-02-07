'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Results } from './results';
import type { AnalysisResult } from '@/lib/analysis-engine';

const formSchema = z.object({
  productUrl: z.string().url('Please enter a valid URL'),
  industry: z.string().min(1, 'Please select an industry'),
  stage: z.string().min(1, 'Please select a stage'),
});

type FormData = z.infer<typeof formSchema>;

export function Analyzer() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const result = await response.json();
      setAnalysisResult(result);
      
      // Scroll to results
      setTimeout(() => {
        document.getElementById('results-section')?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    } catch (error) {
      console.error('Analysis error:', error);
      alert('Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!analysisResult) return;

    setIsGenerating(true);

    try {
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          result: analysisResult,
          productUrl: analysisResult.issues[0]?.title || 'Product Analysis'
        }),
      });

      if (!response.ok) {
        throw new Error('PDF generation failed');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ux-debt-report-${Date.now()}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('PDF generation error:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadCSV = async () => {
    if (!analysisResult) return;

    setIsGenerating(true);

    try {
      const response = await fetch('/api/generate-csv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          result: analysisResult,
          productUrl: analysisResult.issues[0]?.title || 'Product Analysis'
        }),
      });

      if (!response.ok) {
        throw new Error('CSV generation failed');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ux-debt-analysis-${Date.now()}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('CSV download error:', error);
      alert('Failed to download CSV. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section id="analyzer" className="py-20 px-4 bg-slate-950">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-mono">
            Analyze Your Product
          </h2>
          <p className="text-xl text-slate-400">
            Get your UX debt score in 10 seconds
          </p>
        </motion.div>

        <Card className="p-8 bg-slate-900/50 border-purple-500/20 backdrop-blur">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Product URL */}
            <div className="space-y-2">
              <Label htmlFor="productUrl" className="text-white font-mono">
                Product URL *
              </Label>
              <Input
                id="productUrl"
                placeholder="https://yourproduct.com"
                {...register('productUrl')}
                className="bg-slate-800 border-slate-700 text-white"
                disabled={isAnalyzing}
              />
              {errors.productUrl && (
                <p className="text-red-400 text-sm">{errors.productUrl.message}</p>
              )}
            </div>

            {/* Industry */}
            <div className="space-y-2">
              <Label htmlFor="industry" className="text-white font-mono">
                Industry *
              </Label>
              <select
                id="industry"
                {...register('industry')}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                disabled={isAnalyzing}
              >
                <option value="">Select industry...</option>
                <option value="saas">SaaS</option>
                <option value="e-commerce">E-commerce</option>
                <option value="fintech">Fintech</option>
                <option value="healthtech">Healthtech</option>
                <option value="edtech">Edtech</option>
                <option value="marketplace">Marketplace</option>
                <option value="other">Other</option>
              </select>
              {errors.industry && (
                <p className="text-red-400 text-sm">{errors.industry.message}</p>
              )}
            </div>

            {/* Stage */}
            <div className="space-y-2">
              <Label htmlFor="stage" className="text-white font-mono">
                Stage *
              </Label>
              <select
                id="stage"
                {...register('stage')}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                disabled={isAnalyzing}
              >
                <option value="">Select stage...</option>
                <option value="pre-seed">Pre-seed</option>
                <option value="seed">Seed</option>
                <option value="series-a">Series A</option>
                <option value="series-b">Series B</option>
                <option value="series-c">Series C+</option>
                <option value="public">Public</option>
              </select>
              {errors.stage && (
                <p className="text-red-400 text-sm">{errors.stage.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isAnalyzing}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-6 text-lg"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Analyze My Product
                </>
              )}
            </Button>
          </form>

          {/* Loading State */}
          <AnimatePresence>
            {isAnalyzing && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-8 p-6 bg-purple-500/10 border border-purple-500/30 rounded-lg"
              >
                <div className="flex items-center gap-3 text-purple-400">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <div>
                    <div className="font-mono font-bold">Running Analysis...</div>
                    <div className="text-sm text-slate-400 mt-1">
                      Checking 23 deterministic rules • Evaluating 10 heuristics • Matching industry patterns
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        {/* Results Section */}
        {analysisResult && (
          <div id="results-section" className="mt-12">
  <Results
  result={analysisResult}
  // This uses the URL that was just returned from your Puppeteer engine
  productUrl={analysisResult?.url || 'Your Product'} 
  onDownloadPDF={handleDownloadPDF}
  onDownloadCSV={handleDownloadCSV}
  isGenerating={isGenerating}
/>
</div>
        )}
      </div>
    </section>
  );
}
