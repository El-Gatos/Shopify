'use client';

import { createContext, useState, useContext } from 'react';
import { addToCartAction } from '@/app/actions'; // <-- Import the action

const CartContext = createContext();

export function CartProvider({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const addProductToCart = async (variantId) => {
    setIsUpdating(true);
    try {
      // Use the server action instead of the lib function directly
      const newCart = await addToCartAction(variantId);
      setCart(newCart);
      setIsCartOpen(true);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  // Give the rest of the app access to setCart so we can remove items later
  return (
    <CartContext.Provider value={{ isCartOpen, setIsCartOpen, cart, setCart, addProductToCart, isUpdating }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);