import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Case Studies — Real Results for Real Businesses | NIXRIX',
  description: 'Deep dives into how NIXRIX has helped businesses automate operations, generate leads and grow digitally. Read about Theyyam and Roster Care.',
  alternates: { canonical: 'https://nixrix.com/case-studies' },
  openGraph: { title: 'NIXRIX Case Studies | Real Results', description: 'How NIXRIX helped Theyyam and Roster Care transform their operations.', url: 'https://nixrix.com/case-studies', type: 'website' },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }
