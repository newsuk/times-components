import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { IconTwitter } from "@times-components/icons";
import { TextLink } from "@times-components/link";
import styles from "./styles";

const AuthorProfileHeadTwitter = ({ onTwitterLinkPress, twitter, url }) => (
  <View style={styles.twitter}>
    <IconTwitter width={15} height={15} />
    <TextLink
      style={styles.twitterLink}
      url={url}
      onPress={e => onTwitterLinkPress(e, { twitter, url })}
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
