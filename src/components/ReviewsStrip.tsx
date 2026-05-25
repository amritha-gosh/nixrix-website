'use client'
import { useEffect, useRef } from 'react'

const reviews = [
  { name: 'Sarah M.', role: 'Business Owner', text: 'NIXRIX transformed how we handle our leads. The automation they built saves us hours every week.', stars: 5 },
  { name: 'James T.', role: 'Managing Director', text: 'Professional, fast, and genuinely invested in our success. The website they built is outstanding.', stars: 5 },
  { name: 'Priya K.', role: 'Operations Manager', text: 'The Power BI dashboard gave us clarity we never had before. Now we make decisions based on real data.', stars: 5 },
  { name: 'Daniel R.', role: 'Founder', text: 'From first call to final delivery the team was exceptional. They understood exactly what we needed.', stars: 5 },
  { name: 'Emma L.', role: 'Marketing Director', text: 'Our Google rankings improved significantly within weeks. The SEO work was thorough and effective.', stars: 5 },
  { name: 'Ahmed S.', role: 'CEO', text: 'The HubSpot CRM setup was seamless. Our sales team now has full visibility of every lead.', stars: 5 },
]

function StarRating({ count }: { count: number }) {
  return (
    <div style={{ display: 'flex', gap: '2px', marginBottom: '0.8rem' }}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#f90808">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

function ReviewCard({ review }: { review: typeof reviews[0] }) {
  return (
    <div style={{
      flexShrink: 0, width: '300px',
      background: 'white', borderRadius: '14px',
      padding: '1.5rem', margin: '0 10px',
      border: '1px solid #e8e3dc',
      boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
    }}>
      <StarRating count={review.stars} />
      <p style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.88rem', color: '#444', lineHeight: 1.75, fontWeight: 300, marginBottom: '1.2rem' }}>
        &ldquo;{review.text}&rdquo;
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--red)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ fontFamily: 'Sora,sans-serif', fontWeight: 700, fontSize: '0.85rem', color: 'white' }}>{review.name[0]}</span>
        </div>
        <div>
          <div style={{ fontFamily: 'Sora,sans-serif', fontWeight: 700, fontSize: '0.85rem', color: '#0d1b2a' }}>{review.name}</div>
          <div style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.72rem', color: '#aaa' }}>{review.role}</div>
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default function ReviewsStrip() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let pos = 0
    let animId: number
    const speed = 0.5
    function animate() {
      pos += speed
      const halfWidth = track!.scrollWidth / 2
      if (pos >= halfWidth) pos = 0
      track!.style.transform = `translateX(-${pos}px)`
      animId = requestAnimationFrame(animate)
    }
    animate()
    // Pause on hover
    const pause = () => cancelAnimationFrame(animId)
    const resume = () => animate()
    track.addEventListener('mouseenter', pause)
    track.addEventListener('mouseleave', resume)
    return () => {
      cancelAnimationFrame(animId)
      track.removeEventListener('mouseenter', pause)
      track.removeEventListener('mouseleave', resume)
    }
  }, [])

  const doubled = [...reviews, ...reviews]

  return (
    <section style={{ background: '#f7f5f2', padding: '3rem 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div>
          <p style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--red)', marginBottom: '0.3rem', fontWeight: 500 }}>Client Reviews</p>
          <h2 style={{ fontFamily: 'Sora,sans-serif', fontWeight: 800, fontSize: 'clamp(1.4rem,3vw,2rem)', color: '#0d1b2a', letterSpacing: '-0.02em' }}>What our clients say</h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'white', padding: '0.6rem 1rem', borderRadius: '50px', border: '1px solid #e8e3dc' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span style={{ fontFamily: 'Sora,sans-serif', fontWeight: 700, fontSize: '0.85rem', color: '#0d1b2a' }}>5.0</span>
          <div style={{ display: 'flex', gap: '1px' }}>
            {[1,2,3,4,5].map(i => <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#f90808"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
          </div>
          <span style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.75rem', color: '#aaa' }}>Google Reviews</span>
        </div>
      </div>

      <div style={{ overflow: 'hidden' }}>
        <div ref={trackRef} style={{ display: 'flex', willChange: 'transform' }}>
          {doubled.map((r, i) => <ReviewCard key={i} review={r} />)}
        </div>
      </div>
    </section>
  )
}
