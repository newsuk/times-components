import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";
import styles from "./style";

const ArticleLabel = ({ color, title }) => (
  <Text style={[styles.title, { color }]}>{title.toUpperCase()}</Text>
);

ArticleLabel.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string.isRequired
};

ArticleLabel.defaultProps = {
  color: "black"
};

export default ArticleLabel;
