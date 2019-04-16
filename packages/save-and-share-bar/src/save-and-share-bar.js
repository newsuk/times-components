import React from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import Link from "@times-components/link";
import {
  IconEmail,
  IconFacebook,
  IconTwitter,
  IconCopyLink,
  IconSaveBookmark
} from "@times-components/icons";
import SharingApiUrls from "./constants";
import styles from "./styles";

/* eslint-disable jsx-a11y/anchor-is-valid */
const SaveAndShareBar = ({
  articleUrl,
  onCopyLink,
  onSaveToMyArticles,
  onShareOnEmail
}) => (
  <View style={styles.container}>
    <View style={styles.rowItem}>
      <Text style={styles.label}>Share</Text>
      <Link onPress={onShareOnEmail} responsiveLinkStyles={styles.link}>
        <IconEmail
          fillColour={styles.svgIcon.fillColour}
          height={styles.svgIcon.height}
          title="Share by email client"
        />
      </Link>
      <Link
        responsiveLinkStyles={styles.link}
        target="_blank"
        url={`${SharingApiUrls.twitter}?text=${articleUrl}`}
      >
        <IconTwitter
          fillColour={styles.svgIcon.fillColour}
          height={styles.svgIcon.height}
          title="Share on tweeter"
        />
      </Link>
      <Link
        responsiveLinkStyles={styles.link}
        target="_blank"
        url={`${SharingApiUrls.facebook}?text=${articleUrl}`}
      >
        <IconFacebook
          fillColour={styles.svgIcon.fillColour}
          height={styles.svgIcon.fb.height}
          title="Share on facebook"
        />
      </Link>
      <Link onPress={onCopyLink} responsiveLinkStyles={styles.link}>
        <IconCopyLink
          fillColour={styles.svgIcon.fillColour}
          height={styles.svgIcon.height}
          title="Copy link o clipboard"
        />
      </Link>
    </View>
    <View style={styles.rowItem}>
      <Text style={styles.label}>Save</Text>
      <Link onPress={onSaveToMyArticles} responsiveLinkStyles={styles.link}>
        <IconSaveBookmark
          fillColour={styles.svgIcon.save.fillColour}
          strokeColour={styles.svgIcon.save.strokeColour}
          title="Save to My Articles"
        />
      </Link>
    </View>
  </View>
);

SaveAndShareBar.propTypes = {
  articleUrl: PropTypes.string.isRequired,
  onCopyLink: PropTypes.func.isRequired,
  onSaveToMyArticles: PropTypes.func.isRequired,
  onShareOnEmail: PropTypes.func.isRequired
};

export default SaveAndShareBar;
