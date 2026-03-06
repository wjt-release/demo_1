import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-200 bg-white py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <h3 className="text-lg font-bold text-gray-900 mb-4">PixelPerfect</h3>
            <p className="text-sm text-gray-500">
              Recreating UI designs with pixel-perfect precision.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider">Product</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">Features</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">Integrations</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">Pricing</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">About Us</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">Careers</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider">Connect</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">Twitter</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">GitHub</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">Discord</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} PixelPerfect Inc. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-sm text-gray-500 hover:text-gray-900">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-900">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
