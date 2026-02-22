'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductGallery({ images }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  if (!images?.length) return (
    <div style={{ aspectRatio: '1', background: '#f1f5e9', borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', fontSize: 14 }}>
      No image
    </div>
  );

  const goTo = (index) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const prev = () => goTo(activeIndex === 0 ? images.length - 1 : activeIndex - 1);
  const next = () => goTo(activeIndex === images.length - 1 ? 0 : activeIndex + 1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Main image */}
      <div style={{ position: 'relative', aspectRatio: '1', background: '#f8faf4', borderRadius: 24, overflow: 'hidden' }}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeIndex}
            custom={direction}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <Image
              src={images[activeIndex].url}
              alt={images[activeIndex].altText || 'Product image'}
              fill
              style={{ objectFit: 'contain', padding: 32 }}
              priority={activeIndex === 0}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Prev / Next arrows — only show if >1 image */}
        {images.length > 1 && (
          <>
            <button onClick={prev} aria-label="Previous image" style={arrowStyle('left')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button onClick={next} aria-label="Next image" style={arrowStyle('right')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </>
        )}

        {/* Dot indicators for mobile */}
        {images.length > 1 && (
          <div style={{ position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6 }}>
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                style={{ width: i === activeIndex ? 20 : 6, height: 6, borderRadius: 9999, background: i === activeIndex ? '#7e994e' : 'rgba(0,0,0,0.2)', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.2s' }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnail strip — only show if >1 image */}
      {images.length > 1 && (
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                flexShrink: 0, width: 72, height: 72, borderRadius: 12, overflow: 'hidden',
                border: `2px solid ${i === activeIndex ? '#7e994e' : '#e8eedc'}`,
                background: '#f8faf4', padding: 0, cursor: 'pointer',
                transition: 'border-color 0.15s',
                position: 'relative',
              }}
            >
              <Image
                src={img.url}
                alt={img.altText || `View ${i + 1}`}
                fill
                style={{ objectFit: 'contain', padding: 6 }}
                sizes="72px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const arrowStyle = (side) => ({
  position: 'absolute', top: '50%', transform: 'translateY(-50%)',
  [side]: 14,
  width: 36, height: 36, borderRadius: '50%',
  background: 'rgba(255,255,255,0.9)', border: '1px solid #e8eedc',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer', color: '#374151',
  backdropFilter: 'blur(4px)',
  transition: 'background 0.15s',
  zIndex: 2,
});