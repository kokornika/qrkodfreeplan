export interface VCardFormData {
  name: string;
  company: string;
  position: string;
  website: string;
  phoneMobile: string;
  phoneWork: string;
  phonePrivate: string;
  email: string;
  zipcode: string;
  city: string;
  street: string;
  description: string;
  profilePicture?: string;
  backgroundColor: string;
  backgroundType: 'solid' | 'gradient';
  socialLinks: {
    platform: string;
    url: string;
  }[];
}

export const defaultVCardData: VCardFormData = {
  name: '',
  company: '',
  position: '',
  website: '',
  phoneMobile: '',
  phoneWork: '',
  phonePrivate: '',
  email: '',
  zipcode: '',
  city: '',
  street: '',
  description: '',
  profilePicture: '',
  backgroundColor: '#6366F1',
  backgroundType: 'gradient',
  socialLinks: []
};