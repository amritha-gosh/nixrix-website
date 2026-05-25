'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const steps = [
  {
    num:'01', title:'Discovery Call',
    desc:'We start with a free 30-minute call to understand your business, goals, challenges, and what success looks like for you. No fluff, just honest conversation.',
    icon:<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 011 1.18 2 2 0 013 .01h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L7.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/></svg>,
  },
  {
    num:'02', title:'Strategy and Proposal',
    desc:'We analyse your needs and put together a clear strategy and proposal, including scope, timeline, and investment. No hidden costs, no surprises.',
    icon:<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  },
  {
    num:'03', title:'Design and Build',
    desc:'Our team gets to work. You get regular updates, design previews, and opportunities to give feedback at every stage. Fully collaborative.',
    icon:<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
  },
  {
    num:'04', title:'Launch and Handover',
    desc:'We launch your project, train your team if needed, and make sure everything runs perfectly. You are never left to figure it out alone.',
    icon:<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8"><path d="M22 2L11 13"/><path d="M22 2L15 22 11 13 2 9l20-7z"/></svg>,
  },
  {
    num:'05', title:'Ongoing Support',
    desc:'Most clients stay with us long-term. We offer retainer packages for ongoing development, marketing, and system management.',
    icon:<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  },
]

// Floating pattern dots in white
function FloatingPattern() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return
    const ctx = canvas.getContext('2d'); if (!ctx) return
    let W = canvas.width = canvas.offsetWidth
    let H = canvas.height = canvas.offsetHeight
    let animId: number

    type Dot = { x:number; y:number; vx:number; vy:number; r:number; alpha:number; phase:number; speed:number }
    const dots: Dot[] = Array.from({ length: 50 }, () => ({
      x: Math.random()*W, y: Math.random()*H,
      vx: (Math.random()-0.5)*0.3, vy: -Math.random()*0.4-0.1,
      r: Math.random()*3+1,
      alpha: Math.random()*0.25+0.05,
      phase: Math.random()*Math.PI*2,
      speed: Math.random()*0.02+0.01,
    }))

    // Plus/cross pattern
    type Cross = { x:number; y:number; size:number; alpha:number; vy:number; phase:number }
    const crosses: Cross[] = Array.from({ length: 18 }, () => ({
      x: Math.random()*W, y: Math.random()*H,
      size: Math.random()*6+3,
      alpha: Math.random()*0.12+0.03,
      vy: -Math.random()*0.2-0.05,
      phase: Math.random()*Math.PI*2,
    }))

    let t = 0
    function draw() {
      ctx!.clearRect(0,0,W,H)
      // Dots
      dots.forEach(d => {
        d.x += d.vx + Math.sin(d.phase+t*d.speed)*0.3
        d.y += d.vy
        d.phase += 0.01
        if (d.y < -10) { d.y = H+10; d.x = Math.random()*W }
        if (d.x < -10) d.x = W+10
        if (d.x > W+10) d.x = -10
        ctx!.beginPath()
        ctx!.arc(d.x, d.y, d.r, 0, Math.PI*2)
        ctx!.fillStyle = `rgba(255,255,255,${d.alpha})`
        ctx!.fill()
      })
      // Crosses/plus signs
      crosses.forEach(c => {
        c.y += c.vy
        c.phase += 0.008
        if (c.y < -20) { c.y = H+20; c.x = Math.random()*W }
        const alpha = c.alpha * (0.5 + 0.5*Math.sin(c.phase))
        ctx!.strokeStyle = `rgba(255,255,255,${alpha})`
        ctx!.lineWidth = 1
        ctx!.beginPath()
        ctx!.moveTo(c.x-c.size, c.y); ctx!.lineTo(c.x+c.size, c.y)
        ctx!.moveTo(c.x, c.y-c.size); ctx!.lineTo(c.x, c.y+c.size)
        ctx!.stroke()
      })
      t++
      animId = requestAnimationFrame(draw)
    }
    draw()
    const onR = () => {
      W = canvas.width = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
    }
    window.addEventListener('resize', onR)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onR) }
  }, [])
  return <canvas ref={ref} style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none', zIndex:0 }}/>
}

function WheelCard({ step }: { step: typeof steps[0] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [rx, setRx] = useState(0)
  const [opacity, setOpacity] = useState(1)
  const [shadow, setShadow] = useState(0)

  useEffect(() => {
    const el = ref.current; if (!el) return
    const onScroll = () => {
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const cardH = rect.height

      if (rect.top > vh) {
        // Below viewport — flat, waiting
        setRx(0); setOpacity(1); setShadow(0); return
      }

      if (rect.bottom < 0) {
        // Above viewport — gone
        setRx(0); setOpacity(0); setShadow(0); return
      }

      if (rect.top >= 0 && rect.bottom <= vh) {
        // Fully visible — flat
        setRx(0); setOpacity(1); setShadow(0); return
      }

      if (rect.top < 0) {
        // Exiting top — card pivots from bottom, rising outward forward
        // rect.top goes from 0 to -cardH as it exits
        const exitProg = Math.min(1, Math.abs(rect.top) / (cardH * 0.7))
        // Positive rotateX = tilts top toward viewer (rises outward)
        const rotation = 55 * exitProg
        setRx(rotation)
        setOpacity(Math.max(0, 1 - exitProg * 0.85))
        setShadow(exitProg * 40)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div ref={ref} style={{ marginBottom:'1.2rem', perspective:'900px', perspectiveOrigin:'center bottom' }}>
      <div style={{
        background:'var(--red)',
        borderRadius:'20px',
        padding:'2.8rem 3rem',
        display:'flex',
        alignItems:'center',
        gap:'1.2rem',
        transformOrigin:'bottom center',
        transform:`rotateX(${rx}deg)`,
        opacity,
        transition:'transform 0.05s linear, opacity 0.05s linear',
        willChange:'transform, opacity',
        boxShadow:`0 ${8+shadow}px ${30+shadow*2}px rgba(180,10,10,${0.25+shadow*0.008}), 0 0 ${shadow*2}px rgba(249,8,8,${shadow*0.015})`,
        position:'relative',
        overflow:'hidden',
      }}>
        {/* Floating white pattern inside card */}
        <FloatingPattern />

        {/* Number oval */}
        <div style={{
          flexShrink:0, zIndex:1,
          width:'80px', height:'58px',
          border:'2.5px solid rgba(255,255,255,0.6)',
          borderRadius:'50px',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontFamily:'Sora,sans-serif', fontWeight:800, fontSize:'1.35rem',
          color:'white',
        }}>{step.num}</div>

        {/* Text */}
        <div style={{ flex:1, zIndex:1 }}>
          <h3 style={{
            fontFamily:'Sora,sans-serif', fontWeight:800,
            fontSize:'clamp(1.25rem,2.5vw,1.6rem)',
            color:'#0d1b2a', marginBottom:'0.6rem',
            letterSpacing:'-0.01em',
          }}>{step.title}</h3>
          <p style={{
            fontFamily:'Sora,sans-serif', fontWeight:400,
            fontSize:'1rem', color:'rgba(255,255,255,0.95)',
            lineHeight:1.85, maxWidth:'620px',
          }}>{step.desc}</p>
        </div>

        {/* Icon */}
        <div style={{ flexShrink:0, opacity:0.7, zIndex:1 }}>
          {step.icon}
        </div>
      </div>
    </div>
  )
}

function SineCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return
    const ctx = canvas.getContext('2d'); if (!ctx) return
    let W = canvas.width = window.innerWidth, H = canvas.height = 480
    let animId: number, t = 0
    function draw() {
      ctx!.clearRect(0,0,W,H)
      for (let w=0; w<5; w++) {
        ctx!.beginPath()
        const amp=28+w*14, freq=0.006+w*0.002, spd=0.014+w*0.007
        for (let x=0; x<=W; x+=2) {
          const y = H/2 + amp*Math.sin(x*freq+t*spd+w*1.2)
          x===0 ? ctx!.moveTo(x,y) : ctx!.lineTo(x,y)
        }
        ctx!.strokeStyle=`rgba(249,8,8,${0.1-w*0.015})`
        ctx!.lineWidth=1.2; ctx!.stroke()
      }
      t++; animId=requestAnimationFrame(draw)
    }
    draw()
    const onR=()=>{W=canvas.width=window.innerWidth}
    window.addEventListener('resize',onR)
    return()=>{cancelAnimationFrame(animId);window.removeEventListener('resize',onR)}
  },[])
  return <canvas ref={ref} style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none'}}/>
}

export default function HowWeWork() {
  return (
    <>
      <section style={{position:'relative',background:'#fff',paddingTop:'96px',paddingBottom:'40px',overflow:'hidden',minHeight:'280px'}}>
        <SineCanvas/>
        <div style={{position:'relative',zIndex:1,maxWidth:'1200px',margin:'0 auto',padding:'0 3rem'}}>
          <p style={{fontFamily:'Inter',fontSize:'0.75rem',letterSpacing:'0.14em',textTransform:'uppercase',color:'var(--red)',marginBottom:'1rem',fontWeight:500}}>Our Process</p>
          <h1 style={{fontFamily:'Sora,sans-serif',fontWeight:800,fontSize:'clamp(2.5rem,5vw,4.5rem)',color:'#0d1b2a',letterSpacing:'-0.03em',lineHeight:1.05,marginBottom:'1.5rem'}}>
            Simple process.<br/><span style={{color:'var(--red)'}}>Exceptional results.</span>
          </h1>
          <p style={{fontFamily:'Inter,sans-serif',fontWeight:300,fontSize:'1.05rem',color:'var(--muted)',maxWidth:'500px',lineHeight:1.85}}>
            We keep things clear, collaborative, and focused on outcomes, not just deliverables.
          </p>
        </div>
      </section>

      <section style={{background:'#fafaf8',padding:'2rem 1.5rem 2.5rem'}}>
        <div style={{maxWidth:'860px',margin:'0 auto'}}>
          <p style={{fontFamily:'Inter,sans-serif',fontSize:'0.8rem',color:'var(--muted)',letterSpacing:'0.08em',textTransform:'uppercase',fontWeight:500,marginBottom:'1.5rem',textAlign:'center'}}>
            Scroll to explore each step ↓
          </p>
          {steps.map((s,i)=><WheelCard key={i} step={s}/>)}
        </div>
      </section>

      <section style={{background:'#fff',padding:'2rem 1.5rem 2.5rem',textAlign:'center',borderTop:'1px solid #ede9e3'}}>
        <div style={{maxWidth:'600px',margin:'0 auto'}}>
          <h2 style={{fontFamily:'Sora,sans-serif',fontWeight:800,fontSize:'clamp(1.8rem,4vw,3rem)',color:'#0d1b2a',marginBottom:'1rem',letterSpacing:'-0.02em'}}>Ready to get started?</h2>
          <p style={{fontFamily:'Inter,sans-serif',color:'var(--muted)',fontSize:'1rem',marginBottom:'1rem',lineHeight:1.8}}>Book your free discovery call today. No commitment, no pressure.</p>
          <Link href="/contact" style={{display:'inline-flex',alignItems:'center',gap:'0.6rem',background:'var(--red)',color:'white',padding:'1rem 2.2rem',fontFamily:'Inter,sans-serif',fontWeight:600,fontSize:'0.9rem',borderRadius:'50px',boxShadow:'0 4px 20px rgba(249,8,8,0.3)'}}>
            Book Free Call →
          </Link>
        </div>
      </section>
    </>
  )
}
