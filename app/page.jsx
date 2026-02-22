import Hero from '../components/Hero';
import TrustBar from '../components/TrustBar';
import ProductGrid from '../components/ProductGrid';
import FeatureSection from '../components/FeatureSection';
import BrandStatement from '../components/BrandStatement';
import { getProducts } from '../lib/shopify';

export default async function Home() {
  const products = await getProducts();

  return (
    <>
      <Hero />
      <TrustBar />
      <ProductGrid products={products} />
      <FeatureSection />
      <BrandStatement />
    </>
  );
}