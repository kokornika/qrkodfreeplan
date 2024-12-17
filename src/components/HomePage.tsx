import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import HeroSection from './home/HeroSection';
import BusinessAdvantages from './home/BusinessAdvantages';
import ComparisonSection from './home/ComparisonSection';
import BenefitsSection from './BenefitsSection';
import FAQSection from './home/FAQSection';
import ROICalculator from './home/ROICalculator';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      <HeroSection />
      <h1 className="sr-only">Digitális Névjegykártya Készítés és QR Kód Generálás</h1>
      <BusinessAdvantages />
      <ComparisonSection />
      <ROICalculator />
      <BenefitsSection />
      <FAQSection />

      {/* Mobile-optimized CTA Section */}
      <section className="py-8 sm:py-16 bg-gradient-to-b from-gray-50 to-white px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
            Készítsen digitális névjegykártyát még ma!
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
            Csatlakozzon azokhoz, akik már felfedezték a digitális névjegykártyák előnyeit. 
            Modern megoldásunk segít az üzleti kapcsolatok hatékony építésében.
          </p>
          
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <Link
              to="/guide"
              className="flex items-center justify-center px-6 py-4 sm:py-3 rounded-xl sm:rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
            >
              Részletes útmutató
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/vcard"
              className="flex items-center justify-center px-6 py-4 sm:py-3 rounded-xl sm:rounded-lg border-2 border-blue-600 text-blue-600 font-medium hover:bg-blue-50 transition-all"
            >
              Azonnali névjegykártya készítés
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;