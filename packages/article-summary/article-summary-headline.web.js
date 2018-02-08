import React from "react";
import PropTypes from "prop-types";
import styles from "./styles/article-summary-headline-styles";
import ResponsiveHeadline from "./styles/responsive";

const ArticleSummaryHeadline = ({ headline, hasResponsiveHeadline }) =>
  hasResponsiveHeadline ? (
    <ResponsiveHeadline style={styles.headline}>{headline}</ResponsiveHeadline>
  ) : (
    <h3 style={{ ...styles.default, ...styles.headline }}>{headline}</h3>
  );

ArticleSummaryHeadline.propTypes = {
  headline: PropTypes.string.isRequired,
  hasResponsiveHeadline: PropTypes.bool
};

ArticleSummaryHeadline.defaultProps = {
  hasResponsiveHeadline: false
};

export default ArticleSummaryHeadline;
