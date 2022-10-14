import React from 'react';
import { PuffButton, PuffLinkButton } from './styles';
import { useTrackingContext } from '../../../helpers/tracking/TrackingContextProvider';

type NewsletterPuffProps = {
  onPress?: () => void;
  updatingSubscription?: boolean;
  style: 'link' | 'button';
};

export const NewsletterPuffButton = ({
  updatingSubscription = false,
  onPress,
  style
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
  const buttonText = 'One-click sign-up';

  return style === 'button' ? (
    <PuffButton onClick={() => handlePress()}>{buttonText}</PuffButton>
  ) : (
    <PuffLinkButton onClick={() => handlePress()}>{buttonText}</PuffLinkButton>
  );
};
