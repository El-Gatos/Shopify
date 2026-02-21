// components/CartProvider.jsx
'use client';

import { createContext, useState, useContext } from 'react';
import { addToCartAction, updateQuantityAction } from '@/app/actions';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  // Add a state to track the fly animation
  const [isFlying, setIsFlying] = useState(false);

  const addProductToCart = async (variantId) => {
    setIsUpdating(true);
    setIsFlying(true); // Start the "fly" animation
    
    try {
      const newCart = await addToCartAction(variantId);
      setCart(newCart);
      
      // Small delay so the user sees the "fly" before the sidebar rips open
      setTimeout(() => {
        setIsCartOpen(true);
        setIsFlying(false);
      }, 800); 
    } catch (error) {
      console.error("Failed to add to cart:", error);
      setIsFlying(false);
    } finally {
      setIsUpdating(false);
    }
  };

  const updateQuantity = async (lineId, quantity) => {
    if (!cart?.id) return;
    if (quantity < 1) return; // Prevent going below 1
    
    setIsUpdating(true);
    try {
      const updatedCart = await updateQuantityAction(cart.id, lineId, quantity);
      setCart(updatedCart);
    } catch (error) {
      console.error("Failed to update quantity:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <CartContext.Provider value={{ 
      isCartOpen, setIsCartOpen, cart, setCart, 
      addProductToCart, updateQuantity, isUpdating, isFlying 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);