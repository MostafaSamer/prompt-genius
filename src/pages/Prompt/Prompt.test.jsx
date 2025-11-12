import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Prompt from './index';

describe('Prompt Page', () => {
  it('renders Prompt heading', () => {
    render(<Prompt />);
    expect(screen.getByRole('heading', { name: /prompt/i })).toBeInTheDocument();
  });

  it('renders welcome message', () => {
    render(<Prompt />);
    expect(screen.getByText(/welcome to the prompt page/i)).toBeInTheDocument();
  });

  it('has correct page structure', () => {
    const { container } = render(<Prompt />);
    const promptDiv = container.querySelector('[class*="prompt"]');
    expect(promptDiv).toBeInTheDocument();
  });
});

