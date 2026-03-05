import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface ButtonProps {
  children?: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      fullWidth = false,
      className,
      disabled,
      type = 'button',
      onClick,
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      primary:
        'bg-neutral-900 text-white hover:bg-neutral-800 focus:ring-neutral-900',
      secondary:
        'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 focus:ring-neutral-300',
      outline:
        'border-2 border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white focus:ring-neutral-900',
      ghost:
        'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 focus:ring-neutral-300',
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm rounded',
      md: 'px-6 py-3 text-sm rounded-md',
      lg: 'px-8 py-4 text-base rounded-lg',
    };

    return (
      <motion.button
        ref={ref}
        type={type}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
        className={clsx(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        disabled={disabled || isLoading}
        onClick={onClick}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            <span>加载中...</span>
          </div>
        ) : (
          children
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
