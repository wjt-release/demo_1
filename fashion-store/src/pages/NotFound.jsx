import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';

export const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center space-y-6">
      <h1 className="text-9xl font-bold text-gray-200 uppercase tracking-widest">404</h1>
      <h2 className="text-2xl font-bold uppercase tracking-widest text-gray-900">Page Not Found</h2>
      <p className="text-gray-500 text-sm mb-6 max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/">
        <Button variant="primary">Back to Home</Button>
      </Link>
    </div>
  );
};
