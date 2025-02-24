/* eslint-env browser */

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import UserState from "@times-components/user-state";
import { hasEntitlement } from "@times-components/utils";
import Comments from "./comments";
import DisabledComments from "./disabled-comments";
import JoinTheConversationDialog from "./join-the-conversation-dialog";

const ArticleComments = ({
  articleId,
  isEnabled,
  isReadOnly,
  commentingConfig,
  isCommentEnabled,
  storefrontConfig,
  domainSpecificUrl
}) => {
  const [zephrEntitlementResponse, setZephrEntitlementResponse] = useState(
    undefined
  );
  const urlParams = new URLSearchParams(window.location.search);
  const entitlementsFF = !!urlParams.get("entitlements");

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
            setZephrEntitlementResponse(entitlements);
          } catch (error) {
            setZephrEntitlementResponse(false);
          }
        } else {
          setZephrEntitlementResponse(false);
        }
      };

      if (entitlementsFF) {
        // Fetched client side cookie if FF is true
        fetchClientSideCookie();
      }
    },
    [entitlementsFF]
  );

  // Returns null until the client side cookie is fetched and FF is true
  if (entitlementsFF && zephrEntitlementResponse === undefined) {
    return null;
  }

  const FallbackContent = () =>
    isEnabled && isCommentEnabled ? (
      <>
        <UserState state={UserState.showJoinTheConversationDialog}>
          <JoinTheConversationDialog storefrontConfig={storefrontConfig} />
        </UserState>
        <UserState state={UserState.showCommentingModule}>
          <Comments
            articleId={articleId}
            isReadOnly={isReadOnly}
            commentingConfig={commentingConfig}
            domainSpecificUrl={domainSpecificUrl}
          />
        </UserState>
      </>
    ) : (
      <DisabledComments />
    );

  const RenderZephrBasedContent = () => {
    let content;
    if (!(isEnabled && isCommentEnabled)) {
      content = <DisabledComments />;
    } else if (zephrEntitlementResponse) {
      content = (
        <Comments
          articleId={articleId}
          isReadOnly={isReadOnly}
          commentingConfig={commentingConfig}
          domainSpecificUrl={domainSpecificUrl}
        />
      );
    } else {
      content = (
        <JoinTheConversationDialog storefrontConfig={storefrontConfig} />
      );
    }
    return (
      <UserState state={UserState.showArticleComments}>{content}</UserState>
    );
  };

  if (entitlementsFF) {
    if (!zephrEntitlementResponse) {
      return FallbackContent();
    }
    return RenderZephrBasedContent();
  }
  return FallbackContent();
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
  domainSpecificUrl: PropTypes.string.isRequired
};

ArticleComments.defaultProps = {
  isReadOnly: false,
  isCommentEnabled: true
};

export default ArticleComments;
