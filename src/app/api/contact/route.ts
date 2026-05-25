import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { name, business, email, phone, service, message } = await req.json()

    if (!name || !email || !service) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const apiKey = process.env.RESEND_API_KEY

    if (apiKey) {
      const { Resend } = await import('resend')
      const resend = new Resend(apiKey)

      // Email to NIXRIX team
      await resend.emails.send({
        from: 'NIXRIX Website <info@nixrix.com>',
        to: 'info@nixrix.com',
        replyTo: email,
        subject: `New Enquiry: ${name} — ${service}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
            <div style="background:#f90808;padding:24px;text-align:center">
              <h1 style="color:white;margin:0;font-size:24px;font-weight:800">NIXRIX</h1>
              <p style="color:rgba(255,255,255,0.85);margin:4px 0 0;font-size:12px;letter-spacing:2px">NEW WEBSITE ENQUIRY</p>
            </div>
            <div style="padding:32px;background:#fff;border:1px solid #eee">
              <table style="width:100%;border-collapse:collapse">
                <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-weight:700;width:120px;color:#3D2B1F">Name</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#333">${name}</td></tr>
                <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-weight:700;color:#3D2B1F">Business</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#333">${business || 'Not provided'}</td></tr>
                <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-weight:700;color:#3D2B1F">Email</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0"><a href="mailto:${email}" style="color:#f90808">${email}</a></td></tr>
                <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-weight:700;color:#3D2B1F">Phone</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#333">${phone || 'Not provided'}</td></tr>
                <tr><td style="padding:10px 0;font-weight:700;color:#3D2B1F">Service</td><td style="padding:10px 0;color:#333">${service}</td></tr>
              </table>
              <div style="margin-top:24px;padding:16px;background:#fff8f8;border-left:4px solid #f90808;border-radius:2px">
                <p style="font-weight:700;margin:0 0 8px;color:#3D2B1F">Message:</p>
                <p style="margin:0;color:#555;line-height:1.7">${message || 'No message provided'}</p>
              </div>
              <div style="margin-top:24px;text-align:center">
                <a href="mailto:${email}" style="display:inline-block;background:#f90808;color:white;padding:12px 24px;text-decoration:none;font-weight:700;font-size:14px;margin-right:8px">Reply via Email</a>
                <a href="https://wa.me/447492712144?text=Hi ${encodeURIComponent(name)}" style="display:inline-block;background:#25D366;color:white;padding:12px 24px;text-decoration:none;font-weight:700;font-size:14px">WhatsApp</a>
              </div>
            </div>
            <div style="padding:16px;background:#3D2B1F;text-align:center">
              <p style="color:#888;font-size:11px;margin:0">NIXRIX · Leeds, UK · info@nixrix.com · +44 7492 712144</p>
            </div>
          </div>
        `,
      })

      // Auto-reply to the person who submitted
      await resend.emails.send({
        from: 'NIXRIX <info@nixrix.com>',
        to: email,
        subject: `Thank you for getting in touch, ${name.split(' ')[0]}!`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
            <div style="background:#f90808;padding:24px;text-align:center">
              <h1 style="color:white;margin:0;font-size:24px;font-weight:800">NIXRIX</h1>
            </div>
            <div style="padding:32px;background:#fff">
              <h2 style="color:#3D2B1F;font-size:20px;margin:0 0 16px">Hi ${name.split(' ')[0]},</h2>
              <p style="color:#6b6256;line-height:1.8;margin:0 0 16px">Thank you for getting in touch. We have received your message and will get back to you within 24 hours.</p>
              <p style="color:#6b6256;line-height:1.8;margin:0 0 24px">In the meantime, if you need to reach us urgently:</p>
              <div style="margin:0 0 24px">
                <a href="tel:+447492712144" style="display:inline-block;background:#3D2B1F;color:white;padding:12px 20px;text-decoration:none;font-weight:700;font-size:14px;margin-right:8px">Call +44 7492 712144</a>
                <a href="https://wa.me/447492712144" style="display:inline-block;background:#25D366;color:white;padding:12px 20px;text-decoration:none;font-weight:700;font-size:14px">WhatsApp Us</a>
              </div>
              <div style="padding:16px;background:#fff8f8;border-left:4px solid #f90808;margin:0 0 24px">
                <p style="font-size:13px;color:#888;margin:0 0 4px">Your enquiry was about:</p>
                <p style="color:#3D2B1F;font-weight:600;margin:0">${service}</p>
              </div>
              <p style="color:#6b6256;line-height:1.8;margin:0">Best regards,<br/><strong style="color:#3D2B1F">Team NIXRIX</strong></p>
            </div>
            <div style="padding:16px;background:#3D2B1F;text-align:center">
              <p style="color:#888;font-size:11px;margin:0">© 2025 NIXRIX · Leeds, UK · <a href="https://nixrix.com" style="color:#f90808">nixrix.com</a></p>
            </div>
          </div>
        `,
      })
    } else {
      console.log('No RESEND_API_KEY found. Form submission:', { name, business, email, phone, service, message })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
