import React from "react";
import { TcText, TcView, checkStylesForUnits } from "@times-components/utils";
import PullQuoteContent from "./pull-quote-content";
import PullQuoteTwitterLink from "./pull-quote-twitter-link";
import { propTypes, defaultProps } from "./pull-quote-prop-types";
import styles from "./styles";
import quoteStyleFactory from "./styles/quotes";

const quoteStyle = (font, quoteColour) => ({
  ...quoteStyleFactory(font),
  color: quoteColour
});

const PullQuotes = ({
  caption,
  children,
  font,
  onTwitterLinkPress,
  quoteColour,
  text,
  twitter
}) => (
  <TcView style={styles.container}>
    <TcText style={quoteStyle(font, quoteColour)}>&ldquo;</TcText>
    <PullQuoteContent>{children}</PullQuoteContent>
    <TcView style={styles.captionContainer}>
      <TcText style={checkStylesForUnits(styles.caption)}>{caption}</TcText>
      <TcText style={checkStylesForUnits(styles.text)}>
        {caption && text ? `, ${text}` : text}
      </TcText>
      <PullQuoteTwitterLink
        onTwitterLinkPress={onTwitterLinkPress}
        twitter={twitter}
      />
    </TcView>
  </TcView>
);

PullQuotes.propTypes = propTypes;
PullQuotes.defaultProps = defaultProps;

export default PullQuotes;
