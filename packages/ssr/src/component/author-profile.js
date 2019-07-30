/* eslint-disable import/no-unresolved */

const React = require("react");
const { ApolloProvider } = require("react-apollo");
const { HelmetProvider } = require("react-helmet-async");
const { AuthorProfileProvider } = require("@times-components/provider/rnw");
const {
  ContextProviderWithDefaults
} = require("@times-components/context/rnw");
const AuthorProfile = require("@times-components/author-profile/rnw").default;

module.exports = (client, analyticsStream, data, helmetContext) => {
  const {
    authorSlug,
    debounceTimeMs,
    makeArticleUrl,
    makeTopicUrl,
    mapProfileToAdConfig,
    page,
    pageSize
  } = data;

  return React.createElement(
    HelmetProvider,
    { context: helmetContext },
    React.createElement(
      ApolloProvider,
      { client },
      React.createElement(
        AuthorProfileProvider,
        {
          debounceTimeMs,
          page,
          pageSize,
          slug: authorSlug
        },
        ({ author, isLoading, error, refetch }) =>
          React.createElement(
            ContextProviderWithDefaults,
            { value: { makeArticleUrl, makeTopicUrl } },
            React.createElement(AuthorProfile, {
              adConfig: mapProfileToAdConfig(),
              analyticsStream,
              author,
              error,
              isLoading,
              onArticlePress: () => {},
              onTwitterLinkPress: () => {},
              page,
              pageSize,
              refetch,
              slug: authorSlug
            })
          )
      )
    )
  );
};
