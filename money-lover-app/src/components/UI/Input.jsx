import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

/**
 * Input - Reusable input component with validation states
 * 
 * Features:
 * - Text, number, email, password input types
 * - Label support with proper association
 * - Error and success validation states
 * - Help text display
 * - Disabled state support
 * - Full width by default for mobile-first design
 * - Touch-friendly sizing (44px minimum)
 */
const Input = forwardRef(({ 
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  onFocus,
  disabled = false,
  required = false,
  error,
  success,
  helpText,
  className = '',
  id,
  name,
  ...props 
}, ref) => {
  // Generate unique ID if not provided
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  // Base input styles
  const baseInputStyles = `
    w-full px-3 py-3 text-base bg-white border rounded-lg
    transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1
    placeholder:text-gray-400 min-h-[44px]
    disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed
  `;

  // State-based border and focus styles
  const getStateStyles = () => {
    if (error) {
      return 'border-red-300 focus:border-red-500 focus:ring-red-500 text-red-900';
    }
    if (success) {
      return 'border-green-300 focus:border-green-500 focus:ring-green-500 text-green-900';
    }
    return 'border-gray-300 focus:border-primary focus:ring-primary text-gray-900';
  };

  // Label styles
  const labelStyles = `
    block text-sm font-medium mb-1
    ${error ? 'text-red-700' : success ? 'text-green-700' : 'text-gray-700'}
  `;

  // Help text and error message styles
  const messageStyles = `
    mt-1 text-sm
    ${error ? 'text-red-600' : success ? 'text-green-600' : 'text-gray-500'}
  `;

  const inputStyles = `
    ${baseInputStyles}
    ${getStateStyles()}
    ${className}
  `;

  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <label 
          htmlFor={inputId}
          className={labelStyles}
        >
          {label}
          {required && (
            <span className="text-red-500 ml-1" aria-label="required">
              *
            </span>
          )}
        </label>
      )}

      {/* Input Field */}
      <input
        ref={ref}
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={inputStyles}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={
          error ? `${inputId}-error` : 
          success ? `${inputId}-success` :
          helpText ? `${inputId}-help` : 
          undefined
        }
        {...props}
      />

      {/* Error Message */}
      {error && (
        <p 
          id={`${inputId}-error`}
          className={messageStyles}
          role="alert"
        >
          {error}
        </p>
      )}

      {/* Success Message */}
      {success && !error && (
        <p 
          id={`${inputId}-success`}
          className={messageStyles}
        >
          {success}
        </p>
      )}

      {/* Help Text */}
      {helpText && !error && !success && (
        <p 
          id={`${inputId}-help`}
          className={messageStyles}
        >
          {helpText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.oneOf(['text', 'number', 'email', 'password', 'tel', 'url']),
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  error: PropTypes.string,
  success: PropTypes.string,
  helpText: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string
};

export default Input;