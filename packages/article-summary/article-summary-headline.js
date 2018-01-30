import React from "react";
import PropTypes from "prop-types";
import ArticleSummaryHeadlineBase from "./article-summary-headline-base";
import headlineStyles from "./article-summary-headline-styles";

const ArticleSummaryHeadline = ({ headline }) => (
  <ArticleSummaryHeadlineBase
    headline={headline}
    style={headlineStyles.default}
  />
);

ArticleSummaryHeadline.propTypes = {
  headline: PropTypes.string.isRequired
};

export default ArticleSummaryHeadline;
