import React from "react";
import { StyleSheet, View } from "react-native";
import { storiesOf } from "@storybook/react-native";
import AuthorProfile from "./author-profile";
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

storiesOf("AuthorProfile", module)
  .add("AuthorProfile", () => {
    const props = {
      pageSize: 10,
      page: 1,
      data: {
        loading: false,
        author: example
      }
    };

    return story(<AuthorProfile {...props} />);
  })
  .add("AuthorProfile Loading", () => {
    const props = {
      pageSize: 10,
      page: 1,
      data: {
        loading: true
      }
    };

    return story(<AuthorProfile {...props} />);
  })
  .add("AuthorProfile Empty State", () => {
    const props = {
      pageSize: 10,
      page: 1,
      data: {
        loading: false
      }
    };

    return story(<AuthorProfile {...props} />);
  });
