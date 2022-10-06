import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import mockDate from 'mockdate';
import { NewsletterPuffButton } from '../NewsletterPuffButton';
import { TrackingContextProvider } from '../../../../helpers/tracking/TrackingContextProvider';
import FakeIntersectionObserver from '../../../../test-utils/FakeIntersectionObserver';

describe('NewsletterPuffButton', () => {
  let oldIntersectionObserver: typeof IntersectionObserver;
  beforeEach(() => {
    mockDate.set(1620000000000);
    oldIntersectionObserver = window.IntersectionObserver;

    // @ts-ignore
    window.IntersectionObserver = FakeIntersectionObserver;
  });

  afterEach(() => {
    mockDate.reset();
    window.IntersectionObserver = oldIntersectionObserver;
    jest.clearAllMocks();
    cleanup();
  });

  it('renders the button with the text `Sign up to newsletter`', () => {
    const mockedAnalyticsStream = jest.fn();
    const mockedOnPress = jest.fn();

    const component = render(
      <TrackingContextProvider
        context={{ attrs: { context: 'value' } }}
        analyticsStream={mockedAnalyticsStream}
      >
        <NewsletterPuffButton
          style="button"
          updatingSubscription={false}
          onPress={mockedOnPress}
        />
      </TrackingContextProvider>
    );
    console.log('XXXXXXXXXXXXXXXXXXXX', FakeIntersectionObserver);
    FakeIntersectionObserver.intersect();

    expect(component.getByText('One click sign up'));

    expect(mockedAnalyticsStream).toHaveBeenCalledWith({
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

  it('should track button viewed and clicked in analytics', () => {
    const mockedAnalyticsStream = jest.fn();
    const onPress = jest.fn();

    const component = render(
      <TrackingContextProvider
        analyticsStream={mockedAnalyticsStream}
        context={{ component: 'ArticleSkeleton' }}
      >
        <NewsletterPuffButton
          updatingSubscription={false}
          onPress={onPress}
          style="button"
        />
      </TrackingContextProvider>
    );

    const oneClickSignUp = component.getByText('One click sign up');

    fireEvent.click(oneClickSignUp);

    expect(onPress).toHaveBeenCalledTimes(1);

    expect(mockedAnalyticsStream).toHaveBeenCalledWith({
      action: 'Clicked',
      component: 'ArticleSkeleton',
      object: 'NewsletterPuffButton',
      attrs: {
        eventTime: '2021-05-03T00:00:00.000Z',
        event_navigation_action: 'navigation',
        event_navigation_browsing_method: 'click',
        event_navigation_name: 'widget : puff : sign up now'
      }
    });
  });
});
