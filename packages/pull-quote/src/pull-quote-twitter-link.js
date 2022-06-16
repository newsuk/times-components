import React from "react";
import { TcView } from "@times-components/utils";
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
    <TcView style={styles.twitterContainer}>
      <IconTwitter height={10} width={11} />
      <TextLink
        className="pullQuoteTwitterLink"
        key={url}
        onPress={e => onTwitterLinkPress(e, { twitter, url })}
        style={styles.link}
        target="_blank"
        url={url}
      >
        {twitter}
      </TextLink>
    </TcView>
  );
};

PullQuoteTwitterLink.propTypes = propTypes;
PullQuoteTwitterLink.defaultProps = defaultProps;

export default PullQuoteTwitterLink;
