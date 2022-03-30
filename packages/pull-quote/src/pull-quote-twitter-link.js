import React from "react";
import { View } from "react-native";
import { TimesTextLink } from "@times-components/link";
import { IconTwitter } from "@times-components/icons";
import { propTypes, defaultProps } from "./pull-quote-twitter-link-prop-types";
import makeTwitterUrl from "./utils";
import styles from "./styles";
import sharedStyles from "./newStyles";

const PullQuoteTwitterLink = ({ onTwitterLinkPress, twitter }) => {
  if (!twitter) {
    return null;
  }

  const url = makeTwitterUrl(twitter);

  return (
    <View style={styles.twitterContainer}>
      <IconTwitter height={10} width={11} />
      <TimesTextLink
        className="pullQuoteTwitterLink"
        key={url}
        onPress={e => onTwitterLinkPress(e, { twitter, url })}
        style={sharedStyles.link}
        target="_blank"
        url={url}
      >
        {twitter}
      </TimesTextLink>
    </View>
  );
};

PullQuoteTwitterLink.propTypes = propTypes;
PullQuoteTwitterLink.defaultProps = defaultProps;

export default PullQuoteTwitterLink;
