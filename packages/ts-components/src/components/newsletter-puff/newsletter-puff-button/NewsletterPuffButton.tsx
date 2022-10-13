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

  return style === 'button' ? (
    <PuffButton onClick={() => handlePress()}>One click sign up</PuffButton>
  ) : (
    <PuffLinkButton onClick={() => handlePress()}>
      One click sign up
    </PuffLinkButton>
  );
};
