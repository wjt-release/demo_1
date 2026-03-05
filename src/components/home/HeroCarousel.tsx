import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { heroSlides } from '@/data';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrev = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? heroSlides.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  return (
    <section className="relative h-[60vh] md:h-[80vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${heroSlides[currentSlide].image})`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="max-w-lg text-white"
            >
              <h2 className="text-3xl md:text-5xl font-serif font-semibold mb-4">
                {heroSlides[currentSlide].title}
              </h2>
              <p className="text-base md:text-lg text-white/80 mb-6">
                {heroSlides[currentSlide].subtitle}
              </p>
              <Link
                to={heroSlides[currentSlide].link}
                className="inline-flex items-center px-6 py-3 bg-white text-neutral-900 font-medium rounded-md hover:bg-neutral-100 transition-colors"
              >
                {heroSlides[currentSlide].cta}
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors backdrop-blur-sm"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors backdrop-blur-sm"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide
                ? 'w-8 bg-white'
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
