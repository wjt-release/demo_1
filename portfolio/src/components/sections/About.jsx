import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">
              More than just an agency.
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              We are a collective of designers, developers, and strategists driven by a passion for minimalism and function.
              Our philosophy is simple: strip away the unnecessary to reveal the essential.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Since 2023, we have partnered with forward-thinking brands to create digital products that stand the test of time.
            </p>
            <a
              href="#contact"
              className="text-black font-semibold border-b-2 border-black hover:text-gray-600 hover:border-gray-600 transition-colors pb-1"
            >
              Get in Touch
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] rounded-lg overflow-hidden shadow-xl"
          >
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Team collaboration"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
