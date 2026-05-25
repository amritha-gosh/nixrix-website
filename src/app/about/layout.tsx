import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'About NIXRIX — Digital Systems & Automation Agency | Leeds',
  description: 'NIXRIX is a team of strategists, designers, developers and automation specialists based in Leeds. We build digital systems that help ambitious businesses grow.',
  alternates: { canonical: 'https://nixrix.com/about' },
  openGraph: { title: 'About NIXRIX | Leeds Digital Agency', description: 'Meet the NIXRIX team. We build websites, automation systems and data dashboards for businesses across the UK.', url: 'https://nixrix.com/about', type: 'website' },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }
