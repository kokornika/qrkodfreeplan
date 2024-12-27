import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, X } from 'lucide-react';
import { Button } from '../ui/button';

const disadvantages = [
  {
    title: "Költséges nyomtatás",
    description: "Folyamatos nyomtatási költségek, különösen ha változnak az adatok"
  },
  {
    title: "Környezetszennyező",
    description: "Felesleges papír és festékhasználat, nem környezetbarát"
  },
  {
    title: "Hamar elavul",
    description: "Pozíció vagy elérhetőség változásakor az összes kártya használhatatlanná válik"
  },
  {
    title: "Korlátozott információ",
    description: "Csak alapvető kontakt információk férnek el rajta"
  },
  {
    title: "Könnyen elvész",
    description: "Fizikai kártyák gyakran elkallódnak vagy megsérülnek"
  },
  {
    title: "Nehéz rendszerezni",
    description: "Kapott névjegyek tárolása és rendszerezése körülményes"
  }
];

const TraditionalCardDisadvantages = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Image */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1616628188859-7a11abb6fcc9?auto=format&fit=crop&q=80&w=2000&h=1500"
              alt="Hagyományos papír névjegykártyák"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-red-50 p-4 rounded-xl shadow-lg border border-red-100">
              <p className="text-red-600 font-medium text-sm">
                A papír névjegykártyák kora lejárt!
              </p>
            </div>
          </div>

          {/* Right side - Disadvantages */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Miért mondj búcsút a papír névjegykártyáknak?
            </h2>
            
            <div className="space-y-4">
              {disadvantages.map((item, index) => (
                <div key={index} className="flex items-start gap-3 bg-red-50 p-4 rounded-xl">
                  <div className="mt-1">
                    <X className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link to="/vcard">
                <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all">
                  Váltok digitális névjegykártyára
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TraditionalCardDisadvantages;