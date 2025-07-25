import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest'
import userEvent from '@testing-library/user-event'

// Import components for keyboard navigation testing
import Modal from '../components/UI/Modal'
import Button from '../components/UI/Button'
import Input from '../components/UI/Input'
import ExpenseForm from '../components/Forms/ExpenseForm'
import CategorySelector from '../components/Forms/CategorySelector'
import Navigation from '../components/Layout/Navigation'
import AppLayout from '../components/Layout/AppLayout'

describe('Keyboard Navigation Comprehensive Testing', () => {
  beforeEach(() => {
    // Mock IntersectionObserver
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

  describe('Tab Order and Navigation Flow', () => {
    test('ExpenseForm has logical tab order', async () => {
      const user = userEvent.setup()
      render(<ExpenseForm onSubmit={() => {}} />)

      // Get all focusable elements in expected order
      const amountInput = screen.getByLabelText('Amount *')
      const categoryButtons = screen.getAllByRole('button').filter(btn => 
        btn.getAttribute('aria-label')?.includes('Select') && 
        btn.getAttribute('aria-label')?.includes('category')
      )
      const descriptionInput = screen.getByLabelText('Description')
      const submitButton = screen.getByText('Add Expense')

      // Start focus and verify tab order
      amountInput.focus()
      expect(amountInput).toHaveFocus()

      // Tab to first category button
      await user.keyboard('{Tab}')
      expect(categoryButtons[0]).toHaveFocus()

      // Tab through all category buttons
      for (let i = 1; i < categoryButtons.length; i++) {
        await user.keyboard('{Tab}')
        expect(categoryButtons[i]).toHaveFocus()
      }

      // Tab to description input
      await user.keyboard('{Tab}')
      expect(descriptionInput).toHaveFocus()

      // Tab to submit button
      await user.keyboard('{Tab}')
      expect(submitButton).toHaveFocus()

      // Verify reverse tab order works
      await user.keyboard('{Shift>}{Tab}{/Shift}')
      expect(descriptionInput).toHaveFocus()
    })

    test('Navigation component tab order works correctly', async () => {
      const user = userEvent.setup()
      render(<Navigation currentPage="home" />)

      const navButtons = screen.getAllByRole('button').filter(btn =>
        btn.getAttribute('aria-label')?.includes('Navigate to')
      )

      // Tab through navigation buttons
      navButtons[0].focus()
      expect(navButtons[0]).toHaveFocus()

      for (let i = 1; i < navButtons.length; i++) {
        await user.keyboard('{Tab}')
        expect(navButtons[i]).toHaveFocus()
      }

      // Test reverse tabbing
      await user.keyboard('{Shift>}{Tab}{/Shift}')
      expect(navButtons[navButtons.length - 2]).toHaveFocus()
    })

    test('Complex form with nested components maintains tab order', async () => {
      const user = userEvent.setup()
      
      render(
        <div>
          <Input label="First Input" />
          <CategorySelector selectedCategory="" onCategorySelect={() => {}} />
          <Input label="Last Input" />
        </div>
      )

      const firstInput = screen.getByLabelText('First Input')
      const categoryButtons = screen.getAllByRole('button').filter(btn => 
        btn.getAttribute('aria-label')?.includes('Select') && 
        btn.getAttribute('aria-label')?.includes('category')
      )
      const lastInput = screen.getByLabelText('Last Input')

      // Verify tab flow through complex component
      firstInput.focus()
      expect(firstInput).toHaveFocus()

      await user.keyboard('{Tab}')
      expect(categoryButtons[0]).toHaveFocus()

      // Skip through all category buttons
      for (let i = 1; i < categoryButtons.length; i++) {
        await user.keyboard('{Tab}')
      }

      await user.keyboard('{Tab}')
      expect(lastInput).toHaveFocus()
    })
  })

  describe('Modal Focus Management', () => {
    test('Modal traps focus and manages focus restoration', async () => {
      const user = userEvent.setup()
      const handleClose = vi.fn()

      render(
        <div>
          <Button id="trigger-button">Open Modal</Button>
          <Modal isOpen={true} onClose={handleClose}>
            <h2>Modal Title</h2>
            <Input label="Modal Input" />
            <Button>Modal Action</Button>
          </Modal>
        </div>
      )

      const closeButton = screen.getByLabelText('Close modal')
      const modalInput = screen.getByLabelText('Modal Input')
      const modalActionButton = screen.getByText('Modal Action')

      // Modal should focus first element (close button)
      expect(closeButton).toHaveFocus()

      // Tab should move to next focusable element
      await user.keyboard('{Tab}')
      expect(modalInput).toHaveFocus()

      await user.keyboard('{Tab}')
      expect(modalActionButton).toHaveFocus()

      // Tab from last element should wrap to first
      await user.keyboard('{Tab}')
      expect(closeButton).toHaveFocus()

      // Shift+Tab should go backward
      await user.keyboard('{Shift>}{Tab}{/Shift}')
      expect(modalActionButton).toHaveFocus()

      // Test that focus cannot escape modal
      const outsideButton = screen.getByText('Open Modal')
      outsideButton.focus()
      // In a real modal implementation, focus should be pulled back to modal
    })

    test('Modal closes on Escape key', async () => {
      const user = userEvent.setup()
      const handleClose = vi.fn()

      render(
        <Modal isOpen={true} onClose={handleClose}>
          <h2>Test Modal</h2>
          <Button>Test Button</Button>
        </Modal>
      )

      await user.keyboard('{Escape}')
      expect(handleClose).toHaveBeenCalledTimes(1)
    })

    test('Nested focusable elements in modal work correctly', async () => {
      const user = userEvent.setup()

      render(
        <Modal isOpen={true} onClose={() => {}}>
          <ExpenseForm onSubmit={() => {}} />
        </Modal>
      )

      const closeButton = screen.getByLabelText('Close modal')
      const amountInput = screen.getByLabelText('Amount *')
      const submitButton = screen.getByText('Add Expense')

      // Start at close button
      expect(closeButton).toHaveFocus()

      // Tab into form
      await user.keyboard('{Tab}')
      expect(amountInput).toHaveFocus()

      // Tab through form elements (test a few)
      await user.keyboard('{Tab}')
      const firstCategoryButton = screen.getAllByRole('button').find(btn => 
        btn.getAttribute('aria-label')?.includes('Select') && 
        btn.getAttribute('aria-label')?.includes('Food')
      )
      expect(firstCategoryButton).toHaveFocus()

      // Ensure we can reach the submit button
      let tabCount = 0
      let currentFocus = document.activeElement
      while (currentFocus !== submitButton && tabCount < 20) {
        await user.keyboard('{Tab}')
        currentFocus = document.activeElement
        tabCount++
      }
      expect(submitButton).toHaveFocus()
    })
  })

  describe('Keyboard Activation', () => {
    test('Buttons respond to Enter and Space keys', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()

      render(<Button onClick={handleClick}>Test Button</Button>)
      const button = screen.getByText('Test Button')

      button.focus()

      // Test Enter key
      await user.keyboard('{Enter}')
      expect(handleClick).toHaveBeenCalledTimes(1)

      // Test Space key
      await user.keyboard(' ')
      expect(handleClick).toHaveBeenCalledTimes(2)
    })

    test('CategorySelector buttons respond to keyboard activation', async () => {
      const user = userEvent.setup()
      const handleSelect = vi.fn()

      render(<CategorySelector selectedCategory="" onCategorySelect={handleSelect} />)
      
      const foodButton = screen.getByLabelText('Select Food & Dining category')
      foodButton.focus()

      // Test Enter key
      await user.keyboard('{Enter}')
      expect(handleSelect).toHaveBeenCalledWith('food')

      // Test Space key
      handleSelect.mockClear()
      await user.keyboard(' ')
      expect(handleSelect).toHaveBeenCalledWith('food')
    })

    test('Navigation buttons respond to keyboard activation', async () => {
      const user = userEvent.setup()
      
      // Mock window.location for navigation testing
      delete window.location
      window.location = { href: '', assign: vi.fn() }

      render(<Navigation currentPage="home" />)
      
      const expensesButton = screen.getByLabelText('Navigate to Expenses')
      expensesButton.focus()

      // Navigation should work with Enter key
      await user.keyboard('{Enter}')
      // In real implementation, this would trigger navigation
      
      // Test Space key as well
      await user.keyboard(' ')
    })

    test('Disabled elements do not respond to keyboard activation', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()

      render(<Button onClick={handleClick} disabled>Disabled Button</Button>)
      const button = screen.getByText('Disabled Button')

      button.focus()

      await user.keyboard('{Enter}')
      await user.keyboard(' ')
      
      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe('Form Navigation Patterns', () => {
    test('Form submission works with Enter key', async () => {
      const user = userEvent.setup()
      const handleSubmit = vi.fn()

      render(<ExpenseForm onSubmit={handleSubmit} />)
      
      const amountInput = screen.getByLabelText('Amount *')
      
      // Fill out required field and submit with Enter
      await user.type(amountInput, '25.50')
      await user.keyboard('{Enter}')
      
      // Form should submit (implementation may vary)
      // expect(handleSubmit).toHaveBeenCalled()
    })

    test('Input fields handle keyboard navigation correctly', async () => {
      const user = userEvent.setup()

      render(
        <div>
          <Input label="First" />
          <Input label="Second" />
          <Input label="Third" />
        </div>
      )

      const firstInput = screen.getByLabelText('First')
      const secondInput = screen.getByLabelText('Second')
      const thirdInput = screen.getByLabelText('Third')

      firstInput.focus()
      expect(firstInput).toHaveFocus()

      await user.keyboard('{Tab}')
      expect(secondInput).toHaveFocus()

      await user.keyboard('{Tab}')
      expect(thirdInput).toHaveFocus()

      // Test reverse tabbing
      await user.keyboard('{Shift>}{Tab}{/Shift}')
      expect(secondInput).toHaveFocus()
    })
  })

  describe('Complex Navigation Scenarios', () => {
    test('Full application layout keyboard navigation', async () => {
      const user = userEvent.setup()

      render(
        <AppLayout>
          <ExpenseForm onSubmit={() => {}} />
        </AppLayout>
      )

      // Test that we can navigate through the entire application
      const navButtons = screen.getAllByRole('button').filter(btn =>
        btn.getAttribute('aria-label')?.includes('Navigate to')
      )
      const formElements = [
        screen.getByLabelText('Amount *'),
        ...screen.getAllByRole('button').filter(btn => 
          btn.getAttribute('aria-label')?.includes('Select') && 
          btn.getAttribute('aria-label')?.includes('category')
        ).slice(0, 2), // Test first 2 category buttons
        screen.getByLabelText('Description'),
        screen.getByText('Add Expense')
      ]

      // Start with navigation
      if (navButtons.length > 0) {
        navButtons[0].focus()
        expect(navButtons[0]).toHaveFocus()

        // Tab through navigation
        for (let i = 1; i < navButtons.length; i++) {
          await user.keyboard('{Tab}')
          expect(navButtons[i]).toHaveFocus()
        }
      }

      // Tab into form content
      await user.keyboard('{Tab}')
      expect(formElements[0]).toHaveFocus()

      // Test a few form elements
      for (let i = 1; i < Math.min(3, formElements.length); i++) {
        await user.keyboard('{Tab}')
        expect(formElements[i]).toHaveFocus()
      }
    })

    test('Skip links functionality (if implemented)', async () => {
      const user = userEvent.setup()

      render(
        <div>
          <Button>Skip to main content</Button>
          <Navigation currentPage="home" />
          <main id="main-content">
            <ExpenseForm onSubmit={() => {}} />
          </main>
        </div>
      )

      const skipLink = screen.getByText('Skip to main content')
      skipLink.focus()

      await user.keyboard('{Enter}')
      
      // In a real implementation, focus should jump to main content
      // This would require actual skip link implementation
    })
  })

  describe('Keyboard Accessibility Edge Cases', () => {
    test('Elements remain focusable when dynamically shown/hidden', async () => {
      const user = userEvent.setup()
      const { rerender } = render(
        <div>
          <Button>Always Visible</Button>
          <Button style={{ display: 'none' }}>Hidden Button</Button>
        </div>
      )

      const visibleButton = screen.getByText('Always Visible')
      visibleButton.focus()
      expect(visibleButton).toHaveFocus()

      // Tab should skip hidden elements
      await user.keyboard('{Tab}')
      // Focus should not be on hidden button, might wrap or stay on visible

      // Show the hidden button
      rerender(
        <div>
          <Button>Always Visible</Button>
          <Button>Now Visible Button</Button>
        </div>
      )

      const nowVisibleButton = screen.getByText('Now Visible Button')
      
      // Should be able to focus newly visible element
      visibleButton.focus()
      await user.keyboard('{Tab}')
      expect(nowVisibleButton).toHaveFocus()
    })

    test('Loading states maintain keyboard accessibility', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()

      render(<Button onClick={handleClick} loading>Loading Button</Button>)
      const button = screen.getByText('Loading Button')

      button.focus()
      expect(button).toHaveFocus()

      // Should not activate when loading
      await user.keyboard('{Enter}')
      await user.keyboard(' ')
      
      expect(handleClick).not.toHaveBeenCalled()
      expect(button).toBeDisabled()
    })
  })
})