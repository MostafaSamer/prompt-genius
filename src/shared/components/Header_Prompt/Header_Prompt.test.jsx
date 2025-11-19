import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header_Prompt from './Header_Prompt';

describe('Header_Prompt Component', () => {

  it('renders logo/icon element', () => {
    const { container } = render(<Header_Prompt />);
    const logoIcon = container.querySelector('img, svg, [class*="icon"]');
    expect(logoIcon).toBeInTheDocument();
  });

  it('renders brand name "Prompt Editor"', () => {
    render(<Header_Prompt />);
    expect(screen.getByText(/prompt editor/i)).toBeInTheDocument();
  });

  it('renders navigation links: My Prompts and Settings', () => {
    render(<Header_Prompt />);
    expect(screen.getByText(/my prompts/i)).toBeInTheDocument();
    expect(screen.getByText(/settings/i)).toBeInTheDocument();
  });

  it('renders Copy button', () => {
    render(<Header_Prompt />);
    expect(screen.getByRole('button', { name: /copy/i })).toBeInTheDocument();
  });

  it('renders Generate via AI button', () => {
    render(<Header_Prompt />);
    expect(screen.getByRole('button', { name: /generate via ai/i })).toBeInTheDocument();
  });

  it('renders Copy button icon', () => {
    const { container } = render(<Header_Prompt />);
    const copyIcon = container.querySelector('.copy-btn svg, .copy-btn img');
    expect(copyIcon).toBeInTheDocument();
  });

  it('renders Generate via AI icon', () => {
    const { container } = render(<Header_Prompt />);
    const sparkIcon = container.querySelector('.generate-btn svg, .generate-btn img');
    expect(sparkIcon).toBeInTheDocument();
  });

  it('calls onCopy when Copy button is clicked', async () => {
    const user = userEvent.setup();
    const handleCopy = vi.fn();

    render(<Header_Prompt onCopy={handleCopy} />);

    const btn = screen.getByRole('button', { name: /copy/i });
    await user.click(btn);

    expect(handleCopy).toHaveBeenCalledTimes(1);
  });

  it('calls onGenerate when Generate via AI button is clicked', async () => {
    const user = userEvent.setup();
    const handleGen = vi.fn();

    render(<Header_Prompt/>);

    const btn = screen.getByRole('button', { name: /generate via ai/i });
    await user.click(btn);

    expect(handleGen).toHaveBeenCalledTimes(1);
  });
});
