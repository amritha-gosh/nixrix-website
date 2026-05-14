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
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    setActive(window.location.pathname)
    const onS = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onS)
    return () => window.removeEventListener('scroll', onS)
  }, [])

  return (
    <>
      {/* Desktop nav */}
      <div style={{
        position:'fixed', top:'16px', left:0, right:0, zIndex:1000,
        padding:'0 2.5rem',
        display:'flex', alignItems:'center', justifyContent:'space-between',
        height:'80px',
        pointerEvents:'none',
      }}>
        {/* Logo — left, standalone */}
        <Link href="/" style={{
          pointerEvents:'all',
          display:'flex', alignItems:'center',
          textDecoration:'none', flexShrink:0,
          filter:'drop-shadow(0 2px 12px rgba(249,8,8,0.2))',
          transition:'filter 0.3s',
          position:'relative', zIndex:10,
        }}
          onMouseEnter={e=>(e.currentTarget as HTMLAnchorElement).style.filter='drop-shadow(0 4px 20px rgba(249,8,8,0.5))'}
          onMouseLeave={e=>(e.currentTarget as HTMLAnchorElement).style.filter='drop-shadow(0 2px 12px rgba(249,8,8,0.2))'}
        >
          <img src="/nixrix-logo.svg" alt="NIXRIX" style={{ height:'56px', width:'auto', display:'block' }} />
        </Link>

        {/* Nav pill — absolutely centred in viewport */}
        <div style={{
          pointerEvents:'all',
          display:'flex', alignItems:'center',
          background:'rgba(61,43,31,0.92)',
          backdropFilter:'blur(16px)',
          WebkitBackdropFilter:'blur(16px)',
          borderRadius:'50px',
          padding:'0.4rem 0.5rem',
          gap:'0.05rem',
          position:'absolute', left:'50%', transform:'translateX(-50%)',
          boxShadow:'0 4px 30px rgba(0,0,0,0.25)',
          border:'1px solid rgba(255,255,255,0.08)',
          maxWidth:'calc(100vw - 420px)',
        }}>
          {links.map(l => (
            <div key={l.href} style={{ position:'relative' }}
              onMouseEnter={() => l.sub && setOpenSub(l.href)}
              onMouseLeave={() => setOpenSub(null)}>
              <Link href={l.href} onClick={() => setActive(l.href)}
                style={{
                  fontFamily:'Inter,sans-serif', fontSize:'15px',
                  color: active===l.href ? 'white' : 'rgba(255,255,255,0.9)',
                  fontWeight:600,
                  padding:'0.5rem 1rem',
                  background: active===l.href ? 'var(--red)' : 'transparent',
                  borderRadius:'50px', transition:'all 0.2s', whiteSpace:'nowrap',
                  display:'flex', alignItems:'center', gap:'0.25rem',
                }}
                onMouseEnter={e => { if(active!==l.href){e.currentTarget.style.color='white';e.currentTarget.style.background='rgba(255,255,255,0.1)'} }}
                onMouseLeave={e => { if(active!==l.href){e.currentTarget.style.color='rgba(255,255,255,0.9)';e.currentTarget.style.background='transparent'} }}
              >
                {l.label}{l.sub && <span style={{fontSize:'0.55rem',opacity:0.5}}>▾</span>}
              </Link>
              {l.sub && openSub===l.href && (
                <div style={{ position:'absolute', top:'110%', left:'50%', transform:'translateX(-50%)', background:'rgba(61,43,31,0.97)', backdropFilter:'blur(16px)', borderRadius:'14px', padding:'0.5rem', minWidth:'180px', boxShadow:'0 20px 50px rgba(0,0,0,0.35)', border:'1px solid rgba(255,255,255,0.08)', zIndex:100 }}>
                  {l.sub.map(s => (
                    <Link key={s.href} href={s.href} style={{ display:'block', padding:'0.6rem 1rem', fontFamily:'Inter,sans-serif', fontSize:'14px', color:'rgba(255,255,255,0.8)', borderRadius:'10px', transition:'all 0.15s', whiteSpace:'nowrap', fontWeight:500 }}
                      onMouseEnter={e => { e.currentTarget.style.background='rgba(249,8,8,0.2)'; e.currentTarget.style.color='white' }}
                      onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='rgba(255,255,255,0.8)' }}
                    >{s.label}</Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link href="/contact"
          onMouseEnter={() => setCtaHover(true)}
          onMouseLeave={() => setCtaHover(false)}
          style={{
            pointerEvents:'all',
            display:'flex', alignItems:'center', gap:'0.5rem',
            background: ctaHover ? '#c00606' : 'var(--red)',
            color:'white', padding:'0.7rem 1.4rem',
            borderRadius:'50px', fontFamily:'Inter,sans-serif',
            fontWeight:600, fontSize:'15px',
            transition:'all 0.25s ease', whiteSpace:'nowrap', flexShrink:0,
            boxShadow:'0 4px 20px rgba(249,8,8,0.4)',
          }}>
          Book Free Call
          <span style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', width:'20px', height:'20px', background:'rgba(255,255,255,0.2)', borderRadius:'50%', fontSize:'0.72rem' }}>→</span>
        </Link>
      </div>

      {/* Responsive CSS */}
      <style>{`
        @media (max-width: 900px) {
          .nixrix-nav-pill { display: none !important; }
        }
        @media (max-width: 640px) {
          .nixrix-nav-cta span { display: none; }
        }
      `}</style>
    </>
  )
}
