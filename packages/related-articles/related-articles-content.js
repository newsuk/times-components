import React from "react";
import get from "lodash.get";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";
import { treePropType } from "@times-components/markup";
import Card from "@times-components/card";
import Link from "@times-components/link";
import ArticleSummary from "@times-components/article-summary";

const styles = StyleSheet.create({
  cardContainer: {
    paddingBottom: 10,
    paddingTop: 10
  }
});

const RelatedArticlesContent = ({ item }) => {
  const {
    byline,
    label,
    headline,
    onPress,
    publicationName,
    publishedTime,
    summary125,
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
            text={summary125}
          />
        </Card>
      </View>
    </Link>
  );
};

RelatedArticlesContent.propTypes = {
  item: PropTypes.shape({
    byline: PropTypes.arrayOf(treePropType),
    headline: PropTypes.string,
    label: PropTypes.string,
    onPress: PropTypes.func,
    publicationName: PropTypes.string,
    publishedTime: PropTypes.string,
    summary: PropTypes.arrayOf(treePropType),
    url: PropTypes.string
  }).isRequired
};

export default RelatedArticlesContent;
