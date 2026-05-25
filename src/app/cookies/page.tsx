'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

const sections = [
  { id: 'what-are-cookies', label: 'What are cookies' },
  { id: 'how-we-use', label: 'How we use cookies' },
  { id: 'types', label: 'Types of cookies we use' },
  { id: 'third-party', label: 'Third party cookies' },
  { id: 'your-choices', label: 'Your choices' },
  { id: 'changes', label: 'Changes to this policy' },
  { id: 'contact', label: 'Contact us' },
]

export default function CookiesPage() {
  const [activeSection, setActiveSection] = useState('what-are-cookies')
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
          <h1 style={{ fontFamily: 'Sora,sans-serif', fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 800, color: 'white', margin: '0 0 16px', lineHeight: 1.15 }}>Cookie Policy</h1>
          <p style={{ color: 'rgba(247,245,242,0.8)', fontSize: '1rem', lineHeight: 1.75, margin: '0 0 28px', fontWeight: 300, fontFamily: 'Inter,sans-serif', maxWidth: '640px' }}>
            This policy explains how NIXRIX uses cookies and similar technologies on nixrix.com, what choices you have, and how to manage your preferences.
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
            <Link href="/privacy" style={{ background: '#f90808', color: 'white', padding: '11px 22px', borderRadius: '6px', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none', fontFamily: 'Inter,sans-serif' }}>View Privacy Notice</Link>
            <a href="mailto:info@nixrix.com" style={{ background: 'transparent', color: '#f7f5f2', padding: '11px 22px', borderRadius: '6px', fontWeight: 500, fontSize: '0.9rem', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.25)', fontFamily: 'Inter,sans-serif' }}>Contact us</a>
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

          <section id="what-are-cookies" style={sectionStyle}>
            <h2 style={h2Style}>1. What are cookies</h2>
            <p style={pStyle}>Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work efficiently, remember your preferences and provide information to website owners about how their site is being used.</p>
            <p style={pStyle}>Similar technologies include local storage, session storage and pixel tags. This policy covers all of these where used on nixrix.com.</p>
          </section>

          <section id="how-we-use" style={sectionStyle}>
            <h2 style={h2Style}>2. How we use cookies</h2>
            <p style={pStyle}>NIXRIX uses cookies and similar technologies to:</p>
            <ul style={{ margin: '0 0 12px', paddingLeft: '20px' }}>
              {[
                'ensure the website functions correctly and securely',
                'remember your cookie consent choice',
                'understand how visitors use our website through Google Analytics, where you have consented',
                'measure the effectiveness of our content and identify areas for improvement',
              ].map((item, i) => (
                <li key={i} style={liStyle}>{item};</li>
              ))}
            </ul>
            <p style={pStyle}>We do not use cookies for advertising targeting or to sell your data to third parties.</p>
          </section>

          <section id="types" style={sectionStyle}>
            <h2 style={h2Style}>3. Types of cookies we use</h2>
            <div style={{ overflowX: 'auto', margin: '16px 0 20px', borderRadius: '8px', border: '1px solid #e0dbd4' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white' }}>
                <thead>
                  <tr>
                    <th style={thStyle}>Cookie type</th>
                    <th style={thStyle}>Purpose</th>
                    <th style={thStyle}>Consent required</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Essential', 'Required for the website to function. These enable navigation, security and basic features. They cannot be switched off.', 'No'],
                    ['Preference', 'Remember your choices such as cookie consent status so you are not asked repeatedly.', 'No for consent record; yes for others where implemented'],
                    ['Analytics', 'Google Analytics cookies measure how visitors interact with our website, which pages are most visited and how people arrived. This data is aggregated and anonymised.', 'Yes — only set after you accept optional cookies'],
                    ['Marketing', 'Not currently used on nixrix.com.', 'Not applicable'],
                  ].map(([type, purpose, consent], i) => (
                    <tr key={i}>
                      <td style={{ ...tdStyle, fontWeight: 500 }}>{type}</td>
                      <td style={tdStyle}>{purpose}</td>
                      <td style={tdStyle}>{consent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="third-party" style={sectionStyle}>
            <h2 style={h2Style}>4. Third party cookies</h2>
            <p style={pStyle}>Where you consent to analytics cookies, Google Analytics sets cookies on your device to help us understand website usage. Google may process this data on servers outside the United Kingdom.</p>
            <div style={{ overflowX: 'auto', margin: '16px 0 20px', borderRadius: '8px', border: '1px solid #e0dbd4' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white' }}>
                <thead>
                  <tr>
                    <th style={thStyle}>Provider</th>
                    <th style={thStyle}>Purpose</th>
                    <th style={thStyle}>More information</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Google Analytics', 'Website performance and visitor behaviour measurement.', 'policies.google.com/privacy'],
                    ['Vercel', 'Website hosting and delivery. May set technical cookies for security and performance.', 'vercel.com/legal/privacy-policy'],
                  ].map(([provider, purpose, info], i) => (
                    <tr key={i}>
                      <td style={{ ...tdStyle, fontWeight: 500 }}>{provider}</td>
                      <td style={tdStyle}>{purpose}</td>
                      <td style={tdStyle}><a href={`https://${info}`} target="_blank" rel="noopener noreferrer" style={linkStyle}>{info}</a></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="your-choices" style={sectionStyle}>
            <h2 style={h2Style}>5. Your choices</h2>
            <p style={pStyle}>When you first visit nixrix.com, you will be shown a cookie notice giving you the choice to accept or decline optional cookies. You can change your choice at any time.</p>
            <p style={pStyle}>You can also control cookies through your browser settings. Most browsers allow you to refuse cookies, delete existing cookies or be notified when a cookie is set. Please note that disabling essential cookies may affect how the website functions.</p>
            <p style={pStyle}>To opt out of Google Analytics tracking across websites, you can install the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" style={linkStyle}>Google Analytics Opt-out Browser Add-on</a>.</p>
            <p style={pStyle}>If you have questions about cookies or wish to withdraw consent, please email <a href="mailto:info@nixrix.com" style={linkStyle}>info@nixrix.com</a>.</p>
          </section>

          <section id="changes" style={sectionStyle}>
            <h2 style={h2Style}>6. Changes to this policy</h2>
            <p style={pStyle}>We may update this Cookie Policy from time to time. Any changes will be published on this page with an updated date. If we make significant changes, we will refresh the cookie notice on the website so you can review and confirm your preferences.</p>
          </section>

          <section id="contact" style={sectionStyle}>
            <h2 style={h2Style}>7. Contact us</h2>
            <p style={pStyle}>If you have any questions about how we use cookies, please contact us:</p>
            <div style={{ overflowX: 'auto', margin: '16px 0 20px', borderRadius: '8px', border: '1px solid #e0dbd4' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white' }}>
                <thead><tr><th style={thStyle}>Detail</th><th style={thStyle}>Information</th></tr></thead>
                <tbody>
                  {[
                    ['Company', 'NIXRIX LTD'],
                    ['Company number', '16841804'],
                    ['Email', 'info@nixrix.com'],
                    ['Telephone', '+44 7492 712144'],
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
              { href: '/terms', label: 'Terms of Use' },
            ].map((item, i) => (
              <Link key={i} href={item.href} style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '16px 20px', background: 'white', border: '1px solid #e0dbd4', borderRadius: '8px', textDecoration: 'none', minWidth: '160px' }}>
                <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', color: '#f90808', fontFamily: 'Sora,sans-serif' }}>LEGAL</span>
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0d1b2a', fontFamily: 'Sora,sans-serif' }}>{item.label} →</span>
              </Link>
            ))}
          </div>

        </article>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .priv-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
