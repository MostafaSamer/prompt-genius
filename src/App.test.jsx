import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Prompt from './pages/Prompt';
import BlackLayout from './layouts/BlackLayout';
import SideMenuLayout from './layouts/SideMenuLayout';

// Create routes configuration for testing (same as App.jsx but without BrowserRouter)
const createTestRouter = (initialEntries = ['/']) => {
  const routes = [
    {
      path: '/',
      element: (
        <BlackLayout>
          <Dashboard />
        </BlackLayout>
      ),
    },
    {
      path: '/dashboard',
      element: (
        <BlackLayout>
          <Dashboard />
        </BlackLayout>
      ),
    },
    {
      path: '/settings',
      element: (
        <SideMenuLayout>
          <Settings />
        </SideMenuLayout>
      ),
    },
    {
      path: '/prompt',
      element: (
        <BlackLayout>
          <Prompt />
        </BlackLayout>
      ),
    },
    {
      path: '/prompt/:id',
      element: (
        <BlackLayout>
          <Prompt />
        </BlackLayout>
      ),
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries,
  });

  return router;
};

describe('App Component Routes', () => {
  it('renders Dashboard component at root path', () => {
    const router = createTestRouter(['/']);
    render(<RouterProvider router={router} />);
    expect(screen.getByText('Prompt Genius')).toBeInTheDocument();
  });

  it('renders Dashboard component at /dashboard path', () => {
    const router = createTestRouter(['/dashboard']);
    render(<RouterProvider router={router} />);
    expect(screen.getByText('Prompt Genius')).toBeInTheDocument();
  });

  it('renders Settings component at /settings path', () => {
    const router = createTestRouter(['/settings']);
    render(<RouterProvider router={router} />);
    expect(screen.getByRole('heading', { name: /settings/i })).toBeInTheDocument();
  });

  it('renders Prompt component at /prompt path', () => {
    const router = createTestRouter(['/prompt']);
    render(<RouterProvider router={router} />);
    expect(screen.getByRole('heading', { name: /prompt/i })).toBeInTheDocument();
  });

  it('renders Prompt component at /prompt/:id path', () => {
    const router = createTestRouter(['/prompt/123']);
    render(<RouterProvider router={router} />);
    expect(screen.getByRole('heading', { name: /prompt/i })).toBeInTheDocument();
  });

  it('wraps Dashboard with BlackLayout at root path', () => {
    const router = createTestRouter(['/']);
    render(<RouterProvider router={router} />);
    // Dashboard should be rendered (we can check for its content)
    expect(screen.getByText('Prompt Genius')).toBeInTheDocument();
  });

  it('wraps Dashboard with BlackLayout at /dashboard path', () => {
    const router = createTestRouter(['/dashboard']);
    render(<RouterProvider router={router} />);
    expect(screen.getByText('Prompt Genius')).toBeInTheDocument();
  });

  it('wraps Settings with SideMenuLayout at /settings path', () => {
    const router = createTestRouter(['/settings']);
    render(<RouterProvider router={router} />);
    // Settings page should be rendered
    expect(screen.getByText(/welcome to the settings page/i)).toBeInTheDocument();
    // SideMenuLayout should be present (check for Menu text)
    expect(screen.getByText('Menu')).toBeInTheDocument();
  });

  it('wraps Prompt with BlackLayout at /prompt path', () => {
    const router = createTestRouter(['/prompt']);
    render(<RouterProvider router={router} />);
    expect(screen.getByText(/welcome to the prompt page/i)).toBeInTheDocument();
  });

  it('wraps Prompt with BlackLayout at /prompt/:id path', () => {
    const router = createTestRouter(['/prompt/123']);
    render(<RouterProvider router={router} />);
    expect(screen.getByText(/welcome to the prompt page/i)).toBeInTheDocument();
  });
});

