
import type { AppProps } from 'next/app';
import React, { useEffect } from 'react';
import Head from 'next/head';
import '@/styles/globals.css';
import { Header } from '@/src/components/Header';
import { Footer } from '@/src/components/Footer';
import { CartProvider } from '@/src/context/CartContext';
import { FavoritesProvider } from '@/src/context/FavoritesContext';
import { AuthProvider, useAuth } from '@/src/context/AuthContext';
import { ProductProvider } from '@/src/context/ProductContext';
import { SettingsProvider, useSettings } from '@/src/context/SettingsContext';
import { UserAuthProvider } from '@/src/context/UserAuthContext';
import { useRouter } from 'next/router';

const AppContent: React.FC<{ Component: React.ElementType, pageProps: any }> = ({ Component, pageProps }) => {
  const { settings } = useSettings();
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  
  const isAdminRoute = router.pathname.startsWith('/admin');
  const isProtectedRoute = isAdminRoute && router.pathname !== '/admin/login';

  useEffect(() => {
    // Client-side route protection for admin
    if (isProtectedRoute && !isAuthenticated) {
      router.replace(`/admin/login?from=${router.asPath}`);
    }
  }, [router, isAuthenticated, isProtectedRoute]);
  
  // Render a loading state or nothing while redirecting
  if (isProtectedRoute && !isAuthenticated) {
      return null;
  }
  
  const isAuthPage = router.pathname === '/login' || router.pathname === '/signup';

  return (
    <div className="min-h-screen flex flex-col font-sans" style={{ backgroundColor: settings.backgroundColor, color: settings.textColor }}>
      <Head>
        <title>Yasir Perfumes - The Essence of Luxury</title>
        <meta name="description" content="A modern, responsive e-commerce website for Yasir Perfumes, showcasing a collection of luxury fragrances." />
        <meta name="google-site-verification" content="-UMg7pj2yTZ21vaaiPOCDDULU1s1-Qz3ZGAnnVnA_Vg" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!isAdminRoute && !isAuthPage && <Header />}
      <main className="flex-grow">
        <Component {...pageProps} />
      </main>
      {!isAdminRoute && !isAuthPage && <Footer />}
    </div>
  );
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <UserAuthProvider>
        <ProductProvider>
          <CartProvider>
            <FavoritesProvider>
              <SettingsProvider>
                <AppContent Component={Component} pageProps={pageProps} />
              </SettingsProvider>
            </FavoritesProvider>
          </CartProvider>
        </ProductProvider>
      </UserAuthProvider>
    </AuthProvider>
  );
}

export default MyApp;
