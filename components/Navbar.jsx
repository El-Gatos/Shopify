'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import CartSidebar from './CartSidebar';
import { useCart } from './CartProvider';

export default function Navbar() {
  // Pulling the cart data straight from the global brain
  const { setIsCartOpen, cart } = useCart();

  // Reduce the array of cart items to get the total quantity
  // If the cart is null or empty, it defaults to 0
  const totalQuantity = cart?.lines?.edges?.reduce((total, item) => {
    return total + item.node.quantity;
  }, 0) || 0;

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-cream/80 backdrop-blur-md border-b border-matcha-light"
      >
        <Link href="/" className="flex items-center">
          <Image 
            src="/logo.png" 
            alt=" Urban Utensil Logo" 
            width={320} 
            height={110}
            className="w-auto h-20 md:h-28 transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-700">
          <Link href="/shop" className="hover:text-matcha-dark transition-colors">Shop All</Link>
          <Link href="/about" className="hover:text-matcha-dark transition-colors">About</Link>
          <Link href="/support" className="hover:text-matcha-dark transition-colors">Orders & Support</Link>
        </div>

        <button 
          onClick={() => setIsCartOpen(true)}
          className="flex items-center gap-2 bg-matcha-light hover:bg-matcha text-matcha-dark px-5 py-2.5 rounded-full font-semibold transition-colors shadow-sm active:scale-95"
        >
          <span>Cart</span>
          
          {/* The 'key' prop tells Framer Motion to re-run the animation 
            every time the totalQuantity changes. 
          */}
          <motion.span 
            key={totalQuantity}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="bg-white text-xs px-2 py-0.5 rounded-full shadow-sm text-gray-800"
          >
            {totalQuantity}
          </motion.span>
        </button>
      </motion.nav>

      {/* Sidebar doesn't need props anymore since it reads directly from useCart().
        Just drop it in. 
      */}
      <CartSidebar />
    </>
  );
}