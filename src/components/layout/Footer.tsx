import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-bold mb-4">LUMINA</h3>
          <p className="text-gray-400 text-sm">
            Redefining modern fashion for the contemporary woman. Minimalist, elegant, and timeless.
          </p>
        </div>
        
        <div>
          <h4 className="font-medium mb-4">SHOP</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link to="/shop" className="hover:text-white transition-colors">New Arrivals</Link></li>
            <li><Link to="/shop" className="hover:text-white transition-colors">Best Sellers</Link></li>
            <li><Link to="/shop" className="hover:text-white transition-colors">Accessories</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-medium mb-4">HELP</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            <li><Link to="/orders" className="hover:text-white transition-colors">Order Status</Link></li>
            <li><Link to="/returns" className="hover:text-white transition-colors">Returns & Exchanges</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-medium mb-4">NEWSLETTER</h4>
          <form className="flex flex-col space-y-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-transparent border border-gray-700 px-4 py-2 text-sm focus:outline-none focus:border-white transition-colors"
            />
            <button className="bg-white text-black px-4 py-2 text-sm font-medium hover:bg-gray-200 transition-colors">
              SUBSCRIBE
            </button>
          </form>
        </div>
      </div>
      
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} LUMINA Fashion. All rights reserved.
      </div>
    </footer>
  );
};
