import React from "react";
import get from "lodash.get";
import { StyleSheet, View } from "react-native";
import Card from "@times-components/card";
import Link from "@times-components/link";
import ArticleSummary from "@times-components/article-summary";

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
    paddingTop: 10
  }
});

const RelatedArticles = item => {
  const {
    style,
    summary,
    label,
    onPress,
    publicationName,
    publishedTime,
    headline,
    url
  } = item;

  const imageUri = get(
    item,
    "leadAsset.crop.url",
    get(item, "leadAsset.posterImage.crop.url", null)
  );

  const cardProps = {
    imageRatio: 16 / 9,
    imageSize: 996,
    showImage: true
  };

  return (
    <Link url={url} onPress={onPress}>
      <View style={[styles.container, style]}>
        <Card {...cardProps} image={imageUri ? { uri: imageUri } : null}>
          <ArticleSummary
            label={label}
            headline={headline}
            text={summary}
            date={publishedTime}
            publication={publicationName}
            showPublication={false}
          />
        </Card>
      </View>
    </Link>
  );
};

export default RelatedArticles;
