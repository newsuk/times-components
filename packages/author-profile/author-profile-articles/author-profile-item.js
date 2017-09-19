import React from "react";
import get from "lodash.get";
import { StyleSheet, View } from "react-native";
import Card from "@times-components/card";

const styles = StyleSheet.create({
  container: {
    paddingBottom: 8,
    paddingTop: 8,
    paddingLeft: 8,
    paddingRight: 8
  }
});

const AuthorProfileItem = item => {
  const props = {
    date: item.publishedTime,
    headline: item.title,
    image: {
      uri: get(
        item,
        "leadAsset.crop.url",
        get(item, "leadAsset.posterImage.crop.url", null)
      )
    },
    text: item.content,
    label: item.label,
    publication: item.publicationName
  };

  return (
    <View style={styles.container}>
      <Card {...props} />
    </View>
  );
};

export default AuthorProfileItem;
