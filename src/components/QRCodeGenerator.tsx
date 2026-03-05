import React, { useState, useEffect, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { useDebounce } from '../hooks/useDebounce';
import { Download, Copy, Check, Info } from 'lucide-react';
import clsx from 'clsx';

export const QRCodeGenerator: React.FC = () => {
  const [text, setText] = useState<string>('');
  const debouncedText = useDebounce(text, 1000); // 1 second debounce
  const [isGenerating, setIsGenerating] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  // Effect to handle loading state during debounce
  useEffect(() => {
    if (text !== debouncedText) {
      setIsGenerating(true);
    } else {
      setIsGenerating(false);
    }
  }, [text, debouncedText]);

  const handleDownload = () => {
    const canvas = qrRef.current?.querySelector('canvas');
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'qrcode.png';
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto p-6 space-y-12 animate-in fade-in duration-700">
      
      {/* Header / Title */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-light tracking-tight text-gray-900">
          Minimalist QR
        </h1>
        <p className="text-gray-500 font-light">
          Instant, secure, registration-free.
        </p>
      </div>

      {/* Input Section */}
      <div className="w-full relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <span className="text-gray-400 font-light text-xl">
            {text ? '' : '→'}
          </span>
        </div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your URL or text here..."
          className="w-full py-6 pl-12 pr-6 text-xl bg-transparent border-b-2 border-gray-100 focus:border-black outline-none transition-colors placeholder:text-gray-300 font-light text-gray-800"
          autoFocus
        />
        <div className="absolute right-0 bottom-6">
           {isGenerating && (
             <div className="animate-pulse text-xs text-gray-400 font-medium tracking-widest uppercase">
               Generating...
             </div>
           )}
        </div>
      </div>

      {/* QR Code Display Section */}
      <div 
        className={clsx(
          "relative flex flex-col items-center justify-center p-8 rounded-2xl transition-all duration-500",
          debouncedText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        )}
      >
        <div 
          ref={qrRef}
          className="bg-white p-4 rounded-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-gray-100 transform transition-transform hover:scale-[1.02] duration-300"
        >
          {debouncedText && (
            <QRCodeCanvas
              value={debouncedText}
              size={256}
              level={"H"}
              includeMargin={true}
              imageSettings={{
                src: "",
                x: undefined,
                y: undefined,
                height: 24,
                width: 24,
                excavate: true,
              }}
            />
          )}
        </div>

        {/* Actions / Instructions */}
        <div className="mt-8 flex flex-col items-center space-y-4 text-gray-400">
          <div className="flex items-center space-x-2 text-sm font-light">
            <Info className="w-4 h-4" />
            <span>Right-click the image to save</span>
          </div>
          
          <button 
            onClick={handleDownload}
            className="flex items-center space-x-2 px-6 py-2 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors text-sm font-medium"
          >
            <Download className="w-4 h-4" />
            <span>Download PNG</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-6 text-xs text-gray-300 font-light tracking-wider uppercase">
        No Data Stored • Client-side Generation
      </div>
    </div>
  );
};
