import React from 'react';
import PropTypes from 'prop-types';

/**
 * Loading - Reusable loading component with multiple variants
 * 
 * Features:
 * - Spinner, skeleton, and dots animations
 * - Multiple sizes (sm, md, lg)
 * - Customizable colors
 * - Accessibility support with proper labels
 * - Overlay option for full-screen loading
 * - Mobile-optimized animations
 */
const Loading = ({ 
  variant = 'spinner',
  size = 'md',
  color = 'primary',
  overlay = false,
  text,
  className = ''
}) => {
  // Size configurations
  const sizeConfig = {
    sm: {
      spinner: 'w-4 h-4',
      text: 'text-sm',
      container: 'space-y-2'
    },
    md: {
      spinner: 'w-8 h-8',
      text: 'text-base',
      container: 'space-y-3'
    },
    lg: {
      spinner: 'w-12 h-12',
      text: 'text-lg',
      container: 'space-y-4'
    }
  };

  // Color configurations
  const colorConfig = {
    primary: 'text-primary',
    secondary: 'text-gray-600',
    white: 'text-white',
    success: 'text-success'
  };

  // Spinner component
  const Spinner = () => (
    <svg 
      className={`animate-spin ${sizeConfig[size].spinner} ${colorConfig[color]}`}
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

  // Dots component
  const Dots = () => (
    <div className={`flex space-x-1 ${colorConfig[color]}`}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`
            ${size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : 'w-4 h-4'}
            bg-current rounded-full animate-pulse
          `}
          style={{
            animationDelay: `${i * 0.2}s`,
            animationDuration: '1s'
          }}
        />
      ))}
    </div>
  );

  // Skeleton component
  const Skeleton = () => (
    <div className="animate-pulse space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    </div>
  );

  // Pulse component
  const Pulse = () => (
    <div className={`
      ${size === 'sm' ? 'w-8 h-8' : size === 'md' ? 'w-12 h-12' : 'w-16 h-16'}
      ${colorConfig[color]} bg-current rounded-full animate-ping opacity-75
    `} />
  );

  // Render loading variant
  const renderLoading = () => {
    switch (variant) {
      case 'spinner':
        return <Spinner />;
      case 'dots':
        return <Dots />;
      case 'skeleton':
        return <Skeleton />;
      case 'pulse':
        return <Pulse />;
      default:
        return <Spinner />;
    }
  };

  // Loading content
  const loadingContent = (
    <div 
      className={`
        flex flex-col items-center justify-center
        ${sizeConfig[size].container}
        ${className}
      `}
      role="status" 
      aria-live="polite"
      aria-label={text || 'Loading...'}
    >
      {renderLoading()}
      {text && (
        <p className={`${sizeConfig[size].text} ${colorConfig[color]} font-medium`}>
          {text}
        </p>
      )}
    </div>
  );

  // Overlay wrapper
  if (overlay) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg p-6">
          {loadingContent}
        </div>
      </div>
    );
  }

  return loadingContent;
};

Loading.propTypes = {
  variant: PropTypes.oneOf(['spinner', 'dots', 'skeleton', 'pulse']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  color: PropTypes.oneOf(['primary', 'secondary', 'white', 'success']),
  overlay: PropTypes.bool,
  text: PropTypes.string,
  className: PropTypes.string
};

export default Loading;