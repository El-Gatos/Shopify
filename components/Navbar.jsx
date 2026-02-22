'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import CartSidebar from './CartSidebar';
import { useCart } from './CartProvider';
import { useAccount } from './AccountProvider';
import { searchProductsAction } from '@/app/actions';

const navLinks = [
  { href: '/shop', label: 'Shop All' },
  { href: '/about', label: 'About' },
  { href: '/support', label: 'Orders & Support' },
];

function CartButton({ totalQuantity, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 8,
        background: '#f1f5e9', border: 'none', cursor: 'pointer',
        padding: '10px 20px', borderRadius: 9999, fontWeight: 600,
        color: '#7e994e', transition: 'background 0.2s',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
      }}
      onMouseEnter={e => e.currentTarget.style.background = '#cddaa3'}
      onMouseLeave={e => e.currentTarget.style.background = '#f1f5e9'}
    >
      <span>Cart</span>
      <motion.span
        key={totalQuantity}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        style={{ background: 'white', fontSize: 12, padding: '2px 8px', borderRadius: 9999, color: '#374151', fontWeight: 700 }}
      >
        {totalQuantity}
      </motion.span>
    </button>
  );
}

function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const debounceRef = useRef(null);

  // Open and focus input
  const openSearch = () => {
    setIsOpen(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  // Close and reset
  const closeSearch = () => {
    setIsOpen(false);
    setQuery('');
    setResults([]);
  };

  // Close on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        closeSearch();
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Debounced search
  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    clearTimeout(debounceRef.current);
    if (val.trim().length < 2) { setResults([]); return; }
    setIsLoading(true);
    debounceRef.current = setTimeout(async () => {
      const res = await searchProductsAction(val);
      setResults(res);
      setIsLoading(false);
    }, 300);
  };

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      {/* Search icon button */}
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.button
            key="icon"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={openSearch}
            aria-label="Search"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: 8, borderRadius: 9999, color: '#7e994e',
              display: 'flex', alignItems: 'center',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </motion.button>
        ) : (
          <motion.div
            key="input"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 240, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', background: '#f1f5e9', borderRadius: 9999, padding: '8px 16px', gap: 8, width: 240 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7e994e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                ref={inputRef}
                value={query}
                onChange={handleChange}
                placeholder="Search products..."
                style={{
                  border: 'none', background: 'none', outline: 'none',
                  fontSize: 14, color: '#111827', width: '100%',
                }}
              />
              <button onClick={closeSearch} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: 0, lineHeight: 1 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results dropdown */}
      <AnimatePresence>
        {isOpen && (query.length >= 2) && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute', top: 'calc(100% + 12px)', right: 0,
              width: 320, background: 'white', borderRadius: 16,
              boxShadow: '0 8px 32px rgba(0,0,0,0.12)', overflow: 'hidden',
              zIndex: 200,
            }}
          >
            {isLoading ? (
              <div style={{ padding: '24px 20px', textAlign: 'center', color: '#9ca3af', fontSize: 14 }}>
                Searching...
              </div>
            ) : results.length === 0 ? (
              <div style={{ padding: '24px 20px', textAlign: 'center', color: '#9ca3af', fontSize: 14 }}>
                No products found for "{query}"
              </div>
            ) : (
              <div>
                <p style={{ padding: '12px 16px 8px', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9ca3af', margin: 0 }}>
                  Results
                </p>
                {results.map((product) => {
                  const price = parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2);
                  const imageUrl = product.images.edges[0]?.node?.url;
                  return (
                    <Link
                      key={product.id}
                      href={`/product/${product.handle}`}
                      onClick={closeSearch}
                      style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px', textDecoration: 'none', transition: 'background 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#f9fafb'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <div style={{ width: 44, height: 44, borderRadius: 10, background: '#f1f5e9', flexShrink: 0, overflow: 'hidden', position: 'relative' }}>
                        {imageUrl && <Image src={imageUrl} alt={product.title} fill style={{ objectFit: 'contain', padding: 4 }} />}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#111827', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.title}</p>
                        <p style={{ margin: 0, fontSize: 13, color: '#7e994e', fontWeight: 500 }}>${price}</p>
                      </div>
                    </Link>
                  );
                })}
                <Link
                  href={`/shop?search=${encodeURIComponent(query)}`}
                  onClick={closeSearch}
                  style={{ display: 'block', padding: '12px 16px', textAlign: 'center', fontSize: 13, fontWeight: 600, color: '#7e994e', textDecoration: 'none', borderTop: '1px solid #f3f4f6' }}
                >
                  See all results →
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AccountButton() {
  const { customer } = useAccount();
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={customer ? '/account' : '/account/login'}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title={customer ? `Signed in as ${customer.firstName}` : 'Sign in'}
      style={{
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '10px 16px', borderRadius: 9999,
        background: customer ? '#7e994e' : hovered ? '#f1f5e9' : 'transparent',
        border: customer ? 'none' : '1.5px solid #e5e7eb',
        color: customer ? 'white' : '#7e994e',
        fontWeight: 600, fontSize: 13,
        textDecoration: 'none', transition: 'all 0.2s',
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
      <span>{customer ? customer.firstName : 'Sign In'}</span>
    </Link>
  );
}

export default function Navbar() {
  const { setIsCartOpen, cart } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(768);

  useEffect(() => {
    const update = () => setWindowWidth(window.innerWidth);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const totalQuantity = cart?.lines?.edges?.reduce((total, item) => total + item.node.quantity, 0) || 0;
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, background: 'rgba(253,253,252,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #f1f5e9' }}
      >
        {/* DESKTOP */}
        {windowWidth >= 768 && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', padding: '12px 24px' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
              <Image src="/logo.png" alt="Urban Utensil Logo" width={280} height={100} style={{ height: 100, width: 'auto' }} />
            </Link>
            <div style={{ display: 'flex', gap: 32, fontSize: 14, fontWeight: 500, color: '#374151' }}>
              {navLinks.map(({ href, label }) => (
                <Link key={href} href={href} style={{ textDecoration: 'none', color: '#374151', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#7e994e'}
                  onMouseLeave={e => e.currentTarget.style.color = '#374151'}
                >{label}</Link>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 12 }}>
              <SearchBar />
              <AccountButton />
              <CartButton totalQuantity={totalQuantity} onClick={() => setIsCartOpen(true)} />
            </div>
          </div>
        )}

        {/* MOBILE */}
        {windowWidth < 768 && (
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px' }}>
            {/* Left: hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(p => !p)}
              style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#7e994e', fontWeight: 600, fontSize: 14, background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5, width: 22 }}>
                <motion.span animate={isMobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} transition={{ duration: 0.2 }}
                  style={{ display: 'block', width: '100%', height: 2, backgroundColor: '#7e994e', borderRadius: 9999 }} />
                <motion.span animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }} transition={{ duration: 0.15 }}
                  style={{ display: 'block', width: '100%', height: 2, backgroundColor: '#7e994e', borderRadius: 9999 }} />
                <motion.span animate={isMobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} transition={{ duration: 0.2 }}
                  style={{ display: 'block', width: '100%', height: 2, backgroundColor: '#7e994e', borderRadius: 9999 }} />
              </div>
              <motion.span animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }} transition={{ duration: 0.15 }}>
                Menu
              </motion.span>
            </button>

            {/* Center: logo */}
            <Link href="/" onClick={closeMobileMenu} style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
              <Image src="/logo.png" alt="Urban Utensil Logo" width={320} height={110} style={{ height: 64, width: 'auto' }} />
            </Link>

            {/* Right: search + account + cart */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <SearchBar />
              <AccountButton />
              <CartButton totalQuantity={totalQuantity} onClick={() => setIsCartOpen(true)} />
            </div>
          </div>
        )}

        {/* Mobile dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && windowWidth < 768 && (
            <motion.div
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              style={{ overflow: 'hidden', borderTop: '1px solid #f1f5e9', background: 'rgba(253,253,252,0.97)' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', padding: '8px 24px 16px' }}>
                {navLinks.map(({ href, label }, i) => (
                  <motion.div key={href} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}>
                    <Link href={href} onClick={closeMobileMenu} style={{ display: 'block', padding: '14px 0', fontSize: 17, fontWeight: 500, color: '#374151', textDecoration: 'none', borderBottom: '1px solid #f1f5e9' }}>
                      {label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <CartSidebar />
    </>
  );
}