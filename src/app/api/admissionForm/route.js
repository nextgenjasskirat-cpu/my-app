import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: 'Server misconfiguration: RESEND_API_KEY missing' }, { status: 500 });
    }

    if (!process.env.ADMIN_EMAIL) {
      return NextResponse.json({ error: 'Server misconfiguration: ADMIN_EMAIL missing' }, { status: 500 });
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Form Submission <onboarding@resend.dev>',
        to: [process.env.ADMIN_EMAIL],
        subject: `New Form Submission from ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong> ${message}</p>
          <p><em>This email was sent from your website contact form.</em></p>
        `,
      }),
    });

    if (!response.ok) {
      let details = null;
      try {
        details = await response.json();
      } catch (_) {}
      return NextResponse.json(
        { error: 'Failed to send email', details },
        { status: 500 }
      );
    }

    const data = await response.json();
    return NextResponse.json(
      { message: 'Form submitted successfully', id: data?.id },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
