import React from "react";
import { Text, View } from "react-native";
import { TextLink } from "@times-components/link";
import { IconTwitter } from "@times-components/icons";
import PullQuoteContent from "./pull-quote-content";
import { propTypes, defaultProps } from "./pull-quote-prop-types";
import makeTwitterUrl from "./utils";
import styles from "./styles";

const ShowTwitter = twitter => {
  if (!twitter) {
    return null;
  }

  const url = makeTwitterUrl(twitter);

  return (
    <View style={styles.twitterContainer}>
      <IconTwitter height={10} width={12} />
      <TextLink
        key={url}
        onPress={() => null}
        style={styles.link}
        target="_blank"
        url={url}
      >
        {twitter}
      </TextLink>
    </View>
  );
};

const PullQuotes = ({
  captionColour,
  children,
  content,
  quoteColour,
  twitter
}) => (
  <View style={styles.container}>
    <Text style={[styles.quotes, { color: quoteColour }]}>&ldquo;</Text>
    <PullQuoteContent>{content}</PullQuoteContent>
    <View style={styles.captionContainer}>
      <Text style={[styles.caption, { color: captionColour }]}>{children}</Text>
      {ShowTwitter(twitter)}
    </View>
  </View>
);

PullQuotes.propTypes = propTypes;
PullQuotes.defaultProps = defaultProps;

export default PullQuotes;
