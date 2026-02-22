export const dynamic = 'force-dynamic';

import { getProductsWithTypes } from '@/lib/shopify';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://urbanutensil.com';

export default async function sitemap() {
  const products = await getProductsWithTypes();

  const staticPages = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/shop`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${siteUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/support`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];

  const productPages = products.map(product => ({
    url: `${siteUrl}/product/${product.handle}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticPages, ...productPages];
}