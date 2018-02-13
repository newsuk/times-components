import React from "react";
import get from "lodash.get";
import { View } from "react-native";
import ArticleSummary, {
  ArticleSummaryHeadline,
  ArticleSummaryContent
} from "@times-components/article-summary";
import Image from "@times-components/image";
import Link from "@times-components/link";
import { relatedArticleItemPropTypes } from "./proptypes";
import styles from "./styles";

const RelatedArticleItem = ({ article, onPress }) => {
  const { byline, label, headline, publishedTime, summary, url } = article;

  const imageUri = get(
    article,
    "leadAsset.crop.url",
    get(article, "leadAsset.posterImage.crop.url", null)
  );

  return (
    <Link url={url} onPress={onPress}>
      <View style={styles.container}>
        {imageUri ? (
          <View style={styles.imageContainer}>
            <Image uri={`${imageUri}&resize=996`} aspectRatio={16 / 9} />
          </View>
        ) : null}
        <ArticleSummary
          bylineProps={{ ast: byline }}
          datePublicationProps={{ date: publishedTime }}
          headline={() => <ArticleSummaryHeadline headline={headline} />}
          labelProps={{ title: label, color: "#333333" }}
          content={() => <ArticleSummaryContent ast={summary} />}
        />
      </View>
    </Link>
  );
};

RelatedArticleItem.propTypes = relatedArticleItemPropTypes;

export default RelatedArticleItem;
