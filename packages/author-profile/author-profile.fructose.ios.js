/* globals withComponent test expect element by beforeEach device */
import { StyleSheet, View } from "react-native";
import React from "react";
import AuthorProfileContent from "./author-profile-content";
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
    <View style={styles.container} testID="author-profile">
      {m}
    </View>
  </View>
);

const example = authorProfileGenerator(2);
const props = {
  ...example.author,
  page: 1,
  pageSize: 10,
  count: example.author.articles.count,
  articles: example.author.articles.list,
  onTwitterLinkPress: () => {},
  onArticlePress: () => {}
};

withComponent(
  story(<AuthorProfileContent {...props} />),
  "author profile",
  async fructose => {
    beforeEach(async () => {
      await device.launchApp({ newInstance: true });
      await fructose.loadComponent();
    });

    test(
      "renders and swipes",
      async () => {
        await expect(element(by.text(example.author.name))).toBeVisible();
        await element(by.id("scroll-view")).swipe("up", "fast");
        await expect(
          element(by.text(example.author.articles.list[1].title))
        ).toBeVisible();
      },
      10000
    );
  }
);
