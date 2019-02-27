import React from "react";
import PropTypes from "prop-types";
import ArticleSummary, {
  ArticleSummaryContent,
  ArticleSummaryHeadline,
  ArticleSummaryStrapline
} from "@times-components/article-summary";
import { ArticleFlags } from "@times-components/article-flag";
import { colours } from "@times-components/styleguide";

const TileSummary = ({
  tile: {
    article: { flags, hasVideo, headline, label, section, shortHeadline }
  },
  byline,
  bylineStyle,
  headlineStyle,
  strapline,
  straplineStyle,
  style,
  summary,
  summaryStyle,
  flagColour,
  labelColour
}) => (
  <ArticleSummary
    bylineProps={byline ? { ast: byline, bylineStyle } : null}
    content={
      summary
        ? () => <ArticleSummaryContent ast={summary} style={summaryStyle} />
        : undefined
    }
    flags={() => <ArticleFlags {...flagColour} flags={flags} />}
    headline={() => (
      <ArticleSummaryHeadline
        headline={shortHeadline || headline}
        style={headlineStyle}
      />
    )}
    label={label}
    labelProps={{
      color:
        labelColour || (colours.section[section] || colours.section.default),
      isVideo: hasVideo,
      title: label
    }}
    strapline={
      strapline
        ? () => (
            <ArticleSummaryStrapline
              strapline={strapline}
              style={straplineStyle}
            />
          )
        : undefined
    }
    style={style}
  />
);

TileSummary.propTypes = {
  bylineStyle: PropTypes.shape({}),
  flagColour: PropTypes.shape({}),
  headlineStyle: PropTypes.shape({}),
  labelColour: PropTypes.string,
  strapline: PropTypes.string,
  straplineStyle: PropTypes.shape({}),
  style: PropTypes.shape({}),
  summary: PropTypes.arrayOf(PropTypes.shape({})),
  summaryStyle: PropTypes.shape({}),
  tile: PropTypes.shape({}).isRequired
};

TileSummary.defaultProps = {
  bylineStyle: null,
  flagColour: {},
  headlineStyle: null,
  labelColour: null,
  strapline: null,
  straplineStyle: null,
  style: null,
  summary: null,
  summaryStyle: null
};

export default TileSummary;
