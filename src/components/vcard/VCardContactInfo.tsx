import React, { useState } from 'react';
import { VCardFormData } from '../../types/vcard';
import { Input } from '../ui/Input'; 
import { Plus, Minus } from 'lucide-react';
import { Button } from '../ui/button';

interface VCardContactInfoProps {
  formData: VCardFormData;
  onChange: (field: keyof VCardFormData, value: any) => void;
  errors: {
    email?: string;
    phoneMobile?: string;
  };
}

const VCardContactInfo: React.FC<VCardContactInfoProps> = ({ 
  formData, 
  onChange,
  errors,
}) => {
  const [showOptionalPhones, setShowOptionalPhones] = useState(false);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-700 mb-6">Elérhetőségek</h3>
      
      <div className="space-y-4">
        <Input
          label="Mobil telefonszám"
          value={formData.phoneMobile}
          onChange={(e) => onChange('phoneMobile', e.target.value)}
          placeholder="+36 ..."
          type="tel"
          error={errors.phoneMobile}
          className="text-center sm:text-left"
          required
        />

        <Input
          label="Email cím"
          value={formData.email}
          onChange={(e) => onChange('email', e.target.value)}
          placeholder="pelda@email.com"
          type="email"
          error={errors.email}
          className="text-center sm:text-left"
          required
        />

        {/* Mobile Toggle Button */}
        <div className="block lg:hidden">
          <Button
            type="button" 
            className="w-full py-4 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-blue-700 rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2 group"
            onClick={() => setShowOptionalPhones(!showOptionalPhones)}
          >
            {showOptionalPhones ? (
              <>
                <Minus className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
                További telefonszámok elrejtése
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
                További telefonszámok hozzáadása
              </>
            )}
          </Button>
        </div>

        {/* Optional Phone Numbers - Always visible on desktop, toggleable on mobile */}
        <div className={`space-y-4 ${!showOptionalPhones ? 'hidden lg:block' : ''}`}>
          <Input
            label="Munkahelyi telefonszám (opcionális)"
            value={formData.phoneWork}
            onChange={(e) => onChange('phoneWork', e.target.value)}
            placeholder="+36 ..."
            type="tel"
            className="text-center sm:text-left"
          />

          <Input
            label="Privát telefonszám (opcionális)"
            value={formData.phonePrivate}
            onChange={(e) => onChange('phonePrivate', e.target.value)}
            placeholder="+36 ..."
            type="tel"
            className="text-center sm:text-left"
          />
        </div>
      </div>
    </div>
  );
};

export default VCardContactInfo;