'use client';

import { motion } from 'framer-motion';

const features = [
  {
    number: '01',
    title: 'Designed for Real Kitchens',
    description: 'Everything we carry holds up to daily use. These are tools made for cooking, not for sitting in a drawer.',
  },
  {
    number: '02',
    title: 'Aesthetic Without Compromise',
    description: 'Looking good and working well are not a trade-off. Every piece earns its place on your counter.',
  },
  {
    number: '03',
    title: 'A Smaller, Better Collection',
    description: 'We keep our range tight on purpose. Fewer choices, all excellent — less time deciding, more time cooking.',
  },
];

export default function FeatureSection() {
  return (
    <section style={{ background: '#fdfdfc', padding: '112px 40px' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 80 }}
        >
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#7e994e', marginBottom: 16 }}>
            Why Urban Utensil
          </p>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#111827', lineHeight: 1.15, letterSpacing: '-0.02em', maxWidth: 520, margin: 0 }}>
            The difference is in the details.
          </h2>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {features.map((feature, i) => (
            <motion.div
              key={feature.number}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              style={{
                display: 'grid',
                gridTemplateColumns: '80px 1fr 1fr',
                gap: 48,
                alignItems: 'center',
                padding: '48px 0',
                borderTop: '1px solid #e8eedc',
              }}
            >
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#cddaa3', letterSpacing: '0.1em' }}>
                {feature.number}
              </span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: 0, lineHeight: 1.3 }}>
                {feature.title}
              </h3>
              <p style={{ color: '#6b7280', lineHeight: 1.75, margin: 0, fontSize: '0.95rem' }}>
                {feature.description}
              </p>
            </motion.div>
          ))}
          <div style={{ borderTop: '1px solid #e8eedc' }} />
        </div>

      </div>
    </section>
  );
}