import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import mockDate from 'mockdate';
import { NewsletterPuffButton } from '../NewsletterPuffButton';

describe('NewsletterPuffButton', () => {
  beforeEach(() => {
    mockDate.set(1514764800000);
  });

  afterEach(() => {
    jest.clearAllMocks();
    mockDate.reset();
    cleanup();
  });

  it('renders the button with the text `Sign up to newsletter`', async () => {
    const mockedOnPress = jest.fn();

    const component = render(
      <NewsletterPuffButton
        updatingSubscription={false}
        onPress={mockedOnPress}
      />
    );

    expect(component.baseElement).toMatchSnapshot();
    fireEvent.click(await component.queryByRole('button')!);
    expect(mockedOnPress).toHaveBeenCalledTimes(1);
  });

  it('renders the button with the text `Saving...`', async () => {
    const mockedOnPress = jest.fn();

    const component = render(
      <NewsletterPuffButton updatingSubscription onPress={mockedOnPress} />
    );

    fireEvent.click(await component.queryByRole('button')!);
    expect(component.baseElement).toMatchSnapshot();
  });

  it('should track button viewed in analytics', () => {
    const mockedAnalyticsStream = jest.fn();
    const onPress = jest.fn();

    render(
      <NewsletterPuffButton updatingSubscription={false} onPress={onPress} />
    );

    expect(mockedAnalyticsStream.mock.calls).toMatchSnapshot();
  });

  it('should track button viewed and clicked in analytics', async () => {
    const mockedAnalyticsStream = jest.fn();
    const onPress = jest.fn();

    const component = render(
      <NewsletterPuffButton updatingSubscription={false} onPress={onPress} />
    );

    fireEvent.click(await component.queryByRole('button')!);

    expect(mockedAnalyticsStream.mock.calls).toMatchSnapshot();
  });
});
