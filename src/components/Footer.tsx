'use client'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ background: '#0d1b2a', color: 'white', padding: '1.5rem', borderTop: '2px solid var(--red)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1.5rem', marginBottom: '1.2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <img src="/nixrix-logo.svg" alt="NIXRIX" style={{ height: '28px', width: 'auto' }} />
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem', fontFamily: 'Inter,sans-serif', fontWeight: 300, margin: 0 }}>Simplifying Digital. Amplifying Growth.</p>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.3rem' }}>
              {[
                { href: 'https://linkedin.com/company/nixrix', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg> },
                { href: 'https://instagram.com/nixrix_', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg> },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" style={{ width: '30px', height: '30px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap' }}>
            <div>
              <p style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--red)', marginBottom: '0.6rem', margin: '0 0 0.6rem' }}>Pages</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                {[['Home','/'],['Services','/services'],['How We Work','/how-we-work'],['Our Work','/work'],['About','/about'],['Blog','/blog'],['Contact','/contact']].map(([label, href]) => (
                  <Link key={href} href={href} style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', fontFamily: 'Inter,sans-serif', textDecoration: 'none' }}>{label}</Link>
                ))}
              </div>
            </div>
            <div>
              <p style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--red)', margin: '0 0 0.6rem' }}>Contact</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                <a href="mailto:info@nixrix.com" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', fontFamily: 'Inter,sans-serif', textDecoration: 'none' }}>info@nixrix.com</a>
                <a href="tel:+447492712144" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', fontFamily: 'Inter,sans-serif', textDecoration: 'none' }}>+44 7492 712144</a>
                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', fontFamily: 'Inter,sans-serif' }}>Leeds, UK</span>
              </div>
              <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'var(--red)', color: 'white', padding: '0.5rem 1rem', fontFamily: 'Inter,sans-serif', fontWeight: 600, fontSize: '0.78rem', marginTop: '0.8rem', borderRadius: '50px', textDecoration: 'none' }}>
                Book Free Call →
              </Link>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.8rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.7rem', fontFamily: 'Inter,sans-serif', margin: 0 }}>© 2025–2026 NIXRIX LTD. Company No. 16841804.</p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {[['Privacy','/privacy'],['Cookies','/cookies'],['Terms','/terms']].map(([label, href]) => (
              <Link key={href} href={href} style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.7rem', fontFamily: 'Inter,sans-serif', textDecoration: 'none' }}>{label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
