import { getProduct } from '../../../lib/shopify';
import { notFound } from 'next/navigation';
import ProductStructuredData from '../../../components/ProductStructuredData';
import ProductImageGallery from '../../../components/ProductImageGallery';
import VariantPicker from '../../../components/VariantPicker';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://urbanutensil.com';

export async function generateMetadata({ params }) {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) return {};

  const title = `${product.title} | Urban Utensil`;
  const description = product.descriptionHtml?.replace(/<[^>]*>/g, '').slice(0, 160) || 'Premium kitchen tools for modern spaces.';
  const imageUrl = product.images.edges[0]?.node?.url;

  return {
    title,
    description,
    openGraph: {
      title, description,
      url: `${siteUrl}/product/${handle}`,
      siteName: 'Urban Utensil',
      images: imageUrl ? [{ url: imageUrl, width: 800, height: 800, alt: product.title }] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title, description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function ProductPage({ params }) {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) return notFound();

  const images = product.images.edges.map(e => e.node);
  const variants = product.variants.edges.map(e => e.node);
  const options = product.options || [];

  return (
    <>
      <ProductStructuredData product={product} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px 96px' }}>

        {/* Breadcrumb */}
        <p style={{ fontSize: 12, color: '#9ca3af', marginBottom: 40 }}>
          <a href="/" style={{ color: '#9ca3af', textDecoration: 'none' }}>Home</a>
          {' / '}
          <a href="/shop" style={{ color: '#9ca3af', textDecoration: 'none' }}>Shop</a>
          {' / '}
          <span style={{ color: '#374151' }}>{product.title}</span>
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px 64px', alignItems: 'start' }}>

          {/* Left — Image gallery */}
          <ProductImageGallery images={images} />

          {/* Right — Details */}
          <div>
            <h1 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, color: '#111827', lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: 16 }}>
              {product.title}
            </h1>

            <VariantPicker
              options={options}
              variants={variants}
              priceRange={product.priceRange}
            />

            <div style={{ borderTop: '1px solid #f1f5e9', margin: '32px 0' }} />

            <div
              style={{ color: '#4b5563', lineHeight: 1.8, fontSize: '0.95rem' }}
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
          </div>

        </div>
      </div>
    </>
  );
}