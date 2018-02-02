import React from "react";
import get from "lodash.get";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";
import { treePropType } from "@times-components/markup";
import Card from "@times-components/card";
import Link from "@times-components/link";
import ArticleSummary, {
  ArticleSummaryHeadline,
  renderAst
} from "@times-components/article-summary";

import ArticleLabel from "@times-components/article-label";
import ArticleByline from "@times-components/article-byline";
import DatePublication from "@times-components/date-publication";

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

  const Label = label
    ? () => <ArticleLabel title={label} color="#333333" />
    : null;
  const Byline = byline ? () => <ArticleByline ast={byline} /> : null;

  return (
    <Link url={url} onPress={onPress}>
      <View style={styles.cardContainer}>
        <Card {...cardProps} image={imageUri ? { uri: imageUri } : null}>
          <ArticleSummary
            Byline={Byline}
            DatePublication={() => <DatePublication date={publishedTime} />}
            Headline={() => <ArticleSummaryHeadline headline={headline} />}
            Label={Label}
            summaryText={() => renderAst(summary)}
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

