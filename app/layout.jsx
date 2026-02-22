import './global.css';
import { Inter } from 'next/font/google';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CartProvider } from '../components/CartProvider';
import FlyingItem from '@/components/FlyingItem';

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
          <FlyingItem />
          <main className="min-h-screen pt-40">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}