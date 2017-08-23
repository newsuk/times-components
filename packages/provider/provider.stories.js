import React from "react";
import { Text } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { withPageState } from "@times-components/pagination";

import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface,
  IntrospectionFragmentMatcher,
  gql
} from "react-apollo";

import connectGraphql, { AuthorProfileProvider } from "./provider.js";

const Component = props =>
  <Text>
    {JSON.stringify(props, null, 2)}
  </Text>;

const query = gql`
  {
    author(slug: "fiona-hamilton") {
      name
    }
  }
`;

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

storiesOf("Provider", module).add("Provider", () => {
  const WithData = connectGraphql(query)(Component);
  return (
    <ApolloProvider client={client}>
      <WithData />
    </ApolloProvider>
  );
});

const AuthorProfileWithPageState = withPageState(AuthorProfileProvider);
storiesOf("Provider", module).add("AuthorProfileProvider", () =>
  <ApolloProvider client={client}>
    <AuthorProfileWithPageState
      generatePageLink={page => `https://www.thetimes.co.uk?page=${page}`}
      imageRatio="3:2"
      slug="fiona-hamilton"
      page={1}
      pageSize={3}
    />
  </ApolloProvider>
);
