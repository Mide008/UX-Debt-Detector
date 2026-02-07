'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const tiers = [
  {
    name: 'Quick Scan',
    price: '$147',
    description: 'AI-powered analysis delivered in 24 hours',
    features: [
      'UX Debt Score with 3-layer breakdown',
      'Top 5 critical issues identified',
      'Financial impact estimate',
      'Quick wins checklist',
      'PDF report + CSV export',
      '24-hour turnaround'
    ],
    cta: 'Start Quick Scan',
    highlighted: false
  },
  {
    name: 'Deep Audit',
    price: '$797',
    description: 'Manual review + Figma mockups',
    features: [
      'Everything in Quick Scan',
      'Manual expert review',
      'Practitioner notes on every issue',
      'Before/after Figma mockups',
      'Specific implementation tasks',
      '48-hour turnaround',
      '30-min strategy call'
    ],
    cta: 'Book Deep Audit',
    highlighted: true
  },
  {
    name: 'Pre-Funding',
    price: '$2,497',
    description: 'Investor-ready UX assessment',
    features: [
      'Everything in Deep Audit',
      'Executive presentation deck',
      'Competitive benchmarking',
      'ROI projections with data',
      'Due diligence prep',
      '1-week delivery',
      'Ongoing advisory (3 months)'
    ],
    cta: 'Book Pre-Funding',
    highlighted: false
  }
];

export function Pricing() {
  const scrollToAnalyzer = () => {
    document.getElementById('analyzer')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-slate-950 to-purple-950/20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-mono">
            Transparent Pricing
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Start free. Upgrade when you need deeper insights.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`p-8 h-full bg-slate-900/50 backdrop-blur ${
                tier.highlighted 
                  ? 'border-purple-500 ring-2 ring-purple-500/50 scale-105' 
                  : 'border-purple-500/20'
              }`}>
                {tier.highlighted && (
                  <div className="mb-4 -mt-4 -mx-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center font-bold text-sm">
                    MOST POPULAR
                  </div>
                )}
                
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2 font-mono">
                    {tier.name}
                  </h3>
                  <p className="text-slate-400 text-sm mb-4">
                    {tier.description}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-white font-mono">
                      {tier.price}
                    </span>
                    <span className="text-slate-400">one-time</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-slate-300">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={scrollToAnalyzer}
                  className={`w-full ${
                    tier.highlighted
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                      : 'bg-slate-800 hover:bg-slate-700'
                  }`}
                >
                  {tier.cta}
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-slate-400 mb-4">
            Try the free analyzer below before committing to a paid audit
          </p>
          <Button
            onClick={scrollToAnalyzer}
            variant="outline"
            className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
          >
            Start Free Analysis
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
