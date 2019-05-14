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

import getTokenisedEmailUrlMock from "./utils/mock-get-tokenised-email-url";
// import getTokenisedEmailUrlApi from "./get-tokenised-email-url-api";

/* eslint-disable jsx-a11y/anchor-is-valid */
class SaveAndShareBar extends Component {
  constructor(props) {
    super(props);
    this.copyToClipboard = this.copyToClipboard.bind(this);
    this.handleOnShareEmailPress = this.handleOnShareEmailPress.bind(this);
  }

  copyToClipboard() {
    const { onCopyLink, articleUrl } = this.props;
    Clipboard.setString(articleUrl);
    onCopyLink();
  }

  handleOnShareEmailPress() {
    /* eslint-env browser */
    const { articleHeadline, articleUrl } = this.props;
    // getTokenisedEmailUrlApi(articleUrl).then(res => {
    //   const mailtoEmailUrl = `mailto:?subject=${articleHeadline} from The Times&body=I thought you would be interested in this story from The Times%0A%0A${articleHeadline}%0A%0A${res.data.article.tokenisedUrl}`;
    //   // window.location = mailtoEmailUrl;
    // });

    getTokenisedEmailUrlMock(articleUrl).then(res => {
      const mailtoEmailUrl = `mailto:?subject=${articleHeadline} from The Times&body=I thought you would be interested in this story from The Times%0A%0A${articleHeadline}%0A%0A${res.data.article.tokenisedUrl}`;
      window.location = mailtoEmailUrl;
    });

  }

  render() {
    const { articleUrl, onSaveToMyArticles } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.rowItem}>
          <Text style={styles.label}>Share</Text>
          <BarItem onPress={this.handleOnShareEmailPress}>
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
  articleHeadline: PropTypes.string.isRequired,
  onCopyLink: PropTypes.func.isRequired,
  onSaveToMyArticles: PropTypes.func.isRequired
};

export default SaveAndShareBar;
