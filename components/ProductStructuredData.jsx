// Server component — renders a <script> tag with JSON-LD for Google Shopping
// Drop this into the product page, no client JS needed

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://urbanutensil.com';

export default function ProductStructuredData({ product }) {
  const price = parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2);
  const currency = product.priceRange.minVariantPrice.currencyCode || 'USD';
  const imageUrl = product.images.edges[0]?.node?.url;
  const description = product.descriptionHtml?.replace(/<[^>]*>/g, '').slice(0, 500) || '';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description,
    image: imageUrl ? [imageUrl] : [],
    url: `${siteUrl}/product/${product.handle}`,
    brand: {
      '@type': 'Brand',
      name: 'Urban Utensil',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: currency,
      price,
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Urban Utensil',
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}