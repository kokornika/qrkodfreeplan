import React, { useState, useEffect } from 'react';
import { QRContentType, QROptions } from '../types/qr';
import QRCodeTypeSelector from './qr/QRCodeTypeSelector';
import QRCodeForm from './qr/QRCodeForm';
import QRCodePreview from './qr/QRCodePreview';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
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
    size: window.innerWidth < 640 ? 128 : 256,
    wifiSettings: {
      ssid: '',
      password: '',
      encryption: 'WPA',
    },
  });

  useEffect(() => {
    const handleResize = () => {
      const maxSize = Math.min(window.innerWidth - 48, options.size);
      if (window.innerWidth < 640 && options.size > maxSize) {
        setOptions(prev => ({ ...prev, size: maxSize }));
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [options.size]);

  const handleTabChange = (value: string) => {
    if (value === 'vcard') {
      window.location.href = '/vcard';
      return;
    }
    setOptions({
      ...options,
      contentType: value as QRContentType,
      content: '',
      wifiSettings: {
        ssid: '',
        password: '',
        encryption: 'WPA',
      },
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 text-center">
        QR Kód Generálás és Digitális Névjegykártya
      </h1>
      
      <h2 className="text-xl sm:text-2xl text-gray-600 mb-8 text-center">
        Készítsen ingyenes QR kódot vagy digitális névjegykártyát egyszerűen
      </h2>

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