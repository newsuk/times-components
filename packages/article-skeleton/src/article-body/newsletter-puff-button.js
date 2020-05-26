import React from "react";
import PropTypes from "prop-types";

import Button from "@times-components/button";
import { buttonStyles, textStyle } from "../styles/inline-newsletter-puff";
import withTrackEvents from "../tracking/newsletter-button-tracking";

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
export default withTrackEvents(NewsletterPuffButton);
