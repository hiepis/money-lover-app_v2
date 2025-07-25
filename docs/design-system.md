# Money Lover Design System

## Overview

The Money Lover design system provides a comprehensive set of design tokens, components, and guidelines for building consistent and accessible user interfaces. The system is optimized for mobile-first experiences with the 10-second expense entry workflow as the primary use case.

## Design Principles

1. **Mobile-First**: Every design decision prioritizes mobile experience
2. **Accessibility**: WCAG AA compliance for inclusive design
3. **Performance**: Optimized for quick loading and smooth interactions
4. **Consistency**: Predictable patterns and behaviors across the app
5. **Simplicity**: Clear, uncluttered interfaces that reduce cognitive load

## Color System

### Primary Colors

**Primary Blue** - Brand identity and primary actions
- `primary-50`: #eff6ff (Light backgrounds)
- `primary-100`: #dbeafe (Hover states)
- `primary-500`: #3b82f6 (Interactive elements)
- `primary-600`: #2563eb ⭐ **Main brand color**
- `primary-700`: #1d4ed8 (Active states)
- `primary-900`: #1e3a8a (Dark text)

**Secondary Gray** - Text, borders, and neutral elements
- `secondary-50`: #f9fafb (Page backgrounds)
- `secondary-100`: #f3f4f6 (Card backgrounds)
- `secondary-300`: #d1d5db (Borders)
- `secondary-600`: #4b5563 ⭐ **Secondary text**
- `secondary-800`: #1f2937 (Primary text)
- `secondary-900`: #111827 (Headings)

**Success Green** - Positive actions and feedback
- `success-50`: #f0fdf4 (Success backgrounds)
- `success-600`: #059669 ⭐ **Success buttons**
- `success-700`: #15803d (Success active)

### Semantic Colors

**Warning Yellow** - Caution and important notices
- `warning-100`: #fef3c7 (Warning backgrounds)
- `warning-600`: #d97706 (Warning buttons)

**Danger Red** - Error states and destructive actions
- `danger-100`: #fee2e2 (Error backgrounds)
- `danger-600`: #dc2626 (Error buttons)

### Usage Guidelines

```css
/* Text Colors */
.text-primary { color: #111827; }    /* Headings */
.text-secondary { color: #4b5563; }  /* Body text */
.text-accent { color: #2563eb; }     /* Links, buttons */

/* Background Colors */
.bg-page { background: #f9fafb; }    /* Page background */
.bg-card { background: #ffffff; }    /* Card background */
.bg-accent { background: #2563eb; }  /* Primary buttons */
```

## Typography

### Mobile-First Type Scale

**Base Font Size**: 16px (1rem) for optimal mobile readability

| Token | Size | Line Height | Usage |
|-------|------|-------------|-------|
| `text-xs` | 12px | 16px | Captions, helper text |
| `text-sm` | 14px | 20px | Small text, labels |
| `text-base` | 16px | 24px | Body text, paragraphs |
| `text-lg` | 18px | 28px | Large body text |
| `text-xl` | 20px | 28px | Subheadings |
| `text-2xl` | 24px | 32px | Headings |
| `text-3xl` | 30px | 36px | Large headings |
| `text-4xl` | 36px | 40px | Display headings |

### Font Families

```css
/* Primary font stack (optimized for readability) */
font-family: system-ui, -apple-system, 'Segoe UI', 'Roboto', sans-serif;

/* Monospace for amounts and codes */
font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', monospace;
```

### Typography Hierarchy

```html
<!-- Page Title -->
<h1 class="text-2xl md:text-3xl font-bold text-secondary-900">

<!-- Section Heading -->
<h2 class="text-xl md:text-2xl font-semibold text-secondary-900">

<!-- Card Title -->
<h3 class="text-lg font-medium text-secondary-900">

<!-- Body Text -->
<p class="text-base text-secondary-600">

<!-- Small Text -->
<span class="text-sm text-secondary-500">
```

## Spacing System

### 4px Grid System

All spacing follows a 4px base unit for visual consistency:

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 4px | Micro spacing |
| `space-2` | 8px | Small spacing |
| `space-3` | 12px | Medium spacing |
| `space-4` | 16px | Base spacing |
| `space-6` | 24px | Large spacing |
| `space-8` | 32px | Extra large spacing |
| `space-12` | 48px | Touch targets |

### Component Spacing

```css
/* Form Elements */
.form-field { margin-bottom: 1rem; }      /* 16px */
.form-group { margin-bottom: 1.5rem; }    /* 24px */

/* Cards and Containers */
.card-padding { padding: 1.5rem; }        /* 24px */
.container-spacing { padding: 1rem; }     /* 16px mobile */

/* Touch Targets */
.touch-target { min-height: 2.75rem; }    /* 44px minimum */
.button-large { min-height: 3.25rem; }    /* 52px large buttons */
```

## Layout & Grid

### Responsive Breakpoints

Mobile-first approach with progressive enhancement:

| Breakpoint | Width | Description |
|------------|-------|-------------|
| `xs` | 320px+ | Small mobile |
| `sm` | 640px+ | Large mobile |
| `md` | 768px+ | Tablet |
| `lg` | 1024px+ | Desktop |
| `xl` | 1280px+ | Large desktop |

### Container Sizes

```css
/* Mobile-first containers */
.container-mobile { max-width: 100%; padding: 1rem; }
.container-tablet { max-width: 768px; margin: 0 auto; }
.container-desktop { max-width: 1024px; margin: 0 auto; }

/* App-specific containers */
.expense-form-container { max-width: 448px; }  /* 28rem */
.modal-container { max-width: 512px; }         /* 32rem */
```

## Component Tokens

### Buttons

```css
/* Size variants */
.btn-sm { padding: 0.5rem 0.75rem; min-height: 2.25rem; }    /* 36px */
.btn-md { padding: 0.75rem 1rem; min-height: 2.75rem; }      /* 44px */
.btn-lg { padding: 1rem 1.5rem; min-height: 3.25rem; }       /* 52px */

/* Color variants */
.btn-primary { background: #2563eb; color: white; }
.btn-secondary { background: #f3f4f6; color: #374151; }
.btn-success { background: #059669; color: white; }
```

### Form Elements

```css
/* Input fields */
.input-field {
  padding: 0.75rem;           /* 12px */
  border: 1px solid #d1d5db;  /* gray-300 */
  border-radius: 0.5rem;      /* 8px */
  min-height: 2.75rem;        /* 44px touch target */
}

/* Focus states */
.input-field:focus {
  border-color: #2563eb;      /* primary-600 */
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
}
```

### Cards

```css
.card {
  background: white;
  border: 1px solid #e5e7eb;  /* gray-200 */
  border-radius: 0.5rem;      /* 8px */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;            /* 24px */
}
```

## Motion & Animation

### Transition Durations

- **Quick**: 150ms - Hover states, button presses
- **Standard**: 250ms - Modal open/close, page transitions
- **Slow**: 350ms - Complex animations, loading states

### Easing Functions

```css
/* Standard easing */
transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

/* Emphasized easing (entrances) */
transition-timing-function: cubic-bezier(0, 0, 0.2, 1);

/* De-emphasized easing (exits) */
transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
```

## Accessibility

### Color Contrast

All color combinations meet WCAG AA standards:
- **Normal text**: 4.5:1 contrast ratio minimum
- **Large text**: 3:1 contrast ratio minimum
- **Interactive elements**: Clear focus indicators

### Touch Targets

- **Minimum**: 44px × 44px (2.75rem × 2.75rem)
- **Recommended**: 48px × 48px (3rem × 3rem)
- **Spacing**: 8px minimum between touch targets

### Focus Management

```css
/* Visible focus indicators */
.focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}

/* Focus rings for custom elements */
.custom-focus:focus {
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.5);
}
```

## Mobile-First Patterns

### Touch-Friendly Interfaces

1. **Large tap targets** (44px+)
2. **Adequate spacing** between interactive elements
3. **Thumb-friendly navigation** (bottom placement)
4. **Swipe gestures** for common actions
5. **Pull-to-refresh** patterns

### Progressive Enhancement

```css
/* Mobile base styles */
.navigation {
  position: fixed;
  bottom: 0;
  height: 60px;
}

/* Tablet enhancements */
@media (min-width: 640px) {
  .navigation {
    height: 64px;
  }
}

/* Desktop adaptations */
@media (min-width: 1024px) {
  .navigation {
    position: relative;
    height: auto;
  }
}
```

## Usage Examples

### Expense Entry Form

```html
<form class="space-y-6 p-6 bg-white rounded-lg shadow-sm">
  <!-- Amount Input -->
  <div class="space-y-1">
    <label class="block text-sm font-medium text-secondary-700">
      Amount *
    </label>
    <input 
      type="text" 
      class="w-full px-3 py-3 border border-secondary-300 rounded-lg 
             focus:ring-2 focus:ring-primary-500 focus:border-primary-500
             text-lg font-mono text-right min-h-[44px]"
    />
  </div>
  
  <!-- Submit Button -->
  <button class="w-full bg-primary-600 hover:bg-primary-700 
                 text-white font-medium py-3 px-6 rounded-lg
                 min-h-[44px] transition-colors duration-200">
    Add Expense
  </button>
</form>
```

### Category Selection Grid

```html
<div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
  <button class="flex flex-col items-center justify-center p-4 
                 border-2 border-secondary-200 rounded-lg
                 hover:border-primary-300 hover:bg-primary-50
                 min-h-[80px] transition-all duration-200">
    <span class="text-2xl mb-1">🍽️</span>
    <span class="text-xs font-medium">Food & Dining</span>
  </button>
</div>
```

## Implementation Checklist

### Design System Setup
- ✅ Tailwind config with design tokens
- ✅ Color palette implementation
- ✅ Typography scale definition
- ✅ Spacing system (4px grid)
- ✅ Responsive breakpoints
- ✅ Component token definitions

### Component Library
- ✅ Button variants and states
- ✅ Form input components
- ✅ Card and container components
- ✅ Modal and overlay components
- ✅ Navigation components
- ✅ Loading and feedback components

### Accessibility
- ✅ Color contrast compliance
- ✅ Touch target sizing
- ✅ Focus management
- ✅ Screen reader support
- ✅ Keyboard navigation

### Performance
- ✅ Optimized CSS bundle
- ✅ Efficient component rendering
- ✅ Mobile-first loading strategy
- ✅ Animation performance

This design system provides the foundation for building consistent, accessible, and performant user interfaces for the Money Lover expense tracking application.