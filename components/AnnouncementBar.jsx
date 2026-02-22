'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MESSAGES = [
  { text: 'Free shipping!', emoji: '🚚' },
  { text: '30-day hassle-free returns', emoji: '🌱' },
  { text: 'New arrivals added weekly', emoji: '✨' },
];

const DISMISSED_KEY = 'uu_announcement_dismissed';

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);

  // Only show if not previously dismissed
  useEffect(() => {
    const dismissed = sessionStorage.getItem(DISMISSED_KEY);
    if (!dismissed) setVisible(true);
  }, []);

  // Rotate messages every 4s
  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      setMsgIndex(i => (i + 1) % MESSAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [visible]);

  const dismiss = () => {
    sessionStorage.setItem(DISMISSED_KEY, '1');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          style={{ overflow: 'hidden', background: '#2d3a1e' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '9px 48px', position: 'relative', minHeight: 38 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={msgIndex}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35 }}
                style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, color: '#cddaa3', letterSpacing: '0.01em' }}
              >
                <span>{MESSAGES[msgIndex].emoji}</span>
                <span>{MESSAGES[msgIndex].text}</span>
              </motion.div>
            </AnimatePresence>

            {/* Dismiss button */}
            <button
              onClick={dismiss}
              aria-label="Dismiss"
              style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#7e8c6a', padding: 4, display: 'flex', alignItems: 'center', transition: 'color 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#cddaa3'}
              onMouseLeave={e => e.currentTarget.style.color = '#7e8c6a'}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}