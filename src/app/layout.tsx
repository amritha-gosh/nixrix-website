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
  creator: 'NIXRIX',
  publisher: 'NIXRIX',
  category: 'Digital Agency',
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  openGraph: {
    type: 'website', locale: 'en_GB',
    url: 'https://nixrix.com', siteName: 'NIXRIX',
    title: defaultMeta.defaultTitle,
    description: defaultMeta.defaultDescription,
    images: [{ url: 'https://nixrix.com/nixrix-og.png', width: 1200, height: 630, alt: 'NIXRIX Digital Systems and Automation' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultMeta.defaultTitle,
    description: defaultMeta.defaultDescription,
    site: '@nixrix', creator: '@nixrix',
    images: ['https://nixrix.com/nixrix-og.png'],
  },
  alternates: { canonical: 'https://nixrix.com' },
  icons: {
    icon: [
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    shortcut: '/favicon-32.png',
  },
  verification: { google: 'ADD_GOOGLE_VERIFICATION_CODE_HERE' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <head>
        <link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" href="/icon-192.png" sizes="192x192" type="image/png" />
        <meta name="geo.region" content="GB-LDS" />
        <meta name="geo.placename" content="Leeds, West Yorkshire" />
        <meta name="geo.position" content="53.7997;-1.5492" />
        <meta name="ICBM" content="53.7997, -1.5492" />
        <meta name="theme-color" content="#f90808" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="NIXRIX" />
        <meta name="application-name" content="NIXRIX" />
        <meta name="msapplication-TileColor" content="#f90808" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
