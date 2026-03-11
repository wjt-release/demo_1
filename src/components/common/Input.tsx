import { InputHTMLAttributes, forwardRef, ReactNode } from 'react';
import { clsx } from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, fullWidth = true, className, ...props }, ref) => {
    return (
      <div className={clsx('flex flex-col gap-2', fullWidth && 'w-full')}>
        {label && (
          <label className="text-sm font-medium text-primary">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={clsx(
              'w-full px-4 py-3 border transition-all duration-200 ease-out',
              'focus:outline-none',
              error
                ? 'border-status-error focus:border-status-error'
                : 'border-gray-200 focus:border-primary',
              icon && 'pl-12',
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <span className="text-sm text-status-error">{error}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
