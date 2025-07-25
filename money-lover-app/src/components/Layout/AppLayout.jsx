import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Navigation from './Navigation';

/**
 * AppLayout - Main application layout component
 * 
 * Provides consistent structure with:
 * - Fixed header at top
 * - Scrollable main content area  
 * - Fixed bottom navigation
 * - Mobile-first responsive design
 */
const AppLayout = ({ children, currentPage, onPageChange, dailyTotal }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Fixed Header */}
      <Header dailyTotal={dailyTotal} />
      
      {/* Main Content Area - Scrollable */}
      <main className="flex-1 overflow-y-auto pb-20 pt-16">
        <div className="max-w-md mx-auto px-4 py-6 md:max-w-2xl lg:max-w-4xl">
          {children}
        </div>
      </main>
      
      {/* Fixed Bottom Navigation */}
      <Navigation 
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
  currentPage: PropTypes.string,
  onPageChange: PropTypes.func,
  dailyTotal: PropTypes.number
};

AppLayout.defaultProps = {
  currentPage: 'expenses',
  onPageChange: () => {},
  dailyTotal: 0
};

export default AppLayout;