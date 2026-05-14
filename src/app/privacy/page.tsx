export default function Privacy() {
  return (
    <section style={{background:'#fff',paddingTop:'140px',paddingBottom:'80px',paddingLeft:'3rem',paddingRight:'3rem'}}>
      <div style={{maxWidth:'800px',margin:'0 auto'}}>
        <h1 style={{fontFamily:'Sora,sans-serif',fontWeight:800,fontSize:'2.5rem',color:'var(--dark)',marginBottom:'2rem'}}>Privacy Policy</h1>
        <p style={{fontFamily:'Inter,sans-serif',color:'var(--muted)',lineHeight:1.9,marginBottom:'1.5rem'}}>Last updated: May 2025</p>
        {[
          {h:'1. Who we are',p:'NIXRIX is a digital systems and automation company based in Leeds, UK. Contact: info@nixrix.com'},
          {h:'2. Data we collect',p:'We collect information you provide via our contact form (name, email, phone, message). We also collect anonymised analytics data via cookies.'},
          {h:'3. How we use your data',p:'Your data is used solely to respond to your enquiry and, if you consent, to send relevant updates about our services.'},
          {h:'4. Data storage',p:'Your data is stored securely and never sold to third parties. We retain contact form data for up to 24 months.'},
          {h:'5. Your rights',p:'You have the right to access, correct, or delete your personal data at any time. Email info@nixrix.com to make a request.'},
          {h:'6. Cookies',p:'We use essential cookies for website functionality and optional analytics cookies. See our Cookie Policy for details.'},
          {h:'7. Contact',p:'For any privacy queries, contact us at info@nixrix.com or +44 7492 712144.'},
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
