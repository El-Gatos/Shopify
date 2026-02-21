// app/product/[handle]/page.jsx
import Image from 'next/image';
import { getProduct } from '@/lib/shopify';
import { notFound } from 'next/navigation';
import AddToCartButton from '@/components/AddToCartButton';

export default async function ProductPage({ params }) {
  // NEXT.js 15 FIX: You MUST await params before using them
  const { handle } = await params; 
  
  const product = await getProduct(handle);
  
  if (!product) return notFound();

  const title = product.title;
  const price = parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2);
  const imageUrl = product.images.edges[0]?.node?.url;
  const descriptionHtml = product.descriptionHtml;
  const variantId = product.variants.edges[0]?.node?.id;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12 mt-10">
      <div className="relative h-[60vh] md:h-[80vh] w-full bg-matcha-light rounded-3xl overflow-hidden shadow-sm">
        {imageUrl ? (
          <Image 
            src={imageUrl} 
            alt={title} 
            fill 
            className="object-cover p-8" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
        )}
      </div>

      <div className="flex flex-col justify-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">{title}</h1>
        <p className="text-2xl text-matcha-dark font-medium mb-8">${price}</p>
        
        <div 
          className="prose prose-matcha text-gray-600 mb-10 leading-relaxed" 
          dangerouslySetInnerHTML={{ __html: descriptionHtml }} 
        />

        <AddToCartButton variantId={variantId} price={price} />

        <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-500 font-medium">
          <span>✨ Free shipping over $50</span>
          <span>•</span>
          <span>🌱 30-day returns</span>
        </div>
      </div>
    </div>
  );
}