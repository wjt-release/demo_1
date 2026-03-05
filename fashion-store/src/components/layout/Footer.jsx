import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-zinc-200 mt-20">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <h3 className="text-xl font-bold uppercase tracking-widest mb-4">MODERN</h3>
            <p className="text-sm text-zinc-500 max-w-xs">
              Minimalist fashion for the modern woman.
            </p>
          </div>

          {/* Links */}
          <div className="col-span-1">
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Shop</h4>
            <ul className="space-y-2">
              <li><Link to="/shop?category=new" className="text-sm text-zinc-600 hover:text-black transition-colors">New Arrivals</Link></li>
              <li><Link to="/shop" className="text-sm text-zinc-600 hover:text-black transition-colors">Clothing</Link></li>
              <li><Link to="/shop?category=accessories" className="text-sm text-zinc-600 hover:text-black transition-colors">Accessories</Link></li>
              <li><Link to="/coming-soon" className="text-sm text-zinc-600 hover:text-black transition-colors">Sale</Link></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="mailto:support@modernfashion.com" className="text-sm text-zinc-600 hover:text-black transition-colors">Contact Us</a></li>
              <li><Link to="/coming-soon" className="text-sm text-zinc-600 hover:text-black transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/coming-soon" className="text-sm text-zinc-600 hover:text-black transition-colors">FAQ</Link></li>
              <li><Link to="/coming-soon" className="text-sm text-zinc-600 hover:text-black transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-1">
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Newsletter</h4>
            <p className="text-sm text-zinc-500 mb-4">Subscribe for exclusive updates.</p>
            <div className="flex border-b border-zinc-300 pb-1">
              <input 
                type="email" 
                placeholder="YOUR EMAIL" 
                className="w-full bg-transparent border-none outline-none text-sm placeholder-zinc-400"
              />
              <button className="text-sm font-medium uppercase tracking-wider hover:text-zinc-600 transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-zinc-100 pt-8 text-center">
          <p className="text-xs text-zinc-400 uppercase tracking-widest">© 2026 Modern Fashion. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
