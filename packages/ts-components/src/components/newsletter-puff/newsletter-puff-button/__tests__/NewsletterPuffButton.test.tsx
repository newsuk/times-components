import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import mockDate from 'mockdate';
import { NewsletterPuffButton } from '../NewsletterPuffButton';
import { TrackingContextProvider } from '../../../../helpers/tracking/TrackingContextProvider';

describe('NewsletterPuffButton', () => {
  beforeEach(() => {
    mockDate.set(1620000000000);
  });

  afterEach(() => {
    mockDate.reset();
    jest.clearAllMocks();
    cleanup();
  });

  it('renders the button with the text `Sign up to newsletter`', () => {
    const mockedOnPress = jest.fn();

    const component = render(
      <NewsletterPuffButton
        style="button"
        updatingSubscription={false}
        onPress={mockedOnPress}
      />
    );

    expect(component.getByText('One click sign up'));
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
