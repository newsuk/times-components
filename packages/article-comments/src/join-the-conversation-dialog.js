/* eslint-env browser */
import React from "react";
import PropTypes from "prop-types";
import { InlineDialog } from "@times-components/ts-components";

const JoinTheConversationDialog = ({ storefrontConfig }) => {
  const isLightPackUser =
    window.nuk && window.nuk.user && window.nuk.user.isLightPackUser;
  const href = isLightPackUser ? null : storefrontConfig;
  // temp solution until the modal is moved out to a proper UI repo
  // this event triggers cps-content-render/packages/components-global/src/FreeArticlePromotion/FreeArticleBottomBanner/FreeArticleBottomBanner.tsx
  // todo: remove this event dispatching and implement the modal from the shared UI component repo
  const onClick = isLightPackUser
    ? () =>
        document && document.dispatchEvent(new Event("show::upgrade::modal"))
    : null;
  return (
    <InlineDialog
      title="Join the conversation"
      buttonText="View offers"
      href={href}
      onClick={onClick}
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
