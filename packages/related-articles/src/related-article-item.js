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
} from "./related-article-item-prop-types";
import styles from "./styles";

const RelatedArticleItem = ({
  article,
  bylineClass,
  contentContainerClass,
  headlineClass,
  imageConfig,
  imageContainerClass,
  isOpinionByline,
  isReversed,
  onPress,
  showImage,
  showSummary,
  summaryConfig
}) => {
  const { byline, headline, label, publishedTime, section, url } = article;
  const {
    lengths: summaryLengths = [],
    style: summaryStyle = {},
    type: summaryType
  } = summaryConfig;
  const {
    cropSize = "169",
    imageRatio = 16 / 9,
    style: imageStyle = {}
  } = imageConfig;

  return (
    <Link url={url} onPress={e => onPress(e, { url: article.url })}>
      <Card
        contentContainerClass={contentContainerClass}
        imageContainerClass={imageContainerClass}
        image={{ uri: get(article, `leadAsset.crop${cropSize}.url`) }}
        imageRatio={imageRatio}
        imageStyle={imageStyle}
        isReversed={isReversed}
        showImage={showImage}
      >
        <ArticleSummary
          bylineProps={{
            ast: byline,
            bylineClass,
            bylineStyle: isOpinionByline ? styles.opinionByline : styles.byline,
            colour: colours.section[section] || colours.section.default,
            isOpinionByline
          }}
          content={() =>
            showSummary && (
              <View style={summaryStyle}>
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
          datePublicationProps={{ date: publishedTime, showDay: false }}
          headline={() => (
            <ArticleSummaryHeadline
              className={headlineClass}
              headline={headline}
              style={styles.headline}
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
