import React from 'react';
import { Check, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

const ComparisonSection = () => {
  return (
    <section className="py-8 sm:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-12 text-gray-900">
          Hagyományos vs. Digitális Névjegykártya
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <div className="bg-white/90 p-6 sm:p-8 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-gray-700">
              Hagyományos névjegykártya
            </h3>
            <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              <li className="flex items-center gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                  <X className="w-4 h-4 text-red-600" />
                </div>
                <span className="text-sm sm:text-base text-gray-700">Nyomtatási és újranyomtatási költségek</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                  <X className="w-4 h-4 text-red-600" />
                </div>
                <span className="text-sm sm:text-base text-gray-700">Környezetszennyező papír és festék használat</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                  <X className="w-4 h-4 text-red-600" />
                </div>
                <span className="text-sm sm:text-base text-gray-700">Statikus információk, nem frissíthető</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                  <X className="w-4 h-4 text-red-600" />
                </div>
                <span className="text-sm sm:text-base text-gray-700">Korlátozott információmennyiség</span>
              </li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 sm:p-8 rounded-xl shadow-lg text-white">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Digitális névjegykártya</h3>
            <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              <li className="flex items-center gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm sm:text-base">Egyszeri befektetés, korlátlan megosztás</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm sm:text-base">Környezetbarát, papírmentes megoldás</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm sm:text-base">Részletes üzleti profil és portfólió</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm sm:text-base">Korlátlan tartalom és média lehetőségek</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4 mt-8 sm:mt-12">
          <Link to="/guide">
            <Button 
              variant="outline" 
              className="w-full sm:w-auto py-4 sm:py-2 text-base sm:text-sm rounded-xl sm:rounded-lg"
            >
              Részletes útmutató
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link to="/vcard">
            <Button 
              className="w-full sm:w-auto py-4 sm:py-2 text-base sm:text-sm rounded-xl sm:rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl"
            >
              Digitális névjegyet készítek
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;