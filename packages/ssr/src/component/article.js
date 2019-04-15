/* eslint-disable import/no-unresolved */

const React = require("react");
const { ApolloProvider } = require("react-apollo");
const { ArticleProvider } = require("@times-components/provider/rnw");
const Article = require("@times-components/article/rnw").default;
const { default: Context, defaults } = require("@times-components/context/rnw");
const { scales, themeFactory } = require("@times-components/styleguide/rnw");

const scale = scales.large;

module.exports = (client, analyticsStream, data) => {
  const {
    articleId,
    debounceTimeMs,
    makeArticleUrl,
    mapArticleToAdConfig,
    spotAccountId
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
              theme: {
                ...themeFactory(article.section, article.template),
                scale: scale || defaults.theme.scale
              }
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
            refetch,
            spotAccountId
          })
        )
    )
  );
};
