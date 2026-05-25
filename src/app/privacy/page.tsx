'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

const sections = [
  { id: 'who-we-are', label: 'Who we are' },
  { id: 'when-applies', label: 'When this notice applies' },
  { id: 'information-collected', label: 'Information we collect' },
  { id: 'how-we-use', label: 'How we use your information' },
  { id: 'contact-forms', label: 'Contact forms and enquiries' },
  { id: 'cookies-analytics', label: 'Cookies and analytics' },
  { id: 'sharing', label: 'Who we share information with' },
  { id: 'international', label: 'International transfers' },
  { id: 'retention', label: 'How long we keep information' },
  { id: 'security', label: 'How we protect information' },
  { id: 'your-rights', label: 'Your data protection rights' },
  { id: 'marketing', label: 'Marketing communications' },
  { id: 'complaints', label: 'Complaints' },
  { id: 'changes', label: 'Changes to this notice' },
  { id: 'contact-us', label: 'Contact us' },
]

export default function PrivacyPage() {
  const [activeSection, setActiveSection] = useState('who-we-are')
  const [tocOpen, setTocOpen] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-20% 0px -70% 0px' }
    )
    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observerRef.current?.observe(el)
    })
    return () => observerRef.current?.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 100
      window.scrollTo({ top, behavior: 'smooth' })
    }
    setTocOpen(false)
  }

  const toc = (
    <nav style={{ display:'flex', flexDirection:'column', gap:'2px' }}>
      {sections.map(({ id, label }) => (
        <button key={id} onClick={() => scrollTo(id)} style={{
          display:'block', width:'100%', textAlign:'left', background:'none',
          borderLeft: activeSection === id ? '2px solid #f90808' : '2px solid transparent',
          padding:'7px 10px', fontSize:'0.82rem',
          color: activeSection === id ? '#f90808' : '#6b6256',
          fontWeight: activeSection === id ? 600 : 400,
          cursor:'pointer', transition:'all 0.15s',
          fontFamily:'Inter,sans-serif', lineHeight:1.4,
        }}>
          {label}
        </button>
      ))}
    </nav>
  )

  const sectionStyle: React.CSSProperties = {
    marginBottom:'48px', scrollMarginTop:'100px',
  }
  const h2Style: React.CSSProperties = {
    fontFamily:'Sora,sans-serif', fontSize:'1.2rem', fontWeight:700,
    color:'#0d1b2a', margin:'0 0 16px', paddingBottom:'12px',
    borderBottom:'2px solid #e8e4df',
  }
  const pStyle: React.CSSProperties = {
    fontSize:'0.95rem', lineHeight:1.8, color:'#3a3530', margin:'0 0 12px',
    fontFamily:'Inter,sans-serif', fontWeight:300,
  }
  const liStyle: React.CSSProperties = {
    fontSize:'0.95rem', lineHeight:1.8, color:'#3a3530',
    marginBottom:'4px', fontFamily:'Inter,sans-serif', fontWeight:300,
  }
  const linkStyle: React.CSSProperties = {
    color:'#f90808', textDecoration:'none', fontWeight:500,
  }
  const thStyle: React.CSSProperties = {
    background:'#0d1b2a', color:'#f7f5f2', fontWeight:600,
    padding:'11px 14px', textAlign:'left',
    fontFamily:'Sora,sans-serif', fontSize:'0.8rem', letterSpacing:'0.04em',
  }
  const tdStyle: React.CSSProperties = {
    padding:'10px 14px', color:'#3a3530', borderBottom:'1px solid #ede9e3',
    lineHeight:1.6, verticalAlign:'top', fontSize:'0.9rem',
    fontFamily:'Inter,sans-serif',
  }

  return (
    <>
      {/* Hero */}
      <section style={{ background:'#0d1b2a', padding:'96px 1.5rem 48px' }}>
        <div style={{ maxWidth:'780px', margin:'0 auto' }}>
          <span style={{ display:'inline-block', background:'#f90808', color:'white', fontSize:'11px', fontWeight:700, letterSpacing:'0.12em', padding:'4px 10px', borderRadius:'3px', marginBottom:'16px', fontFamily:'Sora,sans-serif' }}>LEGAL</span>
          <h1 style={{ fontFamily:'Sora,sans-serif', fontSize:'clamp(2rem,5vw,3rem)', fontWeight:800, color:'white', margin:'0 0 16px', lineHeight:1.15 }}>Privacy Notice</h1>
          <p style={{ color:'rgba(247,245,242,0.8)', fontSize:'1rem', lineHeight:1.75, margin:'0 0 28px', fontWeight:300, fontFamily:'Inter,sans-serif', maxWidth:'640px' }}>
            Your trust matters to us. This notice explains how NIXRIX collects, uses and protects your personal information when you visit our website, contact our team or enquire about our services.
          </p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:'16px', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'8px', padding:'16px 20px', marginBottom:'28px' }}>
            {[
              { label:'First published', value:'12 December 2025' },
              { label:'Last updated', value:'25 May 2026' },
              { label:'Privacy contact', value:'info@nixrix.com', href:'mailto:info@nixrix.com' },
            ].map((item, i) => (
              <div key={i} style={{ display:'flex', flexDirection:'column', gap:'2px', paddingRight:'24px' }}>
                <span style={{ fontSize:'11px', fontWeight:600, letterSpacing:'0.08em', color:'rgba(247,245,242,0.5)', textTransform:'uppercase', fontFamily:'Inter,sans-serif' }}>{item.label}</span>
                {item.href
                  ? <a href={item.href} style={{ fontSize:'0.9rem', color:'#f90808', textDecoration:'none', fontFamily:'Inter,sans-serif' }}>{item.value}</a>
                  : <span style={{ fontSize:'0.9rem', color:'#f7f5f2', fontFamily:'Inter,sans-serif' }}>{item.value}</span>
                }
              </div>
            ))}
          </div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:'12px' }}>
            <a href="mailto:info@nixrix.com" style={{ background:'#f90808', color:'white', padding:'11px 22px', borderRadius:'6px', fontWeight:600, fontSize:'0.9rem', textDecoration:'none', fontFamily:'Inter,sans-serif' }}>Contact us about privacy</a>
            <Link href="/cookies" style={{ background:'transparent', color:'#f7f5f2', padding:'11px 22px', borderRadius:'6px', fontWeight:500, fontSize:'0.9rem', textDecoration:'none', border:'1px solid rgba(255,255,255,0.25)', fontFamily:'Inter,sans-serif' }}>View Cookie Policy</Link>
          </div>
        </div>
      </section>

      {/* Mobile TOC */}
      <div style={{ background:'white', borderBottom:'1px solid #e8e4df', padding:'0 1.5rem', display:'block' }}>
        <button onClick={() => setTocOpen(!tocOpen)} style={{ width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 0', background:'none', border:'none', fontSize:'0.9rem', fontWeight:600, color:'#0d1b2a', cursor:'pointer', fontFamily:'Inter,sans-serif' }}>
          <span>On this page</span>
          <span style={{ transform: tocOpen ? 'rotate(180deg)' : 'none', transition:'transform 0.2s', display:'inline-block' }}>▾</span>
        </button>
        {tocOpen && (
          <div style={{ paddingBottom:'12px' }}>{toc}</div>
        )}
      </div>

      {/* Main layout */}
      <div style={{ maxWidth:'1100px', margin:'0 auto', padding:'48px 1.5rem 80px', display:'grid', gridTemplateColumns:'220px 1fr', gap:'48px', alignItems:'start' }}>

        {/* Desktop TOC */}
        <aside style={{ position:'sticky', top:'100px' }}>
          <p style={{ fontSize:'11px', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'#6b6256', margin:'0 0 12px', fontFamily:'Sora,sans-serif' }}>On this page</p>
          {toc}
        </aside>

        {/* Article */}
        <article style={{ maxWidth:'760px' }}>

          <section id="who-we-are" style={sectionStyle}>
            <h2 style={h2Style}>1. Who we are</h2>
            <p style={pStyle}>NIXRIX LTD is a digital systems and automation company based in Leeds, United Kingdom. We help businesses improve their digital presence, streamline operations and use technology more effectively.</p>
            <p style={pStyle}>For data protection purposes, NIXRIX LTD is the data controller responsible for deciding how and why your personal information is used.</p>
            <div style={{ overflowX:'auto', margin:'16px 0 20px', borderRadius:'8px', border:'1px solid #e0dbd4' }}>
              <table style={{ width:'100%', borderCollapse:'collapse', background:'white', fontSize:'0.9rem' }}>
                <thead><tr><th style={thStyle}>Company detail</th><th style={thStyle}>Information</th></tr></thead>
                <tbody>
                  {[
                    ['Legal name', 'NIXRIX LTD'],
                    ['Company number', '16841804'],
                    ['Registered office', 'Virtual office address — to be updated'],
                    ['Email', 'info@nixrix.com'],
                    ['Telephone', '+44 7492 712144'],
                  ].map(([label, value], i) => (
                    <tr key={i}><td style={tdStyle}>{label}</td><td style={tdStyle}>{value}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="when-applies" style={sectionStyle}>
            <h2 style={h2Style}>2. When this notice applies</h2>
            <p style={pStyle}>This Privacy Notice applies when you:</p>
            <ul style={{ margin:'0 0 12px', paddingLeft:'20px' }}>
              {['visit the NIXRIX website','complete a contact or enquiry form','book or request a discovery call','contact us by email, telephone or social media','enquire about, purchase or receive our services','choose to receive marketing communications'].map((item, i) => (
                <li key={i} style={liStyle}>{item};</li>
              ))}
            </ul>
            <p style={pStyle}>This notice does not cover third-party websites linked from our website. Those websites have their own privacy notices.</p>
          </section>

          <section id="information-collected" style={sectionStyle}>
            <h2 style={h2Style}>3. Information we may collect</h2>
            <p style={pStyle}>The information we collect depends on how you interact with NIXRIX.</p>
            <div style={{ overflowX:'auto', margin:'16px 0 20px', borderRadius:'8px', border:'1px solid #e0dbd4' }}>
              <table style={{ width:'100%', borderCollapse:'collapse', background:'white' }}>
                <thead><tr><th style={thStyle}>Category</th><th style={thStyle}>Examples</th></tr></thead>
                <tbody>
                  {[
                    ['Contact details', 'Name, email address and telephone number.'],
                    ['Business information', 'Business name, role, industry and service interests.'],
                    ['Enquiry content', 'Information supplied in forms, emails, calls or discovery discussions.'],
                    ['Client and project records', 'Proposals, contracts, project correspondence, invoices and service history.'],
                    ['Website and device data', 'IP address, device and browser information, pages viewed and cookie choices.'],
                    ['Marketing preferences', 'Subscription, consent and unsubscribe records.'],
                  ].map(([cat, ex], i) => (
                    <tr key={i}><td style={{...tdStyle, fontWeight:500}}>{cat}</td><td style={tdStyle}>{ex}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="how-we-use" style={sectionStyle}>
            <h2 style={h2Style}>4. How we use your information</h2>
            <p style={pStyle}>We only use personal information where we have an appropriate reason under data protection law.</p>
            <div style={{ overflowX:'auto', margin:'16px 0 20px', borderRadius:'8px', border:'1px solid #e0dbd4' }}>
              <table style={{ width:'100%', borderCollapse:'collapse', background:'white' }}>
                <thead><tr><th style={thStyle}>Purpose</th><th style={thStyle}>Lawful basis</th></tr></thead>
                <tbody>
                  {[
                    ['Respond to enquiries and discovery-call requests', 'Legitimate interests; steps before entering a contract'],
                    ['Prepare proposals or recommendations', 'Steps before entering a contract; legitimate interests'],
                    ['Deliver and manage services', 'Contract; legal obligation where applicable'],
                    ['Manage invoicing and business records', 'Legal obligation; legitimate interests'],
                    ['Understand and improve website performance', 'Consent where non-essential cookies are used'],
                    ['Send requested marketing communications', 'Consent or legitimate interests where permitted'],
                    ['Protect our website and business', 'Legitimate interests'],
                  ].map(([purpose, basis], i) => (
                    <tr key={i}><td style={tdStyle}>{purpose}</td><td style={tdStyle}>{basis}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="contact-forms" style={sectionStyle}>
            <h2 style={h2Style}>5. Contact forms and enquiries</h2>
            <p style={pStyle}>When you send an enquiry through our website, we may collect your name, email address, telephone number, business name, selected service area and the details included in your message.</p>
            <p style={pStyle}>We use this information to understand your request, respond to you and maintain a record of our communication. Enquiry emails are processed and delivered using Resend, a transactional email service. Submitting an enquiry form does not automatically subscribe you to marketing messages.</p>
          </section>

          <section id="cookies-analytics" style={sectionStyle}>
            <h2 style={h2Style}>6. Cookies and analytics</h2>
            <p style={pStyle}>Our website uses cookies and similar technologies to enable website functionality and, where you choose, to help us understand performance through Google Analytics.</p>
            <div style={{ overflowX:'auto', margin:'16px 0 20px', borderRadius:'8px', border:'1px solid #e0dbd4' }}>
              <table style={{ width:'100%', borderCollapse:'collapse', background:'white' }}>
                <thead><tr><th style={thStyle}>Type</th><th style={thStyle}>Purpose</th><th style={thStyle}>Consent</th></tr></thead>
                <tbody>
                  {[
                    ['Essential', 'Allow core website functions and security.', 'Not required'],
                    ['Preference', 'Remember settings or choices.', 'Required where implemented'],
                    ['Analytics', 'Measure visits via Google Analytics.', 'Only after your consent'],
                    ['Advertising', 'Measure campaigns where implemented.', 'Only after your consent'],
                  ].map(([type, purpose, consent], i) => (
                    <tr key={i}><td style={{...tdStyle, fontWeight:500}}>{type}</td><td style={tdStyle}>{purpose}</td><td style={tdStyle}>{consent}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={pStyle}>For full details, see our <Link href="/cookies" style={linkStyle}>Cookie Policy</Link>.</p>
          </section>

          <section id="sharing" style={sectionStyle}>
            <h2 style={h2Style}>7. Who we share information with</h2>
            <p style={pStyle}>We do not sell personal information. We may share information with trusted service providers where necessary to operate our website, communicate with you or deliver our services.</p>
            <div style={{ overflowX:'auto', margin:'16px 0 20px', borderRadius:'8px', border:'1px solid #e0dbd4' }}>
              <table style={{ width:'100%', borderCollapse:'collapse', background:'white' }}>
                <thead><tr><th style={thStyle}>Recipient</th><th style={thStyle}>Reason</th></tr></thead>
                <tbody>
                  {[
                    ['Vercel', 'To host, deploy and serve the NIXRIX website.'],
                    ['GoDaddy', 'To manage the nixrix.com domain and DNS.'],
                    ['Resend', 'To process and deliver enquiry and auto-reply emails.'],
                    ['Google Analytics', 'To measure website performance where consented.'],
                    ['Professional advisers', 'For legal, accounting or compliance support.'],
                    ['Regulators or authorities', 'Where disclosure is required by law.'],
                  ].map(([rec, reason], i) => (
                    <tr key={i}><td style={{...tdStyle, fontWeight:500}}>{rec}</td><td style={tdStyle}>{reason}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="international" style={sectionStyle}>
            <h2 style={h2Style}>8. International transfers</h2>
            <p style={pStyle}>Some of our technology providers, including Vercel and Google Analytics, may process personal information outside the United Kingdom. Where this applies, we take steps to ensure appropriate safeguards are in place, such as UK adequacy regulations or approved contractual protections.</p>
          </section>

          <section id="retention" style={sectionStyle}>
            <h2 style={h2Style}>9. How long we keep information</h2>
            <p style={pStyle}>We retain personal information only for as long as needed for the purpose it was collected, including business, legal and accounting requirements.</p>
            <div style={{ overflowX:'auto', margin:'16px 0 20px', borderRadius:'8px', border:'1px solid #e0dbd4' }}>
              <table style={{ width:'100%', borderCollapse:'collapse', background:'white' }}>
                <thead><tr><th style={thStyle}>Information type</th><th style={thStyle}>Retention period</th></tr></thead>
                <tbody>
                  {[
                    ['General enquiries not becoming projects', 'Up to 24 months after last communication.'],
                    ['Client and project records', 'Duration of relationship plus legal and accounting requirements.'],
                    ['Financial and invoice records', 'As required by UK tax and accounting rules (typically 6 years).'],
                    ['Marketing preferences', 'As long as necessary to respect preferences.'],
                    ['Analytics information', 'According to configured Google Analytics retention settings.'],
                  ].map(([type, period], i) => (
                    <tr key={i}><td style={tdStyle}>{type}</td><td style={tdStyle}>{period}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="security" style={sectionStyle}>
            <h2 style={h2Style}>10. How we protect information</h2>
            <p style={pStyle}>We use reasonable technical and organisational measures to protect personal information from unauthorised access, loss, misuse, alteration or disclosure. These include restricted access, account security controls, secure hosting via Vercel and use of trusted technology providers.</p>
            <p style={pStyle}>No transmission of information over the internet can be guaranteed to be completely secure.</p>
          </section>

          <section id="your-rights" style={sectionStyle}>
            <h2 style={h2Style}>11. Your data protection rights</h2>
            <p style={pStyle}>Depending on the circumstances, UK data protection law gives you rights to:</p>
            <ul style={{ margin:'0 0 12px', paddingLeft:'20px' }}>
              {[
                'ask for access to personal information we hold about you',
                'ask us to correct information that is inaccurate or incomplete',
                'ask us to delete your information in certain circumstances',
                'ask us to restrict the way we use your information in certain circumstances',
                'object to certain uses of your information, including direct marketing',
                'withdraw consent where our use relies on consent',
                'request portability of certain information where applicable',
              ].map((right, i) => (
                <li key={i} style={liStyle}>{right};</li>
              ))}
            </ul>
            <p style={pStyle}>To make a request, email <a href="mailto:info@nixrix.com" style={linkStyle}>info@nixrix.com</a>. We may ask for information to verify your identity before completing a request.</p>
          </section>

          <section id="marketing" style={sectionStyle}>
            <h2 style={h2Style}>12. Marketing communications</h2>
            <p style={pStyle}>Where you choose to receive marketing communications, we may send information about NIXRIX services, digital growth, automation or related insights. You may opt out at any time by using an unsubscribe option in a message or by emailing <a href="mailto:info@nixrix.com" style={linkStyle}>info@nixrix.com</a>.</p>
          </section>

          <section id="complaints" style={sectionStyle}>
            <h2 style={h2Style}>13. Complaints</h2>
            <p style={pStyle}>We would appreciate the opportunity to address any concern about our use of personal information. Please contact us at <a href="mailto:info@nixrix.com" style={linkStyle}>info@nixrix.com</a> in the first instance.</p>
            <p style={pStyle}>You also have the right to complain to the Information Commissioner&apos;s Office (ICO), the UK data protection regulator, at <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" style={linkStyle}>ico.org.uk</a> or on 0303 123 1113.</p>
          </section>

          <section id="changes" style={sectionStyle}>
            <h2 style={h2Style}>14. Changes to this notice</h2>
            <p style={pStyle}>We may update this Privacy Notice from time to time to reflect changes to our services, systems or legal responsibilities. Any revised version will be published on this page with an updated date.</p>
          </section>

          <section id="contact-us" style={sectionStyle}>
            <h2 style={h2Style}>15. Contact us</h2>
            <div style={{ overflowX:'auto', margin:'16px 0 20px', borderRadius:'8px', border:'1px solid #e0dbd4' }}>
              <table style={{ width:'100%', borderCollapse:'collapse', background:'white' }}>
                <thead><tr><th style={thStyle}>Detail</th><th style={thStyle}>Information</th></tr></thead>
                <tbody>
                  {[
                    ['Company', 'NIXRIX LTD'],
                    ['Company number', '16841804'],
                    ['Email', 'info@nixrix.com'],
                    ['Telephone', '+44 7492 712144'],
                    ['Registered office', 'Virtual office address — to be updated'],
                  ].map(([detail, info], i) => (
                    <tr key={i}><td style={tdStyle}>{detail}</td><td style={tdStyle}>{info}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Related links */}
          <div style={{ display:'flex', gap:'16px', marginTop:'48px', paddingTop:'32px', borderTop:'1px solid #e8e4df', flexWrap:'wrap' }}>
            {[
              { href:'/cookies', label:'Cookie Policy' },
              { href:'/terms', label:'Terms of Use' },
            ].map((item, i) => (
              <Link key={i} href={item.href} style={{ display:'flex', flexDirection:'column', gap:'4px', padding:'16px 20px', background:'white', border:'1px solid #e0dbd4', borderRadius:'8px', textDecoration:'none', minWidth:'160px' }}>
                <span style={{ fontSize:'10px', fontWeight:700, letterSpacing:'0.1em', color:'#f90808', fontFamily:'Sora,sans-serif' }}>LEGAL</span>
                <span style={{ fontSize:'0.9rem', fontWeight:600, color:'#0d1b2a', fontFamily:'Sora,sans-serif' }}>{item.label} →</span>
              </Link>
            ))}
          </div>

        </article>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .priv-desktop-toc { display: none !important; }
        }
        @media (min-width: 901px) {
          .priv-mobile-toc { display: none !important; }
        }
      `}</style>
    </>
  )
}
