import React from "react";
import { StyleSheet, View } from "react-native";
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  ApolloClient,
  ApolloProvider,
  createBatchingNetworkInterface,
  IntrospectionFragmentMatcher
} from "react-apollo";
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from "@storybook/react-native";
import AuthorProfile from "./author-profile";

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#f5efeb",
    alignItems: "center"
  },
  container: {
    backgroundColor: "#fff",
    alignSelf: "stretch"
  }
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

const networkInterface = createBatchingNetworkInterface({
  uri: "http://localhost:4000/graphql/",
  batchInterval: 20
});

const client = new ApolloClient({
  networkInterface,
  fragmentMatcher
});

const story = m => (
  <View style={styles.background}>
    <View style={styles.container}>
      <ApolloProvider client={client}>{m}</ApolloProvider>
    </View>
  </View>
);

storiesOf("Author Profile", module).add("Default", () => {
  const props = {
    slug: "fiona-hamilton",
    imageRatio: "3:2"
  };

  return story(<AuthorProfile {...props} />);
});
