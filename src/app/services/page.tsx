'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

// ── Node graph canvas (different from homepage rings)
function NodeCanvas({ height = 400 }: { height?: number }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return
    const ctx = canvas.getContext('2d'); if (!ctx) return
    let W = canvas.width = window.innerWidth, H = canvas.height = height
    let animId: number
    type Node = { x:number; y:number; vx:number; vy:number; r:number }
    const nodes: Node[] = Array.from({ length: 55 }, () => ({
      x: Math.random()*W, y: Math.random()*H,
      vx: (Math.random()-0.5)*0.5, vy: (Math.random()-0.5)*0.5, r: 2,
    }))
    function draw() {
      ctx!.clearRect(0,0,W,H)
      nodes.forEach(n => {
        n.x+=n.vx; n.y+=n.vy
        if(n.x<0||n.x>W) n.vx*=-1
        if(n.y<0||n.y>H) n.vy*=-1
        ctx!.beginPath(); ctx!.arc(n.x,n.y,n.r,0,Math.PI*2)
        ctx!.fillStyle='rgba(249,8,8,0.35)'; ctx!.fill()
      })
      for (let i=0;i<nodes.length;i++) for (let j=i+1;j<nodes.length;j++) {
        const dx=nodes[i].x-nodes[j].x, dy=nodes[i].y-nodes[j].y, d=Math.sqrt(dx*dx+dy*dy)
        if (d<120) {
          ctx!.strokeStyle=`rgba(249,8,8,${0.12*(1-d/120)})`
          ctx!.lineWidth=0.8; ctx!.beginPath()
          ctx!.moveTo(nodes[i].x,nodes[i].y); ctx!.lineTo(nodes[j].x,nodes[j].y); ctx!.stroke()
        }
      }
      animId=requestAnimationFrame(draw)
    }
    draw()
    const onR=()=>{W=canvas.width=window.innerWidth}
    window.addEventListener('resize',onR)
    return()=>{cancelAnimationFrame(animId);window.removeEventListener('resize',onR)}
  },[height])
  return <canvas ref={ref} style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none'}}/>
}

const services = [
  { num:'01', tag:'WEB & BRAND', title:'Digital Presence and Growth', tagline:'Look the part. Get noticed. Get found.', desc:'Build a brand and website that earns trust, then drive the right traffic to it through data-led marketing across every channel.', features:['Custom website design and build','User experience and landing pages','Logo and brand identity','Online store setup','Search engine optimised and mobile ready','Google and Meta advertising','Social media management','Email campaigns','Analytics and reporting'], href:'#web-brand-packages', img:'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80' },
  { num:'02', tag:'ANALYTICS', title:'Data and Dashboards', tagline:'See exactly what is working.', desc:'Turn your business data into clear decisions with live dashboards and intelligence tools you can actually understand.', features:['Power BI dashboard build','Live data connections','Performance tracking','Plain language reports','Automated alerts'], href:'#data-packages', img:'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80' },
  { num:'03', tag:'SOFTWARE', title:'Software and Automation Systems', tagline:'Your software. Your rules.', desc:'Custom software that fits your business exactly. Automated, it saves you time and cuts unnecessary costs.', features:['Custom business software','Mobile applications','Online platform development','Third-party connections','Internal management tools'], href:'#software-packages', img:'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80' },
  { num:'04', tag:'AUTOMATION', title:'Business Automation and CRM', tagline:'Automate the chaos. Scale with ease.', desc:'Replace manual processes with smart workflows so your team focuses on work that matters.', features:['HubSpot and Make.com setup','AI assistants and chatbots','Lead capture and follow-up','System connections','Workflow automation and process streamlining','Standard Operating Procedures provided','Full team training and onboarding'], href:'#automation-packages', img:'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&q=80' },
]

function FlipCard({ s }: { s: typeof services[0] }) {
  const [flipped, setFlipped] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>|null>(null)
  return (
    <div onMouseEnter={()=>{timer.current=setTimeout(()=>setFlipped(true),400)}} onMouseLeave={()=>{if(timer.current)clearTimeout(timer.current);setFlipped(false)}} onClick={()=>setFlipped(f=>!f)} style={{perspective:'1200px',height:'580px',cursor:'pointer'}}>
      <div style={{position:'relative',width:'100%',height:'100%',transformStyle:'preserve-3d',transform:flipped?'rotateY(180deg)':'rotateY(0)',transition:'transform 0.7s cubic-bezier(0.4,0.2,0.2,1)'}}>
        {/* Front */}
        <div style={{position:'absolute',inset:0,backfaceVisibility:'hidden',borderRadius:'20px',overflow:'hidden',boxShadow:'0 8px 40px rgba(0,0,0,0.2)',display:'flex',flexDirection:'column'}}>
          <div style={{position:'relative',height:'58%',overflow:'hidden',flexShrink:0}}>
            <img src={s.img} alt={s.title} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
            <div style={{position:'absolute',inset:0,background:'linear-gradient(to bottom,rgba(0,0,0,0.05),rgba(0,0,0,0.5))'}}/>
            <div style={{position:'absolute',top:'1rem',left:'1rem'}}><span style={{fontFamily:'Inter,sans-serif',fontSize:'0.62rem',fontWeight:700,color:'white',letterSpacing:'0.14em',background:'var(--red)',padding:'0.22rem 0.75rem',borderRadius:'50px',textTransform:'uppercase'}}>{s.tag}</span></div>
            <div style={{position:'absolute',top:'1rem',right:'1rem'}}><span style={{fontFamily:'Sora,sans-serif',fontSize:'0.72rem',fontWeight:800,color:'rgba(255,255,255,0.4)'}}>{s.num}</span></div>
          </div>
          <div style={{flex:1,background:'white',padding:'1.6rem 1.8rem',display:'flex',flexDirection:'column',gap:'0.6rem',justifyContent:'center'}}>
            <h3 style={{fontFamily:'Sora,sans-serif',fontWeight:600,fontSize:'1.05rem',color:'#1a1208',lineHeight:1.25}}>{s.title}</h3>
            <p style={{fontFamily:'Sora,sans-serif',fontWeight:800,fontSize:'1.3rem',color:'var(--red)',lineHeight:1.2,letterSpacing:'-0.01em'}}>{s.tagline}</p>
            <p style={{fontFamily:'Inter,sans-serif',fontSize:'0.72rem',color:'#bbb',marginTop:'0.2rem',letterSpacing:'0.04em'}}>Hover or click to explore →</p>
          </div>
        </div>
        {/* Back */}
        <div style={{position:'absolute',inset:0,backfaceVisibility:'hidden',transform:'rotateY(180deg)',borderRadius:'20px',background:'white',border:'2px solid var(--red)',boxShadow:'0 16px 60px rgba(249,8,8,0.2)',display:'flex',flexDirection:'column',overflow:'hidden'}}>
          <div style={{background:'var(--red)',padding:'1.4rem 1.8rem',flexShrink:0}}>
            <span style={{fontFamily:'Inter,sans-serif',fontSize:'0.62rem',fontWeight:700,color:'rgba(255,255,255,0.6)',letterSpacing:'0.14em',textTransform:'uppercase'}}>{s.tag}</span>
            <h3 style={{fontFamily:'Sora,sans-serif',fontWeight:700,fontSize:'1.15rem',color:'white',marginTop:'0.3rem',lineHeight:1.2}}>{s.title}</h3>
            <p style={{fontFamily:'Sora,sans-serif',fontWeight:800,fontSize:'1rem',color:'rgba(255,255,255,0.9)',marginTop:'0.3rem'}}>{s.tagline}</p>
          </div>
          <div style={{flex:1,overflowY:'auto',padding:'1.4rem 1.8rem',display:'flex',flexDirection:'column',gap:'1rem'}}>
            <p style={{fontFamily:'Inter,sans-serif',fontSize:'0.9rem',color:'var(--muted)',lineHeight:1.8,fontWeight:300}}>{s.desc}</p>
            <div>
              <p style={{fontFamily:'Inter,sans-serif',fontSize:'0.68rem',fontWeight:700,color:'var(--red)',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:'0.7rem'}}>What is included</p>
              <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:'0.45rem'}}>
                {s.features.map((f,i)=>(
                  <li key={i} style={{fontFamily:'Inter,sans-serif',fontSize:'0.86rem',color:'#444',display:'flex',alignItems:'flex-start',gap:'0.6rem',lineHeight:1.5}}>
                    <span style={{color:'var(--red)',fontWeight:700,fontSize:'0.9rem',flexShrink:0}}>✓</span>{f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div style={{padding:'1rem 1.8rem',borderTop:'1px solid #ede9e3',flexShrink:0}}>
            <a href={s.href} onClick={e=>e.stopPropagation()} style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'0.4rem',background:'var(--red)',color:'white',padding:'0.8rem',borderRadius:'50px',fontFamily:'Inter,sans-serif',fontWeight:600,fontSize:'0.88rem',width:'100%',textAlign:'center',boxShadow:'0 4px 16px rgba(249,8,8,0.3)'}}>
              View Packages →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

const pillars = [
  { id:'web', label:'Web & Brand', packages:[
    { name:'The Spark', sub:'1-page website', badge:'Quick Win', tagline:'One clean page. Live in days.', desc:'A fast, professional one-page website that puts your business properly online. Mobile first, SEO foundations built in, contact form connected.', features:['Mobile first responsive design','On-page SEO foundations','Contact form setup','Hosting and domain connection','Fast delivery'], bestFor:'Businesses that need a proper digital presence fast without a complex multi-page site.', price:'From £200', highlight:false },
    { name:'The Impression', sub:'Logo and brand kit', badge:'Quick Win', tagline:'A brand that means business.', desc:'A professional logo, brand colour palette, typography, and brand guidelines delivered as a usable kit your team can apply immediately.', features:['Primary logo and variations','Brand colour palette','Typography selection','Brand guidelines document','Logo files in all formats'], bestFor:'New businesses or existing businesses whose branding no longer represents what they have become.', price:'POA', highlight:false },
    { name:'The Magnet', sub:'Landing page', badge:'Quick Win', tagline:'One page. One goal. Maximum leads.', desc:'A single conversion-focused landing page built around one action: turning visitors into enquiries. No distractions, no navigation away from the CTA.', features:['Conversion focused layout','Lead capture form','CRM connection','Optimised headline and copy','A/B ready structure'], bestFor:'Businesses running ads, campaigns, or outreach that need a dedicated high-converting destination.', price:'POA', highlight:false },
    { name:'NIXRIX Launchpad', sub:'Full business website', badge:'Signature', tagline:'Full business website. Built to convert.', desc:'A complete multi-page business website designed, built and delivered ready to generate enquiries. SEO optimised, analytics connected, lead capture working from day one.', features:['Multi-page responsive website','On-page SEO throughout','Lead capture forms and flows','Google Analytics GA4 setup','Sitemap submitted to Google','Review period after delivery'], bestFor:'Businesses that need a full, credible website that works as a 24/7 sales tool.', price:'POA', highlight:true },
  ]},
  { id:'auto', label:'Automation', packages:[
    { name:'The Connector', sub:'HubSpot CRM setup', badge:'Quick Win', tagline:'HubSpot set up properly. Every lead tracked.', desc:'A full HubSpot CRM setup configured for your business. Pipeline stages, contact properties, follow-up tasks, and email templates written and loaded.', features:['HubSpot account setup','Pipeline stages configured','Contact property setup','Email templates written','Team onboarding call'], bestFor:'Businesses that have leads coming in but no system to track, manage, or follow up consistently.', price:'POA', highlight:false },
    { name:'NIXRIX Command', sub:'CRM and automation', badge:'Signature', tagline:'CRM, automation and dashboard. One connected system.', desc:'Your CRM, automation workflows, and a live KPI dashboard all set up and connected. Every lead tracked, every follow-up automated, every decision informed by data.', features:['HubSpot CRM full setup','Make.com automation workflows','Live KPI dashboard build','Tally form connected to HubSpot','Email alert automation','Team onboarding and documentation'], bestFor:'Businesses ready to stop doing manual work and start running on connected, automated systems.', price:'POA', highlight:true },
    { name:'NIXRIX Autopilot', sub:'AI document automation', badge:'Signature', tagline:'AI document processing. Repetitive work, handled.', desc:'AI-powered document processing and workflow automation using Make.com. The admin tasks that eat your week get handled automatically.', features:['Workflow audit and mapping','Make.com automation build','Document AI processing setup','Integration with existing tools','Testing and handover','Documentation'], bestFor:'Businesses spending significant time on document processing, data entry, or repetitive admin tasks.', price:'POA', highlight:false },
  ]},
  { id:'data', label:'Data and Analytics', packages:[
    { name:'NIXRIX Intelligence', sub:'Power BI dashboard', badge:'Signature', tagline:'Power BI dashboard. Live data. Plain English.', desc:'A fully built Power BI dashboard connected to your existing data sources, showing exactly what is happening in your business in real time.', features:['Power BI dashboard full build','Live data source connections','KPI selection and tracking','Plain language insight labels','Automated alerts for key thresholds','Staff training session'], bestFor:'Businesses with data sitting in spreadsheets, CRMs, or tools they cannot easily read.', price:'POA', highlight:true },
  ]},
  { id:'mkt', label:'Marketing', packages:[
    { name:'NIXRIX Momentum', sub:'Monthly social media', badge:'Monthly Support', tagline:'Monthly social media and content.', desc:'Regular LinkedIn and social content written, scheduled and published in your brand voice. For business owners who know consistency matters but do not have the time.', features:['Monthly LinkedIn content calendar','Posts written in your brand voice','Scheduling and publishing','Engagement monitoring','Monthly performance summary'], bestFor:'Business owners who want a consistent professional presence on LinkedIn without doing it themselves.', price:'POA', highlight:false },
  ]},
  { id:'support', label:'Support Retainers', packages:[
    { name:'NIXRIX Grow Lite', sub:'Basic ongoing support', badge:'Monthly Support', tagline:'Basic ongoing support and monitoring.', desc:'Monthly website updates, uptime monitoring, and priority email support. For businesses that want peace of mind without a large ongoing commitment.', features:['Monthly website updates','Uptime and performance monitoring','Priority email support','Monthly health check report'], bestFor:'Businesses that want professional ongoing maintenance without intensive support needs.', price:'From £197/mo', highlight:false },
    { name:'NIXRIX Grow Standard', sub:'Support and optimisation', badge:'Monthly Support', tagline:'Ongoing support, optimisation and reporting.', desc:'Regular updates, monthly reporting, CRM health checks, and SEO monitoring. For businesses actively using their NIXRIX system and wanting continuous improvement.', features:['Up to 5 hours monthly support','Monthly performance report','CRM health checks','SEO monitoring','Content updates','Priority response within 4 hours'], bestFor:'Businesses running on NIXRIX systems who want regular optimisation and a reliable support partner.', price:'From £397/mo', highlight:true },
    { name:'NIXRIX Grow Pro', sub:'Full ongoing support', badge:'Monthly Support', tagline:'Full ongoing support, automation and strategy.', desc:'Everything in Standard plus automation improvements, content updates, strategy calls, and priority support. For businesses where NIXRIX is a core operational tool.', features:['Up to 12 hours monthly support','Monthly strategy call','Automation monitoring and improvement','Content updates and new pages','Proactive suggestions','Same day emergency response'], bestFor:'Businesses where NIXRIX systems are central to operations and continuous improvement matters.', price:'From £797/mo', highlight:false },
  ]},
  { id:'industry', label:'Industry Packs', packages:[
    { name:'Agency Smart Pack', sub:'Built for letting agencies', badge:'Letting Agencies', tagline:'Built for letting agencies. Everything connected.', desc:'A complete digital system built specifically for letting agencies. Website, CRM, and automation all set up and working together.', features:['Professional agency website','Tenant and landlord CRM setup','Lead automation from website to HubSpot','Email follow-up templates for lettings','Compliance-aware configuration','Team onboarding and training'], bestFor:'Letting agencies losing landlord enquiries, spending hours on manual admin, or operating without a connected digital system.', price:'POA', highlight:true },
  ]},
]

function PackageCard({ p }: { p: typeof pillars[0]['packages'][0] }) {
  const [hovered, setHovered] = useState(false)
  const [open, setOpen] = useState(true)
  return (
    <div onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
      style={{
        background: hovered ? '#0a1628' : '#fff',
        border:`2px solid ${p.highlight ? 'var(--red)' : hovered ? 'var(--red)' : '#ede9e3'}`,
        borderRadius:'16px', overflow:'hidden',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? '0 20px 50px rgba(249,8,8,0.15)' : p.highlight ? '0 8px 30px rgba(249,8,8,0.08)' : '0 2px 12px rgba(0,0,0,0.04)',
        transition:'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
        display:'flex', flexDirection:'column',
        position:'relative',
      }}>
      {p.highlight && <div style={{position:'absolute',top:'-14px',left:'50%',transform:'translateX(-50%)',background:'var(--red)',color:'white',padding:'0.2rem 1rem',fontFamily:'Inter,sans-serif',fontSize:'0.68rem',fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',whiteSpace:'nowrap',borderRadius:'50px',zIndex:1}}>Most Popular</div>}
      <div style={{background: p.highlight ? 'var(--red)' : hovered ? '#0a1628' : '#fafaf8',padding:'0.8rem 1.5rem',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <span style={{fontFamily:'Inter,sans-serif',fontSize:'0.68rem',fontWeight:700,color: p.highlight ? 'white' : hovered ? 'white' : 'var(--muted)',letterSpacing:'0.1em',textTransform:'uppercase'}}>{p.badge}</span>
        {p.price && <span style={{fontFamily:'Sora,sans-serif',fontSize:'0.8rem',fontWeight:700,color: p.highlight ? 'white' : 'var(--red)'}}>{p.price}</span>}
      </div>
      <div style={{padding:'1.8rem',flex:1,display:'flex',flexDirection:'column',gap:'0.8rem'}}>
        <div>
          <h3 style={{fontFamily:'Sora,sans-serif',fontWeight:800,fontSize:'1.15rem',color: hovered ? 'var(--red)' : 'var(--red)',marginBottom:'0.2rem'}}>{p.name}</h3>
          <p style={{fontFamily:'Sora,sans-serif',fontSize:'0.88rem',fontWeight:700,color: hovered ? 'rgba(255,255,255,0.9)' : '#0d1b2a'}}>{p.tagline}</p>
        </div>
        <p style={{fontFamily:'Inter,sans-serif',fontSize:'0.88rem',color: hovered ? '#bbb' : 'var(--muted)',lineHeight:1.75,fontWeight:300}}>{p.desc}</p>
        <div>
          <button onClick={()=>setOpen(o=>!o)} style={{width:'100%',display:'flex',justifyContent:'space-between',alignItems:'center',padding:'0.7rem 1rem',background: hovered ? '#0a1628' : '#f7f5f2',border:`1px solid ${hovered ? '#0d2040' : '#ede9e3'}`,cursor:'pointer',fontFamily:'Inter,sans-serif',fontSize:'0.82rem',fontWeight:500,color: hovered ? '#aaa' : '#0d1b2a',transition:'all 0.2s',borderRadius:'8px'}}>
            {open ? 'Hide details' : 'Show details'}
            <span style={{transform: open ? 'rotate(180deg)' : 'rotate(0)',transition:'transform 0.3s',color:'var(--red)'}}>▾</span>
          </button>
          <div style={{maxHeight: open ? '600px' : '0',overflow:'hidden',transition:'max-height 0.4s ease'}}>
            <ul style={{listStyle:'none',padding:'1rem 0 0',display:'flex',flexDirection:'column',gap:'0.45rem'}}>
              {p.features.map((f,i)=>(
                <li key={i} style={{fontFamily:'Inter,sans-serif',fontSize:'0.84rem',color: hovered ? '#888' : '#555',display:'flex',alignItems:'center',gap:'0.6rem'}}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#f90808" strokeWidth="1.5"/><path d="M5 8l2 2 4-4" stroke="#f90808" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  {f}
                </li>
              ))}
            </ul>
            <div style={{marginTop:'1rem',padding:'0.8rem 1rem',background: hovered ? 'rgba(249,8,8,0.1)' : 'rgba(249,8,8,0.04)',borderLeft:'3px solid var(--red)',borderRadius:'0 6px 6px 0'}}>
              <p style={{fontFamily:'Inter,sans-serif',fontSize:'0.7rem',fontWeight:600,color:'var(--red)',marginBottom:'0.3rem',letterSpacing:'0.06em',textTransform:'uppercase'}}>Best for</p>
              <p style={{fontFamily:'Inter,sans-serif',fontSize:'0.82rem',color: hovered ? '#aaa' : 'var(--muted)',lineHeight:1.65}}>{p.bestFor}</p>
            </div>
          </div>
        </div>
        <a href="GOOGLE_FORM_DEMO_URL" target="_blank" rel="noopener noreferrer"
          style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'0.4rem',padding:'0.85rem',background: p.highlight ? 'var(--red)' : 'transparent',color: p.highlight ? 'white' : hovered ? 'white' : '#0d1b2a',border:`2px solid ${p.highlight ? 'var(--red)' : hovered ? 'var(--red)' : '#ccc'}`,fontFamily:'Inter,sans-serif',fontWeight:600,fontSize:'0.85rem',transition:'all 0.2s',textAlign:'center',marginTop:'auto',borderRadius:'50px',cursor:'pointer'}}
          onMouseEnter={e=>{(e.currentTarget as HTMLAnchorElement).style.background='var(--red)';(e.currentTarget as HTMLAnchorElement).style.color='white';(e.currentTarget as HTMLAnchorElement).style.borderColor='var(--red)'}}
          onMouseLeave={e=>{if(!p.highlight){(e.currentTarget as HTMLAnchorElement).style.background='transparent';(e.currentTarget as HTMLAnchorElement).style.color=hovered?'white':'#0d1b2a';(e.currentTarget as HTMLAnchorElement).style.borderColor=hovered?'var(--red)':'#ccc'}}}
        >Enquire →</a>
      </div>
    </div>
  )
}

export default function Services() {
  const [tab, setTab] = useState<'services'|'packages'>('services')
  const [activePillar, setActivePillar] = useState('web')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const currentPillar = pillars.find(p => p.id === activePillar)!

  return (
    <>
      {/* Hero */}
      <section style={{position:'relative',background:'#f8fafd',paddingTop:'96px',paddingBottom:'40px',overflow:'hidden',minHeight:'300px'}}>
        <NodeCanvas height={440} />
        <div style={{position:'relative',zIndex:1,maxWidth:'1200px',margin:'0 auto',padding:'0 3rem'}}>
          <p style={{fontFamily:'Inter',fontSize:'0.75rem',letterSpacing:'0.14em',textTransform:'uppercase',color:'var(--red)',marginBottom:'1rem',fontWeight:500}}>What We Offer</p>
          <h1 style={{fontFamily:'Sora,sans-serif',fontWeight:800,fontSize:'clamp(2.5rem,5vw,4.5rem)',color:'#0d1b2a',letterSpacing:'-0.03em',lineHeight:1.05,marginBottom:'1.2rem',animation:'fadeUp 0.7s ease both'}}>
            Services built for<br/><span style={{color:'var(--red)'}}>real business growth.</span>
          </h1>
          <p style={{fontFamily:'Inter,sans-serif',fontWeight:300,fontSize:'1.05rem',color:'var(--muted)',maxWidth:'520px',lineHeight:1.85,animation:'fadeUp 0.7s 0.15s ease both'}}>
            From your first website to full digital transformation. We build the systems that scale your business.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <div style={{background:'#f8fafd',position:'sticky',top:'80px',zIndex:50,borderBottom:'2px solid #ede9e3'}}>
        <div style={{maxWidth:'1200px',margin:'0 auto',padding:'0 3rem',display:'flex',gap:0}}>
          {(['services','packages'] as const).map(t=>(
            <button key={t} onClick={()=>setTab(t)} style={{padding:'1.2rem 2rem',fontFamily:'Sora,sans-serif',fontWeight:700,fontSize:'0.9rem',background:'none',border:'none',cursor:'pointer',color: tab===t ? 'var(--red)' : 'var(--muted)',borderBottom: tab===t ? '2px solid var(--red)' : '2px solid transparent',marginBottom:'-2px',textTransform:'capitalize',transition:'all 0.2s'}}>
              {t==='services' ? 'Our Services' : 'Packages'}
            </button>
          ))}
        </div>
      </div>

      {/* Services tab */}
      {tab==='services' && (
        <section style={{background:'#0d1b2a',padding:'5rem 3rem 7rem',position:'relative',overflow:'hidden'}}>
          <NodeCanvas height={800} />
          <div style={{maxWidth:'1200px',margin:'0 auto',position:'relative',zIndex:1}}>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(270px,1fr))',gap:'20px'}}>
              {services.map((s,i)=><FlipCard key={i} s={s}/>)}
            </div>
            <p style={{fontFamily:'Inter,sans-serif',fontSize:'0.78rem',color:'rgba(255,255,255,0.25)',textAlign:'center',marginTop:'1.5rem'}}>Hover or click a card to explore</p>
          </div>
        </section>
      )}

      {/* Packages tab */}
      {tab==='packages' && (
        <section style={{background:'#fafaf8',padding:'2rem 1.5rem 2.5rem'}}>
          <div style={{maxWidth:'1300px',margin:'0 auto'}}>
            <div style={{textAlign:'center',marginBottom:'1.5rem'}}>
              <p style={{fontFamily:'Inter',fontSize:'0.75rem',letterSpacing:'0.14em',textTransform:'uppercase',color:'var(--red)',marginBottom:'0.6rem',fontWeight:500}}>Flexible Options</p>
              <h2 style={{fontFamily:'Sora,sans-serif',fontWeight:800,fontSize:'clamp(1.8rem,4vw,3rem)',color:'#0d1b2a',letterSpacing:'-0.02em',marginBottom:'0.8rem'}}>Choose your package</h2>
              <p style={{fontFamily:'Inter,sans-serif',fontWeight:300,fontSize:'1rem',color:'var(--muted)',maxWidth:'480px',margin:'0 auto',lineHeight:1.8}}>All packages are tailored to your business. Pricing discussed on your free discovery call.</p>
            </div>
            <div style={{display:'flex',gap:'8px',flexWrap:'wrap',justifyContent:'center',marginBottom:'1.5rem'}}>
              {pillars.map(p=>(
                <button key={p.id} onClick={()=>setActivePillar(p.id)} style={{padding:'0.6rem 1.4rem',fontFamily:'Inter,sans-serif',fontWeight:600,fontSize:'0.82rem',background: activePillar===p.id ? 'var(--red)' : '#fff',color: activePillar===p.id ? 'white' : 'var(--muted)',border:`2px solid ${activePillar===p.id ? 'var(--red)' : '#ede9e3'}`,cursor:'pointer',transition:'all 0.2s',borderRadius:'50px'}}>
                  {p.label}
                </button>
              ))}
            </div>
            <div id={`${activePillar}-packages`} style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:'16px'}}>
              {currentPillar.packages.map((p,i)=><PackageCard key={`${activePillar}-${i}`} p={p}/>)}
            </div>
            <div style={{marginTop:'4rem',background:'#0d1b2a',padding:'3rem',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'1rem',borderRadius:'16px'}}>
              <div>
                <h3 style={{fontFamily:'Sora,sans-serif',fontWeight:700,fontSize:'1.3rem',color:'white',marginBottom:'0.5rem'}}>Not sure which package fits?</h3>
                <p style={{fontFamily:'Inter,sans-serif',fontWeight:300,color:'rgba(255,255,255,0.75)',fontSize:'0.9rem'}}>Book a free 30-minute call and we will recommend the right solution for your business.</p>
              </div>
              <a href="GOOGLE_FORM_DEMO_URL" target="_blank" rel="noopener noreferrer" style={{background:'var(--red)',color:'white',padding:'1rem 2rem',fontFamily:'Inter,sans-serif',fontWeight:600,fontSize:'0.9rem',whiteSpace:'nowrap',flexShrink:0,borderRadius:'50px',boxShadow:'0 4px 20px rgba(249,8,8,0.3)'}}>Book Free Call →</a>
            </div>
          </div>
        </section>
      )}
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </>
  )
}
