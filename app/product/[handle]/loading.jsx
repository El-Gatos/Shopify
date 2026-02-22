'use client';
import { useState, useEffect } from 'react';
import { ProductPageSkeleton } from '@/components/Skeleton';

export default function ProductLoading() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  if (isMobile) {
    return (
      <div style={{ padding: '24px 20px' }}>
        <div style={{ height: 360, borderRadius: 20, background: 'linear-gradient(90deg, #f1f5e9 25%, #e8eedc 50%, #f1f5e9 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s ease-in-out infinite', marginBottom: 28 }} />
        <div style={{ height: 14, width: '40%', borderRadius: 6, background: 'linear-gradient(90deg, #f1f5e9 25%, #e8eedc 50%, #f1f5e9 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s ease-in-out infinite', marginBottom: 12 }} />
        <div style={{ height: 32, width: '90%', borderRadius: 8, background: 'linear-gradient(90deg, #f1f5e9 25%, #e8eedc 50%, #f1f5e9 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s ease-in-out infinite', marginBottom: 8 }} />
        <div style={{ height: 32, width: '70%', borderRadius: 8, background: 'linear-gradient(90deg, #f1f5e9 25%, #e8eedc 50%, #f1f5e9 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s ease-in-out infinite', marginBottom: 20 }} />
        <div style={{ height: 24, width: '25%', borderRadius: 6, background: 'linear-gradient(90deg, #f1f5e9 25%, #e8eedc 50%, #f1f5e9 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s ease-in-out infinite', marginBottom: 32 }} />
        <div style={{ height: 56, borderRadius: 9999, background: 'linear-gradient(90deg, #f1f5e9 25%, #e8eedc 50%, #f1f5e9 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s ease-in-out infinite' }} />
        <style>{`@keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }`}</style>
      </div>
    );
  }

  return <ProductPageSkeleton />;
}