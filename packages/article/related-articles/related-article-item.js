import React from "react";
import { View } from "react-native";
import get from "lodash.get";
import ArticleSummary, {
  ArticleSummaryContent,
  ArticleSummaryHeadline
} from "@times-components/article-summary";
import Card from "@times-components/card";
import Link from "@times-components/link";
import { colours } from "@times-components/styleguide";
import {
  relatedArticleItemPropTypes,
  relatedArticleItemDefaultProps
} from "./related-article-item-proptypes";
import styles from "./styles";

const RelatedArticleItem = ({
  article,
  contentContainerClass,
  headlineClass,
  imageContainerClass,
  onPress,
  showImage,
  showSummary,
  summaryClass,
  summaryConfig
}) => {
  const {
    byline,
    headline,
    label,
    publishedTime,
    section,
    summary105,
    summary125,
    summary145,
    summary160,
    summary175,
    summary225,
    url
  } = article;

  const imageUri = get(
    article,
    "leadAsset.crop.url",
    get(article, "leadAsset.posterImage.crop.url", null)
  );

  return (
    <Link url={url} onPress={onPress}>
      <Card
        contentContainerClass={contentContainerClass}
        imageContainerClass={imageContainerClass}
        image={imageUri ? { uri: imageUri } : null}
        imageRatio={16 / 9}
        imageSize={996}
        showImage={showImage}
      >
        <ArticleSummary
          bylineProps={{ ast: byline }}
          content={() =>
            showSummary && (
              <View>
                <ArticleSummaryContent className={summaryClass} ast={summary105} />
                <ArticleSummaryContent className={summaryClass} ast={summary125} />
                <ArticleSummaryContent className={summaryClass} ast={summary145} />
                <ArticleSummaryContent className={summaryClass} ast={summary160} />
                <ArticleSummaryContent className={summaryClass} ast={summary175} />
                <ArticleSummaryContent className={summaryClass} ast={summary225} />
              </View>
            )
          }
          datePublicationProps={{ date: publishedTime }}
          headline={() => (
            <ArticleSummaryHeadline
              className={headlineClass}
              style={styles.headline}
              headline={headline}
            />
          )}
          labelProps={{
            color: colours.section[section] || colours.section.default,
            title: label
          }}
        />
      </Card>
    </Link>
  );
};

RelatedArticleItem.propTypes = relatedArticleItemPropTypes;
RelatedArticleItem.defaultProps = relatedArticleItemDefaultProps;

export default RelatedArticleItem;
