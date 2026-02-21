'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="bg-matcha-light min-h-[80vh] flex flex-col justify-center items-center text-center px-6">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-5xl md:text-7xl font-bold text-matcha-dark mb-6 tracking-tight"
      >
        Kitchen tools, <br/> but make it aesthetic.
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="text-lg md:text-xl text-gray-700 max-w-lg mb-8"
      >
        Ditch the ugly plastic. Upgrade your counter space with stuff that actually looks good.
      </motion.p>

      <motion.button 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-matcha text-matcha-dark font-semibold py-4 px-10 rounded-full shadow-md hover:bg-matcha-dark hover:text-white transition-colors"
      >
        Shop the Collection
      </motion.button>
    </section>
  );
}