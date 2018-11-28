import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";
import ArticleByline, {
  ArticleBylineWithLinks
} from "@times-components/article-byline";
import ArticleLabel from "@times-components/article-label";
import VideoLabel from "@times-components/video-label";
import DatePublication from "@times-components/date-publication";
import renderTrees from "@times-components/markup-forest";
import ArticleSummaryContent from "./article-summary-content";
import ArticleSummaryHeadline from "./article-summary-headline";
import renderer from "./article-summary-renderer";
import styles from "./styles";
import summarise from "./summarise";

const articleBylinePropTypes = ArticleByline.propTypes;
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
        <Text style={styles.metaText} testID="datePublication">
          <DatePublication {...datePublicationProps} />
        </Text>
      ) : null}
      {bylineProps && !bylineProps.isOpinionByline ? renderByline() : null}
    </View>
  );
};

ArticleSummary.propTypes = {
  bylineProps: PropTypes.shape({
    ...articleBylinePropTypes,
    bylineClass: PropTypes.string,
    bylineStyle: TextPropTypesStyle,
    hasBylineLinks: PropTypes.bool,
    isOpinionByline: PropTypes.bool
  }),
  content: PropTypes.func,
  datePublicationProps: PropTypes.shape({
    date: PropTypes.string,
    publication: PropTypes.string
  }),
  headline: PropTypes.func,
  isOpinionByline: PropTypes.bool,
  labelProps: PropTypes.shape({
    color: PropTypes.string,
    isVideo: PropTypes.bool,
    title: PropTypes.string
  })
};

ArticleSummary.defaultProps = {
  bylineProps: null,
  content: () => null,
  datePublicationProps: null,
  headline: () => null,
  isOpinionByline: false,
  labelProps: null
};

export {
  ArticleSummaryContent,
  ArticleSummaryHeadline,
  renderAst,
  renderer,
  summarise
};

export default ArticleSummary;
