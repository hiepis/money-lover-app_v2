import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../UI/Button';
import Input from '../UI/Input';
import Card from '../UI/Card';
import AmountInput from './AmountInput';
import CategorySelector from './CategorySelector';

/**
 * ExpenseForm - Complete expense entry form for 10-second workflow
 * 
 * Features:
 * - Optimized for 10-second expense entry
 * - Real-time validation
 * - Auto-focus progression
 * - Mobile-first design
 * - Accessibility compliance
 * - Error handling and user feedback
 * - Optional description field
 * - Today's date default
 */
const ExpenseForm = ({
  onSubmit,
  onCancel,
  initialData = {},
  loading = false,
  className = ''
}) => {
  // Form state
  const [formData, setFormData] = useState({
    amount: initialData.amount || 0,
    category: initialData.category || null,
    description: initialData.description || '',
    date: initialData.date || new Date().toISOString().split('T')[0]
  });

  // Validation errors
  const [errors, setErrors] = useState({});
  
  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update form field
  const updateField = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts fixing it
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Amount validation
    if (!formData.amount || formData.amount <= 0) {
      newErrors.amount = 'Amount is required and must be greater than 0';
    } else if (formData.amount > 999999.99) {
      newErrors.amount = 'Amount cannot exceed $999,999.99';
    }

    // Category validation
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    // Date validation
    if (!formData.date) {
      newErrors.date = 'Date is required';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
      
      if (selectedDate > today) {
        newErrors.date = 'Date cannot be in the future';
      } else if (selectedDate < oneYearAgo) {
        newErrors.date = 'Date cannot be more than a year ago';
      }
    }

    // Description validation (optional but with length limit)
    if (formData.description && formData.description.length > 100) {
      newErrors.description = 'Description cannot exceed 100 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const expenseData = {
        ...formData,
        id: initialData.id || `expense-${Date.now()}`,
        createdAt: initialData.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await onSubmit(expenseData);
      
      // Reset form after successful submission (unless editing)
      if (!initialData.id) {
        setFormData({
          amount: 0,
          category: null,
          description: '',
          date: new Date().toISOString().split('T')[0]
        });
      }
    } catch (error) {
      console.error('Error submitting expense:', error);
      setErrors({
        submit: 'Failed to save expense. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      // Reset form
      setFormData({
        amount: 0,
        category: null,
        description: '',
        date: new Date().toISOString().split('T')[0]
      });
      setErrors({});
    }
  };

  const isEditing = !!initialData.id;
  const hasUnsavedChanges = JSON.stringify(formData) !== JSON.stringify(initialData);

  return (
    <Card className={className}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Form Header */}
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900">
            {isEditing ? 'Edit Expense' : 'Add New Expense'}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {isEditing ? 'Update your expense details' : 'Quick expense entry in seconds'}
          </p>
        </div>

        {/* Amount Input - Primary field with auto-focus */}
        <AmountInput
          value={formData.amount}
          onChange={(amount) => updateField('amount', amount)}
          autoFocus={!isEditing}
          error={errors.amount}
          required
        />

        {/* Category Selection */}
        <CategorySelector
          value={formData.category}
          onChange={(category) => updateField('category', category)}
          error={errors.category}
          required
        />

        {/* Date Input */}
        <Input
          type="date"
          label="Date"
          value={formData.date}
          onChange={(e) => updateField('date', e.target.value)}
          error={errors.date}
          required
          helpText="When did this expense occur?"
        />

        {/* Description Input - Optional */}
        <Input
          type="text"
          label="Description (Optional)"
          value={formData.description}
          onChange={(e) => updateField('description', e.target.value)}
          placeholder="Brief description of the expense"
          error={errors.description}
          helpText={`${formData.description.length}/100 characters`}
          maxLength={100}
        />

        {/* Submit Error */}
        {errors.submit && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-sm text-red-600" role="alert">
              {errors.submit}
            </p>
          </div>
        )}

        {/* Form Actions */}
        <div className="flex space-x-3 pt-4">
          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={isSubmitting || loading}
            disabled={!formData.amount || !formData.category}
          >
            {isSubmitting || loading ? 'Saving...' : isEditing ? 'Update Expense' : 'Add Expense'}
          </Button>
          
          {(onCancel || hasUnsavedChanges) && (
            <Button
              type="button"
              variant="secondary"
              onClick={handleCancel}
              disabled={isSubmitting || loading}
            >
              Cancel
            </Button>
          )}
        </div>

        {/* Form Summary for quick review */}
        {formData.amount > 0 && formData.category && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Summary</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <div className="flex justify-between">
                <span>Amount:</span>
                <span className="font-mono">
                  ${typeof formData.amount === 'number' ? formData.amount.toFixed(2) : '0.00'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Category:</span>
                <span className="flex items-center space-x-1">
                  <span>{formData.category.icon}</span>
                  <span>{formData.category.name}</span>
                </span>
              </div>
              <div className="flex justify-between">
                <span>Date:</span>
                <span>{new Date(formData.date).toLocaleDateString()}</span>
              </div>
              {formData.description && (
                <div className="flex justify-between">
                  <span>Note:</span>
                  <span className="truncate ml-2">{formData.description}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </form>
    </Card>
  );
};

ExpenseForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  initialData: PropTypes.shape({
    id: PropTypes.string,
    amount: PropTypes.number,
    category: PropTypes.object,
    description: PropTypes.string,
    date: PropTypes.string,
    createdAt: PropTypes.string
  }),
  loading: PropTypes.bool,
  className: PropTypes.string
};

export default ExpenseForm;