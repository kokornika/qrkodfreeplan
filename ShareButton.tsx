import React from 'react';
import { Share2 } from 'lucide-react';
import { Button } from '../ui/button';

interface ShareButtonProps {
  url: string;
  title: string;
  description: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ url, title, description }) => {
  const handleShare = () => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(shareUrl, 'facebook-share', 'width=580,height=296');
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 sm:p-8 text-center">
      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
        Oszd meg ezt a cikket ismerőseiddel, és mutasd meg, hogy te is a digitális jövőben gondolkodsz!
      </h3>
      <Button
        onClick={handleShare}
        className="bg-[#1877F2] hover:bg-[#166FE5] text-white px-6 py-2 rounded-lg transition-colors"
      >
        <Share2 className="w-4 h-4 mr-2" />
        Megosztás Facebookon
      </Button>
    </div>
  );
};

export default ShareButton;