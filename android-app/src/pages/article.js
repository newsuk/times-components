import React from "react";
import { NativeModules } from "react-native";
import { Article } from "@times-components/pages";
import adConfig from "../ad-config";
import articlePropTypes from "../article-prop-types";

const config = NativeModules.ReactConfig;
const { fetch } = NativeModules.NativeFetch;
const { track } = NativeModules.ReactAnalytics;
const {
  onArticlePress,
  onAuthorPress,
  onCommentsPress,
  onCommentGuidelinesPress,
  onLinkPress,
  onTopicPress,
  onVideoPress
} = NativeModules.ArticleEvents;

const ArticlePageView = Article(config)(fetch);

const ArticleView = ({ articleId, omitErrors, scale, sectionName }) => {
  const platformAdConfig = adConfig(config, sectionName);

  return (
    <ArticlePageView
      articleId={articleId}
      analyticsStream={track}
      omitErrors={omitErrors}
      onArticlePress={onArticlePress}
      onAuthorPress={onAuthorPress}
      onCommentsPress={onCommentsPress}
      onCommentGuidelinesPress={onCommentGuidelinesPress}
      onLinkPress={onLinkPress}
      onVideoPress={onVideoPress}
      onTopicPress={onTopicPress}
      platformAdConfig={platformAdConfig}
      scale={scale}
      section={sectionName}
    />
  );
};

ArticleView.propTypes = articlePropTypes;

export default ArticleView;
