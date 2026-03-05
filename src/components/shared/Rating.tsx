import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

export function Rating({
  rating,
  maxRating = 5,
  size = 'md',
  showValue = false,
  interactive = false,
  onChange,
}: RatingProps) {
  const sizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const handleClick = (index: number) => {
    if (interactive && onChange) {
      onChange(index + 1);
    }
  };

  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: maxRating }).map((_, index) => {
        const isFilled = index < rating;
        const isHalf = !isFilled && index < rating + 0.5;

        return (
          <button
            key={index}
            type="button"
            onClick={() => handleClick(index)}
            disabled={!interactive}
            className={cn(
              'transition-transform',
              interactive && 'hover:scale-110 cursor-pointer',
              !interactive && 'cursor-default'
            )}
          >
            <Star
              className={cn(
                sizes[size],
                isFilled
                  ? 'fill-yellow-400 text-yellow-400'
                  : isHalf
                  ? 'fill-yellow-400/50 text-yellow-400'
                  : 'fill-gray-200 text-gray-200'
              )}
            />
          </button>
        );
      })}
      {showValue && (
        <span className="ml-2 text-sm text-gray-600">{rating.toFixed(1)}</span>
      )}
    </div>
  );
}
