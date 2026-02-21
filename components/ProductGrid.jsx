// components/ProductGrid.jsx

'use client'; // Keep this because of Framer Motion animations

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Now it accepts { products } as a prop from page.jsx
export default function ProductGrid({ products }) {
  
  // Failsafe in case your Shopify store is empty or disconnected
  if (!products || products.length === 0) {
    return <div className="text-center py-20 text-gray-500">No products found. Go add some to Shopify.</div>;
  }

  return (
    <section className="bg-cream py-20 px-8">
      <h2 className="text-3xl font-bold text-matcha-dark text-center mb-12">Trending Right Now</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {products.map((product, i) => {
          // Extracting the data from Shopify's nested GraphQL structure
          const title = product.title;
          const price = parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2);
          const imageUrl = product.images.edges[0]?.node?.url;

          return (
            <Link href={`/product/${product.handle}`} key={product.id}>
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white p-6 rounded-2xl shadow-sm cursor-pointer"
              >
                <div className="relative h-64 w-full mb-6 bg-matcha-light rounded-xl overflow-hidden">
                 {imageUrl ? (
                   <Image 
                     src={imageUrl} 
                     alt={title}
                     fill
                     className="object-contain p-4" 
                   />
                 ) : (
                   <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                 )}
              </div>
              
              <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
              <p className="text-matcha-dark mt-2 font-medium">${price}</p>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}