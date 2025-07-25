import React from 'react';
import PropTypes from 'prop-types';

/**
 * Navigation - Bottom navigation component
 * 
 * Features:
 * - Mobile-first bottom tab design
 * - 4 primary navigation items
 * - Active state indication
 * - Touch-friendly 44px+ targets
 * - Accessible with proper ARIA labels
 */
const Navigation = ({ currentPage, onPageChange }) => {
  const navItems = [
    {
      id: 'expenses',
      label: 'Add',
      icon: '•',
      description: 'Add new expense'
    },
    {
      id: 'list',
      label: 'List',
      icon: '=Ë',
      description: 'View expense list'
    },
    {
      id: 'categories',
      label: 'Categories',
      icon: '<÷',
      description: 'Manage categories'
    },
    {
      id: 'summary',
      label: 'Summary',
      icon: '=Ê',
      description: 'View summaries'
    }
  ];

  const handleNavClick = (pageId) => {
    onPageChange(pageId);
  };

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-md mx-auto md:max-w-2xl lg:max-w-4xl">
        <div className="flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`
                flex-1 flex flex-col items-center justify-center py-2 px-1 min-h-[60px]
                transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset
                ${currentPage === item.id 
                  ? 'text-primary bg-blue-50 border-t-2 border-primary' 
                  : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                }
              `}
              aria-label={item.description}
              aria-current={currentPage === item.id ? 'page' : undefined}
            >
              {/* Icon */}
              <span className="text-xl mb-1" role="img" aria-hidden="true">
                {item.icon}
              </span>
              
              {/* Label */}
              <span className="text-xs font-medium leading-none">
                {item.label}
              </span>
              
              {/* Active indicator dot */}
              {currentPage === item.id && (
                <div className="w-1 h-1 bg-primary rounded-full mt-1" aria-hidden="true" />
              )}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

Navigation.propTypes = {
  currentPage: PropTypes.string.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Navigation;