'use client'
import { useState } from 'react'
import Link from 'next/link'

const posts = [
  { slug:'why-your-website-is-losing-customers', tag:'Web Design', title:'Why Your Website Is Losing You Customers', excerpt:'Most business websites exist but do not work. Here is why yours might be costing you clients and exactly how to fix it.', readTime:'4 min read', date:'May 2025' },
  { slug:'5-processes-you-should-automate', tag:'Automation', title:'5 Business Processes You Should Automate Right Now', excerpt:'Manual processes are quietly costing your business time and money. Here are five you can automate this week.', readTime:'5 min read', date:'Apr 2025' },
  { slug:'leeds-business-guide-to-google', tag:'SEO', title:'The Leeds Business Guide to Getting Found on Google', excerpt:'Local SEO for Leeds businesses explained simply. How to rank higher, get found faster, and turn searches into enquiries.', readTime:'5 min read', date:'Apr 2025' },
  { slug:'what-is-a-crm', tag:'CRM', title:'What Is a CRM and Does Your Business Actually Need One?', excerpt:'CRM tools can transform how you manage leads and clients. But are they right for your business? Here is an honest answer.', readTime:'4 min read', date:'Mar 2025' },
  { slug:'power-bi-for-small-business', tag:'Data', title:'Power BI for Small Business: What It Is and Why It Matters', excerpt:'Live dashboards are not just for enterprise. Here is how small businesses are using Power BI to make better decisions faster.', readTime:'4 min read', date:'Mar 2025' },
  { slug:'how-to-brief-a-web-designer', tag:'Web Design', title:'How to Brief a Web Designer and Get What You Actually Want', excerpt:'A bad brief leads to a bad website. Here is exactly what to tell your designer before work begins.', readTime:'3 min read', date:'Feb 2025' },
]

const tags = ['All', 'Web Design', 'Automation', 'SEO', 'CRM', 'Data']

export default function Blog() {
  const [activeTag, setActiveTag] = useState('All')
  const filtered = activeTag === 'All' ? posts : posts.filter(p => p.tag === activeTag)
  return (
    <>
      <section style={{background:'#fff',paddingTop:'96px',paddingBottom:'60px',paddingLeft:'3rem',paddingRight:'3rem',position:'relative',overflow:'hidden'}}>
        <div style={{maxWidth:'1200px',margin:'0 auto'}}>
          <p style={{fontFamily:'Inter',fontSize:'0.75rem',letterSpacing:'0.14em',textTransform:'uppercase',color:'var(--red)',marginBottom:'1rem',fontWeight:500}}>Insights</p>
          <h1 style={{fontFamily:'Sora,sans-serif',fontWeight:800,fontSize:'clamp(2.5rem,5vw,4.5rem)',color:'#0d1b2a',letterSpacing:'-0.03em',lineHeight:1.05,marginBottom:'1.5rem'}}>
            Digital insights for<br/><span style={{color:'var(--red)'}}>growing businesses.</span>
          </h1>
          <p style={{fontFamily:'Inter,sans-serif',fontWeight:300,fontSize:'1.05rem',color:'var(--muted)',maxWidth:'480px',lineHeight:1.85}}>
            Practical guides, strategies and ideas from the NIXRIX team.
          </p>
        </div>
      </section>

      <div style={{background:'#fff',borderBottom:'2px solid #ede9e3',padding:'0 3rem',position:'sticky',top:'80px',zIndex:40}}>
        <div style={{maxWidth:'1200px',margin:'0 auto',display:'flex',gap:'0.2rem',overflowX:'auto',scrollbarWidth:'none'}}>
          {tags.map(t=>(
            <button key={t} onClick={()=>setActiveTag(t)} style={{padding:'1rem 1.4rem',fontFamily:'Inter,sans-serif',fontWeight:600,fontSize:'0.85rem',background:'none',border:'none',cursor:'pointer',color:activeTag===t?'var(--red)':'var(--muted)',borderBottom:activeTag===t?'2px solid var(--red)':'2px solid transparent',marginBottom:'-2px',whiteSpace:'nowrap',transition:'all 0.2s'}}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <section style={{background:'var(--cream)',padding:'2.5rem 1.5rem 3.5rem'}}>
        <div style={{maxWidth:'1200px',margin:'0 auto'}}>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(340px,1fr))',gap:'20px'}}>
            {filtered.map((p,i)=>(
              <Link key={i} href={`/blog/${p.slug}`} style={{textDecoration:'none',display:'block'}}>
                <div style={{background:'white',borderRadius:'16px',overflow:'hidden',border:'2px solid #ede9e3',height:'100%',display:'flex',flexDirection:'column',transition:'all 0.3s',boxShadow:'0 2px 12px rgba(0,0,0,0.04)'}}
                  onMouseEnter={e=>{const el=e.currentTarget as HTMLDivElement;el.style.borderColor='var(--red)';el.style.transform='translateY(-6px)';el.style.boxShadow='0 16px 40px rgba(249,8,8,0.12)'}}
                  onMouseLeave={e=>{const el=e.currentTarget as HTMLDivElement;el.style.borderColor='#ede9e3';el.style.transform='translateY(0)';el.style.boxShadow='0 2px 12px rgba(0,0,0,0.04)'}}>
                  <div style={{background:'var(--red)',padding:'0.6rem 1.5rem'}}>
                    <span style={{fontFamily:'Inter,sans-serif',fontSize:'0.68rem',fontWeight:700,color:'white',letterSpacing:'0.12em',textTransform:'uppercase'}}>{p.tag}</span>
                  </div>
                  <div style={{padding:'2rem',flex:1,display:'flex',flexDirection:'column',gap:'0.8rem'}}>
                    <h2 style={{fontFamily:'Sora,sans-serif',fontWeight:700,fontSize:'1.1rem',color:'#0d1b2a',lineHeight:1.35}}>{p.title}</h2>
                    <p style={{fontFamily:'Inter,sans-serif',fontSize:'0.88rem',color:'var(--muted)',lineHeight:1.75,fontWeight:300,flex:1}}>{p.excerpt}</p>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',paddingTop:'1rem',borderTop:'1px solid #ede9e3'}}>
                      <div style={{display:'flex',gap:'0.8rem',fontFamily:'Inter,sans-serif',fontSize:'0.75rem',color:'var(--muted)'}}>
                        <span>{p.date}</span><span>·</span><span>{p.readTime}</span>
                      </div>
                      <span style={{fontFamily:'Inter,sans-serif',fontSize:'0.78rem',fontWeight:600,color:'var(--red)'}}>Read →</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
