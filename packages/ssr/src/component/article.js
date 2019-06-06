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
const { StickyProvider } = require("@times-components/sticky/rnw");
const { scales, themeFactory } = require("@times-components/styleguide/rnw");

const scale = scales.large;

module.exports = (client, analyticsStream, data, helmetContext) => {
  const {
    articleId,
    debounceTimeMs,
    makeArticleUrl,
    makeTopicUrl,
    mapArticleToAdConfig,
    spotAccountId,
    getCookieValue,
    userState,
    paidContentClassName
  } = data;

  return React.createElement(
    StickyProvider,
    {},
    React.createElement(
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
                onAuthorPress: () => {},
                onRelatedArticlePress: () => {},
                onTopicPress: () => {},
                refetch,
                spotAccountId,
                paidContentClassName
              })
            )
        )
      )
    )
  );
};
