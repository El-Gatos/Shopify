'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Floating utensil shapes for background decoration
const UTENSILS = ['🍴', '🥄', '🔪', '🫕', '🥘', '🍳'];

function FloatingUtensil({ emoji, style }) {
  return (
    <motion.div
      animate={{ y: [0, -18, 0], rotate: [0, 8, -8, 0] }}
      transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, ease: 'easeInOut' }}
      style={{ position: 'absolute', fontSize: '2rem', opacity: 0.12, pointerEvents: 'none', ...style }}
    >
      {emoji}
    </motion.div>
  );
}

export default function NotFound() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div style={{
      minHeight: '100vh', background: '#2d3a1e',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden', padding: '40px 24px',
    }}>

      {/* Decorative background circles */}
      <div style={{ position: 'absolute', top: -120, left: -120, width: 400, height: 400, borderRadius: '50%', background: 'rgba(205,218,163,0.06)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -80, right: -80, width: 300, height: 300, borderRadius: '50%', background: 'rgba(205,218,163,0.06)', pointerEvents: 'none' }} />

      {/* Floating utensils — only after mount to avoid hydration mismatch */}
      {mounted && (
        <>
          <FloatingUtensil emoji="🍴" style={{ top: '12%', left: '8%' }} />
          <FloatingUtensil emoji="🥄" style={{ top: '20%', right: '10%' }} />
          <FloatingUtensil emoji="🔪" style={{ bottom: '25%', left: '6%' }} />
          <FloatingUtensil emoji="🫕" style={{ bottom: '15%', right: '8%' }} />
          <FloatingUtensil emoji="🍳" style={{ top: '55%', left: '14%' }} />
          <FloatingUtensil emoji="🥘" style={{ top: '40%', right: '5%' }} />
        </>
      )}

      {/* Main content */}
      <div style={{ textAlign: 'center', maxWidth: 560, position: 'relative', zIndex: 1 }}>

        {/* Big 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={{ position: 'relative', display: 'inline-block', marginBottom: 24 }}>
            <span style={{
              fontSize: 'clamp(6rem, 20vw, 10rem)',
              fontWeight: 900,
              color: 'transparent',
              WebkitTextStroke: '2px rgba(205,218,163,0.25)',
              letterSpacing: '-0.04em',
              lineHeight: 1,
              display: 'block',
              userSelect: 'none',
            }}>
              404
            </span>
            {/* Knife through the 0 */}
            <motion.div
              initial={{ rotate: -20, opacity: 0, y: 10 }}
              animate={{ rotate: -35, opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '4rem', lineHeight: 1 }}
            >
              🔪
            </motion.div>
          </div>
        </motion.div>

        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#7e994e', marginBottom: 20 }}
        >
          Oops — nothing to cook here
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 800, color: '#f5f7f0', lineHeight: 1.2, marginBottom: 16, letterSpacing: '-0.02em' }}
        >
          This page has left the kitchen.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{ color: '#9aaa82', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: 48 }}
        >
          The page you're looking for doesn't exist or may have moved.
          Let's get you back to something good.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <Link
            href="/shop"
            style={{
              display: 'inline-block',
              background: '#cddaa3',
              color: '#2d3a1e',
              fontWeight: 700,
              fontSize: '0.95rem',
              padding: '14px 36px',
              borderRadius: 9999,
              textDecoration: 'none',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#f5f7f0'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#cddaa3'; }}
          >
            Shop the Collection
          </Link>
          <Link
            href="/"
            style={{
              display: 'inline-block',
              border: '1.5px solid rgba(205,218,163,0.4)',
              color: '#cddaa3',
              fontWeight: 600,
              fontSize: '0.95rem',
              padding: '14px 36px',
              borderRadius: 9999,
              textDecoration: 'none',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#cddaa3'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(205,218,163,0.4)'; }}
          >
            Go Home
          </Link>
        </motion.div>

      </div>
    </div>
  );
}