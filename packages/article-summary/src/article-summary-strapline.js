import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";

const { style: TextStylePropTypes } = Text.propTypes;

const ArticleSummaryStrapline = ({ strapline, style }) => (
  <Text
    accessibilityRole="heading"
    aria-level="4"
    style={[styles.strapline, style]}
  >
    {strapline}
  </Text>
);

ArticleSummaryStrapline.propTypes = {
  strapline: PropTypes.string.isRequired,
  style: TextStylePropTypes
};

ArticleSummaryStrapline.defaultProps = {
  style: {}
};

export default ArticleSummaryStrapline;
