'use server';
import { createCartAndAdd, updateCartQuantity, removeFromCart } from '@/lib/shopify';

export async function addToCartAction(variantId, cartId) {
  return await createCartAndAdd(variantId, cartId);
}

export async function updateQuantityAction(cartId, lineId, quantity) {
  return await updateCartQuantity(cartId, lineId, quantity);
}

export async function removeFromCartAction(cartId, lineIds) {
  return await removeFromCart(cartId, lineIds);
}