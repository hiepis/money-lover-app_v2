import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { describe, test, expect, vi, afterEach } from 'vitest'
import userEvent from '@testing-library/user-event'

// Import components for focused prop testing
import Button from '../components/UI/Button'
import Input from '../components/UI/Input'
import Card from '../components/UI/Card'
import Modal from '../components/UI/Modal'
import Loading from '../components/UI/Loading'
import ExpenseForm from '../components/Forms/ExpenseForm'
import AmountInput from '../components/Forms/AmountInput'
import CategorySelector from '../components/Forms/CategorySelector'

describe('Component Props Focused Testing', () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  describe('Button Component Props', () => {
    test('renders primary variant with correct classes', () => {
      render(<Button variant="primary">Primary Button</Button>)
      const button = screen.getByText('Primary Button')
      
      expect(button).toBeInTheDocument()
      expect(button).toHaveClass('bg-primary', 'text-white')
      expect(button).toHaveAttribute('type', 'button')
    })

    test('handles disabled state correctly', () => {
      render(<Button disabled>Disabled Button</Button>)
      const button = screen.getByText('Disabled Button')
      
      expect(button).toBeDisabled()
      expect(button).toHaveClass('disabled:opacity-50')
    })

    test('handles loading state with spinner', () => {
      render(<Button loading>Loading Button</Button>)
      const button = screen.getByText('Loading Button')
      
      expect(button).toBeDisabled()
      expect(button.querySelector('svg')).toBeInTheDocument()
    })

    test('handles full width prop', () => {
      render(<Button fullWidth>Full Width</Button>)
      const button = screen.getByText('Full Width')
      
      expect(button).toHaveClass('w-full')
    })

    test('handles click events when not disabled', async () => {
      const handleClick = vi.fn()
      const user = userEvent.setup()
      
      render(<Button onClick={handleClick}>Clickable</Button>)
      const button = screen.getByText('Clickable')
      
      await user.click(button)
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    test('prevents click events when disabled', async () => {
      const handleClick = vi.fn()
      const user = userEvent.setup()
      
      render(<Button onClick={handleClick} disabled>Disabled</Button>)
      const button = screen.getByText('Disabled')
      
      await user.click(button)
      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe('Input Component Props', () => {
    test('renders with correct type and attributes', () => {
      render(<Input type="email" placeholder="Enter email" required />)
      const input = screen.getByPlaceholderText('Enter email')
      
      expect(input).toHaveAttribute('type', 'email')
      expect(input).toBeRequired()
      expect(input).toHaveClass('min-h-[44px]') // Touch-friendly
    })

    test('handles error state with correct styling', () => {
      render(<Input error="This field is required" />)
      const input = screen.getByRole('textbox')
      
      expect(input).toHaveClass('border-red-500')
      expect(screen.getByText('This field is required')).toBeInTheDocument()
    })

    test('handles success state with correct styling', () => {
      render(<Input success="Valid input" />)
      const input = screen.getByRole('textbox')
      
      expect(input).toHaveClass('border-green-500')
      expect(screen.getByText('Valid input')).toBeInTheDocument()
    })

    test('generates unique IDs for accessibility', () => {
      render(
        <div>
          <Input label="First Input" />
          <Input label="Second Input" />
        </div>
      )
      
      const inputs = screen.getAllByRole('textbox')
      expect(inputs[0].id).not.toBe(inputs[1].id)
      expect(inputs[0].id).toMatch(/^input-/)
      expect(inputs[1].id).toMatch(/^input-/)
    })
  })

  describe('Loading Component Props', () => {
    test('renders spinner variant correctly', () => {
      render(<Loading variant="spinner" />)
      const spinner = screen.getByRole('status')
      
      expect(spinner).toBeInTheDocument()
      expect(spinner.querySelector('svg')).toHaveClass('animate-spin')
    })

    test('renders dots variant correctly', () => {
      render(<Loading variant="dots" />)
      const dots = screen.getByRole('status')
      
      expect(dots).toBeInTheDocument()
      expect(dots.querySelector('.animate-bounce')).toBeInTheDocument()
    })

    test('handles size prop correctly', () => {
      render(<Loading variant="spinner" size="lg" />)
      const spinner = screen.getByRole('status')
      
      expect(spinner.querySelector('svg')).toHaveClass('h-8', 'w-8')
    })

    test('handles color prop correctly', () => {
      render(<Loading variant="spinner" color="success" />)
      const spinner = screen.getByRole('status')
      
      expect(spinner.querySelector('svg')).toHaveClass('text-success')
    })
  })

  describe('Modal Component Props', () => {
    test('renders when isOpen is true', () => {
      render(<Modal isOpen={true} onClose={() => {}}>Modal Content</Modal>)
      
      expect(screen.getByText('Modal Content')).toBeInTheDocument()
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    test('does not render when isOpen is false', () => {
      render(<Modal isOpen={false} onClose={() => {}}>Modal Content</Modal>)
      
      expect(screen.queryByText('Modal Content')).not.toBeInTheDocument()
    })

    test('handles size prop correctly', () => {
      render(<Modal isOpen={true} onClose={() => {}} size="lg">Large Modal</Modal>)
      const dialog = screen.getByRole('dialog')
      
      expect(dialog).toHaveClass('max-w-2xl')
    })

    test('renders footer when provided', () => {
      const footer = <div>Modal Footer</div>
      render(
        <Modal isOpen={true} onClose={() => {}} footer={footer}>
          Modal with Footer
        </Modal>
      )
      
      expect(screen.getByText('Modal Footer')).toBeInTheDocument()
    })
  })

  describe('Card Component Props', () => {
    test('renders with default padding', () => {
      render(<Card>Card Content</Card>)
      const card = screen.getByText('Card Content').parentElement
      
      expect(card).toHaveClass('p-6')
    })

    test('handles compact padding variant', () => {
      render(<Card padding="compact">Compact Card</Card>)
      const card = screen.getByText('Compact Card').parentElement
      
      expect(card).toHaveClass('p-4')
    })

    test('handles hoverable prop', () => {
      render(<Card hoverable>Hoverable Card</Card>)
      const card = screen.getByText('Hoverable Card').parentElement
      
      expect(card).toHaveClass('hover:shadow-md')
    })
  })

  describe('AmountInput Component Props', () => {
    test('formats currency correctly', () => {
      render(<AmountInput currency="USD" value="1234.56" onChange={() => {}} />)
      const input = screen.getByDisplayValue('$1,234.56')
      
      expect(input).toBeInTheDocument()
      expect(input).toHaveAttribute('inputmode', 'decimal')
    })

    test('handles different currencies', () => {
      render(<AmountInput currency="EUR" value="1000" onChange={() => {}} />)
      const input = screen.getByDisplayValue('€1,000.00')
      
      expect(input).toBeInTheDocument()
    })

    test('validates minimum and maximum values', () => {
      render(
        <AmountInput 
          value="50"
          min={100}
          max={1000}
          onChange={() => {}}
        />
      )
      const input = screen.getByDisplayValue('$50.00')
      
      expect(input).toHaveAttribute('aria-invalid', 'true')
    })
  })

  describe('CategorySelector Component Props', () => {
    test('renders default categories', () => {
      render(<CategorySelector selectedCategory="" onCategorySelect={() => {}} />)
      
      expect(screen.getByText('Food & Dining')).toBeInTheDocument()
      expect(screen.getByText('Transportation')).toBeInTheDocument()
      expect(screen.getByText('Shopping')).toBeInTheDocument()
    })

    test('handles custom categories', () => {
      const customCategories = [
        { id: 'custom1', name: 'Custom Category', icon: '🎯' }
      ]
      
      render(
        <CategorySelector 
          selectedCategory=""
          onCategorySelect={() => {}}
          customCategories={customCategories}
        />
      )
      
      expect(screen.getByText('Custom Category')).toBeInTheDocument()
    })

    test('handles category selection', async () => {
      const handleSelect = vi.fn()
      const user = userEvent.setup()
      
      render(
        <CategorySelector 
          selectedCategory=""
          onCategorySelect={handleSelect}
        />
      )
      
      const foodButton = screen.getByLabelText('Select Food & Dining category')
      await user.click(foodButton)
      
      expect(handleSelect).toHaveBeenCalledWith('food')
    })
  })

  describe('ExpenseForm Component Props', () => {
    test('renders with initial data', () => {
      const initialData = {
        amount: '25.50',
        category: 'food',
        description: 'Lunch'
      }
      
      render(<ExpenseForm initialData={initialData} onSubmit={() => {}} />)
      
      expect(screen.getByDisplayValue('$25.50')).toBeInTheDocument()
      expect(screen.getByDisplayValue('Lunch')).toBeInTheDocument()
    })

    test('handles loading state', () => {
      render(<ExpenseForm onSubmit={() => {}} loading={true} />)
      
      const submitButton = screen.getByText('Adding...')
      expect(submitButton).toBeDisabled()
    })

    test('validates required fields', async () => {
      const handleSubmit = vi.fn()
      const user = userEvent.setup()
      
      render(<ExpenseForm onSubmit={handleSubmit} />)
      
      const submitButton = screen.getByText('Add Expense')
      await user.click(submitButton)
      
      // Should not submit with empty amount
      expect(handleSubmit).not.toHaveBeenCalled()
    })
  })

  describe('Prop Edge Cases', () => {
    test('components handle undefined props gracefully', () => {
      // Test that components don't crash with undefined props
      expect(() => {
        render(<Button variant={undefined}>Button</Button>)
        render(<Input type={undefined} />)
        render(<Loading variant={undefined} />)
      }).not.toThrow()
    })

    test('components handle empty string props', () => {
      expect(() => {
        render(<Button variant="">Button</Button>)
        render(<Input placeholder="" />)
        render(<Card padding="">Content</Card>)
      }).not.toThrow()
    })

    test('AmountInput handles extreme values', () => {
      render(<AmountInput value="999999999.99" onChange={() => {}} />)
      expect(screen.getByDisplayValue('$999,999,999.99')).toBeInTheDocument()
      
      render(<AmountInput value="0" onChange={() => {}} />)
      expect(screen.getByDisplayValue('$0.00')).toBeInTheDocument()
    })
  })
})