import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { 
      firstName,
      lastName,
      email, 
      phone, 
      currentLicenceNumber,
      licenceCardNumber,
      rmsLogBookNumber,
      licenceCourseRequired,
      preferredDate,
      message
    } = await request.json();

    // Validate required fields
    if (!firstName || !lastName || !email || !phone) {
      return NextResponse.json({ error: 'All required fields must be filled out' }, { status: 400 });
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
        from: 'Admission Form <onboarding@resend.dev>',
        to: [process.env.ADMIN_EMAIL],
        subject: `New Admission Application from ${firstName} ${lastName}`,
        html: `
          <h2>New Admission Application Submission</h2>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Current Licence Number:</strong> ${currentLicenceNumber || 'Not provided'}</p>
          <p><strong>Licence Card Number:</strong> ${licenceCardNumber || 'Not provided'}</p>
          <p><strong>RMS Log Book Number:</strong> ${rmsLogBookNumber || 'Not provided'}</p>
          <p><strong>Licence Course Required:</strong> ${licenceCourseRequired}</p>
          <p><strong>Preferred Date:</strong> ${preferredDate || 'Not specified'}</p>
          <p><strong>Additional Information:</strong> ${message || 'None provided'}</p>
          <p><em>This email was sent from your website admission form.</em></p>
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
      { message: 'Application submitted successfully', id: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('Admission form error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}