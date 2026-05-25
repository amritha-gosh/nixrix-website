import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Contact NIXRIX — Book a Free Discovery Call | Leeds Digital Agency',
  description: 'Get in touch with NIXRIX. Book a free 30-minute discovery call, email info@nixrix.com or call +44 7492 712144. We respond within 24 hours.',
  alternates: { canonical: 'https://nixrix.com/contact' },
  openGraph: { title: 'Contact NIXRIX | Free Discovery Call', description: 'Book a free call with NIXRIX. We help businesses with websites, automation, CRM and digital marketing.', url: 'https://nixrix.com/contact', type: 'website' },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }
