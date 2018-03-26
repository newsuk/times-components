import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";
import ArticleLabel from "@times-components/article-label";
import Byline, {
  articleBylinePropTypes
} from "@times-components/article-byline";
import DatePublication from "@times-components/date-publication";
import { renderTrees } from "@times-components/markup";
import summarise from "./summarise";
import renderer from "./article-summary-renderer";

import ArticleSummaryHeadline from "./article-summary-headline";
import ArticleSummaryContent from "./article-summary-content";
import styles from "./styles";

function renderAst(ast) {
  return renderTrees(summarise(ast), renderer);
}

const ArticleSummary = props => {
  const {
    labelProps,
    headline,
    content,
    datePublicationProps,
    bylineProps,
    isOpinionByline
  } = props;

  const renderByline = style => 
    <Text style={style}>
      <Byline {...bylineProps} />
    </Text>

  return (
    <View>
      {labelProps && labelProps.title ? (
        <View style={styles.labelWrapper}>
          <ArticleLabel {...labelProps} />
        </View>
      ) : null}
      {bylineProps && isOpinionByline ? (
        renderByline(styles.opinionByline)
      ) : null}
      {headline()}
      {content()}
      {datePublicationProps ? (
        <Text
          style={styles.metaText}
          accessibilityLabel="datePublication"
          testID="datePublication"
        >
          <DatePublication {...datePublicationProps} />
        </Text>
      ) : null}
      {bylineProps && !isOpinionByline ? (
        renderByline(styles.metaText)
      ) : null}
    </View>
  );
};

ArticleSummary.propTypes = {
  labelProps: PropTypes.shape({
    title: PropTypes.string.isRequired,
    color: PropTypes.string
  }),
  headline: PropTypes.func,
  content: PropTypes.func,
  bylineProps: PropTypes.shape(articleBylinePropTypes),
  datePublicationProps: PropTypes.shape({
    date: PropTypes.string,
    publication: PropTypes.string
  }),
  isOpinionByline: PropTypes.bool
};

ArticleSummary.defaultProps = {
  content: () => null,
  headline: () => null,
  bylineProps: null,
  labelProps: null,
  datePublicationProps: null,
  isOpinionByline: false
};

export {
  renderAst,
  summarise,
  renderer,
  ArticleSummaryHeadline,
  ArticleSummaryContent
};

export default ArticleSummary;
