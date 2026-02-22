import { NextResponse } from 'next/server';

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const endpoint = `https://${domain}/api/2024-01/graphql.json`;

// Simple in-memory rate limiter — max 3 attempts per IP per 10 minutes
const rateLimitMap = new Map();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 3;

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now - entry.windowStart > WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, windowStart: now });
    return false;
  }
  if (entry.count >= MAX_ATTEMPTS) return true;
  entry.count++;
  return false;
}

async function shopifyPost(query, variables) {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({ query, variables }),
  });
  return res.json();
}

export async function POST(request) {
  // Rate limiting
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const email = body?.email?.trim();

  // Stricter email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email) || email.length > 254) {
    return NextResponse.json({ error: 'Valid email required.' }, { status: 400 });
  }

  try {
    const createData = await shopifyPost(
      `mutation customerCreate($input: CustomerCreateInput!) {
        customerCreate(input: $input) {
          customer { id }
          customerUserErrors { code field message }
        }
      }`,
      {
        input: {
          email,
          acceptsMarketing: true,
          password: `Nu_${Math.random().toString(36).slice(2, 14)}!`,
        },
      }
    );

    const errors = createData?.data?.customerCreate?.customerUserErrors;
    const alreadyExists = errors?.some(e => e.code === 'CUSTOMER_ALREADY_USED_EMAIL');

    if (alreadyExists) {
      return NextResponse.json({ success: true });
    }

    if (errors?.length > 0) {
      console.error('Shopify customerCreate errors:', errors);
      return NextResponse.json({ error: 'Could not subscribe. Please try again.' }, { status: 400 });
    }

    await shopifyPost(
      `mutation customerRecover($email: String!) {
        customerRecover(email: $email) {
          customerUserErrors { code field message }
        }
      }`,
      { email }
    );

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Subscribe route error:', error);
    return NextResponse.json({ error: 'Server error. Try again.' }, { status: 500 });
  }
}