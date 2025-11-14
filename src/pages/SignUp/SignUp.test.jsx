import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import SignUp from './index';
import BlackLayout from '../../layouts/BlackLayout';

// Mock useNavigate
const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Helper to render SignUp with router
const renderWithRouter = (initialEntries = ['/sign-up']) => {
  const router = createMemoryRouter(
    [
      {
        path: '/sign-up',
        element: (
          <BlackLayout>
            <SignUp />
          </BlackLayout>
        ),
      },
      {
        path: '/sign-in',
        element: <div>Sign In Page</div>,
      },
      {
        path: '/',
        element: <div>Home Page</div>,
      },
    ],
    {
      initialEntries,
    }
  );

  return render(<RouterProvider router={router} />);
};

describe('SignUp Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders sign up form with title and subtitle', () => {
    renderWithRouter();

    expect(screen.getByText('Sign Up')).toBeInTheDocument();
    expect(screen.getByText(/create your account/i)).toBeInTheDocument();
  });

  it('renders name, email, password, and confirm password input fields', () => {
    renderWithRouter();

    expect(screen.getByLabelText(/^name$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
  });

  it('renders sign up button', () => {
    renderWithRouter();

    const signUpButton = screen.getByRole('button', { name: /sign up/i });
    expect(signUpButton).toBeInTheDocument();
  });

  it('renders link to sign in page', () => {
    renderWithRouter();

    expect(screen.getByText(/already have an account/i)).toBeInTheDocument();
    const signInLink = screen.getByRole('link', { name: /sign in/i });
    expect(signInLink).toBeInTheDocument();
    expect(signInLink).toHaveAttribute('href', '/sign-in');
  });

  it('calls onSubmit with form data when form is submitted with valid matching passwords', async () => {
    const user = userEvent.setup();
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    renderWithRouter();

    const nameInput = screen.getByLabelText(/^name$/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    const submitButton = screen.getByRole('button', { name: /sign up/i });

    await user.type(nameInput, 'Test User');
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.type(confirmPasswordInput, 'password123');
    await user.click(submitButton);

    expect(consoleSpy).toHaveBeenCalledWith('Sign up:', {
      email: 'test@example.com',
      password: 'password123',
    });

    consoleSpy.mockRestore();
  });

  it('prevents submission when required fields are empty', async () => {
    const user = userEvent.setup();
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    renderWithRouter();

    const submitButton = screen.getByRole('button', { name: /sign up/i });
    await user.click(submitButton);

    // Validation should prevent submission
    expect(consoleSpy).not.toHaveBeenCalled();
    // The form should still be visible (not submitted)
    expect(submitButton).toBeInTheDocument();

    consoleSpy.mockRestore();
  });

  it('displays error message when passwords do not match', async () => {
    const user = userEvent.setup();
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    renderWithRouter();

    const nameInput = screen.getByLabelText(/^name$/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    const submitButton = screen.getByRole('button', { name: /sign up/i });

    await user.type(nameInput, 'Test User');
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.type(confirmPasswordInput, 'differentpassword');
    await user.click(submitButton);

    // Should display error message
    expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
    // Should not submit
    expect(consoleSpy).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  it('prevents submission when passwords do not match', async () => {
    const user = userEvent.setup();
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    renderWithRouter();

    const nameInput = screen.getByLabelText(/^name$/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    const submitButton = screen.getByRole('button', { name: /sign up/i });

    await user.type(nameInput, 'Test User');
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.type(confirmPasswordInput, 'password456');
    await user.click(submitButton);

    expect(consoleSpy).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  it('navigates to sign in page when sign in link is clicked', async () => {
    const user = userEvent.setup();

    renderWithRouter();

    const signInLink = screen.getByRole('link', { name: /sign in/i });
    await user.click(signInLink);

    expect(mockNavigate).toHaveBeenCalledWith('/sign-in');
  });

  it('updates form fields when user types', async () => {
    const user = userEvent.setup();

    renderWithRouter();

    const nameInput = screen.getByLabelText(/^name$/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);

    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'user@example.com');
    await user.type(passwordInput, 'mypassword');
    await user.type(confirmPasswordInput, 'mypassword');

    expect(nameInput).toHaveValue('John Doe');
    expect(emailInput).toHaveValue('user@example.com');
    expect(passwordInput).toHaveValue('mypassword');
    expect(confirmPasswordInput).toHaveValue('mypassword');
  });

  it('clears password mismatch error when passwords match', async () => {
    const user = userEvent.setup();
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    renderWithRouter();

    const nameInput = screen.getByLabelText(/^name$/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    const submitButton = screen.getByRole('button', { name: /sign up/i });

    // First, submit with mismatched passwords
    await user.type(nameInput, 'Test User');
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.type(confirmPasswordInput, 'different');
    await user.click(submitButton);

    // Should show error
    expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();

    // Fix the password to match
    await user.clear(confirmPasswordInput);
    await user.type(confirmPasswordInput, 'password123');

    // Error should be cleared when we submit again
    await user.click(submitButton);
    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  it('has correct input types', () => {
    renderWithRouter();

    const nameInput = screen.getByLabelText(/^name$/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);

    expect(nameInput).toHaveAttribute('type', 'text');
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(passwordInput).toHaveAttribute('type', 'password');
    expect(confirmPasswordInput).toHaveAttribute('type', 'password');
  });

  it('displays placeholders for input fields', () => {
    renderWithRouter();

    expect(screen.getByPlaceholderText(/enter your name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your password/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/confirm your password/i)).toBeInTheDocument();
  });

  it('has required attributes on required fields', () => {
    renderWithRouter();

    const nameInput = screen.getByLabelText(/^name$/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);

    expect(nameInput).toHaveAttribute('required');
    expect(emailInput).toHaveAttribute('required');
    expect(passwordInput).toHaveAttribute('required');
    expect(confirmPasswordInput).toHaveAttribute('required');
  });

  it('has correct structure with container and form elements', () => {
    const { container } = renderWithRouter();

    const signUpContainer = container.querySelector('[class*="signUpContainer"]');
    const form = container.querySelector('form');
    const footer = container.querySelector('[class*="footer"]');

    expect(signUpContainer).toBeInTheDocument();
    expect(form).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
  });

  it('submits successfully when all fields are filled and passwords match', async () => {
    const user = userEvent.setup();
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    renderWithRouter();

    const nameInput = screen.getByLabelText(/^name$/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    const submitButton = screen.getByRole('button', { name: /sign up/i });

    await user.type(nameInput, 'New User');
    await user.type(emailInput, 'newuser@example.com');
    await user.type(passwordInput, 'securepassword');
    await user.type(confirmPasswordInput, 'securepassword');
    await user.click(submitButton);

    expect(consoleSpy).toHaveBeenCalledWith('Sign up:', {
      email: 'newuser@example.com',
      password: 'securepassword',
    });

    consoleSpy.mockRestore();
  });
});

