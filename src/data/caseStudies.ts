export type CaseStudy = {
  slug: string
  client: string
  title: string
  tags: string[]
  challenge: string
  whatWeBuilt: string
  result: string
  imagePath: string
  featured: boolean
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'theyyam',
    client: 'Theyyam',
    title: 'From manual bookings to fully automated customer journey',
    tags: ['AI Automation', 'Web Design', 'CRM'],
    challenge: 'The business was managing all bookings manually via phone and email. Every confirmation, reminder, and follow-up required staff time. Peak periods caused errors and missed bookings.',
    whatWeBuilt: 'A complete AI-powered booking system integrated with their existing tools. Make.com automation handles confirmations, reminders, and follow-ups. Zero manual intervention required.',
    result: '100% of bookings now automated. Staff time on admin reduced dramatically. Zero missed bookings since launch. Customer response time under 2 minutes.',
    imagePath: '/portfolio/theyyam.jpg',
    featured: true,
  },
  {
    slug: 'roster-care',
    client: 'Roster Care',
    title: 'Eliminating manual rota management across multiple sites',
    tags: ['HR Automation', 'Custom Software', 'CRM'],
    challenge: 'HR team spending hours every week building rotas manually in spreadsheets. Changes required re-sending to all staff. No visibility of availability or conflicts in real time.',
    whatWeBuilt: 'Custom workforce management platform with automated rota generation, real-time availability tracking, and instant notifications. Integrated with payroll system.',
    result: 'Weekly rota time cut by over 80%. Real-time visibility across all sites. Automatic conflict detection. Staff satisfaction significantly improved.',
    imagePath: '/portfolio/roster-care.jpg',
    featured: true,
  },
]

export function getCaseStudy(slug: string) {
  return caseStudies.find(c => c.slug === slug) || null
}

export function getFeaturedCaseStudies() {
  return caseStudies.filter(c => c.featured)
}
