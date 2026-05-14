'use client'
import { useState, useRef, useEffect } from 'react'
type Msg = { from: 'bot' | 'user'; text: string }
const faqs = [
  { keywords:['price','cost','how much','pricing'], answer:'Our pricing depends on the project. We offer a free discovery call to give you a tailored quote. Call +44 7492 712144 or use the contact form.' },
  { keywords:['web','website','design','build'], answer:'We build custom websites that are fast, SEO-ready, and conversion-focused. Want to discuss yours? Visit /contact' },
  { keywords:['automat','crm','hubspot','make'], answer:'We specialise in business automation using HubSpot, Make.com, AI chatbots, and custom integrations.' },
  { keywords:['seo','google','rank','search'], answer:'Yes! We offer full SEO, local SEO for Leeds, Google & Meta ads, and AI search optimisation.' },
  { keywords:['where','location','based','leeds'], answer:'We are based in Leeds, West Yorkshire. We work with clients across the UK, US and UAE.' },
  { keywords:['contact','call','speak','phone'], answer:'Email info@nixrix.com, call +44 7492 712144, or visit /contact. We reply within 24 hours.' },
]
function getReply(input: string) {
  const lower = input.toLowerCase()
  if (['hello','hi','hey'].some(g => lower.includes(g))) return 'Hi! I am the NIXRIX assistant. Ask me anything about our services, pricing, or process.'
  for (const faq of faqs) { if (faq.keywords.some(k => lower.includes(k))) return faq.answer }
  return 'Great question! For detailed answers, call +44 7492 712144 or email info@nixrix.com. We reply within 24 hours.'
}
export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState<Msg[]>([{ from:'bot', text:'Hi! Ask me anything about NIXRIX services, pricing, or process.' }])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottom = useRef<HTMLDivElement>(null)
  useEffect(() => { bottom.current?.scrollIntoView({ behavior:'smooth' }) }, [msgs, typing])
  const send = () => {
    if (!input.trim()) return
    const txt = input.trim(); setInput('')
    setMsgs(m => [...m, { from:'user', text:txt }]); setTyping(true)
    setTimeout(() => { setTyping(false); setMsgs(m => [...m, { from:'bot', text:getReply(txt) }]) }, 900)
  }
  return (
    <>
      <button onClick={() => setOpen(o => !o)} style={{ position:'fixed', bottom:'2rem', left:'2rem', zIndex:999, width:'56px', height:'56px', borderRadius:'50%', background:open?'var(--dark)':'var(--red)', border:'none', color:'white', fontSize:'1.4rem', boxShadow:'0 4px 20px rgba(249,8,8,0.35)', transition:'all 0.3s', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
        {open ? '✕' : '💬'}
      </button>
      {open && (
        <div style={{ position:'fixed', bottom:'6rem', left:'2rem', zIndex:998, width:'320px', maxHeight:'460px', background:'#fff', boxShadow:'0 20px 60px rgba(0,0,0,0.15)', display:'flex', flexDirection:'column', border:'2px solid var(--red)', borderRadius:'16px', overflow:'hidden' }}>
          <div style={{ background:'var(--dark)', padding:'1rem 1.2rem', display:'flex', alignItems:'center', gap:'0.7rem' }}>
            <div style={{ width:'36px', height:'36px', background:'var(--red)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1rem', color:'white' }}>N</div>
            <div>
              <div style={{ fontFamily:'Sora,sans-serif', fontWeight:700, fontSize:'0.9rem', color:'white' }}>NIXRIX Assistant</div>
              <div style={{ fontFamily:'Inter,sans-serif', fontSize:'0.7rem', color:'#888' }}>Online</div>
            </div>
          </div>
          <div style={{ flex:1, overflowY:'auto', padding:'1rem', display:'flex', flexDirection:'column', gap:'0.7rem', background:'#fafaf9' }}>
            {msgs.map((m,i) => (
              <div key={i} style={{ display:'flex', justifyContent:m.from==='user'?'flex-end':'flex-start' }}>
                <div style={{ maxWidth:'80%', padding:'0.65rem 0.9rem', background:m.from==='user'?'var(--red)':'#fff', color:m.from==='user'?'white':'var(--dark)', fontFamily:'Inter,sans-serif', fontSize:'0.83rem', lineHeight:1.6, borderRadius:m.from==='user'?'12px 12px 0 12px':'12px 12px 12px 0', boxShadow:'0 1px 4px rgba(0,0,0,0.08)' }}>{m.text}</div>
              </div>
            ))}
            {typing && <div style={{ padding:'0.65rem 0.9rem', background:'#fff', width:'fit-content', borderRadius:'12px 12px 12px 0', boxShadow:'0 1px 4px rgba(0,0,0,0.08)' }}>...</div>}
            <div ref={bottom}/>
          </div>
          <div style={{ padding:'0.8rem', borderTop:'1px solid #eee', display:'flex', gap:'0.5rem', background:'#fff' }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key==='Enter'&&send()} placeholder="Ask anything..." style={{ flex:1, padding:'0.6rem 0.8rem', border:'1px solid #e0ddd8', fontFamily:'Inter,sans-serif', fontSize:'0.83rem', outline:'none', borderRadius:'8px' }}/>
            <button onClick={send} style={{ background:'var(--red)', color:'white', border:'none', padding:'0.6rem 1rem', fontFamily:'Inter,sans-serif', fontWeight:600, fontSize:'0.82rem', cursor:'pointer', borderRadius:'8px' }}>→</button>
          </div>
        </div>
      )}
    </>
  )
}
