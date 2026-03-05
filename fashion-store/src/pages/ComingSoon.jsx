import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';

export const ComingSoon = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center space-y-6">
      <h1 className="text-4xl font-bold uppercase tracking-widest text-gray-900">Coming Soon</h1>
      <p className="text-gray-500 text-sm mb-6 max-w-md">
        We are working hard to bring you this page. Stay tuned!
      </p>
      <Link to="/">
        <Button variant="primary">Back to Home</Button>
      </Link>
    </div>
  );
};
