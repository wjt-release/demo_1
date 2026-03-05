import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Input = ({ label, className, error, ...props }) => {
  return (
    <div className="w-full">
      {label && <label className="block text-xs uppercase tracking-widest mb-1 text-zinc-500">{label}</label>}
      <input
        className={twMerge(
          "w-full border-b border-zinc-300 py-2 outline-none focus:border-black transition-all bg-transparent placeholder-zinc-400",
          error && "border-red-500",
          className
        )}
        {...props}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};
