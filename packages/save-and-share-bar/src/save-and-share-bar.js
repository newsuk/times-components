import React, { Component } from "react";
import PropTypes from "prop-types";
import { ActivityIndicator, View, Text, Clipboard } from "react-native";
import {
  IconEmail,
  IconFacebook,
  IconTwitter,
  IconCopyLink
} from "@times-components/icons";
import SaveStar from "@times-components/save-star-web";
import getTokenisedArticleUrlApi from "./get-tokenised-article-url-api";
import withTrackEvents from "./tracking/with-track-events";
import SharingApiUrls from "./constants";
import styles from "./styles";
import BarItem from "./bar-item";

/* eslint-disable jsx-a11y/anchor-is-valid */
class SaveAndShareBar extends Component {
  constructor(props) {
    super(props);
    this.copyToClipboard = this.copyToClipboard.bind(this);
    this.handleOnShareEmailPress = this.handleOnShareEmailPress.bind(this);
    this.onSaveButtonPress = this.onSaveButtonPress.bind(this);

    this.state = {
      isLoading: false
    };
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

  handleOnShareEmailPress() {
    /* eslint-env browser */
    const { articleHeadline, articleId, getTokenisedShareUrl } = this.props;
    this.setState({ isLoading: true });

    getTokenisedShareUrl(articleId)
      .then(res => {
        const { data } = res;
        if (data) {
          this.setState({ isLoading: false });
          const { url } = data.article.tokenisedUrl;
          const mailtoEmailUrl = `mailto:?subject=${articleHeadline} from The Times&body=I thought you would be interested in this story from The Times%0A%0A${articleHeadline}%0A%0A${url}`;
          window.location.assign(mailtoEmailUrl);
        }
      })
      .catch(error => {
        this.setState({ isLoading: false });
        console.error("Error in connecting to api", error);
      });
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

    const { isLoading } = this.state;

    return (
      <View style={styles.container}>
        {sharingEnabled && (
          <View style={styles.rowItem}>
            <Text style={styles.label}>Share</Text>
            <BarItem onPress={this.handleOnShareEmailPress}>
              {isLoading ? (
                <ActivityIndicator size="small" style={styles.activityLoader} />
              ) : (
                <IconEmail
                  fillColour="currentColor"
                  height={styles.svgIcon.height}
                  title="Share by email client"
                />
              )}
            </BarItem>
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
        {savingEnabled && (
          <View style={styles.rowItem}>
            <SaveStar
              colour={styles.svgIcon.save.strokeColour}
              hoverColor={styles.svgIcon.hoverFillColour}
              articleId={articleId}
              saveApi={saveApi}
              height={styles.svgIcon.star.height}
              onSaveButtonPress={this.onSaveButtonPress}
            />
          </View>
        )}
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
  getTokenisedShareUrl: getTokenisedArticleUrlApi
};

export default withTrackEvents(SaveAndShareBar);
