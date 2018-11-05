/* eslint-disable import/no-unresolved */

const React = require("react");
const { ApolloProvider } = require("react-apollo");
const { AuthorProfileProvider } = require("@times-components/provider/rnw");
const Context = require("@times-components/context/rnw").default;
const AuthorProfile = require("@times-components/author-profile/rnw").default;

module.exports = (client, analyticsStream, data) => {
  const {
    authorSlug,
    debounceTimeMs,
    makeArticleUrl,
    mapProfileToAdConfig,
    page,
    pageSize
  } = data;

  return React.createElement(
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
          Context.Provider,
          { value: { makeArticleUrl } },
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
  );
};
