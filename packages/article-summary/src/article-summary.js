import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";
import ArticleByline, {
  ArticleBylineOpinion,
  articleBylinePropTypes
} from "@times-components/article-byline";
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

  if (!title) {
    return null;
  }

  return (
    <View style={styles.labelWrapper}>
      {isVideo ? <VideoLabel {...props} /> : <ArticleLabel {...props} />}
    </View>
  );
}

function Byline(props) {
  const { ast, isOpinionByline, bylineClass } = props;

  if (!ast || ast.length === 0) return null;

  const BylineComponent = isOpinionByline
    ? ArticleBylineOpinion
    : ArticleByline;

  return (
    <Text>
      <BylineComponent {...props} className={bylineClass} />
    </Text>
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
    <View style={style}>
      {labelProps ? <Label {...labelProps} /> : null}
      {isOpinionByline && byline}
      {headline}
      {strapline}
      {tabletFlags}
      {content}
      {mobileFlags}
      {saveStar}
      {datePublicationProps ? (
        <Text style={styles.metaText} testID="datePublication">
          <DatePublication {...datePublicationProps} />
        </Text>
      ) : null}
      {!isOpinionByline && byline}
    </View>
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
