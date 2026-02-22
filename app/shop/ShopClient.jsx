'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';

const SORT_OPTIONS = [
  { value: 'default', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'A → Z' },
  { value: 'name-desc', label: 'Z → A' },
];

export default function ShopClient({ products }) {
  const searchParams = useSearchParams();
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeSort, setActiveSort] = useState('default');
  const [searchQuery, setSearchQuery] = useState('');

  // Pick up ?search= from navbar search "see all results"
  useEffect(() => {
    const q = searchParams.get('search');
    if (q) setSearchQuery(q);
  }, [searchParams]);

  // Build filter tabs dynamically from productType
  const filterTabs = useMemo(() => {
    const types = ['All', ...new Set(products.map(p => p.productType).filter(Boolean))];
    return types;
  }, [products]);

  // Filter + sort
  const displayedProducts = useMemo(() => {
    let list = [...products];

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p => p.title.toLowerCase().includes(q) || p.productType?.toLowerCase().includes(q));
    }

    // Type filter
    if (activeFilter !== 'All') {
      list = list.filter(p => p.productType === activeFilter);
    }

    // Sort
    switch (activeSort) {
      case 'price-asc':
        list.sort((a, b) => parseFloat(a.priceRange.minVariantPrice.amount) - parseFloat(b.priceRange.minVariantPrice.amount));
        break;
      case 'price-desc':
        list.sort((a, b) => parseFloat(b.priceRange.minVariantPrice.amount) - parseFloat(a.priceRange.minVariantPrice.amount));
        break;
      case 'name-asc':
        list.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-desc':
        list.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }

    return list;
  }, [products, activeFilter, activeSort, searchQuery]);

  return (
    <div style={{ background: '#fdfdfc', minHeight: '100vh' }}>

      {/* Page header */}
      <div style={{ background: '#f1f5e9', padding: '64px 40px 48px', textAlign: 'center' }}>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#7e994e', marginBottom: 12 }}
        >
          The Collection
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#111827', margin: '0 0 8px', letterSpacing: '-0.02em' }}
        >
          All Kitchen Essentials
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ color: '#6b7280', fontSize: '1rem' }}
        >
          {displayedProducts.length} {displayedProducts.length === 1 ? 'product' : 'products'}
        </motion.p>
      </div>

      {/* Controls */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 40px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>

          {/* Filter tabs */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {filterTabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                style={{
                  padding: '8px 20px',
                  borderRadius: 9999,
                  border: '1.5px solid',
                  borderColor: activeFilter === tab ? '#7e994e' : '#e5e7eb',
                  background: activeFilter === tab ? '#7e994e' : 'white',
                  color: activeFilter === tab ? 'white' : '#4b5563',
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Sort + Search */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Inline search for shop page */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#f1f5e9', borderRadius: 9999, padding: '8px 16px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7e994e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Filter products..."
                style={{ border: 'none', background: 'none', outline: 'none', fontSize: 13, color: '#111827', width: 140 }}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: 0, lineHeight: 1 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              )}
            </div>

            <select
              value={activeSort}
              onChange={e => setActiveSort(e.target.value)}
              style={{
                padding: '8px 16px', borderRadius: 9999, border: '1.5px solid #e5e7eb',
                background: 'white', color: '#4b5563', fontWeight: 500, fontSize: 13,
                cursor: 'pointer', outline: 'none',
              }}
            >
              {SORT_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Product grid */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 40px 80px' }}>
        <AnimatePresence mode="popLayout">
          {displayedProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ textAlign: 'center', padding: '80px 0', color: '#9ca3af' }}
            >
              <p style={{ fontSize: '2rem', marginBottom: 12 }}>🔍</p>
              <p style={{ fontSize: '1.1rem', fontWeight: 500 }}>No products match your search.</p>
              <button
                onClick={() => { setSearchQuery(''); setActiveFilter('All'); }}
                style={{ marginTop: 16, background: 'none', border: 'none', color: '#7e994e', fontWeight: 600, cursor: 'pointer', fontSize: 14 }}
              >
                Clear filters
              </button>
            </motion.div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 28 }}>
              {displayedProducts.map((product, i) => {
                const price = parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2);
                const imageUrl = product.images.edges[0]?.node?.url;

                return (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, delay: i * 0.05 }}
                  >
                    <Link href={`/product/${product.handle}`} style={{ textDecoration: 'none' }}>
                      <motion.div
                        whileHover={{ y: -6 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        style={{ background: 'white', borderRadius: 20, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.06)', cursor: 'pointer' }}
                      >
                        <div style={{ position: 'relative', height: 220, background: '#f1f5e9', borderRadius: 14, overflow: 'hidden', marginBottom: 20 }}>
                          {imageUrl ? (
                            <Image src={imageUrl} alt={product.title} fill style={{ objectFit: 'contain', padding: 16 }} />
                          ) : (
                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d1d5db' }}>No Image</div>
                          )}
                        </div>
                        {product.productType && (
                          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: 6 }}>
                            {product.productType}
                          </p>
                        )}
                        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#111827', marginBottom: 8, lineHeight: 1.3 }}>{product.title}</h3>
                        <p style={{ color: '#7e994e', fontWeight: 600, fontSize: '1rem' }}>${price}</p>
                      </motion.div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}