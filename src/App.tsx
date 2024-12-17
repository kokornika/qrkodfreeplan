import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import CookieBanner from './components/CookieBanner';
import HomePage from './components/HomePage';
import VCardForm from './components/vcard/VCardForm';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentCancel from './pages/PaymentCancel';
import Blog from './pages/Blog';
import BlogPost1 from './pages/BlogPost1';
import BlogPost2 from './pages/BlogPost2';
import BlogPost3 from './pages/BlogPost3';
import BlogPost4 from './pages/BlogPost4';
import BlogPost5 from './pages/BlogPost5'; // Add new import
import Guide from './pages/Guide';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import NotFound from './pages/NotFound';
import SEO from './components/SEO';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <SEO />
          <Helmet>
            <html lang="hu" />
            <meta name="theme-color" content="#6366F1" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/site.webmanifest" />
          </Helmet>
          
          <Header />
          <main className="flex-grow pt-16">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/guide" element={<Guide />} />
              <Route path="/vcard" element={
                <div className="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
                    Digitális névjegykártya készítése
                  </h2>
                  <VCardForm />
                </div>
              } />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/1" element={<BlogPost1 />} />
              <Route path="/blog/2" element={<BlogPost2 />} />
              <Route path="/blog/3" element={<BlogPost3 />} />
              <Route path="/blog/4" element={<BlogPost4 />} />
              <Route 
                path="/blog/digitalis-nevjegykartya-keszites-vallalkozasoknak" 
                element={<BlogPost5 />} 
              />
              <Route path="/success" element={<PaymentSuccess />} />
              <Route path="/cancel" element={<PaymentCancel />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <CookieBanner />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;