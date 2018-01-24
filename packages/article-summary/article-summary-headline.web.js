import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";
import withResponsiveStyles from "@times-components/responsive-styles";
import ArticleSummaryHeadlineBase from "./article-summary-headline-base";

const ResponsiveHeadline = withResponsiveStyles(Text, {
  base: () => `
    font-size: 22px;
    line-height: 22px;
  `,
  mediumUp: () => `
    font-size: 30px;
    line-height: 30px;
  `
});

const ArticleSummaryHeadline = ({ headline, hasResponsiveHeadline }) =>
  hasResponsiveHeadline ? (
    <ResponsiveHeadline>
      <ArticleSummaryHeadlineBase headline={headline} />
    </ResponsiveHeadline>
  ) : (
    <ArticleSummaryHeadlineBase headline={headline} />
  );

ArticleSummaryHeadline.propTypes = {
  headline: PropTypes.string.isRequired,
  hasResponsiveHeadline: PropTypes.bool
};

ArticleSummaryHeadline.defaultProps = {
  hasResponsiveHeadline: false
};

export default ArticleSummaryHeadline;
