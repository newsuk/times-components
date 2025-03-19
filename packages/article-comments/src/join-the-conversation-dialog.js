/* eslint-env browser */
/* eslint no-underscore-dangle: 0 */
import React from "react";
import PropTypes from "prop-types";
import { InlineDialog } from "@times-components/ts-components";

const JoinTheConversationDialog = ({ storefrontConfig }) => {
  const isLightPackUser =
    window.nuk && window.nuk.user && window.nuk.user.isLightPackUser;
  const isRegisteredUser =
    window.nuk && window.nuk.user && window.nuk.user.isRegisteredUser;
  const myAccountUrl =
    window.__TIMES_CONFIG__ &&
    window.__TIMES_CONFIG__.account &&
    window.__TIMES_CONFIG__.account.url;
  const href =
    isLightPackUser || isRegisteredUser ? myAccountUrl : storefrontConfig;

  return (
    <InlineDialog
      title="Join the conversation"
      buttonText="Go to My account"
      href={href}
      onClick={() => {}}
    >
      Commenting is only available to unlimited access subscribers. Upgrade your
      subscription to have your say.
    </InlineDialog>
  );
};

JoinTheConversationDialog.propTypes = {
  storefrontConfig: PropTypes.string.isRequired
};

export default JoinTheConversationDialog;
