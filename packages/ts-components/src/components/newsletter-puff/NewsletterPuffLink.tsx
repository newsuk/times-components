import React from 'react';
import Link from '@times-components/link';
import { IconForwardArrow } from '@times-components/icons';
import { colours } from '@times-components/ts-styleguide';

import { TrackingContextProvider } from '../../helpers/tracking/TrackingContextProvider';

import {
  InpPreferencesView,
  InpPreferencesText,
  InpIconContainer
} from './styles';

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
            <InpPreferencesView ref={intersectObserverRef}>
              <InpPreferencesText>Manage preferences here</InpPreferencesText>
              <InpIconContainer>
                <IconForwardArrow fillColour={colours.functional.action} />
              </InpIconContainer>
            </InpPreferencesView>
          </Link>
        );
      }}
    </TrackingContextProvider>
  );
};
