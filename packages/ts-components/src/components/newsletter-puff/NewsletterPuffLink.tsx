import React from 'react';
import Link from '@times-components/link';
import { IconForwardArrow } from '@times-components/icons';
import { colours } from '@times-components/styleguide';

import { TrackingContextProvider } from '../../helpers/tracking/TrackingContextProvider';

import {
  InpPreferencesView,
  InpPreferencesText,
  InpIconContainer
} from './styles';

export const NewsletterPuffLink = ({ onPress }: any) => {
  return (
    <TrackingContextProvider>
      {({ fireAnalyticsEvent }) => {
        const handlePress = () => {
          onPress && onPress();
          fireAnalyticsEvent &&
            fireAnalyticsEvent({
              event_navigation_name: 'widget : puff : manage preferences here',
              event_navigation_browsing_method: 'click',
              event_navigation_action: 'navigation'
            });
        };
        return (
          <Link
            url="https://home.thetimes.co.uk/myNews"
            onPress={() => handlePress()}
          >
            <InpPreferencesView>
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
// );
//
// NewsletterPuffLink.propTypes = {
//   onPress: PropTypes.func.isRequired
// };
//
// export default withTrackingContext(
//   withTrackEvents(NewsletterPuffLink, {
//     analyticsEvents: [
//       {
//         actionName: 'onPress',
//         eventName: 'onPress',
//         trackingName: 'NewsletterPuffLink',
//         getAttrs: ({ newsletterPuffName }) => ({
//           article_parent_name: `${newsletterPuffName}`,
//           event_navigation_name: 'widget : puff : manage preferences here',
//           event_navigation_browsing_method: 'click'
//         })
//       }
//     ]
//   }),
//   {
//     getAttrs: ({ newsletterPuffName }) => ({
//       event_navigation_action: 'navigation',
//       event_navigation_name:
//         'widget : puff : manage preferences here : displayed',
//       article_parent_name: `${newsletterPuffName}`,
//       event_navigation_browsing_method: 'automated'
//     }),
//     trackingName: 'NewsletterPuffLink',
//     trackingObjectName: 'NewsletterPuffLink'
//   }
