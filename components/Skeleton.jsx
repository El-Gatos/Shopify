'use client';

// Reusable shimmer skeleton blocks
export function SkeletonBox({ width = '100%', height = 20, borderRadius = 8, style = {} }) {
  return (
    <div style={{
      width, height, borderRadius,
      background: 'linear-gradient(90deg, #f1f5e9 25%, #e8eedc 50%, #f1f5e9 75%)',
      backgroundSize: '200% 100%',
      animation: 'shimmer 1.4s ease-in-out infinite',
      ...style,
    }} />
  );
}

export function ProductCardSkeleton() {
  return (
    <div style={{ background: 'white', borderRadius: 20, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
      {/* Image placeholder */}
      <SkeletonBox height={220} borderRadius={14} style={{ marginBottom: 20 }} />
      {/* Type tag */}
      <SkeletonBox width="40%" height={11} borderRadius={4} style={{ marginBottom: 10 }} />
      {/* Title */}
      <SkeletonBox width="85%" height={16} borderRadius={6} style={{ marginBottom: 6 }} />
      <SkeletonBox width="60%" height={16} borderRadius={6} style={{ marginBottom: 12 }} />
      {/* Price */}
      <SkeletonBox width="30%" height={16} borderRadius={6} />
    </div>
  );
}

export function ProductPageSkeleton() {
  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
      {/* Image */}
      <SkeletonBox height={520} borderRadius={24} />
      {/* Details */}
      <div style={{ paddingTop: 24 }}>
        <SkeletonBox width="35%" height={12} borderRadius={4} style={{ marginBottom: 20 }} />
        <SkeletonBox width="90%" height={40} borderRadius={8} style={{ marginBottom: 8 }} />
        <SkeletonBox width="65%" height={40} borderRadius={8} style={{ marginBottom: 24 }} />
        <SkeletonBox width="25%" height={28} borderRadius={6} style={{ marginBottom: 32 }} />
        <SkeletonBox height={16} borderRadius={6} style={{ marginBottom: 8 }} />
        <SkeletonBox height={16} borderRadius={6} style={{ marginBottom: 8 }} />
        <SkeletonBox width="75%" height={16} borderRadius={6} style={{ marginBottom: 40 }} />
        <SkeletonBox height={60} borderRadius={9999} />
      </div>
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}

export function ShopPageSkeleton() {
  return (
    <div style={{ background: '#fdfdfc', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: '#f1f5e9', padding: '64px 40px 48px', textAlign: 'center' }}>
        <SkeletonBox width={120} height={11} borderRadius={4} style={{ margin: '0 auto 16px' }} />
        <SkeletonBox width={280} height={40} borderRadius={8} style={{ margin: '0 auto 12px' }} />
        <SkeletonBox width={80} height={14} borderRadius={4} style={{ margin: '0 auto' }} />
      </div>
      {/* Controls */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 40px 0', display: 'flex', gap: 12 }}>
        {[80, 100, 90, 110].map((w, i) => (
          <SkeletonBox key={i} width={w} height={36} borderRadius={9999} />
        ))}
      </div>
      {/* Grid */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 40px 80px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 28 }}>
        {Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)}
      </div>
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}