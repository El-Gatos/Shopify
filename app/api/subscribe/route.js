// app/api/subscribe/route.js
import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request) {
  const { email } = await request.json();

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Valid email required.' }, { status: 400 });
  }

  const apiKey = process.env.MAILCHIMP_API_KEY;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
  // Your API key ends in -us1, -us2, etc. — that's your datacenter
  const datacenter = apiKey.split('-').pop();

  const url = `https://${datacenter}.api.mailchimp.com/3.0/lists/${audienceId}/members`;

  // MD5 hash of lowercase email = Mailchimp's member identifier
  const emailHash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex');

  try {
    const response = await fetch(`${url}/${emailHash}`, {
      method: 'PUT', // PUT is idempotent — re-subscribes if they left, no duplicate error
      headers: {
        Authorization: `apikey ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: email,
        status_if_new: 'subscribed', // New members go straight in (no double opt-in)
        status: 'subscribed',
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Mailchimp error:', data);
      return NextResponse.json(
        { error: data.detail || 'Something went wrong with Mailchimp.' },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Subscribe route error:', error);
    return NextResponse.json({ error: 'Server error. Try again.' }, { status: 500 });
  }
}