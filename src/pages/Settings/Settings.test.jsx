import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Settings from './index';

describe('Settings Page', () => {
  it('renders Settings heading', () => {
    render(<Settings />);
    expect(screen.getByRole('heading', { name: /settings/i })).toBeInTheDocument();
  });

  it('renders welcome message', () => {
    render(<Settings />);
    expect(screen.getByText(/welcome to the settings page/i)).toBeInTheDocument();
  });

  it('has correct page structure', () => {
    const { container } = render(<Settings />);
    const settingsDiv = container.querySelector('[class*="settings"]');
    expect(settingsDiv).toBeInTheDocument();
  });
});

