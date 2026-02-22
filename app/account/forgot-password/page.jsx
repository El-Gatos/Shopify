'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { customerRecoverAction } from '@/app/actions';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setStatus('loading');
    try {
      const result = await customerRecoverAction(email);
      // Shopify returns success even if email doesn't exist (security best practice)
      if (result.customerUserErrors?.length > 0) {
        setError(result.customerUserErrors[0].message);
        setStatus('error');
      } else {
        setStatus('success');
      }
    } catch {
      setError('Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: '100%', maxWidth: 420 }}
      >
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#7e994e', marginBottom: 12 }}>
            Account Recovery
          </p>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#111827', margin: '0 0 12px' }}>
            Forgot Password?
          </h1>
          <p style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
            Enter your email and we'll send you a link to reset your password.
          </p>
        </div>

        <div style={{ background: 'white', borderRadius: 24, padding: '40px 36px', boxShadow: '0 4px 24px rgba(0,0,0,0.07)' }}>
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              // Success state
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                style={{ textAlign: 'center', padding: '8px 0' }}
              >
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '1.75rem' }}>
                  ✉️
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#111827', marginBottom: 10 }}>Check your inbox</h3>
                <p style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.65, marginBottom: 28 }}>
                  If an account exists for <strong style={{ color: '#374151' }}>{email}</strong>, you'll receive a password reset link shortly.
                </p>
                <p style={{ color: '#9ca3af', fontSize: 12 }}>
                  Didn't get it? Check your spam folder or{' '}
                  <button
                    onClick={() => setStatus('idle')}
                    style={{ background: 'none', border: 'none', color: '#7e994e', fontWeight: 600, cursor: 'pointer', fontSize: 12, padding: 0 }}
                  >
                    try again
                  </button>.
                </p>
              </motion.div>
            ) : (
              // Form state
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8 }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    style={{
                      width: '100%', padding: '12px 16px', borderRadius: 12,
                      border: '1.5px solid #e5e7eb', fontSize: 14, outline: 'none',
                      boxSizing: 'border-box', transition: 'border-color 0.2s',
                    }}
                    onFocus={e => e.target.style.borderColor = '#7e994e'}
                    onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>

                {status === 'error' && (
                  <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: '10px 14px', marginBottom: 20, fontSize: 13, color: '#dc2626' }}>
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  style={{
                    width: '100%', padding: '14px', borderRadius: 9999, border: 'none',
                    background: status === 'loading' ? '#d1d5db' : '#7e994e',
                    color: 'white', fontWeight: 700, fontSize: 15,
                    cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                    transition: 'background 0.2s',
                  }}
                >
                  {status === 'loading' ? 'Sending...' : 'Send Reset Link'}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        <p style={{ textAlign: 'center', marginTop: 24, fontSize: 14, color: '#6b7280' }}>
          Remember your password?{' '}
          <Link href="/account/login" style={{ color: '#7e994e', fontWeight: 600, textDecoration: 'none' }}>
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}