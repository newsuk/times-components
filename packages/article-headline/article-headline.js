import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";

const styles = {
  title: {
    color: "#1D1D1B",
    fontSize: 22,
    lineHeight: 25,
    marginBottom: 8,
    fontFamily: "TimesModern-Bold",
    fontWeight: "400"
  }
};

const ArticleHeadline = ({ title, style }) => (
  <Text style={[styles.title, style]}>{title}</Text>
);

ArticleHeadline.propTypes = {
  title: PropTypes.string.isRequired,
  style: Text.propTypes.style
};

ArticleHeadline.defaultProps = {
  style: null
};

export default ArticleHeadline;
