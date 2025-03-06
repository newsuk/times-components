import React from 'react';
import Link from '@times-components/link';
import { HoverIcon } from '@times-components/utils';

import { TrackingContextProvider } from '../../../helpers/tracking/TrackingContextProvider';

import { InpPreferencesText } from '../styles';

export const NewsletterPuffLink = ({ onPress }: any) => {
  return (
    <TrackingContextProvider
      scrolledEvent={{
        object: 'NewsletterPuffLink',
        attrs: {
          event_navigation_name:
            'widget : puff : manage preferences here : displayed',
          event_navigation_browsing_method: 'automated'
        }
      }}
    >
      {({ fireAnalyticsEvent, intersectObserverRef }) => {
        const handlePress = () => {
          onPress && onPress();
          fireAnalyticsEvent &&
            fireAnalyticsEvent({
              action: 'Clicked',
              object: 'NewsletterPuffLink',
              attrs: {
                event_navigation_name:
                  'widget : puff : manage preferences here',
                event_navigation_browsing_method: 'click'
              }
            });
        };
        return (
          <Link
            url="https://home.thetimes.co.uk/myNews"
            onPress={() => handlePress()}
          >
            <HoverIcon underline={true} colour="#006699">
              <InpPreferencesText ref={intersectObserverRef}>
                Explore our newsletters
              </InpPreferencesText>
            </HoverIcon>
          </Link>
        );
      }}
    </TrackingContextProvider>
  );
};
