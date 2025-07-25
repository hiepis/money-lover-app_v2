import { render, screen, cleanup } from '@testing-library/react'
import { describe, test, expect, afterEach, vi } from 'vitest'
import { axe, toHaveNoViolations } from 'jest-axe'

// Import components for basic accessibility testing
import Button from '../components/UI/Button'
import Input from '../components/UI/Input'
import Modal from '../components/UI/Modal'
import Navigation from '../components/Layout/Navigation'

// Add jest-axe matchers
expect.extend(toHaveNoViolations)

describe('Basic Accessibility Testing', () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  describe('Axe Accessibility Tests', () => {
    test('Button component passes axe tests', async () => {
      const { container } = render(
        <Button variant="primary">Test Button</Button>
      )
      
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    test('Input component passes axe tests', async () => {
      const { container } = render(
        <Input label="Test Input" type="text" />
      )
      
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    test('Modal component passes axe tests', async () => {
      const { container } = render(
        <Modal isOpen={true} onClose={() => {}}>
          <h2>Test Modal</h2>
          <p>Modal content</p>
        </Modal>
      )
      
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    test('Navigation component passes axe tests', async () => {
      const { container } = render(
        <Navigation currentPage="home" />
      )
      
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })

  describe('Basic ARIA Tests', () => {
    test('Button has correct role', () => {
      render(<Button>Test Button</Button>)
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })

    test('Input has correct label association', () => {
      render(<Input label="Test Input" />)
      const input = screen.getByLabelText('Test Input')
      expect(input).toBeInTheDocument()
    })

    test('Modal has correct dialog role', () => {
      render(
        <Modal isOpen={true} onClose={() => {}}>
          <h2>Test Modal</h2>
        </Modal>
      )
      const dialog = screen.getByRole('dialog')
      expect(dialog).toBeInTheDocument()
      expect(dialog).toHaveAttribute('aria-modal', 'true')
    })

    test('Navigation has correct navigation role', () => {
      render(<Navigation currentPage="home" />)
      const nav = screen.getByRole('navigation')
      expect(nav).toBeInTheDocument()
      expect(nav).toHaveAttribute('aria-label', 'Main navigation')
    })
  })

  describe('Keyboard Focus Tests', () => {
    test('Button is focusable', () => {
      render(<Button>Test Button</Button>)
      const button = screen.getByRole('button')
      
      button.focus()
      expect(button).toHaveFocus()
    })

    test('Input is focusable', () => {
      render(<Input label="Test Input" />)
      const input = screen.getByLabelText('Test Input')
      
      input.focus()
      expect(input).toHaveFocus()
    })

    test('Disabled button is not focusable programmatically but maintains accessibility', () => {
      render(<Button disabled>Disabled Button</Button>)
      const button = screen.getByRole('button')
      
      expect(button).toBeDisabled()
      // Disabled elements should still be in the accessibility tree
      expect(button).toBeInTheDocument()
    })
  })

  describe('Text Content and Labels', () => {
    test('Buttons have accessible text content', () => {
      render(
        <div>
          <Button>Save Changes</Button>
          <Button loading>Saving...</Button>
        </div>
      )

      expect(screen.getByText('Save Changes')).toBeInTheDocument()
      expect(screen.getByText('Saving...')).toBeInTheDocument()
    })

    test('Form inputs have proper labels', () => {
      render(
        <div>
          <Input label="Email Address" type="email" />
          <Input label="Password" type="password" />
        </div>
      )

      expect(screen.getByLabelText('Email Address')).toBeInTheDocument()
      expect(screen.getByLabelText('Password')).toBeInTheDocument()
    })

    test('Required field indicators are accessible', () => {
      render(<Input label="Email" required />)
      
      const requiredIndicator = screen.getByText('*')
      expect(requiredIndicator).toHaveAttribute('aria-label', 'required')
    })
  })
})