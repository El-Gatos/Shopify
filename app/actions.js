'use server';
import {
  createCartAndAdd, updateCartQuantity, removeFromCart, getCart,
  searchProducts, getProductsWithTypes,
  customerCreate, customerAccessTokenCreate, customerAccessTokenDelete,
  getCustomer, customerUpdate,
} from '@/lib/shopify';

export async function getCartAction(cartId) { return await getCart(cartId); }
export async function addToCartAction(variantId) { return await createCartAndAdd(variantId); }
export async function updateQuantityAction(cartId, lineId, quantity) { return await updateCartQuantity(cartId, lineId, quantity); }
export async function removeFromCartAction(cartId, lineIds) { return await removeFromCart(cartId, lineIds); }
export async function searchProductsAction(query) {
  if (!query || query.trim().length < 2) return [];
  return await searchProducts(query);
}
export async function getProductsWithTypesAction() { return await getProductsWithTypes(); }

// Customer actions
export async function registerAction({ firstName, lastName, email, password }) {
  return await customerCreate({ firstName, lastName, email, password });
}
export async function loginAction({ email, password }) {
  return await customerAccessTokenCreate({ email, password });
}
export async function logoutAction(accessToken) {
  return await customerAccessTokenDelete(accessToken);
}
export async function getCustomerAction(accessToken) {
  return await getCustomer(accessToken);
}
export async function updateCustomerAction(accessToken, customer) {
  return await customerUpdate(accessToken, customer);
}