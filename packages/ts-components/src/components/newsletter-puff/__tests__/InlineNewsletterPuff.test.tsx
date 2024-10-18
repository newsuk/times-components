import React from 'react';

import { delay } from '@times-components/test-utils';

import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import { MockedProvider } from '@times-components/provider-test-tools';

import mockDate from 'mockdate';

import { getNewsletter } from '@times-components/provider-queries';
import { InlineNewsletterPuff } from '../InlineNewsletterPuff';
import { TrackingContextProvider } from '../../../helpers/tracking/TrackingContextProvider';

const renderComponent = (
  analyticsStream?: () => void,
  mocks: any[] = [
    {
      request: {
        query: getNewsletter,
        variables: {
          code: 'TNL-119'
        }
      },
      result: {
        data: {
          newsletter: {
            id: 'a2l6E000000CdHzQAK',
            isSubscribed: false,
            title: 'RED BOX',
            __typename: 'Newsletter'
          }
        }
      }
    }
  ]
) =>
  render(
    <MockedProvider mocks={mocks}>
      <TrackingContextProvider
        analyticsStream={analyticsStream}
        context={{ component: 'ArticleSkeleton' }}
      >
        <InlineNewsletterPuff
          {...{
            code: 'TNL-119',
            section: 'news',
            headline: 'Politics. Explained.',
            copy:
              'Sign up to receive our brilliant Red Box newsletter, Matt Chorley`s poke at politics delivered every weekday morning at 8am.'
          }}
        />
      </TrackingContextProvider>
    </MockedProvider>
  );

describe('Inline Newsletter Puff', () => {
  beforeEach(() => {
    mockDate.set(1620000000000);
  });

  afterEach(() => {
    mockDate.reset();
    jest.clearAllMocks();
    cleanup();
  });

  it('renders placeholder when loading', () => {
    const component = renderComponent();
    expect(component.baseElement).toMatchSnapshot();
  });

  it('renders null when is already subscribed', async () => {
    const component = renderComponent(jest.fn(), [
      {
        request: {
          query: getNewsletter,
          variables: {
            code: 'TNL-119'
          }
        },
        result: {
          data: {
            newsletter: {
              id: 'a2l6E000000CdHzQAK',
              isSubscribed: true,
              title: 'RED BOX',
              __typename: 'Newsletter'
            }
          }
        }
      }
    ]);

    await delay(0);
    expect(component.baseElement).toMatchSnapshot();
  });

  it('renders signup view when not already subscribed', async () => {
    const component = renderComponent();

    await delay(0);

    expect(component.baseElement).toMatchSnapshot();
  });
});
