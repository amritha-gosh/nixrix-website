'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function CTASection() {
  const [hovered, setHovered] = useState(false)
  return (
    <section style={{ background:'#ffffff', padding:'7rem 3rem', textAlign:'center', borderTop:'1px solid #ede9e3' }}>
      <div style={{ maxWidth:'700px', margin:'0 auto' }}>
        <p style={{ fontFamily:'Inter,sans-serif', fontSize:'0.8rem', letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--red)', marginBottom:'1rem', fontWeight:500 }}>Ready to grow?</p>
        <h2 style={{ fontFamily:'Sora,sans-serif', fontWeight:800, fontSize:'clamp(2rem,5vw,3.5rem)', color:'#0d1b2a', letterSpacing:'-0.03em', marginBottom:'1.5rem', lineHeight:1.1 }}>
          Let&apos;s build something<br /><span style={{ color:'var(--red)' }}>remarkable together.</span>
        </h2>
        <p style={{ fontFamily:'Inter,sans-serif', fontWeight:300, color:'var(--muted)', fontSize:'1.05rem', marginBottom:'2.5rem', lineHeight:1.8 }}>
          Tell us about your project and we&apos;ll come back to you within 24 hours.
        </p>
        <Link href="/contact"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{ display:'inline-flex', alignItems:'center', gap:'0.7rem', background: hovered ? '#0d1b2a' : 'var(--red)', color:'white', padding:'1.1rem 2.5rem', fontFamily:'Sora,sans-serif', fontWeight:700, fontSize:'0.95rem', letterSpacing:'0.04em', transition:'all 0.25s ease', borderRadius:'50px', boxShadow: hovered ? '0 8px 30px rgba(61,43,31,0.2)' : '0 8px 30px rgba(249,8,8,0.25)' }}>
          Book a Free Call
          <span style={{ transform: hovered ? 'translateX(4px)' : 'translateX(0)', transition:'transform 0.25s', fontSize:'1.1rem' }}>→</span>
        </Link>
        <div style={{ marginTop:'1.2rem' }}>
          <a href="mailto:info@nixrix.com" style={{ fontFamily:'Inter,sans-serif', fontSize:'0.88rem', color:'var(--red)', fontWeight:500 }}>
            Or email us directly at info@nixrix.com
          </a>
        </div>
      </div>
    </section>
  )
}
