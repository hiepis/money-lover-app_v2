import React from 'react';
import PropTypes from 'prop-types';

/**
 * Card - Reusable container component for content display
 * 
 * Features:
 * - Consistent white background with subtle shadow
 * - Rounded corners for modern appearance
 * - Multiple padding options
 * - Optional header and footer sections
 * - Hover states for interactive cards
 * - Mobile-first responsive design
 */
const Card = ({ 
  children,
  header,
  footer,
  padding = 'md',
  hoverable = false,
  onClick,
  className = '',
  ...props 
}) => {
  // Base card styles
  const baseStyles = `
    bg-white rounded-lg border border-gray-200 shadow-sm
    ${hoverable ? 'transition-all duration-200 hover:shadow-md hover:border-gray-300 cursor-pointer' : ''}
    ${onClick ? 'cursor-pointer' : ''}
  `;

  // Padding options
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6', 
    lg: 'p-8'
  };

  // Header styles
  const headerStyles = `
    ${paddingStyles[padding]} ${paddingStyles[padding] !== '' ? 'pb-0' : ''}
    border-b border-gray-100
  `;

  // Footer styles  
  const footerStyles = `
    ${paddingStyles[padding]} ${paddingStyles[padding] !== '' ? 'pt-0' : ''}
    border-t border-gray-100 bg-gray-50 rounded-b-lg
  `;

  // Content styles
  const contentStyles = `
    ${header || footer ? paddingStyles[padding] : paddingStyles[padding]}
    ${header ? (paddingStyles[padding] !== '' ? 'pt-0' : '') : ''}
    ${footer ? (paddingStyles[padding] !== '' ? 'pb-0' : '') : ''}
  `;

  const cardStyles = `${baseStyles} ${className}`;

  return (
    <div 
      className={cardStyles}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(e);
        }
      } : undefined}
      {...props}
    >
      {/* Header Section */}
      {header && (
        <div className={headerStyles}>
          {header}
        </div>
      )}

      {/* Main Content */}
      <div className={contentStyles}>
        {children}
      </div>

      {/* Footer Section */}
      {footer && (
        <div className={footerStyles}>
          {footer}
        </div>
      )}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.node,
  footer: PropTypes.node,
  padding: PropTypes.oneOf(['none', 'sm', 'md', 'lg']),
  hoverable: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string
};

/**
 * CardHeader - Semantic header component for cards
 */
export const CardHeader = ({ children, className = '' }) => (
  <div className={`font-semibold text-gray-900 ${className}`}>
    {children}
  </div>
);

CardHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

/**
 * CardContent - Semantic content component for cards  
 */
export const CardContent = ({ children, className = '' }) => (
  <div className={`text-gray-600 ${className}`}>
    {children}
  </div>
);

CardContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

/**
 * CardFooter - Semantic footer component for cards
 */
export const CardFooter = ({ children, className = '' }) => (
  <div className={`flex items-center justify-between ${className}`}>
    {children}
  </div>
);

CardFooter.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default Card;