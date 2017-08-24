import React from "react";
import { StyleSheet, View } from "react-native";
import Card from "@times-components/card";

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10
  }
});

const AuthorProfileItem = item => {
  const props = {
    date: item.publishedTime,
    headline: item.title,
    image: {
      uri:
        (item.leadAsset && item.leadAsset.crop && item.leadAsset.crop.url) ||
        null
    },
    text: item.teaser,
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
