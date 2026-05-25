import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'
import HeroSection from '@/components/home/HeroSection'
import ServicesStrip from '@/components/home/ServicesStrip'
import StatsStrip from '@/components/home/StatsStrip'
import AboutStrip from '@/components/home/AboutStrip'
import WorksStrip from '@/components/home/WorksStrip'
import CTASection from '@/components/home/CTASection'
import ReviewsStrip from '@/components/ReviewsStrip'

export const metadata: Metadata = {
  title: pageMeta.home.title,
  description: pageMeta.home.description,
  alternates: { canonical: 'https://nixrix.com' },
  openGraph: {
    title: pageMeta.home.title,
    description: pageMeta.home.description,
    url: 'https://nixrix.com',
    type: 'website',
  },
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
