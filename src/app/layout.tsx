import type { Metadata } from 'next'
import './globals.css'
import Cursor from '@/components/Cursor'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import ChatBot from '@/components/ChatBot'
import CookieBanner from '@/components/CookieBanner'
import { orgSchema, localSchema, faqSchema, serviceSchema, defaultMeta } from '@/lib/seo'

export const metadata: Metadata = {
  metadataBase: new URL('https://nixrix.com'),
  title: { default: defaultMeta.defaultTitle, template: '%s | NIXRIX' },
  description: defaultMeta.defaultDescription,
  keywords: defaultMeta.defaultKeywords,
  authors: [{ name: 'NIXRIX', url: 'https://nixrix.com' }],
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://nixrix.com',
    siteName: 'NIXRIX',
    title: defaultMeta.defaultTitle,
    description: defaultMeta.defaultDescription,
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultMeta.defaultTitle,
    description: defaultMeta.defaultDescription,
    site: '@nixrix',
  },
  alternates: { canonical: 'https://nixrix.com' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <head>
        <meta name="geo.region" content="GB-LDS" />
        <meta name="geo.placename" content="Leeds" />
        <meta name="geo.position" content="53.7997;-1.5492" />
        <meta name="ICBM" content="53.7997, -1.5492" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      </head>
      <body>
        <Cursor />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        <ChatBot />
        <CookieBanner />
      </body>
    </html>
  )
}
