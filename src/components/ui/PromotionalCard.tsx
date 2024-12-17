import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from './button';

interface PromotionalCardProps {
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

const PromotionalCard: React.FC<PromotionalCardProps> = ({
  title,
  description,
  buttonText,
  onClick,
  variant = 'primary'
}) => {
  const backgrounds = {
    primary: 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500',
    secondary: 'bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700'
  };

  return (
    <div className={`w-full p-8 ${backgrounds[variant]} rounded-2xl text-white relative overflow-hidden shadow-xl`}>
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-32 translate-x-32" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full translate-y-24 -translate-x-24" />
      
      <div className="relative z-10">
        <h3 className="text-2xl font-bold mb-3 text-white">
          {title}
        </h3>
        <p className="text-white/90 mb-6 text-lg">
          {description}
        </p>
        <Button
          onClick={onClick}
          className="w-full sm:w-auto bg-white hover:bg-white/90 text-gray-900 border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
        >
          <span>{buttonText}</span>
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default PromotionalCard;