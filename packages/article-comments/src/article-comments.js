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
          ? JSON.parse(Buffer.from(cookieValue, "base64"))
          : undefined;
      } catch (e) {
        return undefined;
      }
    };
    const fetchClientSideCookie = () => {
      const cookieValue = document.cookie
        .split("; ")
        .find(row => row.startsWith("auth-decisions="))
        ?.split("=")[1];

      if (cookieValue) {
        try {
          const jsonValue = convertBase64JSONCookie(cookieValue);
          const entitlements = jsonValue["fp-1111"];
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

  return isEnabled ? (
    <>
      {hasCommentingEntitlement ? (
        <Comments
          articleId={articleId}
          isReadOnly={isReadOnly}
          commentingConfig={commentingConfig}
          domainSpecificUrl={domainSpecificUrl}
        />
      ) : (
        <JoinTheConversationDialog storefrontConfig={storefrontConfig} />
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
  domainSpecificUrl: PropTypes.string.isRequired
};

ArticleComments.defaultProps = {
  isReadOnly: false
};

export default ArticleComments;
