import React from "react";
import { View } from "react-native";
import { TextLink } from "@times-components/link";
import { IconTwitter } from "@times-components/icons";
import { propTypes, defaultProps } from "./pull-quote-twitter-link-prop-types";
import makeTwitterUrl from "./utils";
import styles from "./styles";

const PullQuoteTwitterLink = ({ onTwitterLinkPress, twitter }) => {
  if (!twitter) {
    return null;
  }

  const url = makeTwitterUrl(twitter);

  return (
    <View style={styles.twitterContainer}>
      <IconTwitter height={10} width={12} />
      <TextLink
        key={url}
        onPress={e => onTwitterLinkPress(e, { twitter, url })}
        style={styles.link}
        target="_blank"
        url={url}
      >
        {twitter}
      </TextLink>
    </View>
  );
};

PullQuoteTwitterLink.propTypes = propTypes;
PullQuoteTwitterLink.defaultProps = defaultProps;

export default PullQuoteTwitterLink;
