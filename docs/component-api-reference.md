# Money Lover - Component API Reference

A comprehensive guide to all React components in the Personal Expense Tracker application. This documentation provides complete API references, usage examples, and best practices for each component.

## Table of Contents

- [Layout Components](#layout-components)
- [UI Components](#ui-components)
- [Form Components](#form-components)
- [Design System](#design-system)
- [Accessibility Guidelines](#accessibility-guidelines)
- [Best Practices](#best-practices)

---

## Layout Components

### AppLayout

Main application layout wrapper providing consistent structure and responsive design.

**Props**

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `children` | `node` | - | ✅ | Content to render in the main area |
| `currentPage` | `string` | `'expenses'` | ❌ | Current active page for navigation |
| `onPageChange` | `func` | `() => {}` | ❌ | Callback when navigation changes |
| `dailyTotal` | `number` | `0` | ❌ | Daily spending total for header display |

**Usage Example**

```jsx
import AppLayout from './components/Layout/AppLayout'

function App() {
  const [currentPage, setCurrentPage] = useState('expenses')
  const [dailyTotal, setDailyTotal] = useState(127.50)

  return (
    <AppLayout 
      currentPage={currentPage}
      onPageChange={setCurrentPage}
      dailyTotal={dailyTotal}
    >
      <ExpenseForm onSubmit={handleExpenseSubmit} />
    </AppLayout>
  )
}
```

**Key Features**
- Mobile-first responsive design
- Fixed header and navigation with scrollable content
- Automatic spacing management (pt-16, pb-20)
- Consistent layout across all pages

**Accessibility**
- Semantic layout structure with proper landmarks
- Focus management between layout sections
- Screen reader navigation support

---

### Header

Application header displaying branding and daily spending total.

**Props**

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `dailyTotal` | `number` | `0` | ❌ | Daily spending total to display |
| `currency` | `string` | `'USD'` | ❌ | Currency for amount formatting |

**Usage Example**

```jsx
import Header from './components/Layout/Header'

function MyApp() {
  return (
    <Header 
      dailyTotal={89.75} 
      currency="EUR" 
    />
  )
}
```

**Key Features**
- International currency formatting with `Intl.NumberFormat`
- Responsive typography scaling from mobile to desktop
- Fixed positioning with proper z-index management
- Clean, minimal design with brand focus

**Supported Currencies**
- USD (Default), EUR, GBP, JPY, CAD, AUD, and all ISO 4217 currency codes

---

### Navigation

Bottom navigation with touch-friendly tabs for mobile-first navigation.

**Props**

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `currentPage` | `string` | - | ✅ | Currently active page identifier |
| `onPageChange` | `func` | - | ✅ | Callback when user selects different page |

**Usage Example**

```jsx
import Navigation from './components/Layout/Navigation'

function App() {
  const [currentPage, setCurrentPage] = useState('expenses')

  return (
    <Navigation 
      currentPage={currentPage}
      onPageChange={setCurrentPage}
    />
  )
}
```

**Available Pages**

| Page ID | Label | Icon | Description |
|---------|-------|------|-------------|
| `expenses` | Add | ✚ | Add new expense |
| `list` | List | ≡ | View expense list |
| `categories` | Categories | ≡ | Manage categories |
| `summary` | Summary | ≡ | View summaries |

**Accessibility Features**
- ARIA labels for each navigation item
- Keyboard navigation support (Tab, Enter, Space)
- Active state indicators (`aria-current="page"`)
- Touch-friendly 60px minimum height
- Screen reader descriptions for each action

---

## UI Components

### Button

Versatile button component with multiple variants, sizes, and states.

**Props**

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `children` | `node` | - | ✅ | Button content (text, icons, etc.) |
| `variant` | `'primary' \| 'secondary' \| 'success' \| 'danger' \| 'ghost'` | `'primary'` | ❌ | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | ❌ | Button size |
| `disabled` | `bool` | `false` | ❌ | Disabled state |
| `loading` | `bool` | `false` | ❌ | Loading state with spinner |
| `fullWidth` | `bool` | `false` | ❌ | Full width button |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | ❌ | HTML button type |
| `onClick` | `func` | - | ❌ | Click event handler |
| `className` | `string` | `''` | ❌ | Additional CSS classes |

**Usage Examples**

```jsx
import Button from './components/UI/Button'

// Basic usage
<Button onClick={handleClick}>Save Changes</Button>

// Variants
<Button variant="primary">Primary Action</Button>
<Button variant="secondary">Secondary Action</Button>
<Button variant="success">Success Action</Button>
<Button variant="danger">Delete Item</Button>
<Button variant="ghost">Cancel</Button>

// Sizes
<Button size="sm">Small Button</Button>
<Button size="md">Medium Button</Button>
<Button size="lg">Large Button</Button>

// States
<Button disabled>Disabled Button</Button>
<Button loading>Saving...</Button>
<Button fullWidth>Full Width Button</Button>

// Form usage
<Button type="submit" variant="primary">
  Submit Form
</Button>
```

**Variant Specifications**

| Variant | Background | Text Color | Hover State | Use Case |
|---------|------------|------------|-------------|----------|
| `primary` | Blue (#2563eb) | White | Darker blue | Main actions |
| `secondary` | Light gray | Dark gray | Gray border | Secondary actions |
| `success` | Green (#059669) | White | Darker green | Positive actions |
| `danger` | Red (#dc2626) | White | Darker red | Destructive actions |
| `ghost` | Transparent | Gray | Light background | Subtle actions |

**Size Specifications**

| Size | Padding | Text Size | Min Height | Use Case |
|------|---------|-----------|------------|----------|
| `sm` | 12px 16px | 14px | 36px | Compact interfaces |
| `md` | 16px 20px | 16px | 44px | Default (touch-friendly) |
| `lg` | 20px 24px | 18px | 52px | Prominent actions |

**Accessibility Features**
- Keyboard activation (Enter, Space)
- Focus indicators with 2px ring
- Loading state prevents multiple submissions
- Disabled state properly conveyed to screen readers
- Touch-friendly minimum 44px height

---

### Input

Form input component with validation states and comprehensive accessibility.

**Props**

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `label` | `string` | - | ❌ | Input label text |
| `type` | `'text' \| 'number' \| 'email' \| 'password' \| 'tel' \| 'url'` | `'text'` | ❌ | HTML input type |
| `placeholder` | `string` | - | ❌ | Placeholder text |
| `value` | `string \| number` | - | ❌ | Input value |
| `onChange` | `func` | - | ❌ | Change event handler |
| `onBlur` | `func` | - | ❌ | Blur event handler |
| `onFocus` | `func` | - | ❌ | Focus event handler |
| `disabled` | `bool` | `false` | ❌ | Disabled state |
| `required` | `bool` | `false` | ❌ | Required field |
| `error` | `string` | - | ❌ | Error message |
| `success` | `string` | - | ❌ | Success message |
| `helpText` | `string` | - | ❌ | Help text |
| `className` | `string` | `''` | ❌ | Additional CSS classes |
| `id` | `string` | - | ❌ | Input ID (auto-generated if not provided) |
| `name` | `string` | - | ❌ | Input name attribute |

**Usage Examples**

```jsx
import Input from './components/UI/Input'

// Basic usage
<Input 
  label="Email Address"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="Enter your email"
/>

// Required field with validation
<Input 
  label="Password"
  type="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  required
  error={passwordError}
  helpText="Must be at least 8 characters"
/>

// Success state
<Input 
  label="Username"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
  success="Username is available!"
/>

// Disabled state
<Input 
  label="Account ID"
  value={accountId}
  disabled
  helpText="This field cannot be modified"
/>
```

**Validation States**

| State | Border Color | Focus Ring | Message Color | Icon |
|-------|--------------|------------|---------------|------|
| Default | Gray | Blue | - | - |
| Error | Red | Red | Red | ❌ |
| Success | Green | Green | Green | ✅ |

**Accessibility Features**
- Auto-generated unique IDs for label association
- Proper ARIA attributes (`aria-invalid`, `aria-describedby`)
- Screen reader support with role="alert" for errors
- Required field indicators
- Touch-friendly 44px minimum height
- Focus management and keyboard navigation

---

### Card

Flexible container component for organizing content with optional headers and footers.

**Props**

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `children` | `node` | - | ✅ | Card content |
| `header` | `node` | - | ❌ | Optional header content |
| `footer` | `node` | - | ❌ | Optional footer content |
| `padding` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'md'` | ❌ | Internal padding size |
| `hoverable` | `bool` | `false` | ❌ | Add hover effects |
| `onClick` | `func` | - | ❌ | Click handler (makes card interactive) |
| `className` | `string` | `''` | ❌ | Additional CSS classes |

**Usage Examples**

```jsx
import Card, { CardHeader, CardContent, CardFooter } from './components/UI/Card'

// Basic usage
<Card>
  <h3>Card Title</h3>
  <p>Card content goes here...</p>
</Card>

// With padding options
<Card padding="lg">
  <h2>Large Padding Card</h2>
</Card>

// Interactive card
<Card hoverable onClick={handleCardClick}>
  <p>Click me!</p>
</Card>

// Using semantic components
<Card>
  <CardHeader>
    <h2>Expense Summary</h2>
  </CardHeader>
  <CardContent>
    <p>Today's total: $45.67</p>
  </CardContent>
  <CardFooter>
    <Button variant="secondary">View Details</Button>
  </CardFooter>
</Card>

// With header and footer props
<Card 
  header={<h3>Quick Stats</h3>}
  footer={<Button>Action</Button>}
>
  <div>Card content</div>
</Card>
```

**Padding Specifications**

| Size | Padding | Use Case |
|------|---------|----------|
| `none` | 0px | Full-width content |
| `sm` | 16px | Compact layouts |
| `md` | 24px | Default spacing |
| `lg` | 32px | Spacious layouts |

**Semantic Components**

```jsx
// CardHeader - Semantic header section
<Card.Header className="border-b">
  <h2>Section Title</h2>
</Card.Header>

// CardContent - Main content area
<Card.Content>
  <p>Main content goes here</p>
</Card.Content>

// CardFooter - Actions or additional info
<Card.Footer className="border-t pt-4">
  <Button variant="primary">Action</Button>
</Card.Footer>
```

---

### Modal

Accessible modal dialog with focus management and keyboard navigation.

**Props**

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `isOpen` | `bool` | - | ✅ | Modal visibility state |
| `onClose` | `func` | - | ✅ | Function to close modal |
| `title` | `string` | - | ❌ | Modal title |
| `children` | `node` | - | ✅ | Modal content |
| `footer` | `node` | - | ❌ | Optional footer content |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | ❌ | Modal size |
| `closeOnBackdrop` | `bool` | `true` | ❌ | Close when clicking backdrop |
| `closeOnEscape` | `bool` | `true` | ❌ | Close on Escape key |
| `preventClose` | `bool` | `false` | ❌ | Prevent closing (for critical actions) |

**Usage Examples**

```jsx
import Modal, { ConfirmModal } from './components/UI/Modal'

// Basic modal
function MyComponent() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Open Modal
      </Button>
      
      <Modal 
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Edit Expense"
      >
        <ExpenseForm onSubmit={handleSubmit} />
      </Modal>
    </>
  )
}

// Large modal with footer
<Modal 
  isOpen={isModalOpen}
  onClose={closeModal}
  title="Expense Details"
  size="lg"
  footer={
    <div className="flex gap-3">
      <Button variant="secondary" onClick={closeModal}>
        Cancel
      </Button>
      <Button variant="primary" onClick={handleSave}>
        Save Changes
      </Button>
    </div>
  }
>
  <div>Detailed expense information...</div>
</Modal>

// Confirmation modal
<ConfirmModal 
  isOpen={showConfirm}
  onClose={() => setShowConfirm(false)}
  onConfirm={handleDelete}
  title="Delete Expense"
  message="Are you sure you want to delete this expense? This action cannot be undone."
  confirmText="Delete"
  cancelText="Keep"
  variant="danger"
/>

// Prevent accidental closing
<Modal 
  isOpen={isProcessing}
  onClose={() => {}}
  title="Processing Payment"
  preventClose={true}
  closeOnBackdrop={false}
  closeOnEscape={false}
>
  <Loading text="Processing your payment..." />
</Modal>
```

**Size Specifications**

| Size | Max Width | Use Case |
|------|-----------|----------|
| `sm` | 384px | Confirmations, alerts |
| `md` | 512px | Forms, details |
| `lg` | 768px | Complex forms |
| `xl` | 1024px | Rich content |
| `full` | 100vw | Full-screen experience |

**ConfirmModal Props**

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `isOpen` | `bool` | - | ✅ | Modal visibility |
| `onClose` | `func` | - | ✅ | Cancel handler |
| `onConfirm` | `func` | - | ✅ | Confirm handler |
| `title` | `string` | `'Confirm Action'` | ❌ | Modal title |
| `message` | `string` | - | ✅ | Confirmation message |
| `confirmText` | `string` | `'Confirm'` | ❌ | Confirm button text |
| `cancelText` | `string` | `'Cancel'` | ❌ | Cancel button text |
| `variant` | `'primary' \| 'secondary' \| 'success' \| 'danger'` | `'primary'` | ❌ | Confirm button style |

**Accessibility Features**
- Portal rendering for proper stacking context
- Focus trapping within modal
- Focus restoration to trigger element
- Keyboard navigation (Tab, Shift+Tab, Escape)
- ARIA attributes (`role="dialog"`, `aria-modal`, `aria-labelledby`)
- Background scroll prevention
- Screen reader announcements

---

### Loading

Loading indicator component with multiple animation variants.

**Props**

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `variant` | `'spinner' \| 'dots' \| 'skeleton' \| 'pulse'` | `'spinner'` | ❌ | Animation type |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | ❌ | Size of loading indicator |
| `color` | `'primary' \| 'secondary' \| 'white' \| 'success'` | `'primary'` | ❌ | Color theme |
| `overlay` | `bool` | `false` | ❌ | Show as full-screen overlay |
| `text` | `string` | - | ❌ | Loading message |
| `className` | `string` | `''` | ❌ | Additional CSS classes |

**Usage Examples**

```jsx
import Loading from './components/UI/Loading'

// Basic spinner
<Loading />

// Different variants
<Loading variant="spinner" text="Loading..." />
<Loading variant="dots" text="Processing..." />
<Loading variant="skeleton" />
<Loading variant="pulse" />

// Different sizes and colors
<Loading variant="spinner" size="lg" color="success" />
<Loading variant="dots" size="sm" color="white" />

// Full-screen overlay
<Loading 
  variant="spinner" 
  overlay 
  text="Saving your changes..." 
/>

// In buttons
<Button loading>
  {isLoading ? 'Saving...' : 'Save Changes'}
</Button>

// Content loading placeholder
<div className="space-y-4">
  <Loading variant="skeleton" className="h-6 w-3/4" />
  <Loading variant="skeleton" className="h-4 w-1/2" />
  <Loading variant="skeleton" className="h-4 w-2/3" />
</div>
```

**Variant Descriptions**

| Variant | Animation | Best For |
|---------|-----------|----------|
| `spinner` | Rotating circle | General loading |
| `dots` | Three pulsing dots | Text/data loading |
| `skeleton` | Subtle shimmer | Content placeholders |
| `pulse` | Single pulsing circle | Minimal loading states |

**Size Specifications**

| Size | Dimensions | Text Size |
|------|------------|-----------|
| `sm` | 16px | text-sm |
| `md` | 24px | text-base |
| `lg` | 32px | text-lg |

**Accessibility Features**
- `role="status"` for screen reader announcements
- `aria-live="polite"` for dynamic updates
- `aria-label` descriptions
- Hidden decorative elements (`aria-hidden="true"`)

---

## Form Components

### ExpenseForm

Complete expense entry form optimized for the 10-second workflow.

**Props**

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `onSubmit` | `func` | - | ✅ | Form submission handler |
| `onCancel` | `func` | - | ❌ | Cancel handler |
| `initialData` | `object` | `{}` | ❌ | Pre-populate form data |
| `loading` | `bool` | `false` | ❌ | Submission loading state |
| `className` | `string` | `''` | ❌ | Additional CSS classes |

**Initial Data Shape**

```typescript
{
  id?: string,              // Expense ID (for editing)
  amount?: number,          // Amount in decimal (25.50)
  category?: object,        // Category object from CategorySelector
  description?: string,     // Optional description
  date?: string,           // ISO date string
  createdAt?: string,      // ISO timestamp
  updatedAt?: string       // ISO timestamp
}
```

**Usage Examples**

```jsx
import ExpenseForm from './components/Forms/ExpenseForm'

// New expense
function AddExpense() {
  const handleSubmit = (expenseData) => {
    console.log('New expense:', expenseData)
    // Save expense to database/localStorage
  }

  return (
    <ExpenseForm onSubmit={handleSubmit} />
  )
}

// Edit existing expense
function EditExpense({ expense }) {
  const handleSubmit = (updatedData) => {
    console.log('Updated expense:', updatedData)
    // Update expense in database
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <ExpenseForm 
      initialData={expense}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      loading={isSubmitting}
    />
  )
}

// With validation
function ExpenseFormWithValidation() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (data) => {
    setIsLoading(true)
    try {
      await saveExpense(data)
      showSuccess('Expense saved successfully!')
    } catch (error) {
      showError('Failed to save expense')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ExpenseForm 
      onSubmit={handleSubmit}
      loading={isLoading}
    />
  )
}
```

**Form Validation Rules**

| Field | Rules | Error Messages |
|-------|-------|----------------|
| Amount | Required, > 0, ≤ 999,999.99 | "Amount is required", "Amount must be greater than 0", "Amount too large" |
| Category | Required selection | "Please select a category" |
| Date | Required, not future, within 1 year | "Date is required", "Future dates not allowed", "Date too old" |
| Description | Optional, max 100 chars | "Description too long (max 100 characters)" |

**Submitted Data Structure**

```javascript
{
  id: "uuid-string",           // Auto-generated or provided
  amount: 25.50,               // Parsed number
  category: {                  // Selected category object
    id: "food-dining",
    name: "Food & Dining", 
    icon: "🍽️",
    color: "bg-orange-100"
  },
  description: "Lunch at cafe", // Optional string
  date: "2025-07-25",          // ISO date string
  createdAt: "2025-07-25T10:30:00Z",  // ISO timestamp
  updatedAt: "2025-07-25T10:30:00Z"   // ISO timestamp
}
```

**Key Features**
- 10-second expense entry workflow optimization
- Real-time validation with visual feedback
- Keyboard-friendly navigation (Tab order)
- Auto-focus on amount field for quick entry
- Smart date defaults (today)
- Mobile-optimized input types
- Accessibility compliant form structure

---

### AmountInput

Specialized currency input with real-time formatting and validation.

**Props**

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `value` | `string \| number` | - | ❌ | Current amount value |
| `onChange` | `func` | - | ✅ | Value change handler |
| `currency` | `string` | `'USD'` | ❌ | Currency code (ISO 4217) |
| `locale` | `string` | `'en-US'` | ❌ | Locale for formatting |
| `maxAmount` | `number` | `999999.99` | ❌ | Maximum allowed amount |
| `minAmount` | `number` | `0.01` | ❌ | Minimum allowed amount |
| `allowDecimals` | `bool` | `true` | ❌ | Allow decimal places |
| `autoFocus` | `bool` | `false` | ❌ | Auto-focus on mount |
| `placeholder` | `string` | `'0.00'` | ❌ | Placeholder text |
| `error` | `string` | - | ❌ | Error message |
| `success` | `string` | - | ❌ | Success message |
| `label` | `string` | `'Amount'` | ❌ | Input label |
| `required` | `bool` | `true` | ❌ | Required field |
| `className` | `string` | `''` | ❌ | Additional CSS classes |

**Usage Examples**

```jsx
import AmountInput from './components/Forms/AmountInput'

// Basic usage
function ExpenseForm() {
  const [amount, setAmount] = useState(0)

  return (
    <AmountInput 
      value={amount}
      onChange={setAmount}
      autoFocus
    />
  )
}

// Different currencies
<AmountInput 
  value={amount}
  onChange={setAmount}
  currency="EUR"
  locale="de-DE"
/>

<AmountInput 
  value={amount}
  onChange={setAmount}
  currency="JPY"
  locale="ja-JP"
  allowDecimals={false}  // Japanese Yen has no decimals
/>

// With validation
<AmountInput 
  value={amount}
  onChange={setAmount}
  minAmount={1}
  maxAmount={1000}
  error={amountError}
  required
/>

// Budget input (no decimals)
<AmountInput 
  value={budget}
  onChange={setBudget}
  label="Monthly Budget"
  allowDecimals={false}
  maxAmount={10000}
  placeholder="1000"
/>
```

**Supported Currencies**

```javascript
// Major currencies with full support
const supportedCurrencies = [
  'USD', 'EUR', 'GBP', 'JPY', 'CAD', 
  'AUD', 'CHF', 'CNY', 'INR', 'BRL'
]

// All ISO 4217 currency codes are supported
// Formatting handled by Intl.NumberFormat
```

**Formatting Behavior**

| State | Display | Input Mode | Example |
|-------|---------|------------|---------|
| Focused | Raw number | `decimal` | `25.50` |
| Blurred | Formatted currency | - | `$25.50` |
| Empty | Placeholder | - | `$0.00` |
| Invalid | Error state | - | Red border |

**Key Features**
- International currency formatting with `Intl.NumberFormat`
- Context-aware display (raw when focused, formatted when not)
- Mobile-optimized numeric keypad (`inputMode="decimal"`)
- Real-time validation with min/max enforcement
- Right-aligned monospace font for easy reading
- Automatic decimal handling based on currency
- Copy-paste support with intelligent parsing

**Accessibility Features**
- Proper labeling and ARIA attributes
- Screen reader friendly formatting
- Clear validation messages
- Touch-friendly 44px minimum height
- High contrast focus indicators

---

### CategorySelector

Visual category selection component with support for custom categories.

**Props**

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `value` | `object` | - | ❌ | Selected category object |
| `onChange` | `func` | - | ✅ | Selection change handler |
| `categories` | `array` | `DEFAULT_CATEGORIES` | ❌ | Available categories |
| `allowCustom` | `bool` | `true` | ❌ | Allow custom category creation |
| `label` | `string` | `'Category'` | ❌ | Field label |
| `required` | `bool` | `true` | ❌ | Required field |
| `error` | `string` | - | ❌ | Error message |
| `className` | `string` | `''` | ❌ | Additional CSS classes |

**Category Object Shape**

```typescript
{
  id: string,           // Unique identifier
  name: string,         // Display name
  icon: string,         // Emoji or icon
  color?: string,       // Background color class
  isCustom?: boolean    // Custom category flag
}
```

**Usage Examples**

```jsx
import CategorySelector from './components/Forms/CategorySelector'

// Basic usage
function ExpenseForm() {
  const [selectedCategory, setSelectedCategory] = useState(null)

  return (
    <CategorySelector 
      value={selectedCategory}
      onChange={setSelectedCategory}
    />
  )
}

// Custom categories
const customCategories = [
  { id: 'gym', name: 'Gym & Fitness', icon: '💪', color: 'bg-red-100' },
  { id: 'coffee', name: 'Coffee', icon: '☕', color: 'bg-amber-100' },
  { id: 'books', name: 'Books', icon: '📚', color: 'bg-indigo-100' }
]

<CategorySelector 
  value={category}
  onChange={setCategory}
  categories={[...DEFAULT_CATEGORIES, ...customCategories]}
/>

// Disable custom category creation
<CategorySelector 
  value={category}
  onChange={setCategory}
  allowCustom={false}
/>

// With validation
<CategorySelector 
  value={category}
  onChange={setCategory}
  error={categoryError}
  required
/>
```

**Default Categories**

```javascript
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
]
```

**Grid Layout**

| Screen Size | Columns | Button Size |
|-------------|---------|-------------|
| Mobile (sm) | 2 | 80px height |
| Tablet (md) | 3 | 80px height |
| Desktop (lg+) | 4 | 80px height |

**Key Features**
- Visual grid layout with icons and colors
- Touch-friendly 80px minimum button height
- Keyboard navigation support (Tab, Enter, Space)
- Custom category creation with emoji picker
- Visual selection states with pressed indicators
- Responsive grid layout (2-4 columns)
- Color-coded categories for quick recognition

**Accessibility Features**
- Descriptive ARIA labels for each category
- Selection state with `aria-pressed`
- Keyboard navigation through grid
- Screen reader friendly category names
- Focus management and visual indicators
- Proper error announcements

---

## Design System

### Color Palette

The Money Lover app uses a carefully crafted color system optimized for accessibility and visual hierarchy.

**Primary Colors**

```css
/* Primary (Blue) - Main actions, links, focus states */
--primary-50: #eff6ff;
--primary-500: #3b82f6;   /* Main primary color */
--primary-600: #2563eb;   /* Primary hover */
--primary-700: #1d4ed8;   /* Primary active */

/* Secondary (Gray) - Text, borders, backgrounds */
--secondary-50: #f9fafb;
--secondary-500: #6b7280;  /* Main secondary color */
--secondary-600: #4b5563;  /* Secondary hover */
--secondary-900: #111827;  /* Primary text */

/* Success (Green) - Success states, positive actions */
--success-50: #ecfdf5;
--success-500: #10b981;    /* Main success color */
--success-600: #059669;    /* Success hover */

/* Warning (Amber) - Warnings, cautions */
--warning-50: #fffbeb;
--warning-500: #f59e0b;    /* Main warning color */
--warning-600: #d97706;    /* Warning hover */

/* Danger (Red) - Errors, destructive actions */
--danger-50: #fef2f2;
--danger-500: #ef4444;     /* Main danger color */
--danger-600: #dc2626;     /* Danger hover */
```

**Usage Guidelines**

| Color | Usage | Examples |
|-------|-------|----------|
| Primary | Main actions, links, active states | Submit buttons, navigation active states, focus rings |
| Secondary | Supporting text, borders, inactive states | Helper text, input borders, secondary buttons |
| Success | Positive feedback, success states | Form validation success, completed actions |
| Warning | Cautions, important notices | Form warnings, unsaved changes |
| Danger | Errors, destructive actions | Delete buttons, error messages, validation errors |

### Typography Scale

Mobile-first typography system with optimal readability across devices.

**Font Family**
- **Primary**: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
- **Monospace**: `ui-monospace, SFMono-Regular, "SF Mono", monospace` (for amounts, codes)

**Type Scale**

| Class | Size | Line Height | Use Case |
|-------|------|-------------|----------|
| `text-xs` | 12px | 16px | Captions, fine print |
| `text-sm` | 14px | 20px | Helper text, labels |
| `text-base` | 16px | 24px | Body text (default) |
| `text-lg` | 18px | 28px | Emphasized text |
| `text-xl` | 20px | 28px | Headings, important text |
| `text-2xl` | 24px | 32px | Page titles |
| `text-3xl` | 30px | 36px | Large headings |
| `text-4xl` | 36px | 40px | Hero text |

**Font Weights**

| Class | Weight | Use Case |
|-------|--------|----------|
| `font-normal` | 400 | Body text |
| `font-medium` | 500 | Buttons, labels |
| `font-semibold` | 600 | Headings, emphasis |
| `font-bold` | 700 | Important headings |

### Spacing System

Consistent spacing based on 4px grid for visual harmony.

**Space Scale**

| Class | Size | Use Case |
|-------|------|----------|
| `space-1` | 4px | Tight spacing |
| `space-2` | 8px | Small gaps |
| `space-3` | 12px | Default spacing |
| `space-4` | 16px | Medium spacing |
| `space-6` | 24px | Large spacing |
| `space-8` | 32px | Extra large spacing |
| `space-12` | 48px | Section spacing |
| `space-16` | 64px | Layout spacing |

**Component Spacing Standards**

| Component | Internal Padding | External Margins |
|-----------|------------------|------------------|
| Button (sm) | 12px 16px | - |
| Button (md) | 16px 20px | - |
| Button (lg) | 20px 24px | - |
| Input | 12px 16px | 0 0 16px 0 |
| Card | 24px | 0 0 24px 0 |
| Modal | 24px | - |

### Responsive Breakpoints

Mobile-first responsive design system.

**Breakpoints**

| Name | Min Width | Max Width | Device |
|------|-----------|-----------|---------|
| `xs` | 0px | 639px | Small mobile |
| `sm` | 640px | 767px | Large mobile |
| `md` | 768px | 1023px | Tablet |
| `lg` | 1024px | 1279px | Desktop |
| `xl` | 1280px | 1535px | Large desktop |
| `2xl` | 1536px+ | - | Extra large |

**Usage Examples**

```css
/* Mobile-first approach */
.component {
  /* Mobile styles (default) */
  padding: 16px;
  
  /* Tablet and up */
  @media (min-width: 768px) {
    padding: 24px;
  }
  
  /* Desktop and up */
  @media (min-width: 1024px) {
    padding: 32px;
  }
}
```

### Component Size Standards

**Touch Targets**
- **Minimum**: 44px × 44px (iOS/Android guidelines)
- **Recommended**: 48px × 48px
- **Large**: 56px × 56px or more

**Component Heights**

| Component | Small | Medium | Large |
|-----------|-------|---------|-------|
| Button | 36px | 44px | 52px |
| Input | 36px | 44px | 52px |
| Select | 36px | 44px | 52px |
| Navigation Item | - | 60px | - |

---

## Accessibility Guidelines

### WCAG 2.1 AA Compliance

All components are designed to meet WCAG 2.1 AA standards.

**Perceivable**
- **Color Contrast**: Minimum 4.5:1 ratio for normal text, 3:1 for large text
- **Text Alternatives**: All images and icons have appropriate alt text or ARIA labels
- **Adaptable**: Content works with browser zoom up to 200%

**Operable**
- **Keyboard Accessible**: All functionality available via keyboard
- **Focus Management**: Clear focus indicators and logical tab order
- **Timing**: No time limits on user interactions

**Understandable**
- **Clear Language**: Simple, direct language throughout
- **Predictable**: Consistent navigation and interaction patterns
- **Input Assistance**: Clear error messages and form guidance

**Robust**
- **Compatible**: Works with assistive technologies
- **Future-Proof**: Uses semantic HTML and standard ARIA patterns

### Keyboard Navigation

**Standard Navigation Pattern**
1. **Tab**: Move forward through interactive elements
2. **Shift + Tab**: Move backward through interactive elements
3. **Enter/Space**: Activate buttons and links
4. **Escape**: Close modals and dropdowns
5. **Arrow Keys**: Navigate within grouped elements (when applicable)

**Focus Management**
- Clear focus indicators (2px blue ring)
- Logical tab order through interfaces
- Focus trapping in modals
- Focus restoration when closing modals
- Skip links for efficient navigation

### Screen Reader Support

**ARIA Labels and Descriptions**
```jsx
// Button with screen reader text
<Button aria-label="Delete expense item">
  <TrashIcon />
</Button>

// Input with description
<Input 
  label="Amount"
  aria-describedby="amount-help"
  error={error}
/>
<div id="amount-help">Enter amount in USD</div>

// Live region for dynamic updates
<div aria-live="polite" role="status">
  {message}
</div>
```

**Semantic HTML Structure**
- Use proper heading hierarchy (h1, h2, h3...)
- Form labels properly associated with inputs
- Lists for grouped content
- Navigation landmarks for major sections

### Color and Contrast

**Accessible Color Combinations**

| Background | Text Color | Contrast Ratio | Usage |
|------------|------------|----------------|-------|
| White | #111827 (gray-900) | 16.04:1 | Body text |
| #3b82f6 (primary) | White | 5.37:1 | Primary buttons |
| #059669 (success) | White | 5.93:1 | Success buttons |
| #dc2626 (danger) | White | 5.13:1 | Danger buttons |

**Never rely on color alone** - Always provide additional indicators:
- Icons alongside color coding
- Text labels for status
- Patterns or shapes for differentiation

---

## Best Practices

### Component Development

**1. Props Design**
```jsx
// ✅ Good: Clear, specific prop names
<Button variant="primary" size="lg" loading>
  Save Changes
</Button>

// ❌ Avoid: Vague or boolean props
<Button style="blue" big isLoading>
  Save Changes  
</Button>
```

**2. Default Values**
```jsx
// ✅ Good: Sensible defaults
function Button({ 
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  ...props 
}) {
  // Component implementation
}
```

**3. Event Handling**
```jsx
// ✅ Good: Consistent event patterns
<Input 
  value={value}
  onChange={(e) => setValue(e.target.value)}
  onBlur={handleBlur}
/>

// ✅ Good: Custom event handlers
<CategorySelector 
  value={category}
  onChange={(category) => setCategory(category)}
/>
```

### Styling Patterns

**1. Component Composition**
```jsx
// ✅ Good: Composable components
<Card>
  <Card.Header>
    <h2>Title</h2>
  </Card.Header>
  <Card.Content>
    <p>Content here</p>
  </Card.Content>
</Card>
```

**2. Responsive Design**
```jsx
// ✅ Good: Mobile-first responsive
<div className="
  grid grid-cols-1 gap-4
  sm:grid-cols-2 
  md:grid-cols-3 
  lg:grid-cols-4
">
  {items.map(item => <Item key={item.id} {...item} />)}
</div>
```

**3. State-based Styling**
```jsx
// ✅ Good: Clear state classes
<Button 
  className={`
    base-button-styles
    ${variant === 'primary' ? 'primary-styles' : 'secondary-styles'}
    ${disabled ? 'disabled-styles' : ''}
    ${loading ? 'loading-styles' : ''}
  `}
>
  {children}
</Button>
```

### Form Best Practices

**1. Validation Timing**
```jsx
// ✅ Good: Validate on blur, not on every keystroke
<Input 
  value={email}
  onChange={setEmail}
  onBlur={() => validateEmail(email)}
  error={emailError}
/>
```

**2. Error Messages**
```jsx
// ✅ Good: Specific, actionable error messages
const getErrorMessage = (field, value) => {
  switch (field) {
    case 'email':
      return !value ? 'Email is required' 
           : !isValidEmail(value) ? 'Please enter a valid email address'
           : null
    case 'amount':
      return !value ? 'Amount is required'
           : value <= 0 ? 'Amount must be greater than zero'
           : value > 999999.99 ? 'Amount is too large'
           : null
  }
}
```

**3. Form Submission**
```jsx
// ✅ Good: Handle all submission states
function MyForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})

  const handleSubmit = async (data) => {
    setIsSubmitting(true)
    setErrors({})
    
    try {
      await submitForm(data)
      showSuccess('Form submitted successfully!')
    } catch (error) {
      setErrors(error.fieldErrors || {})
      showError('Please check the form and try again')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <ExpenseForm 
      onSubmit={handleSubmit}
      loading={isSubmitting}
    />
  )
}
```

### Performance Optimization

**1. Component Rendering**
```jsx
// ✅ Good: Memoize expensive calculations
const ExpensiveComponent = memo(({ data }) => {
  const processedData = useMemo(() => 
    expensiveCalculation(data), [data]
  )
  
  return <div>{processedData}</div>
})
```

**2. Event Handler Optimization**
```jsx
// ✅ Good: Memoize event handlers
function MyComponent({ onUpdate }) {
  const handleClick = useCallback((id) => {
    onUpdate(id)
  }, [onUpdate])

  return (
    <Button onClick={() => handleClick(item.id)}>
      Update
    </Button>
  )
}
```

### Testing Guidelines

**1. Component Testing**
```jsx
// ✅ Good: Test component behavior, not implementation
test('submits form with valid data', async () => {
  const mockSubmit = vi.fn()
  render(<ExpenseForm onSubmit={mockSubmit} />)
  
  await user.type(screen.getByLabelText('Amount'), '25.50')
  await user.click(screen.getByLabelText('Select Food & Dining category'))
  await user.click(screen.getByRole('button', { name: 'Add Expense' }))
  
  expect(mockSubmit).toHaveBeenCalledWith({
    amount: 25.50,
    category: expect.objectContaining({ id: 'food-dining' }),
    // ... other expected properties
  })
})
```

**2. Accessibility Testing**
```jsx
import { axe, toHaveNoViolations } from 'jest-axe'

test('component has no accessibility violations', async () => {
  const { container } = render(<MyComponent />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
```

This comprehensive API reference provides everything needed to effectively use and extend the Money Lover component library. Each component is designed with accessibility, performance, and developer experience in mind.