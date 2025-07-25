import { render } from '@testing-library/react'
import { describe, test, expect, vi } from 'vitest'

// Import all components directly
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

describe('Basic Component Rendering Tests', () => {
  test('Layout components render without errors', () => {
    expect(() => {
      render(<Header />)
    }).not.toThrow()

    expect(() => {
      render(<Navigation currentPage="expenses" onPageChange={mockFn} />)
    }).not.toThrow()

    expect(() => {
      render(
        <AppLayout currentPage="expenses" onPageChange={mockFn} dailyTotal={45.75}>
          <div>Test</div>
        </AppLayout>
      )
    }).not.toThrow()
  })

  test('UI components render without errors', () => {
    expect(() => {
      render(<Button>Test</Button>)
    }).not.toThrow()

    expect(() => {
      render(<Input label="Test" value="" onChange={mockFn} />)
    }).not.toThrow()

    expect(() => {
      render(<Card>Test content</Card>)
    }).not.toThrow()

    expect(() => {
      render(<Loading />)
    }).not.toThrow()

    expect(() => {
      render(
        <Modal isOpen={true} onClose={mockFn} title="Test">
          Test content
        </Modal>
      )
    }).not.toThrow()
  })

  test('Form components render without errors', () => {
    expect(() => {
      render(<AmountInput value="" onChange={mockFn} />)
    }).not.toThrow()

    expect(() => {
      render(<CategorySelector value={null} onChange={mockFn} />)
    }).not.toThrow()

    expect(() => {
      render(<ExpenseForm onSubmit={mockFn} />)
    }).not.toThrow()
  })

  test('Button component variants render without errors', () => {
    const variants = ['primary', 'secondary', 'success', 'danger', 'ghost']
    
    variants.forEach(variant => {
      expect(() => {
        render(<Button variant={variant}>Test</Button>)
      }).not.toThrow()
    })
  })

  test('Button component sizes render without errors', () => {
    const sizes = ['sm', 'md', 'lg']
    
    sizes.forEach(size => {
      expect(() => {
        render(<Button size={size}>Test</Button>)
      }).not.toThrow()
    })
  })

  test('Loading component variants render without errors', () => {
    const variants = ['spinner', 'dots', 'skeleton', 'pulse']
    
    variants.forEach(variant => {
      expect(() => {
        render(<Loading variant={variant} />)
      }).not.toThrow()
    })
  })

  test('Components handle disabled and loading states', () => {
    expect(() => {
      render(<Button disabled>Disabled</Button>)
    }).not.toThrow()

    expect(() => {
      render(<Button loading>Loading</Button>)
    }).not.toThrow()

    expect(() => {
      render(<Input label="Test" disabled value="" onChange={mockFn} />)
    }).not.toThrow()
  })

  test('Form components handle validation states', () => {
    expect(() => {
      render(<Input label="Test" error="Error message" value="" onChange={mockFn} />)
    }).not.toThrow()

    expect(() => {
      render(<Input label="Test" success="Success message" value="" onChange={mockFn} />)
    }).not.toThrow()

    expect(() => {
      render(<AmountInput value="" onChange={mockFn} error="Amount error" />)
    }).not.toThrow()
  })

  test('Modal handles different states', () => {
    expect(() => {
      render(<Modal isOpen={false} onClose={mockFn} title="Closed">Content</Modal>)
    }).not.toThrow()

    expect(() => {
      render(<Modal isOpen={true} onClose={mockFn} title="Open">Content</Modal>)
    }).not.toThrow()
  })

  test('Navigation handles different current pages', () => {
    const pages = ['expenses', 'list', 'categories', 'summary']
    
    pages.forEach(page => {
      expect(() => {
        render(<Navigation currentPage={page} onPageChange={mockFn} />)
      }).not.toThrow()
    })
  })

  test('Header handles different amounts', () => {
    const amounts = [0, 25.50, 1234.56, 999999.99]
    
    amounts.forEach(amount => {
      expect(() => {
        render(<Header dailyTotal={amount} />)
      }).not.toThrow()
    })
  })

  test('AmountInput handles different currencies', () => {
    const currencies = ['USD', 'EUR', 'GBP']
    
    currencies.forEach(currency => {
      expect(() => {
        render(<AmountInput value="" onChange={mockFn} currency={currency} />)
      }).not.toThrow()
    })
  })
})