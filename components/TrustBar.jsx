'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const items = [
  { icon: '🚚', label: 'Free Shipping', sub: 'On orders over $50' },
  { icon: '🌱', label: '30-Day Returns', sub: 'No questions asked' },
  { icon: '✦', label: 'Curated Quality', sub: 'Every piece hand-selected' },
  { icon: '🔒', label: 'Secure Checkout', sub: 'Powered by Shopify' },
];

export default function TrustBar() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 640);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <section style={{ background: '#2d3a1e', padding: isMobile ? '24px 20px' : '20px 40px' }}>
      <div style={{
        maxWidth: 1000, margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
        gap: isMobile ? '20px 16px' : 16,
      }}>
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            style={{ display: 'flex', alignItems: 'center', gap: 10 }}
          >
            <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{item.icon}</span>
            <div>
              <p style={{ color: '#cddaa3', fontWeight: 700, fontSize: '0.82rem', margin: 0 }}>{item.label}</p>
              <p style={{ color: '#7e8c6a', fontSize: '0.72rem', margin: 0 }}>{item.sub}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}