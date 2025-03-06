/* eslint-env browser */

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import UserState from "@times-components/user-state";
import Comments from "./comments";
import DisabledComments from "./disabled-comments";
import JoinTheConversationDialog from "./join-the-conversation-dialog";
import UserEntitlementState from "./user-entitlement-state";

const ArticleComments = ({
  articleId,
  isEnabled,
  isReadOnly,
  commentingConfig,
  isCommentEnabled,
  storefrontConfig,
  domainSpecificUrl,
  isEntitlementFeatureEnabled
}) => {
  const [userEntitlementData, setUserEntitlementData] = useState(undefined);

  useEffect(
    () => {
      const fetchUserEntitlements = async () => {
        const response = await fetch("/api/get-user-entitlements");
        const data = await response.json();
        setUserEntitlementData(data);
      };

      if (typeof window !== "undefined" && isEntitlementFeatureEnabled) {
        fetchUserEntitlements();
      }
    },
    [isEntitlementFeatureEnabled]
  );

  return isEnabled && isCommentEnabled ? (
    <>
      <UserState state={UserState.showJoinTheConversationDialog}>
        <JoinTheConversationDialog storefrontConfig={storefrontConfig} />
      </UserState>
      {!isEntitlementFeatureEnabled ? (
        <UserState state={UserState.showCommentingModule}>
          <Comments
            articleId={articleId}
            isReadOnly={isReadOnly}
            commentingConfig={commentingConfig}
            domainSpecificUrl={domainSpecificUrl}
          />
        </UserState>
      ) : (
        <UserEntitlementState userEntitlementData={userEntitlementData}>
          <Comments
            articleId={articleId}
            isReadOnly={isReadOnly}
            commentingConfig={commentingConfig}
            domainSpecificUrl={domainSpecificUrl}
          />
        </UserEntitlementState>
      )}
    </>
  ) : (
    <DisabledComments />
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
  isCommentEnabled: PropTypes.bool,
  domainSpecificUrl: PropTypes.string.isRequired,
  isEntitlementFeatureEnabled: PropTypes.bool.isRequired
};

ArticleComments.defaultProps = {
  isReadOnly: false,
  isCommentEnabled: true
};

export default ArticleComments;
