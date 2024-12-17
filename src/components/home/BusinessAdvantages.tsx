import React from 'react';
import { TrendingUp, PiggyBank, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

const BusinessAdvantages = () => {
  return (
    <section className="py-8 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-12">
          Hogyan legyek sikeresebb vállalkozó digitális névjegykártyával?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 sm:w-16 h-12 sm:h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-center">Növekvő üzleti lehetőségek</h3>
            <p className="text-gray-600 text-center text-sm sm:text-base">
              Azonnali kapcsolatfelvétel és professzionális megjelenés
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 sm:w-16 h-12 sm:h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <PiggyBank className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-center">Költséghatékony megoldás</h3>
            <p className="text-gray-600 text-center text-sm sm:text-base">
              Nincs több nyomtatási és újranyomtatási költség
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all sm:col-span-2 lg:col-span-1">
            <div className="w-12 sm:w-16 h-12 sm:h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-center">Hatékonyabb networking</h3>
            <p className="text-gray-600 text-center text-sm sm:text-base">
              Egyszerű megosztás és azonnali mentés
            </p>
          </div>
          
          {/* CTA after advantages */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-3 mt-8 text-center">
            <Link to="/vcard">
              <Button 
                className="w-full sm:w-auto h-12 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all rounded-xl"
              >
                Kipróbálom a digitális névjegykártyát
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessAdvantages;