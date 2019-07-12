/* eslint-env browser */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Clipboard, Text } from "react-native";
import {
  IconFacebook,
  IconTwitter,
  IconCopyLink
} from "@times-components/icons";
import SaveStar, {
  saveApi as saveArticleApi
} from "@times-components/save-star-web";
import UserState from "@times-components/user-state";
import { SectionContext } from "@times-components/context";
import getTokenisedArticleUrlApi from "./get-tokenised-article-url-api";
import withTrackEvents from "./tracking/with-track-events";
import SharingApiUrls from "./constants";
import styles from "./styles";
import BarItem from "./bar-item";
import EmailShare from "./email-share";

/* eslint-disable jsx-a11y/anchor-is-valid */
class SaveAndShareBar extends Component {
  constructor(props) {
    super(props);
    this.copyToClipboard = this.copyToClipboard.bind(this);
    this.onSaveButtonPress = this.onSaveButtonPress.bind(this);
  }

  /* eslint-disable class-methods-use-this */
  onSaveButtonPress(callback, event) {
    event.preventDefault();
    callback();
  }

  copyToClipboard() {
    const { onCopyLink, articleUrl } = this.props;
    Clipboard.setString(articleUrl);
    onCopyLink();
  }

  render() {
    const {
      articleId,
      articleUrl,
      savingEnabled,
      sharingEnabled,
      onShareOnFB,
      onShareOnTwitter,
      saveApi
    } = this.props;

    const api = saveApi && saveApi.bookmark ? saveApi : saveArticleApi;

    return (
      <View style={styles.container}>
        {sharingEnabled && (
          <View style={styles.rowItem}>
            <Text style={styles.label}>Share</Text>
            <SectionContext.Consumer>
              {({ publicationName }) => (
                <UserState
                  state={UserState.subscriber}
                  fallback={
                    <EmailShare
                      {...this.props}
                      shouldTokenise={false}
                      publicationName={publicationName}
                    />
                  }
                >
                  <EmailShare
                    {...this.props}
                    shouldTokenise
                    publicationName={publicationName}
                  />
                </UserState>
              )}
            </SectionContext.Consumer>
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
              onPress={this.copyToClipboard}
            >
              <IconCopyLink
                fillColour="currentColor"
                height={styles.svgIcon.height}
                title="Copy link to clipboard"
              />
            </BarItem>
          </View>
        )}
        {savingEnabled ? (
          <UserState state={UserState.loggedIn} serverRender={false}>
            <View style={styles.rowItem}>
              <SaveStar
                colour={styles.svgIcon.save.strokeColour}
                hoverColor={styles.svgIcon.hoverFillColour}
                articleId={articleId}
                saveApi={api}
                height={styles.svgIcon.star.height}
                onSaveButtonPress={this.onSaveButtonPress}
              />
            </View>
          </UserState>
        ) : null}
      </View>
    );
  }
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
  saveApi: PropTypes.shape({
    bookmark: PropTypes.func.isRequired,
    getBookmarks: PropTypes.func.isRequired,
    unBookmark: PropTypes.func.isRequired
  }).isRequired,
  savingEnabled: PropTypes.bool.isRequired,
  sharingEnabled: PropTypes.bool.isRequired
};

/* Serves as an indication when share links are clicked for tracking and analytics */
SaveAndShareBar.defaultProps = {
  onShareOnFB: () => {},
  onShareOnTwitter: () => {},
  onShareEmail: () => {},
  getTokenisedShareUrl: getTokenisedArticleUrlApi
};

export default withTrackEvents(SaveAndShareBar);
