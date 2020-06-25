import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { IconTwitter } from "@times-components-native/icons";
import { TextLink } from "@times-components-native/link";
import styles from "./styles";

const AuthorProfileHeadTwitter = ({ onTwitterLinkPress, twitter, url }) => (
  <View style={styles.twitter}>
    <View style={styles.twitterIcon}>
      <IconTwitter height={15} width={15} />
    </View>
    <TextLink
      onPress={e => onTwitterLinkPress(e, { twitter, url })}
      style={styles.twitterLink}
      testID="twitterLink"
      url={url}
    >
      @{twitter}
    </TextLink>
  </View>
);

AuthorProfileHeadTwitter.propTypes = {
  onTwitterLinkPress: PropTypes.func.isRequired,
  twitter: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

export default AuthorProfileHeadTwitter;
