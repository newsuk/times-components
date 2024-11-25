import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Youtube } from '../YoutubeComponent';

describe('Youtube Component', () => {
  const youtubeUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ';

  it('renders the YouTube iframe with the correct attributes', () => {
    render(<Youtube url={youtubeUrl} />);

    // Get the iframe element
    const iframe = screen.getByTitle('YouTube video player');

    // Check if the iframe is rendered
    expect(iframe).toBeInTheDocument();

    // Check if the iframe has the correct attributes
    expect(iframe).toHaveAttribute('src', youtubeUrl);
    expect(iframe).toHaveAttribute('width', '560');
    expect(iframe).toHaveAttribute('height', '315');
    expect(iframe).toHaveAttribute(
      'allow',
      'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
    );
  });
});
