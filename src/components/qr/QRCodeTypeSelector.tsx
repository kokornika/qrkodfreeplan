import React from 'react';
import { QRContentType } from '../../types/qr';
import { Globe, Type, Mail, Phone, Wifi, CreditCard } from 'lucide-react';

interface QRCodeTypeSelectorProps {
  onSelect: (type: QRContentType) => void;
}

const types = [
  {
    type: 'url' as QRContentType,
    icon: Globe,
    title: 'Weboldal URL',
    description: 'Weboldalak, linkek QR kóddá alakítása'
  },
  {
    type: 'text' as QRContentType,
    icon: Type,
    title: 'Szöveg',
    description: 'Bármilyen szöveg QR kóddá alakítása'
  },
  {
    type: 'email' as QRContentType,
    icon: Mail,
    title: 'Email',
    description: 'Email cím QR kóddá alakítása'
  },
  {
    type: 'phone' as QRContentType,
    icon: Phone,
    title: 'Telefon',
    description: 'Telefonszám QR kóddá alakítása'
  },
  {
    type: 'wifi' as QRContentType,
    icon: Wifi,
    title: 'WiFi',
    description: 'WiFi beállítások QR kóddá alakítása'
  },
  {
    type: 'vcard' as QRContentType,
    icon: CreditCard,
    title: 'Névjegy',
    description: 'Digitális névjegykártya készítése'
  }
];

const QRCodeTypeSelector: React.FC<QRCodeTypeSelectorProps> = ({ onSelect }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {types.map(({ type, icon: Icon, title, description }) => (
        <button
          key={type}
          onClick={() => onSelect(type)}
          className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 text-left group"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
              <Icon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-1">{title}</h3>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default QRCodeTypeSelector;