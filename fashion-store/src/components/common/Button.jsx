import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Button = ({ children, variant = 'primary', className, ...props }) => {
  const baseStyles = 'px-6 py-3 uppercase tracking-widest text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-black text-white hover:bg-zinc-800',
    secondary: 'border border-black text-black hover:bg-black hover:text-white',
    ghost: 'text-black hover:text-zinc-600 px-0 py-0',
    outline: 'border border-zinc-300 text-black hover:border-black'
  };

  return (
    <button 
      className={twMerge(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};
