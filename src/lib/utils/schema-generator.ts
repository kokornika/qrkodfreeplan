import { VCardFormData } from '../../types/vcard';

export const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "QRNevjegy",
  "url": "https://qrnevjegy.hu",
  "logo": "https://qrnevjegy.hu/logo.png",
  "description": "Digitális névjegykártya készítő szolgáltatás - Modern megoldás üzleti kapcsolatépítéshez",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Sióagárd",
    "postalCode": "7171",
    "streetAddress": "Deák u. 6.",
    "addressCountry": "HU"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+36-30-355-1793",
    "contactType": "customer service",
    "email": "info@qrnevjegy.hu",
    "availableLanguage": "Hungarian"
  }
});

export const generateProductSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Digitális Névjegykártya",
  "description": "Modern, környezetbarát digitális névjegykártya szolgáltatás QR kóddal",
  "brand": {
    "@type": "Brand",
    "name": "QRNevjegy"
  },
  "offers": {
    "@type": "Offer",
    "price": "5990",
    "priceCurrency": "HUF",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "QRNevjegy"
    }
  }
});

export const generateBreadcrumbSchema = (path: string) => {
  const parts = path.split('/').filter(Boolean);
  const items = parts.map((part, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": part.charAt(0).toUpperCase() + part.slice(1),
    "item": `https://qrnevjegy.hu/${parts.slice(0, index + 1).join('/')}`
  }));

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items
  };
};