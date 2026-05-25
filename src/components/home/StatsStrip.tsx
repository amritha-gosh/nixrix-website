'use client'
import { useEffect, useRef, useState } from 'react'

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
  return (
    <div ref={ref} style={{ fontFamily: 'Sora,sans-serif', fontWeight: 800, fontSize: 'clamp(1.8rem,4vw,2.8rem)', color: 'white', letterSpacing: '-0.03em' }}>
      {count}{suffix}
    </div>
  )
}

const stats = [
  { target: 20, suffix: '+', label: 'Projects Delivered', sub: 'and growing' },
  { target: 92, suffix: '%', label: 'Client Satisfaction', sub: 'across all projects' },
  { target: 24, suffix: 'h', label: 'Response Guarantee', sub: 'no chasing required' },
  { target: 100, suffix: '%', label: 'Tailored Solutions', sub: 'built around your business' },
]

export default function StatsStrip() {
  return (
    <section style={{ background: 'var(--red)', padding: '2rem 1.5rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg,transparent 35%,rgba(255,255,255,0.07) 50%,transparent 65%)', backgroundSize: '200% 100%', animation: 'shimmer 4s linear infinite', pointerEvents: 'none' }} />
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: '0.5rem', position: 'relative', zIndex: 1 }}>
        {stats.map((s, i) => (
          <div key={i} style={{ textAlign: 'center', padding: '1rem 0.5rem' }}>
            <Counter target={s.target} suffix={s.suffix} />
            <div style={{ fontFamily: 'Sora,sans-serif', fontSize: 'clamp(0.78rem,2vw,0.9rem)', color: 'white', fontWeight: 600, marginTop: '0.3rem' }}>{s.label}</div>
            <div style={{ fontFamily: 'Inter,sans-serif', fontSize: 'clamp(0.65rem,1.5vw,0.75rem)', color: 'rgba(255,255,255,0.75)', marginTop: '0.15rem' }}>{s.sub}</div>
          </div>
        ))}
      </div>
      <style>{`@keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}`}</style>
    </section>
  )
}
