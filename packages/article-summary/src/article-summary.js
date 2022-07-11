import React from "react";
import PropTypes from "prop-types";
import ArticleByline, {
  ArticleBylineOpinion,
  articleBylinePropTypes
} from "@times-components/article-byline";
import { TcText, TcView, checkStylesForUnits } from "@times-components/utils";
import ArticleLabel from "@times-components/article-label";
import VideoLabel from "@times-components/video-label";
import DatePublication from "@times-components/date-publication";
import renderTrees from "@times-components/markup-forest";
import ArticleSummaryContent from "./article-summary-content";
import ArticleSummaryHeadline from "./article-summary-headline";
import ArticleSummaryStrapline from "./article-summary-strapline";
import renderer from "./article-summary-renderer";
import styles from "./styles";
import summarise from "./summarise";

function renderAst(ast) {
  return renderTrees(summarise(ast), renderer);
}

function Label(props) {
  const { title, isVideo } = props;

  if (!title && !isVideo) {
    return null;
  }

  return (
    <TcView style={styles.labelWrapper}>
      {isVideo ? <VideoLabel {...props} /> : <ArticleLabel {...props} />}
    </TcView>
  );
}

function Byline(props) {
  const { ast, isOpinionByline, bylineClass } = props;

  if (!ast || ast.length === 0) return null;

  const BylineComponent = isOpinionByline
    ? ArticleBylineOpinion
    : ArticleByline;

  return (
    <TcText>
      <BylineComponent {...props} className={bylineClass} />
    </TcText>
  );
}

function ArticleSummary(props) {
  const {
    bylineProps,
    content,
    datePublicationProps,
    flags,
    headline,
    labelProps,
    style,
    strapline,
    saveStar,
    isTablet
  } = props;

  const { isOpinionByline = false } = bylineProps || {};
  const byline = bylineProps ? <Byline {...bylineProps} /> : null;
  const tabletFlags = isTablet && flags;
  const mobileFlags = !isTablet && flags;

  return (
    <TcView style={style}>
      {labelProps ? <Label {...labelProps} /> : null}
      {isOpinionByline && byline}
      {headline}
      {strapline}
      {tabletFlags}
      {content}
      {mobileFlags}
      {saveStar}
      {datePublicationProps ? (
        <TcText
          style={checkStylesForUnits(styles.metaText)}
          testID="datePublication"
        >
          <DatePublication {...datePublicationProps} />
        </TcText>
      ) : null}
      {!isOpinionByline && byline}
    </TcView>
  );
}

ArticleSummary.propTypes = {
  bylineProps: PropTypes.shape({
    ...articleBylinePropTypes,
    bylineClass: PropTypes.string,
    isOpinionByline: PropTypes.bool
  }),
  content: PropTypes.node,
  datePublicationProps: PropTypes.shape({
    date: PropTypes.string,
    publication: PropTypes.string
  }),
  flags: PropTypes.node,
  headline: PropTypes.node,
  labelProps: PropTypes.shape({
    color: PropTypes.string,
    isVideo: PropTypes.bool,
    title: PropTypes.string
  }),
  strapline: PropTypes.node,
  style: PropTypes.shape({})
};

ArticleSummary.defaultProps = {
  bylineProps: null,
  content: null,
  datePublicationProps: null,
  flags: null,
  headline: null,
  labelProps: null,
  strapline: null,
  style: null
};

export {
  ArticleSummaryContent,
  ArticleSummaryHeadline,
  ArticleSummaryStrapline,
  renderAst,
  renderer,
  summarise
};

export default ArticleSummary;
