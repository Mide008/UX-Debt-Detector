'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  const scrollToAnalyzer = () => {
    document.getElementById('analyzer')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden hero-gradient">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 border border-purple-200 text-purple-700 text-sm font-medium">
            <Zap className="w-4 h-4" />
            Version 4.0 Professional Edition
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-6 font-mono leading-tight"
        >
          Your UX Debt
          <br />
          <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
            Is Costing You
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Get a transparent UX debt score with <span className="text-purple-600 font-bold">real analysis</span> for your website and <span className="text-pink-600 font-bold">specific actions</span> to improve.
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
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-8 py-6 text-lg group shadow-lg"
          >
            Analyze My Product
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            onClick={scrollToAnalyzer}
            size="lg"
            variant="outline"
            className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50 px-8 py-6 text-lg"
          >
            See How It Works
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          <div className="p-6 rounded-xl bg-white border border-purple-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl font-bold text-purple-600 mb-2 font-mono">10s</div>
            <div className="text-gray-600">Analysis Time</div>
          </div>
          <div className="p-6 rounded-xl bg-white border border-pink-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl font-bold text-pink-600 mb-2 font-mono">Unique</div>
            <div className="text-gray-600">Real URL Analysis</div>
          </div>
          <div className="p-6 rounded-xl bg-white border border-purple-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl font-bold text-purple-600 mb-2 font-mono">100%</div>
            <div className="text-gray-600">Transparent</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}