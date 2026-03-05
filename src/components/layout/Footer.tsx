import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold tracking-tighter">MODA.</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Redefining modern fashion for the contemporary woman. Minimalist design, maximum impact.
            </p>
          </div>

          {/* Shop */}
          <div className="space-y-4">
            <h4 className="font-medium text-sm tracking-wider uppercase">Shop</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link to="/products?category=new" className="hover:text-black transition-colors">New Arrivals</Link></li>
              <li><Link to="/products?category=bestsellers" className="hover:text-black transition-colors">Best Sellers</Link></li>
              <li><Link to="/products?category=coats" className="hover:text-black transition-colors">Coats & Jackets</Link></li>
              <li><Link to="/products?category=dresses" className="hover:text-black transition-colors">Dresses</Link></li>
              <li><Link to="/products" className="hover:text-black transition-colors">All Products</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div className="space-y-4">
            <h4 className="font-medium text-sm tracking-wider uppercase">Help</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link to="/contact" className="hover:text-black transition-colors">Contact Us</Link></li>
              <li><Link to="/shipping" className="hover:text-black transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/size-guide" className="hover:text-black transition-colors">Size Guide</Link></li>
              <li><Link to="/faq" className="hover:text-black transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-medium text-sm tracking-wider uppercase">Newsletter</h4>
            <p className="text-sm text-gray-500">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <form className="flex border-b border-black pb-1" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 bg-transparent border-none outline-none text-sm placeholder-gray-400"
              />
              <button type="submit" className="text-sm font-medium uppercase tracking-wide">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-100 pt-8 text-xs text-gray-400">
          <p>&copy; {new Date().getFullYear()} MODA. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-black transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
