'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { loginAction, getCustomerAction } from '@/app/actions';
import { useAccount } from '@/components/AccountProvider';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAccount();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const result = await loginAction(form);
      if (result.customerUserErrors?.length > 0) {
        setError(result.customerUserErrors[0].message);
        return;
      }
      const token = result.customerAccessToken.accessToken;
      const customer = await getCustomerAction(token);
      login(token, customer);
      router.push('/account');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
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
            Welcome to Our Community
          </p>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#111827', margin: 0 }}>Register</h1>
        </div>

        <div style={{ background: 'white', borderRadius: 24, padding: '40px 36px', boxShadow: '0 4px 24px rgba(0,0,0,0.07)' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8 }}>Email</label>
              <input
                type="email" required
                value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                placeholder="you@example.com"
                style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1.5px solid #e5e7eb', fontSize: 14, outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                onFocus={e => e.target.style.borderColor = '#7e994e'}
                onBlur={e => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>

            <div style={{ marginBottom: 28 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8 }}>Password</label>
              <input
                type="password" required
                value={form.password}
                onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                placeholder="••••••••"
                style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1.5px solid #e5e7eb', fontSize: 14, outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                onFocus={e => e.target.style.borderColor = '#7e994e'}
                onBlur={e => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>

            {error && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: '10px 14px', marginBottom: 20, fontSize: 13, color: '#dc2626' }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%', padding: '14px', borderRadius: 9999, border: 'none',
                background: isLoading ? '#d1d5db' : '#7e994e',
                color: 'white', fontWeight: 700, fontSize: 15,
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'background 0.2s',
              }}
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: 24, fontSize: 14, color: '#6b7280' }}>
          Don't have an account?{' '}
          <Link href="/account/register" style={{ color: '#7e994e', fontWeight: 600, textDecoration: 'none' }}>
            Create one
          </Link>
        </p>
      </motion.div>
    </div>
  );
}