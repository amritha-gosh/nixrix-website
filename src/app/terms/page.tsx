export default function Terms() {
  return (
    <section style={{background:'#fff',paddingTop:'140px',paddingBottom:'80px',paddingLeft:'3rem',paddingRight:'3rem'}}>
      <div style={{maxWidth:'800px',margin:'0 auto'}}>
        <h1 style={{fontFamily:'Sora,sans-serif',fontWeight:800,fontSize:'2.5rem',color:'var(--dark)',marginBottom:'2rem'}}>Terms of Service</h1>
        <p style={{fontFamily:'Inter,sans-serif',color:'var(--muted)',lineHeight:1.9,marginBottom:'1.5rem'}}>Last updated: May 2025</p>
        {[
          {h:'1. Services',p:'NIXRIX provides digital services including web design, automation, marketing, and software development. All services are subject to a signed proposal and agreement.'},
          {h:'2. Payment',p:'Payment terms are outlined in individual project proposals. Standard terms require a deposit before work begins.'},
          {h:'3. Intellectual property',p:'On full payment, clients receive ownership of the final deliverables. NIXRIX retains the right to showcase work in our portfolio.'},
          {h:'4. Confidentiality',p:'We treat all client information as confidential and will not share it with third parties without written consent.'},
          {h:'5. Limitation of liability',p:'NIXRIX is not liable for indirect losses. Our liability is limited to the value of the project fee paid.'},
          {h:'6. Governing law',p:'These terms are governed by the laws of England and Wales.'},
        ].map((s,i)=>(
          <div key={i} style={{marginBottom:'2rem'}}>
            <h2 style={{fontFamily:'Sora,sans-serif',fontWeight:700,fontSize:'1.1rem',color:'var(--dark)',marginBottom:'0.6rem'}}>{s.h}</h2>
            <p style={{fontFamily:'Inter,sans-serif',color:'var(--muted)',lineHeight:1.85,fontWeight:300}}>{s.p}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
