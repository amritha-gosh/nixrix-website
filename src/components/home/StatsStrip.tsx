'use client'
import { useEffect, useRef, useState } from 'react'

function Counter({ target, suffix }: { target:number; suffix:string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true
        let start = 0
        const timer = setInterval(() => {
          start += target / (2000/16)
          if (start >= target) { setCount(target); clearInterval(timer) }
          else setCount(Math.floor(start))
        }, 16)
      }
    }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [target])
  return <div ref={ref} style={{ fontFamily:'Sora,sans-serif', fontWeight:800, fontSize:'clamp(2rem,6vw,3.5rem)', color:'white', letterSpacing:'-0.03em' }}>{count}{suffix}</div>
}

function SparkleCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return
    const ctx = canvas.getContext('2d'); if (!ctx) return
    const c = ctx
    let W = canvas.width = canvas.offsetWidth
    let H = canvas.height = canvas.offsetHeight
    let animId: number
    const stars = Array.from({ length: 40 }, () => ({
      x: Math.random()*W, y: Math.random()*H,
      size: Math.random()*2+0.5, alpha: Math.random()*0.5+0.1,
      vy: -Math.random()*0.3-0.05, phase: Math.random()*Math.PI*2,
    }))
    function animate() {
      c.clearRect(0,0,W,H)
      stars.forEach(s => {
        s.phase+=0.015; s.y+=s.vy
        if(s.y<-10){s.y=H+10;s.x=Math.random()*W}
        c.save(); c.globalAlpha=s.alpha*(0.5+0.5*Math.sin(s.phase)); c.fillStyle='white'
        c.beginPath()
        for(let i=0;i<8;i++){const a=(i*Math.PI)/4-Math.PI/2;const r=i%2===0?s.size:s.size*0.35;c.lineTo(s.x+Math.cos(a)*r,s.y+Math.sin(a)*r)}
        c.closePath(); c.fill(); c.restore()
      })
      animId=requestAnimationFrame(animate)
    }
    animate()
    const onR=()=>{W=canvas.width=canvas.offsetWidth;H=canvas.height=canvas.offsetHeight}
    window.addEventListener('resize',onR)
    return()=>{cancelAnimationFrame(animId);window.removeEventListener('resize',onR)}
  },[])
  return <canvas ref={ref} style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none'}}/>
}

const stats = [
  { target:20, suffix:'+', label:'Projects Delivered', sub:'and growing' },
  { target:92, suffix:'%', label:'Client Satisfaction', sub:'across all projects' },
  { target:24, suffix:'h', label:'Response Guarantee', sub:'no chasing required' },
  { target:100, suffix:'%', label:'Tailored Solutions', sub:'every solution built around your business' },
]

export default function StatsStrip() {
  return (
    <section style={{ background:'var(--red)', padding:'3rem 1.5rem', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(105deg,transparent 35%,rgba(255,255,255,0.07) 50%,transparent 65%)', backgroundSize:'200% 100%', animation:'shimmer 4s linear infinite', pointerEvents:'none', zIndex:1 }}/>
      <SparkleCanvas/>
      <div style={{ maxWidth:'1200px', margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'1rem', position:'relative', zIndex:2 }}>
        {stats.map((s,i) => (
          <div key={i} style={{ textAlign:'center', padding:'1.5rem 0.5rem' }}>
            <Counter target={s.target} suffix={s.suffix}/>
            <div style={{ fontFamily:'Sora,sans-serif', fontSize:'clamp(0.82rem,2.5vw,1rem)', color:'white', fontWeight:600, marginTop:'0.4rem' }}>{s.label}</div>
            <div style={{ fontFamily:'Inter,sans-serif', fontSize:'clamp(0.7rem,2vw,0.82rem)', color:'rgba(255,255,255,0.75)', marginTop:'0.2rem' }}>{s.sub}</div>
          </div>
        ))}
      </div>
      <style>{`@keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}`}</style>
    </section>
  )
}
