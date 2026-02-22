// components/Footer.jsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Social Icon SVGs (inline so no extra deps needed) ───────────────────────
function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none"/>
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.3 6.3 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9a8.19 8.19 0 0 0 4.78 1.52V7.07a4.85 4.85 0 0 1-1.02-.38z"/>
    </svg>
  );
}

function PinterestIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
    </svg>
  );
}
// ─────────────────────────────────────────────────────────────────────────────

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || 'Something went wrong.');
        setStatus('error');
      } else {
        setStatus('success');
        setEmail('');
      }
    } catch {
      setErrorMsg('Network error. Please try again.');
      setStatus('error');
    }
  };

  const navLinks = [
    { href: '/shop', label: 'Shop All' },
    { href: '/about', label: 'About' },
    { href: '/support', label: 'Orders & Support' },
  ];

  const socials = [
    { href: 'https://instagram.com', label: 'Instagram', Icon: InstagramIcon },
    { href: 'https://tiktok.com', label: 'TikTok', Icon: TikTokIcon },
    { href: 'https://pinterest.com', label: 'Pinterest', Icon: PinterestIcon },
  ];

  return (
    <footer className="bg-matcha-light border-t border-matcha/40 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-16">

        {/* Top section: Email signup + Nav */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 mb-14">

          {/* Email Signup */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-matcha-dark mb-3">
              Stay in the loop
            </p>
            <h3 className="text-2xl font-bold text-gray-900 mb-2 leading-snug">
              New drops. No spam.
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Join the list for early access to restocks and new collections.
            </p>

            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                disabled={status === 'loading' || status === 'success'}
                className="flex-1 bg-white border border-matcha/50 rounded-full px-5 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-matcha-dark/30 disabled:opacity-60 transition"
              />
              <motion.button
                whileTap={{ scale: 0.96 }}
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className={`px-6 py-3 rounded-full text-sm font-semibold shadow-sm transition-colors
                  ${status === 'success'
                    ? 'bg-matcha text-matcha-dark cursor-default'
                    : 'bg-matcha-dark text-white hover:bg-gray-900 disabled:opacity-60'
                  }`}
              >
                {status === 'loading' ? '...' : status === 'success' ? '✓ Done' : 'Subscribe'}
              </motion.button>
            </form>

            {/* Feedback messages */}
            <AnimatePresence mode="wait">
              {status === 'success' && (
                <motion.p
                  key="success"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-3 text-sm text-matcha-dark font-medium"
                >
                  🌿 You're in! We'll be in touch.
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p
                  key="error"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-3 text-sm text-red-500"
                >
                  {errorMsg}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Nav Links + Socials */}
          <div className="flex flex-col justify-between gap-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-matcha-dark mb-4">
                Explore
              </p>
              <ul className="flex flex-col gap-3">
                {navLinks.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-gray-700 hover:text-matcha-dark font-medium transition-colors text-sm"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Socials */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-matcha-dark mb-4">
                Follow Along
              </p>
              <div className="flex gap-4">
                {socials.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 rounded-full bg-white border border-matcha/40 flex items-center justify-center text-matcha-dark hover:bg-matcha-dark hover:text-white hover:border-matcha-dark transition-colors shadow-sm"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-matcha/30 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <span>© {new Date().getFullYear()} Urban Utensil. All rights reserved.</span>
          <span className="italic">Made for kitchens that actually look good.</span>
        </div>

      </div>
    </footer>
  );
}