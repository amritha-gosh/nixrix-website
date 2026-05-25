'use client'
import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { caseStudies } from '@/data/caseStudies'

function NodeCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return
    const ctx = canvas.getContext('2d'); if (!ctx) return
    const c = ctx
    let W = canvas.width = window.innerWidth
    let H = canvas.height = 500
    let animId: number
    type N = { x: number; y: number; vx: number; vy: number }
    const nodes: N[] = Array.from({ length: 50 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
    }))
    function draw() {
      c.clearRect(0, 0, W, H)
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy
        if (n.x < 0 || n.x > W) n.vx *= -1
        if (n.y < 0 || n.y > H) n.vy *= -1
        c.beginPath(); c.arc(n.x, n.y, 2, 0, Math.PI * 2)
        c.fillStyle = 'rgba(249,8,8,0.3)'; c.fill()
      })
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 110) {
            c.strokeStyle = `rgba(249,8,8,${0.1 * (1 - d / 110)})`
            c.lineWidth = 0.7; c.beginPath()
            c.moveTo(nodes[i].x, nodes[i].y); c.lineTo(nodes[j].x, nodes[j].y); c.stroke()
          }
        }
      }
      animId = requestAnimationFrame(draw)
    }
    draw()
    const onR = () => { W = canvas.width = window.innerWidth }
    window.addEventListener('resize', onR)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onR) }
  }, [])
  return <canvas ref={ref} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />
}

export default function Work() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
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

  // Touch support
  const touchStart = useRef(0)
  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].pageX
    scrollLeft.current = trackRef.current?.scrollLeft || 0
  }
  const onTouchMove = (e: React.TouchEvent) => {
    if (!trackRef.current) return
    const diff = touchStart.current - e.touches[0].pageX
    trackRef.current.scrollLeft = scrollLeft.current + diff
  }

  return (
    <>
      {/* Hero */}
      <section style={{ position: 'relative', background: '#fff', paddingTop: '120px', paddingBottom: '60px', overflow: 'hidden', minHeight: '400px' }}>
        <NodeCanvas />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          <p style={{ fontFamily: 'Inter', fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--red)', marginBottom: '1rem', fontWeight: 500 }}>Selected Projects</p>
          <h1 style={{ fontFamily: 'Sora,sans-serif', fontWeight: 800, fontSize: 'clamp(2.5rem,6vw,4.5rem)', color: 'var(--dark)', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '1.2rem' }}>
            Our <span style={{ color: 'var(--red)' }}>Work.</span>
          </h1>
          <p style={{ fontFamily: 'Inter,sans-serif', fontWeight: 300, fontSize: '1rem', color: 'var(--muted)', maxWidth: '500px', lineHeight: 1.85 }}>
            Real projects. Real results. Built for businesses that mean business.
          </p>
        </div>
      </section>

      {/* Portfolio strip */}
      <section style={{ background: '#0d1b2a', padding: '4rem 0', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <p style={{ fontFamily: 'Inter', fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--red)', marginBottom: '0.5rem', fontWeight: 500 }}>Portfolio</p>
            <h2 style={{ fontFamily: 'Sora,sans-serif', fontWeight: 800, fontSize: 'clamp(1.6rem,3vw,2.5rem)', color: 'white', letterSpacing: '-0.02em' }}>Recent Projects</h2>
          </div>
          <p style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)' }}>← drag to explore →</p>
        </div>

        <div
          ref={trackRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          style={{ display: 'flex', gap: '16px', overflowX: 'auto', padding: '1rem 1.5rem 2rem', scrollbarWidth: 'none', cursor: isDragging ? 'grabbing' : 'grab', userSelect: 'none', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
        >
          {caseStudies.map((w, i) => (
            <div key={i}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                flexShrink: 0,
                width: 'clamp(280px, 80vw, 420px)',
                height: '320px',
                borderRadius: '20px',
                background: '#1a0f08',
                border: `1px solid ${hoveredCard === i ? 'var(--red)' : 'rgba(249,8,8,0.15)'}`,
                position: 'relative', overflow: 'hidden',
                display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                padding: '2rem',
                transform: hoveredCard === i ? 'translateY(-8px)' : 'translateY(0)',
                transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
                boxShadow: hoveredCard === i ? '0 20px 60px rgba(249,8,8,0.25)' : '0 4px 20px rgba(0,0,0,0.3)',
              }}>
              {/* Image if available */}
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.08 }}>
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#f90808" strokeWidth="0.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
                </svg>
              </div>
              <div style={{ position: 'absolute', top: '1rem', right: '1rem', fontFamily: 'Inter,sans-serif', fontSize: '0.65rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Screenshot coming soon
              </div>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.8rem' }}>
                  {w.tags.map((tag, j) => (
                    <span key={j} style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.62rem', fontWeight: 600, color: 'var(--red)', letterSpacing: '0.1em', textTransform: 'uppercase', background: 'rgba(249,8,8,0.12)', padding: '0.15rem 0.6rem', borderRadius: '50px' }}>{tag}</span>
                  ))}
                </div>
                <h3 style={{ fontFamily: 'Sora,sans-serif', fontWeight: 800, fontSize: 'clamp(1.4rem,4vw,1.8rem)', color: 'white', marginBottom: '0.4rem' }}>{w.client}</h3>
                <p style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5, fontWeight: 300 }}>{w.title}</p>
              </div>
            </div>
          ))}

          {/* Invite card */}
          <div style={{
            flexShrink: 0, width: 'clamp(260px,70vw,360px)', height: '320px',
            borderRadius: '20px', border: '2px dashed rgba(249,8,8,0.35)',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', padding: '2rem', textAlign: 'center',
          }}>
            <div style={{ width: '48px', height: '48px', background: 'rgba(249,8,8,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.2rem', fontSize: '1.4rem', color: 'var(--red)' }}>+</div>
            <p style={{ fontFamily: 'Sora,sans-serif', fontWeight: 700, fontSize: '1rem', color: 'rgba(255,255,255,0.7)', marginBottom: '1.2rem', lineHeight: 1.3 }}>Your project could be here.</p>
            <Link href="/contact" style={{ fontFamily: 'Inter,sans-serif', fontWeight: 600, fontSize: '0.85rem', color: 'white', background: 'var(--red)', padding: '0.7rem 1.5rem', borderRadius: '50px', textDecoration: 'none', minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}>
              Book a Free Call →
            </Link>
          </div>
        </div>
      </section>

      {/* Case study detail cards */}
      <section style={{ background: 'var(--cream)', padding: '4rem 1.5rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <p style={{ fontFamily: 'Inter', fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--red)', marginBottom: '0.8rem', fontWeight: 500 }}>Project Details</p>
          <h2 style={{ fontFamily: 'Sora,sans-serif', fontWeight: 800, fontSize: 'clamp(1.6rem,4vw,2.5rem)', color: 'var(--dark)', letterSpacing: '-0.02em', marginBottom: '2.5rem' }}>What we built</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {caseStudies.map((w, i) => (
              <div key={i} style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', border: '2px solid #ede9e3', boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}>
                <div style={{ background: '#0d1b2a', padding: '1.5rem 2rem' }}>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.6rem' }}>
                    {w.tags.map((tag, j) => (
                      <span key={j} style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.62rem', fontWeight: 600, color: 'var(--red)', letterSpacing: '0.1em', textTransform: 'uppercase', background: 'rgba(249,8,8,0.15)', padding: '0.15rem 0.6rem', borderRadius: '50px' }}>{tag}</span>
                    ))}
                  </div>
                  <h3 style={{ fontFamily: 'Sora,sans-serif', fontWeight: 800, fontSize: 'clamp(1.1rem,3vw,1.5rem)', color: 'white' }}>{w.client}</h3>
                  <p style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.88rem', color: 'rgba(255,255,255,0.6)', marginTop: '0.3rem', fontWeight: 300 }}>{w.title}</p>
                </div>
                <div style={{ padding: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '2rem' }}>
                  <div>
                    <h4 style={{ fontFamily: 'Sora,sans-serif', fontWeight: 700, fontSize: '0.82rem', color: 'var(--red)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>The Challenge</h4>
                    <p style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.8, fontWeight: 300 }}>{w.challenge}</p>
                  </div>
                  <div>
                    <h4 style={{ fontFamily: 'Sora,sans-serif', fontWeight: 700, fontSize: '0.82rem', color: 'var(--red)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>What We Built</h4>
                    <p style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.8, fontWeight: 300 }}>{w.whatWeBuilt}</p>
                  </div>
                  <div>
                    <h4 style={{ fontFamily: 'Sora,sans-serif', fontWeight: 700, fontSize: '0.82rem', color: 'var(--red)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>The Result</h4>
                    <p style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.8, fontWeight: 300 }}>{w.result}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#fff', padding: '5rem 1.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Sora,sans-serif', fontWeight: 800, fontSize: 'clamp(1.6rem,4vw,3rem)', color: 'var(--dark)', marginBottom: '1rem', letterSpacing: '-0.02em' }}>Ready to be next?</h2>
          <p style={{ fontFamily: 'Inter,sans-serif', color: 'var(--muted)', fontSize: '1rem', marginBottom: '2rem', lineHeight: 1.8 }}>Tell us about your project and we will get back to you within 24 hours.</p>
          <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', background: 'var(--red)', color: 'white', padding: '1rem 2.2rem', fontFamily: 'Inter,sans-serif', fontWeight: 600, fontSize: '0.9rem', borderRadius: '50px', boxShadow: '0 4px 20px rgba(249,8,8,0.3)', textDecoration: 'none', minHeight: '52px' }}>
            Start Your Project →
          </Link>
        </div>
      </section>
    </>
  )
}
