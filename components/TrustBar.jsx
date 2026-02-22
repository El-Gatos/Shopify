'use client';

import { motion } from 'framer-motion';

const items = [
  { icon: '🚚', label: 'Free Shipping', sub: 'On orders over $50' },
  { icon: '🌱', label: '30-Day Returns', sub: 'No questions asked' },
  { icon: '✦', label: 'Curated Quality', sub: 'Every piece hand-selected' },
  { icon: '🔒', label: 'Secure Checkout', sub: 'Powered by Shopify' },
];

export default function TrustBar() {
  return (
    <section style={{ background: '#2d3a1e', padding: '20px 40px' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center' }}
          >
            <span style={{ fontSize: '1.4rem' }}>{item.icon}</span>
            <div>
              <p style={{ color: '#cddaa3', fontWeight: 700, fontSize: '0.85rem', margin: 0 }}>{item.label}</p>
              <p style={{ color: '#7e8c6a', fontSize: '0.75rem', margin: 0 }}>{item.sub}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}