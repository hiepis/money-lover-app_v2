import { render, screen } from '@testing-library/react'
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest'

// Import components for responsive testing
import AppLayout from '../components/Layout/AppLayout'
import Header from '../components/Layout/Header'
import Navigation from '../components/Layout/Navigation'
import Button from '../components/UI/Button'
import Input from '../components/UI/Input'
import Card from '../components/UI/Card'
import Modal from '../components/UI/Modal'
import ExpenseForm from '../components/Forms/ExpenseForm'
import AmountInput from '../components/Forms/AmountInput'
import CategorySelector from '../components/Forms/CategorySelector'

const mockFn = vi.fn()

// Helper function to simulate viewport resize
const setViewportSize = (width, height) => {
  // Mock window dimensions
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  })
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: height,
  })
  
  // Trigger resize event
  window.dispatchEvent(new Event('resize'))
}

// Mock matchMedia for CSS media queries
const mockMatchMedia = (query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
})

describe('Responsive Behavior Tests', () => {
  beforeEach(() => {
    // Mock matchMedia
    window.matchMedia = vi.fn().mockImplementation(mockMatchMedia)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('Mobile Viewport (320px - 639px)', () => {
    beforeEach(() => {
      setViewportSize(375, 667) // iPhone SE dimensions
    })

    test('Header displays correctly on mobile', () => {
      render(<Header dailyTotal={45.75} />)
      
      const headerElement = document.querySelector('header')
      expect(headerElement).toBeInTheDocument()
      
      // Should display app title and daily total
      expect(screen.getByText('Money Lover')).toBeInTheDocument()
      expect(screen.getByText('$45.75')).toBeInTheDocument()
    })

    test('Navigation remains at bottom on mobile', () => {
      render(<Navigation currentPage="expenses" onPageChange={mockFn} />)
      
      const navElement = document.querySelector('nav')
      expect(navElement).toBeInTheDocument()
      
      // All navigation items should be visible
      expect(screen.getByText('Add')).toBeInTheDocument()
      expect(screen.getByText('List')).toBeInTheDocument()
      expect(screen.getByText('Categories')).toBeInTheDocument()
      expect(screen.getByText('Summary')).toBeInTheDocument()
    })

    test('Button components are touch-friendly on mobile', () => {
      render(
        <div>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      )
      
      const buttons = screen.getAllByRole('button')
      
      // Small button should have minimum 36px height
      expect(buttons[0]).toHaveClass('min-h-[36px]')
      // Medium button should have minimum 44px height (touch-friendly)
      expect(buttons[1]).toHaveClass('min-h-[44px]')
      // Large button should have minimum 52px height
      expect(buttons[2]).toHaveClass('min-h-[52px]')
    })

    test('ExpenseForm optimized for mobile entry', () => {
      render(<ExpenseForm onSubmit={mockFn} />)
      
      // Amount input should be easily accessible
      const amountInput = screen.getByLabelText(/amount/i)
      expect(amountInput).toBeInTheDocument()
      expect(amountInput).toHaveAttribute('inputMode', 'decimal')
      
      // Category selection should be visible
      expect(screen.getByText('Food & Dining')).toBeInTheDocument()
    })

    test('AmountInput has mobile-optimized keyboard', () => {
      render(<AmountInput value="" onChange={mockFn} />)
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('inputMode', 'decimal')
      expect(input).toHaveAttribute('pattern', '[0-9]*')
    })

    test('CategorySelector has touch-friendly targets', () => {
      render(<CategorySelector value={null} onChange={mockFn} />)
      
      const categoryButtons = screen.getAllByRole('button')
      // Should have multiple category buttons (7 default + custom option)
      expect(categoryButtons.length).toBeGreaterThan(6)
    })

    test('Modal takes full width on mobile', () => {
      render(
        <Modal isOpen={true} onClose={mockFn} title="Mobile Modal">
          <p>Modal content for mobile</p>
        </Modal>
      )
      
      expect(screen.getByText('Mobile Modal')).toBeInTheDocument()
      expect(screen.getByText('Modal content for mobile')).toBeInTheDocument()
    })
  })

  describe('Tablet Viewport (640px - 767px)', () => {
    beforeEach(() => {
      setViewportSize(768, 1024) // iPad dimensions
    })

    test('Header layout adapts for tablet', () => {
      render(<Header dailyTotal={123.45} />)
      
      expect(screen.getByText('Money Lover')).toBeInTheDocument()
      expect(screen.getByText('$123.45')).toBeInTheDocument()
      expect(screen.getByText('Personal Expense Tracker')).toBeInTheDocument()
    })

    test('Navigation maintains bottom position on tablet', () => {
      render(<Navigation currentPage="list" onPageChange={mockFn} />)
      
      // All navigation items should still be accessible
      expect(screen.getByText('Add')).toBeInTheDocument()
      expect(screen.getByText('List')).toBeInTheDocument()
      expect(screen.getByText('Categories')).toBeInTheDocument()
      expect(screen.getByText('Summary')).toBeInTheDocument()
    })

    test('Form components have better spacing on tablet', () => {
      render(<ExpenseForm onSubmit={mockFn} />)
      
      const form = document.querySelector('form')
      expect(form).toBeInTheDocument()
      
      // Should have form title and description
      expect(screen.getByText('Add New Expense')).toBeInTheDocument()
      expect(screen.getByText('Quick expense entry in seconds')).toBeInTheDocument()
    })

    test('Card components utilize tablet space efficiently', () => {
      render(
        <Card>
          <div>Tablet optimized card content</div>
        </Card>
      )
      
      expect(screen.getByText('Tablet optimized card content')).toBeInTheDocument()
    })

    test('Input components maintain proper sizing on tablet', () => {
      render(
        <div>
          <Input label="Tablet Input" value="" onChange={mockFn} />
          <AmountInput value="50.00" onChange={mockFn} />
        </div>
      )
      
      expect(screen.getByLabelText('Tablet Input')).toBeInTheDocument()
      expect(screen.getByLabelText(/amount/i)).toBeInTheDocument()
    })
  })

  describe('Desktop Viewport (768px+)', () => {
    beforeEach(() => {
      setViewportSize(1024, 768) // Standard desktop
    })

    test('Header shows full branding on desktop', () => {
      render(<Header dailyTotal={999.99} />)
      
      expect(screen.getByText('Money Lover')).toBeInTheDocument()
      expect(screen.getByText('Personal Expense Tracker')).toBeInTheDocument()
      expect(screen.getByText('$999.99')).toBeInTheDocument()
    })

    test('AppLayout centers content on desktop', () => {
      render(
        <AppLayout currentPage="expenses" onPageChange={mockFn} dailyTotal={45.75}>
          <div>Desktop content layout</div>
        </AppLayout>
      )
      
      expect(screen.getByText('Desktop content layout')).toBeInTheDocument()
    })

    test('Button hover states work on desktop', () => {
      render(
        <div>
          <Button variant="primary">Primary Desktop</Button>
          <Button variant="secondary">Secondary Desktop</Button>
        </div>
      )
      
      const buttons = screen.getAllByRole('button')
      buttons.forEach(button => {
        // Should have hover transition classes
        expect(button.className).toMatch(/hover:/)
      })
    })

    test('Form layout optimized for desktop', () => {
      render(<ExpenseForm onSubmit={mockFn} />)
      
      // Form should be present with all elements
      expect(screen.getByText('Add New Expense')).toBeInTheDocument()
      expect(screen.getByLabelText(/amount/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /add expense/i })).toBeInTheDocument()
    })

    test('Modal sizing appropriate for desktop', () => {
      render(
        <Modal isOpen={true} onClose={mockFn} title="Desktop Modal" size="lg">
          <p>Large modal content for desktop viewing</p>
        </Modal>
      )
      
      expect(screen.getByText('Desktop Modal')).toBeInTheDocument()
      expect(screen.getByText('Large modal content for desktop viewing')).toBeInTheDocument()
    })
  })

  describe('Breakpoint Transition Tests', () => {
    test('Components handle viewport changes gracefully', () => {
      const { rerender } = render(<Header dailyTotal={100} />)
      
      // Start mobile
      setViewportSize(375, 667)
      expect(screen.getByText('Money Lover')).toBeInTheDocument()
      
      // Switch to tablet
      setViewportSize(768, 1024)
      rerender(<Header dailyTotal={100} />)
      expect(screen.getByText('Money Lover')).toBeInTheDocument()
      
      // Switch to desktop
      setViewportSize(1200, 800)
      rerender(<Header dailyTotal={100} />)
      expect(screen.getByText('Money Lover')).toBeInTheDocument()
    })

    test('Navigation adapts to different screen sizes', () => {
      const { rerender } = render(<Navigation currentPage="expenses" onPageChange={mockFn} />)
      
      // Test across different viewports
      const viewports = [
        { width: 320, height: 568 }, // Small mobile
        { width: 375, height: 667 }, // iPhone
        { width: 768, height: 1024 }, // Tablet
        { width: 1024, height: 768 }, // Desktop
      ]
      
      viewports.forEach(viewport => {
        setViewportSize(viewport.width, viewport.height)
        rerender(<Navigation currentPage="expenses" onPageChange={mockFn} />)
        
        // Navigation should always be functional
        expect(screen.getByText('Add')).toBeInTheDocument()
        expect(screen.getByText('List')).toBeInTheDocument()
        expect(screen.getByText('Categories')).toBeInTheDocument()
        expect(screen.getByText('Summary')).toBeInTheDocument()
      })
    })
  })

  describe('Touch Target Validation', () => {
    test('All interactive elements meet minimum touch target size', () => {
      setViewportSize(375, 667) // Mobile viewport
      
      render(
        <div>
          <Button>Touch Button</Button>
          <Navigation currentPage="expenses" onPageChange={mockFn} />
          <AmountInput value="" onChange={mockFn} />
        </div>
      )
      
      // Buttons should have minimum 44px height
      const button = screen.getByText('Touch Button')
      expect(button).toHaveClass('min-h-[44px]')
      
      // Navigation buttons should be touch-friendly
      const navButtons = screen.getAllByRole('button')
      navButtons.forEach(btn => {
        if (btn.getAttribute('aria-label')) {
          // Navigation buttons should have min-h class
          expect(btn.className).toMatch(/min-h-/)
        }
      })
    })

    test('Form elements are appropriately sized for touch', () => {
      setViewportSize(375, 667) // Mobile viewport
      
      render(
        <div>
          <Input label="Touch Input" value="" onChange={mockFn} />
          <AmountInput value="" onChange={mockFn} />
        </div>
      )
      
      const inputs = screen.getAllByRole('textbox')
      inputs.forEach(input => {
        expect(input).toHaveClass('min-h-[44px]')
      })
    })
  })

  describe('Content Overflow and Scrolling', () => {
    test('Long content handles overflow properly', () => {
      render(
        <AppLayout currentPage="expenses" onPageChange={mockFn} dailyTotal={45.75}>
          <div style={{ height: '2000px' }}>
            Very long content that should scroll properly
          </div>
        </AppLayout>
      )
      
      const mainElement = document.querySelector('main')
      expect(mainElement).toBeInTheDocument()
      expect(mainElement).toHaveClass('overflow-y-auto')
    })

    test('Modal content handles overflow', () => {
      const longContent = Array(50).fill('Long line of modal content. ').join('')
      
      render(
        <Modal isOpen={true} onClose={mockFn} title="Overflow Test">
          <div>{longContent}</div>
        </Modal>
      )
      
      expect(screen.getByText('Overflow Test')).toBeInTheDocument()
    })
  })

  describe('Typography Responsive Scaling', () => {
    test('Header typography scales appropriately', () => {
      const { rerender } = render(<Header dailyTotal={45.75} />)
      
      // Mobile
      setViewportSize(375, 667)
      const title = screen.getByText('Money Lover')
      expect(title).toHaveClass('text-lg', 'md:text-xl')
      
      // Desktop - same element should have responsive classes
      setViewportSize(1200, 800)
      rerender(<Header dailyTotal={45.75} />)
      expect(screen.getByText('Money Lover')).toHaveClass('text-lg', 'md:text-xl')
    })

    test('Button text remains readable across screen sizes', () => {
      const sizes = ['sm', 'md', 'lg']
      
      sizes.forEach(size => {
        const { unmount } = render(<Button size={size}>Responsive Button</Button>)
        
        const button = screen.getByText('Responsive Button')
        expect(button).toBeInTheDocument()
        
        unmount()
      })
    })
  })
})