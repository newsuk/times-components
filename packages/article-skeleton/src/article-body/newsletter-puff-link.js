import React from "react";
import PropTypes from "prop-types";

import Link from "@times-components/link";
import { IconForwardArrow } from "@times-components/icons";
import {
  withTrackingContext,
  withTrackEvents
} from "@times-components/tracking";
import { colours } from "@times-components/styleguide";
import {
  InpPreferencesView,
  InpPreferencesText,
  InpIconContainer
} from "../styles/inline-newsletter-puff";

const NewsletterPuffLink = ({ onPress }) => (
  <Link url="https://home.thetimes.co.uk/myNews" onPress={onPress}>
    <InpPreferencesView>
      <InpPreferencesText>Manage preferences here</InpPreferencesText>
      <InpIconContainer>
        <IconForwardArrow fillColour={colours.functional.action} />
      </InpIconContainer>
    </InpPreferencesView>
  </Link>
);

NewsletterPuffLink.propTypes = {
  onPress: PropTypes.func.isRequired
};

export default withTrackingContext(
  withTrackEvents(NewsletterPuffLink, {
    analyticsEvents: [
      {
        actionName: "onPress",
        eventName: "onPress",
        trackingName: "NewsletterPuffLink",
        getAttrs: ({ newsletterPuffName }) => ({
          article_parent_name: `${newsletterPuffName}`,
          event_navigation_name: "widget : puff : manage preferences here",
          event_navigation_browsing_method: "click"
        })
      }
    ]
  }),
  {
    getAttrs: ({ newsletterPuffName }) => ({
      event_navigation_action: "navigation",
      event_navigation_name:
        "widget : puff : manage preferences here : displayed",
      article_parent_name: `${newsletterPuffName}`,
      event_navigation_browsing_method: "automated"
    }),
    trackingName: "NewsletterPuffLink",
    trackingObjectName: "NewsletterPuffLink"
  }
);
