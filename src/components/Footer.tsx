'use client'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ background: '#0d1b2a', color: 'white', padding: '3rem 1.5rem 0', borderTop: '2px solid var(--red)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: '2rem', marginBottom: '2rem' }}>

          <div>
            <div style={{ marginBottom: '1rem' }}>
              <img src="/nixrix-logo.svg" alt="NIXRIX" style={{ height: '40px', width: 'auto' }} />
            </div>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.82rem', lineHeight: 1.7, fontFamily: 'Inter,sans-serif', fontWeight: 300, marginBottom: '1rem' }}>
              Simplifying Digital.<br />Amplifying Growth.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {[
                { href: 'https://linkedin.com/company/nixrix', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg> },
                { href: 'https://instagram.com/nixrix_', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg> },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  style={{ width: '34px', height: '34px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.7)', transition: 'all 0.2s', minHeight: '44px', minWidth: '44px' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--red)'; (e.currentTarget as HTMLAnchorElement).style.color = 'var(--red)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.1)'; (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.4)' }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '1rem', color: 'var(--red)' }}>Pages</h4>
            {[
              { label: 'Home', href: '/' },
              { label: 'Services', href: '/services' },
              { label: 'How We Work', href: '/how-we-work' },
              { label: 'Our Works', href: '/work' },
              { label: 'About Us', href: '/about' },
              { label: 'Blog', href: '/blog' },
              { label: 'Contact', href: '/contact' },
            ].map(p => (
              <div key={p.label} style={{ marginBottom: '0.4rem' }}>
                <Link href={p.href} style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', fontFamily: 'Inter,sans-serif', transition: 'color 0.2s', textDecoration: 'none', display: 'inline-block', minHeight: '36px', lineHeight: '36px' }}
                  onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = 'var(--red)'}
                  onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.5)'}>
                  {p.label}
                </Link>
              </div>
            ))}
          </div>

          <div>
            <h4 style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '1rem', color: 'var(--red)' }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {[
                { label: 'Email', value: 'info@nixrix.com', href: 'mailto:info@nixrix.com' },
                { label: 'Phone', value: '+44 7492 712144', href: 'tel:+447492712144' },
                { label: 'Location', value: 'Leeds, UK', href: null },
              ].map((c, i) => (
                <div key={i}>
                  <div style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500, marginBottom: '0.15rem' }}>{c.label}</div>
                  {c.href
                    ? <a href={c.href} style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', fontFamily: 'Inter,sans-serif', transition: 'color 0.2s', textDecoration: 'none' }}
                      onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = 'var(--red)'}
                      onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.6)'}>{c.value}</a>
                    : <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', fontFamily: 'Inter,sans-serif' }}>{c.value}</span>
                  }
                </div>
              ))}
            </div>
            <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--red)', color: 'white', padding: '0.7rem 1.2rem', fontFamily: 'Inter,sans-serif', fontWeight: 600, fontSize: '0.82rem', marginTop: '1.2rem', borderRadius: '50px', boxShadow: '0 4px 16px rgba(249,8,8,0.3)', textDecoration: 'none', minHeight: '44px' }}>
              Book Free Call →
            </Link>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '1.2rem 0 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.8rem' }}>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.72rem', fontFamily: 'Inter,sans-serif' }}>© 2025–2026 NIXRIX. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap' }}>
            {[{ label: 'Privacy', href: '/privacy' }, { label: 'Cookies', href: '/cookies' }, { label: 'Terms', href: '/terms' }].map(l => (
              <Link key={l.label} href={l.href} style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.72rem', fontFamily: 'Inter,sans-serif', transition: 'color 0.2s', textDecoration: 'none' }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = 'var(--red)'}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.2)'}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
