/* eslint-env browser */

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import UserState from "@times-components/user-state";
import { getBase64CookieValue, hasEntitlement } from "@times-components/utils";

// import { TrackingContextProvider } from "@times-components/ts-components";
import Comments from "./comments";
import DisabledComments from "./disabled-comments";
// import JoinTheConversationDialog from "./join-the-conversation-dialog";

const COOKIE_NAME = "access-decisions";
const ENTITLEMENT_SLUG = "functionalCommentingFull";
const FEATURE_FLAG_NAME = "entitlements";

const ArticleComments = ({
  articleId,
  isEnabled,
  isReadOnly,
  commentingConfig,
  domainSpecificUrl
}) => {
  const [flagEnabled, setFlagEnabled] = useState(undefined);
  const [isEntitled, setIsEntitled] = useState(undefined);
  const trackingContext = {
    component: "JoinTheConversationDialog",
    object: "JoinTheConversationDialog",
    attrs: {
      event_navigation_action: "navigation",
      article_parent_name: "commenting"
    }
  };
  useEffect(() => {
    const search = new URLSearchParams(window.location.search);

    if (search.get(FEATURE_FLAG_NAME)) {
      const decisions = getBase64CookieValue(COOKIE_NAME);
      if (decisions) {
        setIsEntitled(hasEntitlement(decisions, ENTITLEMENT_SLUG));
      } else {
        setIsEntitled(false);
      }
    } else {
      setFlagEnabled(false);
    }
  }, []);

  if (flagEnabled === undefined && isEntitled === undefined) {
    return null;
  }

  if (!isEnabled) {
    return <DisabledComments />;
  }

  if (flagEnabled === false) {
    return (
      <>
        <UserState state={UserState.showCommentingModule}>
          <Comments
            articleId={articleId}
            isReadOnly={isReadOnly}
            commentingConfig={commentingConfig}
            domainSpecificUrl={domainSpecificUrl}
          />
        </UserState>
        <UserState state={UserState.showJoinTheConversationDialog}>
          <div id="zephr__commenting-banner"/>
          {/* <TrackingContextProvider context={trackingContext}>
            {({ fireAnalyticsEvent }) => (
              <JoinTheConversationDialog
                fireAnalyticsEvent={fireAnalyticsEvent}
              />
            )}
          </TrackingContextProvider> */}
        </UserState>
      </>
    );
  }

  return isEntitled ? (
    <Comments
      articleId={articleId}
      isReadOnly={isReadOnly}
      commentingConfig={commentingConfig}
      domainSpecificUrl={domainSpecificUrl}
    />
  ) : (
    <div id="zephr__commenting-banner"/>
    // <TrackingContextProvider context={trackingContext}>
    //   {({ fireAnalyticsEvent }) => (
    //     <JoinTheConversationDialog fireAnalyticsEvent={fireAnalyticsEvent} />
    //   )}
    // </TrackingContextProvider>
  );
};

ArticleComments.propTypes = {
  articleId: PropTypes.string.isRequired,
  isEnabled: PropTypes.bool.isRequired,
  isReadOnly: PropTypes.bool,
  commentingConfig: PropTypes.shape({
    account: PropTypes.string.isRequired
  }).isRequired,
  domainSpecificUrl: PropTypes.string.isRequired
};

ArticleComments.defaultProps = {
  isReadOnly: false
};

export default ArticleComments;
