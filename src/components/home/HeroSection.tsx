'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const onScroll = () => {
      if (window.innerWidth < 768) return
      const scrollY = window.scrollY
      const h = section.offsetHeight
      const progress = Math.min(scrollY / h, 1)
      if (progress > 0) {
        section.style.transform = `perspective(1200px) rotateX(${progress * 12}deg) scale(${1 - progress * 0.08})`
        section.style.opacity = `${1 - progress * 1.4}`
        section.style.transformOrigin = 'center bottom'
      } else {
        section.style.transform = ''
        section.style.opacity = '1'
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const c = ctx
    let W = canvas.width = window.innerWidth
    let H = canvas.height = window.innerHeight
    let animId: number
    const mouse = { x: W / 2, y: H / 2 }
    const onMouseMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY }
    const onResize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('resize', onResize)

    type P = { x:number; y:number; vx:number; vy:number; r:number; a:number }
    const particles: P[] = Array.from({ length: window.innerWidth < 768 ? 50 : 120 }, () => ({
      x: Math.random()*W, y: Math.random()*H,
      vx: (Math.random()-0.5)*0.4, vy: (Math.random()-0.5)*0.4,
      r: Math.random()*2+0.5, a: Math.random()*0.35+0.08,
    }))

    type Ring = { rotX:number; rotY:number; rotZ:number; vX:number; vY:number; vZ:number; radius:number; segments:number }
    const rings: Ring[] = [
      { rotX:0, rotY:0, rotZ:0, vX:0.004, vY:0.006, vZ:0.002, radius:200, segments:14 },
      { rotX:1, rotY:0.5, rotZ:0.3, vX:-0.003, vY:0.004, vZ:0.002, radius:130, segments:10 },
      { rotX:0.5, rotY:1.2, rotZ:0.8, vX:0.002, vY:-0.005, vZ:0.003, radius:280, segments:18 },
    ]

    function project(x:number, y:number, z:number, cx:number, cy:number) {
      const fov = 700, s = fov/(fov+z)
      return { x: cx+x*s, y: cy+y*s, s }
    }

    function drawRing(ring: Ring, cx:number, cy:number) {
      const pts = []
      for (let i=0; i<ring.segments; i++) {
        const angle = (i/ring.segments)*Math.PI*2
        const rx = Math.cos(angle)*ring.radius, ry = Math.sin(angle)*ring.radius, rz = 0
        const y1 = ry*Math.cos(ring.rotX)-rz*Math.sin(ring.rotX)
        const z1 = ry*Math.sin(ring.rotX)+rz*Math.cos(ring.rotX)
        const x2 = rx*Math.cos(ring.rotY)+z1*Math.sin(ring.rotY)
        const z2 = -rx*Math.sin(ring.rotY)+z1*Math.cos(ring.rotY)
        const x3 = x2*Math.cos(ring.rotZ)-y1*Math.sin(ring.rotZ)
        const y3 = x2*Math.sin(ring.rotZ)+y1*Math.cos(ring.rotZ)
        pts.push(project(x3,y3,z2,cx,cy))
      }
      for (let i=0; i<pts.length; i++) {
        const ptA=pts[i], ptB=pts[(i+1)%pts.length]
        const alpha=Math.max(0.04,Math.min(0.18,ptA.s*0.15))
        c.strokeStyle=`rgba(249,8,8,${alpha})`; c.lineWidth=1
        c.beginPath(); c.moveTo(ptA.x,ptA.y); c.lineTo(ptB.x,ptB.y); c.stroke()
      }
      ring.rotX+=ring.vX; ring.rotY+=ring.vY; ring.rotZ+=ring.vZ
    }

    function animate() {
      c.clearRect(0,0,W,H)
      const g = c.createRadialGradient(W*0.75,H*0.4,0,W*0.75,H*0.4,W*0.55)
      g.addColorStop(0,'rgba(249,8,8,0.04)'); g.addColorStop(1,'rgba(249,8,8,0)')
      c.fillStyle=g; c.fillRect(0,0,W,H)
      rings.forEach(r => drawRing(r,W*0.72,H*0.5))
      particles.forEach(p => {
        const dx=mouse.x-p.x, dy=mouse.y-p.y, dist=Math.sqrt(dx*dx+dy*dy)
        if (dist<120){p.vx+=dx*0.0001; p.vy+=dy*0.0001}
        p.x+=p.vx; p.y+=p.vy; p.vx*=0.99; p.vy*=0.99
        if(p.x<0)p.x=W; if(p.x>W)p.x=0; if(p.y<0)p.y=H; if(p.y>H)p.y=0
        c.beginPath(); c.arc(p.x,p.y,p.r,0,Math.PI*2)
        c.fillStyle=`rgba(249,8,8,${p.a})`; c.fill()
      })
      for (let i=0; i<particles.length; i++) for (let j=i+1; j<particles.length; j++) {
        const dx=particles[i].x-particles[j].x, dy=particles[i].y-particles[j].y
        const d=Math.sqrt(dx*dx+dy*dy)
        if(d<90){c.strokeStyle=`rgba(249,8,8,${0.06*(1-d/90)})`; c.lineWidth=0.5; c.beginPath(); c.moveTo(particles[i].x,particles[i].y); c.lineTo(particles[j].x,particles[j].y); c.stroke()}
      }
      animId=requestAnimationFrame(animate)
    }
    animate()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('mousemove',onMouseMove); window.removeEventListener('resize',onResize) }
  }, [])

  return (
    <section ref={sectionRef} style={{ position:'relative', minHeight:'100vh', display:'flex', alignItems:'center', overflow:'hidden', background:'#ffffff', willChange:'transform, opacity' }}>
      <canvas ref={canvasRef} style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none' }}/>
      <div style={{ position:'absolute', left:0, top:0, bottom:0, width:'3px', background:'linear-gradient(to bottom,transparent,var(--red),transparent)', opacity:0.5 }}/>
      <div style={{ position:'relative', zIndex:2, maxWidth:'1200px', margin:'0 auto', padding:'100px 1.5rem 3rem', width:'100%' }}>
        <div style={{ maxWidth:'640px' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'0.6rem', marginBottom:'1.5rem', padding:'0.45rem 1rem', border:'1px solid rgba(249,8,8,0.25)', color:'var(--red)', fontFamily:'Inter,sans-serif', fontSize:'0.72rem', letterSpacing:'0.16em', textTransform:'uppercase', background:'rgba(249,8,8,0.03)' }}>
            <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'var(--red)', display:'inline-block', animation:'pulse 2s infinite' }}/>
            Digital Systems &amp; Automation Company
          </div>
          <h1 style={{ fontFamily:'Sora,sans-serif', fontWeight:800, fontSize:'clamp(2.2rem,7vw,5.2rem)', lineHeight:1.05, color:'var(--dark)', marginBottom:'1.2rem', letterSpacing:'-0.03em' }}>
            Simplifying<br/>Digital.<br/><span style={{ color:'var(--red)' }}>Amplifying Growth.</span>
          </h1>
          <p style={{ fontFamily:'Inter,sans-serif', fontWeight:300, fontSize:'clamp(0.95rem,2.5vw,1.15rem)', color:'var(--muted)', marginBottom:'2rem', lineHeight:1.85, maxWidth:'500px' }}>
            NIXRIX creates digital foundations that help businesses look sharper, work smarter, and scale with confidence.
          </p>
          <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap' }}>
            <Link href="/contact" style={{ background:'var(--red)', color:'white', padding:'1rem 2rem', fontFamily:'Inter,sans-serif', fontWeight:600, fontSize:'0.9rem', display:'inline-flex', alignItems:'center', gap:'0.6rem', transition:'background 0.2s', borderRadius:'50px', boxShadow:'0 4px 20px rgba(249,8,8,0.3)', textDecoration:'none', minHeight:'52px', flex:'1 1 auto', justifyContent:'center' }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background='var(--dark)'}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background='var(--red)'}>
              Start Your Project →
            </Link>
            <Link href="/work" style={{ background:'transparent', color:'var(--dark)', padding:'1rem 2rem', fontFamily:'Inter,sans-serif', fontWeight:600, fontSize:'0.9rem', border:'2px solid var(--dark)', display:'inline-flex', alignItems:'center', gap:'0.6rem', transition:'all 0.2s', borderRadius:'50px', textDecoration:'none', minHeight:'52px', flex:'1 1 auto', justifyContent:'center' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background='var(--dark)'; (e.currentTarget as HTMLAnchorElement).style.color='white' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background='transparent'; (e.currentTarget as HTMLAnchorElement).style.color='var(--dark)' }}>
              View Our Work
            </Link>
          </div>
        </div>
      </div>
      <style>{`@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.4;transform:scale(1.6)}}`}</style>
    </section>
  )
}
