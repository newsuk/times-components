import React from "react";
import get from "lodash.get";
import { StyleSheet, View } from "react-native";
import ArticleSummary from "@times-components/article-summary";
import Image from "@times-components/image";
import Link from "@times-components/link";
import { propTypesItem } from "./proptypes";

const styles = StyleSheet.create({
  container: {
    borderStyle: "solid",
    borderBottomColor: "#dbdbdb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: 10,
    paddingTop: 10
  }
});

const RelatedArticleItem = ({ article, onPress }) => {
  if (!article) return null;
  const {
    byline,
    label,
    headline,
    publicationName,
    publishedTime,
    summary,
    url
  } = article;

  const imageUri = get(
    article,
    "leadAsset.crop.url",
    get(article, "leadAsset.posterImage.crop.url", null)
  );

  return (
    <Link url={url} onPress={onPress}>
      <View style={styles.container}>
        {imageUri ? (
          <View style={{ marginBottom: 10 }}>
            <Image uri={`${imageUri}&resize=996`} aspectRatio={16 / 9} />
          </View>
        ) : null}
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
      </View>
    </Link>
  );
};

RelatedArticleItem.propTypes = propTypesItem;

export default RelatedArticleItem;
