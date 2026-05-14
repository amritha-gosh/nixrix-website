'use client'
import { useEffect, useRef, useState } from 'react'

// Sparkle star particle canvas
function SparkleCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return
    const ctx = canvas.getContext('2d'); if (!ctx) return
    let W = canvas.width = canvas.offsetWidth
    let H = canvas.height = canvas.offsetHeight
    let animId: number

    type Star = { x:number; y:number; size:number; alpha:number; speed:number; twinkle:number; phase:number }
    const stars: Star[] = Array.from({ length: 60 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      size: Math.random() * 2.5 + 0.5,
      alpha: Math.random() * 0.6 + 0.1,
      speed: Math.random() * 0.3 + 0.05,
      twinkle: Math.random() * 0.02 + 0.005,
      phase: Math.random() * Math.PI * 2,
    }))

    function drawStar(x: number, y: number, size: number, alpha: number) {
      ctx!.save()
      ctx!.globalAlpha = alpha
      // 4-point star
      ctx!.fillStyle = 'white'
      ctx!.beginPath()
      const spikes = 4, outer = size, inner = size * 0.35
      for (let i = 0; i < spikes * 2; i++) {
        const angle = (i * Math.PI) / spikes - Math.PI / 2
        const r = i % 2 === 0 ? outer : inner
        const px = x + Math.cos(angle) * r
        const py = y + Math.sin(angle) * r
        i === 0 ? ctx!.moveTo(px, py) : ctx!.lineTo(px, py)
      }
      ctx!.closePath(); ctx!.fill()

      // Glow
      ctx!.globalAlpha = alpha * 0.4
      ctx!.shadowColor = 'white'
      ctx!.shadowBlur = size * 3
      ctx!.fill()
      ctx!.restore()
    }

    let t = 0
    function animate() {
      ctx!.clearRect(0, 0, W, H)
      stars.forEach(s => {
        s.phase += s.twinkle
        const twinkleAlpha = s.alpha * (0.5 + 0.5 * Math.sin(s.phase))
        s.y -= s.speed
        if (s.y < -10) { s.y = H + 10; s.x = Math.random() * W }
        drawStar(s.x, s.y, s.size, twinkleAlpha)
      })
      t++
      animId = requestAnimationFrame(animate)
    }
    animate()
    const onR = () => { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight }
    window.addEventListener('resize', onR)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onR) }
  }, [])
  return <canvas ref={ref} style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none' }} />
}

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true
        let start = 0
        const timer = setInterval(() => {
          start += target / (2000 / 16)
          if (start >= target) { setCount(target); clearInterval(timer) }
          else setCount(Math.floor(start))
        }, 16)
      }
    }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [target])
  return <div ref={ref} style={{ fontFamily:'Sora,sans-serif', fontWeight:800, fontSize:'clamp(2.5rem,4vw,3.5rem)', color:'white', letterSpacing:'-0.03em' }}>{count}{suffix}</div>
}

const stats = [
  { target:20, suffix:'+', label:'Projects Delivered', sub:'and growing' },
  { target:92, suffix:'%', label:'Client Satisfaction', sub:'across all projects' },
  { target:24, suffix:'h', label:'Response Guarantee', sub:'no chasing required' },
  { target:100, suffix:'%', label:'Tailored Solutions', sub:'every solution built around your business' },
]

export default function StatsStrip() {
  return (
    <section style={{ background:'var(--red)', padding:'4rem 3rem', position:'relative', overflow:'hidden', minHeight:'180px' }}>
      {/* Shimmer sweep */}
      <div style={{
        position:'absolute', inset:0,
        background:'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.07) 50%, transparent 65%)',
        backgroundSize:'200% 100%',
        animation:'shimmer 4s linear infinite',
        pointerEvents:'none', zIndex:1,
      }}/>
      {/* White sparkle stars */}
      <SparkleCanvas />

      <div style={{ maxWidth:'1200px', margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:'2px', position:'relative', zIndex:2 }}>
        {stats.map((s, i) => (
          <div key={i} style={{ textAlign:'center', padding:'2rem 1rem' }}>
            <Counter target={s.target} suffix={s.suffix} />
            <div style={{ fontFamily:'Sora,sans-serif', fontSize:'1rem', color:'rgba(255,255,255,1)', fontWeight:600, marginTop:'0.5rem' }}>{s.label}</div>
            <div style={{ fontFamily:'Inter,sans-serif', fontSize:'0.8rem', color:'rgba(255,255,255,0.8)', marginTop:'0.25rem' }}>{s.sub}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
