import React from "react";
import { StyleSheet, View } from "react-native";
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from "@storybook/react-native";
import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface,
  IntrospectionFragmentMatcher
} from "react-apollo";
import Provider, { Component as AuthorProfile } from "./author-profile";
import example from "./example.json";

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

const story = m =>
  <View style={styles.background}>
    <View style={styles.container}>
      {m}
    </View>
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

storiesOf("Author Profile", module)
  .add("Component", () => {
    const props = {
      data: Object.assign({}, example, {
        count: example.articles.count,
        pageSize: 10,
        page: 1
      }),
      isLoading: false
    };

    props.data.articles.list.forEach(article => {
      // eslint-disable-next-line
      article.publishedTime = new Date(article.publishedTime);
    });

    return story(<AuthorProfile {...props} />);
  })
  .add("Loading", () => {
    const props = {
      isLoading: true
    };

    return story(<AuthorProfile {...props} />);
  })
  .add("Empty", () => {
    const props = {
      isLoading: false
    };

    return story(<AuthorProfile {...props} />);
  })
  .add("Provider", () =>
    story(
      <ApolloProvider client={client}>
        <Provider slug="fiona-hamilton" imageRatio="3:2" />
      </ApolloProvider>
    )
  );
