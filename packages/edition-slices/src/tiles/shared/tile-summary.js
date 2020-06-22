import React, { Component } from "react";
import PropTypes from "prop-types";
import ArticleSummary, {
  ArticleSummaryContent,
  ArticleSummaryHeadline,
  ArticleSummaryStrapline
} from "@times-components/article-summary";
import { ArticleFlags } from "@times-components/article-flag";
import { colours } from "@times-components/styleguide";
import { ResponsiveContext } from "@times-components/responsive";
import PositionedTileStar from "./positioned-tile-star";

class TileSummary extends Component {
  constructor(props) {
    super(props);
    this.renderContent = this.renderContent.bind(this);
    this.renderFlags = this.renderFlags.bind(this);
    this.renderHeadline = this.renderHeadline.bind(this);
    this.renderStrapline = this.renderStrapline.bind(this);
  }

  renderContent() {
    const {
      summary,
      summaryStyle,
      whiteSpaceHeight,
      linesOfTeaserToRender
    } = this.props;

    return (
      <ArticleSummaryContent
        ast={summary}
        style={summaryStyle}
        whiteSpaceHeight={whiteSpaceHeight}
        initialLines={linesOfTeaserToRender}
      />
    );
  }

  renderFlags() {
    const {
      tile: {
        article: { expirableFlags, longRead }
      },
      flagColour,
      flagsStyle
    } = this.props;

    return (
      <ArticleFlags
        {...flagColour}
        style={flagsStyle}
        flags={expirableFlags}
        longRead={longRead}
      />
    );
  }

  renderSaveStar() {
    const {
      tile: {
        article: { id }
      },
      underneathTextStar,
      centeredStar,
      isDarkStar,
      starStyle
    } = this.props;

    return (
      <PositionedTileStar
        articleId={id}
        isDarkStar={isDarkStar}
        centeredStar={centeredStar}
        underneathTextStar={underneathTextStar}
        style={starStyle}
      />
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
      withStar,
      labelColour
    } = this.props;
    return (
      <ResponsiveContext.Consumer>
        {({ isTablet }) => (
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
            saveStar={withStar && this.renderSaveStar()}
            style={style}
            isTablet={isTablet}
          />
        )}
      </ResponsiveContext.Consumer>
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
  tile: PropTypes.shape({}).isRequired,
  withStar: PropTypes.bool,
  underneathTextStar: PropTypes.bool,
  centeredStar: PropTypes.bool,
  isDarkStar: PropTypes.bool,
  starStyle: PropTypes.shape({})
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
  summaryStyle: null,
  withStar: true,
  underneathTextStar: false,
  centeredStar: false,
  isDarkStar: false,
  starStyle: null
};

export default TileSummary;
