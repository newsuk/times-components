import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, Clipboard } from "react-native";
import {
  IconEmail,
  IconFacebook,
  IconTwitter,
  IconCopyLink,
  IconSaveBookmark
} from "@times-components/icons";
import SharingApiUrls from "./constants";
import styles from "./styles";
import BarItem from "./bar-item";

/* eslint-disable jsx-a11y/anchor-is-valid */
class SaveAndShareBar extends Component {
  constructor(props) {
    super(props);
    this.copyToClipboard = this.copyToClipboard.bind(this);
  }

  copyToClipboard() {
    const { onCopyLink, articleUrl } = this.props;
    Clipboard.setString(articleUrl);
    onCopyLink();
  }

  render() {
    const { articleUrl, onSaveToMyArticles, onShareOnEmail } = this.props;
    return (
      <View style={styles.container}>
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
            target="_blank"
            url={`${SharingApiUrls.facebook}?u=${articleUrl}`}
          >
            <IconFacebook
              fillColour="currentColor"
              height={styles.svgIcon.fb.height}
              title="Share on Facebook"
            />
          </BarItem>
          {Clipboard.isAvailable() && (
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
          )}
        </View>
        <View style={styles.rowItem}>
          <Text style={styles.label}>Save</Text>
          <BarItem
            color={styles.svgIcon.save.strokeColour}
            hoverColor={styles.svgIcon.hoverFillColour}
            onPress={onSaveToMyArticles}
          >
            <IconSaveBookmark
              fillColour={styles.svgIcon.save.fillColour}
              strokeColour="currentColor"
              title="Save to My Articles"
            />
          </BarItem>
        </View>
      </View>
    );
  }
}

SaveAndShareBar.propTypes = {
  articleUrl: PropTypes.string.isRequired,
  onCopyLink: PropTypes.func.isRequired,
  onSaveToMyArticles: PropTypes.func.isRequired,
  onShareOnEmail: PropTypes.func.isRequired
};

export default SaveAndShareBar;
