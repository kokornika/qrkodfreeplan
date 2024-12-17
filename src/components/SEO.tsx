import React from 'react';
import { useLocation } from 'react-router-dom';
import { generateOrganizationSchema, generateProductSchema, generateBreadcrumbSchema } from '../lib/utils/schema-generator';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  article?: boolean;
}

const SEO: React.FC<SEOProps> = ({
  title = 'Digitális Névjegykártya Készítés | Modern Üzleti Megoldás | QRNevjegy',
  description = 'Digitális névjegykártya készítés egyszerűen és gyorsan. Modern, környezetbarát és költséghatékony megoldás üzleti kapcsolataihoz.',
  image = 'https://qrnevjegy.hu/og-image.jpg',
  article = false
}) => {
  const { pathname } = useLocation();
  const url = `https://qrnevjegy.hu${pathname}`;

  const schemas = [
    generateOrganizationSchema(),
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Digitális Névjegykártya",
      "description": "Modern, környezetbarát digitális névjegykártya szolgáltatás QR kóddal",
      "image": [
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1200&h=630",
        "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&q=80&w=1200&h=630",
        "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1200&h=630"
      ],
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
        },
        "shippingDetails": {
          "@type": "OfferShippingDetails",
          "shippingRate": {
            "@type": "MonetaryAmount",
            "value": "0",
            "currency": "HUF"
          },
          "deliveryTime": {
            "@type": "ShippingDeliveryTime",
            "handlingTime": {
              "@type": "QuantitativeValue",
              "minValue": "0",
              "maxValue": "1",
              "unitCode": "DAY"
            }
          }
        },
        "hasMerchantReturnPolicy": {
          "@type": "MerchantReturnPolicy",
          "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
          "returnWindow": {
            "@type": "QuantitativeValue",
            "value": "14",
            "unitCode": "DAY"
          }
        }
      }
    },
    generateBreadcrumbSchema(pathname)
  ];

  return (
    <>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />
      <meta name="language" content="Hungarian" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="QRNevjegy" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="QRNevjegy" />
      <meta property="og:locale" content="hu_HU" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Structured Data */}
      {schemas.map((schema, index) => (
        <script 
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
};

export default SEO;