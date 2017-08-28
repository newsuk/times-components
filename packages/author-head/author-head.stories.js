import React from "react";
import { View } from "react-native";
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from "@storybook/react-native";
import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface,
  IntrospectionFragmentMatcher
} from "react-apollo";
import AuthorHead from "./author-head";
import AuthorHeadProvider from "./author-head-provider";

const data = require("./fixtures/profile.json");

const story = m =>
  <View style={{ padding: 20 }}>
    {m}
  </View>;

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

storiesOf("Author Head", module)
  .add("Component", () => story(<AuthorHead {...data} />))
  .add("Provider", () =>
    story(
      <ApolloProvider client={client}>
        <AuthorHeadProvider slug="fiona-hamilton" />
      </ApolloProvider>
    )
  );
