// components/CartProvider.jsx
'use client';

import { createContext, useState, useContext, useEffect } from 'react';
import { addToCartAction, updateQuantityAction, getCartAction } from '@/app/actions';

const CartContext = createContext();

const CART_ID_KEY = 'uu_cart_id'; // localStorage key

export function CartProvider({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isFlying, setIsFlying] = useState(false);

  // On mount: check if we have a saved cart ID and rehydrate from Shopify
  useEffect(() => {
    const savedCartId = localStorage.getItem(CART_ID_KEY);
    if (!savedCartId) return;

    getCartAction(savedCartId).then((existingCart) => {
      if (existingCart) {
        // Cart still valid on Shopify's end
        setCart(existingCart);
      } else {
        // Cart expired (Shopify carts last ~10 days if inactive) — clear it
        localStorage.removeItem(CART_ID_KEY);
      }
    });
  }, []);

  // Whenever the cart changes, persist its ID to localStorage
  useEffect(() => {
    if (cart?.id) {
      localStorage.setItem(CART_ID_KEY, cart.id);
    }
  }, [cart?.id]);

  const addProductToCart = async (variantId) => {
    setIsUpdating(true);
    setIsFlying(true);

    try {
      const newCart = await addToCartAction(variantId);
      setCart(newCart);

      setTimeout(() => {
        setIsCartOpen(true);
        setIsFlying(false);
      }, 800);
    } catch (error) {
      console.error('Failed to add to cart:', error);
      setIsFlying(false);
    } finally {
      setIsUpdating(false);
    }
  };

  const updateQuantity = async (lineId, quantity) => {
    if (!cart?.id) return;
    if (quantity < 1) return;

    setIsUpdating(true);
    try {
      const updatedCart = await updateQuantityAction(cart.id, lineId, quantity);
      setCart(updatedCart);
    } catch (error) {
      console.error('Failed to update quantity:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <CartContext.Provider value={{
      isCartOpen, setIsCartOpen,
      cart, setCart,
      addProductToCart, updateQuantity,
      isUpdating, isFlying,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);