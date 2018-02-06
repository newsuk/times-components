import React from "react";
import get from "lodash.get";
import { StyleSheet, View } from "react-native";
import ArticleSummary from "@times-components/article-summary";
import Card from "@times-components/card";
import Link from "@times-components/link";
import { propTypesItem } from "./proptypes";

const styles = StyleSheet.create({
  cardContainer: {
    paddingBottom: 10,
    paddingTop: 10
  }
});

const RelatedArticleItem = ({ item }) => {
  if (!item) return null;
  const {
    byline,
    label,
    headline,
    onPress,
    publicationName,
    publishedTime,
    summary,
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
      <View style={styles.cardContainer}>
        <Card {...cardProps} image={imageUri ? { uri: imageUri } : null}>
          <ArticleSummary
            byline={byline}
            date={publishedTime}
            headline={headline}
            hasResponsiveHeadline
            label={label}
            publication={publicationName}
            showPublication={false}
            text={summary}
          />
        </Card>
      </View>
    </Link>
  );
};

RelatedArticleItem.propTypes = propTypesItem;

export default RelatedArticleItem;
