import { render, screen } from '@testing-library/react'
import { describe, test, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import Input from './Input'

describe('Input Component', () => {
  test('renders without errors with minimal props', () => {
    render(<Input label="Test Input" />)
    
    expect(screen.getByLabelText('Test Input')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  test('displays label correctly', () => {
    render(<Input label="Email Address" />)
    
    expect(screen.getByText('Email Address')).toBeInTheDocument()
  })

  test('shows required indicator when required prop is true', () => {
    render(<Input label="Required Field" required={true} />)
    
    expect(screen.getByText('Required Field')).toBeInTheDocument()
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  test('applies correct input type', () => {
    const types = ['text', 'number', 'email', 'password', 'tel', 'url']
    
    types.forEach(type => {
      const { unmount } = render(<Input label="Test" type={type} />)
      const input = screen.getByRole(type === 'password' ? 'textbox' : (type === 'number' ? 'spinbutton' : 'textbox'))
      expect(input).toHaveAttribute('type', type)
      unmount()
    })
  })

  test('handles value and onChange correctly', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()
    
    render(<Input label="Test Input" value="" onChange={handleChange} />)
    
    const input = screen.getByRole('textbox')
    await user.type(input, 'Hello')
    
    expect(handleChange).toHaveBeenCalled()
  })

  test('displays placeholder text', () => {
    render(<Input label="Test" placeholder="Enter your text here" />)
    
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('placeholder', 'Enter your text here')
  })

  test('handles disabled state', () => {
    render(<Input label="Disabled Input" disabled={true} />)
    
    const input = screen.getByRole('textbox')
    expect(input).toBeDisabled()
    expect(input).toHaveClass('bg-gray-50', 'text-gray-500', 'cursor-not-allowed')
  })

  test('shows error state and message', () => {
    render(<Input label="Test Input" error="This field is required" />)
    
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('border-red-300', 'focus:border-red-500', 'focus:ring-red-500')
    expect(screen.getByText('This field is required')).toBeInTheDocument()
    expect(screen.getByText('This field is required')).toHaveClass('text-red-600')
  })

  test('shows success state and message', () => {
    render(<Input label="Test Input" success="Valid input" />)
    
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('border-green-300', 'focus:border-green-500', 'focus:ring-green-500')
    expect(screen.getByText('Valid input')).toBeInTheDocument()
    expect(screen.getByText('Valid input')).toHaveClass('text-green-600')
  })

  test('shows help text', () => {
    render(<Input label="Password" helpText="Must be at least 8 characters" />)
    
    expect(screen.getByText('Must be at least 8 characters')).toBeInTheDocument()
    expect(screen.getByText('Must be at least 8 characters')).toHaveClass('text-gray-500')
  })

  test('has proper accessibility attributes', () => {
    render(<Input label="Test Input" required={true} />)
    
    const input = screen.getByRole('textbox')
    const label = screen.getByText('Test Input')
    
    expect(input).toHaveAttribute('required')
    expect(input).toHaveAttribute('id')
    expect(label).toHaveAttribute('for', input.getAttribute('id'))
  })

  test('associates error message with input via aria-describedby', () => {
    render(<Input label="Test Input" error="Error message" />)
    
    const input = screen.getByRole('textbox')
    const errorMessage = screen.getByText('Error message')
    
    expect(input).toHaveAttribute('aria-describedby')
    expect(errorMessage).toHaveAttribute('id', input.getAttribute('aria-describedby'))
  })

  test('associates help text with input via aria-describedby', () => {
    render(<Input label="Test Input" helpText="Help text" />)
    
    const input = screen.getByRole('textbox')
    const helpText = screen.getByText('Help text')
    
    expect(input).toHaveAttribute('aria-describedby')
    expect(helpText).toHaveAttribute('id', input.getAttribute('aria-describedby'))
  })

  test('generates unique IDs for multiple inputs', () => {
    render(
      <>
        <Input label="First Input" />
        <Input label="Second Input" />
      </>
    )
    
    const firstInput = screen.getByLabelText('First Input')
    const secondInput = screen.getByLabelText('Second Input')
    
    expect(firstInput.getAttribute('id')).not.toBe(secondInput.getAttribute('id'))
  })

  test('applies correct CSS classes for touch-friendly sizing', () => {
    render(<Input label="Test Input" />)
    
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('min-h-[44px]', 'px-3', 'py-3')
  })

  test('has focus styles', () => {
    render(<Input label="Test Input" />)
    
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass(
      'focus:outline-none',
      'focus:ring-2',
      'focus:border-primary-500',
      'focus:ring-primary-500'
    )
  })

  test('applies full width by default', () => {
    render(<Input label="Test Input" />)
    
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('w-full')
  })

  test('error takes precedence over success state', () => {
    render(<Input label="Test Input" error="Error" success="Success" />)
    
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('border-red-300', 'focus:border-red-500')
    expect(input).not.toHaveClass('border-green-300', 'focus:border-green-500')
    expect(screen.getByText('Error')).toBeInTheDocument()
    expect(screen.queryByText('Success')).not.toBeInTheDocument()
  })

  test('label has correct styling', () => {
    render(<Input label="Test Label" />)
    
    const label = screen.getByText('Test Label')
    expect(label).toHaveClass('block', 'text-sm', 'font-medium', 'text-gray-700', 'mb-1')
  })

  test('container has proper spacing', () => {
    const { container } = render(<Input label="Test Input" />)
    const wrapper = container.firstChild
    
    expect(wrapper).toHaveClass('w-full')
  })
})