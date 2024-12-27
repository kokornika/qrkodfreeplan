import React from 'react';
import HeroSection from './home/HeroSection';
import TraditionalCardDisadvantages from './home/TraditionalCardDisadvantages';
import ComparisonSection from './home/ComparisonSection';
import BenefitsSection from './BenefitsSection';
import FAQSection from './home/FAQSection';
import ROICalculator from './home/ROICalculator';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      <HeroSection />
      <h1 className="sr-only">Digitális Névjegykártya Készítés és QR Kód Generálás</h1>
      <TraditionalCardDisadvantages />
      <ComparisonSection />
      <ROICalculator />
      <BenefitsSection />
      <FAQSection />
    </div>
  );
};

export default HomePage;