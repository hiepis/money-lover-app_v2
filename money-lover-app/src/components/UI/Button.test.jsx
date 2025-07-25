import { render, screen } from '@testing-library/react'
import { describe, test, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import Button from './Button'

describe('Button Component', () => {
  test('renders without errors with default props', () => {
    render(<Button>Click me</Button>)
    
    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  test('applies correct variant classes', () => {
    // Test primary variant
    const { rerender } = render(<Button variant="primary">Test</Button>)
    let button = screen.getByRole('button')
    expect(button).toHaveClass('bg-primary', 'text-white')
    
    // Test secondary variant
    rerender(<Button variant="secondary">Test</Button>)
    button = screen.getByRole('button')
    expect(button).toHaveClass('bg-gray-100', 'text-gray-700', 'border', 'border-gray-300')
    
    // Test success variant
    rerender(<Button variant="success">Test</Button>)
    button = screen.getByRole('button')
    expect(button).toHaveClass('bg-success', 'text-white')
  })

  test('applies correct size classes', () => {
    // Test small size
    const { rerender } = render(<Button size="sm">Test</Button>)
    let button = screen.getByRole('button')
    expect(button).toHaveClass('px-3', 'py-2', 'text-sm', 'min-h-[36px]')
    
    // Test medium size (default)
    rerender(<Button size="md">Test</Button>)
    button = screen.getByRole('button')
    expect(button).toHaveClass('px-4', 'py-3', 'text-base', 'min-h-[44px]')
    
    // Test large size
    rerender(<Button size="lg">Test</Button>)
    button = screen.getByRole('button')
    expect(button).toHaveClass('px-6', 'py-4', 'text-lg', 'min-h-[52px]')
  })

  test('shows loading state correctly', () => {
    render(<Button loading={true}>Submit</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveTextContent('Submit') // Shows original text + spinner
    
    // Check for loading spinner
    expect(button.querySelector('.animate-spin')).toBeInTheDocument()
  })

  test('handles disabled state', () => {
    render(<Button disabled={true}>Click me</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveClass('disabled:opacity-50', 'disabled:cursor-not-allowed')
  })

  test('applies fullWidth prop correctly', () => {
    render(<Button fullWidth={true}>Full Width</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass('w-full')
  })

  test('handles click events', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()
    
    render(<Button onClick={handleClick}>Click me</Button>)
    
    await user.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('does not trigger click when disabled', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()
    
    render(<Button onClick={handleClick} disabled={true}>Click me</Button>)
    
    await user.click(screen.getByRole('button'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  test('does not trigger click when loading', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()
    
    render(<Button onClick={handleClick} loading={true}>Click me</Button>)
    
    await user.click(screen.getByRole('button'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  test('applies custom className prop', () => {
    render(<Button className="custom-class">Test</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass('custom-class')
  })

  test('handles different button types', () => {
    render(<Button type="submit">Submit</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('type', 'submit')
  })

  test('primary variant has correct styling', () => {
    render(<Button variant="primary">Primary</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass(
      'bg-primary-600',
      'hover:bg-primary-700',
      'text-white'
    )
  })

  test('secondary variant has correct styling', () => {
    render(<Button variant="secondary">Secondary</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass(
      'bg-gray-100',
      'hover:bg-gray-200',
      'text-gray-700'
    )
  })

  test('success variant has correct styling', () => {
    render(<Button variant="success">Success</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass(
      'bg-success-600',
      'hover:bg-success-700',
      'text-white'
    )
  })

  test('danger variant has correct styling', () => {
    render(<Button variant="danger">Danger</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass(
      'bg-red-600',
      'hover:bg-red-700',
      'text-white'
    )
  })

  test('ghost variant has correct styling', () => {
    render(<Button variant="ghost">Ghost</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass(
      'bg-transparent',
      'hover:bg-gray-50',
      'text-gray-700'
    )
  })

  test('has proper accessibility attributes', () => {
    render(<Button>Accessible Button</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('type', 'button')
    expect(button).toHaveClass('focus:outline-none', 'focus:ring-2')
  })

  test('renders without children (empty button)', () => {
    render(<Button />)
    
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  test('loading spinner has correct attributes', () => {
    render(<Button loading={true}>Loading</Button>)
    
    const spinner = screen.getByRole('button').querySelector('.animate-spin')
    expect(spinner).toBeInTheDocument()
    expect(spinner).toHaveClass('w-4', 'h-4', 'border-2', 'border-current', 'border-t-transparent', 'rounded-full')
  })
})