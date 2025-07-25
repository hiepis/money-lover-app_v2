import { render, screen } from '@testing-library/react'
import { describe, test, expect, vi } from 'vitest'
import AppLayout from './AppLayout'

// Mock child components to avoid dependency issues
vi.mock('./Header', () => ({
  default: ({ dailyTotal }) => <div data-testid="header">Header - Daily: ${dailyTotal}</div>
}))

vi.mock('./Navigation', () => ({
  default: ({ currentPage, onPageChange }) => (
    <div data-testid="navigation">
      Navigation - Current: {currentPage}
      <button onClick={() => onPageChange('test')}>Change Page</button>
    </div>
  )
}))

describe('AppLayout Component', () => {
  const defaultProps = {
    currentPage: 'expenses',
    onPageChange: vi.fn(),
    dailyTotal: 45.75,
    children: <div data-testid="main-content">Test Content</div>
  }

  test('renders without errors', () => {
    render(<AppLayout {...defaultProps} />)
    
    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.getByTestId('navigation')).toBeInTheDocument()
    expect(screen.getByTestId('main-content')).toBeInTheDocument()
  })

  test('passes correct props to Header component', () => {
    render(<AppLayout {...defaultProps} />)
    
    expect(screen.getByTestId('header')).toHaveTextContent('Daily: $45.75')
  })

  test('passes correct props to Navigation component', () => {
    render(<AppLayout {...defaultProps} />)
    
    expect(screen.getByTestId('navigation')).toHaveTextContent('Current: expenses')
  })

  test('renders children content correctly', () => {
    const testContent = <div data-testid="custom-content">Custom Test Content</div>
    
    render(
      <AppLayout {...defaultProps}>
        {testContent}
      </AppLayout>
    )
    
    expect(screen.getByTestId('custom-content')).toBeInTheDocument()
    expect(screen.getByText('Custom Test Content')).toBeInTheDocument()
  })

  test('applies correct CSS classes for layout structure', () => {
    const { container } = render(<AppLayout {...defaultProps} />)
    const layoutDiv = container.firstChild
    
    expect(layoutDiv).toHaveClass('min-h-screen', 'bg-gray-50', 'flex', 'flex-col')
  })

  test('main content area has proper styling for scrolling', () => {
    const { container } = render(<AppLayout {...defaultProps} />)
    const mainElement = container.querySelector('main')
    
    expect(mainElement).toBeInTheDocument()
    expect(mainElement).toHaveClass('flex-1', 'overflow-y-auto', 'pb-20', 'pt-16')
  })

  test('handles different currentPage values', () => {
    const { rerender } = render(<AppLayout {...defaultProps} currentPage="list" />)
    expect(screen.getByTestId('navigation')).toHaveTextContent('Current: list')

    rerender(<AppLayout {...defaultProps} currentPage="categories" />)
    expect(screen.getByTestId('navigation')).toHaveTextContent('Current: categories')

    rerender(<AppLayout {...defaultProps} currentPage="summary" />)
    expect(screen.getByTestId('navigation')).toHaveTextContent('Current: summary')
  })

  test('handles different dailyTotal values', () => {
    const { rerender } = render(<AppLayout {...defaultProps} dailyTotal={0} />)
    expect(screen.getByTestId('header')).toHaveTextContent('Daily: $0')

    rerender(<AppLayout {...defaultProps} dailyTotal={123.45} />)
    expect(screen.getByTestId('header')).toHaveTextContent('Daily: $123.45')

    rerender(<AppLayout {...defaultProps} dailyTotal={1000.99} />)
    expect(screen.getByTestId('header')).toHaveTextContent('Daily: $1000.99')
  })

  test('renders without children', () => {
    const { currentPage, onPageChange, dailyTotal } = defaultProps
    
    render(
      <AppLayout 
        currentPage={currentPage} 
        onPageChange={onPageChange} 
        dailyTotal={dailyTotal} 
      />
    )
    
    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.getByTestId('navigation')).toBeInTheDocument()
  })
})