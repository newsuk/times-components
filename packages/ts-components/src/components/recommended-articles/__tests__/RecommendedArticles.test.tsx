import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { RecommendedArticles } from '../RecommendedArticles';

import { MockedProvider } from '@times-components/provider-test-tools';
import { recommendations } from '@times-components/provider-queries';

const mocks = [
  {
    delay: 1000,
    request: {
      query: recommendations,
      variables: {
        publisher: 'TIMES',
        recomArgs: {
          userId: '1234',
          articleId: '94a01926-719a-11ec-aacf-0736e08b15cd'
        }
      }
    },
    result: {
      data: {
        recommendations: {
          __typename: 'Recommendations',
          leadAsset: 'null',
          articles: [
            {
              __typename: 'UniversalArticle',
              headline:
                'Whole world is against us, says top Russian strategist',
              id: 'a9ffb7cc-d5d1-11ec-bb99-1bcd45646516',
              media: {
                __typename: 'Image'
              },
              slug:
                'were-no-match-for-ukrainian-grit-and-firepower-says-retired-russian-colonel',
              url:
                'https://www.staging-thetimes.co.uk/article/were-no-match-for-ukrainian-grit-and-firepower-says-retired-russian-colonel-lhnvsfj33'
            },
            {
              __typename: 'UniversalArticle',
              headline: 'Vardys leave court with swipe at Wayne Rooney',
              id: 'f3d730a0-d5c2-11ec-8585-951ab3afb4d2',
              media: {
                __typename: 'Image'
              },
              slug:
                'wayne-rooney-to-give-evidence-in-wagatha-christie-trial-as-jamie-vardy-attends-court-for-first-time',
              url:
                'https://www.staging-thetimes.co.uk/article/wayne-rooney-to-give-evidence-in-wagatha-christie-trial-as-jamie-vardy-attends-court-for-first-time-wlzvxklc6'
            }
          ]
        }
      }
    }
  }
];

describe('Recommended Articles', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('it renders', () => {
    const { asFragment } = render(
      <MockedProvider mocks={mocks}>
        <RecommendedArticles
          articleId="94a01926-719a-11ec-aacf-0736e08b15cd"
          section="News"
          analyticsStream={jest.fn()}
        />
      </MockedProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('degrades gracefully', () => {
    const { asFragment } = render(
      <MockedProvider mocks={mocks}>
        <RecommendedArticles
          articleId=""
          section="News"
          analyticsStream={jest.fn()}
        />
      </MockedProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
