import React from 'react';
import { Button } from '../../components/ui/Button';

export const ContactPage: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for contacting us. We will get back to you shortly.');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8 tracking-tighter text-center">CONTACT US</h1>
      <p className="text-gray-500 mb-8 text-center">
        Have a question or need assistance? We're here to help.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-3" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" className="mt-1 block w-full border border-gray-300 rounded-md p-3" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Message</label>
          <textarea rows={5} className="mt-1 block w-full border border-gray-300 rounded-md p-3" required />
        </div>
        <Button fullWidth size="lg" type="submit">
          SEND MESSAGE
        </Button>
      </form>
    </div>
  );
};
