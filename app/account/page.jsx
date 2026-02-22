'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccount } from '@/components/AccountProvider';
import { updateCustomerAction, logoutAction, getCustomerOrdersAction } from '@/app/actions';

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function StatusBadge({ status, type }) {
  // type: 'financial' | 'fulfillment'
  const map = {
    // financial
    PAID:       { label: 'Paid',        bg: '#f0fdf4', color: '#16a34a' },
    PENDING:    { label: 'Pending',     bg: '#fffbeb', color: '#d97706' },
    REFUNDED:   { label: 'Refunded',    bg: '#fef2f2', color: '#dc2626' },
    PARTIALLY_REFUNDED: { label: 'Part. Refunded', bg: '#fef2f2', color: '#dc2626' },
    VOIDED:     { label: 'Voided',      bg: '#f9fafb', color: '#6b7280' },
    // fulfillment
    FULFILLED:  { label: 'Delivered',   bg: '#f0fdf4', color: '#16a34a' },
    UNFULFILLED:{ label: 'Processing',  bg: '#eff6ff', color: '#2563eb' },
    PARTIAL:    { label: 'Partially Shipped', bg: '#fffbeb', color: '#d97706' },
    RESTOCKED:  { label: 'Restocked',   bg: '#f9fafb', color: '#6b7280' },
    IN_PROGRESS:{ label: 'In Progress', bg: '#eff6ff', color: '#2563eb' },
    ON_HOLD:    { label: 'On Hold',     bg: '#fffbeb', color: '#d97706' },
    SCHEDULED:  { label: 'Scheduled',   bg: '#f5f3ff', color: '#7c3aed' },
  };
  const s = map[status] || { label: status, bg: '#f9fafb', color: '#6b7280' };
  return (
    <span style={{ background: s.bg, color: s.color, fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 9999, letterSpacing: '0.03em' }}>
      {s.label}
    </span>
  );
}

function OrderCard({ order }) {
  const [expanded, setExpanded] = useState(false);
  const items = order.lineItems.edges.map(e => e.node);
  const total = parseFloat(order.currentTotalPrice.amount).toFixed(2);
  const currency = order.currentTotalPrice.currencyCode;

  return (
    <motion.div
      layout
      style={{ background: 'white', borderRadius: 20, overflow: 'hidden', boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}
    >
      {/* Order header row */}
      <button
        onClick={() => setExpanded(p => !p)}
        style={{ width: '100%', padding: '20px 24px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <div>
              <p style={{ margin: 0, fontWeight: 700, color: '#111827', fontSize: 15 }}>Order #{order.orderNumber}</p>
              <p style={{ margin: '2px 0 0', fontSize: 12, color: '#9ca3af' }}>{formatDate(order.processedAt)}</p>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <StatusBadge status={order.financialStatus} type="financial" />
              <StatusBadge status={order.fulfillmentStatus} type="fulfillment" />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontWeight: 700, color: '#7e994e', fontSize: 15 }}>{currency} ${total}</span>
            <motion.svg
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </motion.svg>
          </div>
        </div>

        {/* Tiny product image strip — always visible */}
        <div style={{ display: 'flex', gap: 6, marginTop: 14 }}>
          {items.slice(0, 4).map((item, i) => (
            <div key={i} style={{ width: 40, height: 40, borderRadius: 8, background: '#f1f5e9', overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
              {item.variant?.image?.url
                ? <Image src={item.variant.image.url} alt={item.title} fill style={{ objectFit: 'contain', padding: 4 }} />
                : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>📦</div>
              }
            </div>
          ))}
          {items.length > 4 && (
            <div style={{ width: 40, height: 40, borderRadius: 8, background: '#f1f5e9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#9ca3af' }}>
              +{items.length - 4}
            </div>
          )}
        </div>
      </button>

      {/* Expanded line items */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="items"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ borderTop: '1px solid #f3f4f6', padding: '16px 24px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {items.map((item, i) => {
                const itemPrice = item.variant?.price?.amount
                  ? `${currency} $${(parseFloat(item.variant.price.amount) * item.quantity).toFixed(2)}`
                  : null;
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ width: 52, height: 52, borderRadius: 10, background: '#f1f5e9', flexShrink: 0, overflow: 'hidden', position: 'relative' }}>
                      {item.variant?.image?.url
                        ? <Image src={item.variant.image.url} alt={item.title} fill style={{ objectFit: 'contain', padding: 6 }} />
                        : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>📦</div>
                      }
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ margin: 0, fontWeight: 600, color: '#111827', fontSize: 13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</p>
                      <p style={{ margin: '2px 0 0', fontSize: 12, color: '#9ca3af' }}>Qty {item.quantity}</p>
                    </div>
                    {itemPrice && <span style={{ fontSize: 13, fontWeight: 600, color: '#7e994e', flexShrink: 0 }}>{itemPrice}</span>}
                  </div>
                );
              })}

              {/* Order total row */}
              <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>Order Total</span>
                <span style={{ fontSize: 15, fontWeight: 800, color: '#111827' }}>{currency} ${total}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Main account page ─────────────────────────────────────────────────────────

const TABS = [
  { key: 'orders',   label: 'Order History' },
  { key: 'profile',  label: 'Profile' },
  { key: 'password', label: 'Password' },
];

export default function AccountPage() {
  const router = useRouter();
  const { customer, accessToken, isLoading, logout, refreshCustomer } = useAccount();

  const [activeTab, setActiveTab] = useState('orders');
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '' });
  const [passwordForm, setPasswordForm] = useState({ password: '', confirm: '' });
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');
  const [saveError, setSaveError] = useState('');

  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && !customer) router.push('/account/login');
  }, [isLoading, customer, router]);

  useEffect(() => {
    if (customer) {
      setForm({ firstName: customer.firstName || '', lastName: customer.lastName || '', email: customer.email || '', phone: customer.phone || '' });
    }
  }, [customer]);

  // Load orders once we have a token
  useEffect(() => {
    if (!accessToken) return;
    setOrdersLoading(true);
    getCustomerOrdersAction(accessToken).then(o => {
      setOrders(o);
      setOrdersLoading(false);
    });
  }, [accessToken]);

  const handleLogout = async () => {
    if (accessToken) await logoutAction(accessToken);
    logout();
    router.push('/');
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsSaving(true); setSaveStatus(''); setSaveError('');
    try {
      const result = await updateCustomerAction(accessToken, { firstName: form.firstName, lastName: form.lastName, email: form.email, phone: form.phone || undefined });
      if (result.customerUserErrors?.length > 0) { setSaveError(result.customerUserErrors[0].message); setSaveStatus('error'); }
      else { await refreshCustomer(); setSaveStatus('success'); setTimeout(() => setSaveStatus(''), 3000); }
    } catch { setSaveError('Something went wrong.'); setSaveStatus('error'); }
    finally { setIsSaving(false); }
  };

  const handleSavePassword = async (e) => {
    e.preventDefault();
    if (passwordForm.password !== passwordForm.confirm) { setSaveError('Passwords do not match.'); setSaveStatus('error'); return; }
    if (passwordForm.password.length < 5) { setSaveError('Password must be at least 5 characters.'); setSaveStatus('error'); return; }
    setIsSaving(true); setSaveStatus(''); setSaveError('');
    try {
      const result = await updateCustomerAction(accessToken, { password: passwordForm.password });
      if (result.customerUserErrors?.length > 0) { setSaveError(result.customerUserErrors[0].message); setSaveStatus('error'); }
      else { setPasswordForm({ password: '', confirm: '' }); setSaveStatus('success'); setTimeout(() => setSaveStatus(''), 3000); }
    } catch { setSaveError('Something went wrong.'); setSaveStatus('error'); }
    finally { setIsSaving(false); }
  };

  if (isLoading || !customer) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 40, height: 40, borderRadius: '50%', border: '3px solid #f1f5e9', borderTopColor: '#7e994e', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const inputStyle = { width: '100%', padding: '12px 16px', borderRadius: 12, border: '1.5px solid #e5e7eb', fontSize: 14, outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s', background: 'white' };

  const feedbackBox = (
    <>
      {saveStatus === 'success' && (
        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 10, padding: '10px 14px', marginBottom: 20, fontSize: 13, color: '#16a34a', fontWeight: 500 }}>
          ✓ {activeTab === 'password' ? 'Password updated' : 'Profile updated'} successfully
        </div>
      )}
      {saveStatus === 'error' && (
        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: '10px 14px', marginBottom: 20, fontSize: 13, color: '#dc2626' }}>
          {saveError}
        </div>
      )}
    </>
  );

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '48px 24px 80px' }}>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ marginBottom: 36 }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#7e994e', marginBottom: 8 }}>My Account</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#111827', margin: 0 }}>Hello, {customer.firstName} 👋</h1>
          <button
            onClick={handleLogout}
            style={{ padding: '10px 24px', borderRadius: 9999, border: '1.5px solid #e5e7eb', background: 'white', color: '#6b7280', fontWeight: 600, fontSize: 13, cursor: 'pointer', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#dc2626'; e.currentTarget.style.color = '#dc2626'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.color = '#6b7280'; }}
          >
            Sign Out
          </button>
        </div>
      </motion.div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 32, background: '#f1f5e9', borderRadius: 14, padding: 4 }}>
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => { setActiveTab(tab.key); setSaveStatus(''); setSaveError(''); }}
            style={{
              flex: 1, padding: '10px 8px', borderRadius: 10, border: 'none',
              background: activeTab === tab.key ? 'white' : 'transparent',
              color: activeTab === tab.key ? '#111827' : '#6b7280',
              fontWeight: 600, fontSize: 13, cursor: 'pointer',
              boxShadow: activeTab === tab.key ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
              transition: 'all 0.2s', whiteSpace: 'nowrap',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">

        {/* ── Orders tab ── */}
        {activeTab === 'orders' && (
          <motion.div key="orders" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            {ordersLoading ? (
              // Skeleton
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[1, 2, 3].map(i => (
                  <div key={i} style={{ background: 'white', borderRadius: 20, padding: 24, boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <div style={{ width: 120, height: 15, borderRadius: 6, background: 'linear-gradient(90deg, #f1f5e9 25%, #e8eedc 50%, #f1f5e9 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s ease-in-out infinite' }} />
                        <div style={{ width: 80, height: 11, borderRadius: 4, background: 'linear-gradient(90deg, #f1f5e9 25%, #e8eedc 50%, #f1f5e9 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s ease-in-out infinite' }} />
                      </div>
                      <div style={{ width: 60, height: 15, borderRadius: 6, background: 'linear-gradient(90deg, #f1f5e9 25%, #e8eedc 50%, #f1f5e9 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s ease-in-out infinite' }} />
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      {[1, 2, 3].map(j => (
                        <div key={j} style={{ width: 40, height: 40, borderRadius: 8, background: 'linear-gradient(90deg, #f1f5e9 25%, #e8eedc 50%, #f1f5e9 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s ease-in-out infinite' }} />
                      ))}
                    </div>
                  </div>
                ))}
                <style>{`@keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }`}</style>
              </div>
            ) : orders.length === 0 ? (
              // Empty state
              <div style={{ textAlign: 'center', padding: '72px 24px', background: 'white', borderRadius: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <p style={{ fontSize: '3rem', marginBottom: 16 }}>🛍️</p>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', marginBottom: 8 }}>No orders yet</h3>
                <p style={{ color: '#6b7280', marginBottom: 32, fontSize: 14 }}>When you place your first order it'll show up here.</p>
                <a href="/shop" style={{ display: 'inline-block', background: '#7e994e', color: 'white', fontWeight: 700, fontSize: 14, padding: '12px 32px', borderRadius: 9999, textDecoration: 'none' }}>
                  Start Shopping
                </a>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {orders.map(order => <OrderCard key={order.id} order={order} />)}
              </div>
            )}
          </motion.div>
        )}

        {/* ── Profile tab ── */}
        {activeTab === 'profile' && (
          <motion.div key="profile" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <div style={{ background: 'white', borderRadius: 24, padding: '36px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <form onSubmit={handleSaveProfile}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8 }}>First Name</label>
                    <input value={form.firstName} onChange={e => setForm(p => ({ ...p, firstName: e.target.value }))} style={inputStyle}
                      onFocus={e => e.target.style.borderColor = '#7e994e'} onBlur={e => e.target.style.borderColor = '#e5e7eb'} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8 }}>Last Name</label>
                    <input value={form.lastName} onChange={e => setForm(p => ({ ...p, lastName: e.target.value }))} style={inputStyle}
                      onFocus={e => e.target.style.borderColor = '#7e994e'} onBlur={e => e.target.style.borderColor = '#e5e7eb'} />
                  </div>
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8 }}>Email</label>
                  <input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#7e994e'} onBlur={e => e.target.style.borderColor = '#e5e7eb'} />
                </div>
                <div style={{ marginBottom: 32 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8 }}>Phone <span style={{ color: '#9ca3af', fontWeight: 400 }}>(optional)</span></label>
                  <input type="tel" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="+1 (555) 000-0000" style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#7e994e'} onBlur={e => e.target.style.borderColor = '#e5e7eb'} />
                </div>
                {feedbackBox}
                <button type="submit" disabled={isSaving} style={{ width: '100%', padding: '14px', borderRadius: 9999, border: 'none', background: isSaving ? '#d1d5db' : '#7e994e', color: 'white', fontWeight: 700, fontSize: 15, cursor: isSaving ? 'not-allowed' : 'pointer' }}>
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </form>
            </div>
          </motion.div>
        )}

        {/* ── Password tab ── */}
        {activeTab === 'password' && (
          <motion.div key="password" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <div style={{ background: 'white', borderRadius: 24, padding: '36px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <form onSubmit={handleSavePassword}>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8 }}>New Password</label>
                  <input type="password" value={passwordForm.password} onChange={e => setPasswordForm(p => ({ ...p, password: e.target.value }))} placeholder="Min. 5 characters" style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#7e994e'} onBlur={e => e.target.style.borderColor = '#e5e7eb'} />
                </div>
                <div style={{ marginBottom: 32 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8 }}>Confirm Password</label>
                  <input type="password" value={passwordForm.confirm} onChange={e => setPasswordForm(p => ({ ...p, confirm: e.target.value }))} placeholder="Repeat new password" style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#7e994e'} onBlur={e => e.target.style.borderColor = '#e5e7eb'} />
                </div>
                {feedbackBox}
                <button type="submit" disabled={isSaving} style={{ width: '100%', padding: '14px', borderRadius: 9999, border: 'none', background: isSaving ? '#d1d5db' : '#7e994e', color: 'white', fontWeight: 700, fontSize: 15, cursor: isSaving ? 'not-allowed' : 'pointer' }}>
                  {isSaving ? 'Updating...' : 'Update Password'}
                </button>
              </form>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}