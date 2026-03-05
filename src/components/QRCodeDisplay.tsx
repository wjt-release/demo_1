import React, { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Download } from 'lucide-react';

interface QRCodeDisplayProps {
  value: string;
}

export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ value }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const downloadQRCode = () => {
    const canvas = containerRef.current?.querySelector('canvas');
    if (canvas) {
      const url = canvas.toDataURL("image/png");
      const link = document.createElement('a');
      link.href = url;
      link.download = 'qrcode.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (!value) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center bg-white p-8">
        <div className="text-zinc-300 text-6xl font-bold opacity-20 select-none">QR</div>
        <p className="mt-4 text-zinc-400 font-mono text-sm select-none">Waiting for input...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-white p-8 relative">
      <div className="relative group flex flex-col items-center">
        <div 
          ref={containerRef}
          className="bg-white p-4 rounded-xl shadow-2xl border border-zinc-100 transition-all duration-300 hover:shadow-xl hover:scale-105"
        >
          <QRCodeCanvas
            value={value}
            size={300}
            level={"H"}
            includeMargin={true}
            className="w-full h-full object-contain"
          />
        </div>
        
        <div className="mt-8 flex flex-col items-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <p className="text-xs text-zinc-400 font-mono uppercase tracking-widest select-none">
            Right-click to save or
          </p>
          <button 
            onClick={downloadQRCode}
            className="flex items-center gap-2 px-6 py-3 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors font-medium text-sm shadow-lg hover:shadow-xl active:scale-95 transform duration-150"
          >
            <Download size={16} />
            Download PNG
          </button>
        </div>
      </div>
    </div>
  );
};
