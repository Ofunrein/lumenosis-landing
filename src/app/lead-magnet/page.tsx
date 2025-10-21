'use client';

import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import RevenueCalculator from '../../components/RevenueCalculator';

const automationWorkflows = [
  {
    id: 'complete-ai-solution-guide',
    title: 'Capture Leads in 60 Seconds',
    subtitle: 'Stop Losing $50,000+ in Commissions to Faster Agents',
    description: 'Discover how AI agents respond to leads in 60 seconds, book 3X more showings, and help you close more deals 24/7. Explore solutions, watch live demos, see real results, and book your free strategy call.',
    href: '/lead-magnet/complete-ai-solution-guide',
    features: [
      'AI solutions that respond in 60 seconds',
      'Live demo videos of AI in action',
      'Real case studies from agents like you',
      'Complete roadmap to 3X more deals',
      'Free 30-minute strategy call',
      'Interactive solution explorer'
    ],
    complexity: 'Beginner',
    setupTime: '10 minutes',
    tools: ['AI Agents', 'Lead Qualification', 'Appointment Booking', '24/7 Automation'],
    preview: {
      nodes: 'Interactive',
      triggers: 'Getting Started',
      integrations: 'All Features'
    }
  },
  {
    id: 'real-estate-automation',
    title: 'Real Estate Lead Automation',
    subtitle: 'BatchData + N8N + CRM Integration',
    description: 'Complete automation workflow that scans the market daily, filters high-equity properties with absentee owners, skip-traces contact info, and delivers qualified leads to your CRM, email, and Slack.',
    href: '/lead-magnet/real-estate-automation',
    features: [
      'Daily market scanning automation',
      'High-equity property filtering', 
      'Automatic skip-trace integration',
      'CRM & email notifications',
      'Excel report generation'
    ],
    complexity: 'Intermediate',
    setupTime: '30-45 minutes',
    tools: ['N8N', 'BatchData API', 'HubSpot', 'Slack', 'Email'],
    preview: {
      nodes: 25,
      triggers: 2,
      integrations: 5
    }
  },
  {
    id: 'n8n-workflow-collection',
    title: '2000+ Free N8N Workflows',
    subtitle: 'Complete automation library for any business',
    description: 'Browse 2000+ free N8N automation workflows for business automation, lead generation, CRM integration, social media, content creation, and more. Visual diagrams, one-click import, enhanced search. No signup required.',
    href: '/lead-magnet/n8n-workflow-collection',
    features: [
      '2000+ production-ready workflows',
      'Visual workflow diagrams',
      'Enhanced search and filtering',
      'One-click JSON import',
      '9 business categories',
      'No signup required'
    ],
    complexity: 'Beginner',
    setupTime: '5 minutes',
    tools: ['N8N', 'Various APIs', 'Multiple Integrations'],
    preview: {
      nodes: 'Varies',
      triggers: 'Multiple',
      integrations: 'Hundreds'
    }
  },
  {
    id: 'n8n-ai-agent-builder',
    title: 'N8N AI Agent Builder',
    subtitle: 'AI Agent that Creates N8N Workflows',
    description: 'Revolutionary AI system that builds complete N8N workflows from simple text descriptions. Just describe what you want automated, and watch as the AI creates a fully functional workflow with proper connections, credentials setup, and documentation.',
    href: '/lead-magnet/n8n-ai-agent-builder',
    features: [
      'Natural language to N8N workflow conversion',
      'Automatic node connections and setup',
      'Built-in credential configuration guides',
      'Claude Opus 4 "thinking" capabilities',
      'Multi-agent architecture support',
      'Complete workflow documentation'
    ],
    complexity: 'Advanced',
    setupTime: '45-60 minutes',
    tools: ['N8N', 'Claude Opus 4', 'OpenRouter', 'Google Drive', 'N8N API'],
    preview: {
      nodes: 18,
      triggers: 2,
      integrations: 'Dynamic'
    }
  },
  {
    id: 'ai-real-estate-video-automation',
    title: 'AI Real Estate Video Automation',
    subtitle: 'Create Cinematic Property Videos with AI',
    description: 'Complete guide to automate real estate video creation with AI. Turn property photos into professional cinematic videos with voiceovers in under 3 minutes using Make.com, Runway, ElevenLabs, and more. Includes ready-to-import automation template.',
    href: '/lead-magnet/ai-real-estate-video-automation',
    features: [
      'Step-by-step automation setup',
      'Ready-to-import Make.com template',
      'AI video generation with Runway',
      'Professional voiceover creation',
      'Property form builder guide',
      'Complete workflow breakdown'
    ],
    complexity: 'Intermediate',
    setupTime: '45-60 minutes',
    tools: ['Make.com', 'Runway', 'ElevenLabs', 'OpenAI', 'Form Fillout', 'JSON2Video', 'Google Drive', 'Gemini AI'],
    preview: {
      nodes: 12,
      triggers: 1,
      integrations: 8
    }
  },
  {
    id: 'apollo-cold-email-automation',
    title: 'Apollo Cold Email Automation',
    subtitle: 'AI-Powered Lead Scraping & Personalized Outreach',
    description: 'Complete automation that scrapes 1000+ leads from Apollo.io and generates personalized cold email messages using AI. Includes Google Sheets integration and optional Instantly.ai setup for automatic sending. No manual work required.',
    href: '/lead-magnet/apollo-cold-email-automation',
    features: [
      'Bulk Apollo lead scraping setup',
      'AI personalized message generation',
      'Google Sheets automation template',
      'N8N workflow (ready-to-import)',
      'Instantly.ai integration guide',
      'Complete step-by-step walkthrough'
    ],
    complexity: 'Intermediate',
    setupTime: '30-45 minutes',
    tools: ['N8N', 'Apollo.io', 'Apify', 'OpenAI', 'Google Sheets', 'Instantly.ai'],
    preview: {
      nodes: 8,
      triggers: 1,
      integrations: 6
    }
  },
  {
    id: 'ai-hidden-real-estate-listings',
    title: 'AI Hidden Real Estate Listings Discovery',
    subtitle: 'Find Untapped Listing Opportunities with AI Research',
    description: 'Complete guide to using Manus AI and Gamma to uncover hidden listing opportunities in your local market. Data-driven approach to identify underserved neighborhoods, seller motivations, and create lead magnets that convert views into listings.',
    href: '/lead-magnet/ai-hidden-real-estate-listings',
    features: [
      'Manus AI market research strategy',
      'Hidden opportunity identification system',
      'Prospecting scripts and objection handlers',
      'Social media content templates',
      'Facebook ad strategies for seller leads',
      'Gamma lead magnet creation process'
    ],
    complexity: 'Beginner',
    setupTime: '15-30 minutes',
    tools: ['Manus AI', 'ChatGPT', 'Gamma', 'Social Media Platforms', 'Facebook Ads'],
    preview: {
      nodes: 'N/A',
      triggers: 'Manual',
      integrations: 3
    }
  }
  // Add more workflows here as they become available
];

export default function LeadMagnetIndex() {
  // Floating navigation bar on scroll
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Ensure proper page loading and prevent refresh issues - client only
    if (typeof window === 'undefined') return;
    
    const handleLoad = () => {
      if (document.body) {
        document.body.style.opacity = '1';
      }
    };
    
    const handlePageReady = () => {
      handleLoad();
      // Force re-render to ensure smooth transitions
      if (document.documentElement) {
        document.documentElement.scrollTop = 0;
      }
    };
    
    if (document.readyState === 'complete') {
      handlePageReady();
    } else {
      window.addEventListener('load', handlePageReady);
      document.addEventListener('DOMContentLoaded', handlePageReady);
    }
    
    // Cleanup
    return () => {
      window.removeEventListener('load', handlePageReady);
      document.removeEventListener('DOMContentLoaded', handlePageReady);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
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
                <span className="relative z-10">📝 Blog</span>
              </Link>
              <button
                onClick={() => {
                  const section = document.getElementById('revenue-calculator');
                  if (section) {
                    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="relative px-4 py-2 rounded-full text-white font-medium text-xs sm:text-sm
                         bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-700
                         hover:from-purple-500 hover:via-indigo-500 hover:to-purple-600
                         transition-all duration-300 ease-out
                         shadow-[inset_0_2px_4px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.1),0_4px_8px_rgba(0,0,0,0.3)]
                         border border-white/10 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none rounded-full" />
                <span className="hidden sm:inline relative z-10">💰 ROI Calculator</span>
                <span className="sm:hidden relative z-10">💰 ROI</span>
              </button>
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

      {/* Floating Navigation Bar */}
      <div className={`fixed w-full z-50 flex justify-center px-4 sm:px-6 lg:px-8 pt-1 top-0 transition-all duration-300 ${isScrolled ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`} suppressHydrationWarning>
        <div className="bg-white/5 backdrop-blur-sm rounded-full px-6 py-3 inline-flex items-center space-x-4 sm:space-x-6 shadow-lg border border-white/10">
          <Link href="/" className="flex items-center">
            <span className="text-lg font-semibold text-gray-900 hidden sm:inline">Lumenosis AI</span>
          </Link>
          <Link
            href="/lead-magnet"
            className="relative px-3 sm:px-4 py-2 rounded-full text-gray-700 font-medium text-xs sm:text-sm
                     bg-white/90 hover:bg-white
                     transition-all duration-300 ease-out
                     shadow-sm hover:shadow-md
                     border border-gray-200 overflow-hidden"
          >
            <span className="relative z-10 hidden sm:inline">📝 Blog</span>
            <span className="relative z-10 sm:hidden">📝</span>
          </Link>
          <button
            onClick={() => {
              const section = document.getElementById('revenue-calculator');
              if (section) {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className="relative px-3 sm:px-4 py-2 rounded-full text-white font-medium text-xs sm:text-sm
                     bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-700
                     hover:from-purple-500 hover:via-indigo-500 hover:to-purple-600
                     transition-all duration-300 ease-out
                     shadow-[inset_0_2px_4px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.1),0_4px_8px_rgba(0,0,0,0.3)]
                     border border-white/10 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none rounded-full" />
            <span className="hidden sm:inline relative z-10">💰 ROI Calculator</span>
            <span className="sm:hidden relative z-10">💰 ROI</span>
          </button>
          <Link 
            href="https://calendly.com/lumenosis/30min" 
            target="_blank" 
            rel="noopener noreferrer"
            className="relative px-3 sm:px-4 py-2 rounded-full text-white font-medium text-xs sm:text-sm
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

      {/* Hero Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-gray-900 leading-tight mb-6">
              Learn AI for Business
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Straight from the Lumenosis AI experts.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 mb-8">
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                View Online
              </span>
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Step-by-Step Instructions
              </span>
            </div>
            
            {/* Need It Done For You CTA */}
            <div className="text-center">
              <button 
                onClick={() => {
                  try {
                    const section = document.getElementById('done-for-you-section');
                    if (section) {
                      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  } catch (error) {
                    console.log('Scroll error:', error);
                  }
                }}
                className="inline-flex items-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-full hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
                Need it done for you?
                <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section className="py-16 bg-gradient-to-br from-purple-50 via-white to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div id="revenue-calculator" className="scroll-mt-20">
            <RevenueCalculator />
          </div>
        </div>
      </section>

      {/* Workflows Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {automationWorkflows.map((workflow) => (
              <Link 
                key={workflow.id} 
                href={workflow.href}
                className="group bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
              >
                <div className="p-6">
                  {/* Icon & Title */}
                  <div className="flex items-start space-x-3 mb-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform ${
                      workflow.id === 'complete-ai-solution-guide' ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                      workflow.id === 'real-estate-automation' ? 'bg-gradient-to-r from-indigo-500 to-purple-500' :
                      workflow.id === 'n8n-workflow-collection' ? 'bg-gradient-to-r from-green-500 to-blue-500' :
                      workflow.id === 'n8n-ai-agent-builder' ? 'bg-gradient-to-r from-orange-500 to-purple-500' :
                      workflow.id === 'ai-real-estate-video-automation' ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                      workflow.id === 'apollo-cold-email-automation' ? 'bg-gradient-to-r from-orange-500 to-red-500' :
                      workflow.id === 'ai-hidden-real-estate-listings' ? 'bg-gradient-to-r from-teal-500 to-cyan-500' :
                      'bg-gradient-to-r from-indigo-500 to-purple-500'
                    }`}>
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        {workflow.id === 'complete-ai-solution-guide' && (
                          <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                        )}
                        {workflow.id === 'real-estate-automation' && (
                          <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                        )}
                        {workflow.id === 'n8n-workflow-collection' && (
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                        )}
                        {workflow.id === 'ai-real-estate-video-automation' && (
                          <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V9a1 1 0 00-1.447-.894l-2 1z" />
                        )}
                        {workflow.id === 'n8n-ai-agent-builder' && (
                          <path fillRule="evenodd" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" clipRule="evenodd" />
                        )}
                        {workflow.id === 'apollo-cold-email-automation' && (
                          <>
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </>
                        )}
                        {workflow.id === 'ai-hidden-real-estate-listings' && (
                          <path fillRule="evenodd" d="M8 16a4 4 0 100-8 4 4 0 000 8zm0-2a2 2 0 100-4 2 2 0 000 4zm2-8.243V1a1 1 0 10-2 0v4.757A6 6 0 114.243 10H1a1 1 0 100 2h3.243A6 6 0 0110 5.757z" clipRule="evenodd" />
                        )}
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`text-lg font-semibold text-gray-900 mb-1 group-hover:transition-colors line-clamp-2 ${
                        workflow.id === 'complete-ai-solution-guide' ? 'group-hover:text-yellow-600' :
                        workflow.id === 'real-estate-automation' ? 'group-hover:text-indigo-600' :
                        workflow.id === 'n8n-workflow-collection' ? 'group-hover:text-green-600' :
                        workflow.id === 'n8n-ai-agent-builder' ? 'group-hover:text-orange-600' :
                        workflow.id === 'ai-real-estate-video-automation' ? 'group-hover:text-purple-600' :
                        workflow.id === 'apollo-cold-email-automation' ? 'group-hover:text-orange-600' :
                        workflow.id === 'ai-hidden-real-estate-listings' ? 'group-hover:text-teal-600' :
                        'group-hover:text-indigo-600'
                      }`}>{workflow.title}</h3>
                      <p className={`text-xs font-medium ${
                        workflow.id === 'complete-ai-solution-guide' ? 'text-yellow-600' :
                        workflow.id === 'real-estate-automation' ? 'text-indigo-600' :
                        workflow.id === 'n8n-workflow-collection' ? 'text-green-600' :
                        workflow.id === 'n8n-ai-agent-builder' ? 'text-orange-600' :
                        workflow.id === 'ai-real-estate-video-automation' ? 'text-purple-600' :
                        workflow.id === 'apollo-cold-email-automation' ? 'text-orange-600' :
                        workflow.id === 'ai-hidden-real-estate-listings' ? 'text-teal-600' :
                        'text-indigo-600'
                      }`}>{workflow.subtitle}</p>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {workflow.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-4">
                    {workflow.features.slice(0, 3).map((feature, index) => (
                      <div key={index} className="flex items-start text-xs text-gray-600">
                        <svg className="w-3.5 h-3.5 mr-1.5 mt-0.5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="line-clamp-1">{feature}</span>
                      </div>
                    ))}
                    {workflow.features.length > 3 && (
                      <p className="text-xs text-gray-500 italic">+ {workflow.features.length - 3} more</p>
                    )}
                  </div>

                  {/* Bottom Meta */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-3 text-xs text-gray-500">
                      <span className={`px-2 py-1 rounded-full ${
                        workflow.complexity === 'Beginner' ? 'bg-green-100 text-green-700' :
                        workflow.complexity === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>{workflow.complexity}</span>
                      <span>⏱️ {workflow.setupTime}</span>
                    </div>
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>



          {/* Coming Soon */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full">
              <svg className="w-4 h-4 mr-2 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-600 text-sm">More automation workflows coming soon</span>
            </div>
          </div>

          {/* Done-For-You Automation Services Section */}
          <div id="done-for-you-section" className="mt-20">
            <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
              <div className="p-8 lg:p-12">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center space-x-2 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900">
                      Need It Done-For-You?
                    </h2>
                  </div>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    We Build Revenue-Generating AI Automation Systems
                  </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-start">
                  
                  {/* Profile Section */}
                  <div className="lg:col-span-1">
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto mb-6 relative overflow-hidden rounded-full shadow-lg border-4 border-white">
                        <Image 
                          src="/images/1. LinkedIn profile pic Pi7_Tool_1. profile-pic 22.jpg" 
                          alt="Martin - Lumenosis AI Co-founder" 
                          width={128} 
                          height={128}
                          className="w-full h-full object-cover"
                          style={{ objectPosition: 'center center' }}
                        />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 leading-tight">
                          Martin | Lumenosis AI Co-founder
                        </h3>
                        <p className="text-lg font-semibold text-indigo-600">Custom AI Automation Systems</p>
                        <p className="text-sm text-gray-600">Revenue-Focused Implementation</p>
                      </div>
                      
                      <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
                        <div className="text-center">
                          <div className="text-2xl font-semibold text-green-600 mb-1">300-500%</div>
                          <div className="text-sm text-gray-600 mb-3">Average Client ROI</div>
                          <div className="text-xl font-semibold text-indigo-600 mb-1">$10K-50K+</div>
                          <div className="text-sm text-gray-600">Yearly Revenue Increase & Saved</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="lg:col-span-2">
                    <div className="space-y-6">
                      
                      {/* Hook */}
                      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                        <p className="text-lg text-gray-700 leading-relaxed">
                          <span className="font-semibold text-gray-900">Most businesses try automation after they plateau.</span> 
                          <br />We build intelligent systems that generate revenue while you scale faster.
                        </p>
                      </div>

                      {/* Value Prop */}
                      <div>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                          Whether you're buried in repetitive tasks or managing disconnected tools, we help founders and teams turn automation into profit centers - while saving time and costs.
                        </p>

                        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 mb-6">
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                            </svg>
                            What We Build:
                          </h4>
                          <p className="text-gray-700">
                            Revenue-generating AI systems that don't just save time - they create money. From lead capture to client delivery, we automate your entire profit pipeline.
                          </p>
                        </div>
                      </div>

                      {/* Services Grid */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-4">💰 Custom Revenue Systems We Create:</h4>
                        <div className="grid sm:grid-cols-2 gap-3 mb-6">
                          {[
                            'AI-powered lead qualification that converts 3X more prospects to paying clients',
                            'Automated client onboarding systems that deliver premium experiences at scale',
                            'Smart proposal & invoicing flows that close deals 40% faster',
                            'Multi-channel marketing automation that nurtures leads into high-value customers',
                            'Intelligent CRM systems that predict and prevent customer churn',
                            'Automated upsell sequences that increase average customer value by 50%+',
                            'Real-time revenue dashboards that track every dollar from lead to close'
                          ].map((service, index) => (
                            <div key={index} className="flex items-start space-x-2">
                              <svg className="w-4 h-4 mt-1 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              <span className="text-sm text-gray-700">{service}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Target Audiences */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-4">💼 Who Generates Revenue With Our Systems:</h4>
                        <div className="grid sm:grid-cols-2 gap-3 mb-6">
                          {[
                            { emoji: '🚀', title: 'Founders', desc: 'scaling revenue without hiring expensive staff' },
                            { emoji: '📈', title: 'Agencies', desc: 'automating client delivery while increasing profit margins' },
                            { emoji: '🧠', title: 'Coaches & Educators', desc: 'creating scalable course delivery and client success systems' },
                            { emoji: '🛠️', title: 'Service Businesses', desc: 'capturing more leads and converting them at higher rates' },
                            { emoji: '📊', title: 'E-commerce', desc: 'automating customer journeys from first click to repeat purchase' },
                            { emoji: '🏢', title: 'B2B Companies', desc: 'streamlining sales processes and reducing cost per acquisition' },
                            { emoji: '💼', title: 'Consultants', desc: 'delivering premium client experiences while working fewer hours' }
                          ].map((audience, index) => (
                            <div key={index} className="flex items-start space-x-2">
                              <span className="text-lg">{audience.emoji}</span>
                              <div>
                                <span className="font-medium text-gray-900">{audience.title}</span>
                                <span className="text-sm text-gray-600"> {audience.desc}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* ROI Section */}
                      <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                        <h4 className="font-semibold text-gray-900 mb-3">Investment Philosophy:</h4>
                        <p className="text-gray-700 mb-4">Our automation systems typically pay for themselves within 30-60 days through:</p>
                        <div className="grid sm:grid-cols-2 gap-2">
                          {[
                            'Increased lead conversion rates (20-40% improvement)',
                            'Faster sales cycles (30-50% reduction in time-to-close)',
                            'Higher customer lifetime value (25-75% increase)',
                            'Reduced operational costs (40-60% time savings)'
                          ].map((benefit, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span className="text-sm text-gray-700">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Testimonial */}
                      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold text-sm">JR</span>
                          </div>
                          <div>
                            <p className="text-gray-700 italic mb-2">
                              "We went from manually managing 50 leads to automatically nurturing 500+ prospects. Our revenue increased by $30K in the first quarter, and I got my weekends back."
                            </p>
                            <p className="text-sm font-medium text-gray-900">Jessica R., Marketing Agency Owner</p>
                          </div>
                        </div>
                      </div>

                      {/* CTAs */}
                      <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Link 
                          href="https://calendly.com/lumenosis/30min"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl text-center hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
                        >
                          💡 Book Free Revenue Strategy Call
                        </Link>
                        <Link 
                          href="/"
                          className="flex-1 bg-gray-100 text-gray-700 font-medium py-4 px-6 rounded-xl text-center hover:bg-gray-200 transition-colors"
                        >
                          View Client Success Stories
                        </Link>
                      </div>

                      {/* Investment Range */}
                      <div className="text-center pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Average setup investment:</span> $1K-15K | 
                          <span className="font-medium"> Average yearly revenue increase & saved:</span> $10K-50K+
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
              <Link href="https://calendly.com/lumenosis/30min" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Schedule Call</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Prevent OmakaseAI Widget from Loading */}
      <Script id="prevent-omakase-widget" strategy="afterInteractive">
        {`
          console.log('Preventing OmakaseAI Widget on Lead Magnet page');
          
          // Block OmakaseAI widget loading
          if (window.OmakaseAIWidget) {
            delete window.OmakaseAIWidget;
          }
          
          // Remove any existing widgets
          function removeWidgets() {
            const widgets = document.querySelectorAll('[id*="omakase"], [class*="omakase"], [data-omakase]');
            widgets.forEach(widget => {
              widget.remove();
            });
            
            // Remove any chat widgets
            const chatWidgets = document.querySelectorAll('[class*="chat"], [class*="widget"]');
            chatWidgets.forEach(widget => {
              if (widget.textContent && widget.textContent.toLowerCase().includes('powered by')) {
                widget.remove();
              }
            });
          }
          
          removeWidgets();
          setInterval(removeWidgets, 500);
          
          // Block any attempts to load OmakaseAI
          const originalCreateElement = document.createElement;
          document.createElement = function(tagName) {
            const element = originalCreateElement.call(this, tagName);
            if (tagName.toLowerCase() === 'script' && element.src && element.src.includes('omakase')) {
              console.log('Blocked OmakaseAI script from loading');
              return document.createTextNode('');
            }
            return element;
          };
        `}
      </Script>
    </div>
  );
}