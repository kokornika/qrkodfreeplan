import React, { useRef } from 'react';
import { QROptions } from '../../types/qr';
import QRCode from 'qrcode.react';
import { Button } from '../ui/button';
import { Download } from 'lucide-react';
import PromotionalCard from '../ui/PromotionalCard';

interface QRCodePreviewProps {
  options: QROptions;
}

const QRCodePreview: React.FC<QRCodePreviewProps> = ({ options }) => {
  const qrRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (!qrRef.current) return;

    try {
      const canvas = qrRef.current.querySelector('canvas');
      if (!canvas) return;

      const link = document.createElement('a');
      link.download = 'qrkod.png';
      
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          link.href = url;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }
      }, 'image/png');
      
    } catch (error) {
      console.error('Hiba a QR kód letöltése közben:', error);
    }
  };

  return (
    <div className="flex flex-col space-y-8">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
        QR kód generálása
      </h2>
      
      <div className="flex flex-col items-center space-y-6">
        <div 
          ref={qrRef}
          className="inline-flex rounded-lg overflow-hidden"
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
            includeMargin={false}
            renderAs="canvas"
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

      <div className="w-full mt-8">
        <PromotionalCard
          title="Többet szeretne mint egy QR kód?"
          description="Próbálja ki prémium digitális névjegykártya szolgáltatásunkat!"
          buttonText="Kipróbálom"
          onClick={() => window.location.href = '/vcard'}
        />
      </div>
    </div>
  );
};

export default QRCodePreview;