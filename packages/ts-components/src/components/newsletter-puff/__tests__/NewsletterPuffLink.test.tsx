import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import mockDate from 'mockdate';
import { NewsletterPuffLink } from '../NewsletterPuffLink';
import { TrackingContextProvider } from '../../../helpers/tracking/TrackingContextProvider';
import FakeIntersectionObserver from '../../../test-utils/FakeIntersectionObserver';

describe('NewsletterPuffLink', () => {
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

  it('renders the link with the text `Manage preferences here`', () => {
    const mockedOnPress = jest.fn();
    const mockedAnalyticsStream = jest.fn();

    const component = render(
      <TrackingContextProvider
        context={{ attrs: { context: 'value' } }}
        analyticsStream={mockedAnalyticsStream}
      >
        <NewsletterPuffLink onPress={mockedOnPress} />
      </TrackingContextProvider>
    );

    expect(component.baseElement).toMatchSnapshot();
  });

  it('should track link viewed in analytics', () => {
    const mockedAnalyticsStream = jest.fn();
    const mockedOnPress = jest.fn();

    render(
      <TrackingContextProvider
        context={{ attrs: { context: 'value' } }}
        analyticsStream={mockedAnalyticsStream}
      >
        <NewsletterPuffLink onPress={mockedOnPress} />
      </TrackingContextProvider>
    );
    FakeIntersectionObserver.intersect();

    expect(mockedAnalyticsStream).toHaveBeenCalledWith({
      object: 'NewsletterPuffLink',
      action: 'Scrolled',
      attrs: {
        context: 'value',
        eventTime: '2021-05-03T00:00:00.000Z',
        event_navigation_browsing_method: 'automated',
        event_navigation_name:
          'widget : puff : manage preferences here : displayed'
      }
    });
  });

  it('should track link viewed and clicked in analytics', async () => {
    const mockedAnalyticsStream = jest.fn();
    const mockedOnPress = jest.fn();

    const component = render(
      <TrackingContextProvider
        context={{ component: 'ArticleSkeleton', attrs: { context: 'value' } }}
        analyticsStream={mockedAnalyticsStream}
      >
        <NewsletterPuffLink onPress={mockedOnPress} />
      </TrackingContextProvider>
    );
    fireEvent.click(await component.queryByRole('link')!);
    expect(mockedAnalyticsStream).toHaveBeenCalledWith({
      action: 'Clicked',
      component: 'ArticleSkeleton',
      object: 'NewsletterPuffLink',
      attrs: {
        context: 'value',
        eventTime: '2021-05-03T00:00:00.000Z',
        event_navigation_browsing_method: 'click',
        event_navigation_name: 'widget : puff : manage preferences here'
      }
    });
  });
});
