import React from 'react';
import PropTypes from 'prop-types';

/**
 * Button - Reusable button component with multiple variants
 * 
 * Features:
 * - Primary, Secondary, Success variants
 * - Multiple sizes (sm, md, lg)
 * - Disabled state support
 * - Loading state with spinner
 * - Full width option
 * - Touch-friendly targets (44px minimum)
 */
const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  type = 'button',
  onClick,
  className = '',
  ...props 
}) => {
  // Base styles applied to all buttons
  const baseStyles = `
    inline-flex items-center justify-center font-medium rounded-lg
    transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
    ${fullWidth ? 'w-full' : ''}
  `;

  // Variant styles
  const variantStyles = {
    primary: `
      bg-primary text-white shadow-sm
      hover:bg-blue-700 focus:ring-primary
      active:bg-blue-800
    `,
    secondary: `
      bg-gray-100 text-gray-700 border border-gray-300
      hover:bg-gray-200 hover:border-gray-400 focus:ring-gray-500
      active:bg-gray-300
    `,
    success: `
      bg-success text-white shadow-sm
      hover:bg-green-700 focus:ring-success
      active:bg-green-800
    `,
    danger: `
      bg-red-600 text-white shadow-sm
      hover:bg-red-700 focus:ring-red-600
      active:bg-red-800
    `,
    ghost: `
      text-gray-600 bg-transparent
      hover:bg-gray-100 focus:ring-gray-500
      active:bg-gray-200
    `
  };

  // Size styles
  const sizeStyles = {
    sm: 'px-3 py-2 text-sm min-h-[36px]',
    md: 'px-4 py-3 text-base min-h-[44px]', // Touch-friendly default
    lg: 'px-6 py-4 text-lg min-h-[52px]'
  };

  // Loading spinner component
  const LoadingSpinner = () => (
    <svg 
      className="animate-spin -ml-1 mr-2 h-4 w-4" 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
      aria-hidden="true"
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
  );

  // Combine all styles
  const buttonStyles = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${className}
  `;

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={buttonStyles}
      {...props}
    >
      {loading && <LoadingSpinner />}
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'ghost']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  fullWidth: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: PropTypes.func,
  className: PropTypes.string
};

export default Button;