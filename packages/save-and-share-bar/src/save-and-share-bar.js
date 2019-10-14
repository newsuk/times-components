/* eslint-env browser */
/* eslint-disable jsx-a11y/anchor-is-valid, react/require-default-props */
import React, { useContext } from "react";
import PropTypes from "prop-types";
import { View, Clipboard, Text } from "react-native";
import {
  IconFacebook,
  IconTwitter,
  IconCopyLink
} from "@times-components/icons";
import UserState from "@times-components/user-state";
import Context, { SectionContext } from "@times-components/context";
import getTokenisedArticleUrlApi from "./get-tokenised-article-url-api";
import withTrackEvents from "./tracking/with-track-events";
import SharingApiUrls from "./constants";
import styles from "./styles";
import BarItem from "./bar-item";
import EmailShare from "./email-share";
import NewskitShareBar from "./newskit-share-bar";
import SaveStarIcon from "./save-star";

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
  getTokenisedShareUrl = getTokenisedArticleUrlApi
}) {
  const { publicationName } = useContext(SectionContext);
  const { newskit } = useContext(Context);
  const copyLinkAction = () => {
    Clipboard.setString(articleUrl);
    onCopyLink();
  };

  if (newskit) {
    return (
      <NewskitShareBar
        articleId={articleId}
        articleUrl={articleUrl}
        articleHeadline={articleHeadline}
        onCopyLink={copyLinkAction}
        savingEnabled={savingEnabled}
        sharingEnabled={sharingEnabled}
        publicationName={publicationName}
        onShareEmail={onShareEmail}
      />
    );
  }

  return (
    <View style={styles.container}>
      {sharingEnabled && (
        <View style={styles.rowItem}>
          <Text style={styles.label}>Share</Text>
          <UserState
            state={UserState.subscriber}
            fallback={
              <EmailShare
                shouldTokenise={false}
                publicationName={publicationName}
                onShareEmail={onShareEmail}
                getTokenisedShareUrl={getTokenisedShareUrl}
                articleId={articleId}
                articleUrl={articleUrl}
                articleHeadline={articleHeadline}
              />
            }
          >
            <EmailShare
              shouldTokenise
              publicationName={publicationName}
              onShareEmail={onShareEmail}
              getTokenisedShareUrl={getTokenisedShareUrl}
              articleId={articleId}
              articleUrl={articleUrl}
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
            onPress={copyLinkAction}
          >
            <IconCopyLink
              fillColour="currentColor"
              height={styles.svgIcon.height}
              title="Copy link to clipboard"
            />
          </BarItem>
        </View>
      )}
      {savingEnabled ? <SaveStarIcon articleId={articleId} /> : null}
    </View>
  );
}

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
