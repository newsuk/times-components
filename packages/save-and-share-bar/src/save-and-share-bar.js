import React from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import Link from "@times-components/link";
import { IconEmail, IconFacebook, IconTwitter } from "@times-components/icons";
import SharingApiUrls from "./constants";
import styles from "./styles";

const SaveAndShareBar = ({ articleUrl, onShareOnEmail }) => (
  <View style={styles.container}>
    <View style={styles.rowItem}>
      <Text style={styles.label}>Share</Text>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <Link onPress={onShareOnEmail} responsiveLinkStyles={styles.link}>
        <IconEmail
          fillColour={styles.svgIcon.fillColour}
          title="Share by email client"
          width={styles.svgIcon.width}
        />
      </Link>
      <Link
        responsiveLinkStyles={styles.link}
        target="_blank"
        url={`${SharingApiUrls.facebook}?text=${articleUrl}`}
      >
        <IconTwitter
          fillColour={styles.svgIcon.fillColour}
          title="Share on tweeter"
          width={styles.svgIcon.width}
        />
      </Link>
      <Link
        responsiveLinkStyles={styles.link}
        target="_blank"
        url={`${SharingApiUrls.twitter}?u=${articleUrl}`}
      >
        <IconFacebook
          fillColour={styles.svgIcon.fillColour}
          heigth={styles.svgIcon.fb.heigth}
          title="Share on facebook"
          width={styles.svgIcon.fb.width}
        />
      </Link>
    </View>
    <View style={styles.rowItem}>
      <Text style={styles.label}>Save</Text>
    </View>
  </View>
);

SaveAndShareBar.propTypes = {
  articleUrl: PropTypes.string,
  onShareOnEmail: PropTypes.func.isRequired
};

SaveAndShareBar.defaultProps = {
  articleUrl: ""
};

export default SaveAndShareBar;
