import React from "react";
import PropTypes from "prop-types";
import { NativeModules } from "react-native";
import { ApolloProvider } from "react-apollo";
import { ArticleProvider } from "@times-components/provider";
import ArticleBase from "./article-base";
import { propTypes, defaultProps } from "./article-prop-types";
import client from "../apollo-client";

const { refetch: refetchArticle } = NativeModules.ArticleEvents;

const ArticleWrapper = props => {
  const { article, articleId, error } = props;

  if (article || error) {
    return (
      <ApolloProvider client={client}>
        <ArticleBase
          {...props}
          article={article ? JSON.parse(article).data.article : null}
          error={error ? { message: error } : null}
          refetch={() => refetchArticle(articleId)}
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
ArticleWrapper.propTypes = {
  ...propTypes,
  article: PropTypes.string,
  error: PropTypes.string
};
ArticleWrapper.defaultProps = defaultProps;

export default ArticleWrapper;
