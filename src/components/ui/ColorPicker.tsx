import React from 'react';
import { cn } from '../../lib/utils';
import { Palette } from 'lucide-react';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  presets: { color: string; label: string }[];
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  label,
  value,
  onChange,
  presets,
}) => {
  return (
    <div className="space-y-2">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative">
          <input
            type="color"
            value={value === 'transparent' ? '#ffffff' : value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute opacity-0 w-10 h-10 cursor-pointer"
            id={`color-picker-${label}`}
          />
          <label
            htmlFor={`color-picker-${label}`}
            className="w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors bg-white"
          >
            <Palette className="w-5 h-5 text-gray-600" />
          </label>
        </div>
        <div className="flex flex-wrap gap-1">
          {presets.map((preset) => (
            <button
              key={preset.color}
              onClick={() => onChange(preset.color)}
              className={cn(
                "w-8 h-8 rounded-lg transition-all duration-200 border-2 border-gray-300",
                "hover:scale-110 hover:shadow-md",
                value === preset.color && "ring-2 ring-blue-500 ring-offset-2"
              )}
              title={preset.label}
              style={{
                backgroundColor: preset.color === 'transparent' ? 'white' : preset.color,
                backgroundImage: preset.color === 'transparent' ? 
                  'linear-gradient(45deg, #ddd 25%, transparent 25%), linear-gradient(-45deg, #ddd 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ddd 75%), linear-gradient(-45deg, transparent 75%, #ddd 75%)' : 
                  undefined,
                backgroundSize: preset.color === 'transparent' ? '10px 10px' : undefined,
                backgroundPosition: preset.color === 'transparent' ? '0 0, 0 5px, 5px -5px, -5px 0' : undefined,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;