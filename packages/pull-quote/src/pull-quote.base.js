import React from "react";
import { Text, View } from "react-native";
import { fonts } from "@times-components/styleguide";
import PullQuoteContent from "./pull-quote-content";
import PullQuoteTwitterLink from "./pull-quote-twitter-link";
import { propTypes, defaultProps } from "./pull-quote-prop-types";
import styles from "./styles";

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
    <Text
      style={[
        styles.quotes,
        { color: quoteColour },
        font ? { fontFamily: fonts[font] } : null
      ]}
    >
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
