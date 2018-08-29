import React from "react";
import PropTypes from "prop-types";
import { ArticleProvider } from "@times-components/provider";
import withClient from "./client/with-client";
import SimpleArticle from "./simple-article";

const ArticleDetailsPage = ({ articleId, ...props }) => (
  <ArticleProvider debounceTimeMs={100} id={articleId}>
    {({ article, isLoading, error, refetch }) => (
      <SimpleArticle
        {...props}
        article={article}
        error={error}
        isLoading={isLoading}
        refetch={refetch}
      />
    )}
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
