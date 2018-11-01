import React from "react";
import { ApolloProvider } from "react-apollo";
import { ArticleProvider } from "@times-components/provider";
import ArticleBase from "./article-base";
import { propTypes, defaultProps } from "./article-prop-types";
import client from "../apollo-client";

const ArticleWrapper = props => {
  const { article, articleId, error } = props;

  if (article || error) {
    return (
      <ApolloProvider client={client}>
        <ArticleBase
          {...props}
          article={article ? JSON.parse(article).data.article : null}
          error={error ? { message: error } : null}
        />
      </ApolloProvider>
    );
  }
  return (
    <ApolloProvider client={client}>
      <ArticleProvider debounceTimeMs={100} id={articleId}>
        {({ article: articleData, isLoading, error: errorData, refetch }) => (
          <ArticleBase
            {...props}
            article={articleData}
            error={errorData}
            isLoading={isLoading}
            refetch={refetch}
          />
        )}
      </ArticleProvider>
    </ApolloProvider>
  );
};
ArticleWrapper.propTypes = propTypes;
ArticleWrapper.defaultProps = defaultProps;

export default ArticleWrapper;
