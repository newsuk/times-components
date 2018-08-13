import React from "react";
import PropTypes from "prop-types";
import Article from "@times-components/article";
import Context, { defaults } from "@times-components/context";
import { ArticleProvider } from "@times-components/provider";
import { colours } from "@times-components/styleguide";
import withClient from "./client/with-client";
import adTargetConfig from "./client/ad-targeting-config";

const pickSectionColour = (sectionName, article) =>
  colours.section[sectionName] ||
  (article ? colours.section[article.section] : undefined);

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
  sectionName
}) => (
  <ArticleProvider debounceTimeMs={100} id={articleId}>
    {({ article, isLoading, error }) => {
      const adConfig =
        isLoading || error ? {} : adTargetConfig(platformAdConfig, article);
      const theme = {
        scale: scale || defaults.theme.scale,
        sectionColour: pickSectionColour(sectionName, article)
      };

      return (
        <Context.Provider value={{ theme }}>
          <Article
            adConfig={adConfig}
            analyticsStream={analyticsStream}
            article={article}
            error={error}
            isLoading={isLoading}
            onAuthorPress={(event, extras) => onAuthorPress(extras.slug)}
            onCommentGuidelinesPress={() => onCommentGuidelinesPress()}
            onCommentsPress={(event, extras) =>
              onCommentsPress(extras.articleId, extras.url)
            }
            onLinkPress={(event, linkInfo) => {
              if (linkInfo.type === "article") {
                onArticlePress(linkInfo.url);
              } else if (linkInfo.type === "topic") {
                onTopicPress(linkInfo.url);
              } else {
                onLinkPress(linkInfo.url);
              }
            }}
            onRelatedArticlePress={(event, extras) =>
              onArticlePress(extras.url)
            }
            onTopicPress={(event, extras) => onTopicPress(extras.slug)}
            onVideoPress={(event, info) => onVideoPress(info)}
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
