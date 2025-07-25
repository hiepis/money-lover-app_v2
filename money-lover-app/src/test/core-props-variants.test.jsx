import { render, screen, fireEvent } from '@testing-library/react'
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest'
import userEvent from '@testing-library/user-event'

// Import all components for props and variants testing
import Button from '../components/UI/Button'
import Input from '../components/UI/Input'
import Card from '../components/UI/Card'
import Modal from '../components/UI/Modal'
import Loading from '../components/UI/Loading'
import AmountInput from '../components/Forms/AmountInput'
import CategorySelector from '../components/Forms/CategorySelector'
import Header from '../components/Layout/Header'
import Navigation from '../components/Layout/Navigation'

const mockFn = vi.fn()

describe('Core Component Props and Variants Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })
  
  afterEach(() => {
    document.body.innerHTML = ''
  })

  describe('Button Component Variants and Props', () => {
    test('renders all button variants correctly', () => {
      const variants = [
        { variant: 'primary', expectedClasses: ['bg-primary', 'text-white'] },
        { variant: 'secondary', expectedClasses: ['bg-gray-100', 'text-gray-700'] },
        { variant: 'success', expectedClasses: ['bg-success', 'text-white'] },
        { variant: 'danger', expectedClasses: ['bg-red-600', 'text-white'] },
        { variant: 'ghost', expectedClasses: ['bg-transparent', 'text-gray-600'] }
      ]
      
      variants.forEach(({ variant, expectedClasses }) => {
        const { unmount } = render(<Button variant={variant}>{variant} Button</Button>)
        
        const button = screen.getByText(`${variant} Button`)
        expect(button).toBeInTheDocument()
        
        expectedClasses.forEach(className => {
          expect(button).toHaveClass(className)
        })
        
        unmount()
      })
    })

    test('renders all button sizes correctly', () => {
      const sizes = [
        { size: 'sm', expectedClasses: ['px-3', 'py-2', 'text-sm', 'min-h-[36px]'] },
        { size: 'md', expectedClasses: ['px-4', 'py-3', 'text-base', 'min-h-[44px]'] },
        { size: 'lg', expectedClasses: ['px-6', 'py-4', 'text-lg', 'min-h-[52px]'] }
      ]
      
      sizes.forEach(({ size, expectedClasses }) => {
        const { unmount } = render(<Button size={size}>{size} Button</Button>)
        
        const button = screen.getByText(`${size} Button`)
        expectedClasses.forEach(className => {
          expect(button).toHaveClass(className)
        })
        
        unmount()
      })
    })

    test('handles button states correctly', () => {
      // Test disabled state
      const { unmount: unmountDisabled } = render(<Button disabled>Disabled</Button>)
      expect(screen.getByRole('button')).toBeDisabled()
      unmountDisabled()
      
      // Test loading state
      const { unmount: unmountLoading } = render(<Button loading>Loading</Button>)
      expect(screen.getByRole('button')).toBeDisabled()
      expect(document.querySelector('.animate-spin')).toBeInTheDocument()
      unmountLoading()
      
      // Test fullWidth
      const { unmount: unmountFullWidth } = render(<Button fullWidth>Full Width</Button>)
      expect(screen.getByRole('button')).toHaveClass('w-full')
      unmountFullWidth()
    })

    test('handles click events correctly', async () => {
      const handleClick = vi.fn()
      const user = userEvent.setup()
      
      render(<Button onClick={handleClick}>Click Me</Button>)
      
      await user.click(screen.getByRole('button'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('Input Component Variants and Props', () => {
    test('renders different input types correctly', () => {
      const types = ['text', 'number', 'email', 'password']
      
      types.forEach(type => {
        const { unmount } = render(
          <Input label={`${type} input`} type={type} value="" onChange={mockFn} />
        )
        
        const input = screen.getByLabelText(`${type} input`)
        expect(input).toHaveAttribute('type', type)
        
        unmount()
      })
    })

    test('handles validation states correctly', () => {
      // Error state
      const { unmount: unmountError } = render(
        <Input label="Error Input" value="" onChange={mockFn} error="Error message" />
      )
      
      const errorInput = screen.getByRole('textbox')
      expect(errorInput).toHaveClass('border-red-300')
      expect(screen.getByText('Error message')).toBeInTheDocument()
      unmountError()
      
      // Success state
      const { unmount: unmountSuccess } = render(
        <Input label="Success Input" value="" onChange={mockFn} success="Success message" />
      )
      
      const successInput = screen.getByRole('textbox')
      expect(successInput).toHaveClass('border-green-300')
      expect(screen.getByText('Success message')).toBeInTheDocument()
      unmountSuccess()
    })

    test('handles required and disabled states', () => {
      // Required state
      const { unmount: unmountRequired } = render(
        <Input label="Required Input" required value="" onChange={mockFn} />
      )
      
      const requiredInput = screen.getByRole('textbox')
      expect(requiredInput).toHaveAttribute('required')
      expect(screen.getByText('*')).toBeInTheDocument()
      unmountRequired()
      
      // Disabled state
      const { unmount: unmountDisabled } = render(
        <Input label="Disabled Input" disabled value="" onChange={mockFn} />
      )
      
      const disabledInput = screen.getByRole('textbox')
      expect(disabledInput).toBeDisabled()
      expect(disabledInput).toHaveClass('bg-gray-50', 'cursor-not-allowed')
      unmountDisabled()
    })
  })

  describe('Loading Component Variants', () => {
    test('renders all loading variants without errors', () => {
      const variants = ['spinner', 'dots', 'skeleton', 'pulse']
      
      variants.forEach(variant => {
        const { unmount } = render(<Loading variant={variant} />)
        // Should render without throwing
        expect(document.body).toBeInTheDocument()
        unmount()
      })
    })

    test('renders all loading sizes without errors', () => {
      const sizes = ['sm', 'md', 'lg']
      
      sizes.forEach(size => {
        const { unmount } = render(<Loading size={size} />)
        // Should render without throwing
        expect(document.body).toBeInTheDocument()
        unmount()
      })
    })

    test('handles text prop correctly', () => {
      render(<Loading text="Loading data..." />)
      expect(screen.getByText('Loading data...')).toBeInTheDocument()
    })
  })

  describe('Modal Component Props', () => {
    test('shows and hides based on isOpen prop', () => {
      // Modal closed
      const { rerender } = render(
        <Modal isOpen={false} onClose={mockFn} title="Test Modal">
          <p>Modal content</p>
        </Modal>
      )
      
      expect(screen.queryByText('Test Modal')).not.toBeInTheDocument()
      
      // Modal open
      rerender(
        <Modal isOpen={true} onClose={mockFn} title="Test Modal">
          <p>Modal content</p>
        </Modal>
      )
      
      expect(screen.getByText('Test Modal')).toBeInTheDocument()
      expect(screen.getByText('Modal content')).toBeInTheDocument()
    })

    test('renders different modal sizes', () => {
      const sizes = ['sm', 'md', 'lg', 'xl']
      
      sizes.forEach(size => {
        const { unmount } = render(
          <Modal isOpen={true} onClose={mockFn} title={`${size} Modal`} size={size}>
            <p>{size} content</p>
          </Modal>
        )
        
        expect(screen.getByText(`${size} Modal`)).toBeInTheDocument()
        unmount()
      })
    })
  })

  describe('Card Component Props', () => {
    test('renders basic card content', () => {
      render(
        <Card>
          <div>Card content</div>
        </Card>
      )
      
      expect(screen.getByText('Card content')).toBeInTheDocument()
    })

    test('handles hoverable prop', async () => {
      const handleClick = vi.fn()
      const user = userEvent.setup()
      
      render(
        <Card hoverable onClick={handleClick}>
          <div>Clickable card</div>
        </Card>
      )
      
      const cardContent = screen.getByText('Clickable card')
      await user.click(cardContent.closest('div'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('AmountInput Component Props', () => {
    test('handles different currency props', () => {
      const currencies = ['USD', 'EUR', 'GBP']
      
      currencies.forEach(currency => {
        const { unmount } = render(
          <AmountInput value="25.50" onChange={mockFn} currency={currency} />
        )
        
        expect(screen.getByLabelText(/amount/i)).toBeInTheDocument()
        unmount()
      })
    })

    test('handles validation props', () => {
      render(
        <AmountInput 
          value="0" 
          onChange={mockFn} 
          minAmount={0.01}
          error="Amount too small"
        />
      )
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveClass('border-red-300')
    })

    test('has mobile-optimized attributes', () => {
      render(<AmountInput value="" onChange={mockFn} />)
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('inputMode', 'decimal')
      expect(input).toHaveAttribute('pattern', '[0-9]*')
    })
  })

  describe('CategorySelector Component Props', () => {
    test('renders default categories', () => {
      render(<CategorySelector value={null} onChange={mockFn} />)
      
      // Should render some default categories
      expect(screen.getByText('Food & Dining')).toBeInTheDocument()
      expect(screen.getByText('Transportation')).toBeInTheDocument()
      expect(screen.getByText('Shopping')).toBeInTheDocument()
    })

    test('handles custom categories prop', () => {
      const customCategories = [
        { id: 'custom1', name: 'Custom Category', icon: '🎯', color: 'bg-purple-100' }
      ]
      
      render(
        <CategorySelector 
          value={null} 
          onChange={mockFn}
          categories={customCategories}
        />
      )
      
      expect(screen.getByText('Custom Category')).toBeInTheDocument()
    })
  })

  describe('Header Component Props', () => {
    test('handles different dailyTotal values', () => {
      const amounts = [0, 25.50, 1234.56]
      
      amounts.forEach(amount => {
        const { unmount } = render(<Header dailyTotal={amount} />)
        
        // Should display the app title
        expect(screen.getByText('Money Lover')).toBeInTheDocument()
        
        unmount()
      })
    })
  })

  describe('Navigation Component Props', () => {
    test('handles different currentPage values', () => {
      const pages = ['expenses', 'list', 'categories', 'summary']
      
      pages.forEach(page => {
        const { unmount } = render(<Navigation currentPage={page} onPageChange={mockFn} />)
        
        // Should render all navigation items
        expect(screen.getByText('Add')).toBeInTheDocument()
        expect(screen.getByText('List')).toBeInTheDocument()
        expect(screen.getByText('Categories')).toBeInTheDocument()
        expect(screen.getByText('Summary')).toBeInTheDocument()
        
        unmount()
      })
    })

    test('calls onPageChange when clicked', async () => {
      const handlePageChange = vi.fn()
      const user = userEvent.setup()
      
      render(<Navigation currentPage="expenses" onPageChange={handlePageChange} />)
      
      const listButton = screen.getByText('List').closest('button')
      await user.click(listButton)
      
      expect(handlePageChange).toHaveBeenCalledWith('list')
    })
  })

  describe('Default Props Behavior', () => {
    test('components render with default props', () => {
      // Test that components work with minimal props
      expect(() => {
        render(<Button>Default Button</Button>)
      }).not.toThrow()
      
      expect(() => {
        render(<Loading />)
      }).not.toThrow()
      
      expect(() => {
        render(<Header />)
      }).not.toThrow()
    })

    test('button applies correct default classes', () => {
      render(<Button>Default Button</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('bg-primary') // Default variant
      expect(button).toHaveClass('min-h-[44px]') // Default size
      expect(button).toHaveAttribute('type', 'button') // Default type
    })
  })

  describe('Prop Edge Cases', () => {
    test('components handle empty strings gracefully', () => {
      expect(() => {
        render(<Button className="">Empty Class</Button>)
        render(<Input label="Test" placeholder="" value="" onChange={mockFn} />)
      }).not.toThrow()
    })

    test('components handle large values', () => {
      expect(() => {
        render(<Header dailyTotal={999999.99} />)
        render(<AmountInput value="999999.99" onChange={mockFn} />)
      }).not.toThrow()
    })
  })
})