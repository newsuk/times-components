import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";
import headlineStyles from "./article-summary-headline-styles";

const { style: TextStylePropTypes } = Text.propTypes;

const ArticleSummaryHeadline = ({ headline, style }) => (
  <Text style={[headlineStyles.headline, headlineStyles.default, style]}>
    {headline}
  </Text>
);

ArticleSummaryHeadline.propTypes = {
  headline: PropTypes.string.isRequired,
  style: TextStylePropTypes
};

ArticleSummaryHeadline.defaultProps = {
  style: {}
};

export default ArticleSummaryHeadline;
