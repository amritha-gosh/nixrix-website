import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Digital Services — Web Design, Automation, CRM, SEO | NIXRIX Leeds',
  description: 'Explore NIXRIX services: custom website design, HubSpot CRM setup, Make.com business automation, Power BI dashboards, social media management and SEO. Based in Leeds, UK.',
  alternates: { canonical: 'https://nixrix.com/services' },
  openGraph: { title: 'Digital Services | NIXRIX Leeds', description: 'Web design, automation, CRM, dashboards and SEO from NIXRIX Leeds.', url: 'https://nixrix.com/services', type: 'website' },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }
