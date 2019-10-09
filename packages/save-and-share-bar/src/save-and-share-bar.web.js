/* eslint-env browser */
import React, { useContext } from "react";
import PropTypes from "prop-types";
import {
  IconFacebook,
  IconTwitter,
  IconCopyLink
} from "@times-components/icons";
import SaveStar from "@times-components/save-star-web";
import UserState from "@times-components/user-state";
import { SectionContext } from "@times-components/context";
import Clipboard from "./clipboard";
import getTokenisedArticleUrlApi from "./get-tokenised-article-url-api";
import withTrackEvents from "./tracking/with-track-events";
import SharingApiUrls from "./constants";
import styles from "./styles";
import BarItem from "./bar-item";
import EmailShare from "./email-share";

/* eslint-disable jsx-a11y/anchor-is-valid */
function SaveAndShareBar({
  articleId,
  articleUrl,
  savingEnabled,
  sharingEnabled,
  articleHeadline,
  onCopyLink,
  onShareOnFB = () => {},
  onShareOnTwitter = () => {},
  onShareEmail = () => {},
  getTokenisedShareUrl = getTokenisedArticleUrlApi,
}) {
  const {publicationName} = useContext(SectionContext);
  return (
    <div style={styles.container}>
      {sharingEnabled && (
        <div style={styles.rowItem}>
          <div style={styles.label}>Share</div>
          <UserState
            state={UserState.subscriber}
            fallback={
              <EmailShare
                shouldTokenise={false}
                publicationName={publicationName}
                articleId={articleId}
                getTokenisedShareUrl={getTokenisedShareUrl}
                articleUrl={articleUrl}
                onShareEmail={onShareEmail}
                articleHeadline={articleHeadline}
              />
            }
          >
            <EmailShare
              shouldTokenise
              publicationName={publicationName}
              articleId={articleId}
              getTokenisedShareUrl={getTokenisedShareUrl}
              articleUrl={articleUrl}
              onShareEmail={onShareEmail}
              articleHeadline={articleHeadline}
            />
          </UserState>
          <BarItem
            onPress={onShareOnTwitter}
            target="_blank"
            url={`${SharingApiUrls.twitter}?text=${articleUrl}`}
          >
            <IconTwitter
              fillColour="currentColor"
              height={styles.svgIcon.height}
              title="Share on Twitter"
            />
          </BarItem>
          <BarItem
            onPress={onShareOnFB}
            target="_blank"
            url={`${SharingApiUrls.facebook}?u=${articleUrl}`}
          >
            <IconFacebook
              fillColour="currentColor"
              height={styles.svgIcon.fb.height}
              title="Share on Facebook"
            />
          </BarItem>
          <BarItem
            color={styles.svgIcon.save.strokeColour}
            hoverColor={styles.svgIcon.hoverFillColour}
            onPress={() => {Clipboard.setString(articleUrl); onCopyLink();}}
          >
            <IconCopyLink
              fillColour="currentColor"
              height={styles.svgIcon.height}
              title="Copy link to clipboard"
            />
          </BarItem>
        </div>
      )}
      {savingEnabled ? (
        <UserState state={UserState.loggedIn} serverRender={false}>
          <div style={styles.rowItem}>
            <SaveStar
              colour={styles.svgIcon.save.strokeColour}
              hoverColor={styles.svgIcon.hoverFillColour}
              articleId={articleId}
              height={styles.svgIcon.star.height}
            />
          </div>
        </UserState>
      ) : null}
    </div>
  );
}

/* eslint-disable react/no-unused-prop-types */
SaveAndShareBar.propTypes = {
  articleId: PropTypes.string.isRequired,
  articleUrl: PropTypes.string.isRequired,
  articleHeadline: PropTypes.string.isRequired,
  getTokenisedShareUrl: PropTypes.func,
  onCopyLink: PropTypes.func.isRequired,
  onShareOnFB: PropTypes.func,
  onShareEmail: PropTypes.func,
  onShareOnTwitter: PropTypes.func,
  savingEnabled: PropTypes.bool.isRequired,
  sharingEnabled: PropTypes.bool.isRequired
};

export default withTrackEvents(SaveAndShareBar);
