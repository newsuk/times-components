import React from "react";
import PropTypes from "prop-types";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { MockedProvider } from "@times-components/provider-test-tools";
import { fragmentMatcher } from "@times-components/utils";
import { text } from "@storybook/addon-knobs/react";

const StorybookProvider = props => {
  const nbsp = "\u00A0";
  const uri = text(
    `GraphQL${nbsp}Endpoint (leave${nbsp}empty${nbsp}for mock${nbsp}data)`,
    process.env.STORYBOOK_ENDPOINT || ""
  );

  if (uri) {
    const client = new ApolloClient({
      link: new HttpLink({
        uri,
        useGETForQueries: true,
        headers: {
          "content-type": "application/x-www-form-urlencoded"
        }
      }),
      cache: new InMemoryCache({
        fragmentMatcher
      })
    });

    return (
      <ApolloProvider client={client} debounceTimeMs={250}>
        {props.children}
      </ApolloProvider>
    );
  }

  return <MockedProvider mocks={props.mocks}>{props.children}</MockedProvider>;
};

StorybookProvider.propTypes = {
  mocks: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired
};

export default StorybookProvider;
