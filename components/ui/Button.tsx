import { ButtonHTMLAttributes, forwardRef, ReactNode, ElementType } from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
  fullWidth?: boolean;
  asChild?: boolean;
}

type ButtonElement = HTMLButtonElement & {
  // Add any additional properties if needed
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  isLoading?: boolean;
  fullWidth?: boolean;
  asChild?: boolean;
  as?: ElementType;
  children?: ReactNode;
}

const Button = forwardRef<ButtonElement, ButtonProps>(({
  className,
  variant = 'primary',
  isLoading = false,
  fullWidth = false,
  asChild = false,
  as: Component = 'button',
  children,
  ...props
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 disabled:opacity-50 disabled:pointer-events-none';
  
  const variantStyles = {
    primary: 'bg-gradient-to-r from-orange-600 to-orange-500 text-white hover:from-orange-500 hover:to-orange-400 shadow-lg hover:shadow-orange-500/25',
    secondary: 'border border-orange-500 text-orange-400 hover:bg-orange-500/10',
    outline: 'border border-white/30 bg-transparent text-white hover:bg-white/10',
    ghost: 'hover:bg-white/5 text-orange-400 hover:text-orange-300',
  };

  const Comp = asChild ? Component : 'button';

  return (
    <Comp
      className={cn(
        baseStyles,
        variantStyles[variant],
        fullWidth && 'w-full',
        'px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base inline-flex items-center justify-center',
        className,
        {
          'cursor-not-allowed opacity-50': isLoading
        }
      )}
      ref={ref}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </>
      ) : (
        children
      )}
    </Comp>
  );
});

Button.displayName = 'Button';

export { Button };
export type { ButtonProps };
