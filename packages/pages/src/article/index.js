import React from "react";
import PropTypes from "prop-types";
import { NativeModules } from "react-native";
import { ArticleProvider } from "@times-components/provider";
import ArticleBase from "./article-base";
import { propTypes, defaultProps } from "./article-prop-types";
import withNativeProvider from "../with-native-provider";

const { refetch: refetchArticle } = NativeModules.ArticleEvents;

const ArticlePage = props => {
  const { article, articleId, error } = props;

  if (article || error) {
    const ArticlePageView = withNativeProvider(
      <ArticleBase
        {...props}
        article={article ? JSON.parse(article).data.article : null}
        error={error ? { message: error } : null}
        refetch={() => refetchArticle(articleId)}
      />
    );
    return <ArticlePageView />;
  }
  const ArticlePageView = withNativeProvider(
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
  );
  return <ArticlePageView />;
};
ArticlePage.propTypes = {
  ...propTypes,
  article: PropTypes.string,
  error: PropTypes.string
};
ArticlePage.defaultProps = defaultProps;

export default ArticlePage;
