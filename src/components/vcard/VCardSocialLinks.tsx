import React from 'react';
import { VCardFormData } from '../../types/vcard';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';

interface VCardSocialLinksProps {
  formData: VCardFormData;
  onChange: (field: keyof VCardFormData, value: any) => void;
}

const socialPlatforms = [
  'Facebook',
  'Instagram',
  'Twitter',
  'LinkedIn',
  'YouTube',
  'GitHub',
  'TikTok',
  'Pinterest',
  'Snapchat',
  'WhatsApp',
  'Telegram',
  'Discord',
];

const VCardSocialLinks: React.FC<VCardSocialLinksProps> = ({ formData, onChange }) => {
  const addSocialLink = () => {
    onChange('socialLinks', [
      ...formData.socialLinks,
      { platform: socialPlatforms[0], url: '' }
    ]);
  };

  const removeSocialLink = (index: number) => {
    const newLinks = formData.socialLinks.filter((_, i) => i !== index);
    onChange('socialLinks', newLinks);
  };

  const updateSocialLink = (index: number, field: 'platform' | 'url', value: string) => {
    const newLinks = formData.socialLinks.map((link, i) => {
      if (i === index) {
        return { ...link, [field]: value };
      }
      return link;
    });
    onChange('socialLinks', newLinks);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-700 mb-6">Közösségi média</h3>
      
      <div className="space-y-4">
        {formData.socialLinks.map((link, index) => (
          <div key={index} className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <select
              value={link.platform}
              onChange={(e) => updateSocialLink(index, 'platform', e.target.value)}
              className="p-2 border border-gray-300 rounded-lg text-sm bg-white"
            >
              {socialPlatforms.map((platform) => (
                <option key={platform} value={platform}>
                  {platform}
                </option>
              ))}
            </select>
            <input
              type="url"
              value={link.url}
              onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
              placeholder="https://"
              className="p-2 border border-gray-300 rounded-lg text-sm"
            />
            <button
              onClick={() => removeSocialLink(index)}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors self-end"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}

        <Button
          onClick={addSocialLink}
          className="w-full py-4 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-blue-700 rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4 text-blue-600" />
          Közösségi média hozzáadása
        </Button>
      </div>
    </div>
  );
};

export default VCardSocialLinks;