'use client'
import { useState, useRef, useEffect } from 'react'

type Msg = { from: 'bot' | 'user'; text: string }

const faqs = [
  { keywords: ['price', 'cost', 'how much', 'pricing', 'charge', 'fee', 'budget', 'afford', 'expensive', 'cheap'], answer: 'Our pricing depends on the scope of your project. We offer flexible pricing and staged payment options. Book a free discovery call and we will give you a tailored quote with no obligation.' },
  { keywords: ['web', 'website', 'design', 'build', 'landing', 'page', 'site'], answer: 'We build custom websites that are fast, mobile-first, SEO-ready and conversion-focused. From single landing pages to full multi-page business websites. Want to discuss yours? Visit our contact page.' },
  { keywords: ['automat', 'crm', 'hubspot', 'make', 'workflow', 'manual', 'process', 'zapier'], answer: 'We specialise in business automation using HubSpot, Make.com, AI chatbots and custom integrations. We map your current processes and automate the repetitive parts so your team can focus on growth.' },
  { keywords: ['seo', 'google', 'rank', 'search', 'traffic', 'found', 'appear'], answer: 'Yes, we offer full SEO services including technical SEO, local SEO for Leeds, content optimisation, Google Business Profile setup and AI search optimisation.' },
  { keywords: ['social', 'instagram', 'linkedin', 'facebook', 'content', 'post', 'media'], answer: 'We manage social media for businesses including content creation, scheduling and performance reporting. We work primarily with LinkedIn and Instagram.' },
  { keywords: ['dashboard', 'power bi', 'data', 'report', 'analytics', 'kpi', 'insight'], answer: 'We build Power BI dashboards connected to your existing data sources. You get a live view of your business performance without spending hours on manual reports.' },
  { keywords: ['logo', 'brand', 'identity', 'colours', 'typography', 'branding'], answer: 'Yes, we offer logo design and full brand identity packages including colour palette, typography, brand guidelines and logo files in all formats.' },
  { keywords: ['how long', 'timeline', 'time', 'when', 'deadline', 'quick', 'fast', 'delivery'], answer: 'Timelines depend on the project. A landing page can be live in days. A full website typically takes 2 to 4 weeks. Automation projects vary based on complexity. We always agree a timeline before starting.' },
  { keywords: ['where', 'location', 'based', 'leeds', 'uk', 'office', 'local'], answer: 'We are based in Leeds, West Yorkshire, UK. We work with clients across the UK, US and UAE. Most of our work is done remotely so location is never a barrier.' },
  { keywords: ['contact', 'call', 'speak', 'phone', 'talk', 'meet', 'book', 'appointment'], answer: 'You can book a free discovery call via our contact page, email info@nixrix.com or call +44 7492 712144. We respond within 24 hours.' },
  { keywords: ['support', 'maintain', 'update', 'retainer', 'ongoing', 'after', 'launch'], answer: 'Yes, we offer monthly support retainers. Our plans cover website updates, performance monitoring, CRM health checks, SEO monitoring and priority support. Starting from £197 per month.' },
  { keywords: ['letting', 'estate', 'property', 'agent', 'landlord', 'tenant'], answer: 'We have a dedicated Agency Smart Pack built specifically for letting agencies. It includes a professional website, CRM setup, lead automation and team training.' },
  { keywords: ['ecommerce', 'shop', 'store', 'sell', 'product', 'woocommerce', 'shopify'], answer: 'We set up online stores as part of our web design packages. Whether you need a simple product catalogue or a full ecommerce store, we can build it.' },
  { keywords: ['ai', 'artificial', 'intelligence', 'chatbot', 'gpt', 'openai'], answer: 'We integrate AI tools into business workflows including AI chatbots, document processing automation and AI-assisted lead handling. All using proven tools like Make.com and OpenAI.' },
  { keywords: ['invoice', 'quote', 'proposal', 'contract'], answer: 'Once we have discussed your project on a discovery call we send a clear written proposal with full scope, timeline and pricing. No hidden costs.' },
  { keywords: ['small business', 'startup', 'new business', 'just starting'], answer: 'We work with businesses at all stages, from brand new startups to established companies. We have entry-level packages designed for businesses just getting started digitally.' },
  { keywords: ['what do you do', 'services', 'help', 'offer', 'provide'], answer: 'NIXRIX offers five core services: web design and brand, business automation and CRM, data dashboards, digital marketing, and custom software. We also offer monthly support retainers.' },
  { keywords: ['nixrix', 'about', 'company', 'team', 'who'], answer: 'NIXRIX is a digital systems and automation company based in Leeds, UK. We are a team of strategists, designers, developers and automation specialists helping businesses grow through smarter digital systems.' },
]

function getReply(input: string) {
  const lower = input.toLowerCase()
  if (['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'howdy'].some(g => lower.includes(g))) {
    return 'Hi there! I am the NIXRIX assistant. Ask me anything about our services, pricing, timelines or process and I will do my best to help.'
  }
  if (['thank', 'thanks', 'cheers', 'great'].some(g => lower.includes(g))) {
    return 'You are welcome! Is there anything else I can help you with? Or feel free to book a free call at nixrix.com/contact.'
  }
  for (const faq of faqs) {
    if (faq.keywords.some(k => lower.includes(k))) return faq.answer
  }
  return 'That is a great question. For a detailed answer specific to your business, book a free discovery call or email info@nixrix.com. We reply within 24 hours.'
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
      <button onClick={() => setOpen(o => !o)} style={{ position: 'fixed', bottom: '2rem', left: '2rem', zIndex: 999, width: '52px', height: '52px', borderRadius: '50%', background: open ? '#0d1b2a' : 'var(--red)', border: 'none', color: 'white', boxShadow: '0 4px 20px rgba(249,8,8,0.35)', transition: 'all 0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '1.3rem' }}>
        {open ? '✕' : '💬'}
      </button>

      {open && (
        <div style={{ position: 'fixed', bottom: '6rem', left: '2rem', zIndex: 998, width: 'min(320px, calc(100vw - 4rem))', maxHeight: '460px', background: '#fff', boxShadow: '0 20px 60px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column', border: '2px solid var(--red)', borderRadius: '16px', overflow: 'hidden' }}>
          <div style={{ background: '#0d1b2a', padding: '1rem 1.2rem', display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
            <div style={{ width: '36px', height: '36px', background: 'var(--red)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden', padding: '6px' }}>
              <img src="/nixrix-icon.svg" alt="NIXRIX" style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
            </div>
            <div>
              <div style={{ fontFamily: 'Sora,sans-serif', fontWeight: 700, fontSize: '0.9rem', color: 'white' }}>NIXRIX Assistant</div>
              <div style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
                Online
              </div>
            </div>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.7rem', background: '#fafaf9' }}>
            {msgs.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: m.from === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{ maxWidth: '82%', padding: '0.65rem 0.9rem', background: m.from === 'user' ? 'var(--red)' : '#fff', color: m.from === 'user' ? 'white' : '#0d1b2a', fontFamily: 'Inter,sans-serif', fontSize: '0.83rem', lineHeight: 1.6, borderRadius: m.from === 'user' ? '12px 12px 0 12px' : '12px 12px 12px 0', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div style={{ padding: '0.65rem 0.9rem', background: '#fff', width: 'fit-content', borderRadius: '12px 12px 12px 0', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', display: 'flex', gap: '4px', alignItems: 'center' }}>
                {[0, 1, 2].map(i => <span key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ccc', display: 'inline-block', animation: `bounce 1s ${i * 0.2}s infinite` }} />)}
              </div>
            )}
            <div ref={bottom} />
          </div>

          <div style={{ padding: '0.8rem', borderTop: '1px solid #eee', display: 'flex', gap: '0.5rem', background: '#fff' }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Ask anything..." style={{ flex: 1, padding: '0.65rem 0.9rem', border: '1.5px solid #e0ddd8', fontFamily: 'Inter,sans-serif', fontSize: '0.83rem', outline: 'none', borderRadius: '8px', transition: 'border-color 0.2s' }}
              onFocus={e => (e.currentTarget as HTMLInputElement).style.borderColor = 'var(--red)'}
              onBlur={e => (e.currentTarget as HTMLInputElement).style.borderColor = '#e0ddd8'} />
            <button onClick={send} style={{ background: 'var(--red)', color: 'white', border: 'none', padding: '0.65rem 1rem', fontFamily: 'Inter,sans-serif', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer', borderRadius: '8px', minWidth: '44px' }}>→</button>
          </div>
        </div>
      )}
      <style>{`@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}`}</style>
    </>
  )
}
