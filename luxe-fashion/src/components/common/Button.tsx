import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { clsx } from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  loading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 ease-out disabled:cursor-not-allowed'

    const variantStyles = {
      primary:
        'bg-black text-white hover:bg-gray-800 active:bg-gray-900 disabled:bg-gray-300 disabled:text-gray-500',
      secondary:
        'bg-white text-black border border-black hover:bg-gray-50 active:bg-gray-100 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-300',
      outline:
        'bg-transparent text-black border border-gray-300 hover:border-black hover:bg-gray-50 active:bg-gray-100 disabled:text-gray-400 disabled:border-gray-300',
      ghost:
        'bg-transparent text-black hover:bg-gray-100 active:bg-gray-200 disabled:text-gray-400',
    }

    const sizeStyles = {
      sm: 'px-4 py-2 text-small',
      md: 'px-6 py-3 text-body',
      lg: 'px-8 py-4 text-body',
    }

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={clsx(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
