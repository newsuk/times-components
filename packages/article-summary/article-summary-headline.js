import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";
import headlineStyles from "./article-summary-headline-styles";

const ArticleSummaryHeadline = ({ headline }) => {
  if (!headline) return null;
  return <Text style={headlineStyles.headline}>{headline}</Text>;
};

ArticleSummaryHeadline.propTypes = {
  headline: PropTypes.string.isRequired
};

export default ArticleSummaryHeadline;
