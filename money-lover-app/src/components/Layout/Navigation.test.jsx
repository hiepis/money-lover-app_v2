import { render, screen } from '@testing-library/react'
import { describe, test, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import Navigation from './Navigation'

describe('Navigation Component', () => {
  const mockOnPageChange = vi.fn()

  beforeEach(() => {
    mockOnPageChange.mockClear()
  })

  test('renders without errors', () => {
    render(<Navigation currentPage="expenses" onPageChange={mockOnPageChange} />)
    
    expect(screen.getByText('Add')).toBeInTheDocument()
    expect(screen.getByText('List')).toBeInTheDocument()
    expect(screen.getByText('Categories')).toBeInTheDocument()
    expect(screen.getByText('Summary')).toBeInTheDocument()
  })

  test('highlights active page correctly', () => {
    render(<Navigation currentPage="expenses" onPageChange={mockOnPageChange} />)
    
    const addButton = screen.getByText('Add').closest('button')
    expect(addButton).toHaveClass('text-primary-600', 'bg-primary-50')
  })

  test('calls onPageChange when navigation item is clicked', async () => {
    const user = userEvent.setup()
    render(<Navigation currentPage="expenses" onPageChange={mockOnPageChange} />)
    
    await user.click(screen.getByText('List'))
    expect(mockOnPageChange).toHaveBeenCalledWith('list')

    await user.click(screen.getByText('Categories'))
    expect(mockOnPageChange).toHaveBeenCalledWith('categories')

    await user.click(screen.getByText('Summary'))
    expect(mockOnPageChange).toHaveBeenCalledWith('summary')
  })

  test('shows active indicator dot for current page', () => {
    const { rerender } = render(<Navigation currentPage="expenses" onPageChange={mockOnPageChange} />)
    
    // Check active dot for expenses page
    const addButton = screen.getByText('Add').closest('button')
    expect(addButton.querySelector('.w-1.h-1.bg-primary-600.rounded-full')).toBeInTheDocument()

    // Change to list page and check active dot moves
    rerender(<Navigation currentPage="list" onPageChange={mockOnPageChange} />)
    const listButton = screen.getByText('List').closest('button')
    expect(listButton.querySelector('.w-1.h-1.bg-primary-600.rounded-full')).toBeInTheDocument()
  })

  test('applies correct ARIA labels for accessibility', () => {
    render(<Navigation currentPage="expenses" onPageChange={mockOnPageChange} />)
    
    expect(screen.getByLabelText('Add new expense')).toBeInTheDocument()
    expect(screen.getByLabelText('View expense list')).toBeInTheDocument()
    expect(screen.getByLabelText('Manage categories')).toBeInTheDocument()
    expect(screen.getByLabelText('View summary')).toBeInTheDocument()
  })

  test('has correct navigation role', () => {
    const { container } = render(<Navigation currentPage="expenses" onPageChange={mockOnPageChange} />)
    
    expect(container.querySelector('nav')).toBeInTheDocument()
  })

  test('applies correct CSS classes for fixed bottom positioning', () => {
    const { container } = render(<Navigation currentPage="expenses" onPageChange={mockOnPageChange} />)
    const navElement = container.querySelector('nav')
    
    expect(navElement).toHaveClass(
      'fixed', 'bottom-0', 'left-0', 'right-0', 'z-fixed',
      'bg-white', 'border-t', 'border-gray-200', 'shadow-sm', 'h-15'
    )
  })

  test('navigation buttons have proper touch target sizing', () => {
    render(<Navigation currentPage="expenses" onPageChange={mockOnPageChange} />)
    
    const buttons = screen.getAllByRole('button')
    buttons.forEach(button => {
      expect(button).toHaveClass('min-h-[44px]')
    })
  })

  test('handles all possible currentPage values', () => {
    const pages = ['expenses', 'list', 'categories', 'summary']
    
    pages.forEach(page => {
      const { container } = render(<Navigation currentPage={page} onPageChange={mockOnPageChange} />)
      
      // Find the active button and verify it has active styling
      const buttons = container.querySelectorAll('button')
      const activeButton = Array.from(buttons).find(button => 
        button.classList.contains('text-primary-600') && 
        button.classList.contains('bg-primary-50')
      )
      
      expect(activeButton).toBeInTheDocument()
    })
  })

  test('inactive navigation items have correct styling', () => {
    render(<Navigation currentPage="expenses" onPageChange={mockOnPageChange} />)
    
    const listButton = screen.getByText('List').closest('button')
    expect(listButton).toHaveClass('text-gray-600', 'bg-transparent')
    expect(listButton).not.toHaveClass('text-primary-600', 'bg-primary-50')
  })

  test('buttons have hover and focus states', () => {
    render(<Navigation currentPage="expenses" onPageChange={mockOnPageChange} />)
    
    const buttons = screen.getAllByRole('button')
    buttons.forEach(button => {
      expect(button).toHaveClass('hover:bg-gray-50', 'focus:outline-none', 'focus:ring-2', 'focus:ring-primary-500')
    })
  })

  test('renders icons (plus symbols) correctly', () => {
    render(<Navigation currentPage="expenses" onPageChange={mockOnPageChange} />)
    
    // Check that the Add button contains a plus symbol
    const addButton = screen.getByText('Add').closest('button')
    expect(addButton).toHaveTextContent('+')
  })

  test('maintains proper spacing between elements', () => {
    const { container } = render(<Navigation currentPage="expenses" onPageChange={mockOnPageChange} />)
    const navContainer = container.querySelector('.grid.grid-cols-4')
    
    expect(navContainer).toBeInTheDocument()
    expect(navContainer).toHaveClass('gap-0')
  })
})