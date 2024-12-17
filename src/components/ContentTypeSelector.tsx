import React from 'react';
import { QRContentType } from '../types/qr';
import { Globe, Type, Mail, Phone, Wifi } from 'lucide-react';

interface ContentTypeSelectorProps {
  onSelect: (type: QRContentType) => void;
}

const contentTypes: { value: QRContentType; label: string; icon: React.ReactNode }[] = [
  { value: 'url', label: 'Weboldal URL', icon: <Globe className="w-5 h-5 text-gray-400" /> },
  { value: 'text', label: 'Szöveg', icon: <Type className="w-5 h-5 text-gray-400" /> },
  { value: 'email', label: 'Email cím', icon: <Mail className="w-5 h-5 text-gray-400" /> },
  { value: 'phone', label: 'Telefonszám', icon: <Phone className="w-5 h-5 text-gray-400" /> },
  { value: 'wifi', label: 'WiFi beállítások', icon: <Wifi className="w-5 h-5 text-gray-400" /> },
];

const ContentTypeSelector: React.FC<ContentTypeSelectorProps> = ({ onSelect }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {contentTypes.map((type) => (
        <button
          key={type.value}
          onClick={() => onSelect(type.value)}
          className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-center gap-3 text-center hover:scale-[1.02] border border-gray-100"
        >
          <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center">
            {type.icon}
          </div>
          <span className="text-sm font-medium text-gray-700">
            {type.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default ContentTypeSelector;