export const defaultMeta = {
  siteName: 'NIXRIX',
  siteUrl: 'https://nixrix.com',
  defaultTitle: 'NIXRIX — Digital Systems & Automation Company | Leeds',
  defaultDescription: 'NIXRIX is a Leeds-based digital systems and automation company. We build websites, automate business processes, create data dashboards, run digital marketing, and develop custom software.',
  defaultKeywords: 'digital agency Leeds, web design Leeds, business automation Leeds, CRM implementation, digital marketing Leeds, custom software development UK, SEO Leeds, NIXRIX',
}

export const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'NIXRIX',
  url: 'https://nixrix.com',
  logo: 'https://nixrix.com/nixrix-logo.svg',
  description: 'Digital systems and automation company based in Leeds, UK.',
  address: { '@type': 'PostalAddress', addressLocality: 'Leeds', addressRegion: 'West Yorkshire', addressCountry: 'GB' },
  contactPoint: { '@type': 'ContactPoint', telephone: '+44-7492-712144', email: 'info@nixrix.com' },
  areaServed: ['Leeds', 'United Kingdom'],
}

export const localSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'NIXRIX',
  url: 'https://nixrix.com',
  telephone: '+44-7492-712144',
  email: 'info@nixrix.com',
  address: { '@type': 'PostalAddress', addressLocality: 'Leeds', addressRegion: 'West Yorkshire', postalCode: 'LS1', addressCountry: 'GB' },
  geo: { '@type': 'GeoCoordinates', latitude: 53.7997, longitude: -1.5492 },
}

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What does NIXRIX do?', acceptedAnswer: { '@type': 'Answer', text: 'NIXRIX is a digital systems and automation company based in Leeds. We build websites, automate business processes, create data dashboards, run digital marketing campaigns, and develop custom software.' } },
    { '@type': 'Question', name: 'Where is NIXRIX based?', acceptedAnswer: { '@type': 'Answer', text: 'NIXRIX is based in Leeds, West Yorkshire, UK. We work with clients across the UK, US and UAE.' } },
    { '@type': 'Question', name: 'How do I get started with NIXRIX?', acceptedAnswer: { '@type': 'Answer', text: 'Book a free discovery call via nixrix.com/contact, email info@nixrix.com, or call +44 7492 712144. We respond within 24 hours.' } },
    { '@type': 'Question', name: 'Does NIXRIX offer business automation?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. NIXRIX specialises in business automation using HubSpot, Make.com, AI chatbots, and custom integrations.' } },
    { '@type': 'Question', name: 'Can NIXRIX help with SEO?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. NIXRIX provides full SEO services including technical SEO, local SEO for Leeds, content optimisation, and AI search optimisation.' } },
  ],
}

export const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  provider: { '@type': 'Organization', name: 'NIXRIX', url: 'https://nixrix.com' },
  serviceType: 'Digital Systems & Automation',
  areaServed: { '@type': 'Country', name: 'United Kingdom' },
}
