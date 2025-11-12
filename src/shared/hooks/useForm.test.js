import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useForm from './useForm';

describe('useForm Hook', () => {
  const mockInputs = [
    {
      name: 'title',
      label: 'Title',
      required: true,
    },
    {
      name: 'description',
      label: 'Description',
      required: false,
    },
  ];

  it('initializes with empty form data when no initial values provided', () => {
    const { result } = renderHook(() =>
      useForm({
        inputs: mockInputs,
        onSubmit: () => {},
      })
    );

    expect(result.current.formData).toEqual({});
    expect(result.current.errors).toEqual({});
  });

  it('initializes with provided initial values', () => {
    const initialValues = {
      title: 'Initial Title',
      description: 'Initial Description',
    };

    const { result } = renderHook(() =>
      useForm({
        inputs: mockInputs,
        initialValues,
        onSubmit: () => {},
      })
    );

    expect(result.current.formData).toEqual(initialValues);
  });

  it('updates form data when handleChange is called', () => {
    const { result } = renderHook(() =>
      useForm({
        inputs: mockInputs,
        onSubmit: () => {},
      })
    );

    act(() => {
      result.current.handleChange({
        target: { name: 'title', value: 'New Title' },
      });
    });

    expect(result.current.formData.title).toBe('New Title');
  });

  it('updates multiple fields correctly', () => {
    const { result } = renderHook(() =>
      useForm({
        inputs: mockInputs,
        onSubmit: () => {},
      })
    );

    act(() => {
      result.current.handleChange({
        target: { name: 'title', value: 'Title Value' },
      });
    });

    act(() => {
      result.current.handleChange({
        target: { name: 'description', value: 'Description Value' },
      });
    });

    expect(result.current.formData).toEqual({
      title: 'Title Value',
      description: 'Description Value',
    });
  });

  it('clears error when user starts typing in a field with error', () => {
    const { result } = renderHook(() =>
      useForm({
        inputs: mockInputs,
        onSubmit: () => {},
      })
    );

    // First, set an error by submitting empty form
    act(() => {
      result.current.handleSubmit({
        preventDefault: () => {},
      });
    });

    expect(result.current.errors.title).toBeTruthy();

    // Then, start typing to clear the error
    act(() => {
      result.current.handleChange({
        target: { name: 'title', value: 'T' },
      });
    });

    expect(result.current.errors.title).toBe('');
  });

  it('validates required fields on submit', () => {
    const onSubmit = vi.fn();
    const { result } = renderHook(() =>
      useForm({
        inputs: mockInputs,
        onSubmit,
      })
    );

    act(() => {
      result.current.handleSubmit({
        preventDefault: () => {},
      });
    });

    expect(result.current.errors.title).toBeTruthy();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('does not validate non-required fields', () => {
    const onSubmit = vi.fn();
    const { result } = renderHook(() =>
      useForm({
        inputs: mockInputs,
        onSubmit,
      })
    );

    act(() => {
      result.current.handleChange({
        target: { name: 'title', value: 'Title' },
      });
    });

    act(() => {
      result.current.handleSubmit({
        preventDefault: () => {},
      });
    });

    expect(result.current.errors.description).toBeUndefined();
    expect(onSubmit).toHaveBeenCalled();
  });

  it('validates that required fields are not empty strings', () => {
    const onSubmit = vi.fn();
    const { result } = renderHook(() =>
      useForm({
        inputs: mockInputs,
        onSubmit,
      })
    );

    act(() => {
      result.current.handleChange({
        target: { name: 'title', value: '   ' },
      });
    });

    act(() => {
      result.current.handleSubmit({
        preventDefault: () => {},
      });
    });

    expect(result.current.errors.title).toBeTruthy();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('calls onSubmit with form data when validation passes', () => {
    const onSubmit = vi.fn();
    const { result } = renderHook(() =>
      useForm({
        inputs: mockInputs,
        onSubmit,
      })
    );

    act(() => {
      result.current.handleChange({
        target: { name: 'title', value: 'Valid Title' },
      });
    });

    act(() => {
      result.current.handleSubmit({
        preventDefault: () => {},
      });
    });

    expect(onSubmit).toHaveBeenCalledWith({
      title: 'Valid Title',
    });
  });

  it('prevents default form submission behavior', () => {
    const onSubmit = vi.fn();
    const preventDefault = vi.fn();
    const { result } = renderHook(() =>
      useForm({
        inputs: mockInputs,
        onSubmit,
      })
    );

    act(() => {
      result.current.handleChange({
        target: { name: 'title', value: 'Title' },
      });
    });

    act(() => {
      result.current.handleSubmit({
        preventDefault,
      });
    });

    expect(preventDefault).toHaveBeenCalled();
  });

  it('uses custom validation message when provided', () => {
    const customInputs = [
      {
        name: 'title',
        label: 'Title',
        required: true,
        validationMessage: 'Custom error message',
      },
    ];

    const onSubmit = vi.fn();
    const { result } = renderHook(() =>
      useForm({
        inputs: customInputs,
        onSubmit,
      })
    );

    act(() => {
      result.current.handleSubmit({
        preventDefault: () => {},
      });
    });

    expect(result.current.errors.title).toBe('Custom error message');
  });

  it('uses default validation message when custom message not provided', () => {
    const onSubmit = vi.fn();
    const { result } = renderHook(() =>
      useForm({
        inputs: mockInputs,
        onSubmit,
      })
    );

    act(() => {
      result.current.handleSubmit({
        preventDefault: () => {},
      });
    });

    expect(result.current.errors.title).toBe('Title is required');
  });

  it('resets form to initial values when handleCancel is called', () => {
    const initialValues = {
      title: 'Initial Title',
      description: 'Initial Description',
    };

    const { result } = renderHook(() =>
      useForm({
        inputs: mockInputs,
        initialValues,
        onSubmit: () => {},
      })
    );

    // Change values
    act(() => {
      result.current.handleChange({
        target: { name: 'title', value: 'Changed Title' },
      });
    });

    expect(result.current.formData.title).toBe('Changed Title');

    // Cancel
    act(() => {
      result.current.handleCancel();
    });

    expect(result.current.formData).toEqual(initialValues);
    expect(result.current.errors).toEqual({});
  });

  it('calls onCancel callback when handleCancel is called', () => {
    const onCancel = vi.fn();
    const { result } = renderHook(() =>
      useForm({
        inputs: mockInputs,
        onSubmit: () => {},
        onCancel,
      })
    );

    act(() => {
      result.current.handleCancel();
    });

    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('does not throw error when onCancel is not provided', () => {
    const { result } = renderHook(() =>
      useForm({
        inputs: mockInputs,
        onSubmit: () => {},
      })
    );

    expect(() => {
      act(() => {
        result.current.handleCancel();
      });
    }).not.toThrow();
  });

  it('handles empty inputs array', () => {
    const onSubmit = vi.fn();
    const { result } = renderHook(() =>
      useForm({
        inputs: [],
        onSubmit,
      })
    );

    act(() => {
      result.current.handleSubmit({
        preventDefault: () => {},
      });
    });

    expect(result.current.errors).toEqual({});
    expect(onSubmit).toHaveBeenCalled();
  });

  it('allows manual form data updates via setFormData', () => {
    const { result } = renderHook(() =>
      useForm({
        inputs: mockInputs,
        onSubmit: () => {},
      })
    );

    act(() => {
      result.current.setFormData({ title: 'Manual Update' });
    });

    expect(result.current.formData).toEqual({ title: 'Manual Update' });
  });

  it('allows manual error updates via setErrors', () => {
    const { result } = renderHook(() =>
      useForm({
        inputs: mockInputs,
        onSubmit: () => {},
      })
    );

    act(() => {
      result.current.setErrors({ title: 'Manual Error' });
    });

    expect(result.current.errors).toEqual({ title: 'Manual Error' });
  });

  it('maintains previous form data when updating a single field', () => {
    const initialValues = {
      title: 'Initial Title',
      description: 'Initial Description',
    };

    const { result } = renderHook(() =>
      useForm({
        inputs: mockInputs,
        initialValues,
        onSubmit: () => {},
      })
    );

    act(() => {
      result.current.handleChange({
        target: { name: 'title', value: 'Updated Title' },
      });
    });

    expect(result.current.formData).toEqual({
      title: 'Updated Title',
      description: 'Initial Description',
    });
  });
});

