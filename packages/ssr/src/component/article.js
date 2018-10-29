/* eslint-disable import/no-unresolved */

const React = require("react");
const { ApolloProvider } = require("react-apollo");
const { ArticleProvider } = require("@times-components/provider/rnw");
const Article = require("@times-components/article/rnw").default;
const Context = require("@times-components/context/rnw").default;
const { scales } = require("@times-components/styleguide/rnw");
const makeArticleUrl = require("../lib/make-url");

const scale = scales.large;
const sectionColour = "#FFFFFF";

module.exports = (client, analyticsStream, data) =>
  React.createElement(
    ApolloProvider,
    { client },
    React.createElement(
      ArticleProvider,
      {
        analyticsStream,
        debounceTimeMs: data.debounceTimeMs,
        id: data.id
      },
      ({ article, isLoading, error, refetch }) =>
        React.createElement(
          Context.Provider,
          { value: { makeArticleUrl, theme: { scale, sectionColour } } },
          React.createElement(Article, {
            adConfig: data.mapArticleToAdConfig(),
            analyticsStream,
            article,
            error,
            isLoading,
            onAuthorPress: () => {},
            onRelatedArticlePress: () => {},
            onTopicPress: () => {},
            refetch
          })
        )
    )
  );
