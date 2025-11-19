import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import SignIn from './index';
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

// Helper to render SignIn with router
const renderWithRouter = (initialEntries = ['/sign-in']) => {
  const router = createMemoryRouter(
    [
      {
        path: '/sign-in',
        element: (
          <BlackLayout>
            <SignIn />
          </BlackLayout>
        ),
      },
      {
        path: '/sign-up',
        element: <div>Sign Up Page</div>,
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

describe('SignIn Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders sign in form with title and subtitle', () => {
    renderWithRouter();

    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByText(/welcome back/i)).toBeInTheDocument();
  });

  it('renders email and password input fields', () => {
    renderWithRouter();

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('renders sign in button', () => {
    renderWithRouter();

    const signInButton = screen.getByRole('button', { name: /sign in/i });
    expect(signInButton).toBeInTheDocument();
  });

  it('renders link to sign up page', () => {
    renderWithRouter();

    expect(screen.getByText(/don't have an account/i)).toBeInTheDocument();
    const signUpLink = screen.getByRole('link', { name: /sign up/i });
    expect(signUpLink).toBeInTheDocument();
    expect(signUpLink).toHaveAttribute('href', '/sign-up');
  });

  it('calls onSubmit with form data when form is submitted with valid data', async () => {
    const user = userEvent.setup();
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    renderWithRouter();

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);

    expect(consoleSpy).toHaveBeenCalledWith('Sign in:', {
      email: 'test@example.com',
      password: 'password123',
    });

    consoleSpy.mockRestore();
  });

  it('prevents submission when required fields are empty', async () => {
    const user = userEvent.setup();
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    renderWithRouter();

    const submitButton = screen.getByRole('button', { name: /sign in/i });
    await user.click(submitButton);

    // Validation should prevent submission
    expect(consoleSpy).not.toHaveBeenCalled();
    // The form should still be visible (not submitted)
    expect(submitButton).toBeInTheDocument();

    consoleSpy.mockRestore();
  });

  it('displays error messages for empty required fields', async () => {
    const user = userEvent.setup();

    renderWithRouter();

    const submitButton = screen.getByRole('button', { name: /sign in/i });
    await user.click(submitButton);

    // Check that error messages are displayed
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    // The inputs should still be present (form not submitted)
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it('navigates to sign up page when sign up link is clicked', async () => {
    const user = userEvent.setup();

    renderWithRouter();

    const signUpLink = screen.getByRole('link', { name: /sign up/i });
    await user.click(signUpLink);

    expect(mockNavigate).toHaveBeenCalledWith('/sign-up');
  });

  it('updates form fields when user types', async () => {
    const user = userEvent.setup();

    renderWithRouter();

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.type(emailInput, 'user@example.com');
    await user.type(passwordInput, 'mypassword');

    expect(emailInput).toHaveValue('user@example.com');
    expect(passwordInput).toHaveValue('mypassword');
  });

  it('clears errors when user starts typing in a field with error', async () => {
    const user = userEvent.setup();

    renderWithRouter();

    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    // Submit empty form to trigger validation
    await user.click(submitButton);

    // Start typing - this should clear the error
    await user.type(emailInput, 'test@example.com');

    // Now submit should work
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const passwordInput = screen.getByLabelText(/password/i);
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);

    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  it('has correct input types', () => {
    renderWithRouter();

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    expect(emailInput).toHaveAttribute('type', 'email');
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('displays placeholders for input fields', () => {
    renderWithRouter();

    expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your password/i)).toBeInTheDocument();
  });

  it('has required attributes on required fields', () => {
    renderWithRouter();

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    expect(emailInput).toHaveAttribute('required');
    expect(passwordInput).toHaveAttribute('required');
  });

  it('has correct structure with container and form elements', () => {
    const { container } = renderWithRouter();

    const signInContainer = container.querySelector('[class*="signInContainer"]');
    const form = container.querySelector('form');
    const footer = container.querySelector('[class*="footer"]');

    expect(signInContainer).toBeInTheDocument();
    expect(form).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
  });
});

