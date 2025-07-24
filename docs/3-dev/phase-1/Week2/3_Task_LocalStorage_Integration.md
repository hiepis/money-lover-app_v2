# Week 2 Task 3: localStorage Integration & Data Flow

## 1. Objective
Integrate localStorage utilities with React components to create a seamless data flow, ensuring real-time updates, data persistence, and robust error handling throughout the Personal Expense Tracker.

---

## 2. Task Breakdown

### 2.1 Preparation
- [ ] Review completed localStorage utilities from Week 1 Task 3
- [ ] Plan React state management integration with localStorage
- [ ] Design data synchronization strategies for real-time updates
- [ ] Plan error handling and recovery mechanisms
- [ ] Study React patterns for data persistence and caching

### 2.2 Implementation
- [ ] Create custom React hooks for data management (`src/hooks/`):
  ```javascript
  // useExpenses.js - Expense data management
  export const useExpenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // CRUD operations with localStorage integration
    const addExpense = async (expenseData) => { /* ... */ };
    const updateExpense = async (id, updates) => { /* ... */ };
    const deleteExpense = async (id) => { /* ... */ };
    
    return { expenses, loading, error, addExpense, updateExpense, deleteExpense };
  };
  ```
- [ ] Build category management hook (`src/hooks/useCategories.js`):
  - Load and cache categories from localStorage
  - CRUD operations for categories
  - Default categories initialization
  - Category validation and conflict resolution
- [ ] Implement data synchronization context (`src/contexts/DataContext.jsx`):
  ```javascript
  const DataContext = createContext();
  
  export const DataProvider = ({ children }) => {
    // Global state management for expenses and categories
    // Real-time data synchronization
    // Error boundary integration
    // Data validation and migration
  };
  ```
- [ ] Create localStorage event listeners (`src/hooks/useStorageSync.js`):
  - Cross-tab synchronization
  - Storage event handling
  - Data conflict resolution
  - Automatic refresh on external changes
- [ ] Build data validation layer (`src/utils/dataValidation.js`):
  ```javascript
  export const validateAndSanitizeExpense = (expense) => {
    // Validate expense data structure
    // Sanitize input values
    // Handle data migration if needed
    // Return validated expense or throw error
  };
  ```
- [ ] Implement optimistic updates pattern:
  - Immediate UI updates for better UX
  - Rollback mechanism for failed operations
  - Conflict resolution strategies
  - Loading state management
- [ ] Add data backup and recovery (`src/utils/dataBackup.js`):
  - Automatic backup creation before major operations
  - Recovery from corrupted data
  - Data export/import functionality
  - Version tracking and migration

### 2.3 Testing & Verification
- [ ] Test CRUD operations with real localStorage
- [ ] Verify data persistence across browser sessions
- [ ] Test error handling and recovery scenarios
- [ ] Validate cross-tab synchronization
- [ ] Test optimistic updates and rollback functionality
- [ ] Verify data validation prevents corruption
- [ ] Test performance with large datasets
- [ ] Validate memory usage and cleanup

### 2.4 Documentation & Handoff
- [ ] Document data flow architecture and patterns
- [ ] Create hook usage examples and best practices
- [ ] Record error handling strategies and recovery procedures
- [ ] Document performance optimization techniques

---

## 3. Technology/Tools
- **State Management**: React hooks (useState, useEffect, useContext)
- **Data Persistence**: Browser localStorage API
- **Error Handling**: Try-catch with custom error types
- **Cross-tab Sync**: Storage event listeners
- **Performance**: React.memo, useMemo, useCallback
- **Validation**: Custom validation functions

---

## 4. Risks & Considerations
- **Data Corruption**: localStorage data can become corrupted
- **Cross-tab Conflicts**: Multiple tabs might cause data inconsistencies
- **Memory Leaks**: Event listeners and state must be properly cleaned up
- **Performance**: Large datasets might slow down React re-renders
- **Browser Compatibility**: localStorage behavior varies across browsers

---

## 5. Timeline & Responsibilities
- **Estimated Time**: 8-10 hours
- **Dependencies**: Week 1 Task 3 (localStorage Utilities) and Week 2 Tasks 1-2
- **Responsible**: Frontend Developer + Data Engineer
- **Priority**: Critical (connects UI with data layer)

---

## 6. Checklist
- [ ] All preparation steps completed
- [ ] Custom hooks for data management created
- [ ] Data synchronization context implemented
- [ ] Storage event listeners working
- [ ] Data validation layer built
- [ ] Optimistic updates pattern implemented
- [ ] Backup and recovery system added
- [ ] Testing completed
- [ ] Documentation created

## 7. Success Criteria
- All CRUD operations work reliably with localStorage
- Real-time updates reflect across all components
- Data persists correctly across browser sessions
- Error handling prevents data loss
- Cross-tab synchronization works smoothly
- Performance remains good with 1000+ expenses
- Memory usage is stable without leaks

## 8. Custom Hooks Implementation

### useExpenses Hook
```javascript
import { useState, useEffect, useCallback } from 'react';
import { 
  getAllExpenses, 
  addExpense as saveExpense, 
  updateExpense as saveUpdate,
  deleteExpense as saveDelete 
} from '../utils/expenseStorage';

export const useExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load expenses on mount
  useEffect(() => {
    const loadExpenses = async () => {
      try {
        setLoading(true);
        const data = await getAllExpenses();
        setExpenses(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Failed to load expenses:', err);
      } finally {
        setLoading(false);
      }
    };

    loadExpenses();
  }, []);

  // Add new expense with optimistic update
  const addExpense = useCallback(async (expenseData) => {
    try {
      // Optimistic update
      const tempId = `temp-${Date.now()}`;
      const tempExpense = { ...expenseData, id: tempId };
      setExpenses(prev => [tempExpense, ...prev]);

      // Save to localStorage
      const savedExpense = await saveExpense(expenseData);
      
      // Replace temp expense with real one
      setExpenses(prev => 
        prev.map(exp => exp.id === tempId ? savedExpense : exp)
      );

      return savedExpense;
    } catch (err) {
      // Rollback optimistic update
      setExpenses(prev => prev.filter(exp => exp.id !== tempId));
      setError(err.message);
      throw err;
    }
  }, []);

  // Update expense
  const updateExpense = useCallback(async (id, updates) => {
    try {
      // Store original for rollback
      const originalExpenses = expenses;
      
      // Optimistic update
      setExpenses(prev => 
        prev.map(exp => exp.id === id ? { ...exp, ...updates } : exp)
      );

      // Save to localStorage
      const updatedExpense = await saveUpdate(id, updates);
      
      // Update with saved data
      setExpenses(prev => 
        prev.map(exp => exp.id === id ? updatedExpense : exp)
      );

      return updatedExpense;
    } catch (err) {
      // Rollback on error
      setExpenses(originalExpenses);
      setError(err.message);
      throw err;
    }
  }, [expenses]);

  // Delete expense
  const deleteExpense = useCallback(async (id) => {
    try {
      // Store original for rollback
      const originalExpenses = expenses;
      
      // Optimistic update
      setExpenses(prev => prev.filter(exp => exp.id !== id));

      // Delete from localStorage
      await saveDelete(id);
    } catch (err) {
      // Rollback on error
      setExpenses(originalExpenses);
      setError(err.message);
      throw err;
    }
  }, [expenses]);

  return {
    expenses,
    loading,
    error,
    addExpense,
    updateExpense,
    deleteExpense,
    refresh: () => window.location.reload() // Emergency refresh
  };
};
```

### useCategories Hook
```javascript
export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        let data = await getCategories();
        
        // Initialize default categories if none exist
        if (data.length === 0) {
          await initializeDefaultCategories();
          data = await getCategories();
        }
        
        setCategories(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const addCategory = useCallback(async (categoryData) => {
    try {
      const newCategory = await saveCategory(categoryData);
      setCategories(prev => [...prev, newCategory]);
      return newCategory;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  return { categories, loading, error, addCategory };
};
```

## 9. Data Context Implementation

### DataProvider Context
```javascript
import { createContext, useContext, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const expenses = useExpenses();
  const categories = useCategories();
  const [lastSync, setLastSync] = useState(new Date());

  // Cross-tab synchronization
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'expenses' || e.key === 'categories') {
        // Reload data when changed in another tab
        setLastSync(new Date());
        window.location.reload();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Global error handling
  const globalError = expenses.error || categories.error;
  
  const value = {
    expenses: expenses.expenses,
    categories: categories.categories,
    loading: expenses.loading || categories.loading,
    error: globalError,
    lastSync,
    actions: {
      addExpense: expenses.addExpense,
      updateExpense: expenses.updateExpense,
      deleteExpense: expenses.deleteExpense,
      addCategory: categories.addCategory
    }
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
```

## 10. Optimistic Updates Pattern

### Implementation Strategy
```javascript
const useOptimisticUpdate = (asyncOperation, optimisticUpdate, rollback) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const execute = useCallback(async (...args) => {
    try {
      setIsUpdating(true);
      
      // Apply optimistic update immediately
      optimisticUpdate(...args);
      
      // Perform actual operation
      const result = await asyncOperation(...args);
      
      return result;
    } catch (error) {
      // Rollback optimistic changes
      rollback(...args);
      throw error;
    } finally {
      setIsUpdating(false);
    }
  }, [asyncOperation, optimisticUpdate, rollback]);

  return { execute, isUpdating };
};
```

## 11. Data Validation Layer

### Validation Functions
```javascript
export const validateExpenseData = (expense) => {
  const errors = {};

  // Amount validation
  if (!expense.amount || isNaN(expense.amount) || expense.amount <= 0) {
    errors.amount = 'Amount must be a positive number';
  }

  // Category validation
  if (!expense.categoryId || typeof expense.categoryId !== 'string') {
    errors.categoryId = 'Valid category is required';
  }

  // Date validation
  if (!expense.date || !isValidDate(expense.date)) {
    errors.date = 'Valid date is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const sanitizeExpenseData = (expense) => {
  return {
    id: expense.id || generateId(),
    amount: parseFloat(expense.amount),
    categoryId: String(expense.categoryId).trim(),
    description: String(expense.description || '').trim().slice(0, 200),
    date: formatDate(expense.date),
    createdAt: expense.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
};
```

## 12. Error Recovery System

### Backup and Recovery
```javascript
export const createDataBackup = () => {
  const backup = {
    timestamp: new Date().toISOString(),
    expenses: getAllExpenses(),
    categories: getCategories(),
    version: '1.0'
  };
  
  localStorage.setItem('expense_tracker_backup', JSON.stringify(backup));
  return backup;
};

export const restoreFromBackup = () => {
  try {
    const backupData = localStorage.getItem('expense_tracker_backup');
    if (!backupData) throw new Error('No backup found');
    
    const backup = JSON.parse(backupData);
    
    // Restore data
    localStorage.setItem('expenses', JSON.stringify(backup.expenses));
    localStorage.setItem('categories', JSON.stringify(backup.categories));
    
    return true;
  } catch (error) {
    console.error('Failed to restore backup:', error);
    return false;
  }
};
```

## 13. Performance Monitoring

### Usage Tracking
```javascript
export const useDataMetrics = () => {
  const [metrics, setMetrics] = useState({
    expenseCount: 0,
    storageUsed: 0,
    lastOperation: null
  });

  useEffect(() => {
    const updateMetrics = () => {
      const expenses = getAllExpenses();
      const storageUsed = JSON.stringify({
        expenses,
        categories: getCategories()
      }).length;

      setMetrics({
        expenseCount: expenses.length,
        storageUsed,
        lastOperation: new Date().toISOString()
      });
    };

    updateMetrics();
    
    // Update metrics every 30 seconds
    const interval = setInterval(updateMetrics, 30000);
    return () => clearInterval(interval);
  }, []);

  return metrics;
};
```

## 14. Next Steps
Upon completion, proceed to:
- Task 4: Basic Validation Implementation
- Begin building advanced features (edit/delete)
- Start implementing summary and calculation features