import React, { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Loader2, Check, CreditCard, Star, Users, Lock, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { VCardFormData } from '../../types/vcard';
import { PAYMENT_PLANS } from '../../lib/constants/plans';
import { stripeService } from '../../lib/services/stripe-service';
import { OrderError, ValidationError } from '../../lib/errors/order-errors';

interface OrderDialogProps {
  isOpen: boolean;
  onClose: () => void;
  formData: VCardFormData;
}

const OrderDialog: React.FC<OrderDialogProps> = ({ isOpen, onClose, formData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const plan = PAYMENT_PLANS[0];

  // GA4 esemény küldése amikor megnyílik a dialógus
  useEffect(() => {
    if (isOpen) {
      // @ts-ignore
      window.gtag?.('event', 'page_view', {
        page_title: 'Megrendelés',
        page_path: '/order',
        page_location: window.location.href
      });
    }
  }, [isOpen]);

  const validateForm = () => {
    if (!formData.email?.trim()) {
      setError('Az email cím megadása kötelező a megrendeléshez');
      return false;
    }

    if (!formData.name?.trim()) {
      setError('A név megadása kötelező a megrendeléshez');
      return false;
    }

    if (!acceptTerms) {
      setError('Kérjük, fogadja el az Általános Szerződési Feltételeket a folytatáshoz');
      return false;
    }

    return true;
  };

  const handleOrder = async () => {
    setError(null);

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Store form data in session storage
      sessionStorage.setItem('orderData', JSON.stringify({
        formData,
        plan
      }));

      // Create Stripe checkout session
      await stripeService.createPaymentSession({
        name: formData.name,
        email: formData.email,
        company: formData.company
      }, plan);

    } catch (err) {
      let errorMessage = 'Hiba történt a megrendelés során. Kérjük, próbálja újra később.';
      
      if (err instanceof ValidationError) {
        errorMessage = err.message;
      } else if (err instanceof OrderError) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      console.error('Order error:', err);
      setIsLoading(false);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]" />
        <Dialog.Content className="fixed inset-x-0 bottom-0 sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 w-full sm:max-w-md bg-white rounded-t-2xl sm:rounded-2xl shadow-xl z-[60] h-[600px] sm:h-[680px]">
          <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-100 flex justify-between items-center rounded-t-2xl">
            <Dialog.Title className="text-xl font-bold text-gray-900">
              Digitális névjegykártya megrendelése
            </Dialog.Title>
            <Dialog.Close className="text-gray-400 hover:text-gray-500">
              <X className="w-5 h-5" />
            </Dialog.Close>
          </div>

          <div className="p-6 space-y-4 bg-white h-[calc(100%-64px)] overflow-y-auto">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium text-red-600 mb-1">Hiba történt</h4>
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              </div>
            )}

            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-4 text-white mb-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  <p className="text-indigo-100">Minden, amire szüksége lehet</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">{plan.price.toLocaleString()} Ft</div>
                  <div className="text-indigo-100">/{plan.period}</div>
                </div>
              </div>
              
              <div className="space-y-2">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-indigo-200 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-start gap-2 mb-4">
              <div className="flex items-center h-5 mt-1">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </div>
              <div className="text-xs sm:text-sm">
                <p className="text-gray-600">
                  Elolvastam és elfogadom az{' '}
                  <Link
                    to="/terms"
                    target="_blank"
                    className="text-blue-600 hover:text-blue-700 underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Általános Szerződési Feltételeket
                  </Link>
                  {' '}és az{' '}
                  <Link
                    to="/privacy"
                    target="_blank"
                    className="text-blue-600 hover:text-blue-700 underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Adatkezelési tájékoztatót
                  </Link>
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600 bg-gray-50 rounded-lg py-2">
                <span>🏢 100%-ban magyar vállalkozás</span>
              </div>

              <Button
                onClick={handleOrder}
                className="w-full h-14 text-lg font-medium bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg hover:shadow-xl transition-all rounded-lg relative overflow-hidden"
                disabled={isLoading || !acceptTerms}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Feldolgozás...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 mr-2" />
                    Megrendelem
                  </>
                )}
              </Button>

              {/* Stripe Payment Text */}
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-2">
                <Lock className="w-4 h-4" />
                <span>Biztonságos fizetés a Stripe rendszerén keresztül</span>
              </div>

              {/* Social Proof */}
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-medium text-gray-900">4.9/5</span>
                  </div>
                  <span className="text-xs text-gray-600 mt-1 block">értékelés</span>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span className="font-medium text-gray-900">300+</span>
                  </div>
                  <span className="text-xs text-gray-600 mt-1 block">megrendelés</span>
                </div>
              </div>
              
              {/* Payment Methods */}
              <div className="flex items-center justify-center gap-4 mt-3 py-4 bg-white">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg"
                  alt="Apple Pay"
                  className="h-5 opacity-75"
                />
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg"
                  alt="Google Pay"
                  className="h-5 opacity-75"
                />
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default OrderDialog;