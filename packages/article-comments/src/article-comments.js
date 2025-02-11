/* eslint-env browser */

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import UserState from "@times-components/user-state";
import { hasEntitlement } from "@times-components/utils";
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
  const [hasCommentingEntitlement, setHasCommentingEntitlement] = useState(
    undefined
  );
  const [userEntitlementData, setUserEntitlementData] = useState(undefined);
  const urlParams = new URLSearchParams(window.location.search);
  const commentingAccesEntitlementFF = !!urlParams.get("commentingFF");

  useEffect(
    () => {
      const convertBase64JSONCookie = cookieValue => {
        try {
          return cookieValue ? JSON.parse(atob(cookieValue)) : undefined;
        } catch (e) {
          return undefined;
        }
      };

      const fetchClientSideCookie = () => {
        const cookies = document.cookie.split("; ");
        const authDecisionCookie = cookies.find(row =>
          row.startsWith("access-decisions=")
        );
        const cookieValue = authDecisionCookie
          ? authDecisionCookie.split("=")[1]
          : null;

        if (cookieValue) {
          try {
            const jsonValue = convertBase64JSONCookie(cookieValue);
            const entitlementChecker = hasEntitlement(jsonValue);
            const entitlements = entitlementChecker("functionalCommentingFull");
            setHasCommentingEntitlement(entitlements);
          } catch (error) {
            setHasCommentingEntitlement(false);
          }
        } else {
          setHasCommentingEntitlement(false);
        }
      };

      if (commentingAccesEntitlementFF) {
        fetchClientSideCookie();
      }
    },
    [commentingAccesEntitlementFF]
  );

  useEffect(
    () => {
      const fetchUserEntitlements = async () => {
        const response = await fetch("/api/get-user-entitlements");
        const data = await response.json();
        setUserEntitlementData(data);
      };

      if (
        typeof window !== "undefined" &&
        !commentingAccesEntitlementFF &&
        isEntitlementFeatureEnabled
      ) {
        fetchUserEntitlements();
      }
    },
    [commentingAccesEntitlementFF, isEntitlementFeatureEnabled]
  );

  let content;
  if (!isEnabled && !isCommentEnabled) {
    content = <DisabledComments />;
  } else if (hasCommentingEntitlement) {
    content = (
      <Comments
        articleId={articleId}
        isReadOnly={isReadOnly}
        commentingConfig={commentingConfig}
        domainSpecificUrl={domainSpecificUrl}
      />
    );
  } else {
    content = <JoinTheConversationDialog storefrontConfig={storefrontConfig} />;
  }
  if (commentingAccesEntitlementFF && hasCommentingEntitlement === undefined) {
    return null;
  }

  if (!commentingAccesEntitlementFF) {
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
        ;
      </>
    ) : (
      <DisabledComments />
    );
  }

  return <UserState state={UserState.showArticleComments}>{content}</UserState>;
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
