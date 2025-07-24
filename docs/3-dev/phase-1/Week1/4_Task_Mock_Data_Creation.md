# Week 1 Task 4: Mock Data Creation & Development Setup

## 1. Objective
Create comprehensive mock data and development utilities to support rapid prototyping and testing of the Personal Expense Tracker during development phases.

---

## 2. Task Breakdown

### 2.1 Preparation
- [ ] Review default categories from PDC requirements
- [ ] Study realistic expense patterns for mock data generation
- [ ] Plan data variety for comprehensive testing scenarios
- [ ] Design mock data that reflects real user behavior patterns

### 2.2 Implementation
- [ ] Create default category data (`src/data/defaultCategories.js`):
  ```javascript
  export const DEFAULT_CATEGORIES = [
    { id: 'food-dining', name: 'Food & Dining', color: '#ef4444', icon: 'utensils' },
    { id: 'transportation', name: 'Transportation', color: '#3b82f6', icon: 'car' },
    { id: 'shopping', name: 'Shopping', color: '#8b5cf6', icon: 'shopping-bag' },
    { id: 'entertainment', name: 'Entertainment', color: '#06b6d4', icon: 'film' },
    { id: 'bills-utilities', name: 'Bills & Utilities', color: '#eab308', icon: 'zap' },
    { id: 'healthcare', name: 'Healthcare', color: '#10b981', icon: 'heart' },
    { id: 'other', name: 'Other', color: '#6b7280', icon: 'dots-horizontal' }
  ];
  ```
- [ ] Generate realistic expense mock data (`src/data/mockExpenses.js`):
  - 30-50 expenses spanning last 2 months
  - Varied amounts ($5-$500 range)
  - Realistic descriptions and categories
  - Different spending patterns (daily, weekly, monthly)
  - Edge cases (large amounts, multiple same-day expenses)
- [ ] Create data generation utilities (`src/utils/mockDataGenerator.js`):
  - `generateRandomExpenses(count, dateRange)` - Generate test expenses
  - `generateMonthlyPattern(month, pattern)` - Create pattern-based data
  - `seedDevelopmentData()` - Initialize app with development data
  - `clearAllData()` - Reset app to clean state
  - `exportSampleData()` - Export data for testing purposes
- [ ] Implement development mode utilities (`src/utils/devUtils.js`):
  - Development environment detection
  - Quick data reset functions
  - Data import/export for testing
  - Performance monitoring utilities
- [ ] Create realistic expense scenarios:
  - **Typical weekday**: Coffee ($4), lunch ($12), transport ($8)
  - **Weekend shopping**: Groceries ($85), entertainment ($25)
  - **Monthly bills**: Utilities ($120), healthcare ($45)
  - **Occasional large**: Electronics ($250), dining out ($65)

### 2.3 Testing & Verification
- [ ] Verify all default categories load correctly
- [ ] Test mock data covers all expense categories
- [ ] Validate data variety and realistic patterns
- [ ] Test data generation functions work reliably
- [ ] Verify mock data doesn't interfere with production
- [ ] Test data export/import functionality
- [ ] Validate performance with generated large datasets

### 2.4 Documentation & Handoff
- [ ] Document all mock data structures and purposes
- [ ] Create development workflow instructions
- [ ] Record data generation patterns and rationale
- [ ] Document testing scenarios covered by mock data

---

## 3. Technology/Tools
- **Data Format**: JavaScript objects and arrays
- **Date Generation**: Date utilities for realistic date ranges
- **Random Generation**: Controlled randomness for consistent testing
- **Development Environment**: Environment-specific data loading
- **Export Format**: JSON for easy data portability

---

## 4. Risks & Considerations
- **Data Realism**: Mock data should reflect actual user patterns
- **Performance**: Large mock datasets might slow development
- **Environment Isolation**: Dev data shouldn't appear in production
- **Data Consistency**: Generated data should be internally consistent
- **Testing Coverage**: Mock data should cover edge cases and error scenarios

---

## 5. Timeline & Responsibilities
- **Estimated Time**: 4-6 hours
- **Dependencies**: Task 3 (localStorage Utilities) must be complete
- **Responsible**: Frontend Developer + QA Tester
- **Priority**: Medium (supports development and testing)

---

## 6. Checklist
- [ ] All preparation steps completed
- [ ] Default categories created
- [ ] Mock expense data generated
- [ ] Data generation utilities implemented
- [ ] Development utilities created
- [ ] Testing completed
- [ ] Documentation created
- [ ] Development workflow established

## 7. Success Criteria
- Default categories load and display correctly
- Mock data provides comprehensive testing scenarios
- Data generation utilities work reliably
- Development workflow is streamlined
- Mock data performs well in the application
- All data structures match schema requirements
- Development team can quickly reset and test with fresh data

## 8. Default Categories Specification

```javascript
const DEFAULT_CATEGORIES = [
  {
    id: 'food-dining',
    name: 'Food & Dining',
    color: '#ef4444', // Red
    icon: 'utensils',
    isDefault: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'transportation',
    name: 'Transportation', 
    color: '#3b82f6', // Blue
    icon: 'car',
    isDefault: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'shopping',
    name: 'Shopping',
    color: '#8b5cf6', // Purple
    icon: 'shopping-bag',
    isDefault: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    color: '#06b6d4', // Cyan
    icon: 'film',
    isDefault: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'bills-utilities',
    name: 'Bills & Utilities',
    color: '#eab308', // Yellow
    icon: 'zap',
    isDefault: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    color: '#10b981', // Green
    icon: 'heart',
    isDefault: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'other',
    name: 'Other',
    color: '#6b7280', // Gray
    icon: 'dots-horizontal',
    isDefault: true,
    createdAt: new Date().toISOString()
  }
];
```

## 9. Sample Mock Data Pattern

```javascript
// Example realistic expense entries
const SAMPLE_EXPENSES = [
  {
    id: 'exp-001',
    amount: 4.50,
    categoryId: 'food-dining',
    description: 'Morning coffee',
    date: '2024-01-15',
    createdAt: '2024-01-15T08:30:00Z'
  },
  {
    id: 'exp-002',
    amount: 12.99,
    categoryId: 'food-dining', 
    description: 'Lunch - sandwich combo',
    date: '2024-01-15',
    createdAt: '2024-01-15T12:45:00Z'
  },
  {
    id: 'exp-003',
    amount: 85.67,
    categoryId: 'shopping',
    description: 'Weekly groceries',
    date: '2024-01-14',
    createdAt: '2024-01-14T18:20:00Z'
  },
  {
    id: 'exp-004',
    amount: 8.00,
    categoryId: 'transportation',
    description: 'Bus fare - round trip',
    date: '2024-01-14',
    createdAt: '2024-01-14T09:15:00Z'
  }
];
```

## 10. Development Utilities

```javascript
// Quick development commands
export const devUtils = {
  // Reset to clean state
  resetApp: () => {
    localStorage.clear();
    window.location.reload();
  },
  
  // Load sample data
  loadSampleData: () => {
    initializeDefaultCategories();
    loadMockExpenses();
  },
  
  // Generate test data
  generateTestMonth: (expenseCount = 30) => {
    return generateRandomExpenses(expenseCount, {
      startDate: startOfMonth(new Date()),
      endDate: endOfMonth(new Date())
    });
  }
};
```

## 11. Next Steps
Upon completion, proceed to:
- Task 5: Basic Routing Setup
- Begin integrating mock data with UI components
- Start building the main expense list display