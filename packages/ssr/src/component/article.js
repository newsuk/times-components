/* eslint-disable import/no-unresolved */

const React = require("react");
const { ApolloProvider } = require("react-apollo");
const { HelmetProvider } = require("react-helmet-async");
const { ArticleProvider } = require("@times-components/provider/rnw");
const Article = require("@times-components/article/rnw").default;
const {
  ContextProviderWithDefaults,
  defaults
} = require("@times-components/context/rnw");
const { scales, themeFactory } = require("@times-components/styleguide/rnw");

const scale = scales.large;

module.exports = (client, analyticsStream, data, helmetContext) => {
  const {
    articleId,
    enableNewskit,
    debounceTimeMs,
    makeArticleUrl,
    makeTopicUrl,
    mapArticleToAdConfig,
    navigationMode,
    spotAccountId,
    getCookieValue,
    userState,
    paidContentClassName,
    faviconUrl
  } = data;

  return React.createElement(
    HelmetProvider,
    { context: helmetContext },
    React.createElement(
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
            ContextProviderWithDefaults,
            {
              value: {
                getCookieValue,
                makeArticleUrl,
                makeTopicUrl,
                newskit: enableNewskit,
                theme: {
                  ...themeFactory(article.section, article.template),
                  scale: scale || defaults.theme.scale
                },
                user: userState
              }
            },
            React.createElement(Article, {
              adConfig: mapArticleToAdConfig(article),
              analyticsStream,
              article,
              error,
              isLoading,
              navigationMode,
              onAuthorPress: () => {},
              onRelatedArticlePress: () => {},
              onTopicPress: () => {},
              refetch,
              spotAccountId,
              paidContentClassName,
              faviconUrl
            })
          )
      )
    )
  );
};
