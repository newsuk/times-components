/* eslint-env browser */
/* eslint-disable react/require-default-props */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { ActivityIndicator } from "react-native";
import { IconEmail } from "@times-components/icons";
import styles from "./styles";
import BarItem from "./bar-item";

function EmailShare({
  articleId,
  getTokenisedShareUrl,
  shouldTokenise,
  articleUrl,
  onShareEmail,
  articleHeadline,
  publicationName = "TIMES"
}) {
  const [isLoading, setIsLoading] = useState(false);
  const onShare = async () => {
    onShareEmail({ articleId, articleUrl, articleHeadline });
    const matches = window.location.search.match(/[?&]shareToken=([^&]+)/);
    let url = matches ? `${articleUrl}?shareToken=${matches[1]}` : articleUrl;

    if (shouldTokenise) {
      setIsLoading(true);
      try {
        const { data } = await getTokenisedShareUrl(articleId);
        if (data && data.article && data.article.tokenisedUrl) {
          url = data.article.tokenisedUrl;
        }
      } catch (e) {
        console.error("Error in connecting to api", e); // eslint-disable-line no-console
      }
      setIsLoading(false);
    }

    const publication =
      publicationName !== "TIMES" ? "The Sunday Times" : "The Times";
    const mailtoEmailUrl = `mailto:?subject=${articleHeadline} from ${publication}&body=I thought you would be interested in this story from ${publication}%0A%0A${articleHeadline}%0A%0A${url}`;
    window.location.assign(mailtoEmailUrl);
  };

  return (
    <BarItem onPress={onShare}>
      {isLoading ? (
        <ActivityIndicator size="small" style={styles.activityLoader} />
      ) : (
        <IconEmail
          fillColour="currentColor"
          height={styles.svgIcon.height}
          title="Share by email"
        />
      )}
    </BarItem>
  );
}

EmailShare.propTypes = {
  getTokenisedShareUrl: PropTypes.func.isRequired,
  onShareEmail: PropTypes.func.isRequired,
  articleUrl: PropTypes.string.isRequired,
  articleHeadline: PropTypes.string.isRequired,
  articleId: PropTypes.string.isRequired,
  shouldTokenise: PropTypes.bool.isRequired,
  publicationName: PropTypes.string
};

export default EmailShare;
