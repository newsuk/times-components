/* eslint-env browser */

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { getBase64CookieValue, hasEntitlement } from "@times-components/utils";

import { TrackingContextProvider } from "@times-components/ts-components";
import Comments from "./comments";
import DisabledComments from "./disabled-comments";
import JoinTheConversationDialog from "./join-the-conversation-dialog";

const COOKIE_NAME = "access-decisions";
const ENTITLEMENT_SLUG = "functionalCommentingFull";

const ArticleComments = ({
  articleId,
  isEnabled,
  isReadOnly,
  commentingConfig,
  domainSpecificUrl
}) => {
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
    const decisions = getBase64CookieValue(COOKIE_NAME);
    if (decisions) {
      setIsEntitled(hasEntitlement(decisions, ENTITLEMENT_SLUG));
    } else {
      setIsEntitled(false);
    }
  }, []);

  if (isEntitled === undefined) {
    return null;
  }

  if (!isEnabled) {
    return <DisabledComments />;
  }

  return isEntitled ? (
    <Comments
      articleId={articleId}
      isReadOnly={isReadOnly}
      commentingConfig={commentingConfig}
      domainSpecificUrl={domainSpecificUrl}
    />
  ) : (
    <TrackingContextProvider context={trackingContext}>
      {({ fireAnalyticsEvent }) => (
        <JoinTheConversationDialog fireAnalyticsEvent={fireAnalyticsEvent} />
      )}
    </TrackingContextProvider>
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
