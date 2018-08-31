import React from "react";
import PropTypes from "prop-types";
import { NativeArticleProvider } from "@times-components/provider";
import { propTypes, defaultProps } from "./article-prop-types";
import SimpleArticle from "./simple-article";

const ArticleDetailsPage = ({
  articleId,
  dispose,
  fetch,
  omitErrors,
  ...props
}) => (
  <NativeArticleProvider articleId={articleId} dispose={dispose} fetch={fetch}>
    {({ data, isLoading, error, refetch }) => (
      <SimpleArticle
        {...props}
        article={data}
        error={omitErrors ? null : error}
        isLoading={isLoading || (omitErrors && error !== null)}
        refetch={refetch}
      />
    )}
  </NativeArticleProvider>
);

ArticleDetailsPage.propTypes = {
  ...propTypes,
  articleId: PropTypes.string.isRequired,
  dispose: PropTypes.func.isRequired,
  fetch: PropTypes.func.isRequired
};
ArticleDetailsPage.defaultProps = defaultProps;

export default ArticleDetailsPage;
