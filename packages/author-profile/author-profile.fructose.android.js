/* globals withComponent test driver */
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
        await driver.resetApp();
        await global.driver.waitForElementsByXPath(
          '//*[@text="Fructose"]',
          global.asserter.isVisible,
          10000
        );    
        await fructose.loadComponent();
        await driver.waitForElementByXPath(
          '//*[@text="Fiona Hamilton"]',
          10000
        );
        await driver.flick(0, -5000);
        await driver.flick(0, -5000);
        await driver.waitForElementByXPath(
          `//*[@text="${example.author.articles.list[1].title}"]`
        );
      },
      10000
    );
  }
);
