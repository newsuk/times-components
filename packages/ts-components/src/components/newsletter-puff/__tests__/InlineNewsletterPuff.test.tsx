import React from 'react';

import { delay } from '@times-components/test-utils';

import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { MockedProvider } from '@times-components/provider-test-tools';

import mockDate from 'mockdate';

import { getNewsletter } from '@times-components/provider-queries';
import { InlineNewsletterPuff } from '../InlineNewsletterPuff';
import { TrackingContextProvider } from '../../../helpers/tracking/TrackingContextProvider';
import { useFetch } from '../../../helpers/fetch/FetchProvider';

import FakeIntersectionObserver from '../../../test-utils/FakeIntersectionObserver';

jest.mock('../../../helpers/fetch/FetchProvider', () => ({
  ...jest.requireActual('../../../helpers/fetch/FetchProvider'),
  useFetch: jest.fn()
}));

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

  it('renders signup state', async () => {
    (useFetch as jest.Mock).mockReturnValue({ data: { isSubscribed: false } });

    const component = renderComponent();
    await component.findAllByText('Sign up with one click');
    expect(component.baseElement).toMatchSnapshot();
  });

  it('renders loading state state', async () => {
    (useFetch as jest.Mock).mockReturnValue({ data: { isSubscribed: false } });

    const component = renderComponent();
    const oneClickSignUp = await component.findAllByText(
      'Sign up with one click'
    );

    fireEvent.click(oneClickSignUp[0]);
    expect(component.baseElement).toMatchSnapshot();
  });

  it('renders signup view when not already subscribed', async () => {
    const component = renderComponent();

    await delay(0);

    expect(component.baseElement).toMatchSnapshot();
  });

  describe('intersectionObserverTests', () => {
    let oldIntersectionObserver: typeof IntersectionObserver;
    beforeEach(() => {
      oldIntersectionObserver = window.IntersectionObserver;
      // @ts-ignore
      window.IntersectionObserver = FakeIntersectionObserver;
    });

    afterEach(() => {
      window.IntersectionObserver = oldIntersectionObserver;
    });

    it('Sign up with one click : displayed', async () => {
      const analyticsStream = jest.fn();
      (useFetch as jest.Mock).mockReturnValue({
        data: { isSubscribed: false }
      });
      const component = renderComponent(analyticsStream);

      await component.findAllByText('Sign up with one click');

      FakeIntersectionObserver.intersect();

      expect(analyticsStream).toHaveBeenCalledWith({
        action: 'Scrolled',
        component: 'ArticleSkeleton',
        object: 'NewsletterPuffButton',
        attrs: {
          article_parent_name: 'RED BOX',
          eventTime: '2021-05-03T00:00:00.000Z',
          event_navigation_action: 'navigation',
          event_navigation_browsing_method: 'automated',
          event_navigation_name: 'widget : puff : sign up now : displayed'
        }
      });
    });
  });
});
