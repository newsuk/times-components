/* eslint-env browser */

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { getBase64CookieValue, hasEntitlement } from "@times-components/utils";

import Comments from "./comments";
import DisabledComments from "./disabled-comments";
import JoinTheConversationDialog from "./join-the-conversation-dialog";

const COOKIE_NAME = "access-decisions";
const ENTITLEMENT_SLUG = "functionalCommentingFull";
const FEATURE_FLAG_NAME = "entitlements";

const ArticleComments = ({
  articleId,
  isEnabled,
  isReadOnly,
  commentingConfig,
  storefrontConfig,
  domainSpecificUrl
}) => {
  const [isEntitled, setIsEntitled] = useState(undefined);

  useEffect(() => {
    const search = new URLSearchParams(window.location.search);

    if (search.get(FEATURE_FLAG_NAME)) {
      const decisions = getBase64CookieValue(COOKIE_NAME);
      setIsEntitled(hasEntitlement(decisions, ENTITLEMENT_SLUG));
    }
  }, []);

  if (isEntitled === undefined) {
    return null;
  }

  if (!isEnabled === undefined) {
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
    <JoinTheConversationDialog storefrontConfig={storefrontConfig} />
  );
};

ArticleComments.propTypes = {
  articleId: PropTypes.string.isRequired,
  isEnabled: PropTypes.bool.isRequired,
  isReadOnly: PropTypes.bool,
  commentingConfig: PropTypes.shape({
    account: PropTypes.string.isRequired
  }).isRequired,
  storefrontConfig: PropTypes.string.isRequired,
  domainSpecificUrl: PropTypes.string.isRequired
};

ArticleComments.defaultProps = {
  isReadOnly: false
};

export default ArticleComments;
