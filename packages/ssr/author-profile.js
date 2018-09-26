/* eslint-disable import/no-unresolved */

const React = require("react");
const { ApolloProvider } = require("react-apollo");
const { AuthorProfileProvider } = require("@times-components/provider/rnw");
const Context = require("@times-components/context/rnw").default;
const { scales } = require("@times-components/styleguide/rnw");
const AuthorProfile = require("@times-components/author-profile/rnw").default;
const makeArticleUrl = require("./make-url");

const scale = scales.large;
const sectionColour = "#FFFFFF";

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
        React.createElement(
          Context.Provider,
          { value: { makeArticleUrl, theme: { scale, sectionColour } } },
          React.createElement(AuthorProfile, {
            adConfig: {},
            analyticsStream: () => {},
            author,
            error,
            isLoading,
            onArticlePress: () => {},
            onTwitterLinkPress: () => {},
            page,
            refetch,
            slug
          })
        )
    )
  );
