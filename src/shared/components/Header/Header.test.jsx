  import { describe, it, expect, vi } from 'vitest';
  import { render, screen } from '@testing-library/react';
  import userEvent from '@testing-library/user-event';
  import Header from './index';

  describe('Header Component', () => {
    it('renders brand name', () => {
      render(<Header onNewPrompt={() => {}} />);
      expect(screen.getByText('Prompt Genius')).toBeInTheDocument();
    });

    it('renders icon', () => {
      render(<Header onNewPrompt={() => {}} />);
      expect(screen.getByText('◆')).toBeInTheDocument();
    });

    it('renders New Prompt button', () => {
      render(<Header onNewPrompt={() => {}} />);
      expect(screen.getByRole('button', { name: /new prompt/i })).toBeInTheDocument();
    });

    it('renders plus icon in button', () => {
      render(<Header onNewPrompt={() => {}} />);
      expect(screen.getByText('+')).toBeInTheDocument();
    });

    it('calls onNewPrompt when button is clicked', async () => {
      const user = userEvent.setup();
      const handleNewPrompt = vi.fn();

      render(<Header onNewPrompt={handleNewPrompt} />);

      const button = screen.getByRole('button', { name: /new prompt/i });
      await user.click(button);

      expect(handleNewPrompt).toHaveBeenCalledTimes(1);
    });

    it('renders avatar element', () => {
      const { container } = render(<Header onNewPrompt={() => {}} />);
      const avatar = container.querySelector('[class*="avatar"]');
      expect(avatar).toBeInTheDocument();
    });

    it('has correct structure with left and right sections', () => {
      const { container } = render(<Header onNewPrompt={() => {}} />);
      const leftSection = container.querySelector('[class*="leftSection"]');
      const rightSection = container.querySelector('[class*="rightSection"]');
      
      expect(leftSection).toBeInTheDocument();
      expect(rightSection).toBeInTheDocument();
    });
  });

