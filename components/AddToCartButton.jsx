'use client';

import { useCart } from './CartProvider'; // Pull in the brain

export default function AddToCartButton({ variantId, price }) {
  // Grab the function and loading state from context
  const { addProductToCart, isUpdating } = useCart();

  return (
    <button 
      onClick={() => addProductToCart(variantId)}
      disabled={isUpdating}
      className={`w-full font-bold text-lg py-5 rounded-full shadow-lg transition-colors active:scale-[0.98]
        ${isUpdating 
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
          : 'bg-matcha-dark text-white hover:bg-gray-900'
        }`}
    >
      {isUpdating ? 'Adding...' : `Add to Cart — $${price}`}
    </button>
  );
}