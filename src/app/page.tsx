import type { Metadata } from 'next'
import HeroSection from '@/components/home/HeroSection'
import ServicesStrip from '@/components/home/ServicesStrip'
import StatsStrip from '@/components/home/StatsStrip'
import AboutStrip from '@/components/home/AboutStrip'
import WorksStrip from '@/components/home/WorksStrip'
import ReviewsStrip from '@/components/ReviewsStrip'
import CTASection from '@/components/home/CTASection'

export const metadata: Metadata = {
  title: 'NIXRIX — Digital Systems & Automation Company | Leeds',
  description: 'NIXRIX builds websites, automates business processes, creates dashboards, and drives digital growth for ambitious UK businesses. Based in Leeds.',
  alternates: { canonical: 'https://nixrix.com' },
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesStrip />
      <StatsStrip />
      <AboutStrip />
      <WorksStrip />
      <ReviewsStrip />
      <CTASection />
    </>
  )
}
