import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  className?: string;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, maxRating = 5, className = "" }) => {
  return (
    <div className={`flex items-center gap-0.5 ${className}`}>
      {[...Array(maxRating)].map((_, i) => {
        const ratingValue = i + 1;
        const isFullStar = rating >= ratingValue;
        const isHalfStar = !isFullStar && rating > i && rating < ratingValue;

        return (
          <Star
            key={i}
            className={`w-4 h-4 ${
              isFullStar
                ? 'fill-yellow-400 text-yellow-400'
                : isHalfStar
                ? 'fill-[url(#halfStar)] text-yellow-400'
                : 'fill-transparent text-yellow-400/30'
            }`}
          />
        );
      })}
      {/* SVG gradient pattern for half stars */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="halfStar" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="50%" stopColor="#FACC15" />
            <stop offset="50%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default StarRating;