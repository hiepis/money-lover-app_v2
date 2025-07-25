import { render, screen } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import Header from './Header'

describe('Header Component', () => {
  test('renders without errors with default props', () => {
    render(<Header />)
    
    expect(screen.getByText('Money Lover')).toBeInTheDocument()
    expect(screen.getByText('$0.00')).toBeInTheDocument()
  })

  test('displays correct daily total', () => {
    render(<Header dailyTotal={45.75} />)
    
    expect(screen.getByText('$45.75')).toBeInTheDocument()
  })

  test('formats large amounts correctly', () => {
    render(<Header dailyTotal={1234.56} />)
    
    expect(screen.getByText('$1,234.56')).toBeInTheDocument()
  })

  test('handles zero daily total', () => {
    render(<Header dailyTotal={0} />)
    
    expect(screen.getByText('$0.00')).toBeInTheDocument()
  })

  test('handles different currency prop', () => {
    render(<Header dailyTotal={45.75} currency="EUR" />)
    
    // Should still show dollar sign for now (EUR support is future enhancement)
    expect(screen.getByText('$45.75')).toBeInTheDocument()
  })

  test('renders app logo with correct attributes', () => {
    render(<Header />)
    
    const logoContainer = screen.getByText('$').closest('div')
    expect(logoContainer).toHaveClass('w-8', 'h-8', 'bg-primary-600', 'rounded-lg')
  })

  test('applies correct header styling', () => {
    const { container } = render(<Header />)
    const headerElement = container.querySelector('header')
    
    expect(headerElement).toHaveClass(
      'fixed', 'top-0', 'left-0', 'right-0', 'z-fixed',
      'bg-white', 'border-b', 'border-gray-200', 'shadow-sm'
    )
  })

  test('has correct responsive typography classes', () => {
    render(<Header />)
    
    const titleElement = screen.getByText('Money Lover')
    expect(titleElement).toHaveClass('text-lg', 'md:text-xl', 'font-bold')
    
    const subtitleElement = screen.getByText('Personal Expense Tracker')
    expect(subtitleElement).toHaveClass('text-xs', 'text-gray-500')
  })

  test('daily total has correct styling', () => {
    render(<Header dailyTotal={45.75} />)
    
    const totalElement = screen.getByText('$45.75')
    expect(totalElement).toHaveClass('text-lg', 'md:text-xl', 'font-bold', 'text-gray-900')
  })

  test('today label has correct styling', () => {
    render(<Header />)
    
    const todayLabel = screen.getByText('Today')
    expect(todayLabel).toHaveClass('text-xs', 'text-gray-500')
  })

  test('renders with proper semantic HTML structure', () => {
    const { container } = render(<Header />)
    
    expect(container.querySelector('header')).toBeInTheDocument()
    const logoContainer = screen.getByText('$').closest('div')
    expect(logoContainer).toBeInTheDocument()
  })

  test('handles decimal precision correctly', () => {
    render(<Header dailyTotal={45.7} />)
    expect(screen.getByText('$45.70')).toBeInTheDocument()
    
    render(<Header dailyTotal={45} />)  
    expect(screen.getByText('$45.00')).toBeInTheDocument()
  })

  test('handles very large amounts', () => {
    render(<Header dailyTotal={999999.99} />)
    expect(screen.getByText('$999,999.99')).toBeInTheDocument()
  })
})