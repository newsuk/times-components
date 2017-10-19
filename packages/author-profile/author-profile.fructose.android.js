/* globals withComponent test expect element by beforeEach */
import { StyleSheet, View } from "react-native";
import React from "react";
import AuthorProfile from "./author-profile";
import authorProfileGenerator from "./fixture-generator";

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

const story = m => (
  <View fructoseID="author profile" style={styles.background}>
    <View style={styles.container} accessibilityLabel="author-profile">
      {m}
    </View>
  </View>
);

const example = authorProfileGenerator(2);

const props = Object.assign({}, example, {
  isLoading: false,
  page: 1,
  pageSize: 10,
  onTwitterLinkPress: () => {},
  onArticlePress: () => {}
});

withComponent(
  story(<AuthorProfile {...props} />),
  "author profile",
  async fructose => {

    test(
      "renders and swipes",
      async () => {
        await fructose.loadComponent();
        await d.waitForElementByXPath('//*[@text="Fiona Hamilton"]', 10000)
        await d.flick(0, -5000);
        await d.flick(0, -5000);
        await d.waitForElementByXPath(`//*[@text="${example.author.articles.list[1].title}"]`);
      },
      10000
    );
  }
);
