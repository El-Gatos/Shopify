import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import { getProducts } from '../lib/shopify';

export default async function Home() {
  // Fetch the inventory securely on the server
  const products = await getProducts();

  return (
    <>
      <Hero />
      <ProductGrid products={products} />
    </>
  );
}