import React, { useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { Button } from '../ui/button';
import VCardPersonalInfo from './VCardPersonalInfo';
import VCardContactInfo from './VCardContactInfo';
import VCardAddressInfo from './VCardAddressInfo';
import VCardAppearance from './VCardAppearance';
import VCardSocialLinks from './VCardSocialLinks';
import VCardPreview from './VCardPreview';
import FloatingPreview from './FloatingPreview';
import OrderDialog from './OrderDialog';
import { useVCardForm } from '../../lib/hooks/useVCardForm';
import { generateVCardString } from '../../lib/utils/vcard-generator';
import VCardFormContent from './VCardFormContent';
import VCardMobilePreview from './VCardMobilePreview';

const VCardForm: React.FC = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const {
    formData,
    showOrderDialog,
    showValidationError,
    hasStartedEditing,
    showFloatingPreview,
    handleOrderClick,
    handleChange,
    getFieldError,
    setShowOrderDialog,
    setShowValidationError,
    isFormValid
  } = useVCardForm();

  const scrollToForm = () => {
    if (formRef.current) {
      // Increased offset to scroll higher up
      const offset = 120; // Increased from 80 to 120
      const elementPosition = formRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: Math.max(0, offsetPosition), // Ensure we don't scroll past the top
        behavior: 'smooth'
      });
    }
  };

  const vCardString = generateVCardString(formData);

  return (
    <>
      <div className="flex flex-col lg:grid lg:grid-cols-[1fr,400px] gap-4 sm:gap-6 lg:gap-8 px-4">
        <VCardMobilePreview 
          formData={formData}
          vCardString={vCardString}
          isValid={isFormValid()}
          onScrollToForm={scrollToForm}
        />

        <div className="space-y-4 sm:space-y-6 lg:space-y-8" ref={formRef}>
          <VCardFormContent
            formData={formData}
            onChange={handleChange}
            getFieldError={getFieldError}
            onOrder={handleOrderClick}
            showValidationError={showValidationError}
            hasStartedEditing={hasStartedEditing}
            isFormValid={isFormValid()}
          />
        </div>

        <div className="hidden lg:block lg:sticky lg:top-24 h-fit">
          <VCardPreview 
            formData={formData} 
            vCardString={vCardString}
            isValid={isFormValid()}
          />
        </div>
      </div>

      <div className="h-20 lg:hidden" />

      <FloatingPreview 
        formData={formData} 
        isVisible={showFloatingPreview}
      />

      <OrderDialog 
        isOpen={showOrderDialog}
        onClose={() => {
          setShowOrderDialog(false);
          setShowValidationError(false);
        }}
        formData={formData}
      />
    </>
  );
};

export default VCardForm;