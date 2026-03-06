import React, { useState } from 'react';
import { Button } from '../components/Button';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-blue-600"></div>
          <span className="text-xl font-bold tracking-tight">PixelPerfect</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">Features</a>
          <a href="#" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">Testimonials</a>
          <a href="#" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">Pricing</a>
          <a href="#" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">About</a>
        </nav>
        
        <div className="hidden md:flex items-center gap-4">
          <Button variant="outline" size="sm">Log in</Button>
          <Button size="sm">Get Started</Button>
        </div>

        <button 
          className="md:hidden p-2 text-gray-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {isMenuOpen ? (
              <path d="M18 6 6 18M6 6l12 12"/>
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18"/>
            )}
          </svg>
        </button>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-6 space-y-4">
          <nav className="flex flex-col gap-4">
            <a href="#" className="text-sm font-medium text-gray-700 hover:text-blue-600">Features</a>
            <a href="#" className="text-sm font-medium text-gray-700 hover:text-blue-600">Testimonials</a>
            <a href="#" className="text-sm font-medium text-gray-700 hover:text-blue-600">Pricing</a>
            <a href="#" className="text-sm font-medium text-gray-700 hover:text-blue-600">About</a>
          </nav>
          <div className="flex flex-col gap-2 pt-4 border-t border-gray-100">
            <Button variant="outline" className="w-full justify-center">Log in</Button>
            <Button className="w-full justify-center">Get Started</Button>
          </div>
        </div>
      )}
    </header>
  );
};
