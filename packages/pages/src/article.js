import React from "react";
import PropTypes from "prop-types";
import { ArticleProvider } from "@times-components/provider";
import { propTypes, defaultProps } from "./article-prop-types";
import withClient from "./client/with-client";
import SimpleArticle from "./simple-article";

const ArticleDetailsPage = ({ articleId, omitErrors, ...props }) => (
  <ArticleProvider debounceTimeMs={100} id={articleId}>
    {({ article, isLoading, error, refetch }) => (
      <SimpleArticle
        {...props}
        article={article}
        error={omitErrors ? null : error}
        isLoading={isLoading || (omitErrors && error !== null)}
        refetch={refetch}
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
