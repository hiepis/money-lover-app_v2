import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../UI/Button';

/**
 * CategorySelector - Category selection component with visual icons
 * 
 * Features:
 * - Default expense categories with icons
 * - Visual grid layout for quick selection
 * - Active state indication
 * - Custom category support
 * - Accessibility with keyboard navigation
 * - Mobile-optimized touch targets
 * - Category colors for visual distinction
 */
const CategorySelector = ({
  value,
  onChange,
  categories = DEFAULT_CATEGORIES,
  allowCustom = true,
  label = 'Category',
  required = true,
  error,
  className = ''
}) => {
  const [customCategoryName, setCustomCategoryName] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  // Handle category selection
  const handleCategorySelect = (category) => {
    onChange(category);
    setShowCustomInput(false);
    setCustomCategoryName('');
  };

  // Handle custom category creation
  const handleCustomCategory = () => {
    if (customCategoryName.trim()) {
      const customCategory = {
        id: `custom-${Date.now()}`,
        name: customCategoryName.trim(),
        icon: '🏷️',
        color: 'bg-gray-100',
        isCustom: true
      };
      onChange(customCategory);
      setCustomCategoryName('');
      setShowCustomInput(false);
    }
  };

  // Handle custom input key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCustomCategory();
    } else if (e.key === 'Escape') {
      setShowCustomInput(false);
      setCustomCategoryName('');
    }
  };

  return (
    <div className={className}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Category Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-4">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => handleCategorySelect(category)}
            className={`
              flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all duration-200
              min-h-[80px] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1
              ${value?.id === category.id
                ? 'border-primary bg-blue-50 text-primary' 
                : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
              }
            `}
            aria-label={`Select ${category.name} category`}
            aria-pressed={value?.id === category.id}
          >
            {/* Category Icon */}
            <span className="text-2xl mb-1" role="img" aria-hidden="true">
              {category.icon}
            </span>
            
            {/* Category Name */}
            <span className="text-xs font-medium text-center leading-tight">
              {category.name}
            </span>
            
            {/* Selection Indicator */}
            {value?.id === category.id && (
              <div className="w-2 h-2 bg-primary rounded-full mt-1" aria-hidden="true" />
            )}
          </button>
        ))}

        {/* Add Custom Category Button */}
        {allowCustom && !showCustomInput && (
          <button
            type="button"
            onClick={() => setShowCustomInput(true)}
            className="
              flex flex-col items-center justify-center p-4 rounded-lg border-2 border-dashed
              border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100
              min-h-[80px] transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1
            "
            aria-label="Add custom category"
          >
            <span className="text-2xl mb-1">➕</span>
            <span className="text-xs font-medium text-gray-600 text-center">
              Add Custom
            </span>
          </button>
        )}
      </div>

      {/* Custom Category Input */}
      {showCustomInput && (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Custom Category Name
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={customCategoryName}
              onChange={(e) => setCustomCategoryName(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Enter category name"
              className="
                flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm
                focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
              "
              maxLength={20}
              autoFocus
            />
            <Button
              type="button"
              size="sm"
              onClick={handleCustomCategory}
              disabled={!customCategoryName.trim()}
            >
              Add
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => {
                setShowCustomInput(false);
                setCustomCategoryName('');
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Selected Category Display */}
      {value && (
        <div className="flex items-center space-x-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <span className="text-lg" role="img" aria-hidden="true">
            {value.icon}
          </span>
          <span className="text-sm font-medium text-blue-900">
            Selected: {value.name}
          </span>
          {value.isCustom && (
            <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded">
              Custom
            </span>
          )}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <p className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      {/* Help Text */}
      {!error && (
        <p className="mt-1 text-sm text-gray-500">
          Select a category for your expense
        </p>
      )}
    </div>
  );
};

// Default expense categories
const DEFAULT_CATEGORIES = [
  {
    id: 'food-dining',
    name: 'Food & Dining',
    icon: '🍽️',
    color: 'bg-orange-100'
  },
  {
    id: 'transportation',
    name: 'Transportation',
    icon: '🚗',
    color: 'bg-blue-100'
  },
  {
    id: 'shopping',
    name: 'Shopping',
    icon: '🛍️',
    color: 'bg-pink-100'
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    icon: '🎬',
    color: 'bg-purple-100'
  },
  {
    id: 'bills-utilities',
    name: 'Bills & Utilities',
    icon: '💡',
    color: 'bg-yellow-100'
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    icon: '🏥',
    color: 'bg-green-100'
  },
  {
    id: 'other',
    name: 'Other',
    icon: '📦',
    color: 'bg-gray-100'
  }
];

CategorySelector.propTypes = {
  value: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    color: PropTypes.string,
    isCustom: PropTypes.bool
  }),
  onChange: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    color: PropTypes.string
  })),
  allowCustom: PropTypes.bool,
  label: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.string,
  className: PropTypes.string
};

export { DEFAULT_CATEGORIES };
export default CategorySelector;