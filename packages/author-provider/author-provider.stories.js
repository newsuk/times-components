import React from "react";
import { storiesOf } from "@storybook/react-native";
import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface,
  IntrospectionFragmentMatcher
} from "react-apollo";

import AuthorProvider from "./author-provider";

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

storiesOf("AuthorProvider", module).add("AuthorProvider", () =>
  <ApolloProvider client={client}>
    <AuthorProvider
      slug="fiona-hamilton"
      page={1}
      pageSize={10}
      imageRatio="3:2"
    />
  </ApolloProvider>
);
