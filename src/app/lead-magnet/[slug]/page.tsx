import WorkflowGuideClient from './WorkflowGuideClient';
import type { Metadata } from 'next'

// Generate static params for export - this runs on the server
export async function generateStaticParams() {
  return [
    { slug: 'real-estate-automation' },
    { slug: 'n8n-workflow-collection' },
    { slug: 'n8n-ai-agent-builder' },
    { slug: 'ai-real-estate-video-automation' },
    { slug: 'apollo-cold-email-automation' },
    { slug: 'ai-hidden-real-estate-listings' },
    // Add more slugs here as you create more workflows
  ];
}

// Generate metadata for each workflow page
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const workflowData = {
    'real-estate-automation': {
      title: 'Real Estate Lead Automation Guide | Lumenosis AI',
      description: 'Complete step-by-step guide to automate real estate lead generation with BatchData & N8N. Download the exact workflow that delivers investor-ready leads straight to your inbox.',
      keywords: 'real estate automation, lead generation automation, BatchData integration, N8N workflow, real estate leads, property lead automation, real estate CRM, investor leads, lead scraping, real estate wholesaling',
      image: 'https://lumenosis.com/logo.png',
      url: `https://lumenosis.com/lead-magnet/real-estate-automation`
    },
        'n8n-workflow-collection': {
          title: '2000+ Free N8N Workflows Collection | Automation Templates | Lumenosis AI',
          description: 'Browse 2000+ free N8N automation workflows for business automation, lead generation, CRM integration, social media, content creation, and more. Visual diagrams, one-click import, enhanced search. No signup required.',
          keywords: 'n8n workflows, automation templates, business automation, lead generation workflows, crm automation, social media automation, content creation automation, free n8n templates, workflow collection, automation library',
          image: 'https://lumenosis.com/logo.png',
          url: `https://lumenosis.com/lead-magnet/n8n-workflow-collection`
        },
    'n8n-ai-agent-builder': {
      title: 'N8N AI Agent Builder Guide | Build Workflows with AI | Lumenosis AI',
      description: 'Revolutionary AI system that creates complete N8N workflows from text descriptions. Uses Claude Opus 4 thinking to generate functional workflows with proper connections, credentials, and documentation. Free template included.',
      keywords: 'n8n ai agent, ai workflow builder, claude opus 4, ai automation, n8n workflow generator, ai agent builder, automated workflow creation, n8n development, ai coding assistant, workflow automation ai',
      image: 'https://lumenosis.com/logo.png',
      url: `https://lumenosis.com/lead-magnet/n8n-ai-agent-builder`
    },
    'ai-real-estate-video-automation': {
      title: 'AI Real Estate Video Automation Guide | Create Cinematic Property Videos | Lumenosis AI',
      description: 'Complete guide to automate real estate video creation with AI. Turn property photos into professional cinematic videos with voiceovers in under 3 minutes using Make.com, Runway, and ElevenLabs. Free template included.',
      keywords: 'ai real estate videos, property video automation, cinematic real estate videos, ai video creation, make.com automation, runway ai videos, elevenlabs voiceover, real estate marketing automation, property listing videos, ai content creation',
      image: 'https://lumenosis.com/logo.png',
      url: `https://lumenosis.com/lead-magnet/ai-real-estate-video-automation`
    },
    'apollo-cold-email-automation': {
      title: 'Apollo Cold Email Automation Guide | AI Personalized Lead Scraping | Lumenosis AI',
      description: 'Complete automation guide for Apollo lead scraping with AI personalized cold emails. Scrape 1000+ leads from Apollo, generate custom messages with AI, and auto-send with Instantly. N8N workflow included.',
      keywords: 'apollo lead scraping, cold email automation, personalized cold emails, ai email writing, apollo automation, instantly integration, lead generation automation, cold outreach automation, apollo scraper, ai cold emails',
      image: 'https://lumenosis.com/logo.png',
      url: `https://lumenosis.com/lead-magnet/apollo-cold-email-automation`
    },
    'ai-hidden-real-estate-listings': {
      title: 'AI Hidden Real Estate Listings Discovery Guide | Find Untapped Opportunities | Lumenosis AI',
      description: 'Complete guide using Manus AI and Gamma to uncover hidden listing opportunities. Data-driven approach to identify underserved neighborhoods and seller motivations. Free strategy guide.',
      keywords: 'hidden real estate listings, manus ai research, real estate market analysis, listing opportunities, real estate lead generation, gamma lead magnets, seller motivation analysis, real estate prospecting, market research tools, ai real estate strategy, listing generation, real estate ai tools, market research automation, listing lead generation, real estate technology, ai market analysis, property lead generation, real estate marketing automation, seller lead generation, listing opportunity identification',
      image: 'https://lumenosis.com/social-images/ai-hidden-listings.png',
      url: `https://lumenosis.com/lead-magnet/ai-hidden-real-estate-listings`
    },
    // Add more workflows here as they're created
  };

  const data = workflowData[params.slug as keyof typeof workflowData];
  
  if (!data) {
    return {
      title: 'Workflow Guide | Lumenosis AI',
      description: 'Complete automation workflow guide from Lumenosis AI.',
    };
  }

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords ? data.keywords.split(', ') : ['real estate automation', 'lead generation', 'N8N workflow', 'BatchData', 'real estate leads', 'automation guide', 'real estate wholesaling', 'property investment automation', 'CRM integration'],
    authors: [{ name: 'Lumenosis AI' }],
    creator: 'Lumenosis AI',
    publisher: 'Lumenosis AI',
    category: 'Technology',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: data.url,
    },
    openGraph: {
      type: 'article',
      locale: 'en_US',
      url: data.url,
      siteName: 'Lumenosis AI',
      title: data.title,
      description: data.description,
      publishedTime: '2024-12-01T00:00:00.000Z',
      modifiedTime: new Date().toISOString(),
      authors: ['Lumenosis AI'],
      section: 'Automation Guides',
      tags: data.keywords ? data.keywords.split(', ') : [],
      images: [
        {
          url: data.image,
          width: 1200,
          height: 630,
          alt: `${data.title} - Complete Guide by Lumenosis AI`,
          type: 'image/png',
        },
        {
          url: data.image,
          width: 1200,
          height: 600,
          alt: `${data.title} - Automation Guide`,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@LumenosisAI',
      creator: '@LumenosisAI',
      title: data.title,
      description: data.description,
      images: {
        url: data.image,
        alt: `${data.title} - Complete Guide by Lumenosis AI`,
        width: 1200,
        height: 630,
      },
    },
    other: {
      'article:author': 'Lumenosis AI',
      'article:section': 'Automation Guides',
      'article:tag': data.keywords,
      'og:see_also': 'https://lumenosis.com/lead-magnet',
    },
  };
}

export default function WorkflowGuide({ params }: { params: { slug: string } }) {
  const workflowData = {
    'real-estate-lead-automation': {
      title: 'Real Estate Lead Automation with BatchData & N8N | Complete Guide | Lumenosis AI',
      description: 'Complete automation guide for real estate lead generation. Automate BatchData lead capture, CRM integration, and follow-ups with N8N. Get 3X more leads automatically.',
      keywords: 'real estate automation, BatchData automation, N8N real estate workflow, real estate lead generation, CRM automation, real estate leads, property lead automation, real estate wholesaling automation, BatchData N8N integration, real estate investment automation',
      image: 'https://lumenosis.com/social-images/real-estate-automation.png',
      url: `https://lumenosis.com/lead-magnet/real-estate-lead-automation`
    },
    'apollo-cold-email-automation': {
      title: 'Apollo Cold Email Automation with AI | Scrape & Send 1000+ Leads | Lumenosis AI',
      description: 'Complete automation guide for Apollo lead scraping with AI personalized cold emails. Scrape 1000+ leads from Apollo, generate custom messages with AI, and auto-send with Instantly. N8N workflow included.',
      keywords: 'apollo lead scraping, cold email automation, personalized cold emails, ai email writing, apollo automation, instantly integration, lead generation automation, cold outreach automation, apollo scraper, ai cold emails',
      image: 'https://lumenosis.com/social-images/apollo-automation.png',
      url: `https://lumenosis.com/lead-magnet/apollo-cold-email-automation`
    },
    'ai-hidden-real-estate-listings': {
      title: 'AI Hidden Real Estate Listings Discovery Guide | Find Untapped Opportunities | Lumenosis AI',
      description: 'Complete guide using Manus AI and Gamma to uncover hidden listing opportunities. Data-driven approach to identify underserved neighborhoods and seller motivations. Free strategy guide.',
      keywords: 'hidden real estate listings, manus ai research, real estate market analysis, listing opportunities, real estate lead generation, gamma lead magnets, seller motivation analysis, real estate prospecting, market research tools, ai real estate strategy, listing generation, real estate ai tools, market research automation, listing lead generation, real estate technology, ai market analysis, property lead generation, real estate marketing automation, seller lead generation, listing opportunity identification',
      image: 'https://lumenosis.com/social-images/ai-hidden-listings.png',
      url: `https://lumenosis.com/lead-magnet/ai-hidden-real-estate-listings`
    },
  };

  const data = workflowData[params.slug as keyof typeof workflowData];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": data?.title || "Workflow Guide",
    "description": data?.description || "Complete automation workflow guide",
    "image": data?.image || "https://lumenosis.com/logo.png",
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
    "dateModified": new Date().toISOString().split('T')[0],
    "url": data?.url || `https://lumenosis.com/lead-magnet/${params.slug}`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": data?.url || `https://lumenosis.com/lead-magnet/${params.slug}`
    },
    "articleSection": "Automation Guides",
    "keywords": data?.keywords || "automation, lead generation, real estate",
    "genre": "Technology",
    "educationalLevel": "Beginner to Intermediate",
    "learningResourceType": "Guide",
    "about": {
      "@type": "Thing",
      "name": "Business Automation",
      "description": "AI-powered automation solutions for real estate and business lead generation"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <WorkflowGuideClient slug={params.slug} />
    </>
  );
}
