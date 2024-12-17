import React, { useEffect, useState, useRef } from 'react';
import { VCardFormData } from '../../types/vcard';
import { Input } from '../ui/Input';
import { MapPin, Loader2, Plus, Minus } from 'lucide-react';
import { fetchCityByZip, ZipLocation } from '../../lib/services/zip-service';
import { Button } from '../ui/button';

interface VCardAddressInfoProps {
  formData: VCardFormData;
  onChange: (field: keyof VCardFormData, value: any) => void;
}

const VCardAddressInfo: React.FC<VCardAddressInfoProps> = ({ formData, onChange }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [cities, setCities] = useState<ZipLocation[]>([]);
  const [showCitySelector, setShowCitySelector] = useState(false);
  const [showAddressFields, setShowAddressFields] = useState(false);
  const lastZip = useRef<string>('');

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const fetchCities = async (zip: string) => {
      if (zip === lastZip.current) return;
      lastZip.current = zip;
      
      setIsLoading(true);
      try {
        const locations = await fetchCityByZip(zip);
        setCities(locations);
        setShowCitySelector(locations.length > 1);
        
        // Ha csak egy település van, automatikusan kitöltjük
        if (locations.length === 1) {
          onChange('city', locations[0].name);
          setShowCitySelector(false);
        }
      } catch (error) {
        console.error('Hiba a települések lekérése során:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (formData.zipcode && formData.zipcode.length === 4) {
      timeoutId = setTimeout(() => {
        fetchCities(formData.zipcode);
      }, 500);
    } else {
      setCities([]);
      setShowCitySelector(false);
      lastZip.current = '';
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [formData.zipcode, onChange]);

  const handleSelectCity = (city: ZipLocation) => {
    onChange('city', city.name);
    setShowCitySelector(false);
  };

  return (
    <div className="space-y-4">
      {/* Mobile View */}
      <div className="block lg:hidden">
        <h3 className="text-lg font-medium text-gray-700 mb-4">Cím megadása</h3>
        <Button
          type="button" 
          className="w-full py-4 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-blue-700 rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2"
          onClick={() => setShowAddressFields(!showAddressFields)}
        >
          {showAddressFields ? (
            <>
              <Minus className="w-4 h-4 text-blue-600" />
              Cím elrejtése
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 text-blue-600" />
              Cím hozzáadása
            </>
          )}
        </Button>
      </div>

      {/* Desktop View or Mobile Expanded */}
      <div className={`space-y-4 ${!showAddressFields ? 'hidden lg:block' : ''}`}>
        <div className="space-y-3">
          <h3 className="text-lg font-medium text-gray-700">Cím megadása</h3>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-700">
                Ügyfelei egy kattintással útvonalat tervezhetnek önhöz.
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="relative">
            <Input
              label="Irányítószám (opcionális)"
              value={formData.zipcode}
              onChange={(e) => onChange('zipcode', e.target.value)}
              placeholder="1234"
              className="text-sm text-center sm:text-left"
            />
            {isLoading && formData.zipcode.length === 4 && (
              <div className="absolute right-3 top-8">
                <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
              </div>
            )}
          </div>

          <div className="relative">
            <Input
              label="Város (opcionális)"
              value={formData.city}
              onChange={(e) => onChange('city', e.target.value)}
              placeholder="Budapest"
              className="text-sm text-center sm:text-left"
            />
            {showCitySelector && cities.length > 1 && (
              <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200">
                <div className="p-2">
                  <p className="text-xs sm:text-sm text-gray-600 mb-2">
                    Több település tartozik ehhez az irányítószámhoz:
                  </p>
                  <div className="space-y-1">
                    {cities.map((city) => (
                      <Button
                        key={city.name}
                        variant="ghost"
                        className="w-full justify-start text-left text-sm py-2"
                        onClick={() => handleSelectCity(city)}
                      >
                        {city.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="col-span-2">
            <Input
              label="Utca, házszám (opcionális)"
              value={formData.street}
              onChange={(e) => onChange('street', e.target.value)}
              placeholder="Példa utca 123."
              className="text-sm text-center sm:text-left"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VCardAddressInfo;