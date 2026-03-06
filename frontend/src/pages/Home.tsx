import React from 'react';
import { Button } from '../components/Button';
import { Header } from '../layout/Header';
import { Footer } from '../layout/Footer';

export const Home: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col font-sans text-slate-900">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-slate-50 pt-16 pb-32 lg:pt-32 lg:pb-40">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl mb-6">
                Pixel Perfect UI Restoration
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-slate-600 mb-10 leading-relaxed">
                This is a placeholder interface generated because the reference image was not found. 
                Upload your design image to see a 100% faithful recreation here.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="w-full sm:w-auto shadow-lg shadow-blue-500/20">
                  Upload Design
                </Button>
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  View Documentation
                </Button>
              </div>
            </div>
          </div>
          
          {/* Decorative background elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
            <div className="absolute top-1/4 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl"></div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
                Ready for your Design
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Our architecture is set up to handle complex layouts, responsive requirements, and interactive elements.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Modern Stack",
                  desc: "Built with React 18, TypeScript, and Tailwind CSS for robust, type-safe development.",
                  icon: (
                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  )
                },
                {
                  title: "Responsive by Default",
                  desc: "Mobile-first approach ensuring your UI looks perfect on phones, tablets, and desktops.",
                  icon: (
                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  )
                },
                {
                  title: "Component Driven",
                  desc: "Modular architecture allowing for easy customization and reuse of UI elements.",
                  icon: (
                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                    </svg>
                  )
                }
              ].map((feature, idx) => (
                <div key={idx} className="group p-8 rounded-2xl border border-slate-200 bg-white hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300">
                  <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
          <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
          <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-6 sm:text-4xl">
              Ready to see the magic?
            </h2>
            <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
              Once you provide the design image, this entire page will be transformed to match it pixel-for-pixel.
            </p>
            <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 shadow-xl shadow-white/10 border-0">
              Provide Image Now
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
