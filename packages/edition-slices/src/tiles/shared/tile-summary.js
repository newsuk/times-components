import React from "react";
import PropTypes from "prop-types";
import ArticleSummary, {
  ArticleSummaryContent,
  ArticleSummaryHeadline
} from "@times-components/article-summary";
import { ArticleFlags } from "@times-components/article-flag";
import { colours } from "@times-components/styleguide";

const TileSummary = ({
  flags,
  hasVideo,
  headline,
  headlineStyle,
  label,
  section,
  style,
  summary
}) => (
  <ArticleSummary
    content={() => <ArticleSummaryContent ast={summary} />}
    flags={() => <ArticleFlags flags={flags} />}
    headline={() => (
      <ArticleSummaryHeadline headline={headline} style={headlineStyle} />
    )}
    label={label}
    labelProps={{
      color: colours.section[section] || colours.section.default,
      isVideo: hasVideo,
      title: label
    }}
    style={style}
  />
);

TileSummary.propTypes = {
  flags: PropTypes.arrayOf(PropTypes.string).isRequired,
  hasVideo: PropTypes.bool.isRequired,
  headline: PropTypes.string.isRequired,
  headlineStyle: PropTypes.number,
  label: PropTypes.string.isRequired,
  section: PropTypes.string,
  style: PropTypes.number,
  summary: PropTypes.arrayOf(PropTypes.shape({}))
};

TileSummary.defaultProps = {
  headlineStyle: null,
  section: null,
  style: null,
  summary: null
};

export default TileSummary;
