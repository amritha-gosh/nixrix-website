'use client'
import { useState, useRef, useEffect } from 'react'

type Msg = { from: 'bot' | 'user'; text: string }

const faqs = [
  { keywords: ['price', 'cost', 'how much', 'pricing', 'charge', 'fee', 'budget', 'afford'], answer: 'Our pricing depends on the scope of your project. We offer flexible pricing and staged payment options. Book a free discovery call and we will give you a tailored quote with no obligation.' },
  { keywords: ['web', 'website', 'design', 'build', 'landing', 'page', 'site'], answer: 'We build custom websites that are fast, mobile-first, SEO-ready and conversion-focused. From single landing pages to full multi-page business websites.' },
  { keywords: ['automat', 'crm', 'hubspot', 'make', 'workflow', 'manual', 'process'], answer: 'We specialise in business automation using HubSpot, Make.com, AI chatbots and custom integrations. We automate lead follow-up, onboarding, documents and reporting.' },
  { keywords: ['seo', 'google', 'rank', 'search', 'traffic', 'found'], answer: 'Yes, we offer full SEO services including technical SEO, local SEO for Leeds, content optimisation and AI search optimisation.' },
  { keywords: ['social', 'instagram', 'linkedin', 'facebook', 'content', 'post'], answer: 'We manage social media for businesses including content creation, scheduling and performance reporting. We work primarily with LinkedIn and Instagram.' },
  { keywords: ['dashboard', 'power bi', 'data', 'report', 'analytics', 'kpi'], answer: 'We build Power BI dashboards connected to your existing data sources. Live view of your business performance without manual reports.' },
  { keywords: ['logo', 'brand', 'identity', 'branding'], answer: 'Yes, we offer logo design and full brand identity packages including colour palette, typography, brand guidelines and logo files in all formats.' },
  { keywords: ['how long', 'timeline', 'time', 'when', 'deadline', 'quick', 'fast'], answer: 'A landing page can be live in days. A full website typically takes 2 to 4 weeks. Automation projects vary based on complexity.' },
  { keywords: ['where', 'location', 'based', 'leeds', 'uk', 'office'], answer: 'We are based in Leeds, West Yorkshire, UK. We work with clients across the UK, US and UAE. Most work is done remotely.' },
  { keywords: ['contact', 'call', 'speak', 'phone', 'talk', 'meet', 'book'], answer: 'Book a free discovery call via our contact page, email info@nixrix.com or call +44 7492 712144. We respond within 24 hours.' },
  { keywords: ['support', 'maintain', 'update', 'retainer', 'ongoing'], answer: 'Yes, we offer monthly support retainers from £197/month covering updates, monitoring, CRM health checks and priority support.' },
  { keywords: ['what do you do', 'services', 'help', 'offer', 'provide'], answer: 'NIXRIX offers five core services: web design and brand, business automation and CRM, data dashboards, digital marketing, and custom software.' },
  { keywords: ['nixrix', 'about', 'company', 'team', 'who'], answer: 'NIXRIX is a digital systems and automation company based in Leeds, UK. We help businesses grow through smarter digital systems.' },
  { keywords: ['small business', 'startup', 'new business'], answer: 'We work with businesses at all stages. We have entry-level packages designed for businesses just getting started digitally.' },
]

function getReply(input: string) {
  const lower = input.toLowerCase()
  if (['hello', 'hi', 'hey', 'good morning', 'good afternoon'].some(g => lower.includes(g)))
    return 'Hi there! I am the NIXRIX assistant. Ask me anything about our services, pricing, timelines or process.'
  if (['thank', 'thanks', 'cheers', 'great'].some(g => lower.includes(g)))
    return 'You are welcome! Feel free to book a free call at nixrix.com/contact anytime.'
  for (const faq of faqs)
    if (faq.keywords.some(k => lower.includes(k))) return faq.answer
  return 'Great question! For a detailed answer, book a free discovery call or email info@nixrix.com. We reply within 24 hours.'
}

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState<Msg[]>([{ from: 'bot', text: 'Hi! I am the NIXRIX assistant. Ask me anything about our services, pricing or process.' }])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottom = useRef<HTMLDivElement>(null)

  useEffect(() => { bottom.current?.scrollIntoView({ behavior: 'smooth' }) }, [msgs, typing])

  const send = () => {
    if (!input.trim()) return
    const txt = input.trim()
    setInput('')
    setMsgs(m => [...m, { from: 'user', text: txt }])
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMsgs(m => [...m, { from: 'bot', text: getReply(txt) }])
    }, 800)
  }

  return (
    <>
      {/* Fancy chatbot button — bottom RIGHT */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 999,
          width: '60px', height: '60px', borderRadius: '50%',
          background: open
            ? '#0d1b2a'
            : 'linear-gradient(135deg, #f90808 0%, #a50000 100%)',
          border: 'none', color: 'white',
          boxShadow: open
            ? '0 8px 32px rgba(13,27,42,0.5)'
            : '0 8px 32px rgba(249,8,8,0.5), 0 0 0 4px rgba(249,8,8,0.15)',
          transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
          animation: open ? 'none' : 'chatPulse 3s ease-in-out infinite',
        }}>
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill="white" opacity="0.95"/>
            <circle cx="9" cy="10" r="1.2" fill="#f90808"/>
            <circle cx="12" cy="10" r="1.2" fill="#f90808"/>
            <circle cx="15" cy="10" r="1.2" fill="#f90808"/>
          </svg>
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div style={{
          position: 'fixed', bottom: '6.5rem', right: '2rem', zIndex: 998,
          width: 'min(340px, calc(100vw - 3rem))',
          maxHeight: '480px', background: '#fff',
          boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
          display: 'flex', flexDirection: 'column',
          border: '1.5px solid rgba(249,8,8,0.2)',
          borderRadius: '20px', overflow: 'hidden',
        }}>
          {/* Header */}
          <div style={{ background: 'linear-gradient(135deg,#0d1b2a 0%,#1a2f4a 100%)', padding: '1rem 1.2rem', display: 'flex', alignItems: 'center', gap: '0.7rem', borderBottom: '2px solid #f90808' }}>
            <div style={{ width: '38px', height: '38px', background: 'var(--red)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, padding: '7px' }}>
              <img src="/nixrix-icon.svg" alt="NIXRIX" style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'Sora,sans-serif', fontWeight: 700, fontSize: '0.9rem', color: 'white' }}>NIXRIX Assistant</div>
              <div style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
                Online — replies instantly
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{ background: 'rgba(255,255,255,0.08)', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', padding: '0.3rem', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.7rem', background: '#f8fafd' }}>
            {msgs.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: m.from === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '82%', padding: '0.65rem 0.9rem',
                  background: m.from === 'user' ? 'linear-gradient(135deg,#f90808,#c00000)' : '#fff',
                  color: m.from === 'user' ? 'white' : '#0d1b2a',
                  fontFamily: 'Inter,sans-serif', fontSize: '0.83rem', lineHeight: 1.6,
                  borderRadius: m.from === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                }}>
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{ padding: '0.65rem 0.9rem', background: '#fff', borderRadius: '16px 16px 16px 4px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', display: 'flex', gap: '4px', alignItems: 'center' }}>
                  {[0, 1, 2].map(i => (
                    <span key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ccc', display: 'inline-block', animation: `bounce 1s ${i * 0.2}s infinite` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottom} />
          </div>

          {/* Input */}
          <div style={{ padding: '0.8rem', borderTop: '1px solid #eee', display: 'flex', gap: '0.5rem', background: '#fff' }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Ask anything..."
              style={{ flex: 1, padding: '0.65rem 0.9rem', border: '1.5px solid #e0ddd8', fontFamily: 'Inter,sans-serif', fontSize: '0.83rem', outline: 'none', borderRadius: '10px', transition: 'border-color 0.2s' }}
              onFocus={e => (e.currentTarget as HTMLInputElement).style.borderColor = '#f90808'}
              onBlur={e => (e.currentTarget as HTMLInputElement).style.borderColor = '#e0ddd8'}
            />
            <button
              onClick={send}
              style={{ background: 'linear-gradient(135deg,#f90808,#c00000)', color: 'white', border: 'none', padding: '0.65rem 1rem', fontFamily: 'Inter,sans-serif', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer', borderRadius: '10px', minWidth: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          </div>
        </div>
      )}
      <style>{`
        @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
        @keyframes chatPulse{0%,100%{box-shadow:0 8px 32px rgba(249,8,8,0.5),0 0 0 4px rgba(249,8,8,0.15)}50%{box-shadow:0 8px 32px rgba(249,8,8,0.6),0 0 0 8px rgba(249,8,8,0.08)}}
      `}</style>
    </>
  )
}
