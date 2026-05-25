'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'

const services = [
  {
    num:'01', tag:'WEB & BRAND',
    title:'Digital Presence and Growth',
    tagline:'Look the part. Get noticed. Get found.',
    desc:'Build a brand and website that earns trust, then drive the right traffic to it through data-led marketing across every channel.',
    features:['Custom website design and build','User experience and landing pages','Logo and brand identity','Online store setup','Search engine optimised and mobile ready','Google and Meta advertising','Social media management','Email campaigns','Analytics and reporting'],
    href:'/services#web-brand',
    img:'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80',
  },
  {
    num:'02', tag:'ANALYTICS',
    title:'Data and Dashboards',
    tagline:'See exactly what is working.',
    desc:'Turn your business data into clear decisions with live dashboards and intelligence tools you can actually understand.',
    features:['Power BI dashboard build','Live data connections','Performance tracking','Plain language reports','Automated alerts'],
    href:'/services#data-analytics',
    img:'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  },
  {
    num:'03', tag:'SOFTWARE',
    title:'Software and Automation Systems',
    tagline:'Your software. Your rules.',
    desc:'Custom software that fits your business exactly. Automated, it saves you time and cuts unnecessary costs.',
    features:['Custom business software','Mobile applications','Online platform development','Third-party connections','Internal management tools'],
    href:'/services#software',
    img:'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80',
  },
  {
    num:'04', tag:'AUTOMATION',
    title:'Business Automation and CRM',
    tagline:'Automate the chaos. Scale with ease.',
    desc:'Replace manual processes with smart workflows so your team focuses on work that matters.',
    features:['HubSpot and Make.com setup','AI assistants and chatbots','Lead capture and follow-up','System connections','Workflow automation and process streamlining','Standard Operating Procedures provided','Full team training and onboarding'],
    href:'/services#automation',
    img:'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&q=80',
  },
]

function FlipCard({ s }: { s: typeof services[0] }) {
  const [flipped, setFlipped] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>|null>(null)

  return (
    <div
      onMouseEnter={() => { timer.current = setTimeout(() => setFlipped(true), 400) }}
      onMouseLeave={() => { if(timer.current) clearTimeout(timer.current); setFlipped(false) }}
      onClick={() => setFlipped(f => !f)}
      style={{ perspective:'1200px', height:'580px', cursor:'pointer' }}
    >
      <div style={{
        position:'relative', width:'100%', height:'100%',
        transformStyle:'preserve-3d',
        transform: flipped ? 'rotateY(180deg)' : 'rotateY(0)',
        transition:'transform 0.7s cubic-bezier(0.4,0.2,0.2,1)',
      }}>

        {/* ── FRONT ── */}
        <div style={{
          position:'absolute', inset:0, backfaceVisibility:'hidden',
          borderRadius:'20px', overflow:'hidden',
          boxShadow:'0 8px 40px rgba(0,0,0,0.2)',
          display:'flex', flexDirection:'column',
        }}>
          {/* Image */}
          <div style={{ position:'relative', height:'58%', overflow:'hidden', flexShrink:0 }}>
            <img src={s.img} alt={s.title} style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.5) 100%)' }}/>
            <div style={{ position:'absolute', top:'1rem', left:'1rem' }}>
              <span style={{ fontFamily:'Inter,sans-serif', fontSize:'0.62rem', fontWeight:700, color:'white', letterSpacing:'0.14em', background:'var(--red)', padding:'0.22rem 0.75rem', borderRadius:'50px', textTransform:'uppercase' }}>{s.tag}</span>
            </div>
            <div style={{ position:'absolute', top:'1rem', right:'1rem' }}>
              <span style={{ fontFamily:'Sora,sans-serif', fontSize:'0.72rem', fontWeight:800, color:'rgba(255,255,255,0.4)' }}>{s.num}</span>
            </div>
          </div>

          {/* Text panel */}
          <div style={{ flex:1, background:'white', padding:'1.6rem 1.8rem', display:'flex', flexDirection:'column', gap:'0.6rem', justifyContent:'center' }}>
            <h3 style={{
              fontFamily:'Sora,sans-serif', fontWeight:600, fontSize:'1.05rem',
              color:'#1a1208', lineHeight:1.25,
            }}>{s.title}</h3>
            {/* TAGLINE — big, bold, red, catchy */}
            <p style={{
              fontFamily:'Sora,sans-serif', fontWeight:800,
              fontSize:'1.3rem', color:'var(--red)',
              lineHeight:1.2, letterSpacing:'-0.01em',
            }}>{s.tagline}</p>
            <p style={{ fontFamily:'Inter,sans-serif', fontSize:'0.72rem', color:'#bbb', marginTop:'0.2rem', letterSpacing:'0.04em' }}>Hover or click to explore →</p>
          </div>
        </div>

        {/* ── BACK ── */}
        <div style={{
          position:'absolute', inset:0, backfaceVisibility:'hidden',
          transform:'rotateY(180deg)', borderRadius:'20px',
          background:'white', border:'2px solid var(--red)',
          boxShadow:'0 16px 60px rgba(249,8,8,0.2)',
          display:'flex', flexDirection:'column', overflow:'hidden',
        }}>
          <div style={{ background:'var(--red)', padding:'1.4rem 1.8rem', flexShrink:0 }}>
            <span style={{ fontFamily:'Inter,sans-serif', fontSize:'0.62rem', fontWeight:700, color:'rgba(255,255,255,0.6)', letterSpacing:'0.14em', textTransform:'uppercase' }}>{s.tag}</span>
            <h3 style={{ fontFamily:'Sora,sans-serif', fontWeight:700, fontSize:'1.15rem', color:'white', marginTop:'0.3rem', lineHeight:1.2 }}>{s.title}</h3>
            <p style={{ fontFamily:'Sora,sans-serif', fontWeight:800, fontSize:'1rem', color:'rgba(255,255,255,0.9)', marginTop:'0.3rem' }}>{s.tagline}</p>
          </div>

          <div style={{ flex:1, overflowY:'auto', padding:'1.4rem 1.8rem', display:'flex', flexDirection:'column', gap:'1rem' }}>
            <p style={{ fontFamily:'Inter,sans-serif', fontSize:'0.9rem', color:'var(--muted)', lineHeight:1.8, fontWeight:300 }}>{s.desc}</p>
            <div>
              <p style={{ fontFamily:'Inter,sans-serif', fontSize:'0.68rem', fontWeight:700, color:'var(--red)', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'0.7rem' }}>What is included</p>
              <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:'0.45rem' }}>
                {s.features.map((f, i) => (
                  <li key={i} style={{ fontFamily:'Inter,sans-serif', fontSize:'0.86rem', color:'#444', display:'flex', alignItems:'flex-start', gap:'0.6rem', lineHeight:1.5 }}>
                    <span style={{ color:'var(--red)', fontWeight:700, fontSize:'0.9rem', flexShrink:0 }}>✓</span>{f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div style={{ padding:'1rem 1.8rem', borderTop:'1px solid #ede9e3', flexShrink:0 }}>
            <Link href={s.href} onClick={e => e.stopPropagation()}
              style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'0.4rem', background:'var(--red)', color:'white', padding:'0.8rem', borderRadius:'50px', fontFamily:'Inter,sans-serif', fontWeight:600, fontSize:'0.88rem', width:'100%', textAlign:'center', boxShadow:'0 4px 16px rgba(249,8,8,0.3)' }}>
              Learn More →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ServicesStrip() {
  return (
    <section style={{ background:'#0d1b2a', padding:'7rem 3rem' }}>
      <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'4rem', flexWrap:'wrap', gap:'1rem' }}>
          <div>
            <p style={{ fontFamily:'Inter', fontSize:'0.75rem', letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--red)', marginBottom:'0.6rem', fontWeight:500 }}>What We Do</p>
            <h2 style={{ fontFamily:'Sora,sans-serif', fontWeight:800, fontSize:'clamp(2rem,4vw,3rem)', color:'white', letterSpacing:'-0.02em' }}>Our Services</h2>
          </div>
          <Link href="/services" style={{ fontFamily:'Inter,sans-serif', fontWeight:600, fontSize:'0.88rem', color:'var(--red)' }}>All Services →</Link>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:'20px' }}>
          {services.map((s, i) => <FlipCard key={i} s={s} />)}
        </div>
        <p style={{ fontFamily:'Inter,sans-serif', fontSize:'0.78rem', color:'rgba(255,255,255,0.25)', textAlign:'center', marginTop:'1.5rem' }}>Hover or click a card to explore the service</p>
      </div>
    </section>
  )
}
