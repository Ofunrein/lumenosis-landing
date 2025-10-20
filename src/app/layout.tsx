import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://lumenosis.com'),
  title: {
    default: 'Lumenosis AI - AI Automation for Real Estate and Home Services',
    template: '%s | Lumenosis AI'
  },
  description: 'Lumenosis AI provides AI automation for real estate agents and home service professionals. Get 3X more leads with 60-second response time, 24/7 booking, and automated follow-ups. Used by 1000+ professionals.',
  keywords: ['AI automation real estate', 'real estate lead generation software', 'HVAC automation software', 'real estate CRM automation', 'AI appointment booking', 'lead qualification software', 'real estate automation', 'home services AI', 'customer service automation'],
  authors: [{ name: 'Lumenosis AI' }],
  creator: 'Lumenosis AI',
  publisher: 'Lumenosis AI',
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://lumenosis.com',
    siteName: 'Lumenosis AI',
    title: 'Lumenosis AI - AI Automation for Real Estate and Home Services',
    description: 'Lumenosis AI provides AI automation for real estate agents and home service professionals. Get 3X more leads with 60-second response time, 24/7 booking, and automated follow-ups.',
    images: [
      {
        url: 'https://lumenosis.com/lumenosis-logo.png',
        width: 1200,
        height: 630,
        alt: 'Lumenosis AI - AI Automation for Real Estate & Home Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lumenosis AI - AI Automation for Real Estate and Home Services',
    description: 'Lumenosis AI provides AI automation for real estate agents and home service professionals. Get 3X more leads with 60-second response time, 24/7 booking, and automated follow-ups.',
    images: ['https://lumenosis.com/lumenosis-logo.png'],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION_CODE || '',
  },
  alternates: {
    canonical: 'https://lumenosis.com',
  },
  icons: {
    icon: [
      { url: '/lumenosis-logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/lumenosis-logo.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/lumenosis-logo.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/lumenosis-logo.png',
        color: '#8b5cf6',
      },
    ],
    shortcut: '/lumenosis-logo.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to external domains for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        <link rel="dns-prefetch" href="https://assets.calendly.com" />
        <link rel="dns-prefetch" href="https://r2.leadsy.ai" />
        
        {/* Leadsy.ai Tracking Script */}
        <Script 
          id="vtag-ai-js" 
          async 
          src="https://r2.leadsy.ai/tag.js" 
          data-pid="14GdffY2saq2i4Av1" 
          data-version="062024"
        />
        
        {/* Vercel Analytics */}
        <Script defer src="/_vercel/insights/script.js" />
        
        
        {/* DNS Prefetch for external domains */}
        <link rel="dns-prefetch" href="//cdn.jsdelivr.net" />
        <link rel="dns-prefetch" href="//cdnjs.cloudflare.com" />
        <link rel="dns-prefetch" href="//r2.leadsy.ai" />
        <link rel="dns-prefetch" href="//assets.calendly.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="anonymous" />
        
        {/* Critical CSS - Load immediately */}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        
        {/* CSS for widget footer targeting */}
        <style>{`
          /* Target OmakaseAI widget footer elements specifically */
          [id*="omakase"] [class*="powered"],
          [id*="omakase"] [class*="branding"],
          [id*="omakase"] .attribution,
          [class*="omakase"] [class*="powered"],
          [class*="omakase"] [class*="branding"],
          [class*="omakase"] .attribution,
          [data-omakase] [class*="powered"],
          [data-omakase] [class*="branding"] {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            height: 0 !important;
            overflow: hidden !important;
          }
          
          /* Target chat widget footer area specifically */
          [class*="chat"] footer,
          [class*="widget"] footer,
          [id*="chat"] footer,
          [id*="widget"] footer,
          div[style*="position: fixed"][style*="bottom"],
          div[style*="position: absolute"][style*="bottom"] {
            /* Allow the element to exist but target its content */
          }
          
          /* Style any Lumenosis branding links */
          a[href*="lumenosis.com"] {
            color: inherit !important;
            text-decoration: none !important;
            cursor: pointer !important;
          }
        `}</style>
        
        {/* Favicon meta tags for better browser support */}
        <link rel="icon" type="image/png" sizes="32x32" href="/lumenosis-logo.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/lumenosis-logo.png" />
        <link rel="shortcut icon" href="/lumenosis-logo.png" />
        <meta name="theme-color" content="#8b5cf6" />
        <meta name="msapplication-TileColor" content="#8b5cf6" />
        
        {/* Enhanced Structured Data - Website with Sitelinks */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Lumenosis AI",
              "url": "https://lumenosis.com",
              "description": "AI Automation Software for Real Estate & Home Services",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://lumenosis.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />

        {/* Enhanced Structured Data - Organization with Sections */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Lumenosis AI",
              "url": "https://lumenosis.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://lumenosis.com/lumenosis-logo.png",
                "width": "200",
                "height": "200"
              },
              "description": "AI automation systems for real estate and home services to streamline operations, generate leads, and increase revenue.",
              "foundingDate": "2024",
              "numberOfEmployees": "10-50",
              "slogan": "Get 3X More Leads with AI Automation",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "US",
                "addressRegion": "TX"
              },
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "telephone": "+1-512-571-2595",
                  "contactType": "customer service",
                  "email": "martin@lumenosis.com",
                  "availableLanguage": ["English"]
                },
                {
                  "@type": "ContactPoint",
                  "contactType": "sales",
                  "url": "https://calendly.com/lumenosis/30min"
                }
              ],
              "sameAs": [
                "https://calendly.com/lumenosis"
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "AI Automation Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Real Estate Lead Automation",
                      "description": "60-second response time, 24/7 booking, automated follow-ups"
                    }
                  },
                  {
                    "@type": "Offer", 
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Home Services Automation",
                      "description": "HVAC, plumbing, electrical service automation"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service", 
                      "name": "AI Appointment Booking",
                      "description": "Automated appointment scheduling and calendar management"
                    }
                  }
                ]
              },
              "department": [
                {
                  "@type": "Organization",
                  "name": "Services",
                  "description": "AI automation solutions for real estate and home services",
                  "url": "https://lumenosis.com/#services"
                },
                {
                  "@type": "Organization", 
                  "name": "About",
                  "description": "Learn about Lumenosis AI and our mission",
                  "url": "https://lumenosis.com/#about"
                },
                {
                  "@type": "Organization",
                  "name": "Contact", 
                  "description": "Get in touch with our team and schedule consultations",
                  "url": "https://lumenosis.com/#contact"
                },
                {
                  "@type": "Organization",
                  "name": "Pricing",
                  "description": "View our service packages and pricing",
                  "url": "https://lumenosis.com/#pricing"
                },
                {
                  "@type": "Organization",
                  "name": "Case Studies",
                  "description": "Real results from our clients",
                  "url": "https://lumenosis.com/#results"
                },
                {
                  "@type": "Organization",
                  "name": "Demonstrations",
                  "description": "Live video demos of AI automation systems in action",
                  "url": "https://lumenosis.com/#demos"
                },
                {
                  "@type": "Organization",
                  "name": "Free Resources",
                  "description": "Download free automation templates and guides",
                  "url": "https://lumenosis.com/lead-magnet"
                },
                {
                  "@type": "Organization",
                  "name": "Real Estate Automation",
                  "description": "Specialized AI automation for real estate professionals",
                  "url": "https://lumenosis.com/lead-magnet/real-estate-automation"
                },
                {
                  "@type": "Organization",
                  "name": "N8N Workflow Collection",
                  "description": "2000+ free automation workflow templates",
                  "url": "https://lumenosis.com/lead-magnet/n8n-workflow-collection"
                },
                {
                  "@type": "Organization",
                  "name": "AI Agent Builder",
                  "description": "Build custom AI agents with N8N workflows",
                  "url": "https://lumenosis.com/lead-magnet/n8n-ai-agent-builder"
                },
                {
                  "@type": "Organization",
                  "name": "Video Automation",
                  "description": "AI-powered real estate video creation automation",
                  "url": "https://lumenosis.com/lead-magnet/ai-real-estate-video-automation"
                },
                {
                  "@type": "Organization",
                  "name": "Cold Email Automation",
                  "description": "Automated lead generation and email outreach",
                  "url": "https://lumenosis.com/lead-magnet/apollo-cold-email-automation"
                },
                {
                  "@type": "Organization",
                  "name": "Lead Discovery",
                  "description": "Find hidden real estate listing opportunities with AI",
                  "url": "https://lumenosis.com/lead-magnet/ai-hidden-real-estate-listings"
                },
                {
                  "@type": "Organization",
                  "name": "Book Consultation",
                  "description": "Schedule a free strategy call with our automation experts",
                  "url": "https://calendly.com/lumenosis/30min"
                }
              ]
            })
          }}
        />
        
        {/* Structured Data - BreadcrumbList for Navigation */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://lumenosis.com"
                },
                {
                  "@type": "ListItem", 
                  "position": 2,
                  "name": "Services",
                  "item": "https://lumenosis.com/#services"
                },
                {
                  "@type": "ListItem",
                  "position": 3, 
                  "name": "About",
                  "item": "https://lumenosis.com/#about"
                },
                {
                  "@type": "ListItem",
                  "position": 4,
                  "name": "Pricing", 
                  "item": "https://lumenosis.com/#pricing"
                },
                {
                  "@type": "ListItem",
                  "position": 5,
                  "name": "Contact",
                  "item": "https://lumenosis.com/#contact"
                }
              ]
            })
          }}
        />

        {/* Structured Data - LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Lumenosis AI",
              "image": "https://lumenosis.com/lumenosis-logo.png",
              "description": "AI automation systems for real estate and home services. Get 3X more leads with 60-second response time and 24/7 booking.",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "US",
                "addressRegion": "TX"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "30.2672",
                "longitude": "-97.7431"
              },
              "url": "https://lumenosis.com",
              "telephone": "+1-512-571-2595",
              "email": "martin@lumenosis.com",
              "priceRange": "$$$",
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "09:00",
                "closes": "17:00"
              },
              "serviceArea": {
                "@type": "Country",
                "name": "United States"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "AI Automation Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Real Estate Lead Automation",
                      "description": "60-second response time, 24/7 booking, automated follow-ups"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service", 
                      "name": "Home Services Automation",
                      "description": "HVAC, plumbing, electrical service automation"
                    }
                  }
                ]
              }
            })
          }}
        />

        {/* Structured Data - Demo Videos */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "VideoObject",
              "name": "Real Estate AI Automation Demo Collection",
              "description": "Complete video demonstrations of AI automation systems for real estate and home services",
              "thumbnailUrl": "https://lumenosis.com/lumenosis-logo.png",
              "uploadDate": "2024-12-01",
              "duration": "PT5M",
              "contentUrl": "https://lumenosis.com/#demos",
              "embedUrl": "https://lumenosis.com/#demos",
              "publisher": {
                "@type": "Organization",
                "name": "Lumenosis AI",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://lumenosis.com/lumenosis-logo.png"
                }
              },
              "potentialAction": {
                "@type": "WatchAction",
                "target": "https://lumenosis.com/#demos"
              }
            })
          }}
        />

        {/* Structured Data - Downloadable Resources */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CreativeWork",
              "name": "Free AI Automation Workflow Templates",
              "description": "Complete collection of downloadable N8N workflow templates, automation guides, and setup instructions",
              "url": "https://lumenosis.com/lead-magnet",
              "author": {
                "@type": "Organization",
                "name": "Lumenosis AI"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Lumenosis AI"
              },
              "datePublished": "2024-12-01",
              "dateModified": "2024-12-15",
              "license": "https://creativecommons.org/licenses/by/4.0/",
              "distribution": [
                {
                  "@type": "DataDownload",
                  "name": "Real Estate Lead Automation Template",
                  "contentUrl": "https://lumenosis.com/downloads/RealEstateLeadGenAutomation.json",
                  "encodingFormat": "application/json"
                },
                {
                  "@type": "DataDownload", 
                  "name": "AI Video Automation Template",
                  "contentUrl": "https://lumenosis.com/downloads/yt vid real estate vid gen.blueprint.json",
                  "encodingFormat": "application/json"
                },
                {
                  "@type": "DataDownload",
                  "name": "Cold Email Automation Template", 
                  "contentUrl": "https://lumenosis.com/downloads/Cold_Email_Live_Build.json",
                  "encodingFormat": "application/json"
                },
                {
                  "@type": "DataDownload",
                  "name": "N8N Workflow Builder Template",
                  "contentUrl": "https://lumenosis.com/downloads/N8N Workflow Builder.json", 
                  "encodingFormat": "application/json"
                }
              ]
            })
          }}
        />

        {/* Structured Data - Service */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "name": "AI Automation for Real Estate & Home Services",
              "provider": {
                "@type": "Organization",
                "name": "Lumenosis AI"
              },
              "description": "AI solutions for real estate and home services that respond in 60 seconds, book appointments 24/7, and never miss a follow-up.",
              "areaServed": "United States",
              "serviceType": "Business Automation Software",
              "category": "Technology Services",
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "AI Automation Services & Resources",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Done-For-You AI Automation Setup",
                      "description": "Custom AI automation system implementation"
                    },
                    "url": "https://lumenosis.com/#contact"
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "CreativeWork",
                      "name": "Free Automation Templates & Guides",
                      "description": "Downloadable workflow templates and setup guides"
                    },
                    "price": "0",
                    "priceCurrency": "USD",
                    "url": "https://lumenosis.com/lead-magnet"
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "VideoObject", 
                      "name": "Live AI Automation Demonstrations",
                      "description": "Interactive video demos of AI systems in action"
                    },
                    "price": "0",
                    "priceCurrency": "USD", 
                    "url": "https://lumenosis.com/#demos"
                  }
                ]
              }
            })
          }}
        />
        
        {/* Structured Data - FAQ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How does your AI respond to leads in 60 seconds when I'm showing homes?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "While you're showing homes, our AI instantly responds to every lead inquiry with personalized messages that qualify prospects and book showings directly into your calendar. It works 24/7, so weekend inquiries don't wait until Monday. Real estate agents using our system report booking 3x more showings without hiring extra staff."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How quickly will I stop losing leads to faster agents?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "You'll see immediate results within 24 hours. Our AI starts responding to leads in under 60 seconds from day one. Real estate agents typically see 35% more showings booked within the first week, and 78% of leads get a response before your competition even checks their phone."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Will this work with my MLS, CRM, and showing software?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Absolutely. We integrate with all major MLS systems (MLS, RMLS, CRMLS), CRMs (Follow Up Boss, Real Geeks, BoomTown), showing software (ShowingTime, Centralized Showing Service), and property management tools. Your AI automatically syncs property data, showing schedules, and lead information across all platforms."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How much does it cost to stop losing deals to faster agents?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Our pricing is based on the deals you'll close, not just features. We have a one-time setup fee and flexible monthly investment based on your business size and goals. Most agents see 3-5x ROI within 90 days. We offer outcome-based pricing where you pay based on results."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How does AI help my HVAC/plumbing/roofing business book more service calls?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Our AI instantly responds to service requests with personalized messages, schedules estimates, and qualifies urgent vs. routine jobs. It handles after-hours emergency calls, weekend inquiries, and seasonal demand spikes without missing opportunities. Home service businesses report 45% more booked estimates."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can your AI handle emergency service requests and after-hours calls?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Absolutely. Our AI works 24/7 and recognizes emergency keywords like 'no heat', 'water leak', or 'electrical emergency'. It immediately escalates urgent requests, sends your emergency contact info, and books priority appointments. Home service pros never lose another emergency job to competitors."
                  }
                }
              ]
            })
          }}
        />
        
        {/* Structured Data - Local Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Lumenosis AI",
              "description": "AI automation systems for real estate and home services",
              "url": "https://lumenosis.com",
              "telephone": "+1-512-571-2595",
              "email": "martin@lumenosis.com",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "30.2672",
                "longitude": "-97.7431"
              },
              "openingHours": "Mo-Su 00:00-23:59",
              "priceRange": "$$",
              "serviceArea": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": "30.2672",
                  "longitude": "-97.7431"
                },
                "geoRadius": "50000"
              }
            })
          }}
        />
        
        {/* Structured Data - Video Object for Demo Videos */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "VideoObject",
              "name": "AI Lead Qualification Demo - Real Estate Automation",
              "description": "See how our AI automation software qualifies real estate leads via SMS using GPT-4o, Twilio, and Google Sheets in under 60 seconds.",
              "thumbnailUrl": "https://lumenosis.com/demo-thumbnail.jpg",
              "uploadDate": "2024-12-01",
              "duration": "PT2M30S",
              "contentUrl": "https://lumenosis.com/videos/demos/Qualify Real Estate Leads via SMS with GPT-4o, Twilio, and Google Sheets + Retell short demo.mp4",
              "embedUrl": "https://lumenosis.com",
              "publisher": {
                "@type": "Organization",
                "name": "Lumenosis AI",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://lumenosis.com/lumenosis-logo.png"
                }
              }
            })
          }}
        />
        
        {/* Structured Data - How-To Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HowTo",
              "name": "How to Automate Real Estate Lead Response in 60 Seconds",
              "description": "Step-by-step guide to automate your real estate lead qualification and booking process using AI",
              "image": "https://lumenosis.com/how-to-automate.jpg",
              "totalTime": "PT30M",
              "estimatedCost": {
                "@type": "MonetaryAmount",
                "currency": "USD",
                "value": "1500"
              },
              "step": [
                {
                  "@type": "HowToStep",
                  "name": "Connect Your Lead Sources",
                  "text": "Integrate your website forms, social media, and MLS feeds to capture every lead automatically",
                  "image": "https://lumenosis.com/step1.jpg"
                },
                {
                  "@type": "HowToStep", 
                  "name": "Set Up AI Qualification",
                  "text": "Configure your AI to qualify leads based on budget, timeline, and property preferences in real-time",
                  "image": "https://lumenosis.com/step2.jpg"
                },
                {
                  "@type": "HowToStep",
                  "name": "Automate Appointment Booking", 
                  "text": "Enable 24/7 showing scheduling that syncs with your calendar and sends confirmations automatically",
                  "image": "https://lumenosis.com/step3.jpg"
                },
                {
                  "@type": "HowToStep",
                  "name": "Launch & Monitor Results",
                  "text": "Go live with your AI system and track your 3x increase in booked showings and faster response times",
                  "image": "https://lumenosis.com/step4.jpg"
                }
              ]
            })
          }}
        />
        
        {/* Structured Data - Aggregate Rating */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              "name": "Lumenosis AI Automation Software",
              "description": "AI automation software for real estate agents and home service professionals",
              "brand": {
                "@type": "Brand",
                "name": "Lumenosis AI"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "50",
                "bestRating": "5",
                "worstRating": "1"
              },
              "review": [
                {
                  "@type": "Review",
                  "author": {
                    "@type": "Person",
                    "name": "Sarah Johnson"
                  },
                  "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "5",
                    "bestRating": "5"
                  },
                  "reviewBody": "Lumenosis AI has transformed my real estate business. I'm booking 3x more showings and responding to leads in under 60 seconds automatically."
                },
                {
                  "@type": "Review", 
                  "author": {
                    "@type": "Person",
                    "name": "Mike Davis"
                  },
                  "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "5",
                    "bestRating": "5"
                  },
                  "reviewBody": "The AI qualification system saves me 15+ hours weekly. My HVAC business has never been more efficient at booking service calls."
                }
              ]
            })
          }}
        />
        
        {/* Structured Data - BreadcrumbList for Real Estate & Home Services */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "AI Automation Software",
                  "item": "https://lumenosis.com"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Real Estate Automation",
                  "item": "https://lumenosis.com#real-estate"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "Home Services Automation",
                  "item": "https://lumenosis.com#home-services"
                },
                {
                  "@type": "ListItem",
                  "position": 4,
                  "name": "Lead Response Automation",
                  "item": "https://lumenosis.com#services"
                },
                {
                  "@type": "ListItem",
                  "position": 5,
                  "name": "AI Appointment Booking",
                  "item": "https://lumenosis.com#booking"
                }
              ]
            })
          }}
        />
        
        {/* Structured Data - Software Application for Real Estate */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Lumenosis AI - Real Estate Lead Automation Software",
              "applicationCategory": "BusinessApplication",
              "description": "AI automation software that responds to real estate leads in 60 seconds, books showings 24/7, and qualifies prospects automatically. Get 3X more showings booked.",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "1500",
                "priceCurrency": "USD",
                "priceValidUntil": "2025-12-31"
              },
              "featureList": [
                "60-second lead response automation",
                "24/7 showing appointment booking",
                "MLS integration and property matching", 
                "Automatic lead qualification",
                "CRM synchronization",
                "SMS and email automation"
              ],
              "publisher": {
                "@type": "Organization",
                "name": "Lumenosis AI"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "50"
              }
            })
          }}
        />
        
        {/* Structured Data - Software Application for Home Services */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication", 
              "name": "Lumenosis AI - Home Services Lead Automation Software",
              "applicationCategory": "BusinessApplication",
              "description": "AI automation software for HVAC, plumbing, roofing, and home service businesses. Handles emergency calls, schedules estimates, and qualifies service requests 24/7.",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "1500",
                "priceCurrency": "USD",
                "priceValidUntil": "2025-12-31"
              },
              "featureList": [
                "Emergency service call automation",
                "24/7 estimate scheduling",
                "Service request qualification",
                "After-hours lead capture",
                "Customer service automation",
                "Seasonal demand management"
              ],
              "publisher": {
                "@type": "Organization",
                "name": "Lumenosis AI"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9", 
                "reviewCount": "50"
              }
            })
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
        
        {/* Analytics Components */}
        <Analytics />
        <SpeedInsights />
        
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                  page_title: document.title,
                  page_location: window.location.href,
                });
              `}
            </Script>
          </>
        )}
        
        {/* AOS Library JavaScript */}
        <Script src="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js" strategy="lazyOnload" />
        
        {/* Calendly Widget Script */}
        <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
      </body>
    </html>
  )
}
