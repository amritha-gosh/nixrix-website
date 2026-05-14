'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

// ── Animated counter (same as homepage) ──
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
    <div ref={ref} style={{ fontFamily:'Sora,sans-serif', fontWeight:800, fontSize:'clamp(2.5rem,4vw,3.5rem)', color:'white', letterSpacing:'-0.03em' }}>
      {count}{suffix}
    </div>
  )
}

// ── Sparkle canvas (same as homepage stats) ──
function SparkleCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return
    const ctx = canvas.getContext('2d'); if (!ctx) return
    let W = canvas.width = canvas.offsetWidth
    let H = canvas.height = canvas.offsetHeight
    let animId: number
    type Star = { x:number; y:number; size:number; alpha:number; speed:number; phase:number; vy:number }
    const stars: Star[] = Array.from({ length: 55 }, () => ({
      x: Math.random()*W, y: Math.random()*H,
      size: Math.random()*2.2+0.5,
      alpha: Math.random()*0.5+0.1,
      speed: Math.random()*0.25+0.05,
      phase: Math.random()*Math.PI*2,
      vy: -Math.random()*0.3-0.05,
    }))
    function drawStar(x:number, y:number, size:number, alpha:number) {
      ctx!.save(); ctx!.globalAlpha=alpha; ctx!.fillStyle='white'
      ctx!.beginPath()
      for(let i=0;i<8;i++){
        const angle=(i*Math.PI)/4-Math.PI/2
        const r=i%2===0?size:size*0.35
        const px=x+Math.cos(angle)*r, py=y+Math.sin(angle)*r
        i===0?ctx!.moveTo(px,py):ctx!.lineTo(px,py)
      }
      ctx!.closePath(); ctx!.fill(); ctx!.restore()
    }
    function animate() {
      ctx!.clearRect(0,0,W,H)
      stars.forEach(s => {
        s.phase+=0.015; s.y+=s.vy
        if(s.y<-10){s.y=H+10;s.x=Math.random()*W}
        drawStar(s.x,s.y,s.size,s.alpha*(0.5+0.5*Math.sin(s.phase)))
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

// ── Mission / Vision 3D flip card ──
function FlipCard3D({ frontSub, frontWord, back }: { frontSub:string; frontWord:string; back:string }) {
  const [flipped, setFlipped] = useState(false)
  return (
    <div onClick={()=>setFlipped(f=>!f)} onMouseEnter={()=>setFlipped(true)} onMouseLeave={()=>setFlipped(false)}
      style={{perspective:'1200px',height:'300px',cursor:'pointer'}}>
      <div style={{position:'relative',width:'100%',height:'100%',transformStyle:'preserve-3d',transform:flipped?'rotateY(180deg)':'rotateY(0)',transition:'transform 0.7s cubic-bezier(0.4,0.2,0.2,1)'}}>

        {/* Front — red */}
        <div style={{position:'absolute',inset:0,backfaceVisibility:'hidden',background:'var(--red)',borderRadius:'20px',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 16px 50px rgba(249,8,8,0.35)',flexDirection:'column',gap:'0.3rem'}}>
          {/* Decorative corners */}
          <div style={{position:'absolute',top:'1rem',left:'1rem',width:'24px',height:'24px',borderTop:'2px solid rgba(255,255,255,0.3)',borderLeft:'2px solid rgba(255,255,255,0.3)'}}/>
          <div style={{position:'absolute',bottom:'1rem',right:'1rem',width:'24px',height:'24px',borderBottom:'2px solid rgba(255,255,255,0.3)',borderRight:'2px solid rgba(255,255,255,0.3)'}}/>
          <div style={{textAlign:'center'}}>
            {/* "Our" in BLACK, "Mission"/"Vision" in WHITE */}
            <div style={{display:'flex',alignItems:'baseline',justifyContent:'center',gap:'0.5rem'}}>
              <span style={{fontFamily:'Sora,sans-serif',fontWeight:800,fontSize:'2.8rem',color:'#000000',letterSpacing:'-0.02em'}}>{frontSub}</span>
              <span style={{fontFamily:'Sora,sans-serif',fontWeight:800,fontSize:'2.8rem',color:'white',letterSpacing:'-0.02em'}}>{frontWord}</span>
            </div>
            <p style={{fontFamily:'Inter,sans-serif',fontSize:'0.75rem',color:'rgba(255,255,255,0.5)',letterSpacing:'0.12em',textTransform:'uppercase',marginTop:'0.5rem'}}>Hover to reveal</p>
          </div>
        </div>

        {/* Back — white with decorative quote */}
        <div style={{position:'absolute',inset:0,backfaceVisibility:'hidden',transform:'rotateY(180deg)',background:'white',borderRadius:'20px',borderLeft:'4px solid var(--red)',boxShadow:'0 16px 50px rgba(249,8,8,0.15)',padding:'2.2rem 2.2rem 2.2rem 2.8rem',display:'flex',flexDirection:'column',justifyContent:'center',overflow:'hidden'}}>
          {/* Large decorative quote mark */}
          <div style={{position:'absolute',top:'-0.5rem',left:'1.2rem',fontFamily:'Georgia,serif',fontSize:'7rem',color:'rgba(249,8,8,0.1)',lineHeight:1,pointerEvents:'none',userSelect:'none',fontWeight:900}}>"</div>
          {/* Red quote icon */}
          <div style={{marginBottom:'1rem',flexShrink:0}}>
            <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
              <path d="M0 20V12.5C0 5.596 4.26 1.274 12.78 0l1.44 2.3C10.14 3.354 7.94 5.52 7.26 9H12V20H0zm16 0V12.5C16 5.596 20.26 1.274 28.78 0l1.44 2.3C26.14 3.354 23.94 5.52 23.26 9H28V20H16z" fill="#f90808" fillOpacity="0.7"/>
            </svg>
          </div>
          <p style={{fontFamily:'Inter,sans-serif',fontSize:'1.05rem',fontWeight:300,color:'var(--dark)',lineHeight:2,letterSpacing:'0.01em',position:'relative',zIndex:1}}>
            &ldquo;{back}&rdquo;
          </p>
        </div>
      </div>
    </div>
  )
}

// ── Value card ──
function ValueCard({ num, icon, title, desc, delay }: { num:string; icon:React.ReactNode; title:string; desc:string; delay:number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if(e.isIntersecting){setTimeout(()=>setVisible(true),delay);obs.disconnect()}
    },{threshold:0.15})
    if(ref.current) obs.observe(ref.current)
    return()=>obs.disconnect()
  },[delay])
  return (
    <div ref={ref}
      onMouseEnter={()=>setHovered(true)}
      onMouseLeave={()=>setHovered(false)}
      style={{
        opacity:visible?1:0,
        transform:visible?'translateY(0)':'translateY(30px)',
        transition:`opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms, background 0.3s, box-shadow 0.3s`,
        background:hovered?'#faf8f6':'white',
        padding:'2rem', borderRadius:'14px',
        border:'2px solid #ede9e3',
        boxShadow:hovered?'0 8px 30px rgba(249,8,8,0.1)':'0 2px 12px rgba(0,0,0,0.03)',
        position:'relative', overflow:'hidden',
      }}>
      <div style={{position:'absolute',bottom:0,left:0,height:'3px',background:'var(--red)',width:hovered?'100%':'0',transition:'width 0.4s ease'}}/>
      <div style={{display:'flex',alignItems:'center',gap:'0.8rem',marginBottom:'1rem'}}>
        <span style={{fontFamily:'Sora,sans-serif',fontSize:'0.7rem',color:'rgba(249,8,8,0.5)',fontWeight:700,letterSpacing:'0.1em'}}>{num}</span>
        <div style={{color:'var(--red)'}}>{icon}</div>
      </div>
      <h4 style={{fontFamily:'Sora,sans-serif',fontWeight:700,fontSize:'1.05rem',color:'var(--dark)',marginBottom:'0.6rem'}}>{title}</h4>
      <p style={{fontFamily:'Inter,sans-serif',fontSize:'0.9rem',color:'var(--muted)',lineHeight:1.8,fontWeight:300}}>{desc}</p>
    </div>
  )
}

const values = [
  {title:'Clarity',desc:'We communicate plainly. No jargon, no fluff. Just honest, clear conversation.',icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>},
  {title:'Craft',desc:'We take pride in quality. Every detail matters, from pixel to pipeline.',icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>},
  {title:'Results',desc:'We measure success by your growth, not just deliverables. Your win is our win.',icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>},
  {title:'Partnership',desc:'We are not a vendor. We are an extension of your team. Long-term thinking only.',icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>},
  {title:'Speed',desc:'We move fast without cutting corners. You will see real progress within days, not months.',icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>},
  {title:'Honesty',desc:'We tell you what you need to hear, not what you want to hear. That is how real progress is made.',icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>},
]

// ── Sine wave canvas for hero ──
function SineCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current; if(!canvas) return
    const ctx = canvas.getContext('2d'); if(!ctx) return
    let W=canvas.width=window.innerWidth, H=canvas.height=500
    let animId:number, t=0
    function draw(){
      ctx!.clearRect(0,0,W,H)
      for(let w=0;w<4;w++){
        ctx!.beginPath()
        const amp=35+w*18,freq=0.007-w*0.001,speed=0.018+w*0.008
        for(let x=0;x<=W;x+=2){
          const y=H/2+amp*Math.sin(x*freq+t*speed+w*1.4)
          x===0?ctx!.moveTo(x,y):ctx!.lineTo(x,y)
        }
        ctx!.strokeStyle=`rgba(249,8,8,${0.09-w*0.018})`
        ctx!.lineWidth=1.5-w*0.25;ctx!.stroke()
      }
      t++;animId=requestAnimationFrame(draw)
    }
    draw()
    const onR=()=>{W=canvas.width=window.innerWidth}
    window.addEventListener('resize',onR)
    return()=>{cancelAnimationFrame(animId);window.removeEventListener('resize',onR)}
  },[])
  return <canvas ref={ref} style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none'}}/>
}

export default function About() {
  return (
    <>
      {/* Hero */}
      <section style={{position:'relative',background:'#fff',paddingTop:'140px',paddingBottom:'80px',overflow:'hidden',minHeight:'500px'}}>
        <SineCanvas/>
        <div style={{position:'relative',zIndex:1,maxWidth:'1200px',margin:'0 auto',padding:'0 3rem'}}>
          <p style={{fontFamily:'Inter',fontSize:'0.75rem',letterSpacing:'0.14em',textTransform:'uppercase',color:'var(--red)',marginBottom:'1rem',fontWeight:500}}>Who We Are</p>
          <h1 style={{fontFamily:'Sora,sans-serif',fontWeight:800,fontSize:'clamp(2.5rem,5vw,4.5rem)',color:'var(--dark)',letterSpacing:'-0.03em',lineHeight:1.05,marginBottom:'1.5rem'}}>
            Built to help businesses<br/><span style={{color:'var(--red)'}}>grow digitally.</span>
          </h1>
          <p style={{fontFamily:'Inter,sans-serif',fontWeight:300,fontSize:'1.1rem',color:'var(--muted)',maxWidth:'520px',lineHeight:1.85}}>
            A team of strategists, designers, developers and automation specialists on a mission to build better digital systems for ambitious businesses.
          </p>
        </div>
      </section>

      {/* Story + Mission/Vision */}
      <section style={{background:'#fff',padding:'6rem 3rem'}}>
        <div style={{maxWidth:'1200px',margin:'0 auto',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'5rem',alignItems:'start'}}>
          <div>
            <p style={{fontFamily:'Inter',fontSize:'0.75rem',letterSpacing:'0.14em',textTransform:'uppercase',color:'var(--red)',marginBottom:'1rem',fontWeight:500}}>Our Story</p>
            <div style={{fontFamily:'Inter,sans-serif',fontWeight:300,fontSize:'1.05rem',color:'var(--muted)',lineHeight:1.95}}>
              <p style={{marginBottom:'1.2rem'}}>NIXRIX was built to solve a problem we kept seeing everywhere. Businesses doing too much manually. Leads chased on spreadsheets. Follow-ups forgotten. Data scattered across ten different systems. Websites that exist but do not do anything. And talented people spending their days on work that should take care of itself.</p>
              <p style={{marginBottom:'1.2rem'}}>We built NIXRIX to change that. We are a team of strategists, designers, developers, and automation specialists who believe that the right systems built properly and connected together can free any business to grow without adding more chaos.</p>
              <p>We listen before we build. We work as one team. And we take responsibility for the outcome, not just the deliverable. This is what we do. And we are just getting started.</p>
            </div>
            <Link href="/contact" style={{display:'inline-flex',alignItems:'center',gap:'0.5rem',background:'var(--red)',color:'white',padding:'0.9rem 2rem',fontFamily:'Inter,sans-serif',fontWeight:600,fontSize:'0.9rem',borderRadius:'50px',marginTop:'2rem',boxShadow:'0 4px 20px rgba(249,8,8,0.25)',textDecoration:'none'}}>
              Work With Us →
            </Link>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:'20px'}}>
            <FlipCard3D
              frontSub="Our"
              frontWord="Mission"
              back="To design and deliver intelligent digital systems that automate operations, generate consistent leads, and give businesses clear, data-driven control over their growth."
            />
            <FlipCard3D
              frontSub="Our"
              frontWord="Vision"
              back="NIXRIX aims to become the trusted AI-powered infrastructure partner for growing SMEs, helping them simplify operations, scale with confidence, and make clearer business decisions through smarter digital systems, automation, and data-driven insights."
            />
          </div>
        </div>
      </section>

      {/* Stats — identical to homepage */}
      <section style={{background:'var(--red)',padding:'4rem 3rem',position:'relative',overflow:'hidden',minHeight:'180px'}}>
        {/* Shimmer sweep */}
        <div style={{position:'absolute',inset:0,background:'linear-gradient(105deg,transparent 35%,rgba(255,255,255,0.07) 50%,transparent 65%)',backgroundSize:'200% 100%',animation:'shimmer 4s linear infinite',pointerEvents:'none',zIndex:1}}/>
        {/* Sparkle stars */}
        <SparkleCanvas/>
        <div style={{maxWidth:'1200px',margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:'2px',position:'relative',zIndex:2}}>
          {[
            {target:20,suffix:'+',label:'Projects Delivered',sub:'and growing'},
            {target:92,suffix:'%',label:'Client Satisfaction',sub:'across all projects'},
            {target:24,suffix:'h',label:'Response Guarantee',sub:'no chasing required'},
            {target:100,suffix:'%',label:'Tailored Solutions',sub:'every solution built around your business'},
          ].map((s,i)=>(
            <div key={i} style={{textAlign:'center',padding:'2rem 1rem'}}>
              <Counter target={s.target} suffix={s.suffix}/>
              <div style={{fontFamily:'Sora,sans-serif',fontSize:'1rem',color:'rgba(255,255,255,1)',fontWeight:600,marginTop:'0.5rem'}}>{s.label}</div>
              <div style={{fontFamily:'Inter,sans-serif',fontSize:'0.8rem',color:'rgba(255,255,255,0.8)',marginTop:'0.25rem'}}>{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section style={{background:'var(--cream)',padding:'6rem 3rem'}}>
        <div style={{maxWidth:'1200px',margin:'0 auto'}}>
          <p style={{fontFamily:'Inter',fontSize:'0.75rem',letterSpacing:'0.14em',textTransform:'uppercase',color:'var(--red)',marginBottom:'0.8rem',fontWeight:500}}>What Drives Us</p>
          <h2 style={{fontFamily:'Sora,sans-serif',fontWeight:800,fontSize:'clamp(1.8rem,3.5vw,2.8rem)',color:'var(--dark)',letterSpacing:'-0.02em',marginBottom:'3rem'}}>Our Values</h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:'16px'}}>
            {values.map((v,i)=>(
              <ValueCard key={i} num={`0${i+1}`} icon={v.icon} title={v.title} desc={v.desc} delay={i*100}/>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{background:'var(--dark)',padding:'6rem 3rem',textAlign:'center'}}>
        <div style={{maxWidth:'600px',margin:'0 auto'}}>
          <h2 style={{fontFamily:'Sora,sans-serif',fontWeight:800,fontSize:'clamp(1.8rem,4vw,3rem)',color:'white',marginBottom:'1rem',letterSpacing:'-0.02em'}}>
            Let&apos;s build something<br/><span style={{color:'var(--red)'}}>remarkable.</span>
          </h2>
          <p style={{fontFamily:'Inter,sans-serif',color:'rgba(255,255,255,0.8)',fontSize:'1rem',marginBottom:'2rem',lineHeight:1.8}}>Based in Leeds. Working with businesses across the UK, US and UAE.</p>
          <Link href="/contact" style={{display:'inline-flex',alignItems:'center',gap:'0.6rem',background:'var(--red)',color:'white',padding:'1rem 2.2rem',fontFamily:'Inter,sans-serif',fontWeight:600,fontSize:'0.9rem',borderRadius:'50px',boxShadow:'0 4px 20px rgba(249,8,8,0.3)',textDecoration:'none'}}>
            Get In Touch →
          </Link>
        </div>
      </section>

      <style>{`
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
      `}</style>
    </>
  )
}
