'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { analytics, useScrollTracking, useTimeTracking } from '../../../lib/analytics';

type ValidSlug = 
  | 'real-estate-automation'
  | 'n8n-workflow-collection'
  | 'n8n-ai-agent-builder'
  | 'ai-real-estate-video-automation'
  | 'apollo-cold-email-automation'
  | 'ai-hidden-real-estate-listings';

interface WorkflowGuideClientProps {
  slug: string; // Keep as string since it comes from Next.js params
}

export default function WorkflowGuideClient({ slug }: WorkflowGuideClientProps) {
  const [activeSection, setActiveSection] = useState('overview');
  const [showAllSections, setShowAllSections] = useState(true);

  // Analytics tracking
  useEffect(() => {
    // Track page view
    analytics.leadMagnet.viewed(slug);
    
    // Set up scroll and time tracking
    const cleanupScroll = useScrollTracking(`lead-magnet-${slug}`);
    const cleanupTime = useTimeTracking(`lead-magnet-${slug}`);
    
    return () => {
      cleanupScroll?.();
      cleanupTime?.();
    };
  }, [slug]);

  // Validate supported workflows
  const validWorkflows = ['real-estate-automation', 'n8n-workflow-collection', 'n8n-ai-agent-builder', 'ai-real-estate-video-automation', 'apollo-cold-email-automation', 'ai-hidden-real-estate-listings'];
  if (!validWorkflows.includes(slug)) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Workflow Not Found</h1>
          <Link href="/lead-magnet" className="text-indigo-600 hover:text-indigo-700">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const handleDownload = async (filename: string) => {
    // Track download event
    analytics.leadMagnet.downloaded(slug);
    
    try {
      // Map display filenames to API filenames
      const apiFilenameMap: { [key: string]: string } = {
        'RealEstateLeadGenAutomation.json': 'real-estate-automation.json',
        'N8N Workflow Builder.json': 'n8n-ai-agent-builder.json',
        'Cold_Email_Live_Build.json': 'apollo-cold-email-automation.json',
        'yt vid real estate vid gen.blueprint.json': 'ai-real-estate-video-automation.json'
      };
      
      const apiFilename = apiFilenameMap[filename] || filename;
      const response = await fetch(`/api/workflow/${apiFilename}`);
      
      if (!response.ok) {
        throw new Error('Download failed');
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
      alert('Sorry, there was an error downloading the file. Please try again.');
    }
  };

  const handleCopyWorkflow = async () => {
    try {
      // Get the correct API filename for ALL workflows
      let apiFilename = '';
      switch (slug) {
        case 'real-estate-automation':
          apiFilename = 'real-estate-automation.json';
          break;
        case 'n8n-ai-agent-builder':
          apiFilename = 'n8n-ai-agent-builder.json';
          break;
        case 'apollo-cold-email-automation':
          apiFilename = 'apollo-cold-email-automation.json';
          break;
        case 'ai-real-estate-video-automation':
          apiFilename = 'ai-real-estate-video-automation.json';
          break;
        case 'n8n-workflow-collection':
          // This is a collection page, not a single workflow
          throw new Error('This is a workflow collection - browse individual workflows');
        default:
          throw new Error('Workflow not found');
      }
      
      console.log('Attempting to fetch:', `/api/workflow/${apiFilename}`);
      
      // Fetch the COMPLETE JSON file from our API route
      const response = await fetch(`/api/workflow/${apiFilename}`);
      console.log('Response status:', response.status, response.statusText);
      
      if (!response.ok) {
        console.error('Fetch failed:', response.status, response.statusText);
        throw new Error(`Failed to load workflow: ${response.status} ${response.statusText}`);
      }
      
      const completeJsonContent = await response.text();
      console.log('JSON content length:', completeJsonContent.length);
      
      // Use the reliable textarea method that works in ALL browsers
      const textarea = document.createElement('textarea');
      textarea.value = completeJsonContent;
      textarea.style.position = 'fixed';
      textarea.style.left = '-999999px';
      textarea.style.top = '-999999px';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      
      // Use execCommand which works in all browsers including Safari
      const successful = document.execCommand('copy');
      document.body.removeChild(textarea);
      
      if (!successful) {
        throw new Error('Copy command failed');
      }
      
      analytics.leadMagnet.copied(slug);
      alert('✅ COMPLETE workflow JSON copied! Ready to paste into N8N.');
      
    } catch (error) {
      console.error('Copy failed:', error);
      alert(`❌ Copy failed: ${error.message}. Try the download button instead.`);
    }
  };

  // Handle N8N workflow collection separately - using EXACT same layout as Real Estate
  if (slug === 'n8n-workflow-collection') {
    // Note: useState hooks are already defined at the top level of this component

    const sections = [
      { id: 'overview', title: 'Collection Overview' },
      { id: 'categories', title: 'Workflow Categories' },
      { id: 'how-to-use', title: 'How to Use' },
      { id: 'popular-workflows', title: 'Most Popular' },
      { id: 'getting-started', title: 'Getting Started' }
    ];
    return (
      <div className="min-h-screen bg-white">
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "2000+ Free N8N Workflow Collection",
              "description": "Browse 2000+ free N8N automation workflows for business automation, lead generation, CRM integration, social media, content creation, and more. Visual diagrams, one-click import, enhanced search. No signup required.",
              "image": "https://lumenosis.com/logo.png",
              "author": {
                "@type": "Organization",
                "name": "Lumenosis AI",
                "url": "https://lumenosis.com"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Lumenosis AI",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://lumenosis.com/logo.png"
                }
              },
              "datePublished": "2024-12-01",
              "dateModified": "2024-12-15",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web",
              "keywords": "n8n workflows, automation templates, business automation, lead generation workflows, crm automation, social media automation, content creation automation, free n8n templates, workflow collection, automation library",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "1250",
                "bestRating": "5"
              },
              "featureList": [
                "2000+ production-ready workflows",
                "Visual workflow diagrams",
                "Enhanced search and filtering", 
                "One-click JSON import",
                "9 business categories",
                "Weekly updates",
                "No signup required",
                "100% free access"
              ]
            })
          }}
        />
        
        {/* Header - Consistent across all pages */}
        <header className="border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                <Image src="/logo.png" alt="Lumenosis AI" width={32} height={32} className="w-8 h-8" />
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
                  <span className="relative z-10">Back to Blog</span>
                </Link>
                <Link 
                  href="https://calendly.com/lumenosis/30min" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => analytics.leadMagnet.consultationClicked('header')}
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                {/* Workflow Info */}
                <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 mb-6">
                  <h1 className="text-lg font-bold text-gray-900 mb-2">2000+ Free N8N Workflows</h1>
                  <p className="text-sm text-gray-600 mb-4">Complete automation library for any business</p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Workflows:</span>
                      <span className="font-medium text-green-600">2000+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Categories:</span>
                      <span className="font-medium text-gray-900">9 Industries</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cost:</span>
                      <span className="font-medium text-green-600">100% FREE</span>
                    </div>
                  </div>

                  {/* Action Buttons - External Website Access */}
                  <div className="mt-4 space-y-2">
                    <a
                      href="https://n8n-workflows.lumenosis.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => analytics.leadMagnet.downloaded(slug)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-2M7 7h10v10" />
                      </svg>
                      Browse All Workflows
                    </a>
                    
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText('https://n8n-workflows.lumenosis.com');
                        analytics.leadMagnet.copied(slug);
                        alert('Website URL copied to clipboard! 📋');
                      }}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copy Website URL
                    </button>
                  </div>

                  <p className="text-xs text-gray-500 mt-2 text-center">
                    100% Free • No signup required • Direct import to N8N
                  </p>
                </div>

                {/* Table of Contents */}
                <nav className="bg-white rounded-xl border border-gray-200 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">Table of Contents</h3>
                    <button
                      onClick={() => {
                        const newValue = !showAllSections;
                        setShowAllSections(newValue);
                        analytics.leadMagnet.toggleShowAll(slug, newValue);
                      }}
                      className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-md transition-colors"
                      title={showAllSections ? 'Switch to section-by-section view' : 'Show all sections at once'}
                    >
                      {showAllSections ? 'Sections' : 'Show All'}
                    </button>
                  </div>
                  {showAllSections && (
                    <p className="text-xs text-gray-500 mb-3">
                      📄 All sections visible • Click items to scroll
                    </p>
                  )}
                  {!showAllSections && (
                    <p className="text-xs text-gray-500 mb-3">
                      📑 Section mode • Click items to navigate
                    </p>
                  )}
                  <ul className="space-y-1">
                    {sections.map((section) => (
                      <li key={section.id}>
                        <button
                          onClick={() => {
                            if (showAllSections) {
                              document.getElementById(section.id)?.scrollIntoView({ 
                                behavior: 'smooth',
                                block: 'start'
                              });
                            } else {
                              setActiveSection(section.id);
                            }
                            analytics.leadMagnet.sectionViewed(slug, section.id);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                            !showAllSections && activeSection === section.id
                              ? 'bg-indigo-100 text-indigo-700 font-medium'
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                          }`}
                        >
                          {section.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <article className="prose prose-lg max-w-none">
                {/* Header */}
                <div className="not-prose mb-8">
                  <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
                    <span>Last updated: December 2024</span>
                    <span>•</span>
                    <span>2000+ workflows</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                    2000+ Free N8N Workflows Ready to Use
                  </h1>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    The most comprehensive collection of N8N automation workflows available anywhere. Browse, filter, and import workflows for business automation, lead generation, content creation, and more.
                  </p>

                  {/* Categories */}
                  <div className="mt-6">
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Categories Available:</h3>
                    <div className="flex flex-wrap gap-2">
                      {[
                        'Communication & Messaging', 'Lead Generation', 'Content Creation', 
                        'CRM & Sales', 'Project Management', 'Cloud Storage', 
                        'Marketing & Email', 'Data Processing', 'Scheduled Automations'
                      ].map((category, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Collection Overview */}
                {(showAllSections || activeSection === 'overview') && (
                  <div className={showAllSections ? 'border-b border-gray-200 pb-8 mb-8' : ''}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6" id="overview">Collection Overview</h2>
                    <div className="text-gray-700 leading-relaxed space-y-4">
                      <p>This comprehensive collection contains <strong>over 2000 production-ready N8N workflows</strong> covering every aspect of business automation. Whether you're looking to automate lead generation, streamline content creation, or optimize your sales processes, you'll find the perfect workflow here.</p>
                      
                      <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                        <h4 className="font-medium text-green-900 mb-2">🎯 What Makes This Collection Special:</h4>
                        <ul className="list-disc pl-6 space-y-1 text-sm text-green-800">
                          <li><strong>Visual Diagrams:</strong> See exactly how each workflow functions</li>
                          <li><strong>Enhanced Search:</strong> Filter by category, complexity, or tools</li>
                          <li><strong>One-Click Import:</strong> Copy JSON directly into N8N</li>
                          <li><strong>Regular Updates:</strong> New workflows added weekly</li>
                          <li><strong>100% Free:</strong> No signup, no limits, no catches</li>
                        </ul>
                      </div>

                      <p>All workflows are production-tested and come with detailed descriptions, making it easy to understand what each automation does and how to customize it for your needs.</p>
                    </div>
                  </div>
                )}

                {/* Workflow Categories */}
                {(showAllSections || activeSection === 'categories') && (
                  <div className={showAllSections ? 'border-b border-gray-200 pb-8 mb-8' : ''}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6" id="categories">Workflow Categories</h2>
                    <div className="text-gray-700 leading-relaxed space-y-6">
                      
                      {/* Communication & Messaging */}
                      <div className="border-l-4 border-blue-500 pl-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">1. Communication & Messaging</h3>
                        <ul className="list-disc pl-6 space-y-1 text-sm">
                          <li>Telegram schedule automation</li>
                          <li>Slack Stripe integration</li>
                          <li>WhatsApp chatbots</li>
                          <li>Discord automation</li>
                          <li>Teams integration workflows</li>
                        </ul>
                      </div>

                      {/* Lead Generation */}
                      <div className="border-l-4 border-green-500 pl-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">2. Lead Generation</h3>
                        <ul className="list-disc pl-6 space-y-1 text-sm">
                          <li>Company and prospect enrichment workflows</li>
                          <li>LinkedIn job scraper</li>
                          <li>Automated lead scoring</li>
                          <li>Google Maps scraper</li>
                          <li>Apify integration for web scraping</li>
                        </ul>
                      </div>

                      {/* Content Creation */}
                      <div className="border-l-4 border-purple-500 pl-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">3. Content Creation for Social Media</h3>
                        <ul className="list-disc pl-6 space-y-1 text-sm">
                          <li>Post new YouTube videos to X (Twitter)</li>
                          <li>AI agent for Instagram DMs</li>
                          <li>Reddit idea finder</li>
                          <li>Social media scheduling workflows</li>
                          <li>Autonomous AI crawler for research</li>
                        </ul>
                      </div>

                      {/* CRM & Sales */}
                      <div className="border-l-4 border-red-500 pl-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">4. CRM & Sales</h3>
                        <ul className="list-disc pl-6 space-y-1 text-sm">
                          <li>HubSpot Clearbit integration</li>
                          <li>Pipedrive automation</li>
                          <li>Copper CRM workflows</li>
                          <li>Salesmate automation</li>
                          <li>Zoho CRM with Trello integration</li>
                        </ul>
                      </div>

                      {/* Project Management */}
                      <div className="border-l-4 border-yellow-500 pl-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">5. Project Management</h3>
                        <ul className="list-disc pl-6 space-y-1 text-sm">
                          <li>Trello Google Calendar sync</li>
                          <li>Todoist task creation</li>
                          <li>ClickUp automation</li>
                          <li>Notion with Calendly integration</li>
                          <li>GitHub automation workflows</li>
                        </ul>
                      </div>

                    </div>
                  </div>
                )}

                {/* How to Use */}
                {(showAllSections || activeSection === 'how-to-use') && (
                  <div className={showAllSections ? 'border-b border-gray-200 pb-8 mb-8' : ''}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6" id="how-to-use">How to Use the Collection</h2>
                    <div className="text-gray-700 leading-relaxed space-y-4">
                      <p>Getting started with these workflows is incredibly simple. Here's your step-by-step process:</p>
                      
                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <h4 className="font-medium text-blue-900 mb-3">🚀 How to Access Workflows on the Website:</h4>
                        <ol className="list-decimal pl-6 space-y-2 text-sm text-blue-800">
                          <li><strong>Visit the Collection:</strong> Use the "Browse All Workflows" button above or go to <a href="https://n8n-workflows.lumenosis.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">n8n-workflows.lumenosis.com</a></li>
                          <li><strong>Browse & Filter:</strong> Use categories, search, and filters to find workflows for your business</li>
                          <li><strong>View Details:</strong> Each workflow shows description, complexity, and integration details</li>
                          <li><strong>Download JSON:</strong> Click the blue "Download JSON" button for direct file download</li>
                          <li><strong>View JSON Code:</strong> Click "View JSON" to see the raw code with copy functionality</li>
                          <li><strong>View Diagram:</strong> Click "View Diagram" to see the visual workflow flowchart</li>
                          <li><strong>Import to N8N:</strong> Download or copy the JSON and import directly into your N8N instance</li>
                        </ol>
                      </div>

                      <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                        <h4 className="font-medium text-green-900 mb-3">📋 Import Process:</h4>
                        <ol className="list-decimal pl-6 space-y-2 text-sm text-green-800">
                          <li><strong>Browse:</strong> Visit the workflow collection website</li>
                          <li><strong>Filter:</strong> Use categories and search to find what you need</li>
                          <li><strong>Choose Method:</strong> Download JSON, view & copy, or review diagram first</li>
                          <li><strong>Import to N8N:</strong> Use "Import from JSON" or paste directly</li>
                          <li><strong>Configure:</strong> Add your API keys and customize settings</li>
                          <li><strong>Deploy:</strong> Activate and start automating!</li>
                        </ol>
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900">Website Features Available:</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Download JSON:</strong> Direct file download for instant N8N import</li>
                        <li><strong>View JSON:</strong> Browse workflow code with syntax highlighting and copy button</li>
                        <li><strong>View Diagram:</strong> Visual flowchart showing workflow structure and all node connections</li>
                        <li><strong>Enhanced Search:</strong> Filter by tools, complexity, category, or keywords</li>
                        <li><strong>Category Browsing:</strong> 9 business categories with hundreds of workflows each</li>
                        <li><strong>No Signup Required:</strong> Instant access to all 2000+ workflows</li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* Most Popular */}
                {(showAllSections || activeSection === 'popular-workflows') && (
                  <div className={showAllSections ? 'border-b border-gray-200 pb-8 mb-8' : ''}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6" id="popular-workflows">Most Popular Workflows</h2>
                    <div className="text-gray-700 leading-relaxed space-y-4">
                      <p>Here are some of the most downloaded and useful workflows from the collection:</p>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-2">🔗 Lead Generation Suite</h4>
                          <p className="text-sm text-gray-600">Complete lead enrichment and scoring system with multiple data sources.</p>
                        </div>
                        
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-2">📱 Social Media Automation</h4>
                          <p className="text-sm text-gray-600">Cross-platform posting and engagement automation for all major platforms.</p>
                        </div>
                        
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-2">📧 Email Marketing Integration</h4>
                          <p className="text-sm text-gray-600">Advanced email automation with behavioral triggers and segmentation.</p>
                        </div>
                        
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-2">📊 Data Processing Pipeline</h4>
                          <p className="text-sm text-gray-600">Extract, transform, and load data between multiple systems automatically.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Getting Started */}
                {(showAllSections || activeSection === 'getting-started') && (
                  <div className={showAllSections ? '' : ''}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6" id="getting-started">Ready to Start Automating?</h2>
                    <div className="text-gray-700 leading-relaxed space-y-4">
                      <p>With over 2000 workflows at your fingertips, you're just minutes away from powerful automation that can transform your business processes.</p>
                      
                      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border border-gray-200">
                        <h4 className="font-medium text-gray-900 mb-3">🎯 What You Can Achieve:</h4>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <ul className="space-y-2">
                            <li className="flex items-center">
                              <span className="text-green-500 mr-2">✓</span>
                              Automate repetitive tasks
                            </li>
                            <li className="flex items-center">
                              <span className="text-green-500 mr-2">✓</span>
                              Generate and qualify leads
                            </li>
                            <li className="flex items-center">
                              <span className="text-green-500 mr-2">✓</span>
                              Streamline communications
                            </li>
                          </ul>
                          <ul className="space-y-2">
                            <li className="flex items-center">
                              <span className="text-green-500 mr-2">✓</span>
                              Create content automatically
                            </li>
                            <li className="flex items-center">
                              <span className="text-green-500 mr-2">✓</span>
                              Sync data between tools
                            </li>
                            <li className="flex items-center">
                              <span className="text-green-500 mr-2">✓</span>
                              Scale your operations
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 mt-6">
                        <a
                          href="https://n8n-workflows.lumenosis.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => analytics.leadMagnet.downloaded(slug)}
                          className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                        >
                          🚀 Start Browsing Workflows
                          <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </a>
                        
                        <Link
                          href="https://calendly.com/lumenosis/30min" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          onClick={() => analytics.leadMagnet.consultationClicked('getting-started')}
                          className="inline-flex items-center justify-center border border-indigo-500 text-indigo-600 hover:bg-indigo-50 font-medium py-3 px-6 rounded-lg transition-colors"
                        >
                          💬 Need Help? Book Free Consultation
                        </Link>
                      </div>

                      <p className="text-sm text-gray-500 mt-4">
                        Questions? Want custom automation? Our team is here to help you succeed with workflow automation.
                      </p>
                    </div>
                  </div>
                )}

              </article>

              {/* Navigation Bar */}
              <div className="mt-12 border-t border-gray-200 pt-8">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  {/* Back to Blog */}
                  <Link 
                    href="/lead-magnet"
                    className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors group"
                  >
                    <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium">Back to Blog</span>
                  </Link>

                  {/* Lumenosis AI Link */}
                  <Link 
                    href="/"
                    className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors group"
                  >
                    <span className="text-sm font-medium">Visit Lumenosis AI</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }

  // Handle N8N AI Agent Builder separately - using EXACT same layout as Real Estate
  if (slug === 'n8n-ai-agent-builder') {
    // Note: useState hooks are already defined at the top level of this component

    const sections = [
      { id: 'overview', title: 'System Overview' },
      { id: 'requirements', title: 'Prerequisites & Setup' },
      { id: 'anthropic-setup', title: 'Claude Opus 4 Setup' },
      { id: 'openrouter-setup', title: 'OpenRouter Configuration' },
      { id: 'n8n-api-setup', title: 'N8N API Setup' },
      { id: 'workflow-import', title: 'Workflow Import & Testing' },
      { id: 'customization', title: 'Customization & Training' },
      { id: 'troubleshooting', title: 'Troubleshooting' }
    ];

    return (
      <div className="min-h-screen bg-white">
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HowTo",
              "name": "N8N AI Agent Builder - Build Workflows with AI",
              "description": "Revolutionary AI system that creates complete N8N workflows from text descriptions. Uses Claude Opus 4 thinking to generate functional workflows with proper connections, credentials, and documentation.",
              "image": "https://lumenosis.com/logo.png",
              "author": {
                "@type": "Organization",
                "name": "Lumenosis AI",
                "url": "https://lumenosis.com"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Lumenosis AI",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://lumenosis.com/logo.png"
                }
              },
              "datePublished": "2024-12-15",
              "dateModified": "2024-12-15",
              "totalTime": "PT60M",
              "estimatedCost": {
                "@type": "MonetaryAmount",
                "currency": "USD",
                "value": "50"
              },
              "tool": [
                {
                  "@type": "HowToTool",
                  "name": "N8N Automation Platform"
                },
                {
                  "@type": "HowToTool", 
                  "name": "Claude Opus 4"
                },
                {
                  "@type": "HowToTool",
                  "name": "OpenRouter API"
                },
                {
                  "@type": "HowToTool",
                  "name": "Google Drive"
                }
              ],
              "step": [
                {
                  "@type": "HowToStep",
                  "name": "System Overview",
                  "text": "Understand the AI agent architecture and workflow generation process"
                },
                {
                  "@type": "HowToStep", 
                  "name": "Prerequisites & Setup",
                  "text": "Set up required accounts and API keys for Claude Opus 4, OpenRouter, and N8N"
                },
                {
                  "@type": "HowToStep",
                  "name": "Claude Opus 4 Setup", 
                  "text": "Configure Anthropic API key and enable thinking capabilities"
                },
                {
                  "@type": "HowToStep",
                  "name": "OpenRouter Configuration",
                  "text": "Set up OpenRouter API for GPT-4.1 mini model"
                },
                {
                  "@type": "HowToStep",
                  "name": "N8N API Setup",
                  "text": "Configure N8N API credentials for workflow creation"
                },
                {
                  "@type": "HowToStep",
                  "name": "Workflow Import & Testing", 
                  "text": "Import the AI agent builder and test workflow generation"
                },
                {
                  "@type": "HowToStep",
                  "name": "Customization & Training",
                  "text": "Customize the AI agent and add new workflow patterns"
                },
                {
                  "@type": "HowToStep",
                  "name": "Troubleshooting",
                  "text": "Common issues and solutions for optimal performance"
                }
              ]
            })
          }}
        />
        
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 sm:space-x-4">
                <Link href="/lead-magnet" className="flex items-center space-x-1 sm:space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm hidden xs:inline">Back to Blog</span>
                  <span className="text-sm xs:hidden">Back</span>
                </Link>
                <div className="hidden sm:block w-px h-6 bg-gray-300"></div>
                <Link href="/" className="flex items-center space-x-1 sm:space-x-2">
                  <Image src="/logo.png" alt="Lumenosis AI" width={24} height={24} className="h-6 w-6 sm:h-8 sm:w-8" />
                  <span className="text-base sm:text-lg font-bold text-gray-900 hidden xs:inline">Lumenosis AI</span>
                </Link>
              </div>
              <Link 
                href="https://calendly.com/lumenosis/30min" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => analytics.leadMagnet.consultationClicked('header')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-2 sm:px-4 rounded-lg transition-colors text-xs sm:text-sm"
              >
                <span className="hidden sm:inline">Schedule Free Setup Call</span>
                <span className="sm:hidden">Free Call</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                
                {/* Workflow Info */}
                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 mb-6">
                  <h1 className="text-lg font-bold text-gray-900 mb-2">N8N AI Agent Builder</h1>
                  <p className="text-sm text-gray-600 mb-4">Claude Opus 4 + OpenRouter + N8N API Integration</p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Difficulty:</span>
                      <span className="font-medium text-orange-600">Advanced</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Setup Time:</span>
                      <span className="font-medium text-gray-900">45-60 minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Read Time:</span>
                      <span className="font-medium text-gray-900">20 min read</span>
                    </div>
                  </div>

                  {/* Download & Copy Buttons */}
                  <div className="mt-4 space-y-2">
                    <button
                      onClick={() => handleDownload('N8N Workflow Builder.json')}
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      Download AI Builder Workflow
                    </button>
                    
                    <button
                      onClick={() => handleCopyWorkflow()}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2v8a2 2 0 002 2z" />
                      </svg>
                      Copy JSON to Clipboard
                    </button>
                  </div>

                  <p className="text-xs text-gray-500 mt-2 text-center">
                    No email required • Import directly to N8N
                  </p>
                </div>

                {/* Table of Contents */}
                <nav className="bg-white rounded-xl border border-gray-200 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">Table of Contents</h3>
                    <button
                      onClick={() => {
                        const newValue = !showAllSections;
                        setShowAllSections(newValue);
                        analytics.leadMagnet.toggleShowAll(slug, newValue);
                      }}
                      className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-md transition-colors"
                      title={showAllSections ? 'Switch to sectioned view' : 'Show all sections at once'}
                    >
                      {showAllSections ? 'Sections' : 'Show All'}
                    </button>
                  </div>
                  {showAllSections && (
                    <p className="text-xs text-gray-500 mb-3">
                      📄 All sections visible • Click items to scroll
                    </p>
                  )}
                  {!showAllSections && (
                    <p className="text-xs text-gray-500 mb-3">
                      📑 Section mode • Click items to navigate
                    </p>
                  )}
                  <ul className="space-y-1">
                    {sections.map((section) => (
                      <li key={section.id}>
                        <button
                          onClick={() => {
                            if (showAllSections) {
                              document.getElementById(section.id)?.scrollIntoView({ 
                                behavior: 'smooth',
                                block: 'start'
                              });
                            } else {
                              setActiveSection(section.id);
                            }
                            analytics.leadMagnet.sectionViewed(slug, section.id);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                            !showAllSections && activeSection === section.id
                              ? 'bg-orange-100 text-orange-700 font-medium'
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                          }`}
                        >
                          {section.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <article className="prose prose-lg max-w-none">
                
                {/* Header */}
                <div className="not-prose mb-8">
                  <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
                    <span>Last updated: December 2024</span>
                    <span>•</span>
                    <span>20 min read</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                    N8N AI Agent Builder - Create Workflows with AI
                  </h1>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Revolutionary AI system that builds complete N8N workflows from simple text descriptions. Watch as Claude Opus 4 creates functional workflows with proper connections, credentials setup, and comprehensive documentation.
                  </p>

                  {/* Tools */}
                  <div className="mt-6">
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Tools & Integrations:</h3>
                    <div className="flex flex-wrap gap-2">
                      {['N8N', 'Claude Opus 4', 'OpenRouter', 'Google Drive', 'N8N API'].map((tool, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Content Sections */}
                {(showAllSections || activeSection === 'overview') && (
                  <div className={showAllSections ? 'border-b border-gray-200 pb-8 mb-8' : ''}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6" id="overview">System Overview</h2>
                    <div className="text-gray-700 leading-relaxed space-y-4">
                      <p>This revolutionary AI system transforms how developers create N8N workflows. Instead of manually building complex automations node by node, simply describe what you want in natural language and watch as the AI generates a complete, functional workflow.</p>
                      
                      <p>The system uses a multi-agent architecture:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Main Agent (GPT-4.1 mini):</strong> Receives user requests and manages the conversation flow</li>
                        <li><strong>Builder Agent (Claude Opus 4):</strong> Generates the actual N8N workflow JSON with "thinking" capabilities</li>
                        <li><strong>Developer Tool:</strong> Sub-workflow that handles the technical workflow creation process</li>
                        <li><strong>N8N API Integration:</strong> Automatically creates workflows in your N8N instance</li>
                        <li><strong>Documentation System:</strong> Google Drive integration for maintaining knowledge base</li>
                      </ul>
                      
                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <h4 className="font-medium text-blue-900 mb-2">🚀 What Makes This Special:</h4>
                        <ul className="list-disc pl-6 space-y-1 text-sm text-blue-800">
                          <li><strong>Claude Opus 4 "Thinking":</strong> The AI actually thinks through the workflow logic before generating</li>
                          <li><strong>Minimal Context Required:</strong> Works with just one Google Doc of examples</li>
                          <li><strong>Automatic Connections:</strong> Properly connects all nodes and handles data flow</li>
                          <li><strong>Built-in Documentation:</strong> Generates sticky notes with setup instructions</li>
                          <li><strong>Cost Optimized:</strong> ~$0.34 per workflow generation</li>
                        </ul>
                      </div>
                      
                      <p>Watch the demonstration video to see the system in action - from a simple text request to a fully functional Slack agent with calendar and Gmail tools, complete with Google Sheets logging.</p>
                    </div>
                  </div>
                )}

                {(showAllSections || activeSection === 'requirements') && (
                  <div className={showAllSections ? 'border-b border-gray-200 pb-8 mb-8' : ''}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6" id="requirements">Prerequisites & Setup Requirements</h2>
                    <div className="text-gray-700 leading-relaxed space-y-4">
                      <p>This is an advanced automation system that requires several API integrations. Don't worry - the setup process is straightforward and well-documented!</p>
                      
                      <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                        <h4 className="font-medium text-yellow-900 mb-2">💰 Total Monthly Cost Breakdown:</h4>
                        <ul className="list-disc pl-6 space-y-1 text-sm text-yellow-800">
                          <li><strong>N8N Cloud Starter:</strong> $25/month (14-day free trial)</li>
                          <li><strong>Claude Opus 4:</strong> ~$0.34 per workflow generated (pay-per-use)</li>
                          <li><strong>OpenRouter:</strong> ~$0.02 per conversation (pay-per-use)</li>
                          <li><strong>Google Drive:</strong> Free (for documentation storage)</li>
                          <li><strong>Total:</strong> ~$25-30/month + usage costs</li>
                        </ul>
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900">Required Accounts & Services</h3>
                      <div className="space-y-4">
                        <div className="border-l-4 border-orange-500 pl-4">
                          <h4 className="font-medium text-gray-900">
                            1. <a href="https://console.anthropic.com" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:text-orange-700 underline">Anthropic Claude API</a> (Essential)
                          </h4>
                          <p className="text-sm text-gray-600">Powers the main workflow builder with Claude Opus 4 "thinking" capabilities</p>
                          <p className="text-sm"><strong>Cost:</strong> $15 input tokens + $75 output tokens per million (~$0.34 per workflow)</p>
                          <a href="https://console.anthropic.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm text-orange-600 hover:text-orange-700 mt-1">
                            Sign up at console.anthropic.com →
                          </a>
                        </div>
                        
                        <div className="border-l-4 border-blue-500 pl-4">
                          <h4 className="font-medium text-gray-900">
                            2. <a href="https://openrouter.ai" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 underline">OpenRouter API</a> (Essential)
                          </h4>
                          <p className="text-sm text-gray-600">Provides access to GPT-4.1 mini for the main conversation agent</p>
                          <p className="text-sm"><strong>Cost:</strong> Very low pay-per-use (~$0.02 per conversation)</p>
                          <a href="https://openrouter.ai" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 mt-1">
                            Start at openrouter.ai →
                          </a>
                        </div>
                        
                        <div className="border-l-4 border-purple-500 pl-4">
                          <h4 className="font-medium text-gray-900">
                            3. <a href="https://n8n.cloud" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700 underline">N8N Cloud Account</a> (Essential)
                          </h4>
                          <p className="text-sm text-gray-600">Automation platform where workflows are created and API access is required</p>
                          <p className="text-sm"><strong>Cost:</strong> $25/month Starter plan (free 14-day trial)</p>
                          <a href="https://n8n.cloud" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm text-purple-600 hover:text-purple-700 mt-1">
                            Start free trial at n8n.cloud →
                          </a>
                        </div>

                        <div className="border-l-4 border-green-500 pl-4">
                          <h4 className="font-medium text-gray-900">
                            4. <a href="https://drive.google.com" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 underline">Google Drive</a> (Essential)
                          </h4>
                          <p className="text-sm text-gray-600">Stores the N8N documentation that trains the AI agent</p>
                          <p className="text-sm"><strong>Cost:</strong> Free (basic Google account sufficient)</p>
                          
                          <div className="mt-3 p-3 bg-green-50 rounded border border-green-200">
                            <h5 className="font-medium text-green-900 mb-2">📄 Required Google Doc Setup:</h5>
                            <ol className="list-decimal pl-4 space-y-1 text-sm text-green-800">
                              <li><a href="https://docs.google.com/document/d/1KxjqRt9MhOBnKl416hygbWNx3U4wq1_ots3TmNPDEN0/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 underline">Copy this Google Doc</a> to your own Google Drive</li>
                              <li>Click "File" → "Make a copy" and save to your Google Drive</li>
                              <li>In the N8N workflow, update the Google Drive node with your copy's file ID</li>
                              <li>Connect your Google credentials in N8N</li>
                            </ol>
                            <p className="text-xs text-green-700 mt-2"><strong>Purpose:</strong> This document contains N8N workflow examples that train the AI to build better workflows</p>
                          </div>
                          
                          <a href="https://drive.google.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm text-green-600 hover:text-green-700 mt-1">
                            Access at drive.google.com →
                          </a>
                        </div>
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900">What You'll Achieve</h3>
                      <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                        <ul className="list-disc pl-6 space-y-2 text-green-800">
                          <li><strong>Natural Language Workflow Creation:</strong> Describe workflows in plain English</li>
                          <li><strong>Automatic Node Configuration:</strong> Proper connections and parameter setup</li>
                          <li><strong>Built-in Documentation:</strong> Sticky notes with setup instructions</li>
                          <li><strong>Multi-Agent Architecture:</strong> Scalable system for complex automations</li>
                          <li><strong>Cost-Effective Solution:</strong> Generate unlimited workflows for ~$0.34 each</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {(showAllSections || activeSection === 'anthropic-setup') && (
                  <div className={showAllSections ? 'border-b border-gray-200 pb-8 mb-8' : ''}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6" id="anthropic-setup">Claude Opus 4 Setup</h2>
                    <div className="text-gray-700 leading-relaxed space-y-4">
                      <p>Claude Opus 4 is the heart of this system, providing the "thinking" capabilities that make workflow generation so accurate and comprehensive.</p>
                      
                      <h3 className="text-lg font-semibold text-gray-900">Step 1: Create Anthropic Account</h3>
                      <ol className="list-decimal pl-6 space-y-2">
                        <li>Visit <a href="https://console.anthropic.com" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:text-orange-700 underline">console.anthropic.com</a></li>
                        <li>Sign up or log in to your account</li>
                        <li>Navigate to the API Keys section</li>
                        <li>Create a new API key for your project</li>
                        <li>Fund your account with at least $10 for testing</li>
                      </ol>

                      <h3 className="text-lg font-semibold text-gray-900">Step 2: Configure Thinking Mode</h3>
                      <div className="bg-orange-50 rounded-lg p-4">
                        <p className="text-sm text-orange-800 mb-2"><strong>Important:</strong> Enable "thinking" mode for optimal results</p>
                        <ul className="list-disc pl-6 space-y-1 text-sm text-orange-800">
                          <li><strong>Model:</strong> claude-opus-4-20250514</li>
                          <li><strong>Max Tokens:</strong> 8000 (for complex workflows)</li>
                          <li><strong>Thinking:</strong> Enabled</li>
                          <li><strong>Thinking Budget:</strong> 1024 tokens</li>
                        </ul>
                      </div>

                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <h4 className="font-medium text-blue-900 mb-2">💡 Why Claude Opus 4 "Thinking" is Crucial:</h4>
                        <ul className="list-disc pl-6 space-y-1 text-sm text-blue-800">
                          <li>Analyzes workflow requirements before generating JSON</li>
                          <li>Plans node connections and data flow logically</li>
                          <li>Considers edge cases and error handling</li>
                          <li>Generates comprehensive documentation automatically</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {(showAllSections || activeSection === 'openrouter-setup') && (
                  <div className={showAllSections ? 'border-b border-gray-200 pb-8 mb-8' : ''}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6" id="openrouter-setup">OpenRouter Configuration</h2>
                    <div className="text-gray-700 leading-relaxed space-y-4">
                      <p>OpenRouter provides access to GPT-4.1 mini which powers the main conversation agent that manages user interactions and passes requests to the Claude builder agent.</p>
                      
                      <h3 className="text-lg font-semibold text-gray-900">Step 1: Create OpenRouter Account</h3>
                      <ol className="list-decimal pl-6 space-y-2">
                        <li>Visit <a href="https://openrouter.ai" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 underline">openrouter.ai</a></li>
                        <li>Sign up for a new account</li>
                        <li>Add credits to your account (start with $5 for testing)</li>
                        <li>Navigate to the Keys section</li>
                        <li>Create a new API key for your N8N integration</li>
                      </ol>

                      <h3 className="text-lg font-semibold text-gray-900">Step 2: Configure in N8N</h3>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <p className="text-sm text-blue-800 mb-2"><strong>Required Settings:</strong></p>
                        <ul className="list-disc pl-6 space-y-1 text-sm text-blue-800">
                          <li><strong>Model:</strong> gpt-4.1-mini</li>
                          <li><strong>Base URL:</strong> https://openrouter.ai/api/v1</li>
                          <li><strong>Temperature:</strong> 0.7</li>
                          <li><strong>Max Tokens:</strong> 1000</li>
                        </ul>
                      </div>

                      <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                        <h4 className="font-medium text-green-900 mb-2">💰 Cost Efficiency:</h4>
                        <p className="text-sm text-green-800">GPT-4.1 mini is extremely cost-effective at ~$0.02 per conversation, making it perfect for the main agent that handles user interactions.</p>
                      </div>
                    </div>
                  </div>
                )}

                {(showAllSections || activeSection === 'n8n-api-setup') && (
                  <div className={showAllSections ? 'border-b border-gray-200 pb-8 mb-8' : ''}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6" id="n8n-api-setup">N8N API Setup</h2>
                    <div className="text-gray-700 leading-relaxed space-y-4">
                      <p>The N8N API allows the builder agent to automatically create workflows in your N8N instance, making the entire process seamless.</p>
                      
                      <h3 className="text-lg font-semibold text-gray-900">Step 1: Generate N8N API Key</h3>
                      <ol className="list-decimal pl-6 space-y-2">
                        <li>Log into your N8N Cloud account</li>
                        <li>Go to <strong>Settings</strong> → <strong>N8N API</strong></li>
                        <li>Click "Create API Key"</li>
                        <li>Name it: "AI Workflow Builder"</li>
                        <li>Copy the generated API key (save it securely)</li>
                      </ol>

                      <h3 className="text-lg font-semibold text-gray-900">Step 2: Configure Base URL</h3>
                      <div className="bg-purple-50 rounded-lg p-4">
                        <p className="text-sm text-purple-800 mb-2"><strong>Your Base URL Format:</strong></p>
                        <code className="text-sm bg-white px-2 py-1 rounded border">https://[your-instance].app.n8n.cloud/api/v1</code>
                        <p className="text-xs text-purple-700 mt-2">Replace [your-instance] with your actual N8N cloud instance name</p>
                      </div>

                      <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                        <h4 className="font-medium text-yellow-900 mb-2">🔒 Security Note:</h4>
                        <p className="text-sm text-yellow-800">Store your API key securely in N8N credentials. Never share it publicly or commit it to version control.</p>
                      </div>

                      <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                        <h4 className="font-medium text-orange-900 mb-2">⚠️ Important: Workflow Link Node Configuration</h4>
                        <p className="text-sm text-orange-800 mb-2">After importing the workflow, you must update the <strong>"Workflow Link"</strong> node:</p>
                        <ol className="list-decimal pl-6 space-y-1 text-sm text-orange-800">
                          <li>Find the "Workflow Link" node in your imported workflow</li>
                          <li>Open the node settings</li>
                          <li>Replace <code>&lt;InstanceName&gt;</code> with your actual N8N instance name</li>
                          <li>Example: Change <code>https://&lt;InstanceName&gt;.app.n8n.cloud/workflow/...</code> to <code>https://mycompany.app.n8n.cloud/workflow/...</code></li>
                        </ol>
                        <p className="text-xs text-orange-700 mt-2"><strong>Why:</strong> This ensures the AI returns the correct link to access newly created workflows in your specific N8N instance.</p>
                      </div>
                    </div>
                  </div>
                )}

                {(showAllSections || activeSection === 'workflow-import') && (
                  <div className={showAllSections ? 'border-b border-gray-200 pb-8 mb-8' : ''}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6" id="workflow-import">Workflow Import & Testing</h2>
                    <div className="text-gray-700 leading-relaxed space-y-4">
                      <p>Import the AI agent builder workflow and test it with your first workflow generation.</p>
                      
                      <h3 className="text-lg font-semibold text-gray-900">Step 1: Import the Builder Workflow</h3>
                      <ol className="list-decimal pl-6 space-y-2">
                        <li>Download the "N8N Workflow Builder.json" file from the sidebar</li>
                        <li>In N8N, click "Import from file"</li>
                        <li>Select the downloaded JSON file</li>
                        <li>Click "Import"</li>
                        <li>You'll see the complete AI builder system with 6+ nodes</li>
                      </ol>

                      <h3 className="text-lg font-semibold text-gray-900">Step 2: Configure Credentials</h3>
                      <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                        <h4 className="font-medium text-red-900 mb-2">⚠️ Required Credentials (all marked in red):</h4>
                        <ul className="list-disc pl-6 space-y-1 text-sm text-red-800">
                          <li><strong>Anthropic API:</strong> Add your Claude API key</li>
                          <li><strong>OpenRouter API:</strong> Add your OpenRouter key</li>
                          <li><strong>N8N API:</strong> Add your N8N instance API key</li>
                          <li><strong>Google Drive:</strong> Connect for documentation access</li>
                        </ul>
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900">Step 3: Test Your First Workflow</h3>
                      <div className="bg-green-50 rounded-lg p-4">
                        <p className="text-sm text-green-800 mb-2"><strong>Test Request Example:</strong></p>
                        <code className="text-sm bg-white px-3 py-2 rounded border block">"Build me an AI agent that receives a message in Slack, interprets it, and decides if it needs to use its calendar or Gmail tool, then logs results in Google Sheets and sends a message back in Slack."</code>
                      </div>

                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <h4 className="font-medium text-blue-900 mb-2">🎯 What to Expect:</h4>
                        <ul className="list-disc pl-6 space-y-1 text-sm text-blue-800">
                          <li>Claude "thinks" about the workflow structure</li>
                          <li>Generates complete JSON with nodes and connections</li>
                          <li>Automatically creates the workflow in your N8N instance</li>
                          <li>Includes sticky notes with setup instructions</li>
                          <li>Returns a direct link to view your new workflow</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {(showAllSections || activeSection === 'customization') && (
                  <div className={showAllSections ? 'border-b border-gray-200 pb-8 mb-8' : ''}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6" id="customization">Customization & Training</h2>
                    <div className="text-gray-700 leading-relaxed space-y-4">
                      <p>Enhance your AI builder by customizing the system prompts and expanding the knowledge base with new workflow patterns.</p>
                      
                      <h3 className="text-lg font-semibold text-gray-900">Updating the Knowledge Base</h3>
                      <div className="bg-green-50 rounded-lg p-4">
                        <p className="text-sm text-green-800 mb-2"><strong>The system uses a single Google Doc as its knowledge source:</strong></p>
                        <ul className="list-disc pl-6 space-y-1 text-sm text-green-800">
                          <li>Contains example AI agent workflow JSON</li>
                          <li>Includes sticky note formatting examples</li>
                          <li>Acts as the "source of truth" for N8N structure</li>
                          <li>Easy to update as N8N evolves</li>
                        </ul>
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900">Adding New Node Types</h3>
                      <ol className="list-decimal pl-6 space-y-2">
                        <li>Test new workflows manually in N8N</li>
                        <li>Export successful workflows as JSON</li>
                        <li>Add examples to your Google Doc</li>
                        <li>Update the system prompt with new capabilities</li>
                        <li>Test the AI's ability to generate similar workflows</li>
                      </ol>

                      <h3 className="text-lg font-semibold text-gray-900">Improving Accuracy</h3>
                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <h4 className="font-medium text-blue-900 mb-2">📊 System Performance Tips:</h4>
                        <ul className="list-disc pl-6 space-y-1 text-sm text-blue-800">
                          <li>Keep documentation minimal but comprehensive</li>
                          <li>Version your system prompts for testing</li>
                          <li>Log successful and failed generations</li>
                          <li>Update node versions as N8N releases updates</li>
                          <li>Use vector databases for larger documentation sets</li>
                        </ul>
                      </div>

                      <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                        <p className="text-sm text-yellow-800"><strong>💡 Pro Tip:</strong> The system is designed to be lightweight. Adding too much documentation can increase costs and reduce performance. Focus on quality examples over quantity.</p>
                      </div>
                    </div>
                  </div>
                )}

                {(showAllSections || activeSection === 'troubleshooting') && (
                  <div className={showAllSections ? '' : ''}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6" id="troubleshooting">Troubleshooting & Support</h2>
                    <div className="text-gray-700 leading-relaxed space-y-4">
                      <p>Common issues and solutions to keep your AI workflow builder running smoothly.</p>
                      
                      <h3 className="text-lg font-semibold text-gray-900">Common Issues</h3>
                      <div className="space-y-4">
                        <div className="border-l-4 border-red-500 pl-4">
                          <h4 className="font-medium text-gray-900">❌ "Invalid JSON Structure" Error</h4>
                          <p className="text-sm text-gray-600">The AI generated malformed JSON that N8N cannot import</p>
                          <p className="text-sm"><strong>Solution:</strong> Check the system prompt formatting requirements and ensure the settings object is properly hardcoded</p>
                        </div>
                        
                        <div className="border-l-4 border-yellow-500 pl-4">
                          <h4 className="font-medium text-gray-900">⚠️ "Node Type Not Found" Error</h4>
                          <p className="text-sm text-gray-600">AI referenced a node that doesn't exist in your N8N version</p>
                          <p className="text-sm"><strong>Solution:</strong> Update the Google Doc with current node types and versions from your N8N instance</p>
                        </div>

                        <div className="border-l-4 border-blue-500 pl-4">
                          <h4 className="font-medium text-gray-900">🔄 Inconsistent Workflow Quality</h4>
                          <p className="text-sm text-gray-600">Some generated workflows work better than others</p>
                          <p className="text-sm"><strong>Solution:</strong> This is normal! The system gives you 80% completion. Use generated workflows as templates and customize as needed</p>
                        </div>

                        <div className="border-l-4 border-green-500 pl-4">
                          <h4 className="font-medium text-gray-900">💰 High API Costs</h4>
                          <p className="text-sm text-gray-600">Claude Opus 4 thinking mode can be expensive with large documentation</p>
                          <p className="text-sm"><strong>Solution:</strong> Keep your Google Doc concise. Consider using vector databases for larger knowledge bases</p>
                        </div>
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900">Best Practices</h3>
                      <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                        <ul className="list-disc pl-6 space-y-1 text-sm text-orange-800">
                          <li>Start with simple workflow requests to test the system</li>
                          <li>Always review generated workflows before running them</li>
                          <li>Keep your N8N node knowledge current</li>
                          <li>Use the thinking output to understand AI reasoning</li>
                          <li>Save successful prompts for future reference</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
                
              </article>

              {/* STANDARD Need Personalized Help Section - FINAL VERSION */}
              <div className="mt-12 bg-blue-50 rounded-xl p-6 border border-blue-100">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-yellow-900" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.477.859h4z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Personalized Help?</h3>
                    <p className="text-gray-700 mb-4">
                      Running into issues or want to customize this automation? I'm happy to help you get this running perfectly.
                    </p>
                    <Link 
                      href="https://calendly.com/lumenosis/30min"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => analytics.leadMagnet.consultationClicked('footer')}
                      className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                      Schedule Free 30-Minute Setup Call
                      <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </div>

                {/* Navigation Bar */}
                <div className="mt-12 border-t border-gray-200 pt-8">
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    {/* Back to Blog */}
                    <Link 
                      href="/lead-magnet"
                      className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors group"
                    >
                      <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-medium">Back to Blog</span>
                    </Link>

                    {/* Lumenosis AI Link */}
                    <Link 
                      href="/"
                      className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors group"
                    >
                      <span className="text-sm font-medium">Visit Lumenosis AI</span>
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Handle Apollo Cold Email Automation separately - using EXACT same layout as Real Estate
  if (slug === 'apollo-cold-email-automation') {
    // Note: useState hooks are already defined at the top level of this component

    const sections = [
      { id: 'overview', title: 'Automation Overview' },
      { id: 'requirements', title: 'Requirements & Setup' },
      { id: 'account-setup', title: 'Account Setup' },
      { id: 'workflow-import', title: 'Workflow Import' },
      { id: 'configuration', title: 'API Configuration' },
      { id: 'running-automation', title: 'Running the Automation' },
      { id: 'troubleshooting', title: 'Troubleshooting & Support' }
    ];

    return (
      <div className="min-h-screen bg-white">
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HowTo",
              "name": "Apollo Cold Email Automation with AI Personalization",
              "description": "Complete automation guide for Apollo lead scraping with AI personalized cold emails. Scrape 1000+ leads from Apollo, generate custom messages with AI, and auto-send with Instantly.",
              "image": "https://lumenosis.com/logo.png",
              "author": {
                "@type": "Organization",
                "name": "Lumenosis AI",
                "url": "https://lumenosis.com"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Lumenosis AI",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://lumenosis.com/logo.png"
                }
              },
              "datePublished": "2024-12-15",
              "dateModified": "2024-12-15",
              "keywords": "apollo lead scraping, cold email automation, personalized cold emails, ai email writing, apollo automation, instantly integration, lead generation automation, cold outreach automation",
              "supply": [
                "N8N Cloud account (free plan)",
                "Apify account ($5 free credits)", 
                "Apollo.io account (free plan)",
                "OpenAI account (free credits)",
                "Google Account (for Sheets)",
                "Instantly.ai account (optional)"
              ],
              "tool": [
                "N8N automation platform",
                "Apify Apollo scraper", 
                "OpenAI GPT for personalization",
                "Google Sheets for data storage",
                "Instantly.ai for email sending"
              ],
              "totalTime": "PT30M",
              "step": [
                {
                  "@type": "HowToStep",
                  "name": "Account Setup",
                  "text": "Create accounts for N8N, Apify, Apollo, OpenAI, Google, and Instantly"
                },
                {
                  "@type": "HowToStep", 
                  "name": "Workflow Import",
                  "text": "Download and import the N8N workflow template"
                },
                {
                  "@type": "HowToStep",
                  "name": "API Configuration", 
                  "text": "Connect all API keys and configure integrations"
                },
                {
                  "@type": "HowToStep",
                  "name": "Google Sheets Setup",
                  "text": "Copy the pre-formatted Google Sheet template"
                },
                {
                  "@type": "HowToStep",
                  "name": "Apollo Search Setup",
                  "text": "Create your lead search and copy the URL"
                },
                {
                  "@type": "HowToStep",
                  "name": "Run Automation", 
                  "text": "Execute the workflow to scrape leads and generate personalized messages"
                }
              ]
            })
          }}
        />
        
            {/* Header */}
            <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-100">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 sm:space-x-4">
                    <Link href="/lead-magnet" className="flex items-center space-x-1 sm:space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm hidden xs:inline">Back to Blog</span>
                      <span className="text-sm xs:hidden">Back</span>
                    </Link>
                    <div className="hidden sm:block w-px h-6 bg-gray-300"></div>
                    <Link href="/" className="flex items-center space-x-1 sm:space-x-2">
                      <Image src="/logo.png" alt="Lumenosis AI" width={24} height={24} className="h-6 w-6 sm:h-8 sm:w-8" />
                      <span className="text-base sm:text-lg font-bold text-gray-900 hidden xs:inline">Lumenosis AI</span>
                    </Link>
                  </div>
                  <Link
                    href="https://calendly.com/lumenosis/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => analytics.leadMagnet.consultationClicked('header')}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-2 sm:px-4 rounded-lg transition-colors text-xs sm:text-sm"
                  >
                    <span className="hidden sm:inline">Schedule Free Setup Call</span>
                    <span className="sm:hidden">Free Call</span>
                  </Link>
                </div>
              </div>
            </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                {/* Workflow Info */}
                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 mb-6">
                  <h1 className="text-lg font-bold text-gray-900 mb-2">Apollo Cold Email Automation</h1>
                  <p className="text-sm text-gray-600 mb-4">AI-powered lead scraping & personalized outreach</p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Complexity:</span>
                      <span className="font-medium text-orange-600">Intermediate</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Setup Time:</span>
                      <span className="font-medium text-gray-900">30-45 minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lead Capacity:</span>
                      <span className="font-medium text-gray-900">1000+ per run</span>
                    </div>
                  </div>

                  {/* Download & Copy Buttons */}
                  <div className="mt-4 space-y-2">
                    <a
                      href="/downloads/Cold_Email_Live_Build.json"
                      download="Apollo-Cold-Email-Automation.json"
                      onClick={() => analytics.leadMagnet.downloaded(slug)}
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      Download N8N Template
                    </a>
                    
                    <button
                      onClick={() => handleCopyWorkflow()}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copy JSON to Clipboard
                    </button>
                    
                    <a
                      href="https://docs.google.com/spreadsheets/d/10SW_KhLp88uJUO6ftqTfxrkFrPmvXRb25zBTI6qRJwU/copy"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => analytics.leadMagnet.downloaded(slug)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                      </svg>
                      Copy Google Sheet Template
                    </a>
                  </div>

                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Free templates • No email required • Ready to import
                  </p>
                </div>

                {/* Table of Contents */}
                <nav className="bg-white rounded-xl border border-gray-200 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">Table of Contents</h3>
                    <button
                      onClick={() => {
                        const newValue = !showAllSections;
                        setShowAllSections(newValue);
                        analytics.leadMagnet.toggleShowAll(slug, newValue);
                      }}
                      className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-md transition-colors"
                      title={showAllSections ? 'Switch to section-by-section view' : 'Show all sections at once'}
                    >
                      {showAllSections ? 'Sections' : 'Show All'}
                    </button>
                  </div>
                  {showAllSections && (
                    <p className="text-xs text-gray-500 mb-3">
                      📄 All sections visible • Click items to scroll
                    </p>
                  )}
                  {!showAllSections && (
                    <p className="text-xs text-gray-500 mb-3">
                      📑 Section mode • Click items to navigate
                    </p>
                  )}
                  <ul className="space-y-1">
                    {sections.map((section) => (
                      <li key={section.id}>
                        <button
                          onClick={() => {
                            if (showAllSections) {
                              document.getElementById(section.id)?.scrollIntoView({ 
                                behavior: 'smooth',
                                block: 'start'
                              });
                            } else {
                              setActiveSection(section.id);
                            }
                            analytics.leadMagnet.sectionViewed(slug, section.id);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                            !showAllSections && activeSection === section.id
                              ? 'bg-indigo-100 text-indigo-700 font-medium'
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                          }`}
                        >
                          {section.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <article className="prose prose-lg max-w-none">
                {/* Header */}
                <div className="not-prose mb-8">
                  <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
                    <span>Last updated: December 2024</span>
                    <span>•</span>
                    <span>12 min read</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                    Apollo Cold Email Automation with AI Personalization
                  </h1>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Automate your Apollo lead scraping and generate personalized cold emails at scale. This workflow scrapes 1000+ leads from Apollo, creates custom AI-generated messages for each prospect, and optionally sends them through Instantly.ai.
                  </p>

                  {/* Tools */}
                  <div className="mt-6">
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Tools & Integrations:</h3>
                    <div className="flex flex-wrap gap-2">
                      {['N8N', 'Apollo.io', 'Apify', 'OpenAI', 'Google Sheets', 'Instantly.ai'].map((tool, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Content Sections */}
                
                {/* Automation Overview */}
                {(showAllSections || activeSection === 'overview') && (
                  <div className={showAllSections ? 'border-b border-gray-200 pb-8 mb-8' : ''}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6" id="overview">What You're Building</h2>
                    <div className="text-gray-700 leading-relaxed space-y-4">
                      <p>You're going to create a complete cold email automation system that:</p>
                      
                      <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
                        <h4 className="font-medium text-orange-900 mb-3">🎯 Automation Capabilities:</h4>
                        <ul className="list-disc pl-6 space-y-2 text-sm text-orange-800">
                          <li><strong>Scrapes leads from Apollo.io</strong> using any search URL you provide</li>
                          <li><strong>Writes unique, AI-powered personalized messages</strong> for each lead</li>
                          <li><strong>Saves all data to Google Sheets</strong> for easy management and review</li>
                          <li><strong>Optionally uploads to Instantly.ai</strong> for automatic cold outreach</li>
                        </ul>
                      </div>

                      <p>The entire process is hands-off once configured. Simply paste your Apollo search URL, run the workflow, and watch as it generates 1000+ personalized leads ready for outreach.</p>

                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <h4 className="font-medium text-blue-900 mb-2">💡 Why This Beats Traditional Tools:</h4>
                        <p className="text-sm text-blue-800">Most lead tools cost $300+ per month and send the same generic message to everyone. This setup costs less than $5 per 1000 leads and actually personalizes each message based on the prospect's background, company, and role.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Requirements & Setup */}
                {(showAllSections || activeSection === 'requirements') && (
                  <div className={showAllSections ? 'border-b border-gray-200 pb-8 mb-8' : ''}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6" id="requirements">What You Need</h2>
                    <div className="text-gray-700 leading-relaxed space-y-4">
                      <p>Before we start building, you'll need accounts for the following services. Most offer generous free plans:</p>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white rounded-lg border border-gray-200 p-4">
                          <h4 className="font-semibold text-gray-900 mb-3">🔧 Core Automation Platform:</h4>
                          <ul className="space-y-2 text-sm">
                            <li>• <a href="https://n8n.cloud" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">N8N Cloud account</a> (Free: 200 runs/month)</li>
                            <li>• <a href="https://apify.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">Apify account</a> ($5 free credits = ~5000 leads)</li>
                            <li>• <a href="https://openai.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">OpenAI account</a> (Free credits for new users)</li>
                          </ul>
                        </div>
                        
                        <div className="bg-white rounded-lg border border-gray-200 p-4">
                          <h4 className="font-semibold text-gray-900 mb-3">📊 Data & Outreach:</h4>
                          <ul className="space-y-2 text-sm">
                            <li>• <a href="https://apollo.io" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">Apollo.io account</a> (Free plan sufficient)</li>
                            <li>• <a href="https://google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">Google Account</a> (For Sheets integration)</li>
                            <li>• <a href="https://instantly.ai" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">Instantly.ai account</a> (Optional for sending)</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                        <h4 className="font-medium text-green-900 mb-2">💰 Cost Breakdown:</h4>
                        <ul className="text-sm text-green-800 space-y-1">
                          <li>• <strong>N8N:</strong> Free for first 200 workflow runs per month</li>
                          <li>• <strong>Apify:</strong> $5 free credits (covers ~5000 leads)</li>
                          <li>• <strong>OpenAI:</strong> ~$0.01 per personalized message (minimal cost)</li>
                          <li>• <strong>Others:</strong> Free plans cover everything else</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Account Setup */}
                {(showAllSections || activeSection === 'account-setup') && (
                  <div className={showAllSections ? 'border-b border-gray-200 pb-8 mb-8' : ''}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6" id="account-setup">Step 1: Create All Your Accounts</h2>
                    <div className="text-gray-700 leading-relaxed space-y-4">
                      <p>Go through each service and create free accounts. This should take about 10-15 minutes total:</p>
                      
                      <div className="space-y-4">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-2">1. N8N Cloud Setup</h4>
                          <ol className="list-decimal pl-6 space-y-1 text-sm">
                            <li>Visit <a href="https://n8n.cloud" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">n8n.cloud</a> and sign up</li>
                            <li>Verify your email address</li>
                            <li>Complete the onboarding (no credit card required)</li>
                          </ol>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-2">2. Apify Account (For Apollo Scraping)</h4>
                          <ol className="list-decimal pl-6 space-y-1 text-sm">
                            <li>Go to <a href="https://apify.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">apify.com</a> and create account</li>
                            <li>Verify email and log in</li>
                            <li>Navigate to Settings → Integrations → API Tokens</li>
                            <li>Copy your API token (you'll need this later)</li>
                          </ol>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-2">3. OpenAI API Setup</h4>
                          <ol className="list-decimal pl-6 space-y-1 text-sm">
                            <li>Visit <a href="https://openai.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">openai.com</a> and sign up</li>
                            <li>Go to API section and create an API key</li>
                            <li>Add some billing info (you get free credits to start)</li>
                            <li>Copy your API key for later use</li>
                          </ol>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-2">4. Apollo.io & Google Accounts</h4>
                          <ol className="list-decimal pl-6 space-y-1 text-sm">
                            <li>Create <a href="https://apollo.io" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">Apollo.io</a> account (free plan is enough)</li>
                            <li>Ensure you have a <a href="https://google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">Google account</a> for Sheets</li>
                            <li>Optional: Create <a href="https://instantly.ai" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">Instantly.ai</a> account for automated sending</li>
                          </ol>
                        </div>
                      </div>

                      <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                        <p className="text-sm text-yellow-800"><strong>💡 Pro Tip:</strong> Keep all your browser tabs open after signing up - you'll need to switch between them during setup.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Workflow Import */}
                {(showAllSections || activeSection === 'workflow-import') && (
                  <div className={showAllSections ? 'border-b border-gray-200 pb-8 mb-8' : ''}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6" id="workflow-import">Step 2: Import the N8N Workflow Template</h2>
                    <div className="text-gray-700 leading-relaxed space-y-4">
                      <p>Now let's get the automation workflow into your N8N account:</p>
                      
                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <h4 className="font-medium text-blue-900 mb-3">📥 Download & Import Process:</h4>
                        <ol className="list-decimal pl-6 space-y-2 text-sm text-blue-800">
                          <li>Download the N8N workflow template from the sidebar (Cold_Email_Live_Build.json)</li>
                          <li>Save the .json file somewhere you can find it on your computer</li>
                          <li>Go to your N8N dashboard</li>
                          <li>Click the "Import" button (arrow pointing down icon) at the top right</li>
                          <li>Select the .json file you just downloaded</li>
                          <li>The workflow will open in your N8N editor</li>
                        </ol>
                      </div>

                      <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                        <h4 className="font-medium text-green-900 mb-2">🔄 What You're Getting:</h4>
                        <p className="text-sm text-green-800">The workflow includes 8 connected nodes that handle form submission, Apollo scraping, AI personalization, Google Sheets integration, and optional Instantly.ai upload. Everything is pre-configured - you just need to add your API keys.</p>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-900">Workflow Overview:</h4>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <h5 className="font-medium text-gray-900 mb-2">Data Flow:</h5>
                              <ul className="space-y-1 text-gray-600">
                                <li>1. Form Trigger (Apollo URL input)</li>
                                <li>2. HTTP Request (Apify scraper)</li>
                                <li>3. Google Sheets (Save leads)</li>
                                <li>4. If condition (Filter new leads)</li>
                              </ul>
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-900 mb-2">AI Processing:</h5>
                              <ul className="space-y-1 text-gray-600">
                                <li>5. Loop Over Items (Batch processing)</li>
                                <li>6. OpenAI (Generate personalized messages)</li>
                                <li>7. Google Sheets Update (Add messages)</li>
                                <li>8. Instantly.ai Upload (Optional sending)</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                        <p className="text-sm text-yellow-800"><strong>⚠️ Important:</strong> Don't try to run the workflow yet - we need to configure your API keys first!</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* API Configuration */}
                {(showAllSections || activeSection === 'configuration') && (
                  <div className={showAllSections ? 'border-b border-gray-200 pb-8 mb-8' : ''}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6" id="configuration">Step 3: Configure API Keys & Integrations</h2>
                    <div className="text-gray-700 leading-relaxed space-y-4">
                      <p>Now we need to connect all your accounts to the workflow. This is where the magic happens:</p>
                      
                      <div className="space-y-6">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-3">🔧 Apify Integration (Apollo Scraper)</h4>
                          <ol className="list-decimal pl-6 space-y-2 text-sm">
                            <li>In your N8N workflow, click on the "HTTP Request" node</li>
                            <li>Look for the Authorization header field</li>
                            <li>Replace the empty "Bearer " with "Bearer YOUR_APIFY_TOKEN"</li>
                            <li>Save the node configuration</li>
                          </ol>
                          <div className="mt-2 p-3 bg-blue-50 rounded border border-blue-200">
                            <p className="text-xs text-blue-800"><strong>Your Apify token:</strong> Found in Apify Dashboard → Settings → Integrations → API Tokens</p>
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-3">🤖 OpenAI Integration</h4>
                          <ol className="list-decimal pl-6 space-y-2 text-sm">
                            <li>Click on the "OpenAI" node in your workflow</li>
                            <li>Click "Create new credentials" or "Connect account"</li>
                            <li>Enter your OpenAI API key when prompted</li>
                            <li>Test the connection to ensure it works</li>
                          </ol>
                          <div className="mt-2 p-3 bg-green-50 rounded border border-green-200">
                            <p className="text-xs text-green-800"><strong>Model Settings:</strong> The workflow uses GPT-4.1-mini for cost-effective personalization (~$0.01 per message)</p>
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-3">📊 Google Sheets Setup</h4>
                          <ol className="list-decimal pl-6 space-y-2 text-sm">
                            <li>First, copy the <a href="https://docs.google.com/spreadsheets/d/10SW_KhLp88uJUO6ftqTfxrkFrPmvXRb25zBTI6qRJwU/copy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">pre-formatted Google Sheet</a></li>
                            <li>Click "Make a copy" and save it to your Google Drive</li>
                            <li>In N8N, click on any "Google Sheets" node</li>
                            <li>Click "Connect account" and authorize N8N access to Google</li>
                            <li>Select your copied spreadsheet from the dropdown</li>
                            <li>Choose the "SAAS" worksheet tab</li>
                          </ol>
                          <div className="mt-2 p-3 bg-purple-50 rounded border border-purple-200">
                            <p className="text-xs text-purple-800"><strong>Sheet Structure:</strong> Pre-configured with columns for Name, Email, Company, Title, Industry, and Icebreaker message</p>
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-3">📧 Instantly.ai Setup (Optional)</h4>
                          <ol className="list-decimal pl-6 space-y-2 text-sm">
                            <li>If using Instantly.ai for sending, click the "HTTP Request1" node</li>
                            <li>Go to Instantly → Settings → API Keys</li>
                            <li>Copy your API key</li>
                            <li>In N8N, replace the Authorization header with "Bearer YOUR_INSTANTLY_KEY"</li>
                            <li>Update the campaign ID to match your Instantly campaign</li>
                          </ol>
                          <div className="mt-2 p-3 bg-orange-50 rounded border border-orange-200">
                            <p className="text-xs text-orange-800"><strong>Note:</strong> You can skip this step and just use Google Sheets for manual sending if preferred</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                        <h4 className="font-medium text-red-900 mb-2">🔒 Security Reminder:</h4>
                        <p className="text-sm text-red-800">Never share your API keys publicly. N8N stores them securely, but always keep them private in your own accounts.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Running the Automation */}
                {(showAllSections || activeSection === 'running-automation') && (
                  <div className={showAllSections ? 'border-b border-gray-200 pb-8 mb-8' : ''}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6" id="running-automation">Step 4: Run Your First Automation</h2>
                    <div className="text-gray-700 leading-relaxed space-y-4">
                      <p>Now for the exciting part - let's scrape some leads and generate personalized messages!</p>
                      
                      <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                        <h4 className="font-medium text-green-900 mb-3">🎯 Get Your Apollo Search URL:</h4>
                        <ol className="list-decimal pl-6 space-y-2 text-sm text-green-800">
                          <li>Log into your <a href="https://apollo.io" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800">Apollo.io</a> account</li>
                          <li>Use the search filters to build your ideal lead list:
                            <ul className="list-disc pl-6 mt-1 space-y-1">
                              <li>Industry (e.g., SaaS, Real Estate, Marketing)</li>
                              <li>Job titles (e.g., CEO, Marketing Director, Sales Manager)</li>
                              <li>Company size, location, technologies used</li>
                            </ul>
                          </li>
                          <li>Once your search results load, copy the URL from your browser's address bar</li>
                          <li>This URL contains all your search parameters - that's what we'll use</li>
                        </ol>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-medium text-gray-900">Execute the Workflow:</h4>
                        
                        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                          <h5 className="font-medium text-blue-900 mb-2">🚀 Running Process:</h5>
                          <ol className="list-decimal pl-6 space-y-2 text-sm text-blue-800">
                            <li>In N8N, click on the "Form Trigger" node (first node)</li>
                            <li>Click "Execute Workflow" to start</li>
                            <li>Paste your Apollo search URL when prompted</li>
                            <li>Hit submit and watch the magic happen!</li>
                          </ol>
                        </div>

                        <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                          <h5 className="font-medium text-yellow-900 mb-2">⏱️ What Happens Next:</h5>
                          <ul className="list-disc pl-6 space-y-1 text-sm text-yellow-800">
                            <li><strong>Scraping:</strong> Apify extracts up to 1000 leads from your Apollo search</li>
                            <li><strong>Storage:</strong> All lead data gets saved to your Google Sheet</li>
                            <li><strong>AI Processing:</strong> OpenAI generates a unique icebreaker for each lead</li>
                            <li><strong>Updates:</strong> Personalized messages are added back to the sheet</li>
                            <li><strong>Optional Upload:</strong> If configured, leads go to Instantly.ai for sending</li>
                          </ul>
                        </div>

                        <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                          <h5 className="font-medium text-purple-900 mb-2">📊 Expected Results:</h5>
                          <div className="grid md:grid-cols-2 gap-4 text-sm text-purple-800">
                            <div>
                              <h6 className="font-medium mb-1">Data Quality:</h6>
                              <ul className="list-disc pl-4 space-y-1">
                                <li>500-1000 verified leads per run</li>
                                <li>Contact info, company details, job titles</li>
                                <li>Industry keywords and insights</li>
                              </ul>
                            </div>
                            <div>
                              <h6 className="font-medium mb-1">AI Personalization:</h6>
                              <ul className="list-disc pl-4 space-y-1">
                                <li>Unique message for each prospect</li>
                                <li>References their company/role/location</li>
                                <li>Friendly, conversational tone</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-100 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-2">💬 Sample AI-Generated Message:</h4>
                        <div className="bg-white rounded p-3 text-sm italic text-gray-700 border-l-4 border-blue-500">
                          "Hey Sarah,<br/><br/>
                          Noticed you're leading growth at TechFlow - really cool space. Was hoping to run something by you."
                        </div>
                        <p className="text-xs text-gray-600 mt-2">Each message is unique and based on the prospect's actual background from Apollo</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Troubleshooting & Support */}
                {(showAllSections || activeSection === 'troubleshooting') && (
                  <div className={showAllSections ? 'border-b border-gray-200 pb-8 mb-8' : ''}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6" id="troubleshooting">Troubleshooting & Next Steps</h2>
                    <div className="text-gray-700 leading-relaxed space-y-4">
                      <div className="space-y-4">
                        <h4 className="font-medium text-gray-900">Common Issues & Solutions:</h4>
                        
                        <div className="space-y-3">
                          <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                            <h5 className="font-medium text-red-900 mb-2">❌ Apify Scraping Fails</h5>
                            <ul className="text-sm text-red-800 space-y-1">
                              <li>• Check that your Apollo URL is complete and valid</li>
                              <li>• Verify your Apify API token is correct (no extra spaces)</li>
                              <li>• Ensure you have Apify credits remaining ($5 free = ~5000 leads)</li>
                              <li>• Try a smaller lead search first (reduce filters)</li>
                            </ul>
                          </div>

                          <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                            <h5 className="font-medium text-orange-900 mb-2">⚠️ OpenAI Messages Not Generating</h5>
                            <ul className="text-sm text-orange-800 space-y-1">
                              <li>• Confirm OpenAI API key is valid and has credits</li>
                              <li>• Check if you've hit rate limits (wait a few minutes)</li>
                              <li>• Verify the model is set to "gpt-4.1-mini" for cost efficiency</li>
                              <li>• Test with a smaller batch first (10-20 leads)</li>
                            </ul>
                          </div>

                          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                            <h5 className="font-medium text-blue-900 mb-2">📊 Google Sheets Not Updating</h5>
                            <ul className="text-sm text-blue-800 space-y-1">
                              <li>• Make sure you copied the pre-formatted sheet template</li>
                              <li>• Check that N8N has permission to access your Google account</li>
                              <li>• Verify you selected the correct spreadsheet in the node</li>
                              <li>• Ensure the "SAAS" worksheet tab exists and is selected</li>
                            </ul>
                          </div>
                        </div>

                        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                          <h4 className="font-medium text-green-900 mb-3">🚀 Scaling & Optimization Tips:</h4>
                          <ul className="text-sm text-green-800 space-y-2">
                            <li>• <strong>Batch Processing:</strong> Process 100-200 leads at a time for reliability</li>
                            <li>• <strong>Cost Management:</strong> Monitor your Apify and OpenAI usage</li>
                            <li>• <strong>Quality Control:</strong> Review AI messages before sending</li>
                            <li>• <strong>A/B Testing:</strong> Try different Apollo search criteria</li>
                            <li>• <strong>Follow-up Sequences:</strong> Set up multiple message variations</li>
                          </ul>
                        </div>

                        <div className="bg-gray-100 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-3">📈 Expected Performance:</h4>
                          <div className="grid md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <h5 className="font-medium text-gray-900 mb-1">Volume:</h5>
                              <p className="text-gray-600">500-1000 leads per workflow run</p>
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-900 mb-1">Speed:</h5>
                              <p className="text-gray-600">~30-60 seconds per personalized message</p>
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-900 mb-1">Cost:</h5>
                              <p className="text-gray-600">~$0.005-0.01 per lead (all-in)</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-200">
                        <h4 className="font-medium text-indigo-900 mb-3">💡 Need Personalized Help?</h4>
                        <p className="text-sm text-indigo-800 mb-4">
                          Running into issues or want to customize the automation for your specific use case? 
                          I'm happy to help you get this running perfectly.
                        </p>
                        <Link 
                          href="https://calendly.com/lumenosis/30min"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => analytics.leadMagnet.consultationClicked('troubleshooting')}
                          className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                        >
                          Schedule Free 30-Minute Setup Call
                          <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
                
              </article>

              {/* Navigation Bar */}
              <div className="mt-12 border-t border-gray-200 pt-8">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  {/* Back to Blog */}
                  <Link 
                    href="/lead-magnet"
                    className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors group"
                  >
                    <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium">Back to Blog</span>
                  </Link>

                  {/* Lumenosis AI Link */}
                  <Link 
                    href="/"
                    className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors group"
                  >
                    <span className="text-sm font-medium">Visit Lumenosis AI</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }

  // Handle AI Real Estate Video Automation separately - using EXACT same layout as Real Estate
  if (slug === 'ai-real-estate-video-automation') {
    // Note: useState hooks are already defined at the top level of this component

    const sections = [
      { id: 'overview', title: 'Guide Overview' },
      { id: 'requirements', title: 'Requirements & Setup' },
      { id: 'form-creation', title: 'Form Creation' },
      { id: 'automation-setup', title: 'Automation Setup' },
      { id: 'testing', title: 'Testing & Deployment' }
    ];

    return (
      <div className="min-h-screen bg-white">
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HowTo",
              "name": "AI Real Estate Video Automation with Make.com & Runway",
              "description": "Complete guide to automate real estate video creation with AI. Turn property photos into professional cinematic videos with voiceovers in under 3 minutes using Make.com, Runway, ElevenLabs, and more.",
              "image": "https://lumenosis.com/logo.png",
              "author": {
                "@type": "Organization",
                "name": "Lumenosis AI",
                "url": "https://lumenosis.com"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Lumenosis AI",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://lumenosis.com/logo.png"
                }
              },
              "datePublished": "2024-12-15",
              "dateModified": "2024-12-15",
              "keywords": "ai real estate videos, property video automation, cinematic real estate videos, ai video creation, make.com automation, runway ai videos, elevenlabs voiceover, real estate marketing automation, property listing videos, ai content creation",
              "supply": [
                "Make.com account (free plan)",
                "Runway AI account ($5 credits)",
                "ElevenLabs account (free tier)",
                "OpenAI account (free credits)",
                "Form Fillout account (free)",
                "JSON2Video account (free)",
                "Gemini AI account (free)",
                "Google Drive or Dropbox (optional)"
              ],
              "tool": [
                "Make.com automation platform",
                "Runway AI video generation",
                "ElevenLabs voice synthesis",
                "OpenAI GPT-4 image analysis",
                "Form Fillout form builder",
                "JSON2Video video compilation",
                "Gemini AI script generation"
              ],
              "totalTime": "PT45M",
              "step": [
                {
                  "@type": "HowToStep",
                  "name": "Create Property Form",
                  "text": "Set up Form Fillout with property address, description, and image upload fields"
                },
                {
                  "@type": "HowToStep", 
                  "name": "Configure Make.com Automation",
                  "text": "Create scenario to watch form responses and trigger video generation workflow"
                },
                {
                  "@type": "HowToStep",
                  "name": "Set Up AI Image Analysis",
                  "text": "Connect OpenAI to analyze property images and generate descriptions"
                },
                {
                  "@type": "HowToStep",
                  "name": "Generate Cinematic Videos",
                  "text": "Use Runway AI to create smooth cinematic videos from property images"
                },
                {
                  "@type": "HowToStep",
                  "name": "Create Professional Voiceover",
                  "text": "Generate script with Gemini AI and convert to audio with ElevenLabs"
                },
                {
                  "@type": "HowToStep",
                  "name": "Combine Video and Audio",
                  "text": "Use JSON2Video to merge generated videos with voiceover audio"
                }
              ]
            })
          }}
        />
        
            {/* Header */}
            <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-100">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 sm:space-x-4">
                    <Link href="/lead-magnet" className="flex items-center space-x-1 sm:space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm hidden xs:inline">Back to Blog</span>
                      <span className="text-sm xs:hidden">Back</span>
                    </Link>
                    <div className="hidden sm:block w-px h-6 bg-gray-300"></div>
                    <Link href="/" className="flex items-center space-x-1 sm:space-x-2">
                      <Image src="/logo.png" alt="Lumenosis AI" width={24} height={24} className="h-6 w-6 sm:h-8 sm:w-8" />
                      <span className="text-base sm:text-lg font-bold text-gray-900 hidden xs:inline">Lumenosis AI</span>
                    </Link>
                  </div>
                  <Link
                    href="https://calendly.com/lumenosis/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => analytics.leadMagnet.consultationClicked('header')}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-2 sm:px-4 rounded-lg transition-colors text-xs sm:text-sm"
                  >
                    <span className="hidden sm:inline">Schedule Free Setup Call</span>
                    <span className="sm:hidden">Free Call</span>
                  </Link>
                </div>
              </div>
            </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                {/* Workflow Info */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 mb-6">
                  <h1 className="text-lg font-bold text-gray-900 mb-2">AI Real Estate Video Automation</h1>
                  <p className="text-sm text-gray-600 mb-4">Create cinematic property videos with AI</p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Complexity:</span>
                      <span className="font-medium text-purple-600">Intermediate</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Setup Time:</span>
                      <span className="font-medium text-gray-900">45-60 minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Video Creation:</span>
                      <span className="font-medium text-gray-900">Under 3 minutes</span>
                    </div>
                  </div>

                  {/* Download & Copy Buttons */}
                  <div className="mt-4 space-y-2">
                    <a
                      href="/downloads/yt vid real estate vid gen.blueprint.json"
                      download="AI-Real-Estate-Video-Automation-Template.json"
                      onClick={() => analytics.leadMagnet.downloaded(slug)}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      Download Make.com Template
                    </a>
                    
                    <Link
                      href="https://drive.google.com/file/d/1RVaGPQN--NreW-mbSyBODJhn6Y8CnE96/view?usp=drivesdk"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => analytics.leadMagnet.downloaded(slug)}
                      className="w-full bg-pink-600 hover:bg-pink-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      View Demo Video
                    </Link>
                  </div>

                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Free guide • Template included • No coding required
                  </p>
                </div>

                {/* Table of Contents */}
                <nav className="bg-white rounded-xl border border-gray-200 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">Table of Contents</h3>
                    <button
                      onClick={() => {
                        const newValue = !showAllSections;
                        setShowAllSections(newValue);
                        analytics.leadMagnet.toggleShowAll(slug, newValue);
                      }}
                      className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-md transition-colors"
                      title={showAllSections ? 'Switch to section-by-section view' : 'Show all sections at once'}
                    >
                      {showAllSections ? 'Sections' : 'Show All'}
                    </button>
                  </div>
                  {showAllSections && (
                    <p className="text-xs text-gray-500 mb-3">
                      📄 All sections visible • Click items to scroll
                    </p>
                  )}
                  {!showAllSections && (
                    <p className="text-xs text-gray-500 mb-3">
                      📑 Section mode • Click items to navigate
                    </p>
                  )}
                  <ul className="space-y-1">
                    {sections.map((section) => (
                      <li key={section.id}>
                        <button
                          onClick={() => {
                            if (showAllSections) {
                              document.getElementById(section.id)?.scrollIntoView({ 
                                behavior: 'smooth',
                                block: 'start'
                              });
                            } else {
                              setActiveSection(section.id);
                            }
                            analytics.leadMagnet.sectionViewed(slug, section.id);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                            !showAllSections && activeSection === section.id
                              ? 'bg-indigo-100 text-indigo-700 font-medium'
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                          }`}
                        >
                          {section.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <article className="prose prose-lg max-w-none">
                {/* Header */}
                <div className="not-prose mb-8">
                  <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
                    <span>Last updated: December 2024</span>
                    <span>•</span>
                    <span>45-60 minute setup</span>
                    <span>•</span>
                    <span>Under 3 minute videos</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                    AI Real Estate Video Automation Guide
                  </h1>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Create stunning cinematic property videos with voiceovers in under 3 minutes. This complete automation guide shows you how to turn property photos into professional marketing videos using AI tools like Make.com, Runway, and ElevenLabs.
                  </p>

                  {/* Tools */}
                  <div className="mt-6">
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Tools You'll Use:</h3>
                    <div className="flex flex-wrap gap-2">
                      {[
                        'Make.com', 'Runway AI', 'ElevenLabs', 'OpenAI', 'Gemini AI', 
                        'JSON2Video', 'Form Fillout', 'Google Drive'
                      ].map((tool, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Guide Overview */}
                {(showAllSections || activeSection === 'overview') && (
                  <div className={showAllSections ? 'border-b border-gray-200 pb-8 mb-8' : ''}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6" id="overview">Guide Overview</h2>
                    <div className="text-gray-700 leading-relaxed space-y-4">
                      <p>This might be one of the best AI real estate video automations ever created. <strong>It took under 3 minutes to create a stunning real estate video</strong> that typically takes hours.</p>
                      
                      <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                        <h4 className="font-medium text-red-900 mb-2">🔥 The Problem: Content Creation Takes Too Long</h4>
                        <p className="text-sm text-red-800 mb-3">99% of real estate professionals struggle with content creation, spending valuable time:</p>
                        <ul className="list-disc pl-6 space-y-1 text-sm text-red-800">
                          <li>Editing photos and videos</li>
                          <li>Writing property descriptions</li>
                          <li>Syncing audio and visuals</li>
                          <li>Achieving cinematic quality</li>
                        </ul>
                      </div>

                      <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                        <h4 className="font-medium text-green-900 mb-2">✅ The Solution: Complete AI Automation</h4>
                        <p className="text-sm text-green-800 mb-3">I automated the entire process using Make.com, ChatGPT, Runway, ElevenLabs and Form Fillout, including:</p>
                        <ul className="list-disc pl-6 space-y-1 text-sm text-green-800">
                          <li>My exact workflow for turning listings into cinematic videos</li>
                          <li>Proven prompts for engaging, accurate voiceovers</li>
                          <li>Automated generation of professional-quality videos from property images</li>
                          <li>Step-by-step breakdown of the complete AI-driven scenario</li>
                        </ul>
                      </div>

                      <p><strong>Real estate agents just need to upload their property images and description.</strong> This is the same method we use to help agents nationwide rapidly scale their listing marketing.</p>
                      
                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <h4 className="font-medium text-blue-900 mb-2">🎯 What You'll Achieve:</h4>
                        <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800">
                          <ul className="space-y-1">
                            <li>• Professional cinematic videos in under 3 minutes</li>
                            <li>• Automated voiceover generation</li>
                            <li>• Property form that anyone can fill out</li>
                          </ul>
                          <ul className="space-y-1">
                            <li>• Complete hands-off automation</li>
                            <li>• Reusable for multiple listings</li>
                            <li>• Professional marketing materials instantly</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Requirements & Setup */}
                {(showAllSections || activeSection === 'requirements') && (
                  <div className={showAllSections ? 'border-b border-gray-200 pb-8 mb-8' : ''}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6" id="requirements">Requirements & Setup</h2>
                    <div className="text-gray-700 leading-relaxed space-y-6">
                      
                      <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                        <h4 className="font-medium text-yellow-900 mb-2">⏰ Before You Begin</h4>
                        <ul className="list-disc pl-6 space-y-1 text-sm text-yellow-800">
                          <li>Set aside about <strong>45–60 minutes</strong> for your first setup</li>
                          <li>Have <strong>5–10 property images</strong> ready to upload (interior + exterior works best)</li>
                          <li>Be ready to copy/paste your API keys - each service will give you one in your dashboard</li>
                          <li>If you're new to Make.com, don't worry - we'll go step by step</li>
                        </ul>
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900">Required Accounts & Services</h3>
                      <p className="text-sm text-gray-600 mb-4">Most are free or come with free credits. Click the links to sign up:</p>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        {/* Service Cards */}
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-2">
                            <a href="https://form.fillout.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">Form Fillout</a>
                          </h4>
                          <p className="text-sm text-gray-600">Free account for creating property forms</p>
                          <span className="text-xs text-green-600 font-medium">FREE</span>
                        </div>
                        
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-2">
                            <a href="https://make.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">Make.com</a>
                          </h4>
                          <p className="text-sm text-gray-600">Free automation platform (200 runs/month on free plan)</p>
                          <span className="text-xs text-green-600 font-medium">FREE PLAN</span>
                        </div>
                        
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-2">
                            <a href="https://openai.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">OpenAI</a>
                          </h4>
                          <p className="text-sm text-gray-600">Free credits available when you sign up</p>
                          <span className="text-xs text-green-600 font-medium">FREE CREDITS</span>
                        </div>
                        
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-2">
                            <a href="https://runway.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">Runway</a>
                          </h4>
                          <p className="text-sm text-gray-600">$5 in credits is enough to generate multiple cinematic videos</p>
                          <span className="text-xs text-blue-600 font-medium">$5 CREDITS</span>
                        </div>
                        
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-2">
                            <a href="https://aistudio.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">Gemini AI (Google AI Studio)</a>
                          </h4>
                          <p className="text-sm text-gray-600">Free for generating scripts</p>
                          <span className="text-xs text-green-600 font-medium">FREE</span>
                        </div>
                        
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-2">
                            <a href="https://elevenlabs.io" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">ElevenLabs</a>
                          </h4>
                          <p className="text-sm text-gray-600">Free tier includes voice generation with a limited quota</p>
                          <span className="text-xs text-green-600 font-medium">FREE TIER</span>
                        </div>
                        
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-2">
                            <a href="https://json2video.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">JSON2Video</a>
                          </h4>
                          <p className="text-sm text-gray-600">Free account with API access to combine audio + video</p>
                          <span className="text-xs text-green-600 font-medium">FREE ACCOUNT</span>
                        </div>
                        
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-2">
                            <a href="https://drive.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">Google Drive or Dropbox</a>
                          </h4>
                          <p className="text-sm text-gray-600">To store and share your final videos (optional)</p>
                          <span className="text-xs text-gray-600 font-medium">OPTIONAL</span>
                        </div>
                      </div>

                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <h4 className="font-medium text-blue-900 mb-2">💡 Time-Saving Tip</h4>
                        <p className="text-sm text-blue-800 mb-3">If you want to save time, download the ready-to-import Make.com automation template. This lets you skip manual setup and just connect your accounts.</p>
                        <a
                          href="/downloads/yt vid real estate vid gen.blueprint.json"
                          download="AI-Real-Estate-Video-Automation-Template.json"
                          onClick={() => analytics.leadMagnet.downloaded(slug)}
                          className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                        >
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          Download Make.com Template
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {/* Form Creation */}
                {(showAllSections || activeSection === 'form-creation') && (
                  <div className={showAllSections ? 'border-b border-gray-200 pb-8 mb-8' : ''}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6" id="form-creation">Step 1: Create Your Property Form</h2>
                    <div className="text-gray-700 leading-relaxed space-y-4">
                      
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <h4 className="font-medium text-gray-900 mb-3">📋 Form Setup Process:</h4>
                        <ol className="list-decimal pl-6 space-y-2 text-sm">
                          <li>Visit <a href="https://form.fillout.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">Form Fillout</a>, sign up for a free account</li>
                          <li>Click "Create New Form," choose "Blank Template"</li>
                          <li>Add the required fields (detailed below)</li>
                          <li>Save and preview your form to test it</li>
                        </ol>
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900">Required Form Fields</h3>
                      <p className="text-sm text-gray-600 mb-4">Add these exact fields to capture all necessary property information:</p>
                      
                      <div className="space-y-3">
                        <div className="border-l-4 border-blue-500 pl-4">
                          <h4 className="font-medium text-gray-900">"Property Address"</h4>
                          <p className="text-sm text-gray-600">Field Type: Text input</p>
                          <p className="text-sm text-gray-600">Required: Yes</p>
                        </div>
                        
                        <div className="border-l-4 border-green-500 pl-4">
                          <h4 className="font-medium text-gray-900">"Property Description"</h4>
                          <p className="text-sm text-gray-600">Field Type: Long text (textarea)</p>
                          <p className="text-sm text-gray-600">Required: Yes</p>
                          <p className="text-sm text-gray-600">Placeholder: "Describe the property features, location benefits, etc."</p>
                        </div>
                        
                        <div className="border-l-4 border-purple-500 pl-4">
                          <h4 className="font-medium text-gray-900">"Property Images"</h4>
                          <p className="text-sm text-gray-600">Field Type: File upload</p>
                          <p className="text-sm text-gray-600">Settings: Minimum 5 images, Maximum 10 images</p>
                          <p className="text-sm text-gray-600">File types: JPG, PNG only</p>
                          <p className="text-sm text-gray-600">Required: Yes</p>
                        </div>
                      </div>

                      <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                        <h4 className="font-medium text-green-900 mb-2">✅ Form Setup Complete</h4>
                        <p className="text-sm text-green-800">Once your form is created, save the form URL - you'll need it for the Make.com integration in the next step. Test the form by submitting sample data to ensure it works correctly.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Automation Setup */}
                {(showAllSections || activeSection === 'automation-setup') && (
                  <div className={showAllSections ? 'border-b border-gray-200 pb-8 mb-8' : ''}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6" id="automation-setup">Steps 2-6: Complete Automation Setup</h2>
                    <div className="text-gray-700 leading-relaxed space-y-6">
                      
                      {/* Step 2: Make.com Setup */}
                      <div className="border-l-4 border-indigo-500 pl-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Step 2: Set Up Automation (Make.com)</h3>
                        <ol className="list-decimal pl-6 space-y-2 text-sm">
                          <li>Visit <a href="https://make.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">Make.com</a>, create a free account</li>
                          <li>Click "Create Scenario," select the Form Fillout module and choose "Watch New Responses"</li>
                          <li>Connect Form Fillout by clicking "Add Connection" and logging in</li>
                          <li>Choose your form to monitor responses</li>
                          <li>Submit test data to confirm it triggers correctly</li>
                        </ol>
                      </div>

                      {/* Step 3: OpenAI Integration */}
                      <div className="border-l-4 border-green-500 pl-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Step 3: Image Analysis with OpenAI</h3>
                        <ol className="list-decimal pl-6 space-y-2 text-sm">
                          <li>In Make.com, click "+" and add "OpenAI" module</li>
                          <li>Choose "Analyze Images" and select "GPT-4.1 nano"</li>
                          <li>Enter the exact prompt from the template: 
                            <div className="bg-gray-50 p-3 rounded-lg mt-2 mb-2">
                              <code className="text-xs text-gray-800">"you are an expert image anylser for a real estate agent who will give you an image and you ill output what part of the property it is , and benefits of the property so that your output can be combined with he other image description to be used in an video voice over. don't focus on the voice over, just focus on the image whats in it and what part of the house it is."</code>
                            </div>
                          </li>
                          <li>Set Image Input Type as "URL"</li>
                          <li>Connect the URL from the iterator module to this input</li>
                        </ol>
                      </div>

                      {/* Step 3.5: Iterator Module Setup */}
                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 mb-4">
                        <h4 className="font-medium text-blue-900 mb-2">🔧 Technical Setup: Iterators & Aggregators</h4>
                        <p className="text-sm text-blue-800 mb-3">To handle multiple images, you'll need to add iterator and array aggregator modules:</p>
                        <ol className="list-decimal pl-6 space-y-2 text-sm text-blue-800">
                          <li><strong>Add Iterator:</strong> Search "iterator" in Make.com, select the file upload array from your form</li>
                          <li><strong>Add Array Aggregator:</strong> After Runway module, set source as Form Fillout, include OpenAI results and submission data</li>
                          <li><strong>Add Text Aggregator:</strong> Combines all OpenAI descriptions into one text block for the voiceover</li>
                          <li><strong>Add Final Iterator:</strong> Processes the aggregated array for video compilation</li>
                        </ol>
                        <p className="text-xs text-blue-700 mt-2"><em>Don't worry if this seems technical - just follow the template structure exactly!</em></p>
                      </div>

                      {/* Step 4: Runway Video Generation */}
                      <div className="border-l-4 border-purple-500 pl-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Step 4: Generate Cinematic Videos (Runway)</h3>
                        <ol className="list-decimal pl-6 space-y-2 text-sm">
                          <li>Visit <a href="https://runway.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">Runway</a>, create an account, and purchase $5 in credits</li>
                          <li>Back in Make.com, add the Runway module</li>
                          <li>Choose "Generate Video from Images," select "Gen-3 Alpha Turbo"</li>
                          <li>Select method as "URLs" and input image URLs from your form</li>
                          <li>For watermark, select "No"</li>
                          <li>Enter the exact prompt from the template:
                            <div className="bg-gray-50 p-3 rounded-lg mt-2 mb-2">
                              <code className="text-xs text-gray-800">"Smooth slow cinematic stable camera movement showcasing this beautiful property. Start wide, slowly push in to highlight key architectural details and design features, then gently pull back to reveal the full space. Professional real estate cinematography style with subtle motion that emphasizes the property's appeal and quality. 5 second duration, elegant and sophisticated movement."</code>
                            </div>
                          </li>
                          <li>Set duration: "5 seconds" and ratio: "1280 x 768" (YouTube landscape style)</li>
                        </ol>
                      </div>

                      {/* Step 5: Voiceover Creation */}
                      <div className="border-l-4 border-red-500 pl-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Step 5: Create Voiceover (Gemini AI & ElevenLabs)</h3>
                        
                        <h4 className="font-medium text-gray-900 mb-2">Gemini AI Script Generation (47-50 seconds):</h4>
                        <ol className="list-decimal pl-6 space-y-1 text-sm mb-4">
                          <li>Add Gemini AI module: Select "Gemini 2.5 Pro"</li>
                          <li>Enter the exact prompt from the template:
                            <div className="bg-gray-50 p-3 rounded-lg mt-2 mb-2">
                              <code className="text-xs text-gray-800">"You are a video voiceover generator. You will be given 10 images and a description of them images. You will create a voiceover for real estate agents on the 10 property images and the descriptions of them images. Most remember each image that is given to you will be converted into a five second clip. So when talking about that property or when talking about that specific image, then make sure it's about five seconds long worth of text. I want you to practically combine all images so that when you are outputting the actual voiceover, it flows smoothly from image to image. You must just output the voiceover with nothing else, just the voiceover text. We don't need you to output scenes or what needs to happen, just output the voiceover text.

IMPORTANT: Format your response as clean, continuous text suitable for text-to-speech. Output as a single paragraph with no line breaks, no special characters, no quotes, no backslashes, and no unusual formatting. Use only standard punctuation like periods, commas, exclamation marks, and question marks. Make it TTS-ready plain text only.

Here are the images and image descriptions in sequence: [Text Aggregator Output]

Make sure the length of the text matches 47-50 seconds. Make sure not to overspeak and talk about each image as they arrive with smart flow so we can naturally transition."</code>
                            </div>
                          </li>
                          <li>Connect the Text Aggregator output to provide image descriptions</li>
                        </ol>
                        
                        <h4 className="font-medium text-gray-900 mb-2">ElevenLabs Voice Synthesis:</h4>
                        <ol className="list-decimal pl-6 space-y-1 text-sm">
                          <li>Visit <a href="https://elevenlabs.io" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">ElevenLabs</a>, sign up for free, copy API key from "My Workspace" → "API Keys"</li>
                          <li>In Make.com, add ElevenLabs module</li>
                          <li>Choose a voice (example uses "Guy Man" for Irish accent, or select your preferred voice)</li>
                          <li>Use model "Flash 2.5" for faster processing</li>
                          <li>Paste your API key and connect the Gemini text output</li>
                        </ol>

                        <h4 className="font-medium text-gray-900 mb-2 mt-4">Google Drive Upload (Required for JSON2Video):</h4>
                        <ol className="list-decimal pl-6 space-y-1 text-sm">
                          <li>Add Google Drive "Upload a File" module</li>
                          <li>Connect the ElevenLabs audio output as the file</li>
                          <li>Select a folder ID from your Google Drive</li>
                          <li>Add another Google Drive "Get a Share Link" module</li>
                          <li>Set permissions to "Anyone" so JSON2Video can access the audio</li>
                          <li>Connect the File ID from the upload module</li>
                        </ol>
                      </div>

                      {/* Step 6: Video Compilation */}
                      <div className="border-l-4 border-yellow-500 pl-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Step 6: Combine Video and Audio (JSON2Video)</h3>
                        <ol className="list-decimal pl-6 space-y-2 text-sm">
                          <li>Visit <a href="https://json2video.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">JSON2Video</a>, sign up for free (they'll email you an API key)</li>
                          <li>In Make.com, add JSON2Video module</li>
                          <li>Choose "Create a List of Videos with Background Audio"</li>
                          <li>Set number of video items to 10 (or however many images you're processing)</li>
                          <li>For each video URL slot (1-10), connect the generated video array from Runway:
                            <ul className="list-disc pl-6 mt-2 space-y-1">
                              <li>Item 1: Generated Videos[1]</li>
                              <li>Item 2: Generated Videos[2]</li>
                              <li>Continue for all 10 items...</li>
                            </ul>
                          </li>
                          <li>For background audio, use the Google Drive share link from Step 5</li>
                          <li>Set volume to "medium" and fade-out to "no fade out"</li>
                        </ol>
                        
                        <div className="bg-yellow-50 rounded-lg p-3 mt-4 border border-yellow-200">
                          <h5 className="font-medium text-yellow-900 mb-2">📋 Final Result:</h5>
                          <p className="text-sm text-yellow-800">Your automation will create a complete cinematic property video with professional voiceover in about 3-5 minutes. Check your JSON2Video "Render Logs" to view and download the finished video!</p>
                        </div>
                      </div>

                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <h4 className="font-medium text-blue-900 mb-2">💡 Optional: Import Pre-made Template</h4>
                        <p className="text-sm text-blue-800 mb-3">If you prefer not to set up the entire automation manually, you can import our pre-built scenario:</p>
                        <ol className="list-decimal pl-6 space-y-1 text-sm text-blue-800 mb-4">
                          <li>Download the Make.com automation template using the button below</li>
                          <li>Log into Make.com, navigate to your scenarios</li>
                          <li>Click "Import Scenario" and upload the template file</li>
                          <li>Connect your accounts using your API keys</li>
                          <li>Ensure all connections are correctly linked</li>
                        </ol>
                        <a
                          href="/downloads/yt vid real estate vid gen.blueprint.json"
                          download="AI-Real-Estate-Video-Automation-Template.json"
                          onClick={() => analytics.leadMagnet.downloaded(slug)}
                          className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                        >
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          Download Make.com Template
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {/* Testing & Deployment */}
                {(showAllSections || activeSection === 'testing') && (
                  <div className={showAllSections ? '' : ''}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6" id="testing">Step 7: Testing & Deployment</h2>
                    <div className="text-gray-700 leading-relaxed space-y-4">
                      
                      <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                        <h4 className="font-medium text-green-900 mb-2">🧪 Final Testing Process</h4>
                        <ol className="list-decimal pl-6 space-y-2 text-sm text-green-800">
                          <li><strong>Submit another form response</strong> to fully test the complete automation</li>
                          <li><strong>Monitor each step</strong> in Make.com to ensure data flows correctly</li>
                          <li><strong>Check video quality</strong> from Runway AI generation</li>
                          <li><strong>Verify voiceover clarity</strong> from ElevenLabs</li>
                          <li><strong>Confirm final video</strong> compilation from JSON2Video</li>
                          <li><strong>Test multiple properties</strong> to ensure consistency</li>
                        </ol>
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900">Live Example</h3>
                      <p>Want to see this automation in action? Check out our demo video created for a property in Austin, TX:</p>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-2">📍 Property Demo</h4>
                          <p className="text-sm text-gray-600 mb-2">5013 Rob Scott St, Austin, TX</p>
                          <a 
                            href="https://www.zillow.com/homedetails/5013-Rob-Scott-St-Austin-TX-78723/29501234_zpid/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 text-sm"
                          >
                            View Original Listing →
                          </a>
                        </div>
                        
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-2">🎬 AI Generated Video</h4>
                          <p className="text-sm text-gray-600 mb-2">Created in under 3 minutes</p>
                          <Link 
                            href="https://drive.google.com/file/d/1RVaGPQN--NreW-mbSyBODJhn6Y8CnE96/view?usp=drivesdk" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 text-sm"
                          >
                            Watch Demo Video →
                          </Link>
                        </div>
                      </div>

                      <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                        <h4 className="font-medium text-purple-900 mb-2">🚀 You're Ready to Scale!</h4>
                        <p className="text-sm text-purple-800 mb-3">Once confirmed, your setup is complete! You now have:</p>
                        <ul className="list-disc pl-6 space-y-1 text-sm text-purple-800">
                          <li>A professional property video automation system</li>
                          <li>The ability to create cinematic videos in under 3 minutes</li>
                          <li>A reusable workflow for unlimited properties</li>
                          <li>Professional marketing materials on autopilot</li>
                        </ul>
                      </div>

                      {/* Navigation Bar */}
                      <div className="mt-12 border-t border-gray-200 pt-8">
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                          {/* Back to Blog */}
                          <Link 
                            href="/lead-magnet"
                            className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors group"
                          >
                            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm font-medium">Back to Blog</span>
                          </Link>

                          {/* Lumenosis AI Link */}
                          <Link 
                            href="/"
                            className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors group"
                          >
                            <span className="text-sm font-medium">Visit Lumenosis AI</span>
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </Link>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-6 text-center mt-8">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Need Help or Have Questions?</h3>
                        <p className="text-gray-600 mb-4">Get personalized assistance setting up your automation and strategies for real estate growth:</p>
                        <Link
                          href="https://calendly.com/lumenosis/30min" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          onClick={() => analytics.leadMagnet.consultationClicked('bottom')}
                          className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                        >
                          Schedule Free Consultation
                          <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </Link>
                      </div>

                      <p className="text-sm text-gray-500 mt-4">
                        This is the same method we use to help agents nationwide rapidly scale their listing marketing. Real estate agents just need to upload their property images and description.
                      </p>
                    </div>
                  </div>
                )}

              </article>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default case for Real Estate Automation (real-estate-automation slug)
  if (slug === 'real-estate-automation') {
    const sections = [
      { id: 'overview', title: 'Overview' },
      { id: 'prerequisites', title: 'Prerequisites' },
      { id: 'batchdata-setup', title: 'BatchData Setup' },
      { id: 'n8n-setup', title: 'N8N Configuration' },
      { id: 'workflow-import', title: 'Workflow Import' },
      { id: 'testing', title: 'Testing & Validation' },
      { id: 'troubleshooting', title: 'Troubleshooting' }
    ];

    return (
    <div className="min-h-screen bg-white">
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "Real Estate Lead Automation with BatchData & N8N",
            "description": "Complete step-by-step guide to automate real estate lead generation with BatchData & N8N. Download the exact workflow that delivers investor-ready leads straight to your inbox.",
            "image": "https://lumenosis.com/logo.png",
            "author": {
              "@type": "Organization",
              "name": "Lumenosis AI",
              "url": "https://lumenosis.com"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Lumenosis AI",
              "logo": {
                "@type": "ImageObject",
                "url": "https://lumenosis.com/logo.png"
              }
            },
            "datePublished": "2024-12-01",
            "dateModified": "2024-12-01",
            "totalTime": "PT45M",
            "estimatedCost": {
              "@type": "MonetaryAmount",
              "currency": "USD",
              "value": "324"
            },
            "tool": [
              {
                "@type": "HowToTool",
                "name": "N8N Automation Platform"
              },
              {
                "@type": "HowToTool", 
                "name": "BatchData API"
              },
              {
                "@type": "HowToTool",
                "name": "CRM System"
              }
            ],
            "step": [
              {
                "@type": "HowToStep",
                "name": "Overview",
                "text": "Understand the automation workflow system"
              },
              {
                "@type": "HowToStep", 
                "name": "Prerequisites",
                "text": "Set up required accounts and services"
              },
              {
                "@type": "HowToStep",
                "name": "BatchData Setup", 
                "text": "Configure BatchData API integration"
              },
              {
                "@type": "HowToStep",
                "name": "N8N Configuration",
                "text": "Install and configure N8N automation platform"
              },
              {
                "@type": "HowToStep",
                "name": "Workflow Import",
                "text": "Import and configure the complete automation workflow"
              },
              {
                "@type": "HowToStep",
                "name": "Testing & Validation", 
                "text": "Test all components of your automation"
              },
              {
                "@type": "HowToStep",
                "name": "Troubleshooting",
                "text": "Common issues and solutions"
              }
            ]
          })
        }}
      />
      
            {/* Header */}
            <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-100">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 sm:space-x-4">
                    <Link href="/lead-magnet" className="flex items-center space-x-1 sm:space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm hidden xs:inline">Back to Blog</span>
                      <span className="text-sm xs:hidden">Back</span>
                    </Link>
                    <div className="hidden sm:block w-px h-6 bg-gray-300"></div>
                    <Link href="/" className="flex items-center space-x-1 sm:space-x-2">
                      <Image src="/logo.png" alt="Lumenosis AI" width={24} height={24} className="h-6 w-6 sm:h-8 sm:w-8" />
                      <span className="text-base sm:text-lg font-bold text-gray-900 hidden xs:inline">Lumenosis AI</span>
                    </Link>
                  </div>
                  <Link
                    href="https://calendly.com/lumenosis/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => analytics.leadMagnet.consultationClicked('header')}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-2 sm:px-4 rounded-lg transition-colors text-xs sm:text-sm"
                  >
                    <span className="hidden sm:inline">Schedule Free Setup Call</span>
                    <span className="sm:hidden">Free Call</span>
                  </Link>
                </div>
              </div>
            </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Workflow Info */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 mb-6">
                <h1 className="text-lg font-bold text-gray-900 mb-2">Real Estate Lead Automation</h1>
                <p className="text-sm text-gray-600 mb-4">BatchData + N8N + CRM Integration</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Difficulty:</span>
                    <span className="font-medium text-indigo-600">Intermediate</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Setup Time:</span>
                    <span className="font-medium text-gray-900">30-45 minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Read Time:</span>
                    <span className="font-medium text-gray-900">15 min read</span>
                  </div>
                </div>

                {/* Download & Copy Buttons */}
                <div className="mt-4 space-y-2">
                  <button
                    onClick={() => handleDownload('RealEstateLeadGenAutomation.json')}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Download JSON Workflow
                  </button>
                  
                  <button
                    onClick={() => handleCopyWorkflow()}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy JSON to Clipboard
                  </button>
                </div>

                <p className="text-xs text-gray-500 mt-2 text-center">
                  No email required • Import directly to N8N
                </p>
              </div>

              {/* Table of Contents */}
              <nav className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">Table of Contents</h3>
                  <button
                    onClick={() => {
                      const newValue = !showAllSections;
                      setShowAllSections(newValue);
                      analytics.leadMagnet.toggleShowAll(slug, newValue);
                    }}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-md transition-colors"
                    title={showAllSections ? 'Switch to sectioned view' : 'Show all sections at once'}
                  >
                    {showAllSections ? 'Sections' : 'Show All'}
                  </button>
                </div>
                {showAllSections && (
                  <p className="text-xs text-gray-500 mb-3">
                    📄 All sections visible • Click items to scroll
                  </p>
                )}
                {!showAllSections && (
                  <p className="text-xs text-gray-500 mb-3">
                    📑 Section mode • Click items to navigate
                  </p>
                )}
                <ul className="space-y-1">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <button
                        onClick={() => {
                          if (showAllSections) {
                            // Scroll to section when showing all
                            document.getElementById(section.id)?.scrollIntoView({ 
                              behavior: 'smooth',
                              block: 'start'
                            });
                          } else {
                            // Change active section when in sectioned mode
                            setActiveSection(section.id);
                          }
                          // Track section navigation
                          analytics.leadMagnet.sectionViewed(slug, section.id);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          !showAllSections && activeSection === section.id
                            ? 'bg-indigo-100 text-indigo-700 font-medium'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        {section.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <article className="prose prose-lg max-w-none">
              {/* Header */}
              <div className="not-prose mb-8">
                <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
                  <span>Last updated: December 2024</span>
                  <span>•</span>
                  <span>15 min read</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Real Estate Lead Automation with BatchData & N8N
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Automate your real estate lead generation with this comprehensive workflow that scans the market daily, 
                  filters high-equity properties, skip-traces contact information, and delivers qualified leads directly to your CRM.
                </p>

                {/* Tools */}
                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Tools & Integrations:</h3>
                  <div className="flex flex-wrap gap-2">
                    {['N8N', 'BatchData API', 'HubSpot/CRM', 'Slack', 'Email'].map((tool, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Content Sections */}
              {(showAllSections || activeSection === 'overview') && (
                <div className={showAllSections ? 'border-b border-gray-200 pb-8 mb-8' : ''}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6" id="overview">Overview</h2>
                  <div className="text-gray-700 leading-relaxed space-y-4">
                    <p>This automation workflow transforms how real estate professionals generate and manage leads. Instead of manual property research and lead tracking, this system:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Scans the market automatically using BatchData's comprehensive property database</li>
                      <li>Filters for high-potential opportunities with customizable criteria (equity %, absentee owners, etc.)</li>
                      <li>Skip-traces owner contact information automatically for qualified properties</li>
                      <li>Delivers leads instantly via email, Slack, and CRM integration</li>
                      <li>Generates detailed reports with property and owner information</li>
                    </ul>
                    <p>The workflow consists of two main branches:</p>
                    <ol className="list-decimal pl-6 space-y-2">
                      <li><strong>Market Scanning:</strong> Runs every 6 hours to monitor new properties and changes</li>
                      <li><strong>Bulk Lead Generation:</strong> On-demand searches for immediate lead generation</li>
                    </ol>
                    <p>This system typically generates 10-25 qualified leads daily, saving 15+ hours of manual research per week.</p>
                  </div>
                </div>
              )}

              {(showAllSections || activeSection === 'prerequisites') && (
                <div className={showAllSections ? 'border-b border-gray-200 pb-8 mb-8' : ''}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6" id="prerequisites">Prerequisites & Setup Requirements</h2>
                  <div className="text-gray-700 leading-relaxed space-y-4">
                    <p>Don't worry if you're new to automation! This guide will walk you through everything step-by-step. Here's what you'll need to get started:</p>
                    
                    <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                      <h4 className="font-medium text-yellow-900 mb-2">🚀 Total Monthly Cost Breakdown:</h4>
                      <ul className="list-disc pl-6 space-y-1 text-sm text-yellow-800">
                        <li><strong>N8N Starter Plan:</strong> $25/month (free 14-day trial)</li>
                        <li><strong>BatchData Professional:</strong> $299/month (2,000 API calls)</li>
                        <li><strong>Total:</strong> ~$324/month to generate 10-25 qualified leads daily</li>
                      </ul>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900">Required Accounts & Services</h3>
                    <div className="space-y-4">
                      <div className="border-l-4 border-indigo-500 pl-4">
                        <h4 className="font-medium text-gray-900">
                          1. <a href="https://batchdata.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-700 underline">BatchData Account</a> (Essential)
                        </h4>
                        <p className="text-sm text-gray-600">Provides property data and skip-tracing services</p>
                        <p className="text-sm"><strong>Cost:</strong> $299/month Professional plan (2,000 API calls)</p>
                        <a href="https://batchdata.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-700 mt-1">
                          Sign up at batchdata.com →
                        </a>
                      </div>
                      
                      <div className="border-l-4 border-purple-500 pl-4">
                        <h4 className="font-medium text-gray-900">
                          2. <a href="https://n8n.cloud" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700 underline">N8N Account</a> (Essential)
                        </h4>
                        <p className="text-sm text-gray-600">Automation platform that connects everything together</p>
                        <p className="text-sm"><strong>Cost:</strong> $25/month Starter plan (free 14-day trial)</p>
                        <a href="https://n8n.cloud" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm text-purple-600 hover:text-purple-700 mt-1">
                          Start free trial at n8n.cloud →
                        </a>
                      </div>
                      
                      <div className="border-l-4 border-green-500 pl-4">
                        <h4 className="font-medium text-gray-900">3. Email Service (Required)</h4>
                        <p className="text-sm text-gray-600">For sending lead notifications</p>
                        <p className="text-sm"><strong>Options:</strong> Gmail (free), Outlook (free), or <a href="https://sendgrid.com" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 underline">SendGrid</a> ($15/month)</p>
                      </div>
                      
                      <div className="border-l-4 border-blue-500 pl-4">
                        <h4 className="font-medium text-gray-900">
                          4. CRM System (Recommended)
                        </h4>
                        <p className="text-sm text-gray-600">To organize and track your leads</p>
                        <p className="text-sm">
                          <strong>Options:</strong> <a href="https://hubspot.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 underline">HubSpot</a> (free tier), 
                          <a href="https://salesforce.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 underline ml-1">Salesforce</a>, or any CRM with API
                        </p>
                      </div>
                      
                      <div className="border-l-4 border-gray-500 pl-4">
                        <h4 className="font-medium text-gray-900">
                          5. <a href="https://slack.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-700 underline">Slack Workspace</a> (Optional)
                        </h4>
                        <p className="text-sm text-gray-600">For team notifications</p>
                        <p className="text-sm"><strong>Cost:</strong> Free for basic use</p>
                        <a href="https://slack.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-700 mt-1">
                          Create workspace at slack.com →
                        </a>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900">What You'll Achieve</h3>
                    <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                      <ul className="list-disc pl-6 space-y-2 text-green-800">
                        <li><strong>10-25 qualified leads daily</strong> with complete contact information</li>
                        <li><strong>60-80% skip-trace success rate</strong> for finding owner contact details</li>
                        <li><strong>Save 15+ hours weekly</strong> on manual research and data entry</li>
                        <li><strong>3-5x faster lead response</strong> compared to manual processes</li>
                        <li><strong>24/7 automated operation</strong> - works while you sleep</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {(showAllSections || activeSection === 'batchdata-setup') && (
                <div className={showAllSections ? 'border-b border-gray-200 pb-8 mb-8' : ''}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6" id="batchdata-setup">BatchData API Configuration</h2>
                  <div className="text-gray-700 leading-relaxed space-y-4">
                    <p>BatchData is your data source - it provides all the property information and owner contact details. Think of it as your "intelligence database" that knows everything about every property in your target market.</p>
                    
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <h4 className="font-medium text-blue-900 mb-2">💰 What You Get for $299/month:</h4>
                      <ul className="list-disc pl-6 space-y-1 text-sm text-blue-800">
                        <li><strong>2,000 API calls</strong> = ~60-100 qualified leads daily</li>
                        <li><strong>Property data:</strong> Market value, equity, ownership history</li>
                        <li><strong>Skip tracing:</strong> Owner phone numbers, emails, addresses</li>
                        <li><strong>Real-time updates:</strong> New properties and market changes</li>
                      </ul>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900">Step 1: Create Your BatchData Account</h3>
                    <ol className="list-decimal pl-6 space-y-3">
                      <li>
                        <strong>Visit <a href="https://batchdata.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-700 underline">batchdata.com</a></strong> and click "Get Started" or "Sign Up"
                        <p className="text-sm text-gray-600 mt-1">You'll see their homepage with pricing plans</p>
                      </li>
                      <li>
                        <strong>Choose the Professional Plan</strong> ($299/month, 2,000 API calls)
                        <p className="text-sm text-gray-600 mt-1">This gives you enough API calls for serious lead generation</p>
                      </li>
                      <li>
                        <strong>Fill out the signup form</strong> with your business information
                        <p className="text-sm text-gray-600 mt-1">They'll ask for company name, contact info, and intended use</p>
                      </li>
                      <li>
                        <strong>Complete verification and billing setup</strong>
                        <p className="text-sm text-gray-600 mt-1">Most accounts are approved within 24 hours</p>
                      </li>
                      <li>
                        <strong>Access your account dashboard</strong>
                        <p className="text-sm text-gray-600 mt-1">You'll receive login credentials via email once approved</p>
                      </li>
                    </ol>
                    
                    <h3 className="text-lg font-semibold text-gray-900">Step 2: Generate Your API Key</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-700 mb-3">Your API key is like a "password" that allows N8N to access BatchData on your behalf.</p>
                      <ol className="list-decimal pl-6 space-y-2">
                        <li><strong>Log into your BatchData dashboard</strong></li>
                        <li><strong>Look for "API" or "Integrations"</strong> in the main menu</li>
                        <li><strong>Click "Create New API Key"</strong> or "Generate API Key"</li>
                        <li><strong>Name it:</strong> "N8N Real Estate Automation" (so you remember what it's for)</li>
                        <li><strong>Copy the API key</strong> and save it somewhere safe (you'll paste this into N8N later)</li>
                      </ol>
                    </div>
                    
                    <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                      <h4 className="font-medium text-red-900 mb-2">⚠️ Important Security Note:</h4>
                      <p className="text-sm text-red-800">Treat your API key like a password - don't share it publicly or save it in unsecured documents. If you lose it, you can always generate a new one in your BatchData dashboard.</p>
                    </div>
                  </div>
                </div>
              )}

              {(showAllSections || activeSection === 'n8n-setup') && (
                <div className={showAllSections ? 'border-b border-gray-200 pb-8 mb-8' : ''}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6" id="n8n-setup">N8N Installation & Configuration</h2>
                  <div className="text-gray-700 leading-relaxed space-y-4">
                    <p>N8N is the automation platform that connects all your tools together. Think of it as the "brain" that controls your entire lead generation system.</p>
                    
                    <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                      <h4 className="font-medium text-green-900 mb-2">💡 Good News for Beginners!</h4>
                      <p className="text-sm text-green-800">N8N offers a <strong>free 14-day trial</strong> - no credit card required. This gives you plenty of time to set up and test everything before committing to a paid plan.</p>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900">Step 1: Create Your N8N Account</h3>
                    <ol className="list-decimal pl-6 space-y-2">
                      <li><strong>Visit <a href="https://n8n.cloud" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700 underline">n8n.cloud</a></strong> and click "Get Started Free"</li>
                      <li><strong>Sign up</strong> with your email (no credit card needed for trial)</li>
                      <li><strong>Choose the Starter Plan</strong> ($25/month after trial) - perfect for this workflow</li>
                      <li><strong>Complete your profile</strong> and verify your email</li>
                      <li><strong>Access the workflow editor</strong> - you'll see a clean visual interface</li>
                    </ol>

                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <h4 className="font-medium text-blue-900 mb-2">Why the Starter Plan is Perfect:</h4>
                      <ul className="list-disc pl-6 space-y-1 text-sm text-blue-800">
                        <li>5 active workflows (you only need 1 for this setup)</li>
                        <li>2,500 workflow executions per month</li>
                        <li>All integrations included (BatchData, CRM, Email, etc.)</li>
                        <li>Community support</li>
                      </ul>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900">Step 2: Configure Your API Credentials</h3>
                    <p>Before importing the workflow, you need to set up your API connections. Don't worry - we'll walk through each one:</p>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">1. BatchData API Credentials</h4>
                      <ul className="list-disc pl-6 space-y-1 text-sm">
                        <li>Go to Credentials → Add Credential</li>
                        <li>Choose "HTTP Header Auth"</li>
                        <li>Name: "BatchData API"</li>
                        <li>Header Name: "Authorization"</li>
                        <li>Header Value: "Bearer YOUR_BATCHDATA_API_KEY"</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {(showAllSections || activeSection === 'workflow-import') && (
                <div className={showAllSections ? 'border-b border-gray-200 pb-8 mb-8' : ''}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6" id="workflow-import">Workflow Import & Configuration</h2>
                  <div className="text-gray-700 leading-relaxed space-y-4">
                    <p>Now let's import and configure the complete automation workflow.</p>
                    <h3 className="text-lg font-semibold text-gray-900">Step 1: Import into N8N</h3>
                    <ol className="list-decimal pl-6 space-y-2">
                      <li>In N8N, click "Import from File"</li>
                      <li>Select the RealEstateAutomation.json file</li>
                      <li>Click "Import"</li>
                      <li>You'll see the complete workflow with 25+ nodes</li>
                    </ol>
                    <h3 className="text-lg font-semibold text-gray-900">Step 2: Configure Search Parameters</h3>
                    <p>Edit the "BatchData API Configuration" node with your target market criteria:</p>
                    <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
                      <div>city: "Austin"</div>
                      <div>state: "TX"</div>
                      <div>minimumMarketValue: 250000</div>
                      <div>maximumMarketValue: 600000</div>
                      <div>minimumEquity: 30</div>
                      <div>propertyType: ["SFR"]</div>
                      <div>limit: 100</div>
                    </div>
                  </div>
                </div>
              )}

              {(showAllSections || activeSection === 'testing') && (
                <div className={showAllSections ? 'border-b border-gray-200 pb-8 mb-8' : ''}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6" id="testing">Testing & Validation</h2>
                  <div className="text-gray-700 leading-relaxed space-y-4">
                    <p>Before going live, thoroughly test all components of your automation.</p>
                    <h3 className="text-lg font-semibold text-gray-900">Step 1: Test Individual Nodes</h3>
                    <div className="space-y-3">
                      <div className="bg-blue-50 rounded-lg p-4">
                        <h4 className="font-medium text-blue-900 mb-2">Test BatchData Connection</h4>
                        <ol className="list-decimal pl-6 space-y-1 text-sm text-blue-800">
                          <li>Click on "BatchData API Configuration" node</li>
                          <li>Click "Execute Node"</li>
                          <li>Verify you receive property data in the output</li>
                        </ol>
                      </div>
                      <div className="bg-green-50 rounded-lg p-4">
                        <h4 className="font-medium text-green-900 mb-2">Test Email Notifications</h4>
                        <ol className="list-decimal pl-6 space-y-1 text-sm text-green-800">
                          <li>Click on "Send Email Alert" node</li>
                          <li>Execute with sample property data</li>
                          <li>Check your inbox for formatted lead notification</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {(showAllSections || activeSection === 'troubleshooting') && (
                <div className={showAllSections ? '' : ''}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6" id="troubleshooting">Troubleshooting & Support</h2>
                  <div className="text-gray-700 leading-relaxed space-y-4">
                    <p>Common issues and solutions to keep your automation running smoothly.</p>
                    <h3 className="text-lg font-semibold text-gray-900">API Authentication Issues</h3>
                    <div className="bg-red-50 rounded-lg p-4">
                      <h4 className="font-medium text-red-900 mb-2">Error: "401 Unauthorized" or "403 Forbidden"</h4>
                      <ul className="list-disc pl-6 space-y-1 text-sm text-red-800">
                        <li>Verify your BatchData API key is correctly entered</li>
                        <li>Check that your BatchData subscription is active</li>
                        <li>Ensure you haven't exceeded your API call limits</li>
                        <li>Confirm authorization header is "Bearer YOUR_API_KEY"</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </article>

            {/* Navigation Bar */}
            <div className="mt-12 border-t border-gray-200 pt-8">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                {/* Back to Blog */}
                <Link 
                  href="/lead-magnet"
                  className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors group"
                >
                  <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">Back to Blog</span>
                </Link>

                {/* Lumenosis AI Link */}
                <Link 
                  href="/"
                  className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors group"
                >
                  <span className="text-sm font-medium">Visit Lumenosis AI</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* STANDARD Need Personalized Help Section - FINAL VERSION */}
            <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-100">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-yellow-900" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.477.859h4z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Personalized Help?</h3>
                  <p className="text-gray-700 mb-4">
                    Running into issues or want to customize this automation? I'm happy to help you get this running perfectly.
                  </p>
                  <Link 
                    href="https://calendly.com/lumenosis/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => analytics.leadMagnet.consultationClicked('footer')}
                    className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    Schedule Free 30-Minute Setup Call
                    <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  }

  // Handle AI Hidden Real Estate Listings Guide
  if (slug === 'ai-hidden-real-estate-listings') {
    // Note: useState hooks are already defined at the top level of this component

    const sections = [
      { id: 'overview', title: 'Strategy Overview' },
      { id: 'manus-research', title: 'Deep Market Research with Manus' },
      { id: 'chatgpt-strategy', title: 'Building a Listing Action Plan' },
      { id: 'content-creation', title: 'Creating a Content & Ad Strategy' },
      { id: 'gamma-lead-magnet', title: 'Turning Research into Lead Magnets' },
      { id: 'implementation', title: 'Complete Implementation Guide' }
    ];

    return (
      <div className="min-h-screen bg-white">
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HowTo",
              "name": "AI Hidden Real Estate Listings Discovery Guide",
              "description": "Complete guide to using Manus AI and Gamma to uncover hidden listing opportunities in your local real estate market.",
              "image": "https://lumenosis.com/logo.png",
              "author": {
                "@type": "Organization",
                "name": "Lumenosis AI",
                "url": "https://lumenosis.com"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Lumenosis AI",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://lumenosis.com/logo.png"
                }
              },
              "datePublished": "2024-12-01",
              "dateModified": "2024-12-01",
              "totalTime": "PT30M",
              "estimatedCost": {
                "@type": "MonetaryAmount",
                "currency": "USD",
                "value": "0"
              },
              "tool": [
                {
                  "@type": "HowToTool",
                  "name": "Manus AI"
                },
                {
                  "@type": "HowToTool", 
                  "name": "ChatGPT"
                },
                {
                  "@type": "HowToTool",
                  "name": "Gamma"
                }
              ],
              "step": [
                {
                  "@type": "HowToStep",
                  "name": "Strategy Overview",
                  "text": "Understand the AI-powered approach to finding hidden listing opportunities"
                },
                {
                  "@type": "HowToStep", 
                  "name": "Manus AI Market Research",
                  "text": "Use Manus AI to analyze local market trends and identify underserved areas"
                },
                {
                  "@type": "HowToStep",
                  "name": "ChatGPT Action Plan", 
                  "text": "Create comprehensive lead generation strategies with ChatGPT"
                },
                {
                  "@type": "HowToStep",
                  "name": "Content Strategy",
                  "text": "Develop data-driven content for social media and marketing"
                },
                {
                  "@type": "HowToStep",
                  "name": "Gamma Lead Magnet Creation",
                  "text": "Create professional lead magnets with Gamma's AI design tools"
                },
                {
                  "@type": "HowToStep",
                  "name": "Implementation Guide", 
                  "text": "Execute the complete strategy to generate listings"
                }
              ]
            })
          }}
        />

        {/* Header */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 sm:space-x-4">
                <Link href="/lead-magnet" className="flex items-center space-x-1 sm:space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm hidden xs:inline">Back to Blog</span>
                  <span className="text-sm xs:hidden">Back</span>
                </Link>
                <div className="hidden sm:block w-px h-6 bg-gray-300"></div>
                <Link href="/" className="flex items-center space-x-1 sm:space-x-2">
                  <Image src="/logo.png" alt="Lumenosis AI" width={24} height={24} className="h-6 w-6 sm:h-8 sm:w-8" />
                  <span className="text-base sm:text-lg font-bold text-gray-900 hidden xs:inline">Lumenosis AI</span>
                </Link>
              </div>
              <Link 
                href="https://calendly.com/lumenosis/30min" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => analytics.leadMagnet.consultationClicked('header')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-2 sm:px-4 rounded-lg transition-colors text-xs sm:text-sm"
              >
                <span className="hidden sm:inline">Schedule Free Setup Call</span>
                <span className="sm:hidden">Free Call</span>
              </Link>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                {/* Workflow Info */}
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 mb-6">
                  <h1 className="text-lg font-bold text-gray-900 mb-2">AI Hidden Listings Discovery</h1>
                  <p className="text-sm text-gray-600 mb-4">Manus AI + ChatGPT + Gamma Lead Magnets</p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Difficulty:</span>
                      <span className="font-medium text-emerald-600">Beginner</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Setup Time:</span>
                      <span className="font-medium text-gray-900">15-30 minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Read Time:</span>
                      <span className="font-medium text-gray-900">12 min read</span>
                    </div>
                  </div>

                  {/* No Download Buttons - This is a Strategy Guide */}
                  <div className="mt-4 p-4 bg-white rounded-lg border border-emerald-200">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-600 mb-1">100% FREE</div>
                      <div className="text-sm text-gray-600">Strategy Guide</div>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Complete step-by-step guide • No downloads needed
                  </p>
                </div>

                {/* Table of Contents */}
                <nav className="bg-white rounded-xl border border-gray-200 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">Table of Contents</h3>
                    <button
                      onClick={() => {
                        const newValue = !showAllSections;
                        setShowAllSections(newValue);
                        analytics.leadMagnet.toggleShowAll(slug, newValue);
                      }}
                      className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-md transition-colors"
                      title={showAllSections ? 'Switch to section-by-section view' : 'Show all sections at once'}
                    >
                      {showAllSections ? 'Sections' : 'Show All'}
                    </button>
                  </div>
                  {showAllSections && (
                    <p className="text-xs text-gray-500 mb-3">
                      📄 All sections visible • Click items to scroll
                    </p>
                  )}
                  {!showAllSections && (
                    <p className="text-xs text-gray-500 mb-3">
                      📑 Section mode • Click items to navigate
                    </p>
                  )}
                  <ul className="space-y-1">
                    {sections.map((section) => (
                      <li key={section.id}>
                        <button
                          onClick={() => {
                            if (showAllSections) {
                              document.getElementById(section.id)?.scrollIntoView({ 
                                behavior: 'smooth',
                                block: 'start'
                              });
                            } else {
                              setActiveSection(section.id);
                            }
                            analytics.leadMagnet.sectionViewed(slug, section.id);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                            !showAllSections && activeSection === section.id
                              ? 'bg-emerald-100 text-emerald-700 font-medium'
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                          }`}
                        >
                          {section.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <article className="prose prose-lg max-w-none">
                {/* Header */}
                <div className="not-prose mb-8">
                  <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
                    <span>Last updated: December 2024</span>
                    <span>•</span>
                    <span>12 min read</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                    AI Hidden Real Estate Listings Discovery Guide
                  </h1>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Use artificial intelligence to identify hidden listing opportunities in your local market. This data-driven approach helps you find untapped neighborhoods and seller motivations that competitors are ignoring.
                  </p>

                      {/* Tools */}
                  <div className="mt-6">
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Tools & Platforms:</h3>
                    <div className="flex flex-wrap gap-2">
                      <a href="https://manus.im" target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-emerald-100 text-emerald-700 text-sm rounded-full hover:bg-emerald-200 transition-colors">
                        Manus
                      </a>
                      <a href="https://chat.openai.com" target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full hover:bg-blue-200 transition-colors">
                        ChatGPT
                      </a>
                      <a href="https://gamma.app" target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full hover:bg-purple-200 transition-colors">
                        Gamma
                      </a>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">Social Media</span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">Facebook Ads</span>
                    </div>
                  </div>
                </div>

                {/* Content Sections */}
                {(showAllSections || activeSection === 'overview') && (
                  <div className={showAllSections ? 'border-b border-gray-200 pb-8 mb-8' : ''}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6" id="overview">Strategy Overview</h2>
                    <div className="text-gray-700 leading-relaxed space-y-4">
                      <p>Learn how to use artificial intelligence to identify hidden listing opportunities based on your specific market. You'll discover the exact areas that are proven by data to help you generate the easiest listings that none of your competitors know about.</p>
                      
                      <div className="bg-purple-50 rounded-lg p-4 border border-purple-200 mb-4">
                        <h4 className="font-medium text-purple-900 mb-2">🚀 QUICK PROCESS OVERVIEW (5 Prompts Total):</h4>
                        <ol className="list-decimal pl-6 space-y-1 text-sm text-purple-800">
                          <li><strong>Prompt 1 → Manus:</strong> Market research (find hidden opportunities)</li>
                          <li><strong>Prompt 2 → Manus:</strong> Action plan (prospecting + marketing strategy)</li>
                          <li><strong>Prompt 3 → ChatGPT:</strong> Repeat Prompt 2 for cleaner output (DO NOT copy to Gamma)</li>
                          <li><strong>Prompt 4 → ChatGPT:</strong> Content outlines (DO NOT copy to Gamma)</li>
                          <li><strong>Prompt 5 → ChatGPT:</strong> Lead magnet text (✅ ONLY THIS goes to Gamma)</li>
                        </ol>
                        <p className="text-xs text-purple-700 mt-2 font-medium">Remember: ONLY the output from Prompt 5 gets pasted into Gamma (with the setup line)!</p>
                      </div>

                      <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
                        <h4 className="font-medium text-emerald-900 mb-2">🎯 What You'll Discover:</h4>
                        <ul className="list-disc pl-6 space-y-1 text-sm text-emerald-800">
                          <li><strong>Hidden Neighborhoods:</strong> 3-5 different areas with potential seller activity that other agents are ignoring</li>
                          <li><strong>Seller Profiles:</strong> Types of sellers most likely to list right now and their specific pain points</li>
                          <li><strong>Tactical Action Plan:</strong> Exact strategy for prospecting, social media, and Facebook ads</li>
                          <li><strong>Professional Lead Magnets:</strong> Turn all your data into lead generation materials</li>
                        </ul>
                      </div>

                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <h4 className="font-medium text-blue-900 mb-2">🔧 Three-Platform Strategy:</h4>
                        <ol className="list-decimal pl-6 space-y-2 text-sm text-blue-800">
                          <li><strong><a href="https://manus.im" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 underline">Manus</a>:</strong> Deep research that shows you live data from websites and articles it scrapes</li>
                          <li><strong><a href="https://chat.openai.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 underline">ChatGPT</a>:</strong> Turn research into actionable marketing strategies and content plans</li>
                          <li><strong><a href="https://gamma.app" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 underline">Gamma</a>:</strong> Create professional lead magnets in 60 seconds with AI design</li>
                        </ol>
                      </div>
                      
                      <p><strong>Best part:</strong> This entire strategy is completely free. While other agents scramble throwing spaghetti at the wall, you'll have a tactical plan based on real market data.</p>
                    </div>
                  </div>
                )}

                {(showAllSections || activeSection === 'manus-research') && (
                  <div className={showAllSections ? 'border-b border-gray-200 pb-8 mb-8' : ''}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6" id="manus-research">Deep Market Research with Manus</h2>
                    <div className="text-gray-700 leading-relaxed space-y-4">
                      <p>Manus is an AI research platform that not many agents are using, but it's unbelievable. It shows you live, in real-time, all the different websites and articles it scrapes to give you exact data from credible sources.</p>
                      
                      <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                        <h4 className="font-medium text-yellow-900 mb-2">🆓 Free to Get Started:</h4>
                        <p className="text-sm text-yellow-800">You can follow this entire tutorial for free. Manus provides a generous free tier that covers all the research you need for this strategy.</p>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900">Step 1: Set Up Your Manus Account</h3>
                      <ol className="list-decimal pl-6 space-y-2">
                        <li>Visit <a href="https://manus.im" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 underline">manus.im</a></li>
                        <li>Sign up for a free account (no credit card required)</li>
                        <li>Log in with your Google account for quick access</li>
                      </ol>

                      <h3 className="text-lg font-semibold text-gray-900">Step 2: First Prompt - Local Market Research</h3>
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <h4 className="font-medium text-gray-900 mb-2">📋 PROMPT 1 — MANUS (market research):</h4>
                        <div className="bg-white rounded p-3 text-sm font-mono border">
                          Act as a local market research strategist. I'm a Realtor in [CITY, STATE] looking to uncover hidden listing opportunities.<br /><br />

                          Analyze public market trends, inventory patterns, demographic behavior, and migration data.<br /><br />

                          Based on that, tell me:<br />
                          - 3–5 neighborhoods or micro-areas with potential seller activity that other agents may be ignoring<br />
                          - What types of sellers are most likely to list right now (upsizers, retirees, relocators, etc.)<br />
                          - Specific trends or pain points that might motivate them to sell<br /><br />

                          Write in plain English with clear takeaways I can use for prospecting, content, and local marketing.
                        </div>
                        <p className="text-xs text-gray-600 mt-2">💡 Replace [CITY, STATE] with your actual market (e.g., "Austin, Texas")</p>
                      </div>

                      <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200 mt-4">
                        <h4 className="font-medium text-yellow-900 mb-2">⏱️ Wait for Research to Complete (~10 minutes)</h4>
                        <p className="text-sm text-yellow-800">Manus will start researching and show you live all the different websites and articles it scrapes. You can see the exact sources in real-time. Download the PDF when complete.</p>
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900 mt-6">Step 3: Second Prompt - Listing Opportunity Action Plan</h3>
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <h4 className="font-medium text-gray-900 mb-2">📋 PROMPT 2 — MANUS (action plan) - Follow-up in same conversation:</h4>
                        <div className="bg-white rounded p-3 text-sm font-mono border">
                          Based on this analysis, create me a lead generation plan to attract listings from these opportunities that includes the following:<br /><br />

                          - Prospecting (where to prospect, scripts, objection handlers, etc.)<br />
                          - Social media content (Instagram Reels, TikTok and YouTube videos)<br />
                          - Facebook ad strategy
                        </div>
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900">Step 3: Analyze the Results</h3>
                      <p>Manus will spend about 10 minutes researching and provide:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Detailed Research:</strong> Real-time data from multiple credible sources</li>
                        <li><strong>Source Transparency:</strong> See exactly which articles and websites were analyzed</li>
                        <li><strong>Actionable Insights:</strong> Specific neighborhoods and seller types to target</li>
                        <li><strong>Downloadable PDF:</strong> Save the complete research for future reference</li>
                      </ul>

                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <h4 className="font-medium text-blue-900 mb-2">🔍 What Makes Manus Special:</h4>
                        <p className="text-sm text-blue-800">Unlike other AI tools, Manus shows you its research process in real-time. You can see it browsing articles, analyzing data sources, and compiling insights. This transparency ensures you're getting current, accurate market data.</p>
                      </div>
                    </div>
                  </div>
                )}

                {(showAllSections || activeSection === 'chatgpt-strategy') && (
                  <div className={showAllSections ? 'border-b border-gray-200 pb-8 mb-8' : ''}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6" id="chatgpt-strategy">Building Your Strategy with ChatGPT</h2>
                    <div className="text-gray-700 leading-relaxed space-y-4">
                      <p>After getting your market research from Manus, use ChatGPT to refine your strategies and create content plans. This section has THREE prompts - pay attention to which output gets used where!</p>
                      
                      <h3 className="text-lg font-semibold text-gray-900">Step 1: Upload Your Manus Research to ChatGPT</h3>
                      <ol className="list-decimal pl-6 space-y-2">
                        <li>Download both PDF reports from Manus (market research + action plan)</li>
                        <li>Go to <a href="https://chat.openai.com" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 underline">ChatGPT</a></li>
                        <li>Drag and drop BOTH PDF files into ChatGPT</li>
                        <li>These become ChatGPT's knowledge source for your next prompts</li>
                      </ol>

                      <h3 className="text-lg font-semibold text-gray-900 mt-6">Step 2: Run Prompt 3 - Simplified Action Plan</h3>
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <h4 className="font-medium text-gray-900 mb-2">📋 PROMPT 3 — CHATGPT (repeat Prompt 2 for cleaner output):</h4>
                        <div className="bg-white rounded p-3 text-sm font-mono border">
                          Based on this analysis, create me a lead generation plan to attract listings from these opportunities that includes the following:<br /><br />

                          - Prospecting (where to prospect, scripts, objection handlers, etc.)<br />
                          - Social media content (Instagram Reels, TikTok and YouTube videos)<br />
                          - Facebook ad strategy
                        </div>
                        <div className="bg-red-50 border border-red-200 rounded p-3 mt-2">
                          <p className="text-sm font-medium text-red-800">⚠️ DO NOT COPY THIS OUTPUT TO GAMMA! This is just for your reference.</p>
                        </div>
                      </div>

                      <p>This gives you a cleaner, more organized version of the Manus plan for easy implementation.</p>

                      <h3 className="text-lg font-semibold text-gray-900 mt-6">Step 3: Run Prompt 4 - Content Outlines</h3>
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <h4 className="font-medium text-gray-900 mb-2">📋 PROMPT 4 — CHATGPT (content outlines):</h4>
                        <div className="bg-white rounded p-3 text-sm font-mono border">
                          Provide me with all of the video titles and topics that I need to create, separated by short form (TikTok, Reels and Shorts) and long form (YouTube), and give me the outline for each video.
                        </div>
                        <div className="bg-red-50 border border-red-200 rounded p-3 mt-2">
                          <p className="text-sm font-medium text-red-800">⚠️ DO NOT COPY THIS OUTPUT TO GAMMA! This is your content creation guide.</p>
                        </div>
                      </div>

                      <p>This will give you:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Short-Form Content:</strong> Titles and outlines for TikTok, Reels, and Shorts</li>
                        <li><strong>Long-Form Content:</strong> YouTube video titles and detailed outlines</li>
                        <li><strong>Hook Ideas:</strong> Attention-grabbing openings for each video</li>
                        <li><strong>CTA Scripts:</strong> How to promote your lead magnet in each video</li>
                      </ul>

                      <h3 className="text-lg font-semibold text-gray-900 mt-6">Step 4: Run Prompt 5 - Lead Magnet Text (THIS IS THE ONLY ONE FOR GAMMA!)</h3>
                      <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                        <h4 className="font-medium text-green-900 mb-2">📋 PROMPT 5 — CHATGPT (lead magnet text):</h4>
                        <div className="bg-white rounded p-3 text-sm font-mono border">
                          Turn this data into a lead magnet that I can put into Gamma to design, which I will use in my CTAs on short form and long form content to turn viewers of my videos into leads.
                        </div>
                        <div className="bg-green-100 border border-green-300 rounded p-3 mt-2">
                          <p className="text-sm font-bold text-green-900">✅ THIS IS THE ONLY OUTPUT YOU COPY TO GAMMA!</p>
                          <p className="text-xs text-green-800 mt-1">Save this text - you'll paste it into Gamma in the next section.</p>
                        </div>
                      </div>

                      <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200 mt-4">
                        <h4 className="font-medium text-yellow-900 mb-2">🚨 IMPORTANT REMINDER:</h4>
                        <ul className="list-disc pl-6 space-y-1 text-sm text-yellow-800">
                          <li>Prompt 3 output = Your action plan reference (DO NOT copy to Gamma)</li>
                          <li>Prompt 4 output = Your content creation guide (DO NOT copy to Gamma)</li>
                          <li>Prompt 5 output = Your lead magnet text (ONLY THIS goes to Gamma)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {(showAllSections || activeSection === 'content-creation') && (
                  <div className={showAllSections ? 'border-b border-gray-200 pb-8 mb-8' : ''}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6" id="content-creation">Creating a Content and Ad Strategy with ChatGPT</h2>
                    <div className="text-gray-700 leading-relaxed space-y-4">
                      <p>Your content strategy will be built on actual market data, making it highly targeted and effective. Here's how to implement the content plan ChatGPT creates for you.</p>
                      
                      <h3 className="text-lg font-semibold text-gray-900">Short-Form Content Strategy</h3>
                      <p>Based on your market research, you'll get specific video topics like:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li><strong>"5 Neighborhoods to Watch in [Your City]"</strong> - Featuring your identified opportunities</li>
                        <li><strong>"Why [Specific Area] Homeowners Are Selling Now"</strong> - Addressing actual market trends</li>
                        <li><strong>"Home Values in [Target Neighborhood]: What's Really Happening"</strong></li>
                        <li><strong>"Should You Sell Before Interest Rates Change?"</strong> - Timed market concerns</li>
                      </ul>

                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <h4 className="font-medium text-blue-900 mb-2">📱 Platform Strategy:</h4>
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <h5 className="font-medium text-gray-900 mb-1">Instagram Reels:</h5>
                            <p className="text-blue-800">Quick market updates, neighborhood spotlights, selling tips</p>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900 mb-1">TikTok:</h5>
                            <p className="text-blue-800">Behind-the-scenes market analysis, quick tips, trending audio</p>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900 mb-1">YouTube Shorts:</h5>
                            <p className="text-blue-800">Market insights, seller success stories, Q&A content</p>
                          </div>
                        </div>
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900">Long-Form Content Strategy</h3>
                      <p>YouTube videos that will rank and generate seller leads:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li><strong>"Complete Guide to Selling Your Home in [Your City] 2025"</strong></li>
                        <li><strong>"[Target Neighborhood] Real Estate Market Analysis"</strong></li>
                        <li><strong>"How Much Is Your [City] Home Really Worth?"</strong></li>
                        <li><strong>"Selling After 10+ Years: [Your City] Tax Strategies"</strong></li>
                      </ul>

                      <h3 className="text-lg font-semibold text-gray-900">Facebook Ad Strategy</h3>
                      <p>Targeted campaigns based on your identified opportunities:</p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-2">🎯 Audience Targeting</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Homeowners in identified neighborhoods</li>
                            <li>• Specific age demographics (based on research)</li>
                            <li>• Interest targeting (retirement, job relocation, etc.)</li>
                            <li>• Income levels matching your market analysis</li>
                          </ul>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-2">📢 Ad Content</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Market update videos</li>
                            <li>• Home valuation offers</li>
                            <li>• Neighborhood-specific content</li>
                            <li>• Lead magnet promotions</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                        <h4 className="font-medium text-yellow-900 mb-2">⚡ Implementation Tip:</h4>
                        <p className="text-sm text-yellow-800">Start with the free organic content strategy first. Once you see engagement from your target neighborhoods, then invest in Facebook ads to scale what's already working.</p>
                      </div>
                    </div>
                  </div>
                )}

                {(showAllSections || activeSection === 'gamma-lead-magnet') && (
                  <div className={showAllSections ? 'border-b border-gray-200 pb-8 mb-8' : ''}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6" id="gamma-lead-magnet">Creating Your Lead Magnet with Gamma</h2>
                    <div className="text-gray-700 leading-relaxed space-y-4">
                      <p>Now you'll transform the Prompt 5 output from ChatGPT into a professional lead magnet using Gamma's AI design tools.</p>
                      
                      <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                        <h4 className="font-medium text-yellow-900 mb-2">⚠️ CRITICAL REMINDER:</h4>
                        <p className="text-sm text-yellow-800">You should ONLY be using the output from Prompt 5 (the lead magnet text) for this section. Do NOT use outputs from Prompts 3 or 4!</p>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900">Step 1: Set Up Gamma Account</h3>
                      <ol className="list-decimal pl-6 space-y-2">
                        <li>Visit <a href="https://gamma.app" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 underline">gamma.app</a></li>
                        <li>Sign up for a free account (generous free tier available)</li>
                        <li>Log in and familiarize yourself with the interface</li>
                      </ol>

                      <h3 className="text-lg font-semibold text-gray-900">Step 2: Prepare Your Content for Gamma</h3>
                      <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                        <h4 className="font-medium text-green-900 mb-2">📝 EXACTLY What to Paste into Gamma:</h4>
                        <ol className="list-decimal pl-6 space-y-2 text-sm text-green-800">
                          <li><strong>FIRST LINE (Gamma setup line):</strong><br />
                            <div className="bg-white rounded p-2 mt-1 text-gray-900 font-mono">
                              The goal of this lead magnet is to generate home seller leads in [CITY, STATE].
                            </div>
                            <p className="text-xs mt-1">Replace [CITY, STATE] with your actual market</p>
                          </li>
                          <li className="mt-3"><strong>THEN ADD (on the next line):</strong><br />
                            <p className="mt-1">The entire output from Prompt 5 in ChatGPT (your lead magnet text)</p>
                          </li>
                        </ol>
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900">Step 3: Create Your Lead Magnet in Gamma</h3>
                      <ol className="list-decimal pl-6 space-y-2">
                        <li>Click <strong>"Create new with AI"</strong> in Gamma</li>
                        <li>Select <strong>"Paste in text"</strong></li>
                        <li>In the text box, paste:
                          <ul className="list-disc pl-6 mt-2 text-sm">
                            <li>Your Gamma setup line (with your city/state filled in)</li>
                            <li>Your Prompt 5 output from ChatGPT</li>
                          </ul>
                        </li>
                        <li>Choose <strong>"Presentation"</strong> as your format</li>
                        <li>Set amount of text per card to <strong>"Detailed"</strong></li>
                        <li>Toggle ON <strong>"AI generated images"</strong> for professional visuals</li>
                        <li>Select a professional design theme (avoid overly colorful themes)</li>
                        <li>Click <strong>"Generate"</strong> and wait ~60 seconds</li>
                      </ol>

                      <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                        <h4 className="font-medium text-green-900 mb-2">🎨 Design Benefits:</h4>
                        <ul className="list-disc pl-6 space-y-1 text-sm text-green-800">
                          <li><strong>Professional Quality:</strong> Looks like a $1,000 custom design</li>
                          <li><strong>Market-Specific Images:</strong> AI generates relevant local imagery</li>
                          <li><strong>Brand Consistency:</strong> Upload your colors/logo for custom branding</li>
                          <li><strong>Multiple Formats:</strong> Download as PDF, PowerPoint, or web link</li>
                        </ul>
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900">Step 4: Lead Magnet Delivery</h3>
                      <p>Use your lead magnet in your content strategy:</p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-2">📱 Social Media CTAs</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• "Comment 'GUIDE' for my free market report"</li>
                            <li>• "DM me 'REPORT' for insider market data"</li>
                            <li>• "Link in bio for hidden listing opportunities"</li>
                          </ul>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-2">🤖 Automation Options</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• ManyChat for Instagram/Facebook automation</li>
                            <li>• Email sequences for nurturing</li>
                            <li>• Direct download links</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {(showAllSections || activeSection === 'implementation') && (
                  <div className={showAllSections ? '' : ''}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6" id="implementation">Complete Implementation Guide</h2>
                    <div className="text-gray-700 leading-relaxed space-y-4">
                      <p>Now you have everything needed to dominate your market with AI-powered insights. Here's your step-by-step execution plan.</p>
                      
                      <h3 className="text-lg font-semibold text-gray-900">Week 1: Research & Planning</h3>
                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <h4 className="font-medium text-blue-900 mb-2">🗓️ Day-by-Day Breakdown:</h4>
                        <ul className="list-disc pl-6 space-y-1 text-sm text-blue-800">
                          <li><strong>Day 1:</strong> Complete Manus AI market research (30 minutes)</li>
                          <li><strong>Day 2:</strong> Create ChatGPT action plan and content strategy</li>
                          <li><strong>Day 3:</strong> Design lead magnet with Gamma</li>
                          <li><strong>Day 4:</strong> Set up content calendar and posting schedule</li>
                          <li><strong>Day 5:</strong> Create first week of content using your outlines</li>
                        </ul>
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900">Week 2-4: Content Execution</h3>
                      <p>Start publishing your data-driven content consistently:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Daily Short-Form:</strong> 1 Instagram Reel or TikTok video</li>
                        <li><strong>Weekly Long-Form:</strong> 1 YouTube video following your outlines</li>
                        <li><strong>Lead Magnet Promotion:</strong> Include CTAs in every piece of content</li>
                        <li><strong>Engagement Tracking:</strong> Monitor which neighborhoods respond most</li>
                      </ul>

                      <h3 className="text-lg font-semibold text-gray-900">Month 2+: Scale What Works</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-2">📈 Double Down On:</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Neighborhoods showing highest engagement</li>
                            <li>• Content topics generating most leads</li>
                            <li>• Platforms driving best results</li>
                            <li>• Lead magnet themes that convert</li>
                          </ul>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-2">🚀 Scale With:</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Facebook ads to top-performing content</li>
                            <li>• Direct mail to identified neighborhoods</li>
                            <li>• Referral programs for engaged followers</li>
                            <li>• Partnership opportunities in target areas</li>
                          </ul>
                        </div>
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900">Expected Results Timeline</h3>
                      <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                        <h4 className="font-medium text-green-900 mb-2">📊 Realistic Expectations:</h4>
                        <ul className="list-disc pl-6 space-y-1 text-sm text-green-800">
                          <li><strong>Week 1-2:</strong> Content creation and initial posting</li>
                          <li><strong>Week 3-4:</strong> First lead magnet downloads and engagement</li>
                          <li><strong>Month 2:</strong> Initial conversations with potential sellers</li>
                          <li><strong>Month 3+:</strong> First listings from your hidden opportunity strategy</li>
                        </ul>
                      </div>

                      <div className="bg-gray-100 rounded-lg p-6 border border-gray-200">
                        <h4 className="font-medium text-gray-900 mb-2">🎯 Success Metrics to Track:</h4>
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <h5 className="font-medium text-gray-900 mb-1">Content Performance:</h5>
                            <ul className="text-gray-600 space-y-1">
                              <li>• Views from target neighborhoods</li>
                              <li>• Comments asking about listings</li>
                              <li>• Shares and saves of content</li>
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900 mb-1">Lead Generation:</h5>
                            <ul className="text-gray-600 space-y-1">
                              <li>• Lead magnet downloads</li>
                              <li>• Direct messages and inquiries</li>
                              <li>• Phone calls and consultation requests</li>
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900 mb-1">Business Impact:</h5>
                            <ul className="text-gray-600 space-y-1">
                              <li>• Listing appointments scheduled</li>
                              <li>• Properties listed from strategy</li>
                              <li>• Revenue from hidden opportunities</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 bg-emerald-50 rounded-xl p-6 border border-emerald-100">
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                              <svg className="w-5 h-5 text-yellow-900" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.477.859h4z" />
                              </svg>
                            </div>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Personalized Help?</h3>
                            <p className="text-gray-700 mb-4">
                              Want help implementing this strategy or customizing it for your specific market? I'm happy to walk through the process with you.
                            </p>
                            <Link 
                              href="https://calendly.com/lumenosis/30min"
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => analytics.leadMagnet.consultationClicked('footer')}
                              className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                            >
                              Schedule Free 30-Minute Strategy Call
                              <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </article>
            </div>
          </div>
        </div>

        {/* Bottom Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4">
                <Link 
                  href="/lead-magnet" 
                  className="text-gray-600 hover:text-gray-900 font-medium text-sm"
                >
                  ← All Workflows
                </Link>
                <div className="hidden sm:flex items-center space-x-4">
                  <Link 
                    href="/lead-magnet/real-estate-automation" 
                    className={`text-sm font-medium ${(slug as ValidSlug) === 'real-estate-automation' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    Real Estate
                  </Link>
                  <Link 
                    href="/lead-magnet/n8n-ai-agent-builder" 
                    className={`text-sm font-medium ${(slug as ValidSlug) === 'n8n-ai-agent-builder' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    AI Agent Builder
                  </Link>
                  <Link 
                    href="/lead-magnet/apollo-cold-email-automation" 
                    className={`text-sm font-medium ${(slug as ValidSlug) === 'apollo-cold-email-automation' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    Cold Email
                  </Link>
                  <Link 
                    href="/lead-magnet/ai-real-estate-video-automation" 
                    className={`text-sm font-medium ${(slug as ValidSlug) === 'ai-real-estate-video-automation' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    Video Automation
                  </Link>
                  <Link 
                    href="/lead-magnet/ai-hidden-real-estate-listings" 
                    className={`text-sm font-medium ${slug === 'ai-hidden-real-estate-listings' ? 'text-emerald-600' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    Hidden Listings
                  </Link>
                </div>
              </div>
              
              <Link 
                href="https://calendly.com/lumenosis/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Get Help
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default return for unrecognized slugs
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Workflow Not Found</h1>
        <p className="text-gray-600">The requested workflow guide could not be found.</p>
        <Link 
          href="/lead-magnet"
          className="inline-block mt-4 text-blue-600 hover:text-blue-800"
        >
          ← Back to Lead Magnets
        </Link>
      </div>
    </div>
  );
}
