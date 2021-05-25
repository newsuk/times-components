import React from 'react';
import { create } from 'react-test-renderer';
import Button from '@times-components/button';
import mockDate from 'mockdate';
import { NewsletterPuffButton } from '../NewsletterPuffButton';

describe('NewsletterPuffButton', () => {
  beforeEach(() => {
    mockDate.set(1514764800000);
  });

  afterEach(() => {
    jest.clearAllMocks();
    mockDate.reset();
  });

  afterEach(() => {
    return;
  });

  it('renders the button with the text `Sign up to newsletter`', () => {
    const mockedOnPress = jest.fn();

    const component = create(
      <NewsletterPuffButton
        updatingSubscription={false}
        onPress={mockedOnPress}
      />
    );

    expect(component).toMatchSnapshot();
    component.root.findByType(Button).props.onPress();
    expect(mockedOnPress).toHaveBeenCalledTimes(1);
  });

  it('renders the button with the text `Saving...`', () => {
    const mockedOnPress = jest.fn();

    const component = create(
      <NewsletterPuffButton updatingSubscription onPress={mockedOnPress} />
    );

    component.root.findByType(Button).props.onPress();
    expect(component).toMatchSnapshot();
  });

  it('should track button viewed in analytics', () => {
    const mockedAnalyticsStream = jest.fn();
    const onPress = jest.fn();

    create(
      <NewsletterPuffButton updatingSubscription={false} onPress={onPress} />
    );

    expect(mockedAnalyticsStream.mock.calls).toMatchSnapshot();
  });

  it('should track button viewed and clicked in analytics', () => {
    const mockedAnalyticsStream = jest.fn();
    const onPress = jest.fn();

    const testInstance = create(
      <NewsletterPuffButton updatingSubscription={false} onPress={onPress} />
    );

    testInstance.root.findByType(Button).props.onPress();

    expect(mockedAnalyticsStream.mock.calls).toMatchSnapshot();
  });
});
