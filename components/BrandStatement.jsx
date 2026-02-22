'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function BrandStatement() {
  return (
    <section style={{ background: '#2d3a1e', padding: '120px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>

      <div style={{ position: 'absolute', top: -80, left: -80, width: 320, height: 320, borderRadius: '50%', background: 'rgba(205,218,163,0.06)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -60, right: -60, width: 240, height: 240, borderRadius: '50%', background: 'rgba(205,218,163,0.06)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 780, margin: '0 auto', position: 'relative' }}>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#7e994e', marginBottom: 24 }}
        >
          Our Philosophy
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            fontWeight: 800,
            color: '#f5f7f0',
            lineHeight: 1.2,
            marginBottom: 32,
            letterSpacing: '-0.02em',
          }}
        >
          Your kitchen is the most-used room in your home.{' '}
          <span style={{ color: '#cddaa3' }}>It should feel that way.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 }}
          style={{ fontSize: '1.15rem', color: '#9aaa82', lineHeight: 1.8, marginBottom: 48 }}
        >
          The tools you use every day should bring quiet satisfaction —
          not just get the job done. Every item in our collection earns its place on your counter.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <Link
            href="/about"
            style={{
              display: 'inline-block',
              border: '2px solid #cddaa3',
              color: '#cddaa3',
              fontWeight: 700,
              fontSize: '0.95rem',
              padding: '16px 48px',
              borderRadius: 9999,
              textDecoration: 'none',
              letterSpacing: '0.02em',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#cddaa3'; e.currentTarget.style.color = '#2d3a1e'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#cddaa3'; }}
          >
            Our Story
          </Link>
        </motion.div>
      </div>
    </section>
  );
}