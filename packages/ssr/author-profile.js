/* eslint-disable import/no-unresolved */

const React = require("react");
const { ApolloProvider } = require("react-apollo");
const { AuthorProfileProvider } = require("@times-components/provider/rnw");
const AuthorProfile = require("@times-components/author-profile/rnw").default;

module.exports = (client, slug, page) =>
  React.createElement(
    ApolloProvider,
    { client },
    React.createElement(
      AuthorProfileProvider,
      {
        debounceTimeMs: 0,
        slug
      },
      ({ author, isLoading, error, refetch }) =>
        React.createElement(AuthorProfile, {
          adConfig: {},
          analyticsStream: () => {},
          author,
          isLoading,
          error,
          onTwitterLinkPress: () => {},
          onArticlePress: () => {},
          page,
          refetch,
          slug
        })
    )
  );
