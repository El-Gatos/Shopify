// components/AddToCartButton.jsx
'use client';

import { motion } from 'framer-motion'; //
import { useCart } from './CartProvider'; //

export default function AddToCartButton({ variantId, price }) {
  const { addProductToCart, isUpdating } = useCart(); //

  return (
    <motion.button 
      // Click Animation: Shrinks slightly and then pops back
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      
      onClick={() => addProductToCart(variantId)}
      disabled={isUpdating}
      className={`w-full font-bold text-lg py-5 rounded-full shadow-lg transition-colors
        ${isUpdating 
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
          : 'bg-matcha-dark text-white hover:bg-gray-900'
        }`}
    >
      {isUpdating ? (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          Adding...
        </motion.span>
      ) : (
        `Add to Cart — $${price}`
      )}
    </motion.button>
  );
}