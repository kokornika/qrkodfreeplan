import React from 'react';
import { Facebook, Twitter, Linkedin, Mail } from 'lucide-react';

interface SocialShareProps {
  url: string;
  title: string;
  description: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ url, title, description }) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const shareLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'bg-[#1877F2]'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: 'bg-[#1DA1F2]'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
      color: 'bg-[#0A66C2]'
    },
    {
      name: 'Email',
      icon: Mail,
      url: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
      color: 'bg-gray-600'
    }
  ];

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-600">Megosztás:</span>
      <div className="flex gap-2">
        {shareLinks.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${link.color} text-white p-2 rounded-full hover:opacity-90 transition-opacity`}
              aria-label={`Megosztás ${link.name}-on`}
              onClick={(e) => {
                e.preventDefault();
                window.open(link.url, 'share', 'width=550,height=450');
              }}
            >
              <Icon className="w-4 h-4" />
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default SocialShare;