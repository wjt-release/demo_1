import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageCarouselProps {
  images: string[];
  autoPlay?: boolean;
  interval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  aspectRatio?: 'video' | 'portrait' | 'square';
}

export function ImageCarousel({
  images,
  autoPlay = true,
  interval = 3000,
  showArrows = true,
  showDots = true,
  aspectRatio = 'video',
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay || images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, images.length, interval]);

  const goToPrevious = () => {
    setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex(prev => (prev + 1) % images.length);
  };

  const aspectClasses = {
    video: 'aspect-[2/1]',
    portrait: 'aspect-[3/4]',
    square: 'aspect-square',
  };

  return (
    <div className={`relative overflow-hidden rounded-lg ${aspectClasses[aspectRatio]}`}>
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full object-cover"
        />
      </AnimatePresence>

      {showArrows && images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-md transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-md transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {showDots && images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-white w-4' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
