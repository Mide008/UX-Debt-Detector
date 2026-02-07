'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  const scrollToAnalyzer = () => {
    document.getElementById('analyzer')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden hero-gradient">
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border-2 shadow-sm text-sm font-semibold"
            style={{ 
              borderColor: 'hsl(201, 96%, 32%)',
              color: 'hsl(215, 28%, 17%)'
            }}
          >
            <Sparkles className="w-4 h-4" style={{ color: 'hsl(173, 58%, 39%)' }} />
            Professional UX Analysis Platform
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          style={{ 
            color: 'hsl(216, 33%, 12%)',
            fontFamily: 'JetBrains Mono, monospace'
          }}
        >
          Your UX Debt Is
          <br />
          <span className="bg-gradient-to-r from-[hsl(201,96%,32%)] via-[hsl(173,58%,39%)] to-[hsl(201,96%,32%)] bg-clip-text text-transparent">
            Costing You Revenue
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed font-medium"
          style={{ color: 'hsl(215, 19%, 35%)' }}
        >
          Get actionable UX analysis with{' '}
          <span className="font-bold" style={{ color: 'hsl(201, 96%, 28%)' }}>
            unique insights
          </span>{' '}
          for your website. Know exactly what to fix and why it matters.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            onClick={scrollToAnalyzer}
            size="lg"
            className="text-white font-bold px-10 py-7 text-lg group shadow-lg hover:shadow-xl transition-all gradient-professional"
          >
            Analyze My Website
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            onClick={scrollToAnalyzer}
            size="lg"
            variant="outline"
            className="px-10 py-7 text-lg font-semibold transition-all"
            style={{
              borderWidth: '2px',
              borderColor: 'hsl(214, 32%, 91%)',
              color: 'hsl(215, 28%, 17%)'
            }}
          >
            See Example Report
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          <div className="p-8 rounded-xl bg-white border-2 shadow-sm hover:shadow-md transition-all"
            style={{ borderColor: 'hsl(214, 32%, 91%)' }}
          >
            <div className="text-5xl font-bold mb-3" 
              style={{ 
                color: 'hsl(201, 96%, 32%)',
                fontFamily: 'JetBrains Mono, monospace'
              }}
            >
              10s
            </div>
            <div className="font-semibold" style={{ color: 'hsl(215, 28%, 17%)' }}>
              Analysis Time
            </div>
          </div>
          
          <div className="p-8 rounded-xl bg-white border-2 shadow-sm hover:shadow-md transition-all"
            style={{ borderColor: 'hsl(214, 32%, 91%)' }}
          >
            <div className="text-5xl font-bold mb-3" 
              style={{ 
                color: 'hsl(173, 58%, 39%)',
                fontFamily: 'JetBrains Mono, monospace'
              }}
            >
              Real
            </div>
            <div className="font-semibold" style={{ color: 'hsl(215, 28%, 17%)' }}>
              URL Analysis
            </div>
          </div>
          
          <div className="p-8 rounded-xl bg-white border-2 shadow-sm hover:shadow-md transition-all"
            style={{ borderColor: 'hsl(214, 32%, 91%)' }}
          >
            <div className="text-5xl font-bold mb-3" 
              style={{ 
                color: 'hsl(201, 96%, 32%)',
                fontFamily: 'JetBrains Mono, monospace'
              }}
            >
              100%
            </div>
            <div className="font-semibold" style={{ color: 'hsl(215, 28%, 17%)' }}>
              Transparent
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}