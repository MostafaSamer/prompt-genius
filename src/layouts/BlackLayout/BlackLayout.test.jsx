import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import BlackLayout from './index';

describe('BlackLayout Component', () => {
  it('renders children correctly', () => {
    render(
      <BlackLayout>
        <div>Test Content</div>
      </BlackLayout>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders multiple children', () => {
    render(
      <BlackLayout>
        <div>First Child</div>
        <div>Second Child</div>
      </BlackLayout>
    );

    expect(screen.getByText('First Child')).toBeInTheDocument();
    expect(screen.getByText('Second Child')).toBeInTheDocument();
  });

  it('renders complex children', () => {
    render(
      <BlackLayout>
        <div>
          <h1>Title</h1>
          <p>Paragraph</p>
        </div>
      </BlackLayout>
    );

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Paragraph')).toBeInTheDocument();
  });

  it('has correct layout structure', () => {
    const { container } = render(
      <BlackLayout>
        <div>Content</div>
      </BlackLayout>
    );

    // Verify the component renders without errors
    expect(container.firstChild).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('renders empty children without errors', () => {
    const { container } = render(<BlackLayout>{null}</BlackLayout>);
    expect(container).toBeInTheDocument();
  });
});

