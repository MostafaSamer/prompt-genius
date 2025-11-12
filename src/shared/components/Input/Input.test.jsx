import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from './index';

describe('Input Component', () => {
  it('renders text input by default', () => {
    render(
      <Input
        name="test-input"
        label="Test Label"
        value=""
        onChange={() => {}}
      />
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toBeInTheDocument();
    expect(input.tagName).toBe('INPUT');
    expect(input.type).toBe('text');
  });

  it('renders textarea when type is textarea', () => {
    render(
      <Input
        type="textarea"
        name="test-textarea"
        label="Test Textarea"
        value=""
        onChange={() => {}}
        rows={5}
      />
    );

    const textarea = screen.getByLabelText('Test Textarea');
    expect(textarea).toBeInTheDocument();
    expect(textarea.tagName).toBe('TEXTAREA');
    expect(textarea).toHaveAttribute('rows', '5');
  });

  it('displays label correctly', () => {
    render(
      <Input
        name="test-input"
        label="Test Label"
        value=""
        onChange={() => {}}
      />
    );

    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('displays required indicator when required is true', () => {
    render(
      <Input
        name="test-input"
        label="Test Label"
        value=""
        onChange={() => {}}
        required
      />
    );

    const requiredIndicator = screen.getByText('*');
    expect(requiredIndicator).toBeInTheDocument();
    expect(requiredIndicator.tagName).toBe('SPAN');
  });

  it('does not display required indicator when required is false', () => {
    render(
      <Input
        name="test-input"
        label="Test Label"
        value=""
        onChange={() => {}}
        required={false}
      />
    );

    const requiredIndicators = screen.queryAllByText('*');
    expect(requiredIndicators).toHaveLength(0);
  });

  it('displays error message when error prop is provided', () => {
    render(
      <Input
        name="test-input"
        label="Test Label"
        value=""
        onChange={() => {}}
        error="This field is required"
      />
    );

    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('does not display error message when error prop is not provided', () => {
    render(
      <Input
        name="test-input"
        label="Test Label"
        value=""
        onChange={() => {}}
      />
    );

    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
  });

  it('applies error class when error is present', () => {
    render(
      <Input
        name="test-input"
        label="Test Label"
        value=""
        onChange={() => {}}
        error="Error message"
      />
    );

    const input = screen.getByRole('textbox', { name: /test label/i });
    expect(input.className).toMatch(/error/);
  });

  it('calls onChange handler when input value changes', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <Input
        name="test-input"
        label="Test Label"
        value=""
        onChange={handleChange}
      />
    );

    const input = screen.getByRole('textbox', { name: /test label/i });
    await user.type(input, 'test value');

    expect(handleChange).toHaveBeenCalled();
  });

  it('displays placeholder text', () => {
    render(
      <Input
        name="test-input"
        label="Test Label"
        value=""
        onChange={() => {}}
        placeholder="Enter text here"
      />
    );

    const input = screen.getByPlaceholderText('Enter text here');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Enter text here');
  });

  it('displays current value', () => {
    render(
      <Input
        name="test-input"
        label="Test Label"
        value="Current value"
        onChange={() => {}}
      />
    );

    const input = screen.getByRole('textbox', { name: /test label/i });
    expect(input).toHaveValue('Current value');
  });

  it('has correct id and name attributes', () => {
    render(
      <Input
        name="test-input"
        label="Test Label"
        value=""
        onChange={() => {}}
      />
    );

    const input = screen.getByRole('textbox', { name: /test label/i });
    expect(input).toHaveAttribute('name', 'test-input');
    expect(input).toHaveAttribute('id', 'input-test-input');
  });

  it('sets required attribute on input when required is true', () => {
    render(
      <Input
        name="test-input"
        label="Test Label"
        value=""
        onChange={() => {}}
        required
      />
    );

    const input = screen.getByRole('textbox', { name: /test label/i });
    expect(input).toHaveAttribute('required');
  });

  it('uses default rows value of 4 for textarea', () => {
    render(
      <Input
        type="textarea"
        name="test-textarea"
        label="Test Textarea"
        value=""
        onChange={() => {}}
      />
    );

    const textarea = screen.getByLabelText('Test Textarea');
    expect(textarea).toHaveAttribute('rows', '4');
  });
});

