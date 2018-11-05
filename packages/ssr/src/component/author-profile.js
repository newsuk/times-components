/* eslint-disable import/no-unresolved */

const React = require("react");
const { ApolloProvider } = require("react-apollo");
const { AuthorProfileProvider } = require("@times-components/provider/rnw");
const Context = require("@times-components/context/rnw").default;
const AuthorProfile = require("@times-components/author-profile/rnw").default;

const ProfileProvider = (client, analyticsStream, data) =>
  React.createElement(
    ApolloProvider,
    { client },
    React.createElement(
      AuthorProfileProvider,
      {
        debounceTimeMs: data.debounceTime,
        page: data.page,
        pageSize: data.pageSize,
        slug: data.authorSlug
      },
      ({ author, isLoading, error, refetch }) =>
        React.createElement(
          Context.Provider,
          { value: { makeArticleUrl: data.makeArticleUrl } },
          React.createElement(AuthorProfile, {
            adConfig: data.mapProfileToAdConfig(),
            analyticsStream,
            author,
            error,
            isLoading,
            onArticlePress: () => {},
            onTwitterLinkPress: () => {},
            page: data.page,
            pageSize: data.pageSize,
            refetch,
            slug: data.authorSlug
          })
        )
    )
  );

module.exports = ProfileProvider;
