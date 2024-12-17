import { VCardFormData } from '../../types/vcard';
import { ValidationError } from '../errors/order-errors';

export function validateOrderData(formData: VCardFormData) {
  if (!formData.name?.trim()) {
    throw new ValidationError('Név megadása kötelező a megrendeléshez');
  }
  if (!formData.email?.trim()) {
    throw new ValidationError('Email cím megadása kötelező a megrendeléshez');
  }
  if (!isValidEmail(formData.email)) {
    throw new ValidationError('Érvénytelen email cím formátum');
  }
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}