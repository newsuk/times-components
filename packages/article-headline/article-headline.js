import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";
import StylePropTypes from "react-style-proptype";

const styles = {
  text: {
    color: "#1D1D1B",
    fontSize: 22,
    lineHeight: 25,
    marginBottom: 8,
    fontFamily: "TimesModern-Bold",
    fontWeight: "400"
  }
};

const ArticleHeadline = ({ text, style }) => (
  <Text
    accessibilityLabel="headline"
    testID="headline"
    style={[styles.text, style]}
  >
    {text}
  </Text>
);

ArticleHeadline.propTypes = {
  text: PropTypes.string.isRequired,
  style: StylePropTypes
};

ArticleHeadline.defaultProps = {
  style: null
};

export default ArticleHeadline;
