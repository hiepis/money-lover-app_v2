import { render, screen } from '@testing-library/react'
import { describe, test, expect, vi } from 'vitest'

// Import all components
import AppLayout from '../components/Layout/AppLayout'
import Header from '../components/Layout/Header'
import Navigation from '../components/Layout/Navigation'
import Button from '../components/UI/Button'
import Input from '../components/UI/Input'
import { Card, CardHeader, CardContent } from '../components/UI/Card'
import Modal from '../components/UI/Modal'
import Loading from '../components/UI/Loading'
import ExpenseForm from '../components/Forms/ExpenseForm'
import AmountInput from '../components/Forms/AmountInput'
import CategorySelector from '../components/Forms/CategorySelector'

// Mock functions for callbacks
const mockFn = vi.fn()

describe('Component Rendering Tests', () => {
  describe('Layout Components', () => {
    test('AppLayout renders without errors', () => {
      render(
        <AppLayout currentPage="expenses" onPageChange={mockFn} dailyTotal={45.75}>
          <div>Test content</div>
        </AppLayout>
      )
      
      expect(screen.getByText('Test content')).toBeInTheDocument()
    })

    test('Header renders without errors', () => {
      render(<Header dailyTotal={45.75} />)
      
      expect(screen.getByText('Money Lover')).toBeInTheDocument()
      expect(screen.getByText('$45.75')).toBeInTheDocument()
    })

    test('Navigation renders without errors', () => {
      render(<Navigation currentPage="expenses" onPageChange={mockFn} />)
      
      expect(screen.getByText('Add')).toBeInTheDocument()
      expect(screen.getByText('List')).toBeInTheDocument()
      expect(screen.getByText('Categories')).toBeInTheDocument()
      expect(screen.getByText('Summary')).toBeInTheDocument()
    })
  })

  describe('UI Components', () => {
    test('Button renders without errors', () => {
      render(<Button>Click me</Button>)
      
      expect(screen.getByRole('button')).toBeInTheDocument()
      expect(screen.getByText('Click me')).toBeInTheDocument()
    })

    test('Input renders without errors', () => {
      render(<Input label="Test Input" value="" onChange={mockFn} />)
      
      expect(screen.getByLabelText('Test Input')).toBeInTheDocument()
      expect(screen.getByRole('textbox')).toBeInTheDocument()
    })

    test('Card renders without errors', () => {
      render(
        <Card>
          <CardHeader>Test Header</CardHeader>
          <CardContent>Test Content</CardContent>
        </Card>
      )
      
      expect(screen.getByText('Test Header')).toBeInTheDocument()
      expect(screen.getByText('Test Content')).toBeInTheDocument()
    })

    test('Modal renders without errors when open', () => {
      render(
        <Modal isOpen={true} onClose={mockFn} title="Test Modal">
          <p>Modal content</p>
        </Modal>
      )
      
      expect(screen.getByText('Test Modal')).toBeInTheDocument()
      expect(screen.getByText('Modal content')).toBeInTheDocument()
    })

    test('Loading renders without errors', () => {
      render(<Loading variant="spinner" />)
      
      // Loading component should render without throwing
      expect(document.querySelector('.animate-spin')).toBeInTheDocument()
    })
  })

  describe('Form Components', () => {
    test('ExpenseForm renders without errors', () => {
      render(<ExpenseForm onSubmit={mockFn} />)
      
      expect(screen.getByLabelText('Amount *')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /add expense/i })).toBeInTheDocument()
    })

    test('AmountInput renders without errors', () => {
      render(<AmountInput value="" onChange={mockFn} />)
      
      expect(screen.getByLabelText('Amount *')).toBeInTheDocument()
      expect(screen.getByRole('textbox')).toBeInTheDocument()
    })

    test('CategorySelector renders without errors', () => {
      render(<CategorySelector value={null} onChange={mockFn} />)
      
      expect(screen.getByText('Category *')).toBeInTheDocument()
      // Should render default categories
      expect(screen.getByText('Food & Dining')).toBeInTheDocument()
      expect(screen.getByText('Transportation')).toBeInTheDocument()
    })
  })

  describe('Component Props Validation', () => {
    test('Button handles different variants', () => {
      const variants = ['primary', 'secondary', 'success', 'danger', 'ghost']
      
      variants.forEach(variant => {
        const { unmount } = render(<Button variant={variant}>Test</Button>)
        expect(screen.getByRole('button')).toBeInTheDocument()
        unmount()
      })
    })

    test('Input handles different types', () => {
      const types = ['text', 'number', 'email', 'password']
      
      types.forEach(type => {
        const { unmount } = render(<Input label="Test" type={type} value="" onChange={mockFn} />)
        expect(screen.getByLabelText('Test')).toBeInTheDocument()
        unmount()
      })
    })

    test('Loading handles different variants', () => {
      const variants = ['spinner', 'dots', 'skeleton', 'pulse']
      
      variants.forEach(variant => {
        const { unmount } = render(<Loading variant={variant} />)
        // Should render without error
        expect(document.querySelector('div')).toBeInTheDocument()
        unmount()
      })
    })
  })

  describe('Error Handling', () => {
    test('Components handle missing optional props gracefully', () => {
      // Test components with minimal required props
      expect(() => {
        render(<Header />)
        render(<Button>Test</Button>)
        render(<Loading />)
        render(<Card>Content</Card>)
      }).not.toThrow()
    })

    test('Components with required props throw appropriate errors', () => {
      // These should work with required props
      expect(() => {
        render(<Input label="Test" value="" onChange={mockFn} />)
        render(<AmountInput value="" onChange={mockFn} />)
        render(<Navigation currentPage="expenses" onPageChange={mockFn} />)
      }).not.toThrow()
    })
  })

  describe('Accessibility', () => {
    test('Form elements have proper labels', () => {
      render(
        <div>
          <Input label="Email" value="" onChange={mockFn} />
          <AmountInput value="" onChange={mockFn} />
          <Button>Submit</Button>
        </div>
      )
      
      expect(screen.getByLabelText('Email')).toBeInTheDocument()
      expect(screen.getByLabelText('Amount *')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument()
    })

    test('Navigation has proper ARIA labels', () => {
      render(<Navigation currentPage="expenses" onPageChange={mockFn} />)
      
      expect(screen.getByLabelText('Add new expense')).toBeInTheDocument()
      expect(screen.getByLabelText('View expense list')).toBeInTheDocument()
      expect(screen.getByLabelText('Manage categories')).toBeInTheDocument()
      expect(screen.getByLabelText('View summary')).toBeInTheDocument()
    })
  })
})