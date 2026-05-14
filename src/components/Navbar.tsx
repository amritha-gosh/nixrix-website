'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const links = [
  { href:'/', label:'Home' },
  { href:'/services', label:'Services' },
  { href:'/how-we-work', label:'How We Work' },
  { href:'/about', label:'About Us', sub:[
    { href:'/about', label:'About NIXRIX' },
    { href:'/work', label:'Our Works' },
    { href:'/case-studies', label:'Case Studies' },
  ]},
  { href:'/contact', label:'Contact Us' },
]

export default function Navbar() {
  const [ctaHover, setCtaHover] = useState(false)
  const [active, setActive] = useState('/')
  const [openSub, setOpenSub] = useState<string|null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setActive(window.location.pathname)
    const checkMobile = () => setIsMobile(window.innerWidth < 900)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Close menu on route change
  useEffect(() => { setMenuOpen(false) }, [active])

  return (
    <>
      <div style={{
        position:'fixed', top:'16px', left:0, right:0, zIndex:1000,
        padding:'0 1.5rem',
        display:'flex', alignItems:'center', justifyContent:'space-between',
        height:'72px', pointerEvents:'none',
      }}>
        {/* Logo */}
        <Link href="/" style={{
          pointerEvents:'all', display:'flex', alignItems:'center',
          textDecoration:'none', flexShrink:0,
          filter:'drop-shadow(0 2px 8px rgba(249,8,8,0.2))',
        }}>
          <img src="/nixrix-logo.svg" alt="NIXRIX" style={{ height:'44px', width:'auto' }}/>
        </Link>

        {/* Desktop nav pill */}
        {!isMobile && (
          <div style={{
            pointerEvents:'all', display:'flex', alignItems:'center',
            background:'rgba(61,43,31,0.92)', backdropFilter:'blur(16px)',
            borderRadius:'50px', padding:'0.4rem 0.5rem', gap:'0.05rem',
            position:'absolute', left:'50%', transform:'translateX(-50%)',
            boxShadow:'0 4px 24px rgba(0,0,0,0.2)',
            border:'1px solid rgba(255,255,255,0.08)',
          }}>
            {links.map(l => (
              <div key={l.href} style={{ position:'relative' }}
                onMouseEnter={() => l.sub && setOpenSub(l.href)}
                onMouseLeave={() => setOpenSub(null)}>
                <Link href={l.href} onClick={() => setActive(l.href)}
                  style={{
                    fontFamily:'Inter,sans-serif', fontSize:'15px',
                    color: active===l.href ? 'white' : 'rgba(255,255,255,0.9)',
                    fontWeight:600, padding:'0.5rem 1rem',
                    background: active===l.href ? 'var(--red)' : 'transparent',
                    borderRadius:'50px', transition:'all 0.2s', whiteSpace:'nowrap',
                    display:'flex', alignItems:'center', gap:'0.3rem',
                  }}
                  onMouseEnter={e => { if(active!==l.href){(e.currentTarget as HTMLAnchorElement).style.color='white';(e.currentTarget as HTMLAnchorElement).style.background='rgba(255,255,255,0.1)'} }}
                  onMouseLeave={e => { if(active!==l.href){(e.currentTarget as HTMLAnchorElement).style.color='rgba(255,255,255,0.9)';(e.currentTarget as HTMLAnchorElement).style.background='transparent'} }}
                >
                  {l.label}{l.sub && <span style={{fontSize:'0.6rem',opacity:0.5}}>▾</span>}
                </Link>
                {l.sub && openSub===l.href && (
                  <div style={{ position:'absolute', top:'110%', left:'50%', transform:'translateX(-50%)', background:'rgba(61,43,31,0.97)', backdropFilter:'blur(16px)', borderRadius:'14px', padding:'0.5rem', minWidth:'180px', boxShadow:'0 20px 50px rgba(0,0,0,0.3)', border:'1px solid rgba(255,255,255,0.08)', zIndex:100 }}>
                    {l.sub.map(s => (
                      <Link key={s.href} href={s.href} style={{ display:'block', padding:'0.6rem 1rem', fontFamily:'Inter,sans-serif', fontSize:'14px', color:'rgba(255,255,255,0.8)', borderRadius:'10px', transition:'all 0.15s', whiteSpace:'nowrap', fontWeight:500 }}
                        onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background='rgba(249,8,8,0.2)'; (e.currentTarget as HTMLAnchorElement).style.color='white' }}
                        onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background='transparent'; (e.currentTarget as HTMLAnchorElement).style.color='rgba(255,255,255,0.8)' }}
                      >{s.label}</Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Desktop CTA / Mobile hamburger */}
        <div style={{ pointerEvents:'all', display:'flex', alignItems:'center', gap:'0.8rem' }}>
          {!isMobile && (
            <Link href="/contact"
              onMouseEnter={() => setCtaHover(true)}
              onMouseLeave={() => setCtaHover(false)}
              style={{
                display:'flex', alignItems:'center', gap:'0.5rem',
                background: ctaHover ? '#c00606' : 'var(--red)',
                color:'white', padding:'0.7rem 1.4rem', borderRadius:'50px',
                fontFamily:'Inter,sans-serif', fontWeight:600, fontSize:'15px',
                transition:'all 0.25s ease', whiteSpace:'nowrap',
                boxShadow:'0 4px 20px rgba(249,8,8,0.4)',
              }}>
              Book Free Call
              <span style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', width:'20px', height:'20px', background:'rgba(255,255,255,0.2)', borderRadius:'50%', fontSize:'0.72rem' }}>→</span>
            </Link>
          )}

          {isMobile && (
            <button onClick={() => setMenuOpen(o => !o)}
              style={{
                background: menuOpen ? 'var(--dark)' : 'rgba(61,43,31,0.92)',
                border:'none', borderRadius:'12px', padding:'0.6rem',
                display:'flex', flexDirection:'column', gap:'5px',
                cursor:'pointer', width:'44px', height:'44px',
                alignItems:'center', justifyContent:'center',
                boxShadow:'0 4px 16px rgba(0,0,0,0.2)',
              }}>
              <span style={{ width:'20px', height:'2px', background:'white', borderRadius:'2px', transition:'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(5px,5px)' : 'none' }}/>
              <span style={{ width:'20px', height:'2px', background:'white', borderRadius:'2px', transition:'all 0.3s', opacity: menuOpen ? 0 : 1 }}/>
              <span style={{ width:'20px', height:'2px', background:'white', borderRadius:'2px', transition:'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(5px,-5px)' : 'none' }}/>
            </button>
          )}
        </div>
      </div>

      {/* Mobile fullscreen menu */}
      {isMobile && (
        <div style={{
          position:'fixed', inset:0, zIndex:999,
          background:'#3D2B1F',
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition:'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
          display:'flex', flexDirection:'column',
          padding:'6rem 2.5rem 3rem',
          overflowY:'auto',
        }}>
          {links.map((l, i) => (
            <div key={l.href}>
              <Link href={l.href}
                onClick={() => { setActive(l.href); setMenuOpen(false) }}
                style={{
                  display:'block', fontFamily:'Sora,sans-serif', fontWeight:800,
                  fontSize:'2rem', color: active===l.href ? 'var(--red)' : 'white',
                  padding:'1rem 0', borderBottom:'1px solid rgba(255,255,255,0.08)',
                  letterSpacing:'-0.02em', transition:'color 0.2s',
                  animationDelay: `${i * 0.05}s`,
                }}>
                {l.label}
              </Link>
              {l.sub && l.sub.map(s => (
                <Link key={s.href} href={s.href}
                  onClick={() => { setActive(s.href); setMenuOpen(false) }}
                  style={{ display:'block', fontFamily:'Inter,sans-serif', fontWeight:500, fontSize:'1rem', color:'rgba(255,255,255,0.6)', padding:'0.6rem 1rem', transition:'color 0.2s' }}>
                  → {s.label}
                </Link>
              ))}
            </div>
          ))}
          <Link href="/contact"
            onClick={() => setMenuOpen(false)}
            style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'0.5rem', background:'var(--red)', color:'white', padding:'1.1rem', borderRadius:'50px', fontFamily:'Inter,sans-serif', fontWeight:600, fontSize:'1rem', marginTop:'2rem', boxShadow:'0 4px 20px rgba(249,8,8,0.35)', textDecoration:'none', minHeight:'52px' }}>
            Book Free Call →
          </Link>
          <div style={{ marginTop:'2rem', display:'flex', flexDirection:'column', gap:'0.8rem' }}>
            <a href="mailto:info@nixrix.com" style={{ fontFamily:'Inter,sans-serif', fontSize:'0.9rem', color:'rgba(255,255,255,0.5)', textDecoration:'none' }}>info@nixrix.com</a>
            <a href="tel:+447492712144" style={{ fontFamily:'Inter,sans-serif', fontSize:'0.9rem', color:'rgba(255,255,255,0.5)', textDecoration:'none' }}>+44 7492 712144</a>
          </div>
        </div>
      )}
    </>
  )
}
