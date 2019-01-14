import React from "react";
import { Text, View } from "react-native";
import PullQuoteContent from "./pull-quote-content";
import PullQuoteTwitterLink from "./pull-quote-twitter-link";
import { propTypes, defaultProps } from "./pull-quote-prop-types";
import styles from "./styles";
import quoteStyleFactory from "./styles/quotes";

const PullQuotes = ({
  caption,
  captionColour,
  children,
  font,
  onTwitterLinkPress,
  quoteColour,
  text,
  twitter
}) => (
  <View style={styles.container}>
    <Text style={[quoteStyleFactory(font), { color: quoteColour }]}>
      &ldquo;
    </Text>
    <PullQuoteContent>{children}</PullQuoteContent>
    <View style={styles.captionContainer}>
      <Text style={[styles.caption, { color: captionColour }]}>{caption}</Text>
      <Text style={styles.text}>{caption && text ? `, ${text}` : text}</Text>
      <PullQuoteTwitterLink
        onTwitterLinkPress={onTwitterLinkPress}
        twitter={twitter}
      />
    </View>
  </View>
);

PullQuotes.propTypes = propTypes;
PullQuotes.defaultProps = defaultProps;

export default PullQuotes;
