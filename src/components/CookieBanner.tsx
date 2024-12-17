import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white border border-gray-200 rounded-t-lg shadow-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600 text-center sm:text-left">
            Ez a weboldal cookie-kat használ a jobb felhasználói élmény érdekében.{' '}
            <Link to="/privacy" className="text-blue-600 hover:text-blue-700 underline">
              További információ
            </Link>
          </p>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={handleReject}
              className="px-4 py-2 rounded-md text-sm font-medium border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Elutasítom
            </button>
            <button
              onClick={handleAccept}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Elfogadom
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-400 hover:text-gray-500 p-2"
              aria-label="Bezárás"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;