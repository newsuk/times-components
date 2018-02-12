import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles/article-summary-headline-styles";
import ResponsiveHeadline from "./styles/responsive";

const ArticleSummaryHeadline = ({ headline, hasResponsiveHeadline }) =>
  hasResponsiveHeadline ? (
    <ResponsiveHeadline style={styles.headline}>{headline}</ResponsiveHeadline>
  ) : (
    <Text accessible accessibilityRole="heading" aria-level={3} style={{ ...styles.default, ...styles.headline }}>{headline}</Text>
  );

ArticleSummaryHeadline.propTypes = {
  headline: PropTypes.string.isRequired,
  hasResponsiveHeadline: PropTypes.bool
};

ArticleSummaryHeadline.defaultProps = {
  hasResponsiveHeadline: false
};

export default ArticleSummaryHeadline;
