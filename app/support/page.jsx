'use client';

import Link from 'next/link';

export default function SupportPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold text-matcha-dark mb-12">How can we help?</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Track Order</h2>
          <p className="text-gray-600 mb-6">
            Log in to your account to view your complete order history and track current shipments.
          </p>
          
          <Link
            href="/account"
            style={{
              display: 'inline-block',
              background: '#7e994e',
              color: 'white',
              padding: '12px 32px',
              borderRadius: 9999,
              fontWeight: 700,
              textDecoration: 'none',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#657a3e'}
            onMouseLeave={e => e.currentTarget.style.background = '#7e994e'}
          >
            Log in to your Account
          </Link>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Contact Us</h2>
          <p className="text-gray-600 mb-2">Email: urbanutensil@outlook.com</p>
          <p className="text-gray-600">Hours: Mon–Fri, 9am–5pm PST</p>
        </div>
      </div>
    </div>
  );
}