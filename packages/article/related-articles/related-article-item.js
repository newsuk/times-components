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
  summaryConfig
}) => {
  const { byline, headline, label, publishedTime, section, url } = article;
  const { lengths: summaryLengths = [], type: summaryType } = summaryConfig;

  const imageUri = get(
    article,
    "leadAsset.crop169.url",
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
                {summaryLengths.map(item => {
                  const summaryClassSuffix = `${item}Class`;
                  const summaryClass = summaryType
                    ? `${summaryType}Summary`
                    : `summary`;
                  return (
                    <ArticleSummaryContent
                      ast={article[`summary${item}`]}
                      className={`summaryHidden ${summaryClass}${
                        summaryClassSuffix
                      }`}
                      key={item}
                    />
                  );
                })}
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
