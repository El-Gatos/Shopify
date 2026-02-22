// app/api/subscribe/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { email } = await request.json();

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Valid email required.' }, { status: 400 });
  }

  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  const endpoint = `https://${domain}/api/2024-01/graphql.json`;

  // Uses the Storefront API to create a customer with marketing opt-in.
  // If they already exist, Shopify returns a CUSTOMER_ALREADY_USED_EMAIL error —
  // we treat that as a success so it doesn't feel like an error to the user.
  const query = `
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer {
          id
          email
          acceptsMarketing
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  const variables = {
    input: {
      email,
      acceptsMarketing: true,
      // A placeholder password is required by the mutation.
      // The customer won't be able to log in without resetting it — that's fine for newsletter-only signups.
      password: `Signup_${Math.random().toString(36).slice(2, 10)}!`,
    },
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': token,
      },
      body: JSON.stringify({ query, variables }),
    });

    const data = await response.json();
    const errors = data?.data?.customerCreate?.customerUserErrors;

    // CUSTOMER_ALREADY_USED_EMAIL means they're already in Shopify — still a "success" UX-wise
    if (errors?.length > 0) {
      const alreadyExists = errors.some((e) => e.code === 'CUSTOMER_ALREADY_USED_EMAIL');
      if (alreadyExists) {
        return NextResponse.json({ success: true });
      }

      console.error('Shopify customerCreate errors:', errors);
      return NextResponse.json({ error: 'Could not subscribe. Please try again.' }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Subscribe route error:', error);
    return NextResponse.json({ error: 'Server error. Try again.' }, { status: 500 });
  }
}