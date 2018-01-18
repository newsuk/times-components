import React from "react";
import get from "lodash.get";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";
import { treePropType } from "@times-components/markup";
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
    byline,
    label,
    headline,
    onPress,
    publicationName,
    publishedTime,
    style,
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

  const bylineText = get(byline[0], "children[0].attributes.value") || "";

  return (
    <Link url={url} onPress={onPress}>
      <View style={[styles.container, style]}>
        <Card {...cardProps} image={imageUri ? { uri: imageUri } : null}>
          <ArticleSummary
            byline={bylineText}
            date={publishedTime}
            headline={headline}
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

RelatedArticles.propTypes = {
  byline: PropTypes.arrayOf(treePropType),
  headline: PropTypes.string,
  label: PropTypes.string,
  onPress: PropTypes.func,
  publicationName: PropTypes.string,
  publishedTime: PropTypes.string,
  summary: PropTypes.arrayOf(treePropType),
  url: PropTypes.string
};

RelatedArticles.defaultProps = {
  byline: [],
  headline: "",
  label: "",
  onPress: () => {},
  publicationName: "",
  publishedTime: "",
  summary: [],
  url: ""
};

export default RelatedArticles;
