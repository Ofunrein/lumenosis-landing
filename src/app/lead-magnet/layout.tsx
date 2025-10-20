import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Learn AI for Business | Lumenosis AI',
  description: 'Expert guides and automation workflows for business AI implementation. Learn from Lumenosis AI experts with step-by-step tutorials, ready-to-use workflows, and practical AI solutions.',
  keywords: [
    'learn ai for business',
    'ai automation tutorials',
    'business ai implementation',
    'ai agents guides',
    'automation workflows',
    'business automation guides',
    'ai workflows',
    'n8n workflows',
    'ai implementation tutorials',
    'business ai tools',
    'ai automation training',
    'workflow templates',
    'ai for real estate',
    'ai for home services',
    'ai agents for business'
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
    title: 'Learn AI for Business | Lumenosis AI',
    description: 'Expert guides and automation workflows for business AI implementation. Learn from Lumenosis AI experts with step-by-step tutorials, ready-to-use workflows, and practical AI solutions.',
    images: [
      {
        url: 'https://lumenosis.com/logo.png',
        width: 1200,
        height: 630,
        alt: 'Lumenosis AI - Learn AI for Business',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@LumenosisAI',
    creator: '@LumenosisAI',
    title: 'Learn AI for Business | Lumenosis AI',
    description: 'Expert guides and automation workflows for business AI implementation. Learn from Lumenosis AI experts with step-by-step tutorials and practical AI solutions.',
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
