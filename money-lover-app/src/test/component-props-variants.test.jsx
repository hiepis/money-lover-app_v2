import { render, screen, fireEvent } from '@testing-library/react'
import { describe, test, expect, vi, beforeEach } from 'vitest'
import userEvent from '@testing-library/user-event'

// Import all components for props and variants testing
import AppLayout from '../components/Layout/AppLayout'
import Header from '../components/Layout/Header'
import Navigation from '../components/Layout/Navigation'
import Button from '../components/UI/Button'
import Input from '../components/UI/Input'
import Card from '../components/UI/Card'
import Modal from '../components/UI/Modal'
import Loading from '../components/UI/Loading'
import ExpenseForm from '../components/Forms/ExpenseForm'
import AmountInput from '../components/Forms/AmountInput'
import CategorySelector from '../components/Forms/CategorySelector'

const mockFn = vi.fn()

describe('Component Props and Variants Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Button Component Props and Variants', () => {
    test('renders all button variants correctly', () => {
      const variants = ['primary', 'secondary', 'success', 'danger', 'ghost']
      
      variants.forEach((variant, index) => {
        const { unmount } = render(<Button variant={variant}>Test {variant}</Button>)
        
        const button = screen.getByText(`Test ${variant}`)
        expect(button).toBeInTheDocument()
        
        // Check variant-specific classes
        if (variant === 'primary') {
          expect(button).toHaveClass('bg-primary', 'text-white')
        } else if (variant === 'secondary') {
          expect(button).toHaveClass('bg-gray-100', 'text-gray-700')
        } else if (variant === 'success') {
          expect(button).toHaveClass('bg-success', 'text-white')
        } else if (variant === 'danger') {
          expect(button).toHaveClass('bg-red-600', 'text-white')
        } else if (variant === 'ghost') {
          expect(button).toHaveClass('bg-transparent', 'text-gray-600')
        }
        
        unmount()
      })
    })

    test('renders all button sizes correctly', () => {
      const sizes = [
        { size: 'sm', classes: ['px-3', 'py-2', 'text-sm', 'min-h-[36px]'] },
        { size: 'md', classes: ['px-4', 'py-3', 'text-base', 'min-h-[44px]'] },
        { size: 'lg', classes: ['px-6', 'py-4', 'text-lg', 'min-h-[52px]'] }
      ]
      
      sizes.forEach(({ size, classes }) => {
        const { unmount } = render(<Button size={size}>Test {size}</Button>)
        
        const button = screen.getByText(`Test ${size}`)
        classes.forEach(className => {
          expect(button).toHaveClass(className)
        })
        
        unmount()
      })
    })

    test('handles button state props correctly', () => {
      // Test disabled state
      const { unmount } = render(<Button disabled>Disabled Button</Button>)
      expect(screen.getByRole('button')).toBeDisabled()
      unmount()
      
      // Test loading state
      render(<Button loading>Loading Button</Button>)
      expect(screen.getByRole('button')).toBeDisabled()
      expect(document.querySelector('.animate-spin')).toBeInTheDocument()
      unmount()
      
      // Test fullWidth prop
      render(<Button fullWidth>Full Width Button</Button>)
      expect(screen.getByRole('button')).toHaveClass('w-full')
    })

    test('handles button type prop correctly', () => {
      const types = ['button', 'submit', 'reset']
      
      types.forEach(type => {
        const { unmount } = render(<Button type={type}>Test {type}</Button>)
        expect(screen.getByRole('button')).toHaveAttribute('type', type)
        unmount()
      })
    })

    test('handles custom className prop', () => {
      render(<Button className="custom-class">Custom Button</Button>)
      expect(screen.getByRole('button')).toHaveClass('custom-class')
    })

    test('calls onClick handler correctly', async () => {
      const handleClick = vi.fn()
      const user = userEvent.setup()
      
      render(<Button onClick={handleClick}>Clickable Button</Button>)
      
      await user.click(screen.getByRole('button'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    test('does not call onClick when disabled or loading', async () => {
      const handleClick = vi.fn()
      const user = userEvent.setup()
      
      // Test disabled
      const { rerender } = render(<Button disabled onClick={handleClick}>Disabled</Button>)
      await user.click(screen.getByRole('button'))
      expect(handleClick).not.toHaveBeenCalled()
      
      // Test loading
      rerender(<Button loading onClick={handleClick}>Loading</Button>)
      await user.click(screen.getByRole('button'))
      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe('Input Component Props and Variants', () => {
    test('renders different input types correctly', () => {
      const types = ['text', 'number', 'email', 'password', 'tel', 'url']
      
      types.forEach(type => {
        const { unmount } = render(<Input label={`${type} input`} type={type} value="" onChange={mockFn} />)
        
        const input = screen.getByLabelText(`${type} input`)
        expect(input).toHaveAttribute('type', type)
        
        unmount()
      })
    })

    test('handles validation state props correctly', () => {
      // Test error state
      const { rerender } = render(
        <Input label="Test Input" value="" onChange={mockFn} error="Error message" />
      )
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveClass('border-red-300', 'focus:border-red-500')
      expect(screen.getByText('Error message')).toBeInTheDocument()
      
      // Test success state
      rerender(
        <Input label="Test Input" value="" onChange={mockFn} success="Success message" />
      )
      
      expect(input).toHaveClass('border-green-300', 'focus:border-green-500')
      expect(screen.getByText('Success message')).toBeInTheDocument()
    })

    test('handles required prop correctly', () => {
      render(<Input label="Required Input" required value="" onChange={mockFn} />)
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('required')
      expect(screen.getByText('*')).toBeInTheDocument()
    })

    test('handles disabled state correctly', () => {
      render(<Input label="Disabled Input" disabled value="" onChange={mockFn} />)
      
      const input = screen.getByRole('textbox')
      expect(input).toBeDisabled()
      expect(input).toHaveClass('bg-gray-50', 'text-gray-500', 'cursor-not-allowed')
    })

    test('handles help text prop', () => {
      render(<Input label="Test Input" helpText="This is help text" value="" onChange={mockFn} />)
      
      expect(screen.getByText('This is help text')).toBeInTheDocument()
    })

    test('handles placeholder prop', () => {
      render(<Input label="Test Input" placeholder="Enter text here" value="" onChange={mockFn} />)
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('placeholder', 'Enter text here')
    })

    test('generates unique IDs for multiple inputs', () => {
      render(
        <div>
          <Input label="Input 1" value="" onChange={mockFn} />
          <Input label="Input 2" value="" onChange={mockFn} />
        </div>
      )
      
      const input1 = screen.getByLabelText('Input 1')
      const input2 = screen.getByLabelText('Input 2')
      
      expect(input1.getAttribute('id')).not.toBe(input2.getAttribute('id'))
    })
  })

  describe('Loading Component Props and Variants', () => {
    test('renders all loading variants correctly', () => {
      const variants = ['spinner', 'dots', 'skeleton', 'pulse']
      
      variants.forEach(variant => {
        const { unmount } = render(<Loading variant={variant} />)
        
        // Each variant should render without error
        expect(document.body).toBeInTheDocument()
        
        unmount()
      })
    })

    test('renders all loading sizes correctly', () => {
      const sizes = ['sm', 'md', 'lg']
      
      sizes.forEach(size => {
        const { unmount } = render(<Loading variant="spinner" size={size} />)
        
        // Should render without error
        expect(document.body).toBeInTheDocument()
        
        unmount()
      })
    })

    test('renders all loading colors correctly', () => {
      const colors = ['primary', 'secondary', 'white', 'success']
      
      colors.forEach(color => {
        const { unmount } = render(<Loading variant="spinner" color={color} />)
        
        // Should render without error
        expect(document.body).toBeInTheDocument()
        
        unmount()
      })
    })

    test('handles overlay prop correctly', () => {
      render(<Loading variant="spinner" overlay />)
      
      // Should render without error
      expect(document.body).toBeInTheDocument()
    })

    test('handles text prop correctly', () => {
      render(<Loading variant="spinner" text="Loading..." />)
      
      expect(screen.getByText('Loading...')).toBeInTheDocument()
    })
  })

  describe('Modal Component Props and Variants', () => {
    test('renders when isOpen is true', () => {
      render(
        <Modal isOpen={true} onClose={mockFn} title="Test Modal">
          <p>Modal content</p>
        </Modal>
      )
      
      expect(screen.getByText('Test Modal')).toBeInTheDocument()
      expect(screen.getByText('Modal content')).toBeInTheDocument()
    })

    test('does not render when isOpen is false', () => {
      render(
        <Modal isOpen={false} onClose={mockFn} title="Hidden Modal">
          <p>Hidden content</p>
        </Modal>
      )
      
      expect(screen.queryByText('Hidden Modal')).not.toBeInTheDocument()
      expect(screen.queryByText('Hidden content')).not.toBeInTheDocument()
    })

    test('renders all modal sizes correctly', () => {
      const sizes = ['sm', 'md', 'lg', 'xl', 'full']
      
      sizes.forEach(size => {
        const { unmount } = render(
          <Modal isOpen={true} onClose={mockFn} title={`${size} Modal`} size={size}>
            <p>Content for {size} modal</p>
          </Modal>
        )
        
        expect(screen.getByText(`${size} Modal`)).toBeInTheDocument()
        
        unmount()
      })
    })

    test('handles footer prop correctly', () => {
      const footer = (
        <div>
          <Button>Cancel</Button>
          <Button variant="success">Save</Button>
        </div>
      )
      
      render(
        <Modal isOpen={true} onClose={mockFn} title="Modal with Footer" footer={footer}>
          <p>Modal with footer content</p>
        </Modal>
      )
      
      expect(screen.getByText('Cancel')).toBeInTheDocument()
      expect(screen.getByText('Save')).toBeInTheDocument()
    })

    test('handles close behavior props', async () => {
      const handleClose = vi.fn()
      const user = userEvent.setup()
      
      render(
        <Modal 
          isOpen={true} 
          onClose={handleClose} 
          title="Closable Modal"
          closeOnBackdrop={true}
          closeOnEscape={true}
        >
          <p>Closable modal content</p>
        </Modal>
      )
      
      // Test close button click
      const closeButton = screen.getByRole('button', { name: /close/i })
      await user.click(closeButton)
      expect(handleClose).toHaveBeenCalledTimes(1)
    })
  })

  describe('Card Component Props and Variants', () => {
    test('renders basic card correctly', () => {
      render(
        <Card>
          <div>Basic card content</div>
        </Card>
      )
      
      expect(screen.getByText('Basic card content')).toBeInTheDocument()
    })

    test('handles padding variants correctly', () => {
      const paddingOptions = ['none', 'sm', 'md', 'lg']
      
      paddingOptions.forEach(padding => {
        const { unmount } = render(
          <Card padding={padding}>
            <div>Card with {padding} padding</div>
          </Card>
        )
        
        expect(screen.getByText(`Card with ${padding} padding`)).toBeInTheDocument()
        
        unmount()
      })
    })

    test('handles hoverable prop correctly', async () => {
      const handleClick = vi.fn()
      const user = userEvent.setup()
      
      render(
        <Card hoverable onClick={handleClick}>
          <div>Hoverable card</div>
        </Card>
      )
      
      const card = screen.getByText('Hoverable card').closest('div')
      await user.click(card)
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    test('handles header and footer props', () => {
      render(
        <Card 
          header={<h3>Card Header</h3>}
          footer={<div>Card Footer</div>}
        >
          <div>Card content</div>
        </Card>
      )
      
      expect(screen.getByText('Card Header')).toBeInTheDocument()
      expect(screen.getByText('Card content')).toBeInTheDocument()
      expect(screen.getByText('Card Footer')).toBeInTheDocument()
    })
  })

  describe('Layout Components Props', () => {
    test('Header handles different dailyTotal values', () => {
      const amounts = [0, 25.50, 1234.56, 999999.99]
      
      amounts.forEach(amount => {
        const { unmount } = render(<Header dailyTotal={amount} />)
        
        // Should format currency correctly
        const formattedAmount = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(amount)
        
        expect(screen.getByText(formattedAmount)).toBeInTheDocument()
        
        unmount()
      })
    })

    test('Header handles currency prop', () => {
      render(<Header dailyTotal={45.75} currency="EUR" />)
      
      // Should still display (EUR support is future enhancement)
      expect(screen.getByText('$45.75')).toBeInTheDocument()
    })

    test('Navigation handles all page states', () => {
      const pages = ['expenses', 'list', 'categories', 'summary']
      
      pages.forEach(page => {
        const { unmount } = render(<Navigation currentPage={page} onPageChange={mockFn} />)
        
        // All navigation items should be present
        expect(screen.getByText('Add')).toBeInTheDocument()
        expect(screen.getByText('List')).toBeInTheDocument()
        expect(screen.getByText('Categories')).toBeInTheDocument()
        expect(screen.getByText('Summary')).toBeInTheDocument()
        
        unmount()
      })
    })

    test('AppLayout handles different children and props', () => {
      const testContent = <div>Test layout content</div>
      
      render(
        <AppLayout 
          currentPage="expenses" 
          onPageChange={mockFn} 
          dailyTotal={100.50}
        >
          {testContent}
        </AppLayout>
      )
      
      expect(screen.getByText('Test layout content')).toBeInTheDocument()
      expect(screen.getByText('$100.50')).toBeInTheDocument()
    })
  })

  describe('Form Components Props and Variants', () => {
    test('AmountInput handles different currency props', () => {
      const currencies = ['USD', 'EUR', 'GBP']
      
      currencies.forEach(currency => {
        const { unmount } = render(
          <AmountInput value="25.50" onChange={mockFn} currency={currency} />
        )
        
        expect(screen.getByLabelText(/amount/i)).toBeInTheDocument()
        
        unmount()
      })
    })

    test('AmountInput handles validation props', () => {
      render(
        <AmountInput 
          value="0" 
          onChange={mockFn} 
          minAmount={0.01}
          maxAmount={1000}
          error="Amount too small"
        />
      )
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveClass('border-red-300')
    })

    test('AmountInput handles decimal control', () => {
      // Test with decimals allowed
      const { unmount } = render(
        <AmountInput value="25.50" onChange={mockFn} allowDecimals={true} />
      )
      
      expect(screen.getByRole('textbox')).toBeInTheDocument()
      unmount()
      
      // Test without decimals
      render(
        <AmountInput value="25" onChange={mockFn} allowDecimals={false} />
      )
      
      expect(screen.getByRole('textbox')).toBeInTheDocument()
    })

    test('CategorySelector handles custom categories', () => {
      const customCategories = [
        { id: 'custom1', name: 'Custom Category 1', icon: '🎯', color: 'bg-purple-100' },
        { id: 'custom2', name: 'Custom Category 2', icon: '🎨', color: 'bg-pink-100' }
      ]
      
      render(
        <CategorySelector 
          value={null} 
          onChange={mockFn}
          categories={customCategories}
          allowCustom={true}
        />
      )
      
      expect(screen.getByText('Custom Category 1')).toBeInTheDocument()
      expect(screen.getByText('Custom Category 2')).toBeInTheDocument()
    })

    test('ExpenseForm handles different props', () => {
      const initialData = {
        amount: 50,
        category: { id: 'food', name: 'Food & Dining', icon: '🍽️' },
        description: 'Test expense',
        date: '2025-07-24'
      }
      
      render(
        <ExpenseForm 
          onSubmit={mockFn}
          onCancel={mockFn}
          initialData={initialData}
          loading={false}
        />
      )
      
      // Check that the form elements are present
      expect(screen.getByLabelText(/amount/i)).toBeInTheDocument()
      expect(screen.getByDisplayValue('Test expense')).toBeInTheDocument()
    })

    test('ExpenseForm handles loading state', () => {
      render(<ExpenseForm onSubmit={mockFn} loading={true} />)
      
      const submitButton = screen.getByRole('button', { name: /add expense/i })
      expect(submitButton).toBeDisabled()
    })
  })

  describe('Default Props Behavior', () => {
    test('components render with minimal required props', () => {
      // Test components with only required props
      expect(() => {
        render(<Button>Test</Button>)
        render(<Input label="Test" value="" onChange={mockFn} />)
        render(<Loading />)
        render(<Card>Content</Card>)
        render(<Header />)
        render(<Navigation currentPage="expenses" onPageChange={mockFn} />)
        render(<AmountInput value="" onChange={mockFn} />)
        render(<CategorySelector value={null} onChange={mockFn} />)
      }).not.toThrow()
    })

    test('components apply default props correctly', () => {
      // Button defaults
      const { unmount } = render(<Button>Default Button</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('bg-primary') // Default variant is primary
      expect(button).toHaveClass('min-h-[44px]') // Default size is md
      expect(button).toHaveAttribute('type', 'button') // Default type
      unmount()
      
      // Header defaults
      render(<Header />)
      // Header should display some default content
      expect(screen.getByText('Money Lover')).toBeInTheDocument()
      unmount()
      
      // Loading defaults
      render(<Loading />)
      expect(document.querySelector('.animate-spin')).toBeInTheDocument() // Default variant is spinner
    })
  })

  describe('Prop Validation and Edge Cases', () => {
    test('components handle undefined/null props gracefully', () => {
      expect(() => {
        render(<Button variant={undefined}>Undefined Variant</Button>)
        render(<Button size={null}>Null Size</Button>)
        render(<Input label="Test" value={null} onChange={mockFn} />)
        render(<AmountInput value={undefined} onChange={mockFn} />)
      }).not.toThrow()
    })

    test('components handle empty string props', () => {
      expect(() => {
        render(<Button className="">Empty Class</Button>)
        render(<Input label="Test" placeholder="" value="" onChange={mockFn} />)
        render(<AmountInput value="" onChange={mockFn} />)
      }).not.toThrow()
    })

    test('components handle extreme values', () => {
      expect(() => {
        render(<Header dailyTotal={999999999.99} />)
        render(<AmountInput value="999999999.99" onChange={mockFn} />)
        render(<Button>{'Very '.repeat(100)}Long Text</Button>)
      }).not.toThrow()
    })
  })
})