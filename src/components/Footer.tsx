'use client'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ background:'#120d06', color:'white', padding:'4rem 1.5rem 0', borderTop:'2px solid var(--red)' }}>
      <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:'2.5rem', marginBottom:'3rem' }}>

          <div>
            <div style={{ marginBottom:'1.2rem' }}>
              <img src="/nixrix-logo.svg" alt="NIXRIX" style={{ height:'52px', width:'auto', filter:'none' }}/>
            </div>
            <p style={{ color:'#aaa', fontSize:'0.88rem', lineHeight:1.8, fontFamily:'Inter,sans-serif', fontWeight:300 }}>
              Simplifying Digital.<br/>Amplifying Growth.
            </p>
            <div style={{ display:'flex', gap:'0.6rem', marginTop:'1.2rem' }}>
              {[
                { href:'https://linkedin.com/company/nixrix', icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg> },
                { href:'https://instagram.com/nixrix_', icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg> },
              ].map((s,i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  style={{ width:'36px', height:'36px', border:'1px solid #2a2010', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center', color:'#666', transition:'all 0.2s', minHeight:'44px', minWidth:'44px' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor='var(--red)'; (e.currentTarget as HTMLAnchorElement).style.color='var(--red)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor='#2a2010'; (e.currentTarget as HTMLAnchorElement).style.color='#666' }}
                >{s.icon}</a>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontFamily:'Inter,sans-serif', fontSize:'0.72rem', fontWeight:600, letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:'1.2rem', color:'var(--red)' }}>Pages</h4>
            {[
              { label:'Home', href:'/' },
              { label:'Services', href:'/services' },
              { label:'How We Work', href:'/how-we-work' },
              { label:'Our Works', href:'/work' },
              { label:'About Us', href:'/about' },
              { label:'Blog', href:'/blog' },
              { label:'Contact Us', href:'/contact' },
            ].map(p => (
              <div key={p.label} style={{ marginBottom:'0.55rem' }}>
                <Link href={p.href} style={{ color:'#888', fontSize:'0.88rem', fontFamily:'Inter,sans-serif', transition:'color 0.2s', textDecoration:'none', display:'inline-block', minHeight:'36px', lineHeight:'36px' }}
                  onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color='var(--red)'}
                  onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color='#888'}
                >{p.label}</Link>
              </div>
            ))}
          </div>

          <div>
            <h4 style={{ fontFamily:'Inter,sans-serif', fontSize:'0.72rem', fontWeight:600, letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:'1.2rem', color:'var(--red)' }}>Contact</h4>
            <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
              {[
                { label:'Email', value:'info@nixrix.com', href:'mailto:info@nixrix.com' },
                { label:'Phone', value:'+44 7492 712144', href:'tel:+447492712144' },
                { label:'Location', value:'Leeds, UK', href:null },
              ].map((c,i) => (
                <div key={i}>
                  <div style={{ fontFamily:'Inter,sans-serif', fontSize:'0.68rem', color:'#555', letterSpacing:'0.1em', textTransform:'uppercase', fontWeight:500, marginBottom:'0.2rem' }}>{c.label}</div>
                  {c.href
                    ? <a href={c.href} style={{ color:'#aaa', fontSize:'0.88rem', fontFamily:'Inter,sans-serif', transition:'color 0.2s', textDecoration:'none', display:'inline-block', minHeight:'44px', lineHeight:'44px' }}
                        onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color='var(--red)'}
                        onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color='#aaa'}
                      >{c.value}</a>
                    : <span style={{ color:'#aaa', fontSize:'0.88rem', fontFamily:'Inter,sans-serif' }}>{c.value}</span>
                  }
                </div>
              ))}
            </div>
            <Link href="/contact" style={{ display:'inline-flex', alignItems:'center', gap:'0.5rem', background:'var(--red)', color:'white', padding:'0.8rem 1.4rem', fontFamily:'Inter,sans-serif', fontWeight:600, fontSize:'0.85rem', marginTop:'1.5rem', borderRadius:'50px', boxShadow:'0 4px 20px rgba(249,8,8,0.3)', transition:'all 0.2s', textDecoration:'none', minHeight:'52px' }}>
              Book Free Call →
            </Link>
          </div>
        </div>

        <div style={{ borderTop:'1px solid #1e1508', padding:'1.5rem 0 2rem', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'1rem' }}>
          <p style={{ color:'#444', fontSize:'0.75rem', fontFamily:'Inter,sans-serif' }}>© 2025–2026 NIXRIX. All rights reserved.</p>
          <div style={{ display:'flex', gap:'1.5rem', flexWrap:'wrap' }}>
            {[
              { label:'Privacy Policy', href:'/privacy' },
              { label:'Cookie Policy', href:'/cookies' },
              { label:'Terms', href:'/terms' },
            ].map(l => (
              <Link key={l.label} href={l.href} style={{ color:'#444', fontSize:'0.75rem', fontFamily:'Inter,sans-serif', transition:'color 0.2s', textDecoration:'none', minHeight:'44px', display:'inline-flex', alignItems:'center' }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color='var(--red)'}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color='#444'}
              >{l.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
