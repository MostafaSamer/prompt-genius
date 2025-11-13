import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from './index';

// Mock console.log to avoid cluttering test output
beforeEach(() => {
  vi.spyOn(console, 'log').mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
});

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Dashboard Page', () => {
  it('renders Header component', () => {
    renderWithRouter(<Dashboard />);
    expect(screen.getByText('Prompt Genius')).toBeInTheDocument();
  });

  it('renders New Prompt button in header', () => {
    renderWithRouter(<Dashboard />);
    expect(screen.getByRole('button', { name: /new prompt/i })).toBeInTheDocument();
  });

  it('renders "Your Prompt Library" heading', () => {
    renderWithRouter(<Dashboard />);
    expect(screen.getByText('Your Prompt Library')).toBeInTheDocument();
  });

  it('renders search input', () => {
    renderWithRouter(<Dashboard />);
    const searchInput = screen.getByPlaceholderText(/filter prompts by name or tag/i);
    expect(searchInput).toBeInTheDocument();
  });

  it('renders prompt list with mock data', () => {
    renderWithRouter(<Dashboard />);
    expect(screen.getByText('Social Media Ad Copy')).toBeInTheDocument();
    expect(screen.getByText('Blog Post Outline')).toBeInTheDocument();
    expect(screen.getByText('Sales Follow-Up Email')).toBeInTheDocument();
  });

  it('displays prompt descriptions', () => {
    renderWithRouter(<Dashboard />);
    expect(screen.getByText(/Generate compelling ad copy for a/i)).toBeInTheDocument();
    expect(screen.getByText(/Create a structured outline for a blog post/i)).toBeInTheDocument();
    expect(screen.getByText(/Draft a professional follow-up email/i)).toBeInTheDocument();
  });

  it('filters prompts based on search query', async () => {
    const user = userEvent.setup();
    renderWithRouter(<Dashboard />);

    const searchInput = screen.getByPlaceholderText(/filter prompts by name or tag/i);
    await user.type(searchInput, 'Social Media');

    expect(screen.getByText('Social Media Ad Copy')).toBeInTheDocument();
    expect(screen.queryByText('Blog Post Outline')).not.toBeInTheDocument();
    expect(screen.queryByText('Sales Follow-Up Email')).not.toBeInTheDocument();
  });

  it('filters prompts by description', async () => {
    const user = userEvent.setup();
    renderWithRouter(<Dashboard />);

    const searchInput = screen.getByPlaceholderText(/filter prompts by name or tag/i);
    await user.type(searchInput, 'blog post');

    expect(screen.getByText('Blog Post Outline')).toBeInTheDocument();
    expect(screen.queryByText('Social Media Ad Copy')).not.toBeInTheDocument();
    expect(screen.queryByText('Sales Follow-Up Email')).not.toBeInTheDocument();
  });

  it('shows all prompts when search is cleared', async () => {
    const user = userEvent.setup();
    renderWithRouter(<Dashboard />);

    const searchInput = screen.getByPlaceholderText(/filter prompts by name or tag/i);
    await user.type(searchInput, 'Social Media');
    await user.clear(searchInput);

    expect(screen.getByText('Social Media Ad Copy')).toBeInTheDocument();
    expect(screen.getByText('Blog Post Outline')).toBeInTheDocument();
    expect(screen.getByText('Sales Follow-Up Email')).toBeInTheDocument();
  });

  it('opens modal when New Prompt button is clicked', async () => {
    const user = userEvent.setup();
    renderWithRouter(<Dashboard />);

    const newPromptButton = screen.getByRole('button', { name: /new prompt/i });
    await user.click(newPromptButton);

    expect(screen.getByText('Create New Prompt')).toBeInTheDocument();
  });

  it('closes modal when close button is clicked', async () => {
    const user = userEvent.setup();
    renderWithRouter(<Dashboard />);

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
    renderWithRouter(<Dashboard />);

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
    renderWithRouter(<Dashboard />);

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
    renderWithRouter(<Dashboard />);

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
    renderWithRouter(<Dashboard />);

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
    renderWithRouter(<Dashboard />);

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
    const { container } = renderWithRouter(<Dashboard />);
    const dashboardDiv = container.querySelector('[class*="dashboard"]');
    expect(dashboardDiv).toBeInTheDocument();
  });

  it('renders edit buttons for each prompt', () => {
    renderWithRouter(<Dashboard />);
    const editButtons = screen.getAllByLabelText(/edit/i);
    expect(editButtons.length).toBeGreaterThan(0);
  });

  it('navigates to prompt page when edit button is clicked', async () => {
    const user = userEvent.setup();
    renderWithRouter(<Dashboard />);

    const editButtons = screen.getAllByLabelText(/edit/i);
    await user.click(editButtons[0]);

    // Check that navigation occurred (URL should change)
    // Since we're using BrowserRouter, we can check the window location
    await waitFor(() => {
      expect(window.location.pathname).toBe('/prompt/1');
    }, { timeout: 2000 });
  });

  it('renders delete buttons for each prompt', () => {
    renderWithRouter(<Dashboard />);
    const deleteButtons = screen.getAllByLabelText(/delete/i);
    expect(deleteButtons.length).toBeGreaterThan(0);
  });

  it('opens delete confirmation modal when delete button is clicked', async () => {
    const user = userEvent.setup();
    renderWithRouter(<Dashboard />);

    const deleteButtons = screen.getAllByLabelText(/delete/i);
    await user.click(deleteButtons[0]);

    expect(screen.getByText('Delete Prompt')).toBeInTheDocument();
    expect(screen.getByText(/Are you sure you want to delete this prompt/i)).toBeInTheDocument();
  });

  it('closes delete modal when cancel is clicked', async () => {
    const user = userEvent.setup();
    renderWithRouter(<Dashboard />);

    // Open delete modal
    const deleteButtons = screen.getAllByLabelText(/delete/i);
    await user.click(deleteButtons[0]);

    expect(screen.getByText('Delete Prompt')).toBeInTheDocument();

    // Click cancel
    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    await user.click(cancelButton);

    await waitFor(() => {
      expect(screen.queryByText('Delete Prompt')).not.toBeInTheDocument();
    });
  });

  it('confirms deletion when delete button in modal is clicked', async () => {
    const user = userEvent.setup();
    renderWithRouter(<Dashboard />);

    // Open delete modal
    const deleteButtons = screen.getAllByLabelText(/delete/i);
    await user.click(deleteButtons[0]);

    expect(screen.getByText('Delete Prompt')).toBeInTheDocument();

    // Click delete confirm button
    const deleteConfirmButton = screen.getByRole('button', { name: /^delete$/i });
    await user.click(deleteConfirmButton);

    // Check that console.log was called with delete action
    expect(console.log).toHaveBeenCalledWith('Deleting prompt:', '1');

    // Modal should close
    await waitFor(() => {
      expect(screen.queryByText('Delete Prompt')).not.toBeInTheDocument();
    });
  });
});

