import React from 'react';
import { render, screen } from '@testing-library/react';
import { ArticleCardsProps, ArticleProps } from '../types';
import { ArticleCard } from '../ArticleCard';

jest.mock('../Card/Card', () => ({
  __esModule: true,
  default: ({
    article,
    sectionTitle,
    isLeadingArticle,
    isLastCard
  }: {
    article: ArticleProps;
    sectionTitle: string;
    isLeadingArticle: boolean;
    isLastCard: boolean;
  }) => (
    <div data-testid="card">
      <h2>{sectionTitle}</h2>
      <p>{article.id}</p>
      <p>{isLeadingArticle ? 'Leading' : ''}</p>
      <p>{isLastCard ? 'Last' : ''}</p>
    </div>
  )
}));

describe('ArticleCard Component', () => {
  const mockElement: ArticleCardsProps['element'] = {
    title: 'Test Title',
    articles: btoa(
      JSON.stringify([
        {
          id: '1',
          headline: 'Headline 1',
          image: { alt: 'Alt Text 1', url: 'https://example.com/image1.jpg' }
        },
        {
          id: '2',
          headline: 'Headline 2',
          image: { alt: 'Alt Text 1', url: 'https://example.com/image1.jpg' }
        }
      ])
    )
  };

  it('renders the correct number of articles', () => {
    render(<ArticleCard element={mockElement} />);
    const cards = screen.getAllByTestId('card');
    expect(cards).toHaveLength(2);
  });
});
