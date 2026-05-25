export const defaultMeta = {
  siteName: 'NIXRIX',
  siteUrl: 'https://nixrix.com',
  defaultTitle: 'NIXRIX — Digital Systems & Automation Company | Leeds, UK',
  defaultDescription: 'NIXRIX is a Leeds-based digital systems and automation company. We build websites, automate business processes, create Power BI dashboards, run digital marketing, and develop custom software for businesses across the UK, US and UAE.',
  defaultKeywords: 'digital agency Leeds, web design Leeds, business automation Leeds, HubSpot CRM setup UK, Make.com automation, Power BI dashboard UK, digital marketing Leeds, custom software development UK, SEO Leeds, website design Yorkshire, automation agency UK, NIXRIX',
}

export const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'NIXRIX',
  alternateName: 'NIXRIX Digital',
  url: 'https://nixrix.com',
  logo: 'https://nixrix.com/nixrix-logo.svg',
  description: 'NIXRIX is a digital systems and automation company based in Leeds, UK. We help businesses grow through websites, automation, data dashboards, and digital marketing.',
  foundingDate: '2024',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Leeds',
    addressLocality: 'Leeds',
    addressRegion: 'West Yorkshire',
    postalCode: 'LS1',
    addressCountry: 'GB',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+44-7492-712144',
      contactType: 'customer service',
      email: 'info@nixrix.com',
      availableLanguage: 'English',
      areaServed: ['GB', 'US', 'AE'],
    },
    {
      '@type': 'ContactPoint',
      telephone: '+44-7492-712144',
      contactType: 'sales',
      email: 'info@nixrix.com',
    },
  ],
  sameAs: [
    'https://linkedin.com/company/nixrix',
    'https://instagram.com/nixrix_',
  ],
  areaServed: [
    { '@type': 'City', name: 'Leeds' },
    { '@type': 'AdministrativeArea', name: 'West Yorkshire' },
    { '@type': 'Country', name: 'United Kingdom' },
    { '@type': 'Country', name: 'United States' },
    { '@type': 'Country', name: 'United Arab Emirates' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Digital Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Web Design and Development' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Business Automation' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'CRM Implementation' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Power BI Dashboards' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Digital Marketing' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom Software Development' } },
    ],
  },
}

export const localSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://nixrix.com/#business',
  name: 'NIXRIX',
  image: 'https://nixrix.com/nixrix-logo.svg',
  url: 'https://nixrix.com',
  telephone: '+44-7492-712144',
  email: 'info@nixrix.com',
  priceRange: '££',
  currenciesAccepted: 'GBP',
  paymentAccepted: 'Bank Transfer, Credit Card',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Leeds',
    addressRegion: 'West Yorkshire',
    postalCode: 'LS1',
    addressCountry: 'GB',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 53.7997,
    longitude: -1.5492,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    reviewCount: '12',
    bestRating: '5',
    worstRating: '1',
  },
}

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What does NIXRIX do?',
      acceptedAnswer: { '@type': 'Answer', text: 'NIXRIX is a digital systems and automation company based in Leeds, UK. We build websites, automate business processes using HubSpot and Make.com, create Power BI data dashboards, run digital marketing campaigns, and develop custom software for businesses across the UK, US and UAE.' },
    },
    {
      '@type': 'Question',
      name: 'Where is NIXRIX based?',
      acceptedAnswer: { '@type': 'Answer', text: 'NIXRIX is based in Leeds, West Yorkshire, UK. We work with clients across the UK, US and UAE, operating fully remotely so location is never a barrier.' },
    },
    {
      '@type': 'Question',
      name: 'How much does NIXRIX charge for a website?',
      acceptedAnswer: { '@type': 'Answer', text: 'NIXRIX website packages start from £200 for a one-page website. Full business websites are priced on scope. We offer flexible pricing and staged payment options. Book a free discovery call for a tailored quote.' },
    },
    {
      '@type': 'Question',
      name: 'How do I get started with NIXRIX?',
      acceptedAnswer: { '@type': 'Answer', text: 'Book a free 30-minute discovery call via nixrix.com/contact, email info@nixrix.com, or call +44 7492 712144. We respond within 24 hours and there is no obligation.' },
    },
    {
      '@type': 'Question',
      name: 'Does NIXRIX offer business automation?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. NIXRIX specialises in business automation using HubSpot CRM, Make.com workflows, AI chatbots, and custom integrations. We automate lead follow-up, client onboarding, document processing, and reporting.' },
    },
    {
      '@type': 'Question',
      name: 'Can NIXRIX help with SEO?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. NIXRIX provides full SEO services including technical SEO, local SEO for Leeds and UK businesses, content optimisation, Google Business Profile setup, and AI search optimisation for ChatGPT and Perplexity.' },
    },
    {
      '@type': 'Question',
      name: 'Does NIXRIX work with small businesses?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. NIXRIX works with businesses of all sizes from brand new startups to established SMEs. We have entry-level packages designed specifically for small businesses getting started digitally.' },
    },
    {
      '@type': 'Question',
      name: 'What is the NIXRIX Launchpad package?',
      acceptedAnswer: { '@type': 'Answer', text: 'The NIXRIX Launchpad is our full business website package. It includes a multi-page responsive website, on-page SEO, lead capture forms, Google Analytics setup, and sitemap submission. Priced on application.' },
    },
    {
      '@type': 'Question',
      name: 'Does NIXRIX build Power BI dashboards?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. NIXRIX builds fully connected Power BI dashboards for small and medium businesses. We connect your data sources, build custom KPI views, and train your team to use them. The NIXRIX Intelligence package covers this service.' },
    },
    {
      '@type': 'Question',
      name: 'How long does a website take to build?',
      acceptedAnswer: { '@type': 'Answer', text: 'A landing page can be live within days. A full business website typically takes 2 to 4 weeks depending on scope and content readiness. We always agree a clear timeline before starting.' },
    },
  ],
}

export const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'NIXRIX Digital Systems and Automation',
  url: 'https://nixrix.com',
  telephone: '+44-7492-712144',
  email: 'info@nixrix.com',
  provider: { '@type': 'Organization', name: 'NIXRIX', url: 'https://nixrix.com' },
  serviceType: [
    'Web Design',
    'Business Automation',
    'CRM Implementation',
    'Digital Marketing',
    'Power BI Dashboards',
    'Custom Software Development',
    'SEO',
  ],
  areaServed: [
    { '@type': 'Country', name: 'United Kingdom' },
    { '@type': 'Country', name: 'United States' },
    { '@type': 'Country', name: 'United Arab Emirates' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'NIXRIX Services',
    itemListElement: [
      { '@type': 'Offer', name: 'Website Design and Build', description: 'Custom responsive websites built to convert visitors into leads', price: 'From £200' },
      { '@type': 'Offer', name: 'Business Automation', description: 'HubSpot CRM and Make.com workflow automation' },
      { '@type': 'Offer', name: 'Power BI Dashboard', description: 'Live data dashboards connected to your business systems' },
      { '@type': 'Offer', name: 'Digital Marketing', description: 'SEO, Google Ads, Meta Ads and social media management' },
    ],
  },
}

export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: item.url,
  })),
})

export const articleSchema = (title: string, description: string, url: string, date: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: title,
  description,
  url,
  datePublished: date,
  dateModified: date,
  author: { '@type': 'Organization', name: 'NIXRIX', url: 'https://nixrix.com' },
  publisher: {
    '@type': 'Organization',
    name: 'NIXRIX',
    url: 'https://nixrix.com',
    logo: { '@type': 'ImageObject', url: 'https://nixrix.com/nixrix-logo.svg' },
  },
})

export const pageMeta = {
  home: {
    title: 'NIXRIX — Digital Systems & Automation Company | Leeds, UK',
    description: 'NIXRIX is a Leeds-based digital agency specialising in web design, business automation, CRM, Power BI dashboards and digital marketing. Helping businesses across the UK, US and UAE grow faster.',
  },
  services: {
    title: 'Digital Services — Web Design, Automation, CRM, SEO | NIXRIX Leeds',
    description: 'Explore NIXRIX services: custom website design, HubSpot CRM setup, Make.com business automation, Power BI dashboards, social media management and SEO. Based in Leeds, UK.',
  },
  about: {
    title: 'About NIXRIX — Digital Systems & Automation Agency | Leeds',
    description: 'NIXRIX is a team of strategists, designers, developers and automation specialists based in Leeds. We build digital systems that help ambitious businesses grow.',
  },
  contact: {
    title: 'Contact NIXRIX — Book a Free Discovery Call | Leeds Digital Agency',
    description: 'Get in touch with NIXRIX. Book a free 30-minute discovery call, email info@nixrix.com or call +44 7492 712144. We respond within 24 hours.',
  },
  work: {
    title: 'Our Work — Web Design & Automation Projects | NIXRIX',
    description: 'See how NIXRIX has helped businesses with AI booking automation, HR workflow automation, and custom digital systems. Real projects, real results.',
  },
  blog: {
    title: 'Digital Insights & Business Growth Blog | NIXRIX Leeds',
    description: 'Practical guides on web design, business automation, SEO, CRM and data dashboards from the NIXRIX team. Helping UK businesses grow digitally.',
  },
  howWeWork: {
    title: 'How We Work — Our Process | NIXRIX Digital Agency Leeds',
    description: 'See how NIXRIX delivers projects: discovery call, strategy, design and build, launch and ongoing support. Clear process, no surprises.',
  },
  caseStudies: {
    title: 'Case Studies — Real Results for Real Businesses | NIXRIX',
    description: 'Deep dives into how NIXRIX has helped businesses automate operations, generate leads and grow digitally. Read about Theyyam and Roster Care.',
  },
}
