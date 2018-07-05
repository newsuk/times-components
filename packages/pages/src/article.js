import React from "react";
import PropTypes from "prop-types";
import { ArticleProvider } from "@times-components/provider";
import Article from "@times-components/article";
import withClient from "./client/with-client";
import adTargetConfig from "./client/ad-targeting-config";

const ArticleDetailsPage = ({
  articleId,
  analyticsStream,
  platformAdConfig,
  onArticlePress,
  onAuthorPress,
  onVideoPress,
  onLinkPress,
  onTopicPress
}) => (
  <ArticleProvider id={articleId} debounceTimeMs={100}>
    {({ article, isLoading, error }) => {
      const adConfig =
        isLoading || error ? {} : adTargetConfig(platformAdConfig, article);

      return (
        <Article
          article={article}
          isLoading={isLoading}
          error={error}
          analyticsStream={analyticsStream}
          adConfig={adConfig}
          onRelatedArticlePress={(event, extras) => onArticlePress(extras.url)}
          onAuthorPress={(event, extras) => onAuthorPress(extras.slug)}
          onVideoPress={(event, info) => onVideoPress(info)}
          onLinkPress={(event, linkInfo) => {
            if (linkInfo.type === "article") {
              onArticlePress(linkInfo.url);
            } else if (linkInfo.type === "topic") {
              onTopicPress(linkInfo.url);
            } else {
              onLinkPress(linkInfo.url);
            }
          }}
          onTopicPress={(event, extras) => onTopicPress(extras.slug)}
        />
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
  onVideoPress: PropTypes.func.isRequired,
  onLinkPress: PropTypes.func.isRequired,
  onTopicPress: PropTypes.func.isRequired
};

export default withClient(ArticleDetailsPage);
