'use client';

import { useState } from 'react';
import ProductImageGallery from './ProductImageGallery';
import VariantPicker from './VariantPicker';
import AddToCartButton from './AddToCartButton';

// ── Payment logos ─────────────────────────────────────────────────────────────
// Visa, Mastercard, Amex, PayPal → reliable CDN
// Apple Pay, Google Pay, Shop Pay → inline SVG (CDN paths unreliable for these)

const CDN = 'https://cdn.jsdelivr.net/npm/payment-icons@1.1.0/min/flat';

function ApplePayLogo() {
  return (
    <svg viewBox="0 0 38 24" width="38" height="24" xmlns="http://www.w3.org/2000/svg" aria-label="Apple Pay">
      <rect width="38" height="24" rx="4" fill="#000"/>
      {/* Apple logo mark */}
      <path d="M13.5 7.8c.5-.6.8-1.4.7-2.2-.7.1-1.6.5-2.1 1.1-.5.5-.8 1.3-.7 2.1.8 0 1.6-.4 2.1-1z" fill="white"/>
      <path d="M14.2 9c-1.2-.1-2.2.7-2.7.7-.5 0-1.4-.6-2.3-.6-1.2 0-2.3.7-2.9 1.8-1.2 2.1-.3 5.2.9 6.9.6.9 1.3 1.8 2.2 1.8.9 0 1.2-.6 2.3-.6 1.1 0 1.4.6 2.3.6.9 0 1.5-.8 2.1-1.7.7-1 .9-1.9.9-2-.1 0-1.8-.7-1.8-2.7 0-1.7 1.4-2.5 1.4-2.5-.8-1.1-2-1.7-2.4-1.7z" fill="white"/>
      {/* Pay text */}
      <text x="19.5" y="15.5" fontFamily="-apple-system, Helvetica, Arial" fontWeight="600" fontSize="8" fill="white">Pay</text>
    </svg>
  );
}

function GooglePayLogo() {
  return (
    <svg viewBox="0 0 38 24" width="38" height="24" xmlns="http://www.w3.org/2000/svg" aria-label="Google Pay">
      <rect width="38" height="24" rx="4" fill="white" stroke="#E8EAED" strokeWidth="0.5"/>
      {/* G mark */}
      <path d="M10.3 12c0-.4 0-.7-.1-1H7v1.9h1.8c-.1.5-.4.9-.8 1.1v.9h1.3c.8-.7 1-1.8 1-2.9z" fill="#4285F4"/>
      <path d="M7 16.5c1.2 0 2.3-.4 3-.1l-1.3-.9c-.4.3-1 .4-1.7.4-1.3 0-2.4-.9-2.8-2h-1.3v1c.7 1.4 2.3 2.4 4.1 2.4z" fill="#34A853"/>
      <path d="M4.2 13.9c-.1-.3-.2-.6-.2-1s.1-.7.2-1V11H2.9C2.3 12 2 13 2 14s.3 2 .9 2.9l1.3-1z" fill="#FBBC05"/>
      <path d="M7 10.9c.7 0 1.4.3 1.9.7l1.4-1.4C9.3 9.4 8.2 9 7 9 5.2 9 3.6 10 2.9 11.5l1.3 1c.4-1.1 1.5-1.6 2.8-1.6z" fill="#EA4335"/>
      {/* Pay text */}
      <text x="14" y="15.5" fontFamily="Helvetica, Arial" fontWeight="500" fontSize="7.5" fill="#3C4043">Pay</text>
    </svg>
  );
}

function ShopPayLogo() {
  return (
    <svg viewBox="0 0 38 24" width="38" height="24" xmlns="http://www.w3.org/2000/svg" aria-label="Shop Pay">
      <rect width="38" height="24" rx="4" fill="#5A31F4"/>
      <text x="5" y="13" fontFamily="Helvetica, Arial" fontWeight="700" fontSize="7" fill="white" letterSpacing="-.1">Shop</text>
      <text x="5" y="21" fontFamily="Helvetica, Arial" fontWeight="700" fontSize="7" fill="white" letterSpacing="-.1">Pay</text>
      {/* Small checkmark accent */}
      <path d="M31 8 L33 11 L37 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.7"/>
    </svg>
  );
}

const PAYMENT_METHODS = [
  { id: 'visa',       type: 'img',  src: `${CDN}/visa.svg`,       label: 'Visa' },
  { id: 'mastercard', type: 'img',  src: `${CDN}/mastercard.svg`, label: 'Mastercard' },
  { id: 'amex',       type: 'img',  src: `${CDN}/amex.svg`,       label: 'American Express' },
  { id: 'paypal',     type: 'img',  src: `${CDN}/paypal.svg`,     label: 'PayPal' },
  { id: 'apple-pay',  type: 'svg',  Svg: ApplePayLogo,            label: 'Apple Pay' },
  { id: 'google-pay', type: 'svg',  Svg: GooglePayLogo,           label: 'Google Pay' },
  { id: 'shop-pay',   type: 'svg',  Svg: ShopPayLogo,             label: 'Shop Pay' },
];

// ── Main component ────────────────────────────────────────────────────────────

export default function ProductPageClient({ product }) {
  const images = product.images.edges.map(e => e.node);
  const variants = product.variants.edges.map(e => e.node);
  const options = product.options || [];

  const [selectedVariant, setSelectedVariant] = useState(variants[0] ?? null);

  const price = selectedVariant
    ? parseFloat(selectedVariant.price.amount).toFixed(2)
    : parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2);

  const compareAtPrice = selectedVariant?.compareAtPrice
    ? parseFloat(selectedVariant.compareAtPrice.amount).toFixed(2)
    : null;

  const isOnSale = compareAtPrice && parseFloat(compareAtPrice) > parseFloat(price);

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px 96px' }}>

      {/* Breadcrumb */}
      <p style={{ fontSize: 12, color: '#9ca3af', marginBottom: 40 }}>
        <a href="/" style={{ color: '#9ca3af', textDecoration: 'none' }}>Home</a>
        {' / '}
        <a href="/shop" style={{ color: '#9ca3af', textDecoration: 'none' }}>Shop</a>
        {' / '}
        <span style={{ color: '#374151' }}>{product.title}</span>
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px 64px', alignItems: 'start' }}>

        {/* Left — Image gallery */}
        <ProductImageGallery images={images} />

        {/* Right — Details */}
        <div>
          <h1 style={{
            fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
            fontWeight: 800,
            color: '#111827',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            marginBottom: 16,
          }}>
            {product.title}
          </h1>

          {/* Price row */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 28 }}>
            <span style={{ fontSize: '1.6rem', fontWeight: 800, color: isOnSale ? '#dc2626' : '#7e994e' }}>
              ${price}
            </span>
            {isOnSale && (
              <>
                <span style={{ fontSize: '1rem', fontWeight: 500, color: '#9ca3af', textDecoration: 'line-through' }}>
                  ${compareAtPrice}
                </span>
                <span style={{ fontSize: 11, fontWeight: 700, background: '#fef2f2', color: '#dc2626', padding: '3px 8px', borderRadius: 6, letterSpacing: '0.05em' }}>
                  SALE
                </span>
              </>
            )}
          </div>

          {/* Variant dropdowns */}
          <VariantPicker
            options={options}
            variants={variants}
            selectedVariant={selectedVariant}
            onChange={setSelectedVariant}
          />

          {/* Stock indicator */}
          {selectedVariant && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 20 }}>
              <div style={{
                width: 7, height: 7, borderRadius: '50%',
                background: selectedVariant.availableForSale ? '#22c55e' : '#d1d5db',
                boxShadow: selectedVariant.availableForSale ? '0 0 0 2px rgba(34,197,94,0.2)' : 'none',
              }} />
              <span style={{ fontSize: 13, color: selectedVariant.availableForSale ? '#15803d' : '#9ca3af', fontWeight: 500 }}>
                {selectedVariant.availableForSale ? 'In stock · ready to ship' : 'Out of stock'}
              </span>
            </div>
          )}

          {/* Add to cart */}
          <AddToCartButton variantId={selectedVariant?.id} price={price} />

          {/* Payment methods */}
          <div style={{ marginTop: 20, padding: '16px 0', borderTop: '1px solid #f1f5e9', borderBottom: '1px solid #f1f5e9' }}>
            <p style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#9ca3af',
              marginBottom: 10,
              textAlign: 'center',
            }}>
              Secure checkout
            </p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
              {PAYMENT_METHODS.map(({ id, type, src, Svg, label }) => (
                <div
                  key={id}
                  title={label}
                  style={{
                    borderRadius: 5,
                    overflow: 'hidden',
                    border: '1px solid #e8eedc',
                    lineHeight: 0,
                    flexShrink: 0,
                    width: 38,
                    height: 24,
                    background: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {type === 'svg' ? (
                    <Svg />
                  ) : (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={src} alt={label} width={38} height={24} style={{ display: 'block', objectFit: 'contain' }} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Trust badges */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9, margin: '20px 0 28px' }}>
            {[
              { icon: '🚚', text: 'Free shipping on orders over $50' },
              { icon: '🔄', text: '30-day hassle-free returns' },
              { icon: '🔒', text: 'Encrypted & secure payment' },
            ].map(({ icon, text }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                <span style={{ fontSize: '0.9rem' }}>{icon}</span>
                <span style={{ fontSize: 13, color: '#6b7280' }}>{text}</span>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid #f1f5e9', paddingTop: 28 }}>
            <div
              style={{ color: '#4b5563', lineHeight: 1.8, fontSize: '0.95rem' }}
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}