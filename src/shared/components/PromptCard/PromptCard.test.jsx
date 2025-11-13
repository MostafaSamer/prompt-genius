import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PromptCard from './index';

describe('PromptCard Component', () => {
  const mockProps = {
    title: 'Test Prompt',
    description: 'This is a test prompt description',
    onEdit: vi.fn(),
    onDelete: vi.fn(),
  };

  it('renders title correctly', () => {
    render(<PromptCard {...mockProps} />);
    expect(screen.getByText('Test Prompt')).toBeInTheDocument();
  });

  it('renders description correctly', () => {
    render(<PromptCard {...mockProps} />);
    expect(screen.getByText('This is a test prompt description')).toBeInTheDocument();
  });

  it('renders edit button', () => {
    render(<PromptCard {...mockProps} />);
    expect(screen.getByLabelText('Edit Test Prompt')).toBeInTheDocument();
  });

  it('renders delete button', () => {
    render(<PromptCard {...mockProps} />);
    expect(screen.getByLabelText('Delete Test Prompt')).toBeInTheDocument();
  });

  it('calls onEdit when edit button is clicked', async () => {
    const user = userEvent.setup();
    const handleEdit = vi.fn();
    render(<PromptCard {...mockProps} onEdit={handleEdit} />);

    const editButton = screen.getByLabelText('Edit Test Prompt');
    await user.click(editButton);

    expect(handleEdit).toHaveBeenCalledTimes(1);
  });

  it('calls onDelete when delete button is clicked', async () => {
    const user = userEvent.setup();
    const handleDelete = vi.fn();
    render(<PromptCard {...mockProps} onDelete={handleDelete} />);

    const deleteButton = screen.getByLabelText('Delete Test Prompt');
    await user.click(deleteButton);

    expect(handleDelete).toHaveBeenCalledTimes(1);
  });

  it('renders edit icon', () => {
    render(<PromptCard {...mockProps} />);
    expect(screen.getByText('✏️')).toBeInTheDocument();
  });

  it('renders delete icon', () => {
    render(<PromptCard {...mockProps} />);
    expect(screen.getByText('🗑️')).toBeInTheDocument();
  });

  it('has correct card structure', () => {
    const { container } = render(<PromptCard {...mockProps} />);
    const card = container.querySelector('[class*="promptCard"]');
    const content = container.querySelector('[class*="promptContent"]');
    const actions = container.querySelector('[class*="promptActions"]');

    expect(card).toBeInTheDocument();
    expect(content).toBeInTheDocument();
    expect(actions).toBeInTheDocument();
  });

  it('renders title as heading element', () => {
    render(<PromptCard {...mockProps} />);
    const title = screen.getByRole('heading', { name: 'Test Prompt' });
    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe('H3');
  });

  it('handles empty description', () => {
    const { container } = render(<PromptCard {...mockProps} description="" />);
    const description = container.querySelector('[class*="promptDescription"]');
    expect(description).toBeInTheDocument();
    expect(description.textContent).toBe('');
  });

  it('handles long title and description', () => {
    const longTitle = 'A'.repeat(100);
    const longDescription = 'B'.repeat(200);
    render(
      <PromptCard
        {...mockProps}
        title={longTitle}
        description={longDescription}
      />
    );

    expect(screen.getByText(longTitle)).toBeInTheDocument();
    expect(screen.getByText(longDescription)).toBeInTheDocument();
  });
});

