import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ProductGrid from './components/ProductGrid';
import TechnicalBanner from './components/TechnicalBanner';
import Footer from './components/Footer';
import heroImage from 'figma:asset/b1f0350835d6d5ebd8b0dba7a134bc419735e77f.png';

export default function App() {
  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <main>
        <HeroSection heroImage={heroImage} />
        <TechnicalBanner />
        <ProductGrid />
      </main>
      <Footer />
    </div>
  );
}