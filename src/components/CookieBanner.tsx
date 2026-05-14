'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
export default function CookieBanner() {
  const [show, setShow] = useState(false)
  useEffect(() => { const a = localStorage.getItem('nixrix-cookies'); if (!a) setTimeout(() => setShow(true), 1500) }, [])
  const accept = () => { localStorage.setItem('nixrix-cookies','accepted'); setShow(false) }
  const decline = () => { localStorage.setItem('nixrix-cookies','declined'); setShow(false) }
  if (!show) return null
  return (
    <div style={{ position:'fixed', bottom:'1.5rem', left:'50%', transform:'translateX(-50%)', zIndex:9997, background:'var(--dark)', border:'1px solid #2a2010', padding:'1.2rem 1.8rem', display:'flex', alignItems:'center', gap:'1.5rem', flexWrap:'wrap', maxWidth:'680px', width:'calc(100% - 3rem)', boxShadow:'0 20px 60px rgba(0,0,0,0.4)', borderRadius:'12px' }}>
      <p style={{ fontFamily:'Inter,sans-serif', fontSize:'0.82rem', color:'#aaa', lineHeight:1.6, flex:1, margin:0 }}>
        We use cookies to improve your experience. Read our <Link href="/cookies" style={{ color:'var(--red)' }}>Cookie Policy</Link>.
      </p>
      <div style={{ display:'flex', gap:'0.6rem', flexShrink:0 }}>
        <button onClick={decline} style={{ padding:'0.5rem 1rem', border:'1px solid #333', background:'transparent', color:'#666', fontFamily:'Inter,sans-serif', fontSize:'0.78rem', cursor:'pointer', borderRadius:'8px' }}>Decline</button>
        <button onClick={accept} style={{ padding:'0.5rem 1.2rem', background:'var(--red)', border:'none', color:'white', fontFamily:'Inter,sans-serif', fontWeight:600, fontSize:'0.78rem', cursor:'pointer', borderRadius:'8px' }}>Accept</button>
      </div>
    </div>
  )
}
