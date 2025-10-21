'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';

export default function CompleteAISolutionGuide() {
  useEffect(() => {
    // Smooth page load
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Same as blog page */}
      <header className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <span className="text-lg sm:text-xl font-semibold text-gray-900">Lumenosis AI</span>
            </Link>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link
                href="/lead-magnet"
                className="relative px-4 py-2 rounded-full text-gray-700 font-medium text-xs sm:text-sm
                         bg-white hover:bg-gray-50
                         transition-all duration-300 ease-out
                         shadow-sm hover:shadow-md
                         border border-gray-200 overflow-hidden"
              >
                <span className="relative z-10">← Back to Blog</span>
              </Link>
              <Link 
                href="https://calendly.com/lumenosis/30min" 
                target="_blank" 
                rel="noopener noreferrer"
                className="relative px-4 py-2 rounded-full text-white font-medium text-xs sm:text-sm
                         bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-700
                         hover:from-purple-500 hover:via-indigo-500 hover:to-purple-600
                         transition-all duration-300 ease-out
                         shadow-[inset_0_2px_4px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.1),0_4px_8px_rgba(0,0,0,0.3)]
                         border border-white/10 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none rounded-full" />
                <span className="hidden sm:inline relative z-10">Schedule a Demo</span>
                <span className="sm:hidden relative z-10">Demo</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-semibold text-gray-900 leading-tight mb-6">
              Capture Leads <span className="gradient-text">in 60 Seconds</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
              Stop losing $50,000+ in commissions to faster agents
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              At <strong>Lumenosis AI</strong>, we help real estate professionals respond to leads in 60 seconds, book 3X more showings, and never miss a deal again.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {/* INTEREST - AI Agents for Real Estate */}
            <a href="/#solutions" className="group block">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-xl shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                      AI Agents for Real Estate
                    </h2>
                    <p className="text-gray-600 text-lg">
                      AI agents that respond to leads instantly, qualify buyers automatically, and book showings 24/7 - so you never lose another deal to competitors who respond faster.
                    </p>
                  </div>
                  <div className="ml-6 text-indigo-600 group-hover:translate-x-2 transition-transform">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </a>

            {/* ROI Calculator */}
            <a href="/lead-magnet#revenue-calculator" className="group block">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 hover:border-yellow-500/50 transition-all duration-300 hover:shadow-xl shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">
                      ROI Calculator
                    </h2>
                    <p className="text-gray-600 text-lg">
                      Calculate exactly how much revenue you're losing to slow follow-up and see your potential ROI with AI automation - most agents save $50K+ per year.
                    </p>
                  </div>
                  <div className="ml-6 text-yellow-600 group-hover:translate-x-2 transition-transform">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </a>

            {/* DESIRE - See it working */}
            <a href="/#demos" className="group block">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 hover:border-green-500/50 transition-all duration-300 hover:shadow-xl shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                      Live Demo Videos
                    </h2>
                    <p className="text-gray-600 text-lg">
                      Watch real AI agents qualify leads via SMS, generate property videos in 3 minutes, and book appointments automatically - see exactly how it works for your business.
                    </p>
                  </div>
                  <div className="ml-6 text-green-600 group-hover:translate-x-2 transition-transform">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </a>

            {/* Free Resources */}
            <a href="/lead-magnet" className="group block">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                      Blog & Free Resources
                    </h2>
                    <p className="text-gray-600 text-lg">
                      Get 2000+ free automation workflows, real estate lead templates, AI agent setup guides, and step-by-step tutorials to start automating your business today.
                    </p>
                  </div>
                  <div className="ml-6 text-purple-600 group-hover:translate-x-2 transition-transform">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </a>

            {/* Case Studies */}
            <a href="/#cases" className="group block">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      Real Results & Case Studies
                    </h2>
                    <p className="text-gray-600 text-lg">
                      See how agents went from 3 to 12 deals in 90 days, brokerages increased conversions by 48%, and teams booked 212% more weekend showings with our AI agents.
                    </p>
                  </div>
                  <div className="ml-6 text-blue-600 group-hover:translate-x-2 transition-transform">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </a>

            {/* ACTION - Book now */}
            <a href="/#contact" className="group block">
              <div className="bg-orange-50/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 hover:border-orange-500/50 transition-all duration-300 hover:shadow-xl shadow-lg relative overflow-hidden">
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors flex items-center gap-2">
                      Book Your Free Strategy Call
                      <span className="inline-flex items-center px-3 py-1 text-xs font-semibold bg-orange-500/20 text-orange-700 rounded-full">
                        Limited Slots
                      </span>
                    </h2>
                    <p className="text-gray-600 text-lg">
                      Schedule a 30-minute call to see exactly how AI agents can help you close more deals. We'll analyze your current process and show you where you're losing money.
                    </p>
                  </div>
                  <div className="ml-6 text-orange-600 group-hover:translate-x-2 transition-transform">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Link href="/" className="flex items-center justify-center space-x-2 mb-4">
              <Image src="/logo.png" alt="Lumenosis AI" width={32} height={32} className="h-8 w-auto" />
              <span className="text-xl font-semibold">Lumenosis AI</span>
            </Link>
            <p className="text-gray-400 mb-4">
              Automating success, one workflow at a time.
            </p>
            <div className="flex justify-center space-x-6">
              <Link href="/" className="text-gray-400 hover:text-white transition-colors">Back to Main Site</Link>
              <Link href="/lead-magnet" className="text-gray-400 hover:text-white transition-colors">Back to Blog</Link>
              <Link href="https://calendly.com/lumenosis/30min" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Schedule Call</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

