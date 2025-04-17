/* eslint-env browser */
/* eslint no-underscore-dangle: 0 */
import React, { useEffect } from "react";
import { InlineDialog } from "@times-components/ts-components";
import PropTypes from "prop-types";
import { handleClick, event } from "./tracking/tracking-helper";

const JoinTheConversationDialog = ({ fireAnalyticsEvent }) => {
  const href =
    typeof window !== "undefined" &&
    window.__TIMES_CONFIG__ &&
    window.__TIMES_CONFIG__.account &&
    window.__TIMES_CONFIG__.account.url;

  useEffect(
    () => {
      if (fireAnalyticsEvent) {
        fireAnalyticsEvent(
          event("upgrade sticky footer : displayed", "automated")
        );
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <InlineDialog
      title="Join the conversation"
      buttonText="Go to My account"
      href={href}
      onClick={() =>
        handleClick(
          fireAnalyticsEvent,
          "upgrade sticky footer : Go to My account",
          "click"
        )
      }
    >
      Commenting is only available to unlimited access subscribers. Upgrade your
      subscription to have your say.
    </InlineDialog>
  );
};

JoinTheConversationDialog.propTypes = {
  fireAnalyticsEvent: PropTypes.func.isRequired
};
export default JoinTheConversationDialog;
