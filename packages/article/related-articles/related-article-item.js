import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import get from "lodash.get";
import ArticleSummary, {
  ArticleSummaryHeadline,
  ArticleSummaryContent
} from "@times-components/article-summary";
import Image from "@times-components/image";
import Link from "@times-components/link";
import { colours } from "@times-components/styleguide";
import relatedArticleItemPropTypes from "./related-article-item-proptypes";
import styles from "./styles";

const RelatedArticleItem = ({
  article,
  hideImage,
  hideSummaryContent,
  onPress
}) => {
  const {
    byline,
    headline,
    label,
    publishedTime,
    section,
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
      <View>
        {imageUri &&
          !hideImage && (
            <View style={styles.imageContainer}>
              <Image uri={`${imageUri}&resize=996`} aspectRatio={16 / 9} />
            </View>
          )}
        <ArticleSummary
          bylineProps={{ ast: byline }}
          content={() =>
            hideSummaryContent ? null : <ArticleSummaryContent ast={summary} />
          }
          datePublicationProps={{ date: publishedTime }}
          headline={() => <ArticleSummaryHeadline headline={headline} />}
          labelProps={{
            title: label,
            color: colours.section[section] || colours.section.default
          }}
        />
      </View>
    </Link>
  );
};

RelatedArticleItem.propTypes = {
  ...relatedArticleItemPropTypes,
  hideImage: PropTypes.bool.isRequired
};

export default RelatedArticleItem;
