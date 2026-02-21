'use client';

import { createContext, useState, useContext } from 'react';
import { createCartAndAdd } from '@/lib/shopify';

// Create the context
const CartContext = createContext();

export function CartProvider({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState(null); // Stores the Shopify cart object
  const [isUpdating, setIsUpdating] = useState(false);

  // The master function that handles the Shopify API and the UI state
  const addProductToCart = async (variantId) => {
    setIsUpdating(true);
    try {
      const newCart = await createCartAndAdd(variantId);
      setCart(newCart);
      setIsCartOpen(true); // Pop the drawer open automatically
    } catch (error) {
      console.error("Failed to add to cart:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <CartContext.Provider value={{ isCartOpen, setIsCartOpen, cart, addProductToCart, isUpdating }}>
      {children}
    </CartContext.Provider>
  );
}

// A custom hook so we don't have to import useContext everywhere
export const useCart = () => useContext(CartContext);