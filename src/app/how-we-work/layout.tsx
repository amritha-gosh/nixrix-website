import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'How We Work — Our Process | NIXRIX Digital Agency Leeds',
  description: 'See how NIXRIX delivers projects: discovery call, strategy, design and build, launch and ongoing support. Clear process, no surprises.',
  alternates: { canonical: 'https://nixrix.com/how-we-work' },
  openGraph: { title: 'How NIXRIX Works | Our Process', description: 'From discovery call to launch. See the NIXRIX delivery process.', url: 'https://nixrix.com/how-we-work', type: 'website' },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }
