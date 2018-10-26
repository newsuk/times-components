/* eslint-disable import/no-unresolved */

const React = require("react");
const { ApolloProvider } = require("react-apollo");
const { AuthorProfileProvider } = require("@times-components/provider/rnw");
const Context = require("@times-components/context/rnw").default;
const AuthorProfile = require("@times-components/author-profile/rnw").default;

module.exports = (client, analyticsStream, props) =>
  React.createElement(
    ApolloProvider,
    { client },
    React.createElement(
      AuthorProfileProvider,
      {
        debounceTimeMs: props.debounceTimeMs,
        page: props.page,
        pageSize: props.pageSize,
        slug: props.slug
      },
      ({ author, isLoading, error, refetch }) =>
        React.createElement(
          Context.Provider,
          { value: { makeArticleUrl: props.makeArticleUrl } },
          React.createElement(AuthorProfile, {
            adConfig: props.mapProfileToAdConfig(),
            analyticsStream,
            author,
            debounceTimeMs: props.debounceTimeMs,
            error,
            isLoading,
            onArticlePress: () => {},
            onTwitterLinkPress: () => {},
            page: props.page,
            pageSize: props.pageSize,
            refetch,
            slug: props.slug,
          })
        )
    )
  );
