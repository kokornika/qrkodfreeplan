import React from 'react';
import { VCardFormData } from '../../types/vcard';
import { Trash2 } from 'lucide-react';
import ImageUploader from './ImageUploader';

interface VCardAppearanceProps {
  formData: VCardFormData;
  onChange: (field: keyof VCardFormData, value: any) => void;
}

const colorPresets = [
  { color: '#6366F1', name: 'Indigo' },
  { color: '#14B8A6', name: 'Türkiz' },
  { color: '#F43F5E', name: 'Rózsaszín' },
  { color: '#8B5CF6', name: 'Lila' },
  { color: '#22C55E', name: 'Zöld' },
  { color: '#1F2937', name: 'Fekete' },
  { color: '#EC4899', name: 'Pink' },
  { color: '#F97316', name: 'Narancs' },
];

const VCardAppearance: React.FC<VCardAppearanceProps> = ({ formData, onChange }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-700 mb-4">Megjelenés testreszabása</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Color Selection First */}
        <div className="space-y-4">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Válassz egy színt a névjegyedhez
            </label>
            <div className="grid grid-cols-4 gap-2 w-full">
              {colorPresets.map((preset) => (
                <button
                  key={preset.color}
                  onClick={() => onChange('backgroundColor', preset.color)}
                  className={`w-full aspect-square rounded-lg transition-all duration-200 hover:scale-110 ${
                    formData.backgroundColor === preset.color ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                  }`}
                  style={{ backgroundColor: preset.color }}
                  title={preset.name}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Egyedi szín
            </label>
            <input
              type="color"
              value={formData.backgroundColor}
              onChange={(e) => onChange('backgroundColor', e.target.value)}
              className="w-full h-12 rounded-lg cursor-pointer border border-gray-200 p-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Háttér típusa
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label 
                className={`flex flex-col items-center justify-center p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                  formData.backgroundType === 'solid' 
                    ? 'bg-blue-50 border-2 border-blue-500' 
                    : 'bg-gray-50 border border-gray-200 hover:border-blue-300'
                }`}
              >
                <input
                  type="radio"
                  checked={formData.backgroundType === 'solid'}
                  onChange={() => onChange('backgroundType', 'solid')}
                  className="sr-only"
                />
                <div 
                  className="w-12 h-12 rounded-lg mb-2"
                  style={{ backgroundColor: formData.backgroundColor }}
                />
                <span className="text-sm font-medium">Egyszínű</span>
              </label>
              <label 
                className={`flex flex-col items-center justify-center p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                  formData.backgroundType === 'gradient' 
                    ? 'bg-blue-50 border-2 border-blue-500' 
                    : 'bg-gray-50 border border-gray-200 hover:border-blue-300'
                }`}
              >
                <input
                  type="radio"
                  checked={formData.backgroundType === 'gradient'}
                  onChange={() => onChange('backgroundType', 'gradient')}
                  className="sr-only"
                />
                <div 
                  className="w-12 h-12 rounded-lg mb-2"
                  style={{ 
                    background: `linear-gradient(135deg, ${formData.backgroundColor}, ${formData.backgroundColor}22)`
                  }}
                />
                <span className="text-sm font-medium">Gradiens</span>
              </label>
            </div>
          </div>
        </div>

        {/* Profile Picture Second */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Profilkép (opcionális - <span className="text-blue-600">ha nem tölt fel képet, egy elegáns monogram jelenik meg</span>)
          </label>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <ImageUploader
                value={formData.profilePicture}
                onChange={(value) => onChange('profilePicture', value)}
              />
            </div>
            {formData.profilePicture && (
              <button
                onClick={() => onChange('profilePicture', '')}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  ); 
};

export default VCardAppearance;