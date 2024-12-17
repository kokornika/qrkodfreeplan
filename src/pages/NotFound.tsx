import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <SEO 
        title="404 - Az oldal nem található | QRNevjegy"
        description="A keresett oldal nem található. Térjen vissza a főoldalra vagy próbáljon más oldalakat böngészni."
      />
      
      <div className="max-w-2xl mx-auto px-4 py-16 sm:px-6 sm:py-24">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            A keresett oldal nem található
          </h2>
          <p className="text-gray-600 mb-8">
            Sajnáljuk, de a keresett oldal nem található. Az oldal lehet, hogy törölve lett,
            vagy megváltozott a címe.
          </p>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                to="/"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Home className="w-5 h-5" />
                Vissza a főoldalra
              </Link>
              <Link
                to="/blog"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Search className="w-5 h-5" />
                Blog böngészése
              </Link>
            </div>

            <div className="pt-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Hasznos linkek
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <Link to="/guide" className="hover:text-blue-600">
                    Útmutató a digitális névjegykártyákhoz
                  </Link>
                </li>
                <li>
                  <Link to="/vcard" className="hover:text-blue-600">
                    Digitális névjegykártya készítése
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="hover:text-blue-600">
                    Blog és hírek
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;