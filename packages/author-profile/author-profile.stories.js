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
})

storiesOf("AuthorProfile", module).add("AuthorProfile", () =>
  <View style={styles.background}>
    <View style={styles.container}>
      <AuthorProfile
        name={example.name}
        jobTitle={example.jobTitle}
        biography={example.biography}
        image={example.image}
        twitter={example.twitter}
        articleCount={example.articles.count}
        currentPageOfArticles={example.articles.list}
        currentPageOffset={0}
        pageSize={10}
      />
    </View>
  </View>
);
