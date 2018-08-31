import React from "react";
import PropTypes from "prop-types";
import Article from "@times-components/article";
import Context, { defaults } from "@times-components/context";
import { colours } from "@times-components/styleguide";
import adTargetConfig from "./client/ad-targeting-config";
import { propTypes, defaultProps } from "./article-prop-types";

const SimpleArticle = ({
  article,
  isLoading,
  error,
  analyticsStream,
  onArticlePress,
  onAuthorPress,
  onCommentsPress,
  onCommentGuidelinesPress,
  onVideoPress,
  onLinkPress,
  onTopicPress,
  platformAdConfig,
  refetch,
  scale,
  sectionName: pageSection
}) => {
  const adConfig =
    isLoading || error ? {} : adTargetConfig(platformAdConfig, article);
  const articleSection = article ? article.section : null;
  const theme = {
    scale: scale || defaults.theme.scale,
    sectionColour: colours.section[pageSection || articleSection]
  };

  return (
    <Context.Provider value={{ theme }}>
      <Article
        adConfig={adConfig}
        analyticsStream={analyticsStream}
        article={article}
        error={error}
        isLoading={isLoading}
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

SimpleArticle.propTypes = {
  ...propTypes,
  article: PropTypes.shape({}),
  error: PropTypes.shape({}),
  isLoading: PropTypes.bool
};

SimpleArticle.defaultProps = {
  ...defaultProps,
  article: null,
  error: null,
  isLoading: false
};

export default SimpleArticle;
