import { VCardFormData } from '../../types/vcard';

export const generateVCardString = (formData: VCardFormData): string => {
  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${formData.name.split(' ').reverse().join(';')};`,
    `FN:${formData.name}`,
    formData.company && `ORG:${formData.company}`,
    formData.position && `TITLE:${formData.position}`,
    formData.email && `EMAIL:${formData.email}`,
    formData.phoneMobile && `TEL;TYPE=CELL:${formData.phoneMobile}`,
    formData.phoneWork && `TEL;TYPE=WORK:${formData.phoneWork}`,
    formData.phonePrivate && `TEL;TYPE=HOME:${formData.phonePrivate}`,
    formData.website && `URL:${formData.website}`,
    formData.street && formData.city && `ADR:;;${formData.street};${formData.city};;${formData.zipcode};`,
    formData.description && `NOTE:${formData.description}`,
    ...formData.socialLinks.map(link => `URL;type=${link.platform}:${link.url}`),
    'END:VCARD'
  ].filter(Boolean).join('\n');

  return vcard;
};