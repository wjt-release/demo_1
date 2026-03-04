import React from 'react';

export const Contact: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Message sent! We will get back to you shortly.');
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8 text-center">CONTACT US</h1>
      <p className="text-center text-gray-600 mb-12">
        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input type="text" required className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" required className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <textarea rows={5} required className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black"></textarea>
        </div>
        <button 
          type="submit" 
          className="w-full bg-black text-white py-4 font-bold tracking-widest hover:bg-gray-800 transition-colors"
        >
          SEND MESSAGE
        </button>
      </form>
    </div>
  );
};
