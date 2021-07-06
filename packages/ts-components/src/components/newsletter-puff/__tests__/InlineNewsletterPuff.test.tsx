import React from 'react';

import { delay } from '@times-components/test-utils';

import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import { MockedProvider } from '@times-components/provider-test-tools';

import mockDate from 'mockdate';

import {
  getNewsletter,
  subscribeNewsletter
} from '@times-components/provider-queries';
import { InlineNewsletterPuff } from '../InlineNewsletterPuff';
import { TrackingContextProvider } from '../../../helpers/tracking/TrackingContextProvider';

import FakeIntersectionObserver from '../../../test-utils/FakeIntersectionObserver';

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
    },
    {
      delay: 50,
      request: {
        query: subscribeNewsletter,
        variables: {
          code: 'TNL-119'
        }
      },
      result: {
        data: {
          subscribeNewsletter: {
            id: 'a2l6E000000CdHzQAK',
            isSubscribed: true,
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

            label: 'STRAIGHT IN YOUR INBOX',
            headline: 'Politics. Explained.',
            copy:
              'Sign up to receive our brilliant Red Box newsletter, Matt Chorley`s poke at politics delivered every weekday morning at 8am.',
            imageUri:
              'https://nuk-tnl-deck-prod-static.s3-eu-west-1.amazonaws.com/uploads/2aa9050e6c3d4de682f11a4802ebba96.jpg'
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

  it('renders signup state', async () => {
    const component = renderComponent();
    await component.findByText('Sign up now');
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

  describe('Clicking Subscribe', () => {
    it("renders 'saving' when the button is clicked", async () => {
      const component = renderComponent(() => true);

      const signupButton = await component.findByText('Sign up now');
      fireEvent.click(signupButton);

      expect(component.baseElement).toMatchSnapshot();
      expect(await component.findByText('Saving…')).toBeTruthy();
    });

    it('triggers analytics when subscribed', async () => {
      const analyticsStream = jest.fn();
      const component = renderComponent(analyticsStream);

      const signupButton = await component.findByText('Sign up now');
      fireEvent.click(signupButton);

      await component.findByText('Saving…');

      expect(analyticsStream).toHaveBeenCalledWith({
        action: 'Clicked',
        component: 'ArticleSkeleton',
        object: 'NewsletterPuffButton',
        attrs: {
          article_parent_name: 'RED BOX',
          eventTime: '2021-05-03T00:00:00.000Z',
          event_navigation_action: 'navigation',
          event_navigation_browsing_method: 'click',
          event_navigation_name: 'widget : puff : sign up now'
        }
      });
    });
  });

  describe('Manage preferences ', () => {
    beforeEach(() => {
      mockDate.set(1620000000000);
    });

    afterEach(() => {
      mockDate.reset();
      jest.clearAllMocks();
      cleanup();
    });
    it('renders the success view after subscribing ', async () => {
      const component = renderComponent(() => true);

      const signupButton = await component.findByText('Sign up now');
      fireEvent.click(signupButton);

      expect(
        await component.findByText('Manage preferences here')
      ).toBeTruthy();
      expect(component.baseElement).toMatchSnapshot();
    });

    it('triggers analytics event when manage preferences clicked', async () => {
      const analyticsStream = jest.fn();
      const component = renderComponent(analyticsStream);

      const signupButton = await component.findByText('Sign up now');
      fireEvent.click(signupButton);

      const link = await component.findByText('Manage preferences here');

      analyticsStream.mockClear();

      fireEvent.click(link);
      expect(analyticsStream).toHaveBeenCalledWith({
        action: 'Clicked',
        object: 'NewsletterPuffLink',
        component: 'ArticleSkeleton',
        attrs: {
          article_parent_name: 'RED BOX',
          eventTime: '2021-05-03T00:00:00.000Z',
          event_navigation_action: 'navigation',
          event_navigation_browsing_method: 'click',
          event_navigation_name: 'widget : puff : manage preferences here'
        }
      });
    });
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

    it('sign up now : displayed', async () => {
      const analyticsStream = jest.fn();
      const component = renderComponent(analyticsStream);

      await component.findByText('Sign up now');

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
    it('manage preferences here : displayed', async () => {
      const analyticsStream = jest.fn();
      const component = renderComponent(analyticsStream);

      const signupButton = await component.findByText('Sign up now');
      fireEvent.click(signupButton);

      await component.findByText('Manage preferences here');

      analyticsStream.mockClear();

      FakeIntersectionObserver.intersect();

      expect(analyticsStream).toHaveBeenCalledWith({
        action: 'Scrolled',
        component: 'ArticleSkeleton',
        object: 'NewsletterPuffLink',
        attrs: {
          article_parent_name: 'RED BOX',
          eventTime: '2021-05-03T00:00:00.000Z',
          event_navigation_action: 'navigation',
          event_navigation_browsing_method: 'automated',
          event_navigation_name:
            'widget : puff : manage preferences here : displayed'
        }
      });
    });
  });
});
