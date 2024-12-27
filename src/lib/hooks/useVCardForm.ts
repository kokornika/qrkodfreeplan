import { useState, useEffect } from 'react';
import { VCardFormData, defaultVCardData } from '../../types/vcard';
import { ValidationError, validateVCardForm, formatPhone, validateEmail, validatePhoneNumber } from '../validation/vcard-validation';

export const useVCardForm = () => {
  const [formData, setFormData] = useState<VCardFormData>(defaultVCardData);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showOrderDialog, setShowOrderDialog] = useState(false);
  const [showValidationError, setShowValidationError] = useState(false);
  const [hasStartedEditing, setHasStartedEditing] = useState(false);
  const [showFloatingPreview, setShowFloatingPreview] = useState(false);
  const [hasShownPreview, setHasShownPreview] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const isFormValid = () => {
    return (
      formData.name.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.phoneMobile.trim() !== '' &&
      validateEmail(formData.email) &&
      validatePhoneNumber(formData.phoneMobile)
    );
  };

  const handleOrderClick = () => {
    if (isFormValid()) {
      setShowOrderDialog(true);
      setShowValidationError(false);
    } else {
      setShowValidationError(true);
      setTouched(prev => ({
        ...prev,
        name: true,
        email: true,
        phoneMobile: true
      }));
    }
  };

  const handleChange = (field: keyof VCardFormData, value: any) => {
    let processedValue = value;

    // Only try to trim string values
    if (!hasInteracted && typeof value === 'string' && value.trim() !== '') {
      setHasInteracted(true);
      showTemporaryPreview();
    }

    if (field === 'phoneMobile' || field === 'phoneWork' || field === 'phonePrivate') {
      processedValue = formatPhone(value);
    }

    setFormData(prev => ({
      ...prev,
      [field]: processedValue
    }));

    setTouched(prev => ({
      ...prev,
      [field]: true
    }));

    if (!hasStartedEditing && (
      (typeof processedValue === 'string' && processedValue.trim()) || 
      (Array.isArray(processedValue) && processedValue.length > 0)
    )) {
      setHasStartedEditing(true);
    }
  };

  const showTemporaryPreview = () => {
    if (hasShownPreview) return;
    
    setShowFloatingPreview(true);
    setHasShownPreview(true);

    setTimeout(() => {
      setShowFloatingPreview(false);
    }, 5000);
  };

  useEffect(() => {
    const touchedFields = Object.keys(touched).filter(key => touched[key]);
    if (touchedFields.length > 0) {
      const validationErrors = validateVCardForm(formData);
      setErrors(validationErrors.filter(error => 
        touchedFields.includes(error.field)
      ));
    }
  }, [formData, touched]);

  const getFieldError = (field: string): string | undefined => {
    const error = errors.find(e => e.field === field);
    return touched[field] ? error?.message : undefined;
  };

  return {
    formData,
    errors,
    touched,
    showOrderDialog,
    showValidationError,
    hasStartedEditing,
    showFloatingPreview,
    isFormValid,
    handleOrderClick,
    handleChange,
    getFieldError,
    setShowOrderDialog,
    setShowValidationError
  };
};