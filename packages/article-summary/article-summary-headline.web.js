import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";
import headlineStyles from "./article-summary-headline-styles";

const ArticleSummaryHeadline = ({
  headline,
  responsiveHeadline: ResponsiveHeadline
}) => {
  if (!headline) return null;
  return ResponsiveHeadline ? (
    <ResponsiveHeadline style={headlineStyles.headline}>
      {headline}
    </ResponsiveHeadline>
  ) : (
    <Text style={[headlineStyles.headline, headlineStyles.default]}>
      {headline}
    </Text>
  );
};

ArticleSummaryHeadline.propTypes = {
  headline: PropTypes.string.isRequired,
  responsiveHeadline: PropTypes.func
};

ArticleSummaryHeadline.defaultProps = {
  responsiveHeadline: null
};

export default ArticleSummaryHeadline;
