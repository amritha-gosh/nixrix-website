'use client'
import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'

const works = [
  { tag:'AI Booking / Automation', title:'Theyyam', bg:'#1a1008', accent:'#f90808' },
  { tag:'HR Automation', title:'Roster Care', bg:'#0f1a08', accent:'#f90808' },
  { tag:'Web & Brand', title:'Your project', placeholder:true, bg:'#f7f5f2', accent:'#f90808' },
]

export default function WorksStrip() {
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
    const walk = (x - startX.current) * 1.5
    trackRef.current.scrollLeft = scrollLeft.current - walk
  }
  const onMouseUp = () => setIsDragging(false)

  return (
    <section style={{ background:'#0d1b2a', padding:'7rem 0', overflow:'hidden' }}>
      <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'0 3rem', marginBottom:'3rem', display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
        <div>
          <p style={{ fontFamily:'Inter', fontSize:'0.75rem', letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--red)', marginBottom:'0.6rem', fontWeight:500 }}>Selected Projects</p>
          <h2 style={{ fontFamily:'Sora,sans-serif', fontWeight:800, fontSize:'clamp(2rem,4vw,3rem)', color:'white', letterSpacing:'-0.02em' }}>Our Work</h2>
        </div>
        <Link href="/work" style={{ fontFamily:'Inter,sans-serif', fontWeight:600, fontSize:'0.85rem', color:'var(--red)' }}>View All →</Link>
      </div>

      {/* Drag scroll strip */}
      <div ref={trackRef}
        onMouseDown={onMouseDown} onMouseMove={onMouseMove}
        onMouseUp={onMouseUp} onMouseLeave={onMouseUp}
        style={{ display:'flex', gap:'20px', overflowX:'auto', padding:'0 3rem 2rem', scrollbarWidth:'none', cursor: isDragging ? 'grabbing' : 'grab', userSelect:'none' }}>
        {works.map((w, i) => (
          <div key={i} style={{
            flexShrink:0, width:'360px', height:'280px', borderRadius:'16px',
            background: w.placeholder ? 'transparent' : w.bg,
            border: w.placeholder ? '2px dashed rgba(249,8,8,0.4)' : `1px solid rgba(249,8,8,0.15)`,
            position:'relative', overflow:'hidden',
            display:'flex', flexDirection:'column', justifyContent: w.placeholder ? 'center' : 'flex-end',
            alignItems: w.placeholder ? 'center' : 'flex-start',
            padding:'2rem',
            transition:'transform 0.3s, box-shadow 0.3s',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform='translateY(-6px)'; (e.currentTarget as HTMLDivElement).style.boxShadow='0 20px 50px rgba(249,8,8,0.2)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform='translateY(0)'; (e.currentTarget as HTMLDivElement).style.boxShadow='none' }}
          >
            {w.placeholder ? (
              <div style={{ textAlign:'center' }}>
                <p style={{ fontFamily:'Sora,sans-serif', fontWeight:700, fontSize:'1.1rem', color:'rgba(255,255,255,0.6)', marginBottom:'1rem' }}>Your project could be here.</p>
                <Link href="/contact" style={{ fontFamily:'Inter,sans-serif', fontWeight:600, fontSize:'0.85rem', color:'white', background:'var(--red)', padding:'0.6rem 1.4rem', borderRadius:'50px' }}>Book a Free Call</Link>
              </div>
            ) : (
              <>
                <span style={{ fontFamily:'Inter,sans-serif', fontSize:'0.7rem', fontWeight:600, color:'var(--red)', letterSpacing:'0.1em', textTransform:'uppercase', background:'rgba(249,8,8,0.12)', padding:'0.2rem 0.7rem', borderRadius:'50px', marginBottom:'0.8rem' }}>{w.tag}</span>
                <h3 style={{ fontFamily:'Sora,sans-serif', fontWeight:800, fontSize:'1.6rem', color:'white' }}>{w.title}</h3>
                <p style={{ fontFamily:'Inter,sans-serif', fontSize:'0.8rem', color:'rgba(255,255,255,0.4)', marginTop:'0.5rem' }}>Coming Soon</p>
                <div style={{ position:'absolute', top:0, left:0, right:0, bottom:0, background:'rgba(249,8,8,0)', transition:'background 0.3s', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:'16px' }}
                  onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background='rgba(249,8,8,0.08)'}
                  onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background='rgba(249,8,8,0)'}
                />
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
