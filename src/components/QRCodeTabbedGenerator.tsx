import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import { QRContentType, QROptions } from '../types/qr';
import QRCodeOptions from './QRCodeOptions';
import { Globe, Type, Mail, Phone, Wifi, CreditCard, Download } from 'lucide-react';
import { Button } from './ui/button';
import PromotionalCard from './ui/PromotionalCard';

const tabs: { type: QRContentType; label: string; icon: React.ReactNode }[] = [
  { type: 'url', label: 'Weboldal URL', icon: <Globe className="w-4 h-4" /> },
  { type: 'text', label: 'Szöveg', icon: <Type className="w-4 h-4" /> },
  { type: 'email', label: 'Email', icon: <Mail className="w-4 h-4" /> },
  { type: 'phone', label: 'Telefon', icon: <Phone className="w-4 h-4" /> },
  { type: 'wifi', label: 'WiFi', icon: <Wifi className="w-4 h-4" /> },
  { type: 'vcard', label: 'Névjegy', icon: <CreditCard className="w-4 h-4" /> },
];

const QRCodeTabbedGenerator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<QRContentType>('url');
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

  const handleTabChange = (type: QRContentType) => {
    if (type === 'vcard') {
      window.location.href = '/vcard';
      return;
    }
    setActiveTab(type);
    setOptions({
      ...options,
      contentType: type,
      content: '',
      wifiSettings: {
        ssid: '',
        password: '',
        encryption: 'WPA',
      },
    });
  };

  const handleDownload = () => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;

    const newCanvas = document.createElement('canvas');
    newCanvas.width = options.size;
    newCanvas.height = options.size;
    const context = newCanvas.getContext('2d', { willReadFrequently: true });
    
    if (context) {
      if (options.backgroundColor === 'transparent') {
        context.clearRect(0, 0, newCanvas.width, newCanvas.height);
      } else {
        context.fillStyle = options.backgroundColor;
        context.fillRect(0, 0, newCanvas.width, newCanvas.height);
      }
      
      const qrCanvas = canvas.getContext('2d', { willReadFrequently: true });
      if (qrCanvas) {
        const imageData = qrCanvas.getImageData(0, 0, canvas.width, canvas.height);
        context.putImageData(imageData, 0, 0);
      }
    }

    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = newCanvas.toDataURL('image/png');
    link.click();
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

      <div className="border-b border-gray-200 mb-8 -mx-4 sm:mx-0">
        <div className="px-4 sm:px-0">
          <nav className="-mb-px flex space-x-4 sm:space-x-8 overflow-x-auto scrollbar-hide py-2 sm:py-0">
            {tabs.map((tab) => (
              <button
                key={tab.type}
                onClick={() => handleTabChange(tab.type)}
                className={`
                  whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm sm:text-base
                  flex-shrink-0
                  ${activeTab === tab.type
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                  flex items-center gap-2 transition-colors
                `}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="flex flex-col space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <QRCodeOptions options={options} onChange={setOptions} />
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="sticky top-24">
              <div className="flex flex-col items-center space-y-6">
                <div 
                  className="inline-flex rounded-lg p-4 bg-white max-w-full overflow-hidden"
                  style={{
                    background: options.backgroundColor === 'transparent' 
                      ? `url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGElEQVQYlWNgYGCQwoKxgqGgcJA5h3yFAAs8BRWVSwooAAAAAElFTkSuQmCC) repeat`
                      : options.backgroundColor
                  }}
                >
                  <QRCode
                    value={options.content || ' '}
                    size={options.size}
                    level="M"
                    bgColor={options.backgroundColor === 'transparent' ? 'transparent' : options.backgroundColor}
                    fgColor={options.foregroundColor}
                  />
                </div>
                <Button
                  onClick={handleDownload}
                  disabled={!options.content}
                  className="w-full sm:w-auto px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Letöltés
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full mt-8">
          <PromotionalCard
            title="Többet szeretne mint egy QR kód?"
            description="Próbálja ki prémium digitális névjegykártya szolgáltatásunkat!"
            buttonText="Kipróbálom"
            onClick={() => window.location.href = '/vcard'}
          />
        </div>
      </div>
    </div>
  );
};

export default QRCodeTabbedGenerator;