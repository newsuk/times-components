import React from "react";
import PropTypes from "prop-types";
import { TcView } from "@times-components/utils";
import { IconTwitter } from "@times-components/icons";
import { TextLink } from "@times-components/link";
import styles from "./styles";

const AuthorProfileHeadTwitter = ({ onTwitterLinkPress, twitter, url }) => (
  <TcView style={styles.twitter}>
    <TcView style={styles.twitterIcon}>
      <IconTwitter height={15} width={15} />
    </TcView>
    <TextLink
      onPress={e => onTwitterLinkPress(e, { twitter, url })}
      style={styles.twitterLink}
      testID="twitterLink"
      url={url}
    >
      @{twitter}
    </TextLink>
  </TcView>
);

AuthorProfileHeadTwitter.propTypes = {
  onTwitterLinkPress: PropTypes.func.isRequired,
  twitter: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

export default AuthorProfileHeadTwitter;
