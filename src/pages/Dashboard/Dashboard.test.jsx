import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Dashboard from './index';

// Mock console.log to avoid cluttering test output
beforeEach(() => {
  vi.spyOn(console, 'log').mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Dashboard Page', () => {
  it('renders Header component', () => {
    render(<Dashboard />);
    expect(screen.getByText('Prompt Genius')).toBeInTheDocument();
  });

  it('renders New Prompt button in header', () => {
    render(<Dashboard />);
    expect(screen.getByRole('button', { name: /new prompt/i })).toBeInTheDocument();
  });

  it('opens modal when New Prompt button is clicked', async () => {
    const user = userEvent.setup();
    render(<Dashboard />);

    const newPromptButton = screen.getByRole('button', { name: /new prompt/i });
    await user.click(newPromptButton);

    expect(screen.getByText('Create New Prompt')).toBeInTheDocument();
  });

  it('closes modal when close button is clicked', async () => {
    const user = userEvent.setup();
    render(<Dashboard />);

    // Open modal
    const newPromptButton = screen.getByRole('button', { name: /new prompt/i });
    await user.click(newPromptButton);

    // Close modal
    const closeButton = screen.getByLabelText('Close modal');
    await user.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByText('Create New Prompt')).not.toBeInTheDocument();
    });
  });

  it('closes modal when Escape key is pressed', async () => {
    const user = userEvent.setup();
    render(<Dashboard />);

    // Open modal
    const newPromptButton = screen.getByRole('button', { name: /new prompt/i });
    await user.click(newPromptButton);

    expect(screen.getByText('Create New Prompt')).toBeInTheDocument();

    // Press Escape
    await user.keyboard('{Escape}');

    await waitFor(() => {
      expect(screen.queryByText('Create New Prompt')).not.toBeInTheDocument();
    });
  });

  it('renders form in modal with correct inputs', async () => {
    const user = userEvent.setup();
    render(<Dashboard />);

    // Open modal
    const newPromptButton = screen.getByRole('button', { name: /new prompt/i });
    await user.click(newPromptButton);

    // Check form inputs
    expect(screen.getByRole('textbox', { name: /prompt title/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /description/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /prompt body/i })).toBeInTheDocument();
  });

  it('closes modal when form is submitted with valid data', async () => {
    const user = userEvent.setup();
    render(<Dashboard />);

    // Open modal
    const newPromptButton = screen.getByRole('button', { name: /new prompt/i });
    await user.click(newPromptButton);

    // Fill form
    const titleInput = screen.getByRole('textbox', { name: /prompt title/i });
    const descriptionInput = screen.getByRole('textbox', { name: /description/i });
    const bodyInput = screen.getByRole('textbox', { name: /prompt body/i });

    await user.type(titleInput, 'Test Title');
    await user.type(descriptionInput, 'Test Description');
    await user.type(bodyInput, 'Test Body');

    // Submit form
    const submitButton = screen.getByRole('button', { name: /save prompt/i });
    await user.click(submitButton);

    // Modal should close
    await waitFor(() => {
      expect(screen.queryByText('Create New Prompt')).not.toBeInTheDocument();
    });

    // Check that console.log was called with form data
    expect(console.log).toHaveBeenCalledWith(
      'Saving prompt:',
      expect.objectContaining({
        title: 'Test Title',
        description: 'Test Description',
        promptBody: 'Test Body',
      })
    );
  });

  it('closes modal when form cancel button is clicked', async () => {
    const user = userEvent.setup();
    render(<Dashboard />);

    // Open modal
    const newPromptButton = screen.getByRole('button', { name: /new prompt/i });
    await user.click(newPromptButton);

    // Click cancel
    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    await user.click(cancelButton);

    // Modal should close
    await waitFor(() => {
      expect(screen.queryByText('Create New Prompt')).not.toBeInTheDocument();
    });
  });

  it('prevents form submission when required fields are empty', async () => {
    const user = userEvent.setup();
    render(<Dashboard />);

    // Open modal
    const newPromptButton = screen.getByRole('button', { name: /new prompt/i });
    await user.click(newPromptButton);

    // Try to submit without filling fields
    const submitButton = screen.getByRole('button', { name: /save prompt/i });
    await user.click(submitButton);

    // Modal should still be open
    expect(screen.getByText('Create New Prompt')).toBeInTheDocument();
    // console.log should not be called
    expect(console.log).not.toHaveBeenCalled();
  });

  it('has correct dashboard structure', () => {
    const { container } = render(<Dashboard />);
    const dashboardDiv = container.querySelector('[class*="dashboard"]');
    expect(dashboardDiv).toBeInTheDocument();
  });
});

