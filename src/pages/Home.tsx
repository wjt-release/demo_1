import React, { useState, useEffect } from 'react';
import { InputArea } from '../components/InputArea';
import { QRCodeDisplay } from '../components/QRCodeDisplay';

export const Home: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [debouncedValue, setDebouncedValue] = useState<string>('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 500); // 500ms debounce

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue]);

  return (
    <div className="flex flex-col md:flex-row w-full h-screen bg-white overflow-hidden">
      {/* Input Section - Takes up 50% on desktop, full on mobile */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full">
        <InputArea value={inputValue} onChange={setInputValue} />
      </div>

      {/* QR Display Section - Takes up 50% on desktop, full on mobile */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full border-t md:border-t-0 md:border-l border-zinc-100">
        <QRCodeDisplay value={debouncedValue} />
      </div>
    </div>
  );
};
