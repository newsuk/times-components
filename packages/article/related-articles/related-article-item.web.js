import React from "react";
import get from "lodash.get";
import ArticleSummary, {
  ArticleSummaryContent
} from "@times-components/article-summary";
import Image from "@times-components/image";
import Link from "@times-components/link";
import sectionColours from "@times-components/styleguide";
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
    <StyledRelatedArticleContainer>
      {imageUri ? (
        <Link url={url} onPress={onPress}>
          <StyledImageContainer>
            <Image uri={`${imageUri}&resize=996`} aspectRatio={16 / 9} />
          </StyledImageContainer>
        </Link>
      ) : null}
      <StyledSummaryContainer>
        <ArticleSummary
          bylineProps={{ ast: byline, section }}
          datePublicationProps={{ date: publishedTime }}
          headline={() => (
            <Link url={url} onPress={onPress}>
              <ResponsiveHeadline
                accessibilityRole="heading"
                aria-level="3"
                style={styles.headline}
              >
                {headline}
              </ResponsiveHeadline>
            </Link>
          )}
          labelProps={{
            title: label,
            color: sectionColours[section] || sectionColours.default
          }}
          content={() => <ArticleSummaryContent ast={summary} />}
        />
      </StyledSummaryContainer>
    </StyledRelatedArticleContainer>
  );
};

RelatedArticleItem.propTypes = relatedArticleItemPropTypes;

export default RelatedArticleItem;
