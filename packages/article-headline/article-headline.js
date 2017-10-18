import React from "react";
import { Text, Platform } from "react-native";
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

if (Platform.OS === "android") {
  styles.text.letterSpacing = "0.5px";
}

const ArticleHeadline = ({ text, style }) => (
  <Text testID="headline" style={[styles.text, style]}>
    {text}
  </Text>
);

ArticleHeadline.propTypes = {
  text: PropTypes.string.isRequired,
  style: Text.propTypes.style
};

ArticleHeadline.defaultProps = {
  style: null
};

export default ArticleHeadline;
