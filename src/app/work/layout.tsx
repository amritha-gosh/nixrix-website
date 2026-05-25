import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Our Work — Web Design & Automation Projects | NIXRIX',
  description: 'See how NIXRIX has helped businesses with AI booking automation, HR workflow automation, and custom digital systems. Real projects, real results.',
  alternates: { canonical: 'https://nixrix.com/work' },
  openGraph: { title: 'NIXRIX Portfolio | Our Work', description: 'Real projects from NIXRIX including Theyyam AI automation and Roster Care HR systems.', url: 'https://nixrix.com/work', type: 'website' },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }
