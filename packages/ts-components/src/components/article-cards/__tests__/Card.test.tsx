import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from '../Card/Card';
import { ArticleCardProps } from '../types';
import { tealiumTrackingHandler } from '../utils';

jest.mock('../utils', () => ({
  ...jest.requireActual('../utils'),
  tealiumTrackingHandler: jest.fn()
}));

describe('Card Component', () => {
  const mockProps: ArticleCardProps = {
    article: {
      id: '1',
      url: 'https://example.com',
      headline: 'Test Headline',
      image: { url: 'https://example.com/image.jpg', alt: 'test' },
      summary: 'Test Summary',
      label: ''
    },
    numOfArticles: 3,
    isLastCard: false,
    sectionTitle: '',
    isLeadingArticle: false
  };

  it('renders the article headline and summary', () => {
    render(<Card {...mockProps} />);

    expect(screen.getByText('Test Headline')).toBeInTheDocument();
    expect(screen.getByText('Test Summary')).toBeInTheDocument();
  });

  it('renders the article image with correct src', () => {
    render(<Card {...mockProps} />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute(
      'src',
      'https://example.com/image.jpg?resize=750'
    );
  });

  it('renders the link with correct href', () => {
    render(<Card {...mockProps} />);

    const link = screen.getAllByRole('link')[0];
    expect(link).toHaveAttribute('href', 'https://example.com');
  });

  it('logs the headline when the link is clicked', () => {
    const mockTealiumTrackingHandler = jest.fn();
    (tealiumTrackingHandler as jest.Mock).mockImplementation(
      mockTealiumTrackingHandler
    );

    render(<Card {...mockProps} />);

    const link = screen.getAllByRole('link')[0];
    fireEvent.click(link);

    expect(mockTealiumTrackingHandler).toHaveBeenCalledWith(
      'Test Headline',
      'Test Headline'
    );
  });
});
