import { NextRequest, NextResponse } from 'next/server'

const logoHtml = `<img src="https://nixrix.com/nixrix-logo.svg" alt="NIXRIX" style="height:36px;width:auto;display:block;margin:0 auto;" />`

const emailHeader = (title: string) => `
  <div style="background:linear-gradient(135deg,#0d1b2a 0%,#1a2f4a 100%);padding:28px 32px;text-align:center;border-bottom:3px solid #f90808;">
    ${logoHtml}
    ${title ? `<p style="color:rgba(255,255,255,0.6);font-size:11px;letter-spacing:2px;text-transform:uppercase;margin:10px 0 0;font-family:Arial,sans-serif;">${title}</p>` : ''}
  </div>
`

const emailFooter = `
  <div style="background:#0d1b2a;padding:16px 32px;text-align:center;border-top:1px solid rgba(255,255,255,0.06);">
    <p style="color:rgba(255,255,255,0.3);font-size:11px;margin:0;font-family:Arial,sans-serif;">
      © 2025 NIXRIX · Leeds, UK · 
      <a href="https://nixrix.com" style="color:#f90808;text-decoration:none;">nixrix.com</a> · 
      <a href="mailto:info@nixrix.com" style="color:rgba(255,255,255,0.3);text-decoration:none;">info@nixrix.com</a>
    </p>
  </div>
`

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

      // Notification email to NIXRIX team
      await resend.emails.send({
        from: 'NIXRIX Website <info@nixrix.com>',
        to: 'info@nixrix.com',
        replyTo: email,
        subject: `New Enquiry: ${name} — ${service}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:620px;margin:0 auto;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.12);">
            ${emailHeader('New Website Enquiry')}
            <div style="background:#ffffff;padding:32px;">
              <table style="width:100%;border-collapse:collapse;">
                ${[
                  ['Name', name],
                  ['Business', business || 'Not provided'],
                  ['Email', `<a href="mailto:${email}" style="color:#f90808;text-decoration:none;">${email}</a>`],
                  ['Phone', phone || 'Not provided'],
                  ['Service', service],
                ].map(([label, value]) => `
                  <tr>
                    <td style="padding:10px 12px;background:#f8fafd;border-radius:6px;font-weight:700;font-size:12px;color:#0d1b2a;text-transform:uppercase;letter-spacing:0.5px;width:120px;margin-bottom:6px;">${label}</td>
                    <td style="padding:10px 12px;font-size:14px;color:#333;"> ${value}</td>
                  </tr>
                  <tr><td colspan="2" style="padding:3px;"></td></tr>
                `).join('')}
              </table>
              ${message ? `
                <div style="margin-top:20px;padding:16px 20px;background:#fff8f8;border-left:4px solid #f90808;border-radius:0 8px 8px 0;">
                  <p style="font-size:11px;font-weight:700;color:#f90808;text-transform:uppercase;letter-spacing:1px;margin:0 0 8px;">Message</p>
                  <p style="font-size:14px;color:#444;line-height:1.7;margin:0;">${message}</p>
                </div>
              ` : ''}
              <div style="margin-top:24px;display:flex;gap:10px;text-align:center;">
                <a href="mailto:${email}" style="display:inline-block;background:#f90808;color:white;padding:12px 24px;text-decoration:none;font-weight:700;font-size:13px;border-radius:50px;margin-right:10px;">Reply via Email</a>
                <a href="https://wa.me/447492712144?text=Hi ${encodeURIComponent(name)}" style="display:inline-block;background:#25D366;color:white;padding:12px 24px;text-decoration:none;font-weight:700;font-size:13px;border-radius:50px;">WhatsApp</a>
              </div>
            </div>
            ${emailFooter}
          </div>
        `,
      })

      // Auto-reply to enquirer
      await resend.emails.send({
        from: 'NIXRIX <info@nixrix.com>',
        to: email,
        subject: `Thank you for getting in touch, ${name.split(' ')[0]}!`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:620px;margin:0 auto;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.12);">
            ${emailHeader('')}
            <div style="background:#ffffff;padding:32px;">
              <h2 style="color:#0d1b2a;font-size:22px;margin:0 0 16px;font-family:Arial,sans-serif;">Hi ${name.split(' ')[0]},</h2>
              <p style="color:#555;line-height:1.8;font-size:15px;margin:0 0 16px;">Thank you for getting in touch. We have received your message and will get back to you within <strong style="color:#0d1b2a;">24 hours</strong>.</p>
              <div style="background:#f8fafd;border-radius:10px;padding:16px 20px;margin:20px 0;border-left:4px solid #f90808;">
                <p style="font-size:11px;font-weight:700;color:#f90808;text-transform:uppercase;letter-spacing:1px;margin:0 0 6px;">Your enquiry was about</p>
                <p style="color:#0d1b2a;font-weight:700;font-size:15px;margin:0;">${service}</p>
              </div>
              <p style="color:#555;line-height:1.8;font-size:14px;margin:0 0 20px;">Need a faster response? Reach us directly:</p>
              <div>
                <a href="tel:+447492712144" style="display:inline-block;background:#0d1b2a;color:white;padding:11px 20px;text-decoration:none;font-weight:700;font-size:13px;border-radius:50px;margin-right:10px;">📞 +44 7492 712144</a>
                <a href="https://wa.me/447492712144" style="display:inline-block;background:#25D366;color:white;padding:11px 20px;text-decoration:none;font-weight:700;font-size:13px;border-radius:50px;">💬 WhatsApp</a>
              </div>
              <p style="color:#888;font-size:13px;margin:28px 0 0;line-height:1.7;">Best regards,<br/><strong style="color:#0d1b2a;">Team NIXRIX</strong></p>
            </div>
            ${emailFooter}
          </div>
        `,
      })
    } else {
      console.log('No RESEND_API_KEY. Submission:', { name, business, email, phone, service, message })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact error:', err)
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
