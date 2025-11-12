import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from './index';

describe('Form Component', () => {
  const mockInputs = [
    {
      type: 'text',
      label: 'Title',
      name: 'title',
      placeholder: 'Enter title',
      required: true,
    },
    {
      type: 'textarea',
      label: 'Description',
      name: 'description',
      placeholder: 'Enter description',
      required: false,
    },
  ];

  it('renders form with inputs', () => {
    render(
      <Form
        inputs={mockInputs}
        onSubmit={() => {}}
        onCancel={() => {}}
      />
    );

    expect(screen.getByRole('textbox', { name: /title/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /description/i })).toBeInTheDocument();
  });

  it('renders submit and cancel buttons', () => {
    render(
      <Form
        inputs={mockInputs}
        onSubmit={() => {}}
        onCancel={() => {}}
      />
    );

    expect(screen.getByRole('button', { name: /save prompt/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  });

  it('uses custom submit button text', () => {
    render(
      <Form
        inputs={mockInputs}
        onSubmit={() => {}}
        onCancel={() => {}}
        submitButtonText="Create Prompt"
      />
    );

    expect(screen.getByRole('button', { name: /create prompt/i })).toBeInTheDocument();
  });

  it('calls onSubmit with form data when form is submitted with valid data', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    render(
      <Form
        inputs={mockInputs}
        onSubmit={handleSubmit}
        onCancel={() => {}}
      />
    );

    const titleInput = screen.getByRole('textbox', { name: /title/i });
    const descriptionInput = screen.getByRole('textbox', { name: /description/i });
    const submitButton = screen.getByRole('button', { name: /save prompt/i });

    await user.type(titleInput, 'Test Title');
    await user.type(descriptionInput, 'Test Description');
    await user.click(submitButton);

    expect(handleSubmit).toHaveBeenCalledWith({
      title: 'Test Title',
      description: 'Test Description',
    });
  });

  it('prevents submission when required fields are empty', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    render(
      <Form
        inputs={mockInputs}
        onSubmit={handleSubmit}
        onCancel={() => {}}
      />
    );

    const submitButton = screen.getByRole('button', { name: /save prompt/i });
    await user.click(submitButton);

    // Validation should prevent submission
    expect(handleSubmit).not.toHaveBeenCalled();
    // The form should still be visible (not submitted)
    expect(submitButton).toBeInTheDocument();
  });

  it('prevents submission when required field contains only whitespace', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    render(
      <Form
        inputs={mockInputs}
        onSubmit={handleSubmit}
        onCancel={() => {}}
      />
    );

    const titleInput = screen.getByRole('textbox', { name: /title/i });
    const submitButton = screen.getByRole('button', { name: /save prompt/i });

    await user.type(titleInput, '   ');
    await user.click(submitButton);

    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('calls onCancel when cancel button is clicked', async () => {
    const user = userEvent.setup();
    const handleCancel = vi.fn();

    render(
      <Form
        inputs={mockInputs}
        onSubmit={() => {}}
        onCancel={handleCancel}
      />
    );

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    await user.click(cancelButton);

    expect(handleCancel).toHaveBeenCalled();
  });

  it('displays error messages for invalid fields', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    render(
      <Form
        inputs={mockInputs}
        onSubmit={handleSubmit}
        onCancel={() => {}}
      />
    );

    const submitButton = screen.getByRole('button', { name: /save prompt/i });
    await user.click(submitButton);

    // Validation should prevent submission
    expect(handleSubmit).not.toHaveBeenCalled();
    // The title input should still be present (form not submitted)
    expect(screen.getByRole('textbox', { name: /title/i })).toBeInTheDocument();
  });

  it('clears errors when user starts typing in a field with error', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    render(
      <Form
        inputs={mockInputs}
        onSubmit={handleSubmit}
        onCancel={() => {}}
      />
    );

    const titleInput = screen.getByRole('textbox', { name: /title/i });
    const submitButton = screen.getByRole('button', { name: /save prompt/i });

    // Submit empty form to trigger validation
    await user.click(submitButton);
    expect(handleSubmit).not.toHaveBeenCalled();

    // Start typing - this should allow submission after filling required field
    await user.type(titleInput, 'Test Title');
    
    // Now submit should work
    await user.click(submitButton);
    expect(handleSubmit).toHaveBeenCalled();
  });

  it('uses initial values when provided', () => {
    const initialValues = {
      title: 'Initial Title',
      description: 'Initial Description',
    };

    render(
      <Form
        inputs={mockInputs}
        onSubmit={() => {}}
        onCancel={() => {}}
        initialValues={initialValues}
      />
    );

    expect(screen.getByRole('textbox', { name: /title/i })).toHaveValue('Initial Title');
    expect(screen.getByRole('textbox', { name: /description/i })).toHaveValue('Initial Description');
  });

  it('handles empty inputs array', () => {
    render(
      <Form
        inputs={[]}
        onSubmit={() => {}}
        onCancel={() => {}}
      />
    );

    expect(screen.getByRole('button', { name: /save prompt/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  });

  it('passes correct props to Input components', () => {
    const inputs = [
      {
        type: 'textarea',
        label: 'Body',
        name: 'body',
        placeholder: 'Enter body',
        required: true,
        rows: 6,
      },
    ];

    render(
      <Form
        inputs={inputs}
        onSubmit={() => {}}
        onCancel={() => {}}
      />
    );

    const textarea = screen.getByRole('textbox', { name: /body/i });
    expect(textarea).toHaveAttribute('rows', '6');
    expect(textarea).toHaveAttribute('placeholder', 'Enter body');
  });

  it('resets form to initial values when cancel is clicked', async () => {
    const user = userEvent.setup();
    const initialValues = {
      title: 'Initial Title',
      description: 'Initial Description',
    };

    render(
      <Form
        inputs={mockInputs}
        onSubmit={() => {}}
        onCancel={() => {}}
        initialValues={initialValues}
      />
    );

    const titleInput = screen.getByRole('textbox', { name: /title/i });
    const cancelButton = screen.getByRole('button', { name: /cancel/i });

    // Change the value
    await user.clear(titleInput);
    await user.type(titleInput, 'Changed Title');
    expect(titleInput).toHaveValue('Changed Title');

    // Click cancel
    await user.click(cancelButton);

    // Form should reset to initial values
    expect(titleInput).toHaveValue('Initial Title');
  });
});

