'use server';
import { createCartAndAdd, updateCartQuantity, removeFromCart, getCart, searchProducts, getProductsWithTypes } from '@/lib/shopify';

export async function getCartAction(cartId) {
  return await getCart(cartId);
}

export async function addToCartAction(variantId) {
  return await createCartAndAdd(variantId);
}

export async function updateQuantityAction(cartId, lineId, quantity) {
  return await updateCartQuantity(cartId, lineId, quantity);
}

export async function removeFromCartAction(cartId, lineIds) {
  return await removeFromCart(cartId, lineIds);
}

export async function searchProductsAction(query) {
  if (!query || query.trim().length < 2) return [];
  return await searchProducts(query);
}

export async function getProductsWithTypesAction() {
  return await getProductsWithTypes();
}