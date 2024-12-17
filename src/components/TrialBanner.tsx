import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, X } from 'lucide-react';
import { Button } from './ui/button';
import { TrialStatus } from '../types/trial';

interface TrialBannerProps {
  trialStatus: TrialStatus;
  onClose: () => void;
}

const TrialBanner: React.FC<TrialBannerProps> = ({ trialStatus, onClose }) => {
  const navigate = useNavigate();

  if (!trialStatus.isActive) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 shadow-lg z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Clock className="w-6 h-6" />
          <div>
            <p className="font-medium">
              Ingyenes próbaidőszak: még {trialStatus.remainingDays} nap
            </p>
            <p className="text-sm text-blue-100">
              Próbáld ki az összes funkciót korlátozások nélkül!
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button
            onClick={() => navigate('/vcard')}
            className="bg-white text-blue-600 hover:bg-blue-50"
          >
            Előfizetés aktiválása
          </Button>
          <button
            onClick={onClose}
            className="text-white hover:text-blue-100"
            aria-label="Bezárás"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrialBanner;