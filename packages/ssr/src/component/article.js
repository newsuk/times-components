/* eslint-disable import/no-unresolved */

const React = require("react");
const { ApolloProvider } = require("react-apollo");
const { ArticleProvider } = require("@times-components/provider/rnw");
const Article = require("@times-components/article/rnw").default;
const Context = require("@times-components/context/rnw").default;
const { scales, colours } = require("@times-components/styleguide/rnw");

const scale = scales.large;

module.exports = (client, analyticsStream, data) => {
  const {
    articleId,
    debounceTimeMs,
    makeArticleUrl,
    mapArticleToAdConfig
  } = data;

  return React.createElement(
    ApolloProvider,
    { client },
    React.createElement(
      ArticleProvider,
      {
        analyticsStream,
        debounceTimeMs,
        id: articleId
      },
      ({ article, isLoading, error, refetch }) =>
        React.createElement(
          Context.Provider,
          {
            value: {
              makeArticleUrl,
              theme: { scale, sectionColour: colours.section[article.section] }
            }
          },
          React.createElement(Article, {
            adConfig: mapArticleToAdConfig(article),
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
};
