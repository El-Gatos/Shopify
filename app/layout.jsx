import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '../components/Navbar'; // <-- 1. Import it here
import { CartProvider } from '../components/CartProvider'; // <-- Import the provider

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Matcha Kitchen | Premium Tools', 
  description: 'Ditch the ugly plastic. Aesthetic kitchen tools for modern spaces.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased selection:bg-matcha selection:text-matcha-dark`}>
        <CartProvider>
          <Navbar />
          <main className="min-h-screen pt-20">
            {children}
          </main>
        </CartProvider>
        <Navbar />
        
        {/* 3. Add pt-20 here so your content doesn't hide under the sticky navbar */}
        <main className="min-h-screen pt-20">
          {children}
        </main>
        
      </body>
    </html>
  );
}