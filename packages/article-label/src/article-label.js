import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";
import styles from "./style";

const ArticleLabel = ({ title, color }) => (
  <Text style={[styles.title, { color }]}>{title.toUpperCase()}</Text>
);

ArticleLabel.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string
};

ArticleLabel.defaultProps = {
  color: "black"
};

export default ArticleLabel;
