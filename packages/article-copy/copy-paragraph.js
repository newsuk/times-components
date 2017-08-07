import React from "react";
import { ScrollView, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import HTMLView from "react-native-htmlview";

const getStyles = (props) => StyleSheet.create({
  p: {
    color: "#333",
    fontFamily: 'TimesDigital-Regular',
    fontSize: 16,
    lineHeight: 20,
    marginTop: 10,
    marginBottom: 10,
    ...props
  }
});

const pullQuoteStyles = {
  p: {
    color: "#000",
    fontSize: 30
  }
};

// const CopyParagraph = ({ content, index, style}) =>
  // <HTMLView key={index} stylesheet={style || getStyles()} value={'<p>' + content + '</p>'} />;

const CopyParagraph = ({ content, index, style}) =>
  <HTMLView value={'<p>' + content + '</p>'} />;


CopyParagraph.propTypes = {
  content: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired
}

const PullQuoteParagraph = ({ content, index}) =>
  <CopyParagraph content={content} index={index} style={getStyles(pullQuoteStyles.p)} />;

export default CopyParagraph;

export {
  PullQuoteParagraph
}
