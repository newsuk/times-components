import React from "react";
import PropTypes from "prop-types";

import Link from "@times-components-native/link";
import { IconForwardArrow } from "@times-components-native/icons";
import {
  withTrackingContext,
  withTrackEvents
} from "@times-components-native/tracking";
import { colours } from "@times-components-native/styleguide";
import { styleFactory } from "../styles/inline-newsletter-puff";
import { useResponsiveContext } from "@times-components-native/responsive";
import { Text, View } from "react-native";

const NewsletterPuffLink = ({ onPress }) => {
  const { editionBreakpoint: breakpoint } = useResponsiveContext();
  const styles = styleFactory(breakpoint);
  return (
    <Link url="https://home.thetimes.co.uk/myNews" onPress={onPress}>
      <View style={styles.preferencesView}>
        <Text style={styles.preferencesText}>Manage preferences here</Text>
        <View style={styles.iconContainer}>
          <IconForwardArrow
            fillColour={colours.functional.action}
            height={12}
          />
        </View>
      </View>
    </Link>
  );
};

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
