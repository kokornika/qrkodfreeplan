import React, { useEffect } from 'react';
import { QROptions, WifiEncryption } from '../types/qr';
import ColorPicker from './ui/ColorPicker';
import { Slider } from './ui/Slider';

interface QRCodeOptionsProps {
  options: QROptions;
  onChange: (options: QROptions) => void;
}

const backgroundPresets = [
  { color: 'transparent', label: 'Átlátszó' },
  { color: '#FFFFFF', label: 'Fehér' },
  { color: '#000000', label: 'Fekete' },
  { color: '#FFF7ED', label: 'Krém' },
  { color: '#2563EB', label: 'Kék' },
  { color: '#DC2626', label: 'Piros' },
];

const foregroundPresets = [
  { color: '#000000', label: 'Fekete' },
  { color: '#0F172A', label: 'Sötétszürke' },
  { color: '#2563EB', label: 'Kék' },
  { color: '#16A34A', label: 'Zöld' },
  { color: '#DC2626', label: 'Piros' },
  { color: '#FFFFFF', label: 'Fehér' },
];

const encryptionTypes: { value: WifiEncryption; label: string }[] = [
  { value: 'WPA', label: 'WPA/WPA2' },
  { value: 'WEP', label: 'WEP' },
  { value: 'nopass', label: 'Nincs jelszó' },
];

const contentTypeLabels: Record<string, string> = {
  url: 'Weboldal URL átalakítása QR kóddá',
  text: 'Szöveg átalakítása QR kóddá',
  email: 'Email cím átalakítása QR kóddá',
  phone: 'Telefonszám átalakítása QR kóddá',
  wifi: 'WiFi beállítások átalakítása QR kóddá',
};

const placeholderTexts: Record<string, string> = {
  url: 'Add meg a weboldal címét (pl. https://pelda.hu)...',
  text: 'Írd be a szöveget, amit QR kóddá szeretnél alakítani...',
  email: 'Add meg az email címet...',
  phone: 'Add meg a telefonszámot...',
  wifi: 'Add meg a WiFi hálózat nevét...',
};

const QRCodeOptions: React.FC<QRCodeOptionsProps> = ({ options, onChange }) => {
  useEffect(() => {
    const handleResize = () => {
      const containerWidth = window.innerWidth < 640 ? window.innerWidth - 32 : 512;
      const newSize = Math.min(containerWidth, options.size);
      if (newSize !== options.size) {
        onChange({ ...options, size: newSize });
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [options, onChange]);

  const handleSizeChange = (newSize: number) => {
    const containerWidth = window.innerWidth < 640 ? window.innerWidth - 32 : 512;
    onChange({ ...options, size: Math.min(newSize, containerWidth) });
  };

  const handleWifiSettingChange = (
    field: keyof typeof options.wifiSettings,
    value: string
  ) => {
    const newWifiSettings = {
      ...(options.wifiSettings || { ssid: '', password: '', encryption: 'WPA' as WifiEncryption }),
      [field]: value,
    };
    
    if (field === 'encryption' && value === 'nopass') {
      newWifiSettings.password = '';
    }
    
    const wifiString = `WIFI:S:${newWifiSettings.ssid};T:${newWifiSettings.encryption};${newWifiSettings.encryption !== 'nopass' ? `P:${newWifiSettings.password};` : ''};`;
    
    onChange({
      ...options,
      content: wifiString,
      wifiSettings: newWifiSettings,
    });
  };

  if (options.contentType === 'wifi') {
    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            WiFi hálózat neve (SSID)
          </label>
          <input
            type="text"
            value={options.wifiSettings?.ssid || ''}
            onChange={(e) => handleWifiSettingChange('ssid', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg text-base"
            placeholder="Add meg a hálózat nevét..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            WiFi titkosítás típusa
          </label>
          <select
            value={options.wifiSettings?.encryption || 'WPA'}
            onChange={(e) => handleWifiSettingChange('encryption', e.target.value as WifiEncryption)}
            className="w-full p-3 border border-gray-300 rounded-lg text-base bg-white"
          >
            {encryptionTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {options.wifiSettings?.encryption !== 'nopass' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              WiFi jelszó
            </label>
            <input
              type="password"
              value={options.wifiSettings?.password || ''}
              onChange={(e) => handleWifiSettingChange('password', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg text-base"
              placeholder="Add meg a jelszót..."
            />
          </div>
        )}

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              QR kód mérete
            </label>
            <span className="text-sm text-gray-600">{options.size}px</span>
          </div>
          <Slider
            value={options.size}
            min={256}
            max={window.innerWidth < 640 ? Math.min(window.innerWidth - 32, 512) : 512}
            step={32}
            onChange={handleSizeChange}
          />
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            QR kód színek
          </label>
          <ColorPicker
            label="Háttér"
            value={options.backgroundColor}
            onChange={(color) => onChange({ ...options, backgroundColor: color })}
            presets={backgroundPresets}
          />
          <ColorPicker
            label="QR kód"
            value={options.foregroundColor}
            onChange={(color) => onChange({ ...options, foregroundColor: color })}
            presets={foregroundPresets}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {contentTypeLabels[options.contentType]}
        </label>
        <input
          type={options.contentType === 'email' ? 'email' : options.contentType === 'url' ? 'url' : 'text'}
          value={options.content}
          onChange={(e) => onChange({ ...options, content: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg text-base"
          placeholder={placeholderTexts[options.contentType]}
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">
            QR kód mérete
          </label>
          <span className="text-sm text-gray-600">{options.size}px</span>
        </div>
        <Slider
          value={options.size}
          min={256}
          max={window.innerWidth < 640 ? Math.min(window.innerWidth - 32, 512) : 512}
          step={32}
          onChange={handleSizeChange}
        />
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          QR kód színek
        </label>
        <ColorPicker
          label="Háttér"
          value={options.backgroundColor}
          onChange={(color) => onChange({ ...options, backgroundColor: color })}
          presets={backgroundPresets}
        />
        <ColorPicker
          label="QR kód"
          value={options.foregroundColor}
          onChange={(color) => onChange({ ...options, foregroundColor: color })}
          presets={foregroundPresets}
        />
      </div>
    </div>
  );
};

export default QRCodeOptions;