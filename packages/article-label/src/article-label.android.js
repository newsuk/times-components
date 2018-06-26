import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";
import { androidLetterSpacing } from "@times-components/utils";
import styles from "./style";

const ArticleLabel = ({ title, color }) => (
  <Text accessibilityLabel={title} style={[styles.title, { color }]}>
    {androidLetterSpacing(title)}
  </Text>
);

ArticleLabel.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string
};

ArticleLabel.defaultProps = {
  color: "black"
};

export default ArticleLabel;
