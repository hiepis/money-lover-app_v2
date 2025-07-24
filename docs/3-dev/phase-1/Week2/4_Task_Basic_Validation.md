# Week 2 Task 4: Basic Validation Implementation

## 1. Objective
Implement comprehensive validation system for the Personal Expense Tracker to ensure data integrity, prevent errors, and provide clear user feedback while maintaining the 10-second expense entry workflow.

---

## 2. Task Breakdown

### 2.1 Preparation
- [ ] Review PDC requirements for user experience and error prevention
- [ ] Study validation best practices for mobile forms
- [ ] Plan validation timing (real-time vs. on-submit)
- [ ] Design user-friendly error messages and recovery flows
- [ ] Plan accessibility features for validation feedback

### 2.2 Implementation
- [ ] Create core validation utilities (`src/utils/validation.js`):
  ```javascript
  // Core validation functions
  export const validateAmount = (amount) => {
    // Positive number validation, decimal precision
  };
  export const validateCategory = (categoryId, categories) => {
    // Category existence and validity
  };
  export const validateDate = (date) => {
    // Date format and range validation
  };
  export const validateDescription = (description) => {
    // Length and content validation
  };
  ```
- [ ] Build form validation hooks (`src/hooks/useFormValidation.js`):
  ```javascript
  export const useFormValidation = (schema, initialValues) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    
    // Real-time validation
    // Field-level validation
    // Form-level validation
    // Error state management
  };
  ```
- [ ] Implement expense validation schema (`src/schemas/expenseSchema.js`):
  - Amount: positive number, max 2 decimal places, reasonable range ($0.01-$999,999)
  - Category: required, must exist in categories list
  - Date: valid date, not future, within reasonable range (past 5 years)
  - Description: optional, max 200 characters, no special characters
- [ ] Create category validation schema (`src/schemas/categorySchema.js`):
  - Name: required, 1-30 characters, unique among existing categories
  - Color: valid hex color code, not already used by default categories
  - Icon: valid icon name from available icon set
- [ ] Build validation feedback components (`src/components/Validation/`):
  ```javascript
  // ErrorMessage.jsx - Accessible error display
  export const ErrorMessage = ({ error, fieldId }) => (
    <div 
      id={`${fieldId}-error`}
      role="alert"
      className="text-red-600 text-sm mt-1"
    >
      {error}
    </div>
  );
  
  // ValidationIndicator.jsx - Visual validation state
  export const ValidationIndicator = ({ isValid, hasError, isValidating }) => {
    // Green checkmark, red X, or loading spinner
  };
  ```
- [ ] Implement client-side data sanitization (`src/utils/sanitization.js`):
  - Amount formatting and cleanup
  - Text input sanitization (trim, escape)
  - Date normalization
  - Category name standardization
- [ ] Add validation middleware for localStorage operations:
  - Pre-save validation
  - Data integrity checks
  - Conflict resolution
  - Error recovery and rollback

### 2.3 Testing & Verification
- [ ] Test all validation rules with edge cases
- [ ] Verify error messages are clear and actionable
- [ ] Test real-time validation performance
- [ ] Validate accessibility of error feedback
- [ ] Test form submission with various invalid inputs
- [ ] Verify validation doesn't block legitimate use cases
- [ ] Test validation with network delays/failures
- [ ] Validate sanitization prevents XSS and data corruption

### 2.4 Documentation & Handoff
- [ ] Document all validation rules and error messages
- [ ] Create validation testing guidelines
- [ ] Record accessibility features and ARIA implementation
- [ ] Document validation performance considerations

---

## 3. Technology/Tools
- **Validation Logic**: Custom JavaScript validation functions
- **Form Handling**: React controlled components with validation hooks
- **Error Display**: ARIA-compliant error messages and indicators
- **Sanitization**: DOMPurify for text sanitization (if needed)
- **Date Validation**: date-fns for date manipulation and validation
- **Accessibility**: ARIA labels, roles, and live regions

---

## 4. Risks & Considerations
- **User Experience**: Validation shouldn't slow down the 10-second workflow
- **Accessibility**: Error messages must be announced by screen readers
- **Performance**: Real-time validation might impact typing performance
- **False Positives**: Over-strict validation might reject valid inputs
- **Security**: Client-side validation needs proper sanitization

---

## 5. Timeline & Responsibilities
- **Estimated Time**: 6-8 hours
- **Dependencies**: Week 2 Tasks 1-3 (Forms, Display, Data Integration)
- **Responsible**: Frontend Developer + QA Engineer
- **Priority**: High (prevents data corruption and improves UX)

---

## 6. Checklist
- [ ] All preparation steps completed
- [ ] Core validation utilities created
- [ ] Form validation hooks implemented
- [ ] Validation schemas defined
- [ ] Feedback components built
- [ ] Data sanitization added
- [ ] Validation middleware implemented
- [ ] Testing completed
- [ ] Documentation created

## 7. Success Criteria
- All invalid inputs are caught and clearly communicated
- Validation feedback is immediate and helpful
- Legitimate use cases are not blocked by validation
- Error messages are accessible to screen readers
- Form validation doesn't impact the 10-second entry goal
- Data corruption is prevented through proper validation
- Performance remains smooth with real-time validation

## 8. Validation Schema Implementation

### Expense Validation Schema
```javascript
export const expenseValidationSchema = {
  amount: {
    required: true,
    type: 'number',
    min: 0.01,
    max: 999999.99,
    decimalPlaces: 2,
    validate: (value) => {
      if (!value || isNaN(value)) {
        return 'Amount is required and must be a number';
      }
      if (value <= 0) {
        return 'Amount must be greater than $0.00';
      }
      if (value > 999999.99) {
        return 'Amount cannot exceed $999,999.99';
      }
      if (!/^\d+(\.\d{1,2})?$/.test(value.toString())) {
        return 'Amount can have at most 2 decimal places';
      }
      return null;
    }
  },
  
  categoryId: {
    required: true,
    type: 'string',
    validate: (value, context) => {
      if (!value) {
        return 'Please select a category';
      }
      const categoryExists = context.categories.some(cat => cat.id === value);
      if (!categoryExists) {
        return 'Selected category does not exist';
      }
      return null;
    }
  },
  
  date: {
    required: true,
    type: 'date',
    validate: (value) => {
      if (!value) {
        return 'Date is required';
      }
      
      const date = new Date(value);
      const today = new Date();
      const fiveYearsAgo = new Date();
      fiveYearsAgo.setFullYear(today.getFullYear() - 5);
      
      if (isNaN(date.getTime())) {
        return 'Please enter a valid date';
      }
      if (date > today) {
        return 'Date cannot be in the future';
      }
      if (date < fiveYearsAgo) {
        return 'Date cannot be more than 5 years ago';
      }
      return null;
    }
  },
  
  description: {
    required: false,
    type: 'string',
    maxLength: 200,
    validate: (value) => {
      if (value && value.length > 200) {
        return 'Description cannot exceed 200 characters';
      }
      // Check for potentially harmful content
      if (value && /<script|javascript:|data:/i.test(value)) {
        return 'Description contains invalid characters';
      }
      return null;
    }
  }
};
```

### Category Validation Schema
```javascript
export const categoryValidationSchema = {
  name: {
    required: true,
    type: 'string',
    minLength: 1,
    maxLength: 30,
    validate: (value, context) => {
      if (!value || !value.trim()) {
        return 'Category name is required';
      }
      if (value.trim().length > 30) {
        return 'Category name cannot exceed 30 characters';
      }
      
      // Check for uniqueness
      const existingNames = context.categories.map(cat => 
        cat.name.toLowerCase().trim()
      );
      if (existingNames.includes(value.toLowerCase().trim())) {
        return 'A category with this name already exists';
      }
      
      return null;
    }
  },
  
  color: {
    required: true,
    type: 'string',
    validate: (value, context) => {
      if (!value) {
        return 'Please select a color';
      }
      
      // Validate hex color format
      if (!/^#[0-9A-F]{6}$/i.test(value)) {
        return 'Color must be a valid hex code (e.g., #FF5733)';
      }
      
      // Check if color is already used by default categories
      const usedColors = context.categories
        .filter(cat => cat.isDefault)
        .map(cat => cat.color.toLowerCase());
        
      if (usedColors.includes(value.toLowerCase())) {
        return 'This color is already used by a default category';
      }
      
      return null;
    }
  }
};
```

## 9. Form Validation Hook Implementation

### useFormValidation Hook
```javascript
import { useState, useCallback, useEffect } from 'react';

export const useFormValidation = (schema, initialValues = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState(false);

  // Validate single field
  const validateField = useCallback((fieldName, value, context = {}) => {
    const fieldSchema = schema[fieldName];
    if (!fieldSchema) return null;

    // Run validation function
    if (fieldSchema.validate) {
      return fieldSchema.validate(value, context);
    }

    return null;
  }, [schema]);

  // Validate all fields
  const validateForm = useCallback((formValues = values, context = {}) => {
    const newErrors = {};
    
    Object.keys(schema).forEach(fieldName => {
      const error = validateField(fieldName, formValues[fieldName], context);
      if (error) {
        newErrors[fieldName] = error;
      }
    });

    return newErrors;
  }, [schema, values, validateField]);

  // Update field value and validate
  const setFieldValue = useCallback((fieldName, value) => {
    setValues(prev => ({ ...prev, [fieldName]: value }));
    
    // Real-time validation (debounced)
    const timeoutId = setTimeout(() => {
      const error = validateField(fieldName, value);
      setErrors(prev => ({
        ...prev,
        [fieldName]: error
      }));
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [validateField]);

  // Mark field as touched
  const setFieldTouched = useCallback((fieldName, isTouched = true) => {
    setTouched(prev => ({ ...prev, [fieldName]: isTouched }));
  }, []);

  // Submit form with validation
  const handleSubmit = useCallback(async (onSubmit, context = {}) => {
    setIsValidating(true);
    
    // Mark all fields as touched
    const allFields = Object.keys(schema);
    setTouched(allFields.reduce((acc, field) => {
      acc[field] = true;
      return acc;
    }, {}));

    // Validate form
    const formErrors = validateForm(values, context);
    setErrors(formErrors);

    const hasErrors = Object.keys(formErrors).length > 0;
    
    if (!hasErrors) {
      try {
        await onSubmit(values);
        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    } else {
      return { success: false, errors: formErrors };
    }
  }, [schema, values, validateForm]);

  // Update form validity
  useEffect(() => {
    const formErrors = validateForm();
    setIsValid(Object.keys(formErrors).length === 0);
  }, [values, validateForm]);

  return {
    values,
    errors,
    touched,
    isValid,
    isValidating,
    setFieldValue,
    setFieldTouched,
    handleSubmit,
    resetForm: () => {
      setValues(initialValues);
      setErrors({});
      setTouched({});
    }
  };
};
```

## 10. Validation Feedback Components

### ErrorMessage Component
```javascript
import React from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

export const ErrorMessage = ({ 
  error, 
  fieldId, 
  className = '' 
}) => {
  if (!error) return null;

  return (
    <div 
      id={`${fieldId}-error`}
      role="alert"
      aria-live="polite"
      className={`flex items-center space-x-1 text-red-600 text-sm mt-1 ${className}`}
    >
      <ExclamationCircleIcon className="w-4 h-4 flex-shrink-0" />
      <span>{error}</span>
    </div>
  );
};
```

### ValidationIndicator Component
```javascript
import React from 'react';
import { 
  CheckCircleIcon, 
  ExclamationCircleIcon,
  ArrowPathIcon 
} from '@heroicons/react/24/outline';

export const ValidationIndicator = ({ 
  isValid, 
  hasError, 
  isValidating,
  className = '' 
}) => {
  if (isValidating) {
    return (
      <ArrowPathIcon 
        className={`w-5 h-5 text-blue-500 animate-spin ${className}`}
        aria-label="Validating..."
      />
    );
  }

  if (hasError) {
    return (
      <ExclamationCircleIcon 
        className={`w-5 h-5 text-red-500 ${className}`}
        aria-label="Validation error"
      />
    );
  }

  if (isValid) {
    return (
      <CheckCircleIcon 
        className={`w-5 h-5 text-green-500 ${className}`}
        aria-label="Valid input"
      />
    );
  }

  return null;
};
```

## 11. Enhanced Form Components with Validation

### ValidatedInput Component
```javascript
import React from 'react';
import { ErrorMessage } from './ErrorMessage';
import { ValidationIndicator } from './ValidationIndicator';

export const ValidatedInput = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  touched,
  isValidating,
  required = false,
  ...inputProps
}) => {
  const hasError = touched && error;
  const isValid = touched && !error && value;

  return (
    <div className="space-y-1">
      <label 
        htmlFor={name}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="relative">
        <input
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={hasError ? 'true' : 'false'}
          aria-describedby={hasError ? `${name}-error` : undefined}
          className={`
            w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2
            ${hasError 
              ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
            }
          `}
          {...inputProps}
        />
        
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <ValidationIndicator
            isValid={isValid}
            hasError={hasError}
            isValidating={isValidating}
          />
        </div>
      </div>
      
      <ErrorMessage error={error} fieldId={name} />
    </div>
  );
};
```

## 12. Data Sanitization Functions

### Input Sanitization
```javascript
export const sanitizeAmount = (input) => {
  // Remove all non-numeric characters except decimal point
  const cleaned = input.toString().replace(/[^0-9.]/g, '');
  
  // Ensure only one decimal point
  const parts = cleaned.split('.');
  if (parts.length > 2) {
    return parts[0] + '.' + parts.slice(1).join('');
  }
  
  // Limit decimal places to 2
  if (parts[1] && parts[1].length > 2) {
    return parts[0] + '.' + parts[1].substring(0, 2);
  }
  
  return cleaned;
};

export const sanitizeText = (input, maxLength = 200) => {
  if (!input) return '';
  
  return input
    .toString()
    .trim()
    .slice(0, maxLength)
    .replace(/<script|javascript:|data:/gi, '') // Remove potentially harmful content
    .replace(/[<>]/g, ''); // Remove HTML tags
};

export const sanitizeDate = (input) => {
  const date = new Date(input);
  if (isNaN(date.getTime())) {
    return new Date().toISOString().split('T')[0];
  }
  return date.toISOString().split('T')[0];
};
```

## 13. Validation Performance Optimization

### Debounced Validation
```javascript
import { useCallback, useRef } from 'react';

export const useDebouncedValidation = (validationFn, delay = 300) => {
  const timeoutRef = useRef(null);

  const debouncedValidate = useCallback((value, callback) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      const result = validationFn(value);
      callback(result);
    }, delay);
  }, [validationFn, delay]);

  return debouncedValidate;
};
```

## 14. Next Steps
Upon completion, proceed to:
- Week 3 Phase 2 tasks (Category Management)
- Begin implementing advanced validation features
- Start building comprehensive error recovery systems