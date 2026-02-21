'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from './CartProvider';

export default function CartSidebar() {
  const { isCartOpen, setIsCartOpen, cart } = useCart();

  const checkoutUrl = cart?.checkoutUrl || '#';
  const cartItems = cart?.lines?.edges || [];
  
  // Grab the subtotal directly from Shopify, default to 0 if empty
  const subtotal = cart?.cost?.subtotalAmount?.amount 
    ? parseFloat(cart.cost.subtotalAmount.amount).toFixed(2) 
    : "0.00";

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Dark Overlay */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />

          {/* Sidebar Drawer */}
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-cream shadow-2xl z-[70] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-matcha-light bg-white">
              <h2 className="text-2xl font-bold text-matcha-dark tracking-tight">Your Cart</h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 text-gray-400 hover:text-gray-800">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Cart Items Area */}
            <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-6">
              {cartItems.length > 0 ? (
                cartItems.map((item) => {
                  const lineItem = item.node;
                  const productTitle = lineItem.merchandise.product.title;
                  const price = parseFloat(lineItem.merchandise.price.amount).toFixed(2);
                  const imageUrl = lineItem.merchandise.image?.url;

                  return (
                    <div key={lineItem.id} className="flex gap-4 items-center bg-white p-4 rounded-2xl shadow-sm border border-matcha-light/50">
                      {/* Item Image */}
                      <div className="relative w-20 h-20 bg-matcha-light rounded-xl flex-shrink-0 overflow-hidden">
                        {imageUrl && (
                          <Image src={imageUrl} alt={productTitle} fill className="object-contain p-2" />
                        )}
                      </div>
                      
                      {/* Item Details */}
                      <div className="flex-1 text-left">
                        <h3 className="font-bold text-gray-800 text-sm leading-tight">{productTitle}</h3>
                        <p className="text-gray-500 text-xs mt-1">Qty: {lineItem.quantity}</p>
                        <p className="text-matcha-dark font-semibold mt-1">${price}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-24 h-24 bg-matcha-light rounded-full flex items-center justify-center mb-6">
                     <span className="text-3xl">🛒</span>
                  </div>
                  <p className="text-lg font-medium text-gray-700">Your cart is looking a little empty.</p>
                </div>
              )}
            </div>

            {/* Footer / Checkout */}
            <div className="p-6 bg-white border-t border-matcha-light">
              <div className="flex justify-between text-lg font-bold text-gray-800 mb-6">
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </div>
              <a 
                href={checkoutUrl}
                className={`block w-full text-center font-bold py-4 rounded-xl shadow-md transition-colors active:scale-[0.98]
                  ${cartItems.length > 0 
                    ? 'bg-matcha-dark text-white hover:bg-gray-900' 
                    : 'bg-gray-300 text-gray-500 pointer-events-none'
                  }`}
              >
                Checkout
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}