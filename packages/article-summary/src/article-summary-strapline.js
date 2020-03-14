import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";

const ArticleSummaryStrapline = ({ strapline, style }) => (
  <Text
    accessibilityRole="header"
    aria-level="4"
    style={[styles.strapline, style]}
  >
    {strapline}
  </Text>
);

ArticleSummaryStrapline.propTypes = {
  strapline: PropTypes.string.isRequired,
  style: PropTypes.shape({})
};

ArticleSummaryStrapline.defaultProps = {
  style: {}
};

export default ArticleSummaryStrapline;
