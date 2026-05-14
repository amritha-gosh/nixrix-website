'use client'
import { useRef, useState } from 'react'
import Link from 'next/link'

const works = [
  {
    tag:'AI Booking / Automation', title:'Theyyam',
    desc:'AI-powered booking and automation system. Placeholder screenshot ready.',
    bg:'#1a0f08', placeholder:true,
  },
  {
    tag:'HR Automation', title:'Roster Care',
    desc:'HR automation and workforce management platform. Placeholder screenshot ready.',
    bg:'#081a0f', placeholder:true,
  },
]

export default function Work() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    startX.current = e.pageX - (trackRef.current?.offsetLeft || 0)
    scrollLeft.current = trackRef.current?.scrollLeft || 0
  }
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !trackRef.current) return
    e.preventDefault()
    const x = e.pageX - (trackRef.current.offsetLeft || 0)
    trackRef.current.scrollLeft = scrollLeft.current - (x - startX.current) * 1.5
  }
  const onMouseUp = () => setIsDragging(false)

  return (
    <>
      <section style={{ background:'#fff', paddingTop:'140px', paddingBottom:'60px', paddingLeft:'3rem', paddingRight:'3rem' }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
          <p style={{ fontFamily:'Inter', fontSize:'0.75rem', letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--red)', marginBottom:'1rem', fontWeight:500 }}>Selected Projects</p>
          <h1 style={{ fontFamily:'Sora,sans-serif', fontWeight:800, fontSize:'clamp(2.5rem,5vw,4.5rem)', color:'var(--dark)', letterSpacing:'-0.03em', lineHeight:1.05, marginBottom:'1.2rem' }}>
            Our <span style={{ color:'var(--red)' }}>Work.</span>
          </h1>
          <p style={{ fontFamily:'Inter,sans-serif', fontWeight:300, fontSize:'1.05rem', color:'var(--muted)', maxWidth:'500px', lineHeight:1.85 }}>
            Real projects. Real results. Built for businesses that mean business.
          </p>
        </div>
      </section>

      {/* Horizontal scroll strip */}
      <section style={{ background:'#3D2B1F', padding:'5rem 0 4rem', overflow:'hidden' }}>
        <div ref={trackRef}
          onMouseDown={onMouseDown} onMouseMove={onMouseMove}
          onMouseUp={onMouseUp} onMouseLeave={onMouseUp}
          style={{ display:'flex', gap:'20px', overflowX:'auto', padding:'1rem 3rem 2rem', scrollbarWidth:'none', cursor: isDragging ? 'grabbing' : 'grab', userSelect:'none' }}>

          {works.map((w, i) => (
            <div key={i} style={{
              flexShrink:0, width:'400px', height:'320px', borderRadius:'16px',
              background: w.bg, border:'1px solid rgba(249,8,8,0.15)',
              position:'relative', overflow:'hidden',
              display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'2rem',
              transition:'transform 0.3s, box-shadow 0.3s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform='translateY(-6px)'; (e.currentTarget as HTMLDivElement).style.boxShadow='0 20px 50px rgba(249,8,8,0.2)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform='translateY(0)'; (e.currentTarget as HTMLDivElement).style.boxShadow='none' }}
            >
              {/* Screenshot placeholder */}
              <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', borderBottom:'1px solid rgba(249,8,8,0.1)' }}>
                <div style={{ textAlign:'center', opacity:0.3 }}>
                  <div style={{ fontFamily:'Inter,sans-serif', fontSize:'0.75rem', color:'white', letterSpacing:'0.1em', textTransform:'uppercase' }}>Coming Soon</div>
                </div>
              </div>
              {/* Hover overlay */}
              <div style={{ position:'absolute', inset:0, background:'rgba(249,8,8,0)', transition:'background 0.3s', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:'16px' }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background='rgba(249,8,8,0.1)'}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background='rgba(249,8,8,0)'}
              />
              <div style={{ position:'relative', zIndex:1 }}>
                <span style={{ fontFamily:'Inter,sans-serif', fontSize:'0.7rem', fontWeight:600, color:'var(--red)', letterSpacing:'0.1em', textTransform:'uppercase', background:'rgba(249,8,8,0.12)', padding:'0.2rem 0.7rem', borderRadius:'50px', display:'inline-block', marginBottom:'0.8rem' }}>{w.tag}</span>
                <h3 style={{ fontFamily:'Sora,sans-serif', fontWeight:800, fontSize:'1.8rem', color:'white' }}>{w.title}</h3>
              </div>
            </div>
          ))}

          {/* Placeholder invite card */}
          <div style={{ flexShrink:0, width:'360px', height:'320px', borderRadius:'16px', border:'2px dashed rgba(249,8,8,0.35)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'2rem', textAlign:'center' }}>
            <p style={{ fontFamily:'Sora,sans-serif', fontWeight:700, fontSize:'1.2rem', color:'rgba(255,255,255,0.7)', marginBottom:'1.5rem' }}>Your project could be here.</p>
            <Link href="/contact" style={{ fontFamily:'Inter,sans-serif', fontWeight:600, fontSize:'0.85rem', color:'white', background:'var(--red)', padding:'0.7rem 1.5rem', borderRadius:'50px', display:'inline-flex', alignItems:'center', gap:'0.4rem' }}>
              Book a Free Call →
            </Link>
          </div>

          <p style={{ color:'rgba(255,255,255,0.15)', fontFamily:'Inter,sans-serif', fontSize:'0.75rem', flexShrink:0, alignSelf:'center', paddingRight:'2rem', whiteSpace:'nowrap' }}>Drag to explore</p>
        </div>

        <p style={{ textAlign:'center', fontFamily:'Inter,sans-serif', fontSize:'0.78rem', color:'rgba(255,255,255,0.25)', marginTop:'1rem' }}>
          In collaboration with dydx Labs.
        </p>
      </section>

      <section style={{ background:'#fff', padding:'5rem 3rem', textAlign:'center' }}>
        <h2 style={{ fontFamily:'Sora,sans-serif', fontWeight:800, fontSize:'clamp(1.8rem,4vw,3rem)', color:'var(--dark)', marginBottom:'1rem' }}>Ready to be next?</h2>
        <Link href="/contact" style={{ display:'inline-flex', alignItems:'center', gap:'0.6rem', background:'var(--red)', color:'white', padding:'1rem 2.2rem', fontFamily:'Inter,sans-serif', fontWeight:600, fontSize:'0.9rem', borderRadius:'50px', boxShadow:'0 4px 20px rgba(249,8,8,0.25)' }}>
          Start Your Project →
        </Link>
      </section>
    </>
  )
}
