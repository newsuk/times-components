import React from 'react';
import Link from '@times-components/link';

import { TrackingContextProvider } from '../../helpers/tracking/TrackingContextProvider';

import {  InpPreferencesText } from './styles';

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
           
            <InpPreferencesText ref={intersectObserverRef} >Manage preferences here</InpPreferencesText>
     
          </Link>

        );
      }}
    </TrackingContextProvider>
  );
};
