import React from "react";
import get from "lodash.get";
import PropTypes from "prop-types";
import { StyleSheet, Text, View } from "react-native";
import { treePropType } from "@times-components/markup";
import Card from "@times-components/card";
import Link from "@times-components/link";
import ArticleSummary, {
  ArticleSummaryContent
} from "@times-components/article-summary";
import { ResponsiveHeadline } from "./styles/responsive";
import SharedStyles from "./styles/shared";

const styles = StyleSheet.create(SharedStyles);

const SliceContent = ({ item }) => {
  const {
    byline,
    label,
    headline,
    onPress,
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
            bylineProps={{ ast: byline }}
            datePublicationProps={{ date: publishedTime }}
            headline={() => (
              <ResponsiveHeadline>
                <Text style={styles.headline}>{headline}</Text>
              </ResponsiveHeadline>
            )}
            labelProps={{ title: label, color: "#333333" }}
            content={() => <ArticleSummaryContent ast={summary} />}
          />
        </Card>
      </View>
    </Link>
  );
};

SliceContent.propTypes = {
  item: PropTypes.shape({
    byline: PropTypes.arrayOf(treePropType),
    headline: PropTypes.string,
    label: PropTypes.string,
    onPress: PropTypes.func,
    publishedTime: PropTypes.string,
    summary: PropTypes.arrayOf(treePropType),
    url: PropTypes.string
  }).isRequired
};

export default SliceContent;
