import './global.css';
import { Inter } from 'next/font/google';
import SiteHeader from '../components/SiteHeader';
import Footer from '../components/Footer';
import { CartProvider } from '../components/CartProvider';
import { AccountProvider } from '../components/AccountProvider';
import FlyingItem from '@/components/FlyingItem';

const inter = Inter({ subsets: ['latin'] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata = {
  title: 'Urban Utensil | Premium Kitchen Tools',
  description: 'Thoughtfully designed kitchen essentials for modern spaces.',
  icons: { icon: '/logo.png', apple: '/logo.png' },
  openGraph: {
    title: 'Urban Utensil | Premium Kitchen Tools',
    description: 'Thoughtfully designed kitchen essentials for modern spaces.',
    url: siteUrl, siteName: 'Urban Utensil',
    images: [{ url: `${siteUrl}/logo.png`, width: 800, height: 600, alt: 'Urban Utensil' }],
    locale: 'en_US', type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Urban Utensil | Premium Kitchen Tools',
    description: 'Thoughtfully designed kitchen essentials for modern spaces.',
    images: [`${siteUrl}/logo.png`],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`} style={{ background: '#fdfdfc', color: '#111827' }} suppressHydrationWarning>
        <AccountProvider>
          <CartProvider>
            <SiteHeader />
            <FlyingItem />
            <main style={{ minHeight: '100vh', paddingTop: 'var(--header-height, 158px)' }}>
              {children}
            </main>
            <Footer />
          </CartProvider>
        </AccountProvider>
      </body>
    </html>
  );
}