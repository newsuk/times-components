/* eslint-env browser */
/* eslint no-underscore-dangle: 0 */
import React from "react";
import { InlineDialog } from "@times-components/ts-components";

const JoinTheConversationDialog = () => {
  const href =
    typeof window !== "undefined" &&
    window.__TIMES_CONFIG__ &&
    window.__TIMES_CONFIG__.account &&
    window.__TIMES_CONFIG__.account.url;

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

export default JoinTheConversationDialog;
