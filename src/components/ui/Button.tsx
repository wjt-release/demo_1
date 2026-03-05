import { forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, disabled, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variants = {
      primary: 'bg-black text-white hover:bg-gray-800 active:scale-[0.98]',
      secondary: 'bg-gray-100 text-black hover:bg-gray-200 active:scale-[0.98]',
      outline: 'border-2 border-black text-black hover:bg-black hover:text-white',
      ghost: 'text-black hover:bg-gray-100',
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm rounded',
      md: 'px-6 py-3 text-sm rounded-md',
      lg: 'px-8 py-4 text-base rounded-lg',
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
        ) : null}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
