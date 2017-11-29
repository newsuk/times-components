import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";

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

const ArticleHeadline = ({ text, style, WrapperComponent }) => (
  <WrapperComponent
    accessibilityLabel="headline"
    testID="headline"
    style={[styles.text, style]}
  >
    {text}
  </WrapperComponent>
);

ArticleHeadline.propTypes = {
  text: PropTypes.string.isRequired,
  // eslint-disable-next-line react/no-typos
  style: Text.propTypes.style,
  WrapperComponent: PropTypes.element
};

ArticleHeadline.defaultProps = {
  style: null,
  WrapperComponent: Text
};

export default ArticleHeadline;
