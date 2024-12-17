import React, { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Gift, Star, Users, Lock, Check, Calendar, CreditCard, X, AlertCircle, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { VCardFormData } from '../../types/vcard';
import { PAYMENT_PLANS } from '../../lib/constants/plans';
import { TrialService } from '../../lib/services/trial-service';

interface OrderDialogProps {
  isOpen: boolean;
  onClose: () => void;
  formData: VCardFormData;
}

const OrderDialog: React.FC<OrderDialogProps> = ({ isOpen, onClose, formData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const plan = PAYMENT_PLANS[0];

  useEffect(() => {
    if (isOpen) {
      // @ts-ignore
      window.gtag?.('event', 'page_view', {
        page_title: 'Ingyenes próbaidőszak',
        page_path: '/trial',
        page_location: window.location.href
      });
    }
  }, [isOpen]);

  const startTrial = async () => {
    setError(null);
    
    if (!formData.email?.trim() || !formData.name?.trim()) {
      setError('A név és email cím megadása kötelező a próbaidőszak indításához');
      return;
    }

    setIsLoading(true);

    try {
      TrialService.startTrial(formData.email, formData.name);
      onClose();
      // Redirect to dashboard or success page
      window.location.href = '/success?trial=true';

    } catch (err) {
      setError('Hiba történt a próbaidőszak indítása során. Kérjük, próbálja újra.');
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
              14 napos ingyenes próbaidőszak
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

            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-6 text-white mb-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-2">Próbáld ki ingyen!</h3>
                  <p className="text-blue-100">14 napig minden funkció elérhető</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-white mb-4">
                  <Calendar className="w-5 h-5 text-blue-200" />
                  <span>14 nap után dönthetsz az előfizetésről</span>
                </div>
                <div className="flex items-center gap-2 text-white mb-4">
                  <CreditCard className="w-5 h-5 text-blue-200" />
                  <span>Nincs szükség bankkártya megadására</span>
                </div>
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-blue-200 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600 bg-gray-50 rounded-lg py-2">
                <span>🏢 100%-ban magyar vállalkozás</span>
              </div>

              <Button
                onClick={startTrial}
                className="w-full h-14 text-lg font-medium bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg hover:shadow-xl transition-all rounded-lg relative overflow-hidden"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Feldolgozás...
                  </>
                ) : (
                  <>
                    <Gift className="w-4 h-4 mr-2" />
                    Ingyenes elkészítés
                  </>
                )}
              </Button>

              <p className="text-center text-sm text-gray-500">
                Nincs rejtett költség vagy automatikus levonás
              </p>

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