'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CartSidebar from './CartSidebar'; // Pull in the new component
import { useCart } from './CartProvider'; // Pull in the cart context

export default function Navbar() {
  // State to control the cart
  const { setIsCartOpen } = useCart();

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-cream/80 backdrop-blur-md border-b border-matcha-light"
      >
        <Link href="/" className="text-2xl font-bold text-matcha-dark tracking-tighter">
          MATCHA.
        </Link>

        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-700">
          <Link href="/shop" className="hover:text-matcha-dark transition-colors">Shop All</Link>
          <Link href="/about" className="hover:text-matcha-dark transition-colors">The Vibe</Link>
        </div>

        {/* Change this to a button that updates the state */}
        <button 
          onClick={() => setIsCartOpen(true)}
          className="flex items-center gap-2 bg-matcha-light hover:bg-matcha text-matcha-dark px-5 py-2.5 rounded-full font-semibold transition-colors shadow-sm active:scale-95"
        >
          <span>Cart</span>
          <span className="bg-white text-xs px-2 py-0.5 rounded-full shadow-sm text-gray-800">0</span>
        </button>
      </motion.nav>

      {/* Drop the sidebar component right next to the nav */}
      <CartSidebar isOpen={isCartOpen} closeCart={() => setIsCartOpen(false)} />
    </>
  );
}