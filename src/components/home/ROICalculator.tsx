import React, { useState } from 'react';
import { Calculator, TrendingUp, PiggyBank, Printer, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Slider } from '../ui/Slider';

const ROICalculator = () => {
  const [employees, setEmployees] = useState(1);
  const [cardsPerYear, setCardsPerYear] = useState(100);

  // Költségek
  const traditionalCosts = {
    cardPrice: 100, // 100 Ft/db
    shippingPrice: 2000, // 2000 Ft/csomag
    yearlyShipments: Math.ceil((employees * cardsPerYear) / 100) // Feltételezzük, hogy egy csomag 100 db kártyát tartalmaz
  };

  // Hagyományos névjegyek éves költsége
  const yearlyTraditionalCost = 
    (employees * cardsPerYear * traditionalCosts.cardPrice) + 
    (traditionalCosts.shippingPrice * traditionalCosts.yearlyShipments);

  // Digitális névjegy éves költsége (5990 Ft/fő/év)
  const yearlyDigitalCost = employees * 5990;

  // Éves megtakarítás
  const yearlySavings = yearlyTraditionalCost - yearlyDigitalCost;

  // Környezeti hatás (becsült értékek)
  const environmentalImpact = {
    paper: cardsPerYear * employees * 0.004, // kg papír (4g/kártya)
    co2: cardsPerYear * employees * 0.01 // kg CO2 (nyomtatás + szállítás)
  };

  return (
    <section className="py-8 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
            Költségkalkulátor
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            Számolja ki, mennyit spórolhat a digitális névjegykártyával
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Kalkulátor */}
          <div className="bg-gray-50 p-4 sm:p-6 rounded-xl">
            <div className="space-y-12">
              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-6 sm:mb-8">
                  Hány munkatársnak van szüksége névjegykártyára?
                </label>
                <div className="px-2 sm:px-4 pt-4 sm:pt-6">
                  <Slider
                    value={employees}
                    min={1}
                    max={50}
                    step={1}
                    onChange={(value) => setEmployees(value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-6 sm:mb-8">
                  Átlagosan hány névjegykártyára van szükség évente személyenként?
                </label>
                <div className="px-2 sm:px-4 pt-4 sm:pt-6">
                  <Slider
                    value={cardsPerYear}
                    min={50}
                    max={500}
                    step={50}
                    onChange={(value) => setCardsPerYear(value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Eredmények */}
          <div className="space-y-6">
            {/* Költségek összehasonlítása */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-red-50 p-4 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <Printer className="w-5 h-5 text-red-600" />
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Hagyományos</h3>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-red-600">
                  {yearlyTraditionalCost.toLocaleString()} Ft
                </p>
                <p className="text-xs sm:text-sm text-gray-600">évente</p>
              </div>

              <div className="bg-green-50 p-4 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <Calculator className="w-5 h-5 text-green-600" />
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Digitális</h3>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-green-600">
                  {yearlyDigitalCost.toLocaleString()} Ft
                </p>
                <p className="text-xs sm:text-sm text-gray-600">évente</p>
              </div>
            </div>

            {/* Megtakarítás */}
            <div className="bg-blue-50 p-4 sm:p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <PiggyBank className="w-6 h-6 text-blue-600" />
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Éves megtakarítás</h3>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">
                {yearlySavings.toLocaleString()} Ft
              </p>
              <div className="space-y-2">
                <p className="text-xs sm:text-sm text-gray-600 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  {environmentalImpact.paper.toFixed(1)} kg papír megtakarítás
                </p>
                <p className="text-xs sm:text-sm text-gray-600 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  {environmentalImpact.co2.toFixed(1)} kg CO₂ kibocsátás csökkentés
                </p>
              </div>
            </div>
          </div>
          
          {/* CTA after calculator */}
          <div className="mt-8 text-center">
            <Link to="/vcard">
              <Button 
                className="w-full sm:w-auto h-12 px-8 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl transition-all rounded-xl"
              >
                Spórolok a digitális névjegykártyával
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;