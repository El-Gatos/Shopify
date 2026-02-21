// components/FlyingItem.jsx
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from './CartProvider';

export default function FlyingItem() {
  const { isFlying } = useCart();

  return (
    <AnimatePresence>
      {isFlying && (
        <motion.div
          initial={{ 
            opacity: 1, 
            scale: 1, 
            x: "50vw", // Starts roughly where the button is
            y: "70vh" 
          }}
          animate={{ 
            opacity: 0.8,
            scale: 0.2,
            x: "90vw", // Flies toward the Cart button in the Navbar
            y: "2vh",
            rotate: 360
          }}
          transition={{ 
            duration: 0.8, 
            ease: [0.16, 1, 0.3, 1] // Custom cubic-bezier for a "tossed" feel
          }}
          className="fixed z-[100] w-12 h-12 bg-matcha rounded-full shadow-lg pointer-events-none flex items-center justify-center text-white"
        >
          ✨
        </motion.div>
      )}
    </AnimatePresence>
  );
}