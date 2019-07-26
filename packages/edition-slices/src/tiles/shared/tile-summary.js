import React, { Component } from "react";
import PropTypes from "prop-types";
import ArticleSummary, {
  ArticleSummaryContent,
  ArticleSummaryHeadline,
  ArticleSummaryStrapline
} from "@times-components/article-summary";
import { ArticleFlags } from "@times-components/article-flag";
import { colours } from "@times-components/styleguide";
import TileStar from "./tile-star";
import {
  horizontalStyles,
  starHeadlinePaddingBottom,
  starTeaserPaddingBottom
} from "./styles";
import { isSaveSupported } from "./utils";

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
        article: { expirableFlags }
      },
      flagColour
    } = this.props;

    return <ArticleFlags {...flagColour} flags={expirableFlags} />;
  }

  renderSaveStar() {
    const {
      tile: {
        article: { id }
      },
      isDarkStar,
      starStyle
    } = this.props;

    const tileStyle = starStyle || horizontalStyles;

    return (
      <TileStar
        articleId={id}
        isDark={isDarkStar}
        style={tileStyle.starButton}
      />
    );
  }

  renderHeadline() {
    const {
      tile: {
        headline: tileHeadline,
        article: { headline, shortHeadline }
      },
      headlineStyle,
      withStar,
      summary
    } = this.props;

    const shouldAddBottomPadding = isSaveSupported && !withStar && !summary;

    return (
      <ArticleSummaryHeadline
        headline={tileHeadline || shortHeadline || headline}
        style={
          shouldAddBottomPadding
            ? [headlineStyle, starHeadlinePaddingBottom]
            : headlineStyle
        }
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
        article: { hasVideo, label, section, expirableFlags }
      },
      bylines,
      bylineStyle,
      strapline,
      style,
      summary,
      withStar,
      labelColour
    } = this.props;

    const shouldAddBottomPadding =
      isSaveSupported &&
      !withStar &&
      expirableFlags &&
      expirableFlags.length === 0;

    return (
      <ArticleSummary
        bylineProps={bylines ? { ast: bylines, bylineStyle } : null}
        content={summary ? this.renderContent() : undefined}
        flags={this.renderFlags()}
        headline={this.renderHeadline()}
        label={label}
        labelProps={{
          color:
            labelColour ||
            (colours.section[section] || colours.section.default),
          isVideo: hasVideo,
          title: label
        }}
        strapline={strapline ? this.renderStrapline() : undefined}
        saveStar={withStar && isSaveSupported && this.renderSaveStar()}
        style={
          shouldAddBottomPadding ? [starTeaserPaddingBottom, style] : style
        }
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
  withStar: false
};

export default TileSummary;
