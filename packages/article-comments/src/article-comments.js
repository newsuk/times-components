/* eslint-env browser */

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import UserState from "@times-components/user-state";
import Comments from "./comments";
import DisabledComments from "./disabled-comments";
import JoinTheConversationDialog from "./join-the-conversation-dialog";
import UserEntitlementProvider from "./user-entitlement-provider";
import { UserEntitlements } from "./user-entitlements";

const ArticleComments = ({
  articleId,
  isEnabled,
  isReadOnly,
  commentingConfig,
  isCommentEnabled,
  storefrontConfig,
  domainSpecificUrl,
}) => {
  // const entitlementFeatureEnable = window && window.sessionStorage.getItem(
  //   "entitlementFeatureEnable"
  // );
  const entitlementFeatureEnable =  true;
  console.log('rendering article-comments1234');

  const [userEntitlements, setUserEntitlements] = useState(undefined);
  useEffect(() => {
    if(window){
      console.log('window accessible');
    }
    const fetchUserEntitlements = async () => {
      const response = await fetch('/api/get-user-entitlements');
      const data = await response.json();
      setUserEntitlements(data);
    }
    fetchUserEntitlements();
  }, []);

  return (
  //  isEnabled && isCommentEnabled ? (
    <>
      <UserState state={UserState.showJoinTheConversationDialog}>
        <JoinTheConversationDialog storefrontConfig={storefrontConfig} />
      </UserState>
      {!entitlementFeatureEnable ? (
        <UserState state={UserState.showCommentingModule}>
          <p>inside UserState provider</p>
          {/* <Comments
            articleId={articleId}
            isReadOnly={isReadOnly}
            commentingConfig={commentingConfig}
            domainSpecificUrl={domainSpecificUrl}
          /> */}
        </UserState>
      ) : (
          <UserEntitlements userEntitlementsList={userEntitlements}>
          <Comments
            articleId={articleId}
            isReadOnly={isReadOnly}
            commentingConfig={commentingConfig}
            domainSpecificUrl={domainSpecificUrl}
          />
            </UserEntitlements>
      )}
    </>
  )
  //  : (
  //   <DisabledComments />
  // );
};

ArticleComments.propTypes = {
  articleId: PropTypes.string.isRequired,
  isEnabled: PropTypes.bool.isRequired,
  isReadOnly: PropTypes.bool,
  commentingConfig: PropTypes.shape({
    account: PropTypes.string.isRequired,
  }).isRequired,
  storefrontConfig: PropTypes.string.isRequired,
  isCommentEnabled: PropTypes.bool,
  domainSpecificUrl: PropTypes.string.isRequired,
};

ArticleComments.defaultProps = {
  isReadOnly: false,
  isCommentEnabled: true,
};

export default ArticleComments;
