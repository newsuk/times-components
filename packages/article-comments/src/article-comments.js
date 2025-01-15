/* eslint-env browser */

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

// @eslint-ignore
// import UserState from "@times-components/user-state";
// import Comments from "./comments";
// import DisabledComments from "./disabled-comments";
// import JoinTheConversationDialog from "./join-the-conversation-dialog";

const ArticleComments = ({
  articleId,
  isEnabled,
  isReadOnly,
  commentingConfig,
  isCommentEnabled,
  storefrontConfig,
  domainSpecificUrl
}) => {
  console.log(
    articleId,
    isEnabled,
    isReadOnly,
    commentingConfig,
    isCommentEnabled,
    storefrontConfig,
    domainSpecificUrl
  );
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

  return <p>The problem lies below {hasCommentingEntitlement}</p>;

  // @ts-ignore
  // let content;
  // if (hasCommentingEntitlement === undefined) {
  //   content = null;
  // }
  // if (!isEnabled && !isCommentEnabled) {
  //   content = <DisabledComments />;
  // } else if (hasCommentingEntitlement) {
  //   content = (
  //     <Comments
  //       articleId={articleId}
  //       isReadOnly={isReadOnly}
  //       commentingConfig={commentingConfig}
  //       domainSpecificUrl={domainSpecificUrl}
  //     />
  //   );
  // } else {
  //   content = <JoinTheConversationDialog storefrontConfig={storefrontConfig} />;
  // }
  // if (hasCommentingEntitlement === undefined) {
  //   return null;
  // }

  // return <UserState state={UserState.showArticleComments}>{content}</UserState>;
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
