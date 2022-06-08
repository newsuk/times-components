import React from 'react';
import { render } from '@testing-library/react';

import { useFetch } from '../../../helpers/fetch/FetchProvider';
import previewData from '../../../fixtures/preview-data/recommended-articles';

import { RecommendedArticles } from '../RecommendedArticles';

jest.mock('@times-components/related-articles', () => 'RelatedArticles');

jest.mock('../../../helpers/fetch/FetchProvider', () => ({
  useFetch: jest.fn()
}));

describe('<RecommendedArticles>', () => {
  it('should render the initial loading state correctly', () => {
    (useFetch as jest.Mock).mockReturnValue({ loading: true });

    const { asFragment } = render(
      <RecommendedArticles section="News" analyticsStream={() => ({})} />
    );

    expect(asFragment().firstChild).toBeNull();
  });

  it('should render the error state correctly', () => {
    (useFetch as jest.Mock).mockReturnValue({ error: 'Some error occurred' });

    const { asFragment } = render(
      <RecommendedArticles section="News" analyticsStream={() => ({})} />
    );

    expect(asFragment().firstChild).toBeNull();
  });

  it('should render RelatedArticles correctly', () => {
    (useFetch as jest.Mock).mockReturnValue({ data: previewData });

    const { container, asFragment } = render(
      <RecommendedArticles
        section="News"
        isVisible
        analyticsStream={() => ({})}
      />
    );

    const related = container.querySelector('relatedarticles') as HTMLElement;
    expect(related.getAttribute('heading')).toEqual("Today's News");

    expect(asFragment()).toMatchSnapshot();
  });
});
