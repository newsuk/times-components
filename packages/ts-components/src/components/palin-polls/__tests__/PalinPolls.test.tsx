import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { PalinPolls } from '../PalinPolls';
import '@testing-library/jest-dom';

describe('PalinPolls component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = ''; // Clean up DOM
  });

  it('should return null if source is empty', () => {
    const { container } = render(<PalinPolls source="" />);
    expect(container.firstChild).toBeNull();
  });

  it('should render the poll-parent div when source is provided', () => {
    const mockHtml = btoa(
      `<script src="https://example.com/script.js"></script>`
    );
    render(<PalinPolls source={mockHtml} />);
    expect(screen.getByTestId('poll-parent')).toBeInTheDocument();
  });

  it('should append a script tag with correct src to #poll-parent', async () => {
  const scriptSrc = 'https://example.com/poll.js';
  const encoded = btoa(`<script src="${scriptSrc}"></script>`);

  render(<PalinPolls source={encoded} />);

  await waitFor(() => {
    const parent = document.getElementById('poll-parent');
    expect(parent).not.toBeNull();

    const scripts = parent ? Array.from(parent.getElementsByTagName('script')) : [];

    // Look for a script with the correct src
    const targetScript = scripts.find(script => script.getAttribute('src') === scriptSrc);
    expect(targetScript).toBeDefined();
  });
});

  it('should not append a script if script tag is missing', async () => {
    const badEncoded = btoa(`<div>No script tag</div>`);
    render(<PalinPolls source={badEncoded} />);

    await waitFor(() => {
      const parent = document.getElementById('poll-parent');
      expect(parent).not.toBeNull();

      const scripts = parent ? parent.getElementsByTagName('script') : [];
      expect(scripts.length).toBe(0);
    });
  });
});
