import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SideMenuLayout from './index';

describe('SideMenuLayout Component', () => {
  it('renders children correctly', () => {
    render(
      <SideMenuLayout>
        <div>Test Content</div>
      </SideMenuLayout>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders sidebar with menu title', () => {
    render(
      <SideMenuLayout>
        <div>Content</div>
      </SideMenuLayout>
    );

    expect(screen.getByText('Menu')).toBeInTheDocument();
  });

  it('renders toggle button', () => {
    render(
      <SideMenuLayout>
        <div>Content</div>
      </SideMenuLayout>
    );

    const toggleButton = screen.getByLabelText('Toggle menu');
    expect(toggleButton).toBeInTheDocument();
  });

  it('shows menu as open by default', () => {
    render(
      <SideMenuLayout>
        <div>Content</div>
      </SideMenuLayout>
    );

    const toggleButton = screen.getByLabelText('Toggle menu');
    expect(toggleButton).toHaveTextContent('←');
  });

  it('toggles menu when button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <SideMenuLayout>
        <div>Content</div>
      </SideMenuLayout>
    );

    const toggleButton = screen.getByLabelText('Toggle menu');
    
    // Initially open (shows ←)
    expect(toggleButton).toHaveTextContent('←');

    // Click to close
    await user.click(toggleButton);
    expect(toggleButton).toHaveTextContent('→');

    // Click to open again
    await user.click(toggleButton);
    expect(toggleButton).toHaveTextContent('←');
  });

  it('renders navigation links', () => {
    render(
      <SideMenuLayout>
        <div>Content</div>
      </SideMenuLayout>
    );

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Prompt')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('renders navigation items as links', () => {
    render(
      <SideMenuLayout>
        <div>Content</div>
      </SideMenuLayout>
    );

    const dashboardLink = screen.getByText('Dashboard').closest('a');
    const promptLink = screen.getByText('Prompt').closest('a');
    const settingsLink = screen.getByText('Settings').closest('a');

    expect(dashboardLink).toBeInTheDocument();
    expect(promptLink).toBeInTheDocument();
    expect(settingsLink).toBeInTheDocument();
  });

  it('has correct structure with sidebar and main', () => {
    render(
      <SideMenuLayout>
        <div>Content</div>
      </SideMenuLayout>
    );

    // Verify both sidebar content and main content are rendered
    expect(screen.getByText('Menu')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('renders complex children', () => {
    render(
      <SideMenuLayout>
        <div>
          <h1>Page Title</h1>
          <p>Page content goes here</p>
        </div>
      </SideMenuLayout>
    );

    expect(screen.getByText('Page Title')).toBeInTheDocument();
    expect(screen.getByText('Page content goes here')).toBeInTheDocument();
  });
});

