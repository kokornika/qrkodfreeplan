import React, { useState } from 'react';
import { VCardFormData } from '../../types/vcard';
import { Input } from '../ui/Input';
import { formatWebsiteUrl, formatWebsiteDisplay } from '../../lib/utils/url-utils';

interface VCardPersonalInfoProps {
  formData: VCardFormData;
  onChange: (field: keyof VCardFormData, value: any) => void;
  error?: string;
}

const VCardPersonalInfo: React.FC<VCardPersonalInfoProps> = ({ 
  formData, 
  onChange,
  error 
}) => {
  const [websiteInput, setWebsiteInput] = useState(formatWebsiteDisplay(formData.website));

  const handleWebsiteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setWebsiteInput(value);
    
    // Only format and update the main form data when input is valid
    if (value.includes('.')) {
      const formattedUrl = formatWebsiteUrl(value);
      onChange('website', formattedUrl);
    } else {
      onChange('website', value);
    }
  };

  const handleWebsiteBlur = () => {
    if (websiteInput) {
      const formattedUrl = formatWebsiteUrl(websiteInput);
      onChange('website', formattedUrl);
      setWebsiteInput(formatWebsiteDisplay(formattedUrl));
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-700 mb-6">
        Kötelező adatok <span className="text-red-500">*</span>
      </h3>
      
      <div className="grid grid-cols-1 gap-4">
        <Input
          label="Teljes név"
          value={formData.name}
          onChange={(e) => onChange('name', e.target.value)}
          placeholder="Add meg a teljes neved... *"
          error={error}
          className="w-full text-center sm:text-left"
          required
        />
      </div>
    </div>
  );
};

export default VCardPersonalInfo;