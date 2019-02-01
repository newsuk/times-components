import React from "react";
import PropTypes from "prop-types";
import ArticleSummary, {
  ArticleSummaryContent,
  ArticleSummaryHeadline
} from "@times-components/article-summary";
import { ArticleFlags } from "@times-components/article-flag";
import { colours } from "@times-components/styleguide";

const TileSummary = ({
  tile: {
    article: { flags, hasVideo, headline, label, section, shortHeadline }
  },
  headlineStyle,
  style,
  summary
}) => (
  <ArticleSummary
    content={
      summary ? () => <ArticleSummaryContent ast={summary} /> : undefined
    }
    flags={() => <ArticleFlags flags={flags} />}
    headline={() => (
      <ArticleSummaryHeadline
        headline={headline || shortHeadline}
        style={headlineStyle}
      />
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
  headlineStyle: PropTypes.shape({}),
  style: PropTypes.shape({}),
  summary: PropTypes.arrayOf(PropTypes.shape({})),
  tile: PropTypes.shape({}).isRequired
};

TileSummary.defaultProps = {
  headlineStyle: null,
  style: null,
  summary: null
};

export default TileSummary;
