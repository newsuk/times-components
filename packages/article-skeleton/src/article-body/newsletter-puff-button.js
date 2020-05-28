import React from "react";
import PropTypes from "prop-types";

import Button from "@times-components/button";
import {
  withTrackingContext,
  withTrackEvents
} from "@times-components/tracking";
import { buttonStyles, textStyle } from "../styles/inline-newsletter-puff";

const NewsletterPuffButton = ({ updatingSubscription, onPress }) => (
  <Button
    title={updatingSubscription ? "Saving…" : "Sign up to newsletter"}
    onPress={onPress}
    style={buttonStyles}
    underlayColor="transparent"
    textStyle={textStyle}
  />
);

NewsletterPuffButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  updatingSubscription: PropTypes.bool.isRequired
};
export default withTrackingContext(
  withTrackEvents(NewsletterPuffButton, {
    analyticsEvents: [
      {
        actionName: "onPress",
        eventName: "onPress",
        getAttrs: ({ updatingSubscription }) => ({
          updatingSubscription
        }),
        trackingName: "widget : puff : sign up to newsletter"
      }
    ]
  }),
  { trackingObjectName: "NewsletterPuffButton" }
);
