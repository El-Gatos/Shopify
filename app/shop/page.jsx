import ProductGrid from '@/components/ProductGrid';
import { getProducts } from '@/lib/shopify';

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <div className="py-12">
      <h1 className="text-4xl font-bold text-matcha-dark text-center mb-12">All Kitchen Essentials</h1>
      <ProductGrid products={products} />
    </div>
  );
}