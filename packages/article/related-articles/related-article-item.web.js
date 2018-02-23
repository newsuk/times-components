import React from "react";
import { Text } from "react-native";
import get from "lodash.get";
import ArticleSummary, {
  ArticleSummaryContent
} from "@times-components/article-summary";
import Image from "@times-components/image";
import Link from "@times-components/link";
import { colours } from "@times-components/styleguide";
import { relatedArticleItemPropTypes } from "./proptypes";
import styles from "./styles";
import { ResponsiveHeadline } from "./styles/responsive";

const RelatedArticleItem = ({
  article,
  onPress,
  styledRelatedArticleContainer: StyledRelatedArticleContainer,
  styledImageContainer: StyledImageContainer,
  styledSummaryContainer: StyledSummaryContainer
}) => {
  const {
    byline,
    label,
    headline,
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
      <StyledRelatedArticleContainer>
        {imageUri ? (
          <StyledImageContainer>
            <Image uri={`${imageUri}&resize=996`} aspectRatio={16 / 9} />
          </StyledImageContainer>
        ) : null}
        <StyledSummaryContainer>
          <ArticleSummary
            bylineProps={{ ast: byline }}
            datePublicationProps={{ date: publishedTime }}
            headline={() => (
              <ResponsiveHeadline>
                <Text
                  accessibilityRole="heading"
                  aria-level="3"
                  style={styles.headline}
                >
                  {headline}
                </Text>
              </ResponsiveHeadline>
            )}
            labelProps={{
              title: label,
              color: colours.section[section] || colours.section.default
            }}
            content={() => <ArticleSummaryContent ast={summary} />}
          />
        </StyledSummaryContainer>
      </StyledRelatedArticleContainer>
    </Link>
  );
};

RelatedArticleItem.propTypes = relatedArticleItemPropTypes;

export default RelatedArticleItem;
