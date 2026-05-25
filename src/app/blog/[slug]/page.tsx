import Link from 'next/link'

const posts: Record<string, { title: string; tag: string; date: string; readTime: string; content: string[] }> = {
  'why-your-website-is-losing-customers': {
    title: 'Why Your Website Is Losing You Customers',
    tag: 'Web Design', date: 'May 2025', readTime: '4 min read',
    content: [
      'Most business websites exist. Very few actually work.',
      'If your site looks fine but is not generating enquiries, the problem is almost never the design. It is the strategy behind it.',
      'The three most common reasons websites fail to convert are no clear call to action, too much information, and slow loading speed.',
      'A one-second delay in load time can reduce conversions by 7%. Most small business websites load in 4 to 8 seconds.',
      'A converting website does three things well. It loads fast, communicates clearly, and makes it easy to take the next step.',
      'At NIXRIX we build every website around these principles. Not just design, but conversion architecture.',
      'If your website is not generating leads, book a free call and we will tell you exactly what is holding it back.',
    ],
  },
  '5-processes-you-should-automate': {
    title: '5 Business Processes You Should Automate Right Now',
    tag: 'Automation', date: 'Apr 2025', readTime: '5 min read',
    content: [
      'Every hour your team spends on manual work is an hour not spent on growth.',
      '1. Lead follow-up. The average business takes 47 hours to follow up with a new enquiry. Automated sequences can respond within minutes, every time.',
      '2. Invoice and payment chasing. Tools like HubSpot and Make.com can trigger reminders automatically based on due dates.',
      '3. Onboarding new clients. Sending welcome emails, sharing documents, scheduling calls. All of this can be triggered automatically the moment a new client is confirmed.',
      '4. Social media scheduling. Scheduling tools mean your content goes out on time without you thinking about it.',
      '5. Reporting and data collection. A connected dashboard does this in real time instead of manual copy and paste.',
      'NIXRIX builds automation systems that connect your tools, eliminate manual work, and give your team time back.',
    ],
  },
  'leeds-business-guide-to-google': {
    title: 'The Leeds Business Guide to Getting Found on Google',
    tag: 'SEO', date: 'Apr 2025', readTime: '5 min read',
    content: [
      'If someone in Leeds searches for what you do, are you showing up?',
      'For most local businesses the answer is no. Not because Google does not like them, but because they have not given Google what it needs.',
      'Start with Google Business Profile. This is free and the single highest-impact thing a local business can do. A complete verified profile gets you into the map results which appear above the organic results.',
      'Every page on your website should target one clear topic. Your homepage should mention Leeds naturally in the copy, the title tag, and the meta description.',
      'Google uses reviews as a trust signal for local rankings. Five new genuine reviews will do more for your visibility than most technical SEO changes.',
      'Getting mentioned on other Leeds websites, local directories, and chamber of commerce pages tells Google you are a real established local business.',
      'At NIXRIX we handle SEO for businesses across Leeds and the UK. We offer a free visibility audit as part of our discovery call.',
    ],
  },
  'what-is-a-crm': {
    title: 'What Is a CRM and Does Your Business Actually Need One?',
    tag: 'CRM', date: 'Mar 2025', readTime: '4 min read',
    content: [
      'CRM stands for Customer Relationship Management. At its simplest it is a system for tracking your leads, clients, and conversations in one place.',
      'Without a CRM most businesses manage clients through a mix of emails, spreadsheets, and memory. This works until it does not.',
      'You need a CRM when leads are falling through the cracks, follow-ups are being forgotten, or you have no clear view of your sales pipeline.',
      'HubSpot has a free tier that is genuinely useful for small businesses. It covers contact management, deal tracking, and basic automation.',
      'The real power of a CRM comes when it is connected to your website, your email, and your automation workflows. Everything in one place.',
      'NIXRIX sets up and configures HubSpot CRMs for businesses. We handle the setup, connect it to your website, and train your team.',
    ],
  },
  'power-bi-for-small-business': {
    title: 'Power BI for Small Business: What It Is and Why It Matters',
    tag: 'Data', date: 'Mar 2025', readTime: '4 min read',
    content: [
      'Power BI is a business intelligence tool from Microsoft that turns your data into visual dashboards.',
      'Most small businesses have data sitting in spreadsheets, accounting tools, CRMs, and website analytics. Power BI connects all of these into one live view.',
      'Instead of spending hours pulling reports manually you open a dashboard and see exactly what is happening in your business right now.',
      'Common uses include sales pipeline tracking, website performance, financial reporting, and operational KPIs.',
      'The dashboard updates automatically as your data changes. No manual work, no outdated reports.',
      'NIXRIX builds Power BI dashboards connected to your existing data sources. We handle the technical setup and train your team to use it.',
    ],
  },
  'how-to-brief-a-web-designer': {
    title: 'How to Brief a Web Designer and Get What You Actually Want',
    tag: 'Web Design', date: 'Feb 2025', readTime: '3 min read',
    content: [
      'A bad brief leads to a bad website. Most client disappointment comes from unclear expectations at the start, not poor execution.',
      'Before briefing a designer be clear on who your target customer is, what action you want visitors to take, and what makes you different.',
      'Share examples of websites you like and dislike. Explaining why is more useful than the examples themselves.',
      'Be clear about your brand. If you have a logo, colours, and fonts, share them. If you do not, say that upfront so the designer can factor in brand work.',
      'Set a realistic timeline. Good websites take time. Rushing the process almost always leads to compromises you will regret.',
      'At NIXRIX we guide every client through a proper discovery process before any design work begins. This saves time, reduces revisions, and delivers better results.',
    ],
  },
}

export function generateStaticParams() {
  return Object.keys(posts).map(slug => ({ slug }))
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = posts[params.slug]

  if (!post) {
    return (
      <section style={{ background: '#fff', paddingTop: '140px', padding: '140px 1.5rem 6rem', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'Sora,sans-serif', fontWeight: 800, fontSize: '2rem', color: '#0d1b2a', marginBottom: '1rem' }}>Post not found</h1>
        <Link href="/blog" style={{ color: 'var(--red)', fontFamily: 'Inter,sans-serif', fontWeight: 600, textDecoration: 'none' }}>← Back to Blog</Link>
      </section>
    )
  }

  return (
    <>
      {/* Header */}
      <section style={{ background: '#fff', paddingTop: '120px', paddingBottom: '40px', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <Link href="/blog" style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.82rem', color: 'var(--red)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '2rem', textDecoration: 'none' }}>
            ← Back to Blog
          </Link>
          <span style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.68rem', fontWeight: 700, color: 'var(--red)', letterSpacing: '0.12em', textTransform: 'uppercase', background: 'rgba(249,8,8,0.08)', padding: '0.2rem 0.7rem', borderRadius: '50px', display: 'inline-block', marginBottom: '1.5rem' }}>
            {post.tag}
          </span>
          <h1 style={{ fontFamily: 'Sora,sans-serif', fontWeight: 800, fontSize: 'clamp(1.8rem,5vw,3rem)', color: '#0d1b2a', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: '1rem' }}>
            {post.title}
          </h1>
          <div style={{ display: 'flex', gap: '1.5rem', fontFamily: 'Inter,sans-serif', fontSize: '0.8rem', color: '#aaa', paddingBottom: '2rem', borderBottom: '2px solid #ede9e3' }}>
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section style={{ background: '#fff', padding: '3rem 1.5rem 6rem' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          {post.content.map((para, i) => (
            <p key={i} style={{ fontFamily: 'Inter,sans-serif', fontSize: '1rem', color: '#555', lineHeight: 1.9, fontWeight: 300, marginBottom: '1.4rem' }}>
              {para}
            </p>
          ))}

          {/* CTA */}
          <div style={{ marginTop: '4rem', background: '#0d1b2a', borderRadius: '16px', padding: '2.5rem', textAlign: 'center' }}>
            <h3 style={{ fontFamily: 'Sora,sans-serif', fontWeight: 700, fontSize: '1.4rem', color: 'white', marginBottom: '0.8rem' }}>
              Ready to take action?
            </h3>
            <p style={{ fontFamily: 'Inter,sans-serif', fontWeight: 300, color: 'rgba(255,255,255,0.75)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              Book a free call and we will tell you exactly what your business needs.
            </p>
            <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--red)', color: 'white', padding: '0.9rem 2rem', fontFamily: 'Inter,sans-serif', fontWeight: 600, fontSize: '0.9rem', borderRadius: '50px', boxShadow: '0 4px 20px rgba(249,8,8,0.3)', textDecoration: 'none', minHeight: '52px' }}>
              Book Free Call →
            </Link>
          </div>

          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <Link href="/blog" style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.85rem', color: '#aaa', textDecoration: 'none' }}>
              ← Back to all articles
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
