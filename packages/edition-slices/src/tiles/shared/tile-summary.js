import React, { Component } from "react";
import PropTypes from "prop-types";
import ArticleSummary, {
  ArticleSummaryContent,
  ArticleSummaryHeadline,
  ArticleSummaryStrapline
} from "@times-components/article-summary";
import { ArticleFlags } from "@times-components/article-flag";
import { colours } from "@times-components/styleguide";

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
