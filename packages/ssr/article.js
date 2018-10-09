/* eslint-disable import/no-unresolved */

const React = require("react");
const { ApolloProvider } = require("react-apollo");
const { ArticleProvider } = require("@times-components/provider/rnw");
const Article = require("@times-components/article/rnw").default;
const adConfig = require("./ad-config.json");

module.exports = (client, id) =>
  React.createElement(
    ApolloProvider,
    { client },
    React.createElement(
      ArticleProvider,
      {
        debounceTimeMs: 0,
        id
      },
      ({ article, isLoading, error, refetch }) =>
        React.createElement(Article, {
          adConfig,
          analyticsStream: () => {},
          article,
          error,
          isLoading,
          onAuthorPress: () => {},
          onRelatedArticlePress: () => {},
          onTopicPress: () => {},
          refetch
        })
    )
  );
