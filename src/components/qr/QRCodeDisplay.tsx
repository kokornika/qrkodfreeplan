import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { QROptions } from '../../types/qr';

interface QRCodeDisplayProps {
  options: QROptions;
  qrRef: React.RefObject<HTMLDivElement>;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ options, qrRef }) => {
  return (
    <div 
      ref={qrRef}
      className="inline-flex rounded-lg overflow-hidden"
      style={{
        background: options.backgroundColor === 'transparent' 
          ? `url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGElEQVQYlWNgYGCQwoKxgqGgcJA5h3yFAAs8BRWVSwooAAAAAElFTkSuQmCC) repeat`
          : options.backgroundColor
      }}
    >
      <QRCodeSVG
        value={options.content || ' '}
        size={options.size}
        level="M"
        bgColor={options.backgroundColor === 'transparent' ? 'transparent' : options.backgroundColor}
        fgColor={options.foregroundColor}
        includeMargin={false}
      />
    </div>
  );
};

export default QRCodeDisplay;