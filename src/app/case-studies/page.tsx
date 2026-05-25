import Link from 'next/link'
export default function CaseStudies() {
  return (
    <section style={{background:'#fff',paddingTop:'96px',paddingBottom:'80px',paddingLeft:'3rem',paddingRight:'3rem',minHeight:'80vh'}}>
      <div style={{maxWidth:'900px',margin:'0 auto',textAlign:'center'}}>
        <p style={{fontFamily:'Inter',fontSize:'0.75rem',letterSpacing:'0.14em',textTransform:'uppercase',color:'var(--red)',marginBottom:'1rem',fontWeight:500}}>Case Studies</p>
        <h1 style={{fontFamily:'Sora,sans-serif',fontWeight:800,fontSize:'clamp(2rem,5vw,4rem)',color:'#0d1b2a',letterSpacing:'-0.03em',marginBottom:'1.5rem'}}>Deep dives into <span style={{color:'var(--red)'}}>real results.</span></h1>
        <p style={{fontFamily:'Inter,sans-serif',fontWeight:300,fontSize:'1.05rem',color:'var(--muted)',lineHeight:1.85,marginBottom:'1.2rem'}}>Full case studies coming soon. In the meantime, view our work or get in touch.</p>
        <div style={{display:'flex',gap:'1rem',justifyContent:'center',flexWrap:'wrap'}}>
          <Link href="/work" style={{background:'var(--red)',color:'white',padding:'1rem 2rem',fontFamily:'Inter,sans-serif',fontWeight:600,fontSize:'0.9rem'}}>View Our Work →</Link>
          <Link href="/contact" style={{background:'transparent',color:'#0d1b2a',padding:'1rem 2rem',fontFamily:'Inter,sans-serif',fontWeight:600,fontSize:'0.9rem',border:'2px solid #0d1b2a'}}>Book a Call</Link>
        </div>
      </div>
    </section>
  )
}
