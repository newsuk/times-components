import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";

const ArticleSummaryStrapline = ({ strapline }) => (
  <Text accessibilityRole="heading" aria-level="4" style={styles.strapline}>
    {strapline}
  </Text>
);

ArticleSummaryStrapline.propTypes = {
  strapline: PropTypes.string.isRequired
};

export default ArticleSummaryStrapline;
