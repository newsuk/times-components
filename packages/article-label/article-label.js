import React from "react";
import { Text, Platform } from "react-native";
import PropTypes from "prop-types";
import styles from "./style";

// apply transformations to add uppercase and letter spacing.
// letterSpacing CSS prop does not work on android:
// https://github.com/facebook/react-native/pull/13199
const beautifyTitle = title => {
  if (Platform.OS === "android") {
    return title
      .toUpperCase()
      .split("")
      .join("\u200A");
  }
  return title.toUpperCase();
};
const ArticleLabel = ({ title, color }) => (
  <Text style={[styles.title, { color }]}>{beautifyTitle(title)}</Text>
);

ArticleLabel.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string
};

ArticleLabel.defaultProps = {
  color: "black"
};

export default ArticleLabel;
