import React from "react";
import { StyleSheet } from "react-native";
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from "@storybook/react-native";
import {
  NewArticleFlag,
  UpdatedArticleFlag,
  ExclusiveArticleFlag,
  SponsoredArticleFlag
} from "./article-flag";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EAFF00"
  },
  text: {
    fontSize: 12
  }
});

storiesOf("ArticleFlag", module)
  .add("ArticleFlag (New) with extra styles", () =>
    <NewArticleFlag containerStyle={styles.container} />
  )
  .add("ArticleFlag (New)", () => <NewArticleFlag />)
  .add("ArticleFlag (Updated)", () => <UpdatedArticleFlag />)
  .add("ArticleFlag (Exclusive)", () => <ExclusiveArticleFlag />)
  .add("ArticleFlag (Sponsored)", () => <SponsoredArticleFlag />);
