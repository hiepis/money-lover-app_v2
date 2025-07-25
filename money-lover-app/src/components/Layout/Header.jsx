import React from 'react';
import PropTypes from 'prop-types';

/**
 * Header - Application header component
 * 
 * Features:
 * - App title and branding
 * - Daily total display  
 * - Responsive design for mobile/desktop
 * - Fixed position at top
 */
const Header = ({ dailyTotal, currency = 'USD' }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-md mx-auto px-4 py-3 md:max-w-2xl lg:max-w-4xl">
        <div className="flex items-center justify-between">
          {/* App Title */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">$</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 md:text-xl">
                Money Lover
              </h1>
              <p className="text-xs text-gray-500 hidden sm:block">
                Personal Expense Tracker
              </p>
            </div>
          </div>

          {/* Daily Total */}
          <div className="text-right">
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Today's Total
            </p>
            <p className="text-lg font-bold text-gray-900 md:text-xl">
              {formatCurrency(dailyTotal)}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  dailyTotal: PropTypes.number,
  currency: PropTypes.string
};

Header.defaultProps = {
  dailyTotal: 0,
  currency: 'USD'
};

export default Header;