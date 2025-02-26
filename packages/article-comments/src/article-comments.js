/* eslint-env browser */

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import UserState from "@times-components/user-state";
import Comments from "./comments";
import DisabledComments from "./disabled-comments";
import JoinTheConversationDialog from "./join-the-conversation-dialog";

const ArticleComments = ({
  articleId,
  isEnabled,
  isReadOnly,
  commentingConfig,
  storefrontConfig,
  domainSpecificUrl
}) => {
  const [hasCommentingEntitlement, setHasCommentingEntitlement] = useState(
    false
  );

  useEffect(() => {
    const convertBase64JSONCookie = cookieValue => {
      try {
        return cookieValue
          ? JSON.parse(Buffer.from(cookieValue, "base64").toString())
          : undefined;
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

  let content;
  if (!isEnabled) {
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

  return (
    <UserState
      state={UserState.showArticleComments}
      fallback={<DisabledComments />}
      serverRender={false}
    >
      {content}
    </UserState>
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
