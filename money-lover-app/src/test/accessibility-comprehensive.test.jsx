import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'

// Import all components for accessibility testing
import Button from '../components/UI/Button'
import Input from '../components/UI/Input'
import Card from '../components/UI/Card'
import Modal from '../components/UI/Modal'
import Loading from '../components/UI/Loading'
import Header from '../components/Layout/Header'
import Navigation from '../components/Layout/Navigation'
import AppLayout from '../components/Layout/AppLayout'
import ExpenseForm from '../components/Forms/ExpenseForm'
import AmountInput from '../components/Forms/AmountInput'
import CategorySelector from '../components/Forms/CategorySelector'

// Add jest-axe matchers
expect.extend(toHaveNoViolations)

describe('Comprehensive Accessibility Testing', () => {
  beforeEach(() => {
    // Mock IntersectionObserver for testing
    global.IntersectionObserver = vi.fn(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }))
  })

  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  describe('Automated Accessibility Testing (axe-core)', () => {
    test('Button component has no accessibility violations', async () => {
      const { container } = render(
        <div>
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary" disabled>Disabled Button</Button>
          <Button loading>Loading Button</Button>
        </div>
      )
      
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    test('Input component has no accessibility violations', async () => {
      const { container } = render(
        <div>
          <Input label="Email Address" type="email" required />
          <Input label="Password" type="password" error="Password is required" />
          <Input label="Valid Input" success="Looks good!" />
        </div>
      )
      
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    test('Modal component has no accessibility violations', async () => {
      const { container } = render(
        <Modal isOpen={true} onClose={() => {}}>
          <h2>Modal Title</h2>
          <p>Modal content goes here</p>
          <Button>Action Button</Button>
        </Modal>
      )
      
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    test('Navigation component has no accessibility violations', async () => {
      const { container } = render(
        <Navigation currentPage="home" />
      )
      
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    test('ExpenseForm has no accessibility violations', async () => {
      const { container } = render(
        <ExpenseForm onSubmit={() => {}} />
      )
      
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    test('CategorySelector has no accessibility violations', async () => {
      const { container } = render(
        <CategorySelector 
          selectedCategory="food" 
          onCategorySelect={() => {}} 
        />
      )
      
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })

  describe('ARIA Attributes Testing', () => {
    test('Button components have correct ARIA attributes', () => {
      render(
        <div>
          <Button disabled>Disabled Button</Button>
          <Button loading>Loading Button</Button>
        </div>
      )

      const disabledButton = screen.getByText('Disabled Button')
      const loadingButton = screen.getByText('Loading Button')

      expect(disabledButton).toHaveAttribute('aria-disabled', 'true')
      expect(loadingButton).toHaveAttribute('aria-disabled', 'true')
      
      // Check loading spinner has aria-hidden
      const spinner = loadingButton.querySelector('svg')
      expect(spinner).toHaveAttribute('aria-hidden', 'true')
    })

    test('Input components have correct ARIA attributes', () => {
      render(
        <div>
          <Input 
            label="Email" 
            type="email" 
            required 
            error="Invalid email"
            helpText="Enter your email address" 
          />
        </div>
      )

      const input = screen.getByLabelText('Email *')
      const errorMessage = screen.getByText('Invalid email')
      const helpText = screen.getByText('Enter your email address')

      expect(input).toHaveAttribute('aria-required', 'true')
      expect(input).toHaveAttribute('aria-invalid', 'true')
      expect(input).toHaveAttribute('aria-describedby')
      expect(errorMessage).toHaveAttribute('role', 'alert')

      // Verify aria-describedby links to help text and error
      const describedBy = input.getAttribute('aria-describedby')
      expect(describedBy).toContain(helpText.id)
      expect(describedBy).toContain(errorMessage.id)
    })

    test('Modal has correct ARIA attributes', () => {
      render(
        <Modal isOpen={true} onClose={() => {}}>
          <h2 id="modal-title">Test Modal</h2>
          <p>Modal content</p>
        </Modal>
      )

      const dialog = screen.getByRole('dialog')
      const closeButton = screen.getByLabelText('Close modal')

      expect(dialog).toHaveAttribute('aria-modal', 'true')
      expect(dialog).toHaveAttribute('role', 'dialog')
      expect(closeButton).toHaveAttribute('aria-label', 'Close modal')
    })

    test('Navigation has correct ARIA attributes', () => {
      render(<Navigation currentPage="expenses" />)

      const nav = screen.getByRole('navigation')
      const currentPageLink = screen.getByLabelText('Navigate to Expenses (current page)')

      expect(nav).toHaveAttribute('aria-label', 'Main navigation')
      expect(currentPageLink).toHaveAttribute('aria-current', 'page')
    })

    test('CategorySelector has correct ARIA attributes', () => {
      render(<CategorySelector selectedCategory="food" onCategorySelect={() => {}} />)

      const foodButton = screen.getByLabelText('Select Food & Dining category')
      const transportButton = screen.getByLabelText('Select Transportation category')

      expect(foodButton).toHaveAttribute('aria-pressed', 'true')
      expect(transportButton).toHaveAttribute('aria-pressed', 'false')
      
      // Check decorative icons have aria-hidden
      const icons = document.querySelectorAll('[role="img"]')
      icons.forEach(icon => {
        expect(icon).toHaveAttribute('aria-hidden', 'true')
      })
    })
  })

  describe('Keyboard Navigation Testing', () => {
    test('Button responds to keyboard activation', async () => {
      const handleClick = vi.fn()
      const user = userEvent.setup()

      render(<Button onClick={handleClick}>Test Button</Button>)
      const button = screen.getByText('Test Button')

      // Test Enter key
      button.focus()
      await user.keyboard('{Enter}')
      expect(handleClick).toHaveBeenCalledTimes(1)

      // Test Space key
      await user.keyboard(' ')
      expect(handleClick).toHaveBeenCalledTimes(2)
    })

    test('Modal handles keyboard navigation correctly', async () => {
      const handleClose = vi.fn()
      const user = userEvent.setup()

      render(
        <Modal isOpen={true} onClose={handleClose}>
          <h2>Modal Title</h2>
          <Button>First Button</Button>
          <Button>Second Button</Button>
        </Modal>
      )

      // Test Escape key closes modal
      await user.keyboard('{Escape}')
      expect(handleClose).toHaveBeenCalledTimes(1)

      // Test Tab navigation between buttons
      const firstButton = screen.getByText('First Button')
      const secondButton = screen.getByText('Second Button')

      firstButton.focus()
      await user.keyboard('{Tab}')
      expect(secondButton).toHaveFocus()

      await user.keyboard('{Shift>}{Tab}{/Shift}')
      expect(firstButton).toHaveFocus()
    })

    test('CategorySelector supports keyboard navigation', async () => {
      const handleSelect = vi.fn()
      const user = userEvent.setup()

      render(<CategorySelector selectedCategory="" onCategorySelect={handleSelect} />)

      const foodButton = screen.getByLabelText('Select Food & Dining category')
      
      // Test Enter key activation
      foodButton.focus()
      await user.keyboard('{Enter}')
      expect(handleSelect).toHaveBeenCalledWith('food')

      // Test Space key activation
      await user.keyboard(' ')
      expect(handleSelect).toHaveBeenCalledWith('food')
    })

    test('Form navigation works correctly', async () => {
      const user = userEvent.setup()

      render(<ExpenseForm onSubmit={() => {}} />)

      // Test tab order through form elements
      const amountInput = screen.getByLabelText('Amount *')
      const categoryButtons = screen.getAllByRole('button').filter(btn => 
        btn.getAttribute('aria-label')?.includes('Select') && 
        btn.getAttribute('aria-label')?.includes('category')
      )
      const descriptionInput = screen.getByLabelText('Description')
      const submitButton = screen.getByText('Add Expense')

      // Tab through form in logical order
      amountInput.focus()
      expect(amountInput).toHaveFocus()

      await user.keyboard('{Tab}')
      expect(categoryButtons[0]).toHaveFocus()

      // Skip through category buttons to description
      for (let i = 0; i < categoryButtons.length; i++) {
        await user.keyboard('{Tab}')
      }
      expect(descriptionInput).toHaveFocus()

      await user.keyboard('{Tab}')
      expect(submitButton).toHaveFocus()
    })
  })

  describe('Focus Management Testing', () => {
    test('Modal traps focus correctly', async () => {
      const user = userEvent.setup()

      render(
        <div>
          <Button>Outside Button</Button>
          <Modal isOpen={true} onClose={() => {}}>
            <Button>Modal Button 1</Button>
            <Button>Modal Button 2</Button>
          </Modal>
        </div>
      )

      const modalButton1 = screen.getByText('Modal Button 1')
      const modalButton2 = screen.getByText('Modal Button 2')
      const closeButton = screen.getByLabelText('Close modal')

      // Focus should start on first focusable element in modal
      expect(closeButton).toHaveFocus()

      // Tab should cycle within modal
      await user.keyboard('{Tab}')
      expect(modalButton1).toHaveFocus()

      await user.keyboard('{Tab}')
      expect(modalButton2).toHaveFocus()

      // Tab from last element should go to first
      await user.keyboard('{Tab}')
      expect(closeButton).toHaveFocus()

      // Shift+Tab should go backward
      await user.keyboard('{Shift>}{Tab}{/Shift}')
      expect(modalButton2).toHaveFocus()
    })

    test('Focus indicators are visible', () => {
      render(
        <div>
          <Button>Test Button</Button>
          <Input label="Test Input" />
        </div>
      )

      const button = screen.getByText('Test Button')
      const input = screen.getByLabelText('Test Input')

      // Focus elements and check they have focus styles
      button.focus()
      expect(button).toHaveClass('focus:ring-2')

      input.focus()
      expect(input).toHaveClass('focus:ring-2')
    })
  })

  describe('Screen Reader Compatibility', () => {
    test('Loading states are announced to screen readers', () => {
      render(
        <div>
          <Loading variant="spinner" aria-label="Loading data" />
          <Loading variant="dots" text="Processing..." />
        </div>
      )

      const spinnerLoader = screen.getByRole('status')
      const dotsLoader = screen.getByText('Processing...')

      expect(spinnerLoader).toHaveAttribute('aria-live', 'polite')
      expect(spinnerLoader).toHaveAttribute('aria-label', 'Loading data')
      expect(dotsLoader.closest('[role="status"]')).toHaveAttribute('aria-live', 'polite')
    })

    test('Form validation errors are announced', () => {
      render(
        <Input 
          label="Email" 
          type="email" 
          error="Please enter a valid email address"
        />
      )

      const errorMessage = screen.getByText('Please enter a valid email address')
      expect(errorMessage).toHaveAttribute('role', 'alert')
    })

    test('Dynamic content changes are announced', () => {
      const { rerender } = render(<Button>Save</Button>)
      
      rerender(<Button loading>Saving...</Button>)
      
      const button = screen.getByText('Saving...')
      expect(button).toBeDisabled()
      
      // Loading spinner should be hidden from screen readers
      const spinner = button.querySelector('svg')
      expect(spinner).toHaveAttribute('aria-hidden', 'true')
    })
  })

  describe('Color Contrast and Visual Accessibility', () => {
    test('Interactive elements have sufficient color contrast', () => {
      render(
        <div>
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="danger">Danger Button</Button>
        </div>
      )

      const primaryButton = screen.getByText('Primary Button')
      const secondaryButton = screen.getByText('Secondary Button')
      const dangerButton = screen.getByText('Danger Button')

      // Check that buttons have contrasting text colors
      expect(primaryButton).toHaveClass('text-white')
      expect(secondaryButton).toHaveClass('text-gray-700')
      expect(dangerButton).toHaveClass('text-white')
    })

    test('Error states have appropriate color and non-color indicators', () => {
      render(
        <Input 
          label="Email" 
          type="email" 
          required
          error="This field is required"
        />
      )

      const input = screen.getByLabelText('Email *')
      const errorMessage = screen.getByText('This field is required')

      // Error should be indicated by more than just color
      expect(input).toHaveAttribute('aria-invalid', 'true')
      expect(errorMessage).toHaveAttribute('role', 'alert')
      expect(screen.getByText('*')).toBeInTheDocument() // Required indicator
    })
  })

  describe('Touch Accessibility', () => {
    test('Interactive elements meet minimum touch target size', () => {
      render(
        <div>
          <Button>Touch Button</Button>
          <Navigation currentPage="home" />
        </div>
      )

      const button = screen.getByText('Touch Button')
      const navButtons = screen.getAllByRole('button').filter(btn =>
        btn.getAttribute('aria-label')?.includes('Navigate to')
      )

      // Check minimum height for touch targets (44px)
      expect(button).toHaveClass('min-h-[44px]')
      navButtons.forEach(navButton => {
        expect(navButton.closest('nav')).toHaveClass('h-16') // 64px > 44px
      })
    })
  })

  describe('Responsive Accessibility', () => {
    test('Components maintain accessibility across screen sizes', () => {
      // Test mobile-specific accessibility features
      render(<AmountInput value="100" onChange={() => {}} />)

      const input = screen.getByRole('textbox')
      
      // Mobile keyboard optimization
      expect(input).toHaveAttribute('inputMode', 'decimal')
      expect(input).toHaveAttribute('pattern', '[0-9]*')
      
      // Touch-friendly sizing
      expect(input).toHaveClass('min-h-[44px]')
    })
  })
})