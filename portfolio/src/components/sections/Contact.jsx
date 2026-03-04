import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    alert('Message sent! (Simulated)');
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Let's work together.</h2>
          <p className="text-gray-500 text-lg">
            Have a project in mind? We'd love to hear from you.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formState.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full bg-transparent border-b border-gray-300 py-4 focus:outline-none focus:border-black transition-colors placeholder-gray-400"
                required
              />
            </div>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full bg-transparent border-b border-gray-300 py-4 focus:outline-none focus:border-black transition-colors placeholder-gray-400"
                required
              />
            </div>
          </div>
          <div className="relative">
            <textarea
              name="message"
              value={formState.message}
              onChange={handleChange}
              placeholder="Tell us about your project"
              rows="4"
              className="w-full bg-transparent border-b border-gray-300 py-4 focus:outline-none focus:border-black transition-colors placeholder-gray-400 resize-none"
              required
            ></textarea>
          </div>

          <div className="text-center mt-12">
            <button
              type="submit"
              className="bg-black text-white px-10 py-4 text-lg font-medium rounded-full hover:bg-gray-800 transition-transform active:scale-95"
            >
              Send Message
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
