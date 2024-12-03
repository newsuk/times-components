import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Twitter } from '../TwitterComponent';

describe('Twitter Component', () => {
  const twitterUrl = 'https://twitter.com/user/status/1234567890';

  it('renders the Twitter blockquote with the correct URL', () => {
    render(<Twitter url={twitterUrl} />);

    // Find the blockquote using class name or test ID
    const blockquote = screen.getByTestId('twitter-embed');
    expect(blockquote).toHaveClass('twitter-tweet');

    // Check if the anchor tag is rendered with the correct href
    const anchor = blockquote.querySelector('a');
    expect(anchor).toBeInTheDocument();
    expect(anchor).toHaveAttribute('href', twitterUrl);
  });
});
