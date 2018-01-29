import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";
import headlineStyles from "./article-summary-headline-styles";

const { style: TextStylePropTypes } = Text.propTypes;

const ArticleSummaryHeadlineBase = ({ headline, style }) => (
  <Text style={[headlineStyles.headline, style]}>{headline}</Text>
);

ArticleSummaryHeadlineBase.propTypes = {
  headline: PropTypes.string.isRequired,
  style: TextStylePropTypes
};

ArticleSummaryHeadlineBase.defaultProps = {
  style: {}
};

export default ArticleSummaryHeadlineBase;
