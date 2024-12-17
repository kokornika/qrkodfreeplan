import React from 'react';
import { ArrowDown } from 'lucide-react';
import { Button } from '../ui/button';
import VCardPreview from './VCardPreview';
import { VCardFormData } from '../../types/vcard';

interface VCardMobilePreviewProps {
  formData: VCardFormData;
  vCardString: string;
  isValid: boolean;
  onScrollToForm: () => void;
}

const VCardMobilePreview: React.FC<VCardMobilePreviewProps> = ({
  formData,
  vCardString,
  isValid,
  onScrollToForm
}) => {
  return (
    <div className="block lg:hidden mb-6">
      <div className="bg-gray-50 p-4 rounded-xl">
        <div className="mb-6">
          <Button
            onClick={onScrollToForm}
            className="w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl border-2 border-white/20 hover:scale-[1.02] group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <div className="relative flex items-center justify-center gap-2">
              <ArrowDown className="w-5 h-5 animate-bounce" />
              <span>Kitöltés megkezdése</span>
            </div>
          </Button>
        </div>
        <VCardPreview 
          formData={formData} 
          vCardString={vCardString}
          isValid={isValid}
        />
      </div>
    </div>
  );
};

export default VCardMobilePreview;