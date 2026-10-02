import { NextApiRequest, NextApiResponse } from 'next'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { customerEmail, trackingNumber, description, status, destination } = req.body

  try {
    const { data, error } = await resend.emails.send({
      from: 'Corten Logistics <onboarding@resend.dev>',
      to: [customerEmail || 'customer@example.com'],
      subject: `Order Update: ${status}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #3b82f6;">Order Status Update</h1>
          <p>Hello,</p>
          <p>Your order status has been updated:</p>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Tracking Number:</strong> ${trackingNumber}</p>
            <p><strong>Package:</strong> ${description || 'General Package'}</p>
            <p><strong>Status:</strong> <span style="color: #3b82f6; font-weight: bold;">${status}</span></p>
            <p><strong>Destination:</strong> ${destination}</p>
          </div>
          
          <p>Track your order anytime at:</p>
          <a href="https://corten-logistics.vercel.app/track" 
             style="display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
            Track Order
          </a>
          
          <p style="margin-top: 30px; color: #6b7280; font-size: 14px;">
            Thank you for choosing Corten Logistics!
          </p>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return res.status(500).json({ error: 'Failed to send email' })
    }

    return res.status(200).json({ success: true, data })
  } catch (error) {
    console.error('API error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}