import React from "react";
import { Text } from "react-native";
import { storiesOf } from "@storybook/react-native";
import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface,
  IntrospectionFragmentMatcher,
  gql
} from "react-apollo";

import { withApolloProvider } from "storybook-addon-apollo-graphql";

import connectGraphql, { AuthorProfileProvider } from "./provider.js";

const Component = props => <Text>{JSON.stringify(props, null, 2)}</Text>;

const schema = `
    type Query {
        random: Int!
    }
`;

const root = {
  random: () => Math.floor(Math.random() * 10)
};

const query = gql`{ random }`;

storiesOf("Provider", module)
  .addDecorator(withApolloProvider({ schema, root }))
  .add("Provider", () => {
    const WithData = connectGraphql(query)(Component);
    return <WithData />;
  });

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

storiesOf("Provider", module).add("AuthorProfileProvider", () =>
  <ApolloProvider client={client}>
    <AuthorProfileProvider
      slug="fiona-hamilton"
      page={1}
      pageSize={10}
      imageRatio="3:2"
    />
  </ApolloProvider>
);
