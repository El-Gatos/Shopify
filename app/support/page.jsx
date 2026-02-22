'use client';

import { useState } from 'react';

const shopDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;

export default function SupportPage() {
  const [orderNumber, setOrderNumber] = useState('');

  const handleTrack = () => {
    if (!orderNumber.trim()) return;
    // Strips any leading # the user might type
    const clean = orderNumber.replace(/^#/, '').trim();
    window.open(`https://${shopDomain}/account`, '_blank');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleTrack();
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold text-matcha-dark mb-12">How can we help?</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Track Order</h2>
          <p className="text-gray-600 mb-6">
            Enter your order number from your confirmation email, or log in to your account to see all your orders.
          </p>
          <input
            type="text"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Order #1234"
            className="w-full p-4 rounded-xl border border-matcha-light bg-white mb-4 focus:outline-none focus:ring-2 focus:ring-matcha-dark/30"
          />
          <button
            onClick={handleTrack}
            style={{
              background: orderNumber.trim() ? '#7e994e' : '#d1d5db',
              color: orderNumber.trim() ? 'white' : '#9ca3af',
              padding: '12px 32px',
              borderRadius: 9999,
              fontWeight: 700,
              border: 'none',
              cursor: orderNumber.trim() ? 'pointer' : 'not-allowed',
              transition: 'background 0.2s',
            }}
          >
            Track Order
          </button>
          <p className="text-xs text-gray-400 mt-3">
            You'll be taken to your Shopify account where you can view your order status.
          </p>
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