import React from "react";
import { Text } from "react-native";
import get from "lodash.get";
import ArticleSummary, {
  ArticleSummaryContent
} from "@times-components/article-summary";
import Image from "@times-components/image";
import Link from "@times-components/link";
import { colours } from "@times-components/styleguide";
import relatedArticleItemPropTypes from "./related-article-item-proptypes";
import styles from "./styles";

const RelatedArticleItem = ({
  article,
  onPress,
  showSummaryContent,
  headlineContainer: HeadlineContainer,
  imageContainer: ImageContainer,
  relatedArticleContainer: RelatedArticleContainer,
  summaryContainer: SummaryContainer
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
      <RelatedArticleContainer>
        {imageUri && (
          <ImageContainer>
            <Image uri={`${imageUri}&resize=996`} aspectRatio={16 / 9} />
          </ImageContainer>
        )}
        <SummaryContainer>
          <ArticleSummary
            bylineProps={{ ast: byline }}
            content={() =>
              showSummaryContent && <ArticleSummaryContent ast={summary} />
            }
            datePublicationProps={{ date: publishedTime }}
            headline={() => (
              <HeadlineContainer>
                <Text
                  accessibilityRole="heading"
                  aria-level="3"
                  style={styles.headline}
                >
                  {headline}
                </Text>
              </HeadlineContainer>
            )}
            labelProps={{
              color: colours.section[section] || colours.section.default,
              title: label
            }}
          />
        </SummaryContainer>
      </RelatedArticleContainer>
    </Link>
  );
};

RelatedArticleItem.propTypes = relatedArticleItemPropTypes;

export default RelatedArticleItem;
