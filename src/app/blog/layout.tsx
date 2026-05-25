import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Digital Insights & Business Growth Blog | NIXRIX Leeds',
  description: 'Practical guides on web design, business automation, SEO, CRM and data dashboards from the NIXRIX team. Helping UK businesses grow digitally.',
  alternates: { canonical: 'https://nixrix.com/blog' },
  openGraph: { title: 'NIXRIX Blog | Digital Insights', description: 'Practical digital guides for growing businesses from the NIXRIX team.', url: 'https://nixrix.com/blog', type: 'website' },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }
