import React from "react";
import PropTypes from "prop-types";
import Article from "@times-components/article";
import Context, { defaults } from "@times-components/context";
import { ArticleProvider } from "@times-components/provider";
import { colours } from "@times-components/styleguide";
import withClient from "./client/with-client";
import adTargetConfig from "./client/ad-targeting-config";

const ArticleDetailsPage = ({
  articleId,
  analyticsStream,
  platformAdConfig,
  onArticlePress,
  onAuthorPress,
  onCommentsPress,
  onCommentGuidelinesPress,
  onVideoPress,
  onLinkPress,
  onTopicPress,
  scale,
  sectionName: pageSection
}) => (
  <ArticleProvider debounceTimeMs={100} id={articleId}>
    {({ article, isLoading, error, refetch }) => {
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
            refetch={refetch}
          />
        </Context.Provider>
      );
    }}
  </ArticleProvider>
);

ArticleDetailsPage.propTypes = {
  articleId: PropTypes.string.isRequired,
  analyticsStream: PropTypes.func.isRequired,
  platformAdConfig: PropTypes.shape({}).isRequired,
  onArticlePress: PropTypes.func.isRequired,
  onAuthorPress: PropTypes.func.isRequired,
  onCommentsPress: PropTypes.func.isRequired,
  onCommentGuidelinesPress: PropTypes.func.isRequired,
  onVideoPress: PropTypes.func.isRequired,
  onLinkPress: PropTypes.func.isRequired,
  onTopicPress: PropTypes.func.isRequired,
  scale: PropTypes.string.isRequired,
  sectionName: PropTypes.string.isRequired
};

export default withClient(ArticleDetailsPage);
