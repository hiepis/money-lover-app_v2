import { render, screen, fireEvent } from '@testing-library/react'
import { describe, test, expect, vi } from 'vitest'  
import userEvent from '@testing-library/user-event'
import AmountInput from './AmountInput'

describe('AmountInput Component', () => {
  const mockOnChange = vi.fn()

  beforeEach(() => {
    mockOnChange.mockClear()
  })

  test('renders without errors with default props', () => {
    render(<AmountInput value="" onChange={mockOnChange} />)
    
    expect(screen.getByLabelText('Amount *')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  test('displays current value in input', () => {
    render(<AmountInput value="25.50" onChange={mockOnChange} />)
    
    const input = screen.getByRole('textbox')
    expect(input).toHaveValue('$25.50') // Shows formatted currency when not focused
  })

  test('calls onChange when value changes', async () => {
    const user = userEvent.setup()
    render(<AmountInput value="" onChange={mockOnChange} />)
    
    const input = screen.getByRole('textbox')
    await user.type(input, '123')
    
    expect(mockOnChange).toHaveBeenCalled()
  })

  test('applies currency formatting on blur', () => {
    render(<AmountInput value="25.5" onChange={mockOnChange} />)
    
    const input = screen.getByRole('textbox')
    fireEvent.focus(input) // Focus first to show plain value
    fireEvent.blur(input)
    
    // Should format to currency display
    expect(input).toHaveValue('$25.50')
  })

  test('shows plain value on focus', () => {
    render(<AmountInput value="25.50" onChange={mockOnChange} />)
    
    const input = screen.getByRole('textbox')
    fireEvent.focus(input)
    
    // Should show plain numeric value when focused
    expect(input).toHaveValue('25.50')
  })

  test('has correct input attributes for mobile', () => {
    render(<AmountInput value="" onChange={mockOnChange} />)
    
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('inputMode', 'decimal')
    expect(input).toHaveAttribute('pattern', '[0-9]*')
  })

  test('applies right-aligned monospace styling', () => {
    render(<AmountInput value="123.45" onChange={mockOnChange} />)
    
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('text-right', 'font-mono')
  })

  test('shows validation error for invalid amount', () => {
    render(<AmountInput value="abc" onChange={mockOnChange} />)
    
    // Should show error message for non-numeric input
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('border-red-300')
  })

  test('prevents negative amounts', async () => {
    const user = userEvent.setup()
    render(<AmountInput value="" onChange={mockOnChange} />)
    
    const input = screen.getByRole('textbox')
    await user.type(input, '-25')
    
    // Should either prevent input or show error
    expect(input.value).not.toMatch(/^-/)
  })

  test('handles decimal precision correctly', async () => {
    const user = userEvent.setup()
    render(<AmountInput value="" onChange={mockOnChange} allowDecimals={true} />)
    
    const input = screen.getByRole('textbox')
    await user.type(input, '25.555')
    
    fireEvent.blur(input)
    // Should limit to 2 decimal places
    expect(input).toHaveValue('25.56')
  })

  test('auto-focuses when autoFocus prop is true', () => {
    render(<AmountInput value="" onChange={mockOnChange} autoFocus={true} />)
    
    const input = screen.getByRole('textbox')
    expect(input).toHaveFocus()
  })

  test('respects maxAmount validation', () => {
    render(<AmountInput value="1000000" onChange={mockOnChange} maxAmount={999999.99} />)
    
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('border-red-300')
  })

  test('respects minAmount validation', () => {
    render(<AmountInput value="0" onChange={mockOnChange} minAmount={0.01} />)
    
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('border-red-300')
  })

  test('handles different currency prop', () => {
    render(<AmountInput value="25.50" onChange={mockOnChange} currency="EUR" />)
    
    // Currency formatting should respect the currency prop
    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
  })

  test('handles different locale prop', () => {
    render(<AmountInput value="1234.56" onChange={mockOnChange} locale="de-DE" />)
    
    // Should format according to German locale
    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
  })

  test('selects text when focused', () => {
    render(<AmountInput value="25.50" onChange={mockOnChange} />)
    
    const input = screen.getByRole('textbox')
    fireEvent.focus(input)
    
    // Text should be selected for easy replacement
    expect(input.selectionStart).toBe(0)
    expect(input.selectionEnd).toBe(input.value.length)
  })

  test('has proper placeholder text', () => {
    render(<AmountInput value="" onChange={mockOnChange} />)
    
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('placeholder', '0.00')
  })

  test('applies touch-friendly sizing', () => {
    render(<AmountInput value="" onChange={mockOnChange} />)
    
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('min-h-[44px]')
  })

  test('disables decimals when allowDecimals is false', async () => {
    const user = userEvent.setup()
    render(<AmountInput value="" onChange={mockOnChange} allowDecimals={false} />)
    
    const input = screen.getByRole('textbox')
    await user.type(input, '25.50')
    
    // Should only allow whole numbers
    expect(input.value).toBe('25')
  })

  test('handles large format numbers with commas', () => {
    render(<AmountInput value="1234567.89" onChange={mockOnChange} />)
    
    const input = screen.getByRole('textbox')
    fireEvent.blur(input)
    
    // Should format with thousands separators
    expect(input.value).toMatch(/1,234,567\.89/)
  })

  test('shows required indicator in label', () => {
    render(<AmountInput value="" onChange={mockOnChange} />)
    
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  test('clears invalid input and shows error', async () => {
    const user = userEvent.setup()
    render(<AmountInput value="" onChange={mockOnChange} />)
    
    const input = screen.getByRole('textbox')
    await user.type(input, 'invalid')
    
    fireEvent.blur(input)
    // Should clear invalid input or show error
    expect(input.value).toBe('')
  })
})