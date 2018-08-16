import React from "react";
import { Text, View } from "react-native";
import PullQuoteContent from "./pull-quote-content";
import PullQuoteTwitterLink from "./pull-quote-twitter-link";
import { propTypes, defaultProps } from "./pull-quote-prop-types";
import styles from "./styles";

const PullQuotes = ({
  captionColour,
  children,
  content,
  onTwitterLinkPress,
  quoteColour,
  twitter
}) => (
  <View style={styles.container}>
    <Text style={[styles.quotes, { color: quoteColour }]}>&ldquo;</Text>
    <PullQuoteContent>{content}</PullQuoteContent>
    <View style={styles.captionContainer}>
      <Text style={[styles.caption, { color: captionColour }]}>{children}</Text>
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
