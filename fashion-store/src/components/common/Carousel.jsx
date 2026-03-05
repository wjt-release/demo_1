import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Carousel = ({ slides }) => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [current]);

  return (
    <div className="relative h-[80vh] w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div 
          key={index} 
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === current ? 'opacity-100' : 'opacity-0'}`}
        >
          <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center text-white text-center p-4">
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-widest mb-4 drop-shadow-lg">{slide.title}</h2>
            <p className="text-lg md:text-xl font-light tracking-wider mb-8 drop-shadow-md">{slide.subtitle}</p>
            <button className="bg-white text-black px-8 py-3 uppercase tracking-widest text-sm hover:bg-black hover:text-white transition-colors">
              Shop Now
            </button>
          </div>
        </div>
      ))}
      
      <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full text-white backdrop-blur-sm transition-colors">
        <ChevronLeft size={24} />
      </button>
      <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full text-white backdrop-blur-sm transition-colors">
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button 
            key={index} 
            onClick={() => setCurrent(index)} 
            className={`w-2 h-2 rounded-full transition-all ${index === current ? 'bg-white w-8' : 'bg-white/50'}`} 
          />
        ))}
      </div>
    </div>
  );
};
