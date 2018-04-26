import React from "react";
import { Text, View } from "react-native";
import { TextLink } from "@times-components/link";
import { IconTwitter } from "@times-components/icons";
import PullQuoteContent from "./pull-quote-content";
import { propTypes, defaultProps } from "./pull-quote-prop-types";
import styles from "./styles";

const ShowTwitter = twitter => {
  if (!twitter) {
    return null;
  }

  const url = `https://twitter.com/${twitter}`;

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
  caption,
  captionColour,
  content,
  quoteColour,
  twitter
}) => (
  <View style={styles.container}>
    <Text style={[styles.quotes, { color: quoteColour }]}>&ldquo;</Text>
    <PullQuoteContent>{content}</PullQuoteContent>
    <View style={styles.captionContainer}>
      <Text style={[styles.caption, { color: captionColour }]}>{caption}</Text>
      {ShowTwitter(twitter)}
    </View>
  </View>
);

PullQuotes.propTypes = propTypes;
PullQuotes.defaultProps = defaultProps;

export default PullQuotes;
