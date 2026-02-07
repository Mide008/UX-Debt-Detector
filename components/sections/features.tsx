'use client';

import { motion } from 'framer-motion';
import { BarChart3, Lightbulb, Target, TrendingUp, FileText, Download } from 'lucide-react';
import { Card } from '@/components/ui/card';

const features = [
  {
    icon: BarChart3,
    title: 'Transparent Scoring',
    description: 'See exactly how your score is calculated with our 3-layer methodology: deterministic checks, heuristic evaluation, and industry pattern matching.',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20'
  },
  {
    icon: Lightbulb,
    title: 'Practitioner Notes',
    description: 'Real experience from shipping products. Not generic advice—stories from companies that learned the hard way so you don\'t have to.',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20'
  },
  {
    icon: Target,
    title: 'Specific Actions',
    description: 'Copy-paste ready tasks for your team. Each issue includes checkbox actions you can drop straight into Jira or Linear.',
    color: 'text-pink-400',
    bgColor: 'bg-pink-500/10',
    borderColor: 'border-pink-500/20'
  },
  {
    icon: TrendingUp,
    title: 'Financial Impact',
    description: 'Know what UX debt costs you in revenue. See compounding costs over 3 and 6 months with full methodology transparency.',
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/20'
  },
  {
    icon: FileText,
    title: 'Visual Reports',
    description: 'Score breakdowns, progress bars, and charts. Share with your team or present to executives—it looks professional.',
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/20'
  },
  {
    icon: Download,
    title: 'Export Everything',
    description: 'Download professional PDFs for stakeholders or CSV files to import into your project management tools.',
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500/20'
  }
];

export function Features() {
  return (
    <section className="py-20 px-4 bg-slate-950">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-mono">
            Built for Product Teams
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Not just another audit tool. This is actionable intelligence you can use today.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`p-6 h-full bg-slate-900/50 border ${feature.borderColor} ${feature.bgColor} backdrop-blur hover:scale-105 transition-transform`}>
                <div className={`w-12 h-12 rounded-lg ${feature.bgColor} border ${feature.borderColor} flex items-center justify-center mb-4`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 font-mono">
                  {feature.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
