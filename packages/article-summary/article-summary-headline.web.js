import React from "react";
import PropTypes from "prop-types";
import { withResponsiveElementStyles } from "@times-components/responsive-styles";
import headlineStyles from "./article-summary-headline-styles";

const ResponsiveHeadline = withResponsiveElementStyles('h3', {
  base: () => `
    font-size: 22px;
    line-height: 22px;
    margin-bottom: 5px;
    margin-top: 0;
  `,
  mediumUp: () => `
    font-size: 30px;
    line-height: 30px;
  `
});

const ArticleSummaryHeadline = ({ headline, hasResponsiveHeadline }) =>
  hasResponsiveHeadline ? (
    <ResponsiveHeadline style={headlineStyles.headline}>
      {headline}
    </ResponsiveHeadline>
  ) : (
    <h3 style={[headlineStyles.default, headlineStyles.headline]}>
      {headline}
    </h3>
  );

ArticleSummaryHeadline.propTypes = {
  headline: PropTypes.string.isRequired,
  hasResponsiveHeadline: PropTypes.bool
};

ArticleSummaryHeadline.defaultProps = {
  hasResponsiveHeadline: false
};

export default ArticleSummaryHeadline;
