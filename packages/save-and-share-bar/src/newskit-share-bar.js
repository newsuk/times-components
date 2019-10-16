/* eslint-env browser */
/* eslint-disable react/require-default-props */
import React from "react";
import PropTypes from "prop-types";
import { ShareBar } from "newskit";
import SharingApiUrls from "./constants";
import SaveStarIcon from "./save-star";

function NewskitShareBar({
  articleId,
  articleUrl,
  onShareEmail,
  articleHeadline,
  onCopyLink,
  savingEnabled,
  sharingEnabled,
  publicationName = "TIMES"
}) {
  const onShare = () => {
    onShareEmail({ articleId, articleUrl, articleHeadline });
    const matches = window.location.search.match(/[?&]shareToken=([^&]+)/);
    const url = matches ? `${articleUrl}?shareToken=${matches[1]}` : articleUrl;

    const publication =
      publicationName !== "TIMES" ? "The Sunday Times" : "The Times";
    const mailtoEmailUrl = `mailto:?subject=${articleHeadline} from ${publication}&body=I thought you would be interested in this story from ${publication}%0A%0A${articleHeadline}%0A%0A${url}`;
    window.location.assign(mailtoEmailUrl);
  };

  return (
    <ShareBar
      leftLabel={sharingEnabled ? "Share" : ""}
      leftIcons={
        sharingEnabled
          ? [
              { type: "email", onClick: onShare },
              {
                type: "twitter",
                href: `${SharingApiUrls.twitter}?text=${articleUrl}`
              },
              {
                type: "facebook",
                href: `${SharingApiUrls.facebook}?u=${articleUrl}`
              },
              {
                type: "copy",
                onClick: onCopyLink
              }
            ]
          : []
      }
      rightLabel={savingEnabled ? "Save" : ""}
      rightIcons={savingEnabled ? [<SaveStarIcon articleId={articleId} />] : []}
    />
  );
}

NewskitShareBar.propTypes = {
  articleId: PropTypes.string.isRequired,
  onShareEmail: PropTypes.func.isRequired,
  articleUrl: PropTypes.string.isRequired,
  articleHeadline: PropTypes.string.isRequired,
  onCopyLink: PropTypes.func.isRequired,
  savingEnabled: PropTypes.bool.isRequired,
  sharingEnabled: PropTypes.bool.isRequired,
  publicationName: PropTypes.string
};

export default NewskitShareBar;
