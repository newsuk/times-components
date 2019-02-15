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
    content={
      summary
        ? () => <ArticleSummaryContent ast={summary} style={summaryStyle} />
        : undefined
    }
    flags={() => <ArticleFlags color={flagColour} flags={flags} />}
    headline={() => (
      <ArticleSummaryHeadline
        headline={headline || shortHeadline}
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
  flagColour: PropTypes.string,
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
  flagColour: null,
  headlineStyle: null,
  labelColour: null,
  strapline: null,
  straplineStyle: null,
  style: null,
  summary: null,
  summaryStyle: null
};

export default TileSummary;
