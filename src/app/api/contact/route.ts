import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { name, business, email, phone, service, message } = await req.json()

    if (!name || !email || !service) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASS

    if (smtpUser && smtpPass) {
      const nodemailer = await import('nodemailer')
      const transporter = nodemailer.default.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false,
        auth: { user: smtpUser, pass: smtpPass },
        tls: { ciphers: 'SSLv3', rejectUnauthorized: false },
      })

      // Email to NIXRIX
      await transporter.sendMail({
        from: `"NIXRIX Website" <${smtpUser}>`,
        to: 'info@nixrix.com',
        replyTo: email,
        subject: `New Enquiry: ${name} — ${service}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
            <div style="background:#f90808;padding:20px;text-align:center">
              <h1 style="color:white;margin:0;font-size:22px">NIXRIX — New Enquiry</h1>
            </div>
            <div style="padding:28px;border:1px solid #eee">
              <table style="width:100%;border-collapse:collapse">
                <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-weight:bold;width:120px">Name</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0">${name}</td></tr>
                <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-weight:bold">Business</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0">${business || 'Not provided'}</td></tr>
                <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-weight:bold">Email</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0"><a href="mailto:${email}">${email}</a></td></tr>
                <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-weight:bold">Phone</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0">${phone || 'Not provided'}</td></tr>
                <tr><td style="padding:10px 0;font-weight:bold">Service</td><td style="padding:10px 0">${service}</td></tr>
              </table>
              <div style="margin-top:20px;padding:16px;background:#fff8f8;border-left:4px solid #f90808">
                <strong>Message:</strong><br/>${message || 'None provided'}
              </div>
              <div style="margin-top:20px;text-align:center">
                <a href="mailto:${email}" style="display:inline-block;background:#f90808;color:white;padding:10px 24px;text-decoration:none;font-weight:bold;font-size:13px;margin-right:10px">Reply via Email</a>
                <a href="https://wa.me/447492712144" style="display:inline-block;background:#25D366;color:white;padding:10px 24px;text-decoration:none;font-weight:bold;font-size:13px">Reply via WhatsApp</a>
              </div>
            </div>
            <div style="padding:14px;background:#3D2B1F;text-align:center">
              <p style="color:#888;font-size:11px;margin:0">NIXRIX · Leeds, UK · info@nixrix.com · +44 7492 712144</p>
            </div>
          </div>
        `,
      })

      // Auto-reply to enquirer
      await transporter.sendMail({
        from: `"NIXRIX" <${smtpUser}>`,
        to: email,
        subject: `Thanks for reaching out, ${name.split(' ')[0]}!`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
            <div style="background:#f90808;padding:20px;text-align:center">
              <h1 style="color:white;margin:0;font-size:22px">NIXRIX</h1>
            </div>
            <div style="padding:28px;background:#fff">
              <h2 style="color:#3D2B1F">Hi ${name.split(' ')[0]}, we got your message!</h2>
              <p style="color:#6b6256;line-height:1.8">Thanks for reaching out to NIXRIX. We will get back to you within <strong>24 hours</strong>.</p>
              <p style="color:#6b6256;line-height:1.8">Need a faster response? Call or WhatsApp us:</p>
              <div style="margin:20px 0">
                <a href="tel:+447492712144" style="display:inline-block;background:#3D2B1F;color:white;padding:10px 20px;text-decoration:none;font-weight:bold;font-size:13px;margin-right:10px">Call +44 7492 712144</a>
                <a href="https://wa.me/447492712144" style="display:inline-block;background:#25D366;color:white;padding:10px 20px;text-decoration:none;font-weight:bold;font-size:13px">WhatsApp Us</a>
              </div>
              <p style="color:#6b6256">Best regards,<br/><strong>The NIXRIX Team</strong></p>
            </div>
            <div style="padding:14px;background:#3D2B1F;text-align:center">
              <p style="color:#888;font-size:11px;margin:0">NIXRIX · Leeds, UK · nixrix.com</p>
            </div>
          </div>
        `,
      })
    } else {
      console.log('Email not configured. Submission:', { name, business, email, phone, service, message })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact error:', err)
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
