import React, { useState } from 'react';
import { VCardFormData } from '../../types/vcard';
import VCardPreview from './VCardPreview';
import { X } from 'lucide-react';

interface FloatingPreviewProps {
  formData: VCardFormData;
  isVisible: boolean;
}

const FloatingPreview: React.FC<FloatingPreviewProps> = ({ 
  formData, 
  isVisible
}) => {
  // Hide on desktop and when dismissed
  if (window.innerWidth >= 1024) return null;

  return (
    <div 
      className={`fixed top-24 right-4 w-[280px] transition-all duration-500 transform lg:hidden ${
        isVisible ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-full opacity-0 scale-95 pointer-events-none'
      }`}
    >
      <div className="relative">
        <div className="transform scale-[0.6] origin-top-right bg-white rounded-xl shadow-lg">
          <VCardPreview 
            formData={formData}
            vCardString=""
            isValid={true}
            isFloating={true}
          />
        </div>
      </div>
    </div>
  );
};

export default FloatingPreview;