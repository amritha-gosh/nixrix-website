'use client'
import { useState, useEffect, useRef } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name:'', business:'', email:'', phone:'', service:'', message:'' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [logoHover, setLogoHover] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return
    const ctx = canvas.getContext('2d'); if (!ctx) return
    let W = canvas.width = window.innerWidth
    let H = canvas.height = window.innerHeight
    let animId: number
    const pts = Array.from({ length: 80 }, () => ({
      x: Math.random()*W, y: Math.random()*H,
      vx: (Math.random()-0.5)*0.35, vy: (Math.random()-0.5)*0.35,
      r: Math.random()*1.8+0.4, a: Math.random()*0.25+0.05,
    }))
    function draw() {
      ctx!.clearRect(0,0,W,H)
      pts.forEach(p => {
        p.x+=p.vx; p.y+=p.vy
        if(p.x<0)p.x=W; if(p.x>W)p.x=0
        if(p.y<0)p.y=H; if(p.y>H)p.y=0
        ctx!.beginPath(); ctx!.arc(p.x,p.y,p.r,0,Math.PI*2)
        ctx!.fillStyle=`rgba(249,8,8,${p.a})`; ctx!.fill()
      })
      for(let i=0;i<pts.length;i++) for(let j=i+1;j<pts.length;j++) {
        const dx=pts[i].x-pts[j].x, dy=pts[i].y-pts[j].y, d=Math.sqrt(dx*dx+dy*dy)
        if(d<90){ctx!.strokeStyle=`rgba(249,8,8,${0.05*(1-d/90)})`;ctx!.lineWidth=0.5;ctx!.beginPath();ctx!.moveTo(pts[i].x,pts[i].y);ctx!.lineTo(pts[j].x,pts[j].y);ctx!.stroke()}
      }
      animId=requestAnimationFrame(draw)
    }
    draw()
    const onR=()=>{W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight}
    window.addEventListener('resize',onR)
    return()=>{cancelAnimationFrame(animId);window.removeEventListener('resize',onR)}
  },[])

  const handle = (e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) =>
    setForm(f=>({...f,[e.target.name]:e.target.value}))

  const submit = async (e:React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError('')
    try {
      const res = await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)})
      if(res.ok) setSent(true)
      else setError('Something went wrong. Please email us directly at info@nixrix.com')
    } catch { setError('Network error. Please email info@nixrix.com directly.') }
    setLoading(false)
  }

  const inputStyle:React.CSSProperties = {
    width:'100%', padding:'0.9rem 1rem',
    fontFamily:'Inter,sans-serif', fontSize:'0.9rem',
    border:'1.5px solid #e0ddd8', background:'#fff',
    color:'#0d1b2a', outline:'none', borderRadius:'0',
    transition:'border-color 0.2s',
  }

  const socials = [
    { label:'LinkedIn', href:'https://linkedin.com/company/nixrix', icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg> },
    { label:'Instagram', href:'https://instagram.com/nixrix_', icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg> },
    { label:'Twitter/X', href:'https://twitter.com/nixrix', icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
  ]

  return (
    <>
      <canvas ref={canvasRef} style={{position:'fixed',inset:0,pointerEvents:'none',zIndex:0,opacity:0.5}}/>

      <section style={{position:'relative',zIndex:1,minHeight:'90vh',paddingTop:"110px",display:'flex',alignItems:'stretch'}}>
        <div style={{maxWidth:'1300px',margin:'0 auto',width:'100%',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',minHeight:'calc(100vh - 80px)'}}>

          {/* ── LEFT SIDE ── */}
          <div style={{background:'#0d1b2a',padding:'5rem 4rem',display:'flex',flexDirection:'column',justifyContent:'center',position:'relative',overflow:'hidden'}}>
            {/* Red accent line */}
            <div style={{position:'absolute',left:0,top:0,bottom:0,width:'4px',background:'var(--red)'}}/>
            {/* Subtle glow */}
            <div style={{position:'absolute',top:'-100px',left:'-100px',width:'400px',height:'400px',background:'radial-gradient(circle,rgba(249,8,8,0.08) 0%,transparent 70%)',pointerEvents:'none'}}/>

            {/* Logo with shine animation */}
            <div style={{marginBottom:'1.5rem',position:'relative',display:'inline-block'}}
              onMouseEnter={()=>setLogoHover(true)}
              onMouseLeave={()=>setLogoHover(false)}>
              <div style={{position:'relative',display:'inline-block',overflow:'hidden'}}>
                <img src="/nixrix-logo.svg" alt="NIXRIX" style={{height:'60px',width:'auto',filter:'brightness(0) invert(1)',transition:'transform 0.3s ease',transform:logoHover?'scale(1.04)':'scale(1)'}}/>
                {/* Shine sweep */}
                <div style={{position:'absolute',inset:0,background:'linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.4) 50%,transparent 60%)',transform:logoHover?'translateX(200%)':'translateX(-200%)',transition:'transform 0.5s ease',pointerEvents:'none'}}/>
              </div>
            </div>

            <p style={{fontFamily:'Inter,sans-serif',fontSize:'0.75rem',fontWeight:500,letterSpacing:'0.14em',textTransform:'uppercase',color:'var(--red)',marginBottom:'1rem'}}>Get In Touch</p>

            <h1 style={{fontFamily:'Sora,sans-serif',fontWeight:800,fontSize:'clamp(2.8rem,5vw,4.5rem)',color:'white',letterSpacing:'-0.03em',lineHeight:1.0,marginBottom:'1.8rem'}}>
              Let&apos;s talk.
            </h1>

            <p style={{fontFamily:'Inter,sans-serif',fontWeight:300,fontSize:'1rem',color:'#aaa',lineHeight:1.9,marginBottom:'1.5rem',maxWidth:'440px'}}>
              Why spend time on tasks that can be automated? Tell us what is slowing your business down. We will tell you exactly what we would do about it — no jargon, no pressure, no obligation.
            </p>

            <p style={{fontFamily:'Inter,sans-serif',fontWeight:300,fontSize:'0.92rem',color:'#888',lineHeight:1.85,marginBottom:'1.2rem',maxWidth:'440px'}}>
              We work with businesses across the UK, US and UAE. Whether you need a website that actually converts, a CRM that works without manual input, or a dashboard that shows you what&apos;s really happening — we&apos;ll find the fastest way to get you there.
            </p>

            {/* Contact details */}
            <div style={{display:'flex',flexDirection:'column',gap:'1rem',marginBottom:'1.2rem'}}>
              {[
                {icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, text:'info@nixrix.com', href:'mailto:info@nixrix.com'},
                {icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 011 1.18 2 2 0 013 .01h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L7.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/></svg>, text:'+44 7492 712144', href:'tel:+447492712144'},
                {icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>, text:'Leeds | London | Remote Worldwide', href:null},
              ].map((c,i)=>(
                <div key={i} style={{display:'flex',alignItems:'center',gap:'0.8rem'}}>
                  <div style={{color:'var(--red)',flexShrink:0}}>{c.icon}</div>
                  {c.href ? (
                    <a href={c.href} style={{fontFamily:'Inter,sans-serif',fontSize:'0.9rem',color:'#ccc',transition:'color 0.2s'}}
                      onMouseEnter={e=>e.currentTarget.style.color='var(--red)'}
                      onMouseLeave={e=>e.currentTarget.style.color='#ccc'}>{c.text}</a>
                  ) : (
                    <span style={{fontFamily:'Inter,sans-serif',fontSize:'0.9rem',color:'#ccc'}}>{c.text}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Social links */}
            <div style={{display:'flex',gap:'0.8rem',marginBottom:'1.2rem'}}>
              {socials.map((s,i)=>(
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  style={{width:'40px',height:'40px',border:'1px solid #2a2a1a',display:'flex',alignItems:'center',justifyContent:'center',color:'#666',transition:'all 0.2s',borderRadius:'0'}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--red)';e.currentTarget.style.color='var(--red)';e.currentTarget.style.background='rgba(249,8,8,0.08)'}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor='#2a2a1a';e.currentTarget.style.color='#666';e.currentTarget.style.background='transparent'}}
                >{s.icon}</a>
              ))}
            </div>

            {/* Reassurance line */}
            <div style={{display:'flex',alignItems:'center',gap:'0.6rem',padding:'1rem 1.2rem',border:'1px solid #2a2a1a',background:'rgba(249,8,8,0.04)'}}>
              <span style={{color:'var(--red)',fontSize:'1rem'}}>✦</span>
              <p style={{fontFamily:'Inter,sans-serif',fontSize:'0.82rem',color:'#777',margin:0,fontStyle:'italic'}}>
                Flexible pricing. Staged payments. We get started fast.
              </p>
            </div>
          </div>

          {/* ── RIGHT SIDE — FORM ── */}
          <div style={{background:'#fff',padding:'5rem 4rem',display:'flex',flexDirection:'column',justifyContent:'center'}}>
            {sent ? (
              <div style={{textAlign:'center',padding:'3rem 0'}}>
                <div style={{width:'72px',height:'72px',background:'var(--red)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 2rem',fontSize:'2rem',color:'white'}}>✓</div>
                <h2 style={{fontFamily:'Sora,sans-serif',fontWeight:800,fontSize:'2rem',color:'#0d1b2a',marginBottom:'1rem'}}>Message sent!</h2>
                <p style={{fontFamily:'Inter,sans-serif',color:'var(--muted)',fontSize:'1rem',lineHeight:1.8}}>
                  Thanks for reaching out. We will get back to you within 24 hours — usually much sooner.
                </p>
              </div>
            ) : (
              <>
                <div style={{marginBottom:'1.2rem'}}>
                  <h2 style={{fontFamily:'Sora,sans-serif',fontWeight:800,fontSize:'clamp(1.6rem,3vw,2.2rem)',color:'#0d1b2a',letterSpacing:'-0.02em',marginBottom:'0.6rem'}}>
                    Start the conversation.
                  </h2>
                  <p style={{fontFamily:'Inter,sans-serif',fontSize:'0.88rem',color:'var(--muted)',fontWeight:300}}>
                    We reply within 24 hours. No automated responses.
                  </p>
                </div>

                <form onSubmit={submit} style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
                  <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:'1rem'}}>
                    <div>
                      <label style={{fontFamily:'Inter,sans-serif',fontSize:'0.75rem',fontWeight:600,color:'#0d1b2a',letterSpacing:'0.06em',textTransform:'uppercase',display:'block',marginBottom:'0.4rem'}}>Your Name <span style={{color:'var(--red)'}}>*</span></label>
                      <input required name="name" placeholder="Jane Smith" value={form.name} onChange={handle}
                        style={inputStyle}
                        onFocus={e=>e.currentTarget.style.borderColor='var(--red)'}
                        onBlur={e=>e.currentTarget.style.borderColor='#e0ddd8'}/>
                    </div>
                    <div>
                      <label style={{fontFamily:'Inter,sans-serif',fontSize:'0.75rem',fontWeight:600,color:'#0d1b2a',letterSpacing:'0.06em',textTransform:'uppercase',display:'block',marginBottom:'0.4rem'}}>Business Name <span style={{ color:'#aaa', fontWeight:400, textTransform:'none', letterSpacing:0, fontSize:'0.68rem' }}>— optional</span></label>
                      <input name="business" placeholder="Acme Ltd" value={form.business} onChange={handle}
                        style={inputStyle}
                        onFocus={e=>e.currentTarget.style.borderColor='var(--red)'}
                        onBlur={e=>e.currentTarget.style.borderColor='#e0ddd8'}/>
                    </div>
                  </div>

                  <div>
                    <label style={{fontFamily:'Inter,sans-serif',fontSize:'0.75rem',fontWeight:600,color:'#0d1b2a',letterSpacing:'0.06em',textTransform:'uppercase',display:'block',marginBottom:'0.4rem'}}>Email Address <span style={{color:'var(--red)'}}>*</span></label>
                    <input required name="email" type="email" placeholder="jane@acme.com" value={form.email} onChange={handle}
                      style={inputStyle}
                      onFocus={e=>e.currentTarget.style.borderColor='var(--red)'}
                      onBlur={e=>e.currentTarget.style.borderColor='#e0ddd8'}/>
                  </div>

                  <div>
                    <label style={{fontFamily:'Inter,sans-serif',fontSize:'0.75rem',fontWeight:600,color:'#0d1b2a',letterSpacing:'0.06em',textTransform:'uppercase',display:'block',marginBottom:'0.4rem'}}>Phone Number <span style={{color:'#ccc',fontWeight:400,textTransform:'none',letterSpacing:0}}>— optional</span></label>
                    <input name="phone" placeholder="+44 7000 000000" value={form.phone} onChange={handle}
                      style={inputStyle}
                      onFocus={e=>e.currentTarget.style.borderColor='var(--red)'}
                      onBlur={e=>e.currentTarget.style.borderColor='#e0ddd8'}/>
                  </div>

                  <div>
                    <label style={{fontFamily:'Inter,sans-serif',fontSize:'0.75rem',fontWeight:600,color:'#0d1b2a',letterSpacing:'0.06em',textTransform:'uppercase',display:'block',marginBottom:'0.4rem'}}>How can we help you? <span style={{color:'var(--red)'}}>*</span></label>
                    <select required name="service" value={form.service} onChange={handle}
                      style={{...inputStyle,color:form.service?'#0d1b2a':'#aaa',appearance:'none',backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23f90808' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,backgroundRepeat:'no-repeat',backgroundPosition:'right 1rem center',paddingRight:'2.5rem'}}
                      onFocus={e=>e.currentTarget.style.borderColor='var(--red)'}
                      onBlur={e=>e.currentTarget.style.borderColor='#e0ddd8'}>
                      <option value="">Select a service...</option>
                      <optgroup label="Web & Brand">
                        <option>Website design & build</option>
                        <option>Logo & brand identity</option>
                        <option>Landing page</option>
                      </optgroup>
                      <optgroup label="Automation">
                        <option>HubSpot CRM setup</option>
                        <option>Business automation (Make.com)</option>
                        <option>AI document automation</option>
                      </optgroup>
                      <optgroup label="Data & Analytics">
                        <option>Power BI dashboard</option>
                      </optgroup>
                      <optgroup label="Marketing">
                        <option>Social media management</option>
                        <option>Google & Meta ads</option>
                        <option>SEO</option>
                      </optgroup>
                      <optgroup label="Support">
                        <option>Monthly retainer / ongoing support</option>
                      </optgroup>
                      <option>Not sure — I need advice</option>
                    </select>
                  </div>

                  <div>
                    <label style={{fontFamily:'Inter,sans-serif',fontSize:'0.75rem',fontWeight:600,color:'#0d1b2a',letterSpacing:'0.06em',textTransform:'uppercase',display:'block',marginBottom:'0.4rem'}}>Tell us about your business <span style={{color:'#ccc',fontWeight:400,textTransform:'none',letterSpacing:0}}>— optional</span></label>
                    <textarea name="message" placeholder="What's the biggest challenge you're facing right now?" value={form.message} onChange={handle} rows={4}
                      style={{...inputStyle,resize:'vertical'}}
                      onFocus={e=>e.currentTarget.style.borderColor='var(--red)'}
                      onBlur={e=>e.currentTarget.style.borderColor='#e0ddd8'}/>
                  </div>

                  {error && <p style={{color:'var(--red)',fontFamily:'Inter',fontSize:'0.82rem',margin:0}}>{error}</p>}

                  <button type="submit" disabled={loading}
                    style={{width:'100%',padding:'1.1rem',background:'var(--red)',color:'white',border:'none',fontFamily:'Inter,sans-serif',fontWeight:600,fontSize:'0.95rem',letterSpacing:'0.04em',opacity:loading?0.7:1,transition:'all 0.2s',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:'0.6rem'}}
                    onMouseEnter={e=>{if(!loading)(e.currentTarget as HTMLButtonElement).style.background='#0d1b2a'}}
                    onMouseLeave={e=>(e.currentTarget as HTMLButtonElement).style.background='var(--red)'}>
                    {loading ? 'Sending...' : <>Send Message <span style={{fontSize:'1.1rem'}}>→</span></>}
                  </button>

                  <p style={{fontFamily:'Inter,sans-serif',fontSize:'0.75rem',color:'#bbb',textAlign:'center',lineHeight:1.6}}>
                    By submitting this form you agree to our{' '}
                    <a href="/privacy" style={{color:'var(--red)'}}>Privacy Policy</a>.
                    We never share your data.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes shine {
          0% { transform: translateX(-200%) rotate(15deg); }
          100% { transform: translateX(200%) rotate(15deg); }
        }
      `}</style>
    </>
  )
}
