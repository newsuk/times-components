import React, { Component } from "react";
import { View, Platform } from "react-native";
import PropTypes from "prop-types";
import ArticleSummary, {
  ArticleSummaryContent,
  ArticleSummaryHeadline,
  ArticleSummaryStrapline
} from "@times-components/article-summary";
import { ArticleFlags } from "@times-components/article-flag";
import { colours } from "@times-components/styleguide";
import TileStar from "./tile-star";
import { horizontalStyles } from "./styles";

class TileSummary extends Component {
  constructor(props) {
    super(props);
    this.renderContent = this.renderContent.bind(this);
    this.renderFlags = this.renderFlags.bind(this);
    this.renderHeadline = this.renderHeadline.bind(this);
    this.renderStrapline = this.renderStrapline.bind(this);
  }

  renderContent() {
    const { summary, summaryStyle } = this.props;

    return <ArticleSummaryContent ast={summary} style={summaryStyle} />;
  }

  renderFlags() {
    const {
      tile: {
        article: { expirableFlags, id }
      },
      flagColour,
      isDarkStar,
      withStar,
      starStyle
    } = this.props;

    if (!withStar || Platform.OS === "ios") {
      if (expirableFlags && !expirableFlags.length) {
        return null;
      }
      return <ArticleFlags {...flagColour} flags={expirableFlags} />;
    }

    const tileStyle = starStyle || horizontalStyles;

    return (
      <View style={tileStyle.container}>
        <View style={tileStyle.flagStyle}>
          <ArticleFlags {...flagColour} flags={expirableFlags} />
        </View>
        <TileStar
          articleId={id}
          isDark={isDarkStar}
          style={tileStyle.starButton}
        />
      </View>
    );
  }

  renderHeadline() {
    const {
      tile: {
        headline: tileHeadline,
        article: { headline, shortHeadline }
      },
      headlineStyle
    } = this.props;

    return (
      <ArticleSummaryHeadline
        headline={tileHeadline || shortHeadline || headline}
        style={headlineStyle}
      />
    );
  }

  renderStrapline() {
    const { strapline, straplineStyle } = this.props;

    return (
      <ArticleSummaryStrapline strapline={strapline} style={straplineStyle} />
    );
  }

  render() {
    const {
      tile: {
        article: { hasVideo, label, section }
      },
      bylines,
      bylineStyle,
      strapline,
      style,
      summary,
      labelColour
    } = this.props;

    return (
      <ArticleSummary
        bylineProps={bylines ? { ast: bylines, bylineStyle } : null}
        content={summary ? this.renderContent : undefined}
        flags={this.renderFlags}
        headline={this.renderHeadline}
        label={label}
        labelProps={{
          color:
            labelColour ||
            (colours.section[section] || colours.section.default),
          isVideo: hasVideo,
          title: label
        }}
        strapline={strapline ? this.renderStrapline : undefined}
        style={style}
      />
    );
  }
}

TileSummary.propTypes = {
  bylineStyle: PropTypes.shape({}),
  flagColour: PropTypes.shape({}),
  headlineStyle: PropTypes.shape({}),
  isDarkStar: PropTypes.bool,
  labelColour: PropTypes.string,
  strapline: PropTypes.string,
  straplineStyle: PropTypes.shape({}),
  style: PropTypes.shape({}),
  summary: PropTypes.arrayOf(PropTypes.shape({})),
  summaryStyle: PropTypes.shape({}),
  tile: PropTypes.shape({}).isRequired,
  withStar: PropTypes.bool
};

TileSummary.defaultProps = {
  bylineStyle: null,
  flagColour: {},
  headlineStyle: null,
  isDarkStar: false,
  labelColour: null,
  strapline: null,
  straplineStyle: null,
  style: null,
  summary: null,
  summaryStyle: null,
  withStar: true
};

export default TileSummary;
