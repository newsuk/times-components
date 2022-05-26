import React from 'react';
import { render } from '@testing-library/react';

import { MockedProvider } from '@times-components/provider-test-tools';

import { mockArticles } from '../fixtures/articles';
import { mockQueries } from '../fixtures/queries';

import { RecommendedArticles } from '../RecommendedArticles';

describe('<RecommendedArticles>', () => {
  it('should render 1 article correctly', async () => {
    const { asFragment, findByText } = render(
      <MockedProvider mocks={mockQueries(mockArticles.slice(0, 1))}>
        <RecommendedArticles
          articleId="94a01926-719a-11ec-aacf-0736e08b15cd"
          section="News"
          isVisible
          analyticsStream={() => ({})}
        />
      </MockedProvider>
    );

    await findByText("Today's News");
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render 2 article correctly', async () => {
    const { asFragment, findByText } = render(
      <MockedProvider mocks={mockQueries(mockArticles.slice(0, 2))}>
        <RecommendedArticles
          articleId="94a01926-719a-11ec-aacf-0736e08b15cd"
          section="Business"
          isVisible
          analyticsStream={() => ({})}
        />
      </MockedProvider>
    );

    await findByText("Today's Business");
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render 3 article correctly', async () => {
    const { asFragment, findByText } = render(
      <MockedProvider mocks={mockQueries(mockArticles.slice(0, 3))}>
        <RecommendedArticles
          articleId="94a01926-719a-11ec-aacf-0736e08b15cd"
          section="Sport"
          analyticsStream={() => ({})}
        />
      </MockedProvider>
    );

    await findByText("Today's Sport");
    expect(asFragment()).toMatchSnapshot();
  });
});
