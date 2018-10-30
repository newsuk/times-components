import React from "react";
import PropTypes from "prop-types";
import { ArticleProvider } from "@times-components/provider";
import withClient from "./client/with-client";
import { propTypes, defaultProps } from "./article-prop-types";
import ArticleBase from "./article-base";

const ArticleDetailsPage = ({
  articleId,
  analyticsStream,
  platformAdConfig,
  omitErrors,
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
    {({ article, isLoading, error, refetch }) => (
      <ArticleBase
        analyticsStream={analyticsStream}
        article={article}
        error={error}
        isLoading={isLoading}
        omitErrors={omitErrors}
        onArticlePress={onArticlePress}
        onAuthorPress={onAuthorPress}
        onCommentGuidelinesPress={onCommentGuidelinesPress}
        onCommentsPress={onCommentsPress}
        onLinkPress={onLinkPress}
        onTopicPress={onTopicPress}
        onVideoPress={onVideoPress}
        platformAdConfig={platformAdConfig}
        refetch={refetch}
        scale={scale}
        sectionName={sectionName}
      />
    )}
  </ArticleProvider>
);

ArticleDetailsPage.propTypes = {
  ...propTypes,
  articleId: PropTypes.string.isRequired
};

ArticleDetailsPage.defaultProps = defaultProps;

export default withClient(ArticleDetailsPage);
