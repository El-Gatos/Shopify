import { getProduct } from '../../../lib/shopify';
import { notFound } from 'next/navigation';
import ProductStructuredData from '../../../components/ProductStructuredData';
import ProductPageClient from '../../../components/ProductPageClient';

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

  return (
    <>
      <ProductStructuredData product={product} />
      <ProductPageClient product={product} />
    </>
  );
}