import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, ArrowLeft, Loader2 } from 'lucide-react';
import { orderService } from '../lib/services/order-service';
import { TrialService } from '../lib/services/trial-service';

const PaymentSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const sessionId = searchParams.get('session_id');
  const orderId = searchParams.get('order_id');
  const isTrial = searchParams.get('trial') === 'true';

  const processOrder = useCallback(async () => {
    if (isTrial) {
      const orderData = sessionStorage.getItem('orderData');
      if (!orderData) {
        setError('Hiányzó megrendelési adatok');
        setIsLoading(false);
        return;
      }

      const { formData } = JSON.parse(orderData);
      try {
        await TrialService.startTrial(formData.email, formData.name);
        sessionStorage.removeItem('orderData');
      } catch (err) {
        setError('Hiba történt a próbaidőszak aktiválása során');
        console.error('Trial activation error:', err);
      }
      setIsLoading(false);
      return;
    }

    if (!sessionId || !orderId) {
      setError('Érvénytelen munkamenet azonosító');
      setIsLoading(false);
      return;
    }

    try {
      await orderService.completeOrder(sessionId, orderId);
    } catch (error) {
      console.error('Order processing error:', error);
      setError(error instanceof Error ? error.message : 'Hiba történt a megrendelés feldolgozása során');
    } finally {
      setIsLoading(false);
    }
  }, [sessionId, orderId, isTrial]);
  useEffect(() => {
    processOrder();
  }, [processOrder]);

  return (
    <div className="max-w-2xl mx-auto pt-8 sm:pt-16">
      <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 text-center">
        {isLoading ? (
          <div className="py-8">
            <Loader2 className="w-16 h-16 text-blue-500 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Megrendelés feldolgozása...</p>
          </div>
        ) : error ? (
          <>
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 text-red-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Hiba történt
            </h1>
            <p className="text-gray-600 mb-8">{error}</p>
          </>
        ) : (
          <>
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6">
              <CheckCircle2 className="w-full h-full text-green-500" />
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Sikeres fizetés!
            </h1>
            
            <div className="space-y-4 text-center">
              <p className="text-lg text-gray-700">
                Köszönjük a megrendelést! <br />
                {isTrial ? 'A próbaidőszak aktiválva! Emailben elküldtük a további tudnivalókat.' : 'A megrendelés részleteiről emailt küldtünk a megadott email címre.'}
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  {isTrial ? 'A digitális névjegykártyád azonnal használatra kész!' : 'Kollégáink 24 órán belül elkészítik és emailben elküldik a digitális névjegykártyád weboldalát.'}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 mb-2">
                  Amennyiben bármilyen kérdésed lenne, írj nekünk az alábbi címre:
                </p>
                <a 
                  href="mailto:info@qrnevjegy.hu"
                  className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  info@qrnevjegy.hu
                </a>
              </div>
            </div>
          </>
        )}

        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 font-medium mt-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Vissza a főoldalra</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
