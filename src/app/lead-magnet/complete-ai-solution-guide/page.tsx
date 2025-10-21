'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function CompleteAISolutionGuide() {
  useEffect(() => {
    // Smooth page load
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-semibold text-white">Lumenosis AI</span>
            </Link>
            <Link
              href="/lead-magnet"
              className="px-4 py-2 rounded-full text-white font-medium text-sm
                       bg-white/10 hover:bg-white/20
                       transition-all duration-300
                       border border-white/20"
            >
              ← Back to Resources
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* ATTENTION - Grab their focus */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-semibold text-white mb-6">
              Stop Losing <span className="gradient-text">$50,000+ in Commissions</span> to Faster Agents
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              At <strong>Lumenosis AI</strong>, we help real estate professionals respond to leads in 60 seconds, book 3X more showings, and never miss a deal again.
            </p>
          </div>

          <div className="space-y-4">
            {/* INTEREST - AI Agents for Real Estate */}
            <a href="/#solutions" className="group block">
              <div className="glass-effect rounded-2xl p-6 border border-white/10 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/20 bg-white/5">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                      AI Agents for Real Estate
                    </h2>
                    <p className="text-white/80 text-lg">
                      AI agents that respond to leads instantly, qualify buyers automatically, and book showings 24/7 - so you never lose another deal to competitors who respond faster.
                    </p>
                  </div>
                  <div className="ml-6 text-indigo-400 group-hover:translate-x-2 transition-transform">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </a>

            {/* DESIRE - See it working */}
            <a href="/#demos" className="group block">
              <div className="glass-effect rounded-2xl p-6 border border-white/10 hover:border-green-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/20 bg-white/5">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-white mb-2 group-hover:text-green-300 transition-colors">
                      Live Demo Videos
                    </h2>
                    <p className="text-white/80 text-lg">
                      Watch real AI agents qualify leads via SMS, generate property videos in 3 minutes, and book appointments automatically - see exactly how it works for your business.
                    </p>
                  </div>
                  <div className="ml-6 text-green-400 group-hover:translate-x-2 transition-transform">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </a>

            {/* Free Resources */}
            <a href="/lead-magnet" className="group block">
              <div className="glass-effect rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 bg-white/5">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                      Blog & Free Resources
                    </h2>
                    <p className="text-white/80 text-lg">
                      Get 2000+ free automation workflows, real estate lead templates, AI agent setup guides, and step-by-step tutorials to start automating your business today.
                    </p>
                  </div>
                  <div className="ml-6 text-purple-400 group-hover:translate-x-2 transition-transform">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </a>

            {/* Case Studies */}
            <a href="/#cases" className="group block">
              <div className="glass-effect rounded-2xl p-6 border border-white/10 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 bg-white/5">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">
                      Real Results & Case Studies
                    </h2>
                    <p className="text-white/80 text-lg">
                      See how agents went from 3 to 12 deals in 90 days, brokerages increased conversions by 48%, and teams booked 212% more weekend showings with our AI agents.
                    </p>
                  </div>
                  <div className="ml-6 text-blue-400 group-hover:translate-x-2 transition-transform">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </a>

            {/* ACTION - Book now */}
            <a href="/#contact" className="group block">
              <div className="glass-effect rounded-2xl p-6 border border-white/10 hover:border-orange-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/20 relative overflow-hidden bg-white/5">
                {/* Pulsing glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-orange-400/10 to-orange-500/10 animate-pulse" />
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-white mb-2 group-hover:text-orange-300 transition-colors flex items-center gap-2">
                      Book Your Free Strategy Call
                      <span className="inline-flex items-center px-3 py-1 text-xs font-semibold bg-orange-500/20 text-orange-300 rounded-full">
                        Limited Slots
                      </span>
                    </h2>
                    <p className="text-white/80 text-lg">
                      Schedule a 30-minute call to see exactly how AI agents can help you close more deals. We'll analyze your current process and show you where you're losing money.
                    </p>
                  </div>
                  <div className="ml-6 text-orange-400 group-hover:translate-x-2 transition-transform">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </a>
          </div>

          {/* CTA at bottom */}
          <div className="text-center mt-12">
            <a 
              href="/#contact" 
              className="inline-block text-indigo-400 hover:text-indigo-300 text-lg font-medium transition-colors hover:underline"
            >
              More results from lumenosis.com »
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/30 text-white py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Link href="/" className="flex items-center justify-center space-x-2 mb-4">
              <span className="text-xl font-semibold">Lumenosis AI</span>
            </Link>
            <p className="text-white/60 mb-4">
              Automating success, one workflow at a time.
            </p>
            <div className="flex justify-center space-x-6">
              <Link href="/" className="text-white/60 hover:text-white transition-colors">Back to Main Site</Link>
              <Link href="https://calendly.com/lumenosis/30min" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">Schedule Call</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

