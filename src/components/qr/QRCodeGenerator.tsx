import React, { useState, useEffect } from 'react';
import { QRContentType, QROptions } from '../../types/qr';
import QRCodeTypeSelector from './QRCodeTypeSelector';
import QRCodeForm from './QRCodeForm';
import QRCodePreview from './QRCodePreview';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Globe, Type, Mail, Phone, Wifi, CreditCard } from 'lucide-react';

const tabs = [
  { value: 'url', label: 'Weboldal', icon: Globe },
  { value: 'text', label: 'Szöveg', icon: Type },
  { value: 'email', label: 'Email', icon: Mail },
  { value: 'phone', label: 'Telefon', icon: Phone },
  { value: 'wifi', label: 'WiFi', icon: Wifi },
  { value: 'vcard', label: 'Névjegy', icon: CreditCard },
];

const QRCodeGenerator: React.FC = () => {
  const [options, setOptions] = useState<QROptions>({
    contentType: 'url',
    content: '',
    backgroundColor: '#ffffff',
    foregroundColor: '#000000',
    size: window.innerWidth < 640 ? 128 : 256, // Start with smaller size on mobile
    wifiSettings: {
      ssid: '',
      password: '',
      encryption: 'WPA',
    },
  });

  // Ensure mobile starts with minimum size
  useEffect(() => {
    if (window.innerWidth < 640 && options.size > 128) {
      setOptions(prev => ({ ...prev, size: 128 }));
    }
  }, []);

  const handleTabChange = (value: string) => {
    if (value === 'vcard') {
      window.location.href = '/vcard';
      return;
    }
    setOptions(prev => ({
      ...prev,
      contentType: value as QRContentType,
      content: '',
      wifiSettings: {
        ssid: '',
        password: '',
        encryption: 'WPA',
      },
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          Ingyenes QR Kód Készítés
        </h2>
        <p className="text-base sm:text-lg text-gray-600">
          Válassza ki a kívánt QR kód típust és készítse el QR kódját azonnal, teljesen ingyen
        </p>
      </div>

      <Tabs
        defaultValue="url"
        onValueChange={handleTabChange}
        className="space-y-8"
      >
        <TabsList className="w-full flex flex-wrap justify-center gap-2 bg-transparent">
          {tabs.map(({ value, label, icon: Icon }) => (
            <TabsTrigger
              key={value}
              value={value}
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Icon className="w-4 h-4" />
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.slice(0, -1).map(({ value }) => (
          <TabsContent key={value} value={value} className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-5">
                <QRCodeForm options={options} onChange={setOptions} />
              </div>
              <div className="lg:col-span-7">
                <div className="sticky top-24">
                  <QRCodePreview options={options} />
                </div>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default QRCodeGenerator;