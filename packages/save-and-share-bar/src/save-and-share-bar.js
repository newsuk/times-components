import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, Clipboard } from "react-native";
import {
  IconEmail,
  IconFacebook,
  IconTwitter,
  IconCopyLink
} from "@times-components/icons";
import SaveStar from "@times-components/save-star-web";
import withTrackEvents from "./tracking/with-track-events";
import SharingApiUrls from "./constants";
import styles from "./styles";
import BarItem from "./bar-item";

class SaveAndShareBar extends Component {
  constructor(props) {
    super(props);
    this.copyToClipboard = this.copyToClipboard.bind(this);
    this.onSaveButtonPress = this.onSaveButtonPress.bind(this);
  }

  copyToClipboard() {
    const { onCopyLink, articleUrl } = this.props;
    Clipboard.setString(articleUrl);
    onCopyLink();
  }


  onSaveButtonPress(evt) {
    evt.preventDefault();

    const { savedStatus } = this.state;
    const { saveApi } = this.props;

    if (savedStatus) {
      this.saveUnsaveBookmark(saveApi.unBookmark, false, true);
    } else {
      this.saveUnsaveBookmark(saveApi.bookmark, true, false);
    }
  }

  saveUnsaveBookmark(saveMethod, successStatus, errorStatus) {
    this.setState({ loadingState: true });
    const { articleId: id } = this.props;

    saveMethod(id)
      .then(() => {
        this.setState({
          loadingState: false,
          savedStatus: successStatus
        });
      })
      .catch(error => {
        this.setState({ loadingState: false, savedStatus: errorStatus });
        console.error("Error in connecting to api", error);
      });
  }

  render() {
    const {
      articleId,
      articleUrl,
      onShareOnEmail,
      savingEnabled,
      sharingEnabled,
      onShareOnFB,
      onShareOnTwitter,
      saveApi
    } = this.props;
    return (
      <View style={styles.container}>
        {sharingEnabled && (
          <View style={styles.rowItem}>
            <Text style={styles.label}>Share</Text>
            <BarItem onPress={onShareOnEmail}>
              <IconEmail
                fillColour="currentColor"
                height={styles.svgIcon.height}
                title="Share by email client"
              />
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
<<<<<<< HEAD
              height={styles.svgIcon.star.height}
=======
              onSaveButtonPress={this.onSaveButtonPress}
>>>>>>> Feat Add tracking to save star press event
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
  onCopyLink: PropTypes.func.isRequired,
  onShareOnEmail: PropTypes.func.isRequired,
  onShareOnFB: PropTypes.func,
  onShareOnTwitter: PropTypes.func,
  saveApi: PropTypes.shape({
    bookmark: PropTypes.func.isRequired,
    getBookmarks: PropTypes.func.isRequired,
    unBookmark: PropTypes.func.isRequired
  }).isRequired,
  savingEnabled: PropTypes.func.isRequired,
  sharingEnabled: PropTypes.func.isRequired
};

/* Serves as an indication when share links are clicked for tracking and analytics */
SaveAndShareBar.defaultProps = {
  onShareOnFB: () => {},
  onShareOnTwitter: () => {}
};

export default withTrackEvents(SaveAndShareBar);
