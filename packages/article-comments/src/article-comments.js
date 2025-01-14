/* eslint-env browser */

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
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
  const [hasCommentingEntitlement, setHasCommentingEntitlement] = useState(
    undefined
  );

  useEffect(() => {
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
        row.startsWith("auth-decisions=")
      );
      const cookieValue = authDecisionCookie
        ? authDecisionCookie.split("=")[1]
        : null;

      if (cookieValue) {
        try {
          const jsonValue = convertBase64JSONCookie(cookieValue);
          const entitlements = jsonValue ? jsonValue["fp-1111"] : false;
          setHasCommentingEntitlement(entitlements);
        } catch (error) {
          setHasCommentingEntitlement(false);
        }
      } else {
        setHasCommentingEntitlement(false);
      }
    };

    fetchClientSideCookie();
  }, []);

  if (hasCommentingEntitlement === undefined) {
    return null;
  }

  if (!isEnabled && !isCommentEnabled) {
    return <DisabledComments />;
  }

  if (hasCommentingEntitlement) {
    return (
      <Comments
        articleId={articleId}
        isReadOnly={isReadOnly}
        commentingConfig={commentingConfig}
        domainSpecificUrl={domainSpecificUrl}
      />
    );
  }

  return <JoinTheConversationDialog storefrontConfig={storefrontConfig} />;
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
