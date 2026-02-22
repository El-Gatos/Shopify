'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const values = [
  { icon: '✦', title: 'Intentional Design', description: 'Every product in our collection is chosen with purpose. We look for tools that balance form and function without compromise.' },
  { icon: '◈', title: 'Built to Last', description: 'We carry tools made from quality materials — solid woods, food-grade steel, and durable ceramics that age well and perform consistently.' },
  { icon: '❋', title: 'Curated, Not Cluttered', description: 'Our range is intentionally small. We would rather offer thirty exceptional tools than three hundred forgettable ones.' },
];

const stats = [
  { number: '500+', label: 'Happy Customers' },
  { number: '30+', label: 'Curated Products' },
  { number: '2', label: 'Years in Business' },
  { number: '100%', label: 'Satisfaction Guarantee' },
];

export default function AboutPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 640);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <div style={{ background: '#fdfdfc' }}>

      {/* Hero */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: isMobile ? '56px 24px' : '96px 40px', textAlign: 'center' }}>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#7e994e', marginBottom: 20 }}>
          Our Story
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
          style={{ fontSize: isMobile ? '2rem' : 'clamp(2.5rem, 5vw, 3.75rem)', fontWeight: 800, color: '#111827', lineHeight: 1.15, marginBottom: 24, letterSpacing: '-0.02em' }}>
          We believe your kitchen{' '}
          <span style={{ color: '#7e994e' }}>deserves better.</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
          style={{ fontSize: '1.1rem', color: '#4b5563', maxWidth: 600, margin: '0 auto', lineHeight: 1.75 }}>
          Urban Utensil exists for people who care about how their kitchen looks and feels.
          We bring together tools that are worth having — and worth keeping out on the counter.
        </motion.p>
      </section>

      {/* Stats */}
      <section style={{ background: '#f1f5e9', padding: isMobile ? '48px 24px' : '72px 40px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: isMobile ? '32px 16px' : 40, textAlign: 'center' }}>
          {stats.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
              <p style={{ fontSize: isMobile ? '2rem' : '2.5rem', fontWeight: 800, color: '#7e994e', marginBottom: 8 }}>{stat.number}</p>
              <p style={{ fontSize: '0.85rem', color: '#4b5563', fontWeight: 500 }}>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: isMobile ? '56px 24px' : '96px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 40 : 80, alignItems: 'center' }}>
          <motion.div initial={{ opacity: 0, x: isMobile ? 0 : -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#7e994e', marginBottom: 16 }}>What We're About</p>
            <h2 style={{ fontSize: isMobile ? '1.6rem' : '2.25rem', fontWeight: 800, color: '#111827', lineHeight: 1.2, marginBottom: 20 }}>
              A kitchen worth spending time in.
            </h2>
            <p style={{ color: '#4b5563', lineHeight: 1.8, marginBottom: 16 }}>
              Most kitchen tools are designed to be hidden away. We focus on pieces that deserve to be seen — things you reach for every morning, every meal, every gathering.
            </p>
            <p style={{ color: '#4b5563', lineHeight: 1.8 }}>
              Good design should not cost a fortune or require a lifestyle overhaul. Our collection makes it easy to build a kitchen that feels intentional.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: isMobile ? 0 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div style={{ background: '#f1f5e9', borderRadius: 24, padding: isMobile ? '36px 28px' : '56px 48px', textAlign: 'center' }}>
              <p style={{ fontSize: '3rem', marginBottom: 20 }}>🌿</p>
              <blockquote style={{ fontSize: '1.05rem', fontWeight: 500, color: '#7e994e', lineHeight: 1.7, fontStyle: 'italic' }}>
                "A well-equipped kitchen is not a luxury — it is an investment in how you live."
              </blockquote>
              <p style={{ fontSize: '0.875rem', color: '#9ca3af', marginTop: 12, fontWeight: 500 }}>— Urban Utensil</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section style={{ background: '#f1f5e9', padding: isMobile ? '56px 24px' : '96px 40px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: isMobile ? 40 : 64 }}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#7e994e', marginBottom: 16 }}>What We Stand For</p>
            <h2 style={{ fontSize: isMobile ? '1.8rem' : '2.5rem', fontWeight: 800, color: '#111827' }}>Our Values</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 20 }}>
            {values.map((value, i) => (
              <motion.div key={value.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
                style={{ background: 'white', borderRadius: 20, padding: '32px 28px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                <span style={{ fontSize: '1.75rem', color: '#7e994e', display: 'block', marginBottom: 16 }}>{value.icon}</span>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#111827', marginBottom: 10 }}>{value.title}</h3>
                <p style={{ color: '#4b5563', lineHeight: 1.7, fontSize: '0.9rem' }}>{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ maxWidth: 700, margin: '0 auto', padding: isMobile ? '64px 24px' : '96px 40px', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <h2 style={{ fontSize: isMobile ? '1.8rem' : '2.5rem', fontWeight: 800, color: '#111827', marginBottom: 16 }}>Ready to upgrade your kitchen?</h2>
          <p style={{ color: '#4b5563', fontSize: '1.05rem', lineHeight: 1.75, marginBottom: 36 }}>Browse our full collection of thoughtfully chosen kitchen essentials.</p>
          <Link href="/shop" style={{ display: 'inline-block', background: '#7e994e', color: 'white', fontWeight: 700, fontSize: '1rem', padding: '16px 48px', borderRadius: 9999, textDecoration: 'none', boxShadow: '0 4px 14px rgba(126,153,78,0.3)' }}>
            Shop the Collection
          </Link>
        </motion.div>
      </section>

    </div>
  );
}