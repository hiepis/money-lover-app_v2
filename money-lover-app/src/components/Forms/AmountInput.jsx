import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Input from '../UI/Input';

/**
 * AmountInput - Specialized input for currency amounts with formatting
 * 
 * Features:
 * - Currency formatting with locale support
 * - Real-time formatting as user types
 * - Decimal precision control
 * - Negative amount prevention
 * - Auto-focus for quick entry
 * - Touch-optimized numeric keypad
 * - Validation for reasonable amounts
 */
const AmountInput = ({
  value,
  onChange,
  currency = 'USD',
  locale = 'en-US',
  maxAmount = 999999.99,
  minAmount = 0.01,
  allowDecimals = true,
  autoFocus = false,
  placeholder = '0.00',
  error,
  success,
  label = 'Amount',
  required = true,
  className = '',
  ...props
}) => {
  const [displayValue, setDisplayValue] = useState('');
  const [focused, setFocused] = useState(false);

  // Currency formatter
  const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return '';
    
    try {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: allowDecimals ? 2 : 0,
        maximumFractionDigits: allowDecimals ? 2 : 0
      }).format(amount);
    } catch (error) {
      // Fallback formatting if Intl fails
      const symbol = currency === 'USD' ? '$' : currency;
      return `${symbol}${amount.toFixed(allowDecimals ? 2 : 0)}`;
    }
  };

  // Parse display value to number
  const parseAmount = (displayValue) => {
    if (!displayValue) return 0;
    
    // Remove currency symbols, spaces, and commas
    const cleanValue = displayValue
      .replace(/[^\d.-]/g, '')
      .replace(/^-+/, '') // Remove leading dashes (no negative amounts)
      .replace(/-/g, ''); // Remove any remaining dashes
      
    const parsed = parseFloat(cleanValue);
    return isNaN(parsed) ? 0 : parsed;
  };

  // Format for display (without currency symbol when focused)
  const formatForDisplay = (amount, isFocused) => {
    if (!amount && amount !== 0) return '';
    
    if (isFocused) {
      // Show plain number when focused for easier editing
      return allowDecimals ? amount.toFixed(2) : amount.toString();
    } else {
      // Show formatted currency when not focused
      return formatCurrency(amount);
    }
  };

  // Validate amount
  const validateAmount = (amount) => {
    if (amount < minAmount) {
      return `Amount must be at least ${formatCurrency(minAmount)}`;
    }
    if (amount > maxAmount) {
      return `Amount cannot exceed ${formatCurrency(maxAmount)}`;
    }
    return null;
  };

  // Update display value when value prop changes
  useEffect(() => {
    const numericValue = typeof value === 'string' ? parseAmount(value) : value || 0;
    setDisplayValue(formatForDisplay(numericValue, focused));
  }, [value, focused, allowDecimals]);

  // Handle input change
  const handleChange = (e) => {
    const inputValue = e.target.value;
    
    // Allow empty input
    if (!inputValue) {
      setDisplayValue('');
      onChange(0);
      return;
    }

    // Parse and validate the amount
    const numericValue = parseAmount(inputValue);
    
    // Check if the value is within reasonable bounds for input
    if (numericValue <= maxAmount) {
      setDisplayValue(inputValue);
      onChange(numericValue);
    }
  };

  // Handle focus
  const handleFocus = (e) => {
    setFocused(true);
    const numericValue = typeof value === 'string' ? parseAmount(value) : value || 0;
    setDisplayValue(formatForDisplay(numericValue, true));
    
    // Select all text for easy replacement
    setTimeout(() => {
      e.target.select();
    }, 0);
  };

  // Handle blur
  const handleBlur = () => {
    setFocused(false);
    const numericValue = parseAmount(displayValue);
    setDisplayValue(formatForDisplay(numericValue, false));
    
    // Trigger validation
    const validationError = validateAmount(numericValue);
    if (validationError && !error) {
      // Only set validation error if no external error is provided
      return;
    }
  };

  // Generate validation error
  const numericValue = parseAmount(displayValue);
  const validationError = error || (numericValue > 0 ? validateAmount(numericValue) : null);

  return (
    <div className={className}>
      <Input
        type="text" // Use text to allow currency formatting
        inputMode="decimal" // Optimized mobile keyboard
        pattern="[0-9]*" // Helps with mobile keyboard
        value={displayValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={focused ? placeholder : formatCurrency(0)}
        label={label}
        required={required}
        error={validationError}
        success={success}
        autoFocus={autoFocus}
        className="text-right font-mono text-lg" // Right-align and use monospace for amounts
        helpText={!focused ? `Enter amount in ${currency}` : undefined}
        {...props}
      />
      
      {/* Amount guidelines */}
      {focused && (
        <div className="mt-1 text-xs text-gray-500">
          Range: {formatCurrency(minAmount)} - {formatCurrency(maxAmount)}
        </div>
      )}
    </div>
  );
};

AmountInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func.isRequired,
  currency: PropTypes.string,
  locale: PropTypes.string,
  maxAmount: PropTypes.number,
  minAmount: PropTypes.number,
  allowDecimals: PropTypes.bool,
  autoFocus: PropTypes.bool,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  success: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string
};

export default AmountInput;