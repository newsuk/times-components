import React from "react";
import PropTypes from "prop-types";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { fragmentMatcher } from "@times-components/schema";
import { text } from "@storybook/addon-knobs/react";

const StorybookProvider = props => {
  const nbsp = "\u00A0";
  const uri = text(
    `GraphQL${nbsp}Endpoint`,
    process.env.STORYBOOK_ENDPOINT || ""
  );

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
};

StorybookProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired
};

export default StorybookProvider;
