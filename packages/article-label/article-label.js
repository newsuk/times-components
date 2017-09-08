import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";

const styles = {
  title: {
    fontFamily: "GillSansMTStd-Medium",
    fontSize: 10,
    fontWeight: "400"
  }
};

// apply transformations to add uppercase and letter spacing.
// letterSpacing CSS prop does not work on android:
// https://github.com/facebook/react-native/pull/13199
const beautifyTitle = title =>
  title
    .toUpperCase()
    .split("")
    .join(" ");

const ArticleLabel = ({ title, color }) => {
  if (!title) {
    return null;
  }

  return <Text style={[styles.title, { color }]}>{beautifyTitle(title)}</Text>;
};

ArticleLabel.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string
};

ArticleLabel.defaultProps = {
  color: "black"
};

export default ArticleLabel;
