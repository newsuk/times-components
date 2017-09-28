import React from "react";
import get from "lodash.get";
import { StyleSheet, View } from "react-native";
import Card from "@times-components/card";
import Link from "@times-components/link";

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10
  }
});

const AuthorProfileItem = item => {
  const {
    title,
    content,
    publishedTime,
    label,
    publicationName,
    url,
    onPress
  } = item;
  const imageUri = get(
    item,
    "leadAsset.crop.url",
    get(item, "leadAsset.posterImage.crop.url", null)
  );

  return (
    <Link url={url} onPress={onPress}>
      <View style={styles.container}>
        <Card
          headline={title}
          text={content}
          image={imageUri ? { uri: imageUri } : null}
          date={publishedTime}
          label={label}
          publication={publicationName}
        />
      </View>
    </Link>
  );
};

export default AuthorProfileItem;
