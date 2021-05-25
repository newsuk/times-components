import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import mockDate from 'mockdate';
import { NewsletterPuffLink } from '../NewsletterPuffLink';
import { TrackingContextProvider } from '../../../helpers/tracking/TrackingContextProvider';

describe('NewsletterPuffLink', () => {
  beforeEach(() => {
    mockDate.set(1514764800000);
  });

  afterEach(() => {
    jest.clearAllMocks();
    mockDate.reset();
    cleanup();
  });

  it('renders the link with the text `Manage preferences here`', () => {
    const mockedOnPress = jest.fn();
    const mockedAnalyticsStream = jest.fn();

    const component = render(
      <TrackingContextProvider
        context={{ context: 'value' }}
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
        context={{ context: 'value' }}
        analyticsStream={mockedAnalyticsStream}
      >
        <NewsletterPuffLink onPress={mockedOnPress} />
      </TrackingContextProvider>
    );

    expect(mockedAnalyticsStream.mock.calls).toMatchSnapshot();
  });

  it('should track link viewed and clicked in analytics', async () => {
    const mockedAnalyticsStream = jest.fn();
    const mockedOnPress = jest.fn();

    const component = render(
      <TrackingContextProvider
        context={{ context: 'value' }}
        analyticsStream={mockedAnalyticsStream}
      >
        <NewsletterPuffLink onPress={mockedOnPress} />
      </TrackingContextProvider>
    );
    fireEvent.click(await component.queryByRole('link')!);
    expect(mockedAnalyticsStream.mock.calls).toMatchSnapshot();
  });
});
