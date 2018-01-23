import React from "react";
import get from "lodash.get";
import PropTypes from "prop-types";
import { StyleSheet, Text, View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";
import { treePropType } from "@times-components/markup";
import Card from "@times-components/card";
import Link from "@times-components/link";
import ArticleSummary from "@times-components/article-summary";
import SharedStyles from "./styles/shared";

const styles = StyleSheet.create(SharedStyles);

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

  const bylineText = get(byline[0], "children[0].attributes.value") || "";

  const ResponsiveHeadline = withResponsiveStyles(Text, {
    base: () => `
      font-size: 22px;
      line-height: 22px;
    `,
    mediumUp: () => `
      font-size: 30px;
      line-height: 30px;
    `
  });

  return (
    <Link url={url} onPress={onPress}>
      <View style={styles.cardContainer}>
        <Card {...cardProps} image={imageUri ? { uri: imageUri } : null}>
          <ArticleSummary
            byline={bylineText}
            date={publishedTime}
            headline={headline}
            responsiveHeadline={ResponsiveHeadline}
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
