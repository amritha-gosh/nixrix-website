'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const sections = [
  { id: 'who-we-are', label: 'Who we are' },
  { id: 'when-applies', label: 'When this notice applies' },
  { id: 'information-collected', label: 'Information we may collect' },
  { id: 'how-we-use', label: 'How we use your information' },
  { id: 'contact-forms', label: 'Contact forms and enquiries' },
  { id: 'cookies-analytics', label: 'Cookies and analytics' },
  { id: 'sharing', label: 'Who we share information with' },
  { id: 'international', label: 'International transfers' },
  { id: 'retention', label: 'How long we keep information' },
  { id: 'security', label: 'How we protect information' },
  { id: 'your-rights', label: 'Your data protection rights' },
  { id: 'marketing', label: 'Marketing communications' },
  { id: 'complaints', label: 'Complaints' },
  { id: 'changes', label: 'Changes to this notice' },
  { id: 'contact-us', label: 'Contact us' },
];

export default function PrivacyPage() {
  const [activeSection, setActiveSection] = useState('who-we-are');
  const [tocOpen, setTocOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setTocOpen(false);
  };

  return (
    <main className="priv-page">

      <section className="priv-hero">
        <div className="priv-hero-inner">
          <span className="legal-badge">LEGAL</span>
          <h1>Privacy Notice</h1>
          <p className="priv-intro">
            Your trust matters to us. This notice explains how NIXRIX collects, uses and
            protects your personal information when you visit our website, contact our team
            or enquire about our services.
          </p>
          <div className="priv-meta">
            <div className="meta-col">
              <span className="meta-label">First published</span>
              <span className="meta-val">12 December 2025</span>
            </div>
            <div className="meta-divider" />
            <div className="meta-col">
              <span className="meta-label">Last updated</span>
              <span className="meta-val">25 May 2026</span>
            </div>
            <div className="meta-divider" />
            <div className="meta-col">
              <span className="meta-label">Privacy contact</span>
              <span className="meta-val">
                <a href="mailto:info@nixrix.com">info@nixrix.com</a>
              </span>
            </div>
          </div>
          <div className="priv-actions">
            <a href="mailto:info@nixrix.com" className="btn-red">Contact us about privacy</a>
            <Link href="/cookies" className="btn-ghost">View Cookie Policy</Link>
          </div>
        </div>
      </section>

      <div className="mob-toc-wrap">
        <button className="mob-toc-btn" onClick={() => setTocOpen(!tocOpen)} aria-expanded={tocOpen}>
          <span>On this page</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
            style={{ transform: tocOpen ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {tocOpen && (
          <nav className="mob-toc-nav">
            {sections.map(({ id, label }) => (
              <button key={id} onClick={() => scrollTo(id)}
                className={'toc-btn' + (activeSection === id ? ' toc-active' : '')}>
                {label}
              </button>
            ))}
          </nav>
        )}
      </div>

      <div className="priv-layout">
        <aside className="priv-toc">
          <p className="toc-heading">On this page</p>
          <nav>
            {sections.map(({ id, label }) => (
              <button key={id} onClick={() => scrollTo(id)}
                className={'toc-btn' + (activeSection === id ? ' toc-active' : '')}>
                {label}
              </button>
            ))}
          </nav>
        </aside>

        <article className="priv-article">

          <section id="who-we-are" className="pol-section">
            <h2>1. Who we are</h2>
            <p>NIXRIX LTD is a digital systems and automation company based in Leeds, United Kingdom. We help businesses improve their digital presence, streamline operations and use technology more effectively.</p>
            <p>For data protection purposes, NIXRIX LTD is the data controller responsible for deciding how and why your personal information is used.</p>
            <div className="tbl-wrap">
              <table className="pol-tbl">
                <thead><tr><th>Company detail</th><th>Information</th></tr></thead>
                <tbody>
                  <tr><td>Legal name</td><td>NIXRIX LTD</td></tr>
                  <tr><td>Company number</td><td>16841804</td></tr>
                  <tr><td>Registered office</td><td><em className="pending">Virtual office address to be confirmed</em></td></tr>
                  <tr><td>Email</td><td><a href="mailto:info@nixrix.com">info@nixrix.com</a></td></tr>
                  <tr><td>Telephone</td><td><a href="tel:+447492712144">+44 7492 712144</a></td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="when-applies" className="pol-section">
            <h2>2. When this notice applies</h2>
            <p>This Privacy Notice applies when you:</p>
            <ul>
              <li>visit the NIXRIX website;</li>
              <li>complete a contact or enquiry form;</li>
              <li>book or request a discovery call;</li>
              <li>contact us by email, telephone or social media;</li>
              <li>enquire about, purchase or receive our services; or</li>
              <li>choose to receive marketing communications, where available.</li>
            </ul>
            <p>This notice does not cover third-party websites linked from our website. Those websites have their own privacy notices.</p>
          </section>

          <section id="information-collected" className="pol-section">
            <h2>3. Information we may collect</h2>
            <p>The information we collect depends on how you interact with NIXRIX.</p>
            <div className="tbl-wrap">
              <table className="pol-tbl">
                <thead><tr><th>Category</th><th>Examples</th></tr></thead>
                <tbody>
                  <tr><td>Contact details</td><td>Name, email address and telephone number.</td></tr>
                  <tr><td>Business information</td><td>Business name, role, industry and service interests.</td></tr>
                  <tr><td>Enquiry content</td><td>Information supplied in forms, emails, calls or discovery discussions.</td></tr>
                  <tr><td>Client and project records</td><td>Proposals, contracts, project correspondence, invoices and service history.</td></tr>
                  <tr><td>Website and device data</td><td>IP address, device and browser information, pages viewed and cookie choices, where collected.</td></tr>
                  <tr><td>Marketing preferences</td><td>Subscription, consent and unsubscribe records.</td></tr>
                </tbody>
              </table>
            </div>
            <p className="pol-note">Please do not provide sensitive personal information through our general enquiry forms unless we have specifically asked for it and it is necessary for the service requested.</p>
          </section>

          <section id="how-we-use" className="pol-section">
            <h2>4. How we use your information</h2>
            <p>We only use personal information where we have an appropriate reason under data protection law.</p>
            <div className="tbl-wrap">
              <table className="pol-tbl pol-tbl-3">
                <thead><tr><th>Purpose</th><th>Information used</th><th>Lawful basis</th></tr></thead>
                <tbody>
                  <tr><td>Respond to enquiries and discovery-call requests</td><td>Contact, business and enquiry information</td><td>Legitimate interests; steps before entering a contract</td></tr>
                  <tr><td>Prepare proposals or recommendations</td><td>Business needs and enquiry information</td><td>Steps before entering a contract; legitimate interests</td></tr>
                  <tr><td>Deliver and manage services</td><td>Client, project and contact information</td><td>Contract; legal obligation where applicable</td></tr>
                  <tr><td>Manage invoicing and business records</td><td>Contact, contract and transaction records</td><td>Legal obligation; legitimate interests</td></tr>
                  <tr><td>Understand and improve website performance</td><td>Cookie and website-use information</td><td>Consent where non-essential cookies are used</td></tr>
                  <tr><td>Send requested marketing communications</td><td>Contact details and preferences</td><td>Consent or legitimate interests where permitted</td></tr>
                  <tr><td>Protect our website and business</td><td>Technical and communication data</td><td>Legitimate interests</td></tr>
                </tbody>
              </table>
            </div>
            <p>Where we rely on legitimate interests, we consider whether our need to use the information is fair and proportionate and does not override your rights.</p>
          </section>

          <section id="contact-forms" className="pol-section">
            <h2>5. Contact forms and enquiries</h2>
            <p>When you send an enquiry through our website, we may collect your name, email address, telephone number, business name, selected service area and the details included in your message.</p>
            <p>We use this information to understand your request, respond to you, recommend appropriate services and maintain a record of our communication. Enquiry emails are processed and delivered using Resend, a transactional email service. Submitting an enquiry form does not automatically subscribe you to marketing messages.</p>
          </section>

          <section id="cookies-analytics" className="pol-section">
            <h2>6. Cookies and analytics</h2>
            <p>Our website uses cookies and similar technologies to enable website functionality and, where you choose, to help us understand performance through Google Analytics.</p>
            <div className="tbl-wrap">
              <table className="pol-tbl pol-tbl-3">
                <thead><tr><th>Type</th><th>Purpose</th><th>Consent position</th></tr></thead>
                <tbody>
                  <tr><td>Essential cookies</td><td>Allow core website functions and security.</td><td>May be used without optional consent.</td></tr>
                  <tr><td>Preference cookies</td><td>Remember settings or choices, where implemented.</td><td>Required where implemented.</td></tr>
                  <tr><td>Analytics cookies</td><td>Measure visits and website performance via Google Analytics.</td><td>Only activated after your consent.</td></tr>
                  <tr><td>Advertising or measurement cookies</td><td>Measure campaigns or support advertising, where implemented.</td><td>Only activated after your consent.</td></tr>
                </tbody>
              </table>
            </div>
            <p>For full details please read our <Link href="/cookies" className="inline-link">Cookie Policy</Link>.</p>
          </section>

          <section id="sharing" className="pol-section">
            <h2>7. Who we share information with</h2>
            <p>We do not sell personal information. We may share information with trusted service providers where necessary to operate our website, communicate with you or deliver our services.</p>
            <div className="tbl-wrap">
              <table className="pol-tbl">
                <thead><tr><th>Recipient</th><th>Reason for sharing</th></tr></thead>
                <tbody>
                  <tr><td>Vercel</td><td>To host, deploy and serve the NIXRIX website.</td></tr>
                  <tr><td>GoDaddy</td><td>To manage the nixrix.com domain and DNS.</td></tr>
                  <tr><td>Resend</td><td>To process and deliver enquiry and auto-reply emails.</td></tr>
                  <tr><td>Google Analytics</td><td>To measure website performance and visitor behaviour, where consented to.</td></tr>
                  <tr><td>Professional advisers</td><td>For legal, accounting or compliance support.</td></tr>
                  <tr><td>Regulators or authorities</td><td>Where disclosure is required by law.</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="international" className="pol-section">
            <h2>8. International transfers</h2>
            <p>Some of our technology providers, including Vercel and Google Analytics, may process personal information outside the United Kingdom. Where this applies, we take steps intended to ensure appropriate safeguards are in place, such as UK adequacy regulations or approved contractual protections.</p>
          </section>

          <section id="retention" className="pol-section">
            <h2>9. How long we keep information</h2>
            <p>We retain personal information only for as long as it is needed for the purpose for which it was collected, including appropriate business, legal and accounting requirements.</p>
            <div className="tbl-wrap">
              <table className="pol-tbl">
                <thead><tr><th>Information type</th><th>Retention period</th></tr></thead>
                <tbody>
                  <tr><td>General enquiries not becoming projects</td><td>Up to 24 months after the last communication.</td></tr>
                  <tr><td>Client and project records</td><td>For the duration of the relationship and then as required for contract, legal and accounting purposes.</td></tr>
                  <tr><td>Financial and invoice records</td><td>For the period required by applicable UK tax and accounting rules, typically 6 years.</td></tr>
                  <tr><td>Marketing preferences and opt-out records</td><td>For as long as necessary to respect preferences and prevent unwanted marketing.</td></tr>
                  <tr><td>Analytics information</td><td>According to the configured Google Analytics retention setting.</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="security" className="pol-section">
            <h2>10. How we protect information</h2>
            <p>We use reasonable technical and organisational measures intended to protect personal information from unauthorised access, loss, misuse, alteration or disclosure. These include restricted access, account security controls, secure hosting via Vercel and the use of trusted technology providers.</p>
            <p>No transmission of information over the internet can be guaranteed to be completely secure.</p>
          </section>

          <section id="your-rights" className="pol-section">
            <h2>11. Your data protection rights</h2>
            <p>Depending on the circumstances, UK data protection law gives you rights to:</p>
            <ul>
              <li>ask for access to personal information we hold about you;</li>
              <li>ask us to correct information that is inaccurate or incomplete;</li>
              <li>ask us to delete your information in certain circumstances;</li>
              <li>ask us to restrict the way we use your information in certain circumstances;</li>
              <li>object to certain uses of your information, including direct marketing;</li>
              <li>withdraw consent where our use relies on consent; and</li>
              <li>request portability of certain information where applicable.</li>
            </ul>
            <p>To make a request, email <a href="mailto:info@nixrix.com" className="inline-link">info@nixrix.com</a>. We may ask for information to verify your identity before completing a request.</p>
          </section>

          <section id="marketing" className="pol-section">
            <h2>12. Marketing communications</h2>
            <p>Where you choose to receive marketing communications, we may send information about NIXRIX services, digital growth, automation or related insights. You may opt out at any time by using an unsubscribe option in a message or by emailing <a href="mailto:info@nixrix.com" className="inline-link">info@nixrix.com</a>.</p>
          </section>

          <section id="complaints" className="pol-section">
            <h2>13. Complaints</h2>
            <p>We would appreciate the opportunity to address any concern about our use of personal information. Please contact us at <a href="mailto:info@nixrix.com" className="inline-link">info@nixrix.com</a> in the first instance.</p>
            <p>You also have the right to complain to the Information Commissioner's Office (ICO), the UK data protection regulator, at <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="inline-link">ico.org.uk</a> or by telephone on 0303 123 1113.</p>
          </section>

          <section id="changes" className="pol-section">
            <h2>14. Changes to this notice</h2>
            <p>We may update this Privacy Notice from time to time to reflect changes to our services, systems or legal responsibilities. Any revised version will be published on this page with an updated date.</p>
          </section>

          <section id="contact-us" className="pol-section">
            <h2>15. Contact us</h2>
            <div className="tbl-wrap">
              <table className="pol-tbl">
                <thead><tr><th>Detail</th><th>Information</th></tr></thead>
                <tbody>
                  <tr><td>Company</td><td>NIXRIX LTD</td></tr>
                  <tr><td>Company number</td><td>16841804</td></tr>
                  <tr><td>Email</td><td><a href="mailto:info@nixrix.com" className="inline-link">info@nixrix.com</a></td></tr>
                  <tr><td>Telephone</td><td><a href="tel:+447492712144">+44 7492 712144</a></td></tr>
                  <tr><td>Registered office</td><td><em className="pending">Virtual office address to be confirmed</em></td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <div className="legal-links">
            <Link href="/cookies" className="legal-link-card">
              <span className="llc-badge">LEGAL</span>
              <span className="llc-title">Cookie Policy →</span>
            </Link>
            <Link href="/terms" className="legal-link-card">
              <span className="llc-badge">LEGAL</span>
              <span className="llc-title">Terms of Use →</span>
            </Link>
          </div>

        </article>
      </div>

      <style jsx>{`
        .priv-page { background: #f7f5f2; min-height: 100vh; font-family: 'Inter', sans-serif; }
        .priv-hero { background: #0d1b2a; padding: 80px 24px 60px; }
        .priv-hero-inner { max-width: 780px; margin: 0 auto; }
        .legal-badge { display: inline-block; background: #f90808; color: #fff; font-size: 11px; font-weight: 700; letter-spacing: .12em; padding: 4px 10px; border-radius: 3px; margin-bottom: 16px; font-family: 'Sora', sans-serif; }
        .priv-hero-inner h1 { font-family: 'Sora', sans-serif; font-size: clamp(2rem, 5vw, 3rem); font-weight: 800; color: #fff; margin: 0 0 16px; line-height: 1.15; }
        .priv-intro { color: rgba(247,245,242,.8); font-size: 1.05rem; line-height: 1.7; margin: 0 0 28px; font-weight: 300; max-width: 640px; }
        .priv-meta { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 0; background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.1); border-radius: 8px; padding: 16px 20px; margin-bottom: 32px; }
        .meta-col { display: flex; flex-direction: column; gap: 2px; padding-right: 20px; }
        .meta-label { font-size: 11px; font-weight: 600; letter-spacing: .08em; color: rgba(247,245,242,.5); text-transform: uppercase; }
        .meta-val { font-size: .9rem; color: #f7f5f2; }
        .meta-val a { color: #f90808; text-decoration: none; }
        .meta-val a:hover { text-decoration: underline; }
        .meta-divider { width: 1px; height: 32px; background: rgba(255,255,255,.15); margin-right: 20px; }
        .priv-actions { display: flex; flex-wrap: wrap; gap: 12px; }
        .btn-red { background: #f90808; color: #fff; padding: 12px 24px; border-radius: 6px; font-weight: 600; font-size: .9rem; text-decoration: none; transition: opacity .2s; }
        .btn-red:hover { opacity: .88; }
        .btn-ghost { background: transparent; color: #f7f5f2; padding: 12px 24px; border-radius: 6px; font-weight: 500; font-size: .9rem; text-decoration: none; border: 1px solid rgba(255,255,255,.25); transition: border-color .2s; }
        .btn-ghost:hover { border-color: rgba(255,255,255,.55); }
        .mob-toc-wrap { display: none; background: #fff; border-bottom: 1px solid #e8e4df; padding: 0 20px; }
        .mob-toc-btn { width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 14px 0; background: none; border: none; font-size: .9rem; font-weight: 600; color: #0d1b2a; cursor: pointer; font-family: 'Inter', sans-serif; }
        .mob-toc-nav { display: flex; flex-direction: column; padding-bottom: 12px; gap: 2px; }
        .priv-layout { max-width: 1100px; margin: 0 auto; padding: 60px 24px 80px; display: grid; grid-template-columns: 220px 1fr; gap: 60px; align-items: start; }
        .priv-toc { position: sticky; top: 100px; }
        .toc-heading { font-size: 11px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: #6b6256; margin: 0 0 12px; font-family: 'Sora', sans-serif; }
        .toc-btn { display: block; width: 100%; text-align: left; background: none; border: none; border-left: 2px solid transparent; padding: 7px 10px; font-size: .82rem; color: #6b6256; cursor: pointer; transition: color .15s, border-color .15s; font-family: 'Inter', sans-serif; line-height: 1.4; border-radius: 0 4px 4px 0; }
        .toc-btn:hover { color: #0d1b2a; }
        .toc-active { color: #f90808 !important; border-left-color: #f90808 !important; font-weight: 500; }
        .priv-article { max-width: 760px; }
        .pol-section { margin-bottom: 56px; scroll-margin-top: 100px; }
        .pol-section h2 { font-family: 'Sora', sans-serif; font-size: 1.25rem; font-weight: 700; color: #0d1b2a; margin: 0 0 16px; padding-bottom: 12px; border-bottom: 2px solid #e8e4df; }
        .pol-section p { font-size: .96rem; line-height: 1.75; color: #3a3530; margin: 0 0 14px; }
        .pol-section ul { margin: 0 0 14px; padding-left: 20px; }
        .pol-section li { font-size: .96rem; line-height: 1.75; color: #3a3530; margin-bottom: 4px; }
        .pol-note { background: rgba(13,27,42,.04); border-left: 3px solid #0d1b2a; padding: 12px 16px; border-radius: 0 6px 6px 0; font-size: .9rem !important; color: #6b6256 !important; }
        .inline-link { color: #f90808; text-decoration: none; font-weight: 500; }
        .inline-link:hover { text-decoration: underline; }
        .pending { color: #f90808; font-style: normal; font-size: .85rem; }
        .tbl-wrap { overflow-x: auto; margin: 16px 0 20px; border-radius: 8px; border: 1px solid #e0dbd4; }
        .pol-tbl { width: 100%; border-collapse: collapse; font-size: .9rem; background: #fff; }
        .pol-tbl th { background: #0d1b2a; color: #f7f5f2; font-weight: 600; padding: 12px 16px; text-align: left; font-family: 'Sora', sans-serif; font-size: .82rem; letter-spacing: .04em; }
        .pol-tbl td { padding: 11px 16px; color: #3a3530; border-bottom: 1px solid #ede9e3; line-height: 1.55; vertical-align: top; }
        .pol-tbl tbody tr:last-child td { border-bottom: none; }
        .pol-tbl tbody tr:hover td { background: #faf8f5; }
        .pol-tbl td a { color: #f90808; text-decoration: none; }
        .pol-tbl td a:hover { text-decoration: underline; }
        .pol-tbl-3 th:first-child, .pol-tbl-3 td:first-child { width: 30%; }
        .legal-links { display: flex; gap: 16px; margin-top: 48px; padding-top: 32px; border-top: 1px solid #e8e4df; flex-wrap: wrap; }
        .legal-link-card { display: flex; flex-direction: column; gap: 4px; padding: 16px 20px; background: #fff; border: 1px solid #e0dbd4; border-radius: 8px; text-decoration: none; transition: border-color .2s, box-shadow .2s; min-width: 160px; }
        .legal-link-card:hover { border-color: #f90808; box-shadow: 0 2px 12px rgba(249,8,8,.08); }
        .llc-badge { font-size: 10px; font-weight: 700; letter-spacing: .1em; color: #f90808; font-family: 'Sora', sans-serif; }
        .llc-title { font-size: .9rem; font-weight: 600; color: #0d1b2a; font-family: 'Sora', sans-serif; }
        @media (max-width: 900px) {
          .priv-layout { grid-template-columns: 1fr; padding: 32px 20px 60px; }
          .priv-toc { display: none; }
          .mob-toc-wrap { display: block; }
          .meta-divider { display: none; }
          .meta-col { padding: 4px 0; }
          .priv-meta { flex-direction: column; }
        }
        @media (max-width: 600px) {
          .priv-hero { padding: 60px 20px 40px; }
          .priv-actions { flex-direction: column; }
          .btn-red, .btn-ghost { text-align: center; }
        }
      \`}</style>
    </main>
  );
}
