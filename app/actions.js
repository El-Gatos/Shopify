'use server';

import { createCartAndAdd, removeFromCart } from '@/lib/shopify';

export async function addToCartAction(variantId) {
  return await createCartAndAdd(variantId);
}

export async function removeFromCartAction(cartId, lineIds) {
  return await removeFromCart(cartId, lineIds);
}