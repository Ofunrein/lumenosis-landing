import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Automation Workflows - Lumenosis AI',
  description: 'Complete step-by-step automation guides and workflows for real estate and business. No email required, no downloads needed. Just click, read, and implement.',
  keywords: [
    'automation workflows',
    'real estate automation',
    'business automation',
    'ai workflows',
    'n8n workflows',
    'free automation guides',
    'lead generation automation',
    'crm automation',
    'property automation',
    'real estate tools',
    'business efficiency',
    'workflow templates'
  ],
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
    url: 'https://lumenosis.com/lead-magnet',
    siteName: 'Lumenosis AI',
    title: 'Free Automation Workflows - Lumenosis AI',
    description: 'Complete step-by-step automation guides and workflows for real estate and business. No email required, no downloads needed. Just click, read, and implement.',
    images: [
      {
        url: 'https://lumenosis.com/logo.png',
        width: 1200,
        height: 630,
        alt: 'Lumenosis AI - Free Automation Workflows',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@LumenosisAI',
    creator: '@LumenosisAI',
    title: 'Free Automation Workflows - Lumenosis AI',
    description: 'Complete step-by-step automation guides and workflows for real estate and business. No email required, no downloads needed.',
    images: ['https://lumenosis.com/logo.png'],
  },
  alternates: {
    canonical: 'https://lumenosis.com/lead-magnet',
  },
  other: {
    'theme-color': '#4f46e5',
  },
};

export default function LeadMagnetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
