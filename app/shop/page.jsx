import ShopClient from './ShopClient';
import { getProductsWithTypes } from '@/lib/shopify';

export default async function ShopPage() {
  const products = await getProductsWithTypes();
  return <ShopClient products={products} />;
}