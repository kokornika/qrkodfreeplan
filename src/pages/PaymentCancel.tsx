import React from 'react';
import { Link } from 'react-router-dom';
import { XCircle, ArrowLeft } from 'lucide-react';

const PaymentCancel: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto pt-8 sm:pt-16">
      <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 text-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6">
          <XCircle className="w-full h-full text-red-500" />
        </div>
        
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          Fizetés megszakítva
        </h1>
        
        <p className="text-gray-600 mb-8">
          A fizetési folyamat megszakadt vagy sikertelen volt.
          Kérjük, próbáld meg újra, vagy válassz másik fizetési módot.
        </p>

        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Vissza a főoldalra</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PaymentCancel;