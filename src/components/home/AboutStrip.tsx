'use client'
import Link from 'next/link'
import { useState } from 'react'

const cards = [
  { title:'Globally Remote', desc:'We work with clients across the UK, US, UAE and beyond.' },
  { title:'Full Stack', desc:'Design, development, marketing and automation, all under one roof.' },
  { title:'Growth Focused', desc:'Every decision is made to move your numbers.' },
]

export default function AboutStrip() {
  const [hovered, setHovered] = useState<number|null>(null)
  return (
    <section style={{ background:'#fafaf8', padding:'4rem 1.5rem' }}>
      <div style={{ maxWidth:'1200px', margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:'3rem', alignItems:'center' }}>
        <div>
          <p style={{ fontFamily:'Inter', fontSize:'0.75rem', letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--red)', marginBottom:'0.8rem', fontWeight:500 }}>Who We Are</p>
          <h2 style={{ fontFamily:'Sora,sans-serif', fontWeight:800, fontSize:'clamp(1.6rem,4vw,2.8rem)', color:'var(--dark)', letterSpacing:'-0.02em', marginBottom:'1.2rem', lineHeight:1.15 }}>
            A digital systems company built for ambitious businesses
          </h2>
          <p style={{ fontFamily:'Inter,sans-serif', fontWeight:300, fontSize:'1rem', color:'var(--muted)', lineHeight:1.9, marginBottom:'1.8rem' }}>
            Based in Leeds with clients across the UK and beyond, NIXRIX helps businesses build the digital infrastructure they need to grow.
          </p>
          <Link href="/about" style={{ display:'inline-flex', alignItems:'center', gap:'0.5rem', fontFamily:'Sora,sans-serif', fontWeight:700, fontSize:'0.85rem', color:'var(--red)', letterSpacing:'0.04em', textTransform:'uppercase', textDecoration:'none', minHeight:'44px' }}>
            About NIXRIX →
          </Link>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px' }}>
          {cards.map((c,i) => (
            <div key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: hovered===i ? '#3D2B1F' : '#ffffff',
                padding:'1.5rem', borderRadius:'14px',
                border:`2px solid ${hovered===i ? 'var(--red)' : '#ede9e3'}`,
                transform: hovered===i ? 'translateY(-6px)' : 'translateY(0)',
                transition:'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                boxShadow: hovered===i ? '0 16px 40px rgba(249,8,8,0.15)' : '0 2px 12px rgba(0,0,0,0.04)',
                gridColumn: i===2 ? 'span 2' : 'span 1',
              }}>
              <h4 style={{ fontFamily:'Sora,sans-serif', fontWeight:700, fontSize:'0.95rem', color: hovered===i ? 'white' : 'var(--dark)', marginBottom:'0.5rem', transition:'color 0.3s' }}>{c.title}</h4>
              <p style={{ fontFamily:'Inter,sans-serif', fontSize:'0.82rem', color: hovered===i ? 'rgba(255,255,255,0.8)' : 'var(--muted)', lineHeight:1.65, transition:'color 0.3s' }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
