import React from 'react';

interface InputAreaProps {
  value: string;
  onChange: (value: string) => void;
}

export const InputArea: React.FC<InputAreaProps> = ({ value, onChange }) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-8 bg-zinc-50 border-r border-zinc-200">
      <div className="w-full max-w-xl">
        <label 
          htmlFor="qr-input" 
          className="block text-sm font-medium text-zinc-500 mb-4 uppercase tracking-wider"
        >
          Enter Content
        </label>
        <textarea
          id="qr-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste your URL or text here..."
          className="w-full h-64 text-4xl font-bold bg-transparent border-none outline-none resize-none placeholder-zinc-300 text-zinc-900 leading-tight focus:ring-0"
          autoFocus
        />
        <div className="mt-4 text-xs text-zinc-400 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span>Instant Generation Active</span>
        </div>
      </div>
    </div>
  );
};
