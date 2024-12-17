import React from 'react';
import { Download } from 'lucide-react';
import { Button } from '../ui/button';

interface QRCodeDownloaderProps {
  qrRef: React.RefObject<HTMLDivElement>;
  disabled: boolean;
}

const QRCodeDownloader: React.FC<QRCodeDownloaderProps> = ({ qrRef, disabled }) => {
  const handleDownload = () => {
    if (!qrRef.current) return;

    try {
      // Get the canvas element directly
      const canvas = qrRef.current.querySelector('canvas');
      if (!canvas) return;

      // Create a temporary link element
      const link = document.createElement('a');
      link.download = 'qrcode.png';
      
      // Convert canvas to data URL
      link.href = canvas.toDataURL('image/png');
      
      // Programmatically click the link to trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading QR code:', error);
    }
  };

  return (
    <Button
      onClick={handleDownload}
      disabled={disabled}
      className="w-full sm:w-auto px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
    >
      <Download className="w-4 h-4 mr-2" />
      Letöltés
    </Button>
  );
};

export default QRCodeDownloader;