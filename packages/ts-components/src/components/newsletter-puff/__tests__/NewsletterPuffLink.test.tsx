import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import mockDate from 'mockdate';
import { NewsletterPuffLink } from '../NewsletterPuffLink';

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
      <NewsletterPuffLink
        analyticsStream={mockedAnalyticsStream}
        onPress={mockedOnPress}
        newsletterPuffName="RED BOX"
      />
    );

    expect(component.baseElement).toMatchSnapshot();
  });

  it('should track link viewed in analytics', () => {
    const mockedAnalyticsStream = jest.fn();
    const onPress = jest.fn();

    render(
      <NewsletterPuffLink
        onPress={onPress}
        analyticsStream={mockedAnalyticsStream}
        newsletterPuffName="RED BOX"
      />
    );

    expect(mockedAnalyticsStream.mock.calls).toMatchSnapshot();
  });

  it('should track link viewed and clicked in analytics', async () => {
    const mockedAnalyticsStream = jest.fn();
    const onPress = jest.fn();

    const component = render(
      <NewsletterPuffLink
        onPress={onPress}
        analyticsStream={mockedAnalyticsStream}
        newsletterPuffName="RED BOX"
      />
    );
    fireEvent.click(await component.queryByRole('link')!);

    expect(mockedAnalyticsStream.mock.calls).toMatchSnapshot();
  });
});
