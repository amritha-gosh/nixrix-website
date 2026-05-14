export default function Cookies() {
  return (
    <section style={{background:'#fff',paddingTop:'140px',paddingBottom:'80px',paddingLeft:'3rem',paddingRight:'3rem'}}>
      <div style={{maxWidth:'800px',margin:'0 auto'}}>
        <h1 style={{fontFamily:'Sora,sans-serif',fontWeight:800,fontSize:'2.5rem',color:'var(--dark)',marginBottom:'2rem'}}>Cookie Policy</h1>
        <p style={{fontFamily:'Inter,sans-serif',color:'var(--muted)',lineHeight:1.9,marginBottom:'1.5rem'}}>Last updated: May 2025</p>
        {[
          {h:'What are cookies?',p:'Cookies are small text files stored on your device when you visit a website. They help us provide a better experience.'},
          {h:'Cookies we use',p:'Essential cookies (required for the site to work), analytics cookies (anonymous usage data via Google Analytics), and preference cookies (remembering your settings).'},
          {h:'Managing cookies',p:'You can control cookies through your browser settings. Disabling some cookies may affect website functionality.'},
          {h:'Third-party cookies',p:'We may use third-party services (Google Analytics) that set their own cookies. These are governed by their respective privacy policies.'},
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
