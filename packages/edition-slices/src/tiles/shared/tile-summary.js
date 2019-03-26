import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import ArticleSummary, {
  ArticleSummaryContent,
  ArticleSummaryHeadline,
  ArticleSummaryStrapline
} from "@times-components/article-summary";
import { ArticleFlags } from "@times-components/article-flag";
import { colours } from "@times-components/styleguide";
import TileStar from "./tile-star";

const TileSummary = ({
  tile: {
    headline: tileHeadline,
    article: {
      id,
      expirableFlags,
      hasVideo,
      headline,
      label,
      section,
      shortHeadline
    }
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
    <View>
      <ArticleSummary
        bylineProps={byline ? { ast: byline, bylineStyle } : null}
        content={
          summary
            ? () => <ArticleSummaryContent ast={summary} style={summaryStyle} />
            : undefined
        }
        flags={() => <ArticleFlags {...flagColour} flags={expirableFlags} />}
        headline={() => (
          <ArticleSummaryHeadline
            headline={tileHeadline || shortHeadline || headline}
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
      <TileStar articleId={id} />
    </View>
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
