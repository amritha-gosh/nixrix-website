'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

const sections = [
  { id: 'acceptance', label: 'Acceptance of terms' },
  { id: 'services', label: 'Our services' },
  { id: 'enquiries', label: 'Enquiries and proposals' },
  { id: 'intellectual-property', label: 'Intellectual property' },
  { id: 'acceptable-use', label: 'Acceptable use' },
  { id: 'disclaimers', label: 'Disclaimers' },
  { id: 'liability', label: 'Limitation of liability' },
  { id: 'third-party', label: 'Third party links' },
  { id: 'changes', label: 'Changes to these terms' },
  { id: 'governing-law', label: 'Governing law' },
  { id: 'contact', label: 'Contact us' },
]

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState('acceptance')
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
    <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
      {sections.map(({ id, label }) => (
        <button key={id} onClick={() => scrollTo(id)} style={{
          display: 'block', width: '100%', textAlign: 'left', background: 'none',
          borderLeft: activeSection === id ? '2px solid #f90808' : '2px solid transparent',
          padding: '7px 10px', fontSize: '0.82rem',
          color: activeSection === id ? '#f90808' : '#6b6256',
          fontWeight: activeSection === id ? 600 : 400,
          cursor: 'pointer', transition: 'all 0.15s',
          fontFamily: 'Inter,sans-serif', lineHeight: 1.4,
        }}>
          {label}
        </button>
      ))}
    </nav>
  )

  const sectionStyle: React.CSSProperties = { marginBottom: '48px', scrollMarginTop: '100px' }
  const h2Style: React.CSSProperties = { fontFamily: 'Sora,sans-serif', fontSize: '1.2rem', fontWeight: 700, color: '#0d1b2a', margin: '0 0 16px', paddingBottom: '12px', borderBottom: '2px solid #e8e4df' }
  const pStyle: React.CSSProperties = { fontSize: '0.95rem', lineHeight: 1.8, color: '#3a3530', margin: '0 0 12px', fontFamily: 'Inter,sans-serif', fontWeight: 300 }
  const liStyle: React.CSSProperties = { fontSize: '0.95rem', lineHeight: 1.8, color: '#3a3530', marginBottom: '4px', fontFamily: 'Inter,sans-serif', fontWeight: 300 }
  const linkStyle: React.CSSProperties = { color: '#f90808', textDecoration: 'none', fontWeight: 500 }
  const thStyle: React.CSSProperties = { background: '#0d1b2a', color: '#f7f5f2', fontWeight: 600, padding: '11px 14px', textAlign: 'left', fontFamily: 'Sora,sans-serif', fontSize: '0.8rem', letterSpacing: '0.04em' }
  const tdStyle: React.CSSProperties = { padding: '10px 14px', color: '#3a3530', borderBottom: '1px solid #ede9e3', lineHeight: 1.6, verticalAlign: 'top', fontSize: '0.9rem', fontFamily: 'Inter,sans-serif' }

  return (
    <>
      {/* Hero */}
      <section style={{ background: '#0d1b2a', padding: '96px 1.5rem 48px' }}>
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          <span style={{ display: 'inline-block', background: '#f90808', color: 'white', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', padding: '4px 10px', borderRadius: '3px', marginBottom: '16px', fontFamily: 'Sora,sans-serif' }}>LEGAL</span>
          <h1 style={{ fontFamily: 'Sora,sans-serif', fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 800, color: 'white', margin: '0 0 16px', lineHeight: 1.15 }}>Terms of Use</h1>
          <p style={{ color: 'rgba(247,245,242,0.8)', fontSize: '1rem', lineHeight: 1.75, margin: '0 0 28px', fontWeight: 300, fontFamily: 'Inter,sans-serif', maxWidth: '640px' }}>
            These terms govern your use of the NIXRIX website. By using nixrix.com you agree to these terms. Please read them carefully.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '16px 20px', marginBottom: '28px' }}>
            {[
              { label: 'First published', value: '12 December 2025' },
              { label: 'Last updated', value: '25 May 2026' },
              { label: 'Questions', value: 'info@nixrix.com', href: 'mailto:info@nixrix.com' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '2px', paddingRight: '24px' }}>
                <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', color: 'rgba(247,245,242,0.5)', textTransform: 'uppercase', fontFamily: 'Inter,sans-serif' }}>{item.label}</span>
                {item.href
                  ? <a href={item.href} style={{ fontSize: '0.9rem', color: '#f90808', textDecoration: 'none', fontFamily: 'Inter,sans-serif' }}>{item.value}</a>
                  : <span style={{ fontSize: '0.9rem', color: '#f7f5f2', fontFamily: 'Inter,sans-serif' }}>{item.value}</span>
                }
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <Link href="/privacy" style={{ background: '#f90808', color: 'white', padding: '11px 22px', borderRadius: '6px', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none', fontFamily: 'Inter,sans-serif' }}>Privacy Notice</Link>
            <Link href="/cookies" style={{ background: 'transparent', color: '#f7f5f2', padding: '11px 22px', borderRadius: '6px', fontWeight: 500, fontSize: '0.9rem', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.25)', fontFamily: 'Inter,sans-serif' }}>Cookie Policy</Link>
          </div>
        </div>
      </section>

      {/* Mobile TOC */}
      <div style={{ background: 'white', borderBottom: '1px solid #e8e4df', padding: '0 1.5rem' }}>
        <button onClick={() => setTocOpen(!tocOpen)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', background: 'none', border: 'none', fontSize: '0.9rem', fontWeight: 600, color: '#0d1b2a', cursor: 'pointer', fontFamily: 'Inter,sans-serif' }}>
          <span>On this page</span>
          <span style={{ transform: tocOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', display: 'inline-block' }}>▾</span>
        </button>
        {tocOpen && <div style={{ paddingBottom: '12px' }}>{toc}</div>}
      </div>

      {/* Main layout */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 1.5rem 80px', display: 'grid', gridTemplateColumns: '220px 1fr', gap: '48px', alignItems: 'start' }}>

        {/* Desktop TOC */}
        <aside style={{ position: 'sticky', top: '100px' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6b6256', margin: '0 0 12px', fontFamily: 'Sora,sans-serif' }}>On this page</p>
          {toc}
        </aside>

        {/* Article */}
        <article style={{ maxWidth: '760px' }}>

          <section id="acceptance" style={sectionStyle}>
            <h2 style={h2Style}>1. Acceptance of terms</h2>
            <p style={pStyle}>By accessing or using the NIXRIX website at nixrix.com, you agree to be bound by these Terms of Use. If you do not agree, please do not use this website.</p>
            <p style={pStyle}>These terms apply to all visitors, enquirers and users of the website. Separate written agreements govern any services provided by NIXRIX LTD to clients.</p>
          </section>

          <section id="services" style={sectionStyle}>
            <h2 style={h2Style}>2. Our services</h2>
            <p style={pStyle}>NIXRIX LTD is a digital systems and automation company based in Leeds, United Kingdom. Our website provides information about our services, allows you to submit enquiries and enables you to contact our team.</p>
            <p style={pStyle}>The content on this website is provided for general information purposes only. It does not constitute professional advice. For specific guidance relating to your business, please contact us directly.</p>
          </section>

          <section id="enquiries" style={sectionStyle}>
            <h2 style={h2Style}>3. Enquiries and proposals</h2>
            <p style={pStyle}>Submitting an enquiry form or booking a discovery call does not create a contract between you and NIXRIX LTD. A binding agreement is only formed when both parties have signed a written proposal, statement of work or service agreement.</p>
            <p style={pStyle}>We aim to respond to all enquiries within 24 hours on working days. We reserve the right to decline any enquiry or project at our discretion.</p>
          </section>

          <section id="intellectual-property" style={sectionStyle}>
            <h2 style={h2Style}>4. Intellectual property</h2>
            <p style={pStyle}>All content on this website, including text, graphics, logos, images and software, is the property of NIXRIX LTD or its licensors and is protected by applicable intellectual property law.</p>
            <p style={pStyle}>You may view and print content from this website for your own personal, non-commercial use. You may not reproduce, distribute, modify or use any content from this website for commercial purposes without our prior written permission.</p>
            <p style={pStyle}>The NIXRIX name, logo and brand marks are registered or unregistered trademarks of NIXRIX LTD. Nothing on this website grants any licence to use them.</p>
          </section>

          <section id="acceptable-use" style={sectionStyle}>
            <h2 style={h2Style}>5. Acceptable use</h2>
            <p style={pStyle}>When using our website, you agree not to:</p>
            <ul style={{ margin: '0 0 12px', paddingLeft: '20px' }}>
              {[
                'use the website in any way that breaches applicable law or regulation',
                'submit false, misleading or fraudulent information through any form',
                'attempt to gain unauthorised access to any part of the website or its systems',
                'transmit any unsolicited or unauthorised advertising or promotional material',
                'use automated tools to scrape, crawl or extract data from the website without permission',
                'upload or transmit any material that contains viruses or other malicious code',
              ].map((item, i) => (
                <li key={i} style={liStyle}>{item};</li>
              ))}
            </ul>
          </section>

          <section id="disclaimers" style={sectionStyle}>
            <h2 style={h2Style}>6. Disclaimers</h2>
            <p style={pStyle}>The content on this website is provided on an as-is basis without warranties of any kind, whether express or implied, including warranties of merchantability, fitness for a particular purpose or non-infringement.</p>
            <p style={pStyle}>While we take reasonable steps to keep the website content accurate and up to date, we make no representations or warranties that the information is complete, current or free from errors. We may update or remove content at any time without notice.</p>
            <p style={pStyle}>We do not warrant that the website will be uninterrupted, error-free or free from viruses or other harmful components.</p>
          </section>

          <section id="liability" style={sectionStyle}>
            <h2 style={h2Style}>7. Limitation of liability</h2>
            <p style={pStyle}>To the fullest extent permitted by law, NIXRIX LTD excludes all liability for any direct, indirect, incidental or consequential loss or damage arising from your use of this website or reliance on its content.</p>
            <p style={pStyle}>Nothing in these terms limits or excludes liability for death or personal injury caused by negligence, fraud or any other liability that cannot be excluded under applicable law.</p>
          </section>

          <section id="third-party" style={sectionStyle}>
            <h2 style={h2Style}>8. Third party links</h2>
            <p style={pStyle}>Our website may contain links to third-party websites. These links are provided for your convenience only. We have no control over the content of those websites and accept no responsibility for them or for any loss or damage that may arise from your use of them.</p>
            <p style={pStyle}>Linking to a third-party website does not imply any endorsement or recommendation by NIXRIX LTD.</p>
          </section>

          <section id="changes" style={sectionStyle}>
            <h2 style={h2Style}>9. Changes to these terms</h2>
            <p style={pStyle}>We may revise these Terms of Use at any time by updating this page. Please check this page periodically to review the current terms. Your continued use of the website after any changes constitutes your acceptance of the revised terms.</p>
          </section>

          <section id="governing-law" style={sectionStyle}>
            <h2 style={h2Style}>10. Governing law</h2>
            <p style={pStyle}>These Terms of Use are governed by and construed in accordance with the laws of England and Wales. Any disputes arising from these terms or your use of this website shall be subject to the exclusive jurisdiction of the courts of England and Wales.</p>
          </section>

          <section id="contact" style={sectionStyle}>
            <h2 style={h2Style}>11. Contact us</h2>
            <p style={pStyle}>If you have any questions about these terms, please contact us:</p>
            <div style={{ overflowX: 'auto', margin: '16px 0 20px', borderRadius: '8px', border: '1px solid #e0dbd4' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white' }}>
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
          <div style={{ display: 'flex', gap: '16px', marginTop: '48px', paddingTop: '32px', borderTop: '1px solid #e8e4df', flexWrap: 'wrap' }}>
            {[
              { href: '/privacy', label: 'Privacy Notice' },
              { href: '/cookies', label: 'Cookie Policy' },
            ].map((item, i) => (
              <Link key={i} href={item.href} style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '16px 20px', background: 'white', border: '1px solid #e0dbd4', borderRadius: '8px', textDecoration: 'none', minWidth: '160px' }}>
                <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', color: '#f90808', fontFamily: 'Sora,sans-serif' }}>LEGAL</span>
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0d1b2a', fontFamily: 'Sora,sans-serif' }}>{item.label} →</span>
              </Link>
            ))}
          </div>

        </article>
      </div>
    </>
  )
}
