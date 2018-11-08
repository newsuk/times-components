import React from "react";
import { NativeModules } from "react-native";
import Article from "@times-components/article";
import Context, { defaults } from "@times-components/context";
import { colours } from "@times-components/styleguide";
import adTargetConfig from "./ad-targeting-config";
import { propTypes, defaultProps } from "./article-prop-types";
import filterInteractives from "./filter-interactives";

const { track } = NativeModules.ReactAnalytics;
const {
  onArticlePress,
  onArticleLoaded,
  onAuthorPress,
  onCommentsPress,
  onCommentGuidelinesPress,
  onLinkPress,
  onTopicPress,
  onVideoPress
} = NativeModules.ArticleEvents;

const ArticleBase = ({
  adTestMode,
  article,
  error,
  isLoading,
  refetch,
  omitErrors,
  scale,
  sectionName: pageSection,
  showInteractives
}) => {
  const articleSection = article ? article.section : null;
  const adConfig =
    isLoading || error
      ? {}
      : adTargetConfig({
          adTestMode,
          article,
          sectionName: pageSection || articleSection
        });
  const theme = {
    scale: scale || defaults.theme.scale,
    sectionColour: colours.section[pageSection || articleSection]
  };

  return (
    <Context.Provider value={{ theme }}>
      <Article
        adConfig={adConfig}
        analyticsStream={event => {
          if (event.object === "Article" && event.action === "Viewed") {
            onArticleLoaded(event.attrs.articleId, event);
          } else {
            track(event);
          }
        }}
        article={showInteractives ? article : filterInteractives(article)}
        error={omitErrors ? null : error}
        isLoading={isLoading || (omitErrors && error)}
        onAuthorPress={(event, { slug }) => onAuthorPress(slug)}
        onCommentGuidelinesPress={() => onCommentGuidelinesPress()}
        onCommentsPress={(event, { articleId: id, url }) =>
          onCommentsPress(id, url)
        }
        onLinkPress={(event, { type, url }) => {
          if (type === "article") {
            onArticlePress(url);
          } else if (type === "topic") {
            onTopicPress(url);
          } else {
            onLinkPress(url);
          }
        }}
        onRelatedArticlePress={(event, { url }) => onArticlePress(url)}
        onTopicPress={(event, { slug }) => onTopicPress(slug)}
        onTwitterLinkPress={(_, { url }) => onLinkPress(url)}
        onVideoPress={(event, info) => onVideoPress(info)}
        pageSection={pageSection}
        refetch={refetch}
      />
    </Context.Provider>
  );
};

ArticleBase.propTypes = propTypes;
ArticleBase.defaultProps = defaultProps;

export default ArticleBase;
