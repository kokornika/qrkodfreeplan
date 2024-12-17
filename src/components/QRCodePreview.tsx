import React, { useRef } from 'react';
import { QROptions } from '../types/qr';
import QRCodeDisplay from './qr/QRCodeDisplay';
import QRCodeDownloader from './qr/QRCodeDownloader';
import PromotionalCard from './ui/PromotionalCard';

interface QRCodePreviewProps {
  options: QROptions;
}

const QRCodePreview: React.FC<QRCodePreviewProps> = ({ options }) => {
  const qrRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col space-y-8">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
        QR kód generálása
      </h2>
      
      <div className="flex flex-col items-center space-y-6">
        <QRCodeDisplay options={options} qrRef={qrRef} />
        <QRCodeDownloader qrRef={qrRef} disabled={!options.content} />
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