import React from 'react';

import Button from '@times-components/button';

import { buttonStyles, textStyle } from './styles';
import { useTrackingContext } from '../../helpers/tracking/TrackingContextProvider';

type NewsletterPuffProps = {
  onPress?: () => void;
  updatingSubscription?: boolean;
};

export const NewsletterPuffButton = ({
  updatingSubscription = false,
  onPress
}: NewsletterPuffProps) => {
  const { fireAnalyticsEvent } = useTrackingContext();
  const handlePress = () => {
    if (!updatingSubscription) {
      onPress && onPress();
      fireAnalyticsEvent &&
        fireAnalyticsEvent({
          action: 'Clicked',
          object: 'NewsletterPuffButton',
          attrs: {
            event_navigation_name: 'widget : puff : sign up now',
            event_navigation_browsing_method: 'click',
            event_navigation_action: 'navigation'
          }
        });
    }
  };
  return (
    <Button
      title={updatingSubscription ? 'Saving…' : 'Sign up now'}
      onPress={() => handlePress()}
      style={buttonStyles}
      underlayColor="transparent"
      textStyle={textStyle}
    />
  );
};
