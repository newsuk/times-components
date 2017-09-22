import React from "react";
import { Text } from "react-native";
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from "@storybook/react-native";

import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface,
  IntrospectionFragmentMatcher,
  gql
} from "react-apollo";

import connect, { AuthorProfileProvider } from "./provider.js";

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: [
        {
          kind: "UNION",
          name: "Media",
          possibleTypes: [
            {
              name: "Image"
            },
            {
              name: "Video"
            }
          ]
        }
      ]
    }
  }
});

const networkInterface = createNetworkInterface({
  uri: "http://localhost:4000/graphql/"
});

const client = new ApolloClient({
  networkInterface,
  fragmentMatcher
});

storiesOf("Provider", module).add("Default", () => {
  const query = gql`
    {
      author(slug: "fiona-hamilton") {
        name
      }
    }
  `;

  const Query = connect(query);
  return (
    <ApolloProvider client={client}>
      <Query>
        {(...props) => <Text>{JSON.stringify(props, null, 2)}</Text>}
      </Query>
    </ApolloProvider>
  );
});

storiesOf("Provider", module).add("AuthorProfileProvider", () => (
  <ApolloProvider client={client}>
    <AuthorProfileProvider
      articleImageRatio="3:2"
      slug="fiona-hamilton"
      page={1}
      pageSize={3}
    >
      {props => <Text>{JSON.stringify(props, null, 2)}</Text>}
    </AuthorProfileProvider>
  </ApolloProvider>
));
