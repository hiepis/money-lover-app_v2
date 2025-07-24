# Week 1 Task 5: Basic Routing Setup

## 1. Objective
Establish React Router configuration for the Personal Expense Tracker's single-page application structure, implementing mobile-first navigation patterns and route organization.

---

## 2. Task Breakdown

### 2.1 Preparation
- [ ] Review app navigation requirements from PDC (simple, mobile-first)
- [ ] Plan route structure for expense tracking workflows
- [ ] Study React Router v6 best practices and patterns
- [ ] Design mobile-first navigation UI/UX

### 2.2 Implementation
- [ ] Install and configure React Router (`src/App.jsx`):
  ```javascript
  import { BrowserRouter, Routes, Route } from 'react-router-dom';
  import { AppLayout } from './components/Layout/AppLayout';
  ```
- [ ] Define core application routes (`src/routes/index.js`):
  - `/` - Home/Dashboard (today's expenses + quick add)
  - `/expenses` - Full expense list with filters
  - `/add` - Dedicated expense entry form (mobile modal)
  - `/categories` - Category management interface
  - `/settings` - App settings and data management
- [ ] Create route components (`src/pages/`):
  - `HomePage.jsx` - Main dashboard with today's summary
  - `ExpensesPage.jsx` - Full expense list with filtering
  - `AddExpensePage.jsx` - Full-screen expense entry form
  - `CategoriesPage.jsx` - Category management interface
  - `SettingsPage.jsx` - App configuration and data tools
- [ ] Implement mobile navigation (`src/components/Navigation/`):
  - `BottomNavigation.jsx` - Primary mobile navigation bar
  - `NavigationItem.jsx` - Individual nav item component
  - `BackButton.jsx` - iOS-style back navigation
- [ ] Set up route protection and error boundaries:
  - 404 error page for invalid routes
  - Error boundary component for route-level errors
  - Loading states during route transitions
- [ ] Configure navigation animations:
  - Smooth transitions between routes
  - Mobile-friendly slide animations
  - Loading indicators for async operations

### 2.3 Testing & Verification
- [ ] Test all route navigation works correctly
- [ ] Verify mobile navigation UI/UX is intuitive
- [ ] Test browser back/forward button functionality
- [ ] Validate route transitions and animations
- [ ] Test deep linking to specific routes
- [ ] Verify 404 error handling
- [ ] Test navigation on different screen sizes

### 2.4 Documentation & Handoff
- [ ] Document route structure and purposes
- [ ] Create navigation flow diagrams
- [ ] Record mobile navigation design decisions
- [ ] Document routing patterns for team consistency

---

## 3. Technology/Tools
- **Routing**: React Router v6 (BrowserRouter)
- **Navigation**: Bottom tab navigation for mobile
- **Animations**: CSS transitions or Framer Motion (lightweight)
- **Icons**: Heroicons for navigation icons
- **State Management**: URL state for filters and navigation

---

## 4. Risks & Considerations
- **Mobile UX**: Navigation must be thumb-friendly and intuitive
- **Performance**: Route-based code splitting for faster loading
- **Browser Support**: Ensure routing works across mobile browsers
- **SEO**: Single-page app limitations for search engines
- **Deep Linking**: URLs should be shareable and bookmarkable

---

## 5. Timeline & Responsibilities
- **Estimated Time**: 4-6 hours
- **Dependencies**: Task 1 (Project Setup) and Task 2 (Components) must be complete
- **Responsible**: Frontend Developer
- **Priority**: High (foundation for all page-level development)

---

## 6. Checklist
- [ ] All preparation steps completed
- [ ] React Router configured
- [ ] Core routes defined and implemented
- [ ] Page components created
- [ ] Mobile navigation implemented
- [ ] Error handling configured
- [ ] Route testing completed
- [ ] Documentation created

## 7. Success Criteria
- All routes navigate correctly without errors
- Mobile navigation is intuitive and responsive
- Browser navigation (back/forward) works properly
- Route transitions are smooth and performant
- 404 errors are handled gracefully
- Deep linking works for all routes
- Navigation meets mobile usability standards

## 8. Route Structure Design

```javascript
// Main routing configuration
const routes = [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'expenses',
        element: <ExpensesPage />
      },
      {
        path: 'add',
        element: <AddExpensePage />
      },
      {
        path: 'categories',
        element: <CategoriesPage />
      },
      {
        path: 'settings',
        element: <SettingsPage />
      }
    ]
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
];
```

## 9. Mobile Navigation Specification

### Bottom Navigation Bar
```javascript
const navigationItems = [
  {
    path: '/',
    icon: 'home',
    label: 'Home',
    activeIcon: 'home-solid'
  },
  {
    path: '/expenses', 
    icon: 'list-bullet',
    label: 'Expenses',
    activeIcon: 'list-bullet-solid'
  },
  {
    path: '/add',
    icon: 'plus-circle',
    label: 'Add',
    activeIcon: 'plus-circle-solid',
    isPrimary: true // Highlighted add button
  },
  {
    path: '/categories',
    icon: 'tag',
    label: 'Categories', 
    activeIcon: 'tag-solid'
  },
  {
    path: '/settings',
    icon: 'cog-6-tooth',
    label: 'Settings',
    activeIcon: 'cog-6-tooth-solid'
  }
];
```

### Navigation UX Features
- **Thumb-friendly**: 44px minimum touch targets
- **Visual feedback**: Active state indicators
- **Badge support**: Unread counts or notifications
- **Accessibility**: ARIA labels and keyboard navigation
- **Consistent**: Same navigation across all pages

## 10. Page Component Structure

```javascript
// Example HomePage component structure
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTodaysExpenses, getTodaysTotal } from '../utils/expenseStorage';

export function HomePage() {
  const [todaysExpenses, setTodaysExpenses] = useState([]);
  const [todaysTotal, setTodaysTotal] = useState(0);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const expenses = getTodaysExpenses(today);
    setTodaysExpenses(expenses);
    setTodaysTotal(expenses.reduce((sum, exp) => sum + exp.amount, 0));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Today's Expenses</h1>
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <p className="text-lg">Total: ${todaysTotal.toFixed(2)}</p>
      </div>
      
      {/* Quick Add Button */}
      <Link 
        to="/add" 
        className="bg-blue-600 text-white px-6 py-3 rounded-lg block text-center mb-6"
      >
        + Add Expense
      </Link>
      
      {/* Recent Expenses */}
      <div className="space-y-2">
        {todaysExpenses.map(expense => (
          <ExpenseCard key={expense.id} expense={expense} />
        ))}
      </div>
    </div>
  );
}
```

## 11. Navigation Flow Design

```
Home (/) 
├── Quick view of today's expenses
├── Total spent today
├── Quick "Add Expense" button
└── Recent expenses list (last 5)

Expenses (/expenses)
├── Full expense list
├── Date filtering options
├── Search/filter functionality
└── Expense management (edit/delete)

Add (/add)
├── Full-screen expense entry form
├── Amount input (focus on load)
├── Category selection
└── Save/Cancel actions

Categories (/categories) 
├── Category list with colors
├── Add new category option
├── Edit existing categories
└── Delete category (with warnings)

Settings (/settings)
├── Data export/import
├── Clear all data option
├── App version info
└── About/help links
```

## 12. Next Steps
Upon completion, proceed to:
- Week 2 Task 1: Expense Entry Form Implementation
- Begin connecting routes with data utilities
- Start implementing the main dashboard functionality