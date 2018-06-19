import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";
import ArticleByline, {
  ArticleBylineWithLinks,
  articleBylinePropTypes
} from "@times-components/article-byline";
import ArticleLabel from "@times-components/article-label";
import VideoLabel from "@times-components/video-label";
import DatePublication from "@times-components/date-publication";
import { renderTrees } from "@times-components/markup";
import ArticleSummaryContent from "./article-summary-content";
import ArticleSummaryHeadline from "./article-summary-headline";
import renderer from "./article-summary-renderer";
import styles from "./styles";
import summarise from "./summarise";

const { style: TextPropTypesStyle } = Text;

function renderAst(ast) {
  return renderTrees(summarise(ast), renderer);
}

const ArticleSummary = props => {
  const {
    bylineProps,
    content,
    datePublicationProps,
    headline,
    labelProps
  } = props;

  const renderByline = () => {
    if (bylineProps.ast.length === 0) return null;
    return (
      <Text
        className={bylineProps.bylineClass}
        style={[
          bylineProps.isOpinionByline ? styles.opinionByline : styles.metaText,
          bylineProps.bylineStyle
        ]}
      >
        {bylineProps.hasBylineLinks ? (
          <ArticleBylineWithLinks {...bylineProps} />
        ) : (
          <ArticleByline {...bylineProps} />
        )}
      </Text>
    );
  };

  const renderLabel = () => {
    if (labelProps && labelProps.title) {
      return (
        <View style={styles.labelWrapper}>
          {labelProps.isVideo ? (
            <VideoLabel {...labelProps} />
          ) : (
            <ArticleLabel {...labelProps} />
          )}
        </View>
      );
    }
    return null;
  };

  return (
    <View>
      {renderLabel()}
      {bylineProps && bylineProps.isOpinionByline ? renderByline() : null}
      {headline()}
      {content()}
      {datePublicationProps ? (
        <Text
          accessibilityLabel="datePublication"
          style={styles.metaText}
          testID="datePublication"
        >
          <DatePublication {...datePublicationProps} />
        </Text>
      ) : null}
      {bylineProps && !bylineProps.isOpinionByline ? renderByline() : null}
    </View>
  );
};

ArticleSummary.propTypes = {
  labelProps: PropTypes.shape({
    title: PropTypes.string.isRequired,
    color: PropTypes.string,
    isVideo: PropTypes.bool
  }),
  headline: PropTypes.func,
  content: PropTypes.func,
  bylineProps: PropTypes.shape({
    ...articleBylinePropTypes,
    bylineClass: PropTypes.string,
    bylineStyle: TextPropTypesStyle,
    isOpinionByline: PropTypes.bool,
    hasBylineLinks: PropTypes.bool
  }),
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
  ArticleSummaryContent,
  ArticleSummaryHeadline,
  renderAst,
  renderer,
  summarise
};

export default ArticleSummary;
