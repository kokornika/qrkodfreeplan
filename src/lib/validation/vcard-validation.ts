import { validatePhoneNumber, normalizePhoneNumber } from '../utils/phone-utils';

export interface ValidationError {
  field: string;
  message: string;
}

export function validatePhoneNumber(phone: string): boolean {
  if (!phone) return false;
  const cleanPhone = phone.replace(/[^\d+]/g, '');
  return cleanPhone.length >= 11 && /^(\+36|06|36)?[ -]?(20|30|31|50|70)[ -]?\d{3}[ -]?\d{4}$/.test(cleanPhone);
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function formatPhone(phone: string): string {
  return normalizePhoneNumber(phone);
}

export function validateVCardForm(formData: {
  name: string;
  email: string;
  phoneMobile: string;
}): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!formData.name.trim()) {
    errors.push({
      field: 'name',
      message: 'A név megadása kötelező'
    });
  }

  if (!formData.email.trim()) {
    errors.push({
      field: 'email',
      message: 'Az email cím megadása kötelező'
    });
  } else if (!validateEmail(formData.email)) {
    errors.push({
      field: 'email',
      message: 'Érvénytelen email cím formátum'
    });
  }

  if (!formData.phoneMobile.trim()) {
    errors.push({
      field: 'phoneMobile',
      message: 'A mobil telefonszám megadása kötelező'
    });
  } else if (formData.phoneMobile.replace(/[^\d+]/g, '').length >= 11 && !validatePhoneNumber(formData.phoneMobile)) {
    errors.push({
      field: 'phoneMobile',
      message: 'Érvénytelen telefonszám formátum'
    });
  }

  return errors;
}