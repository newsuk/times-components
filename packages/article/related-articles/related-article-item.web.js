import React from "react";
import get from "lodash.get";
import ArticleSummary from "@times-components/article-summary";
import Image from "@times-components/image";
import Link from "@times-components/link";
import { relatedArticleItemPropTypes } from "./proptypes";

const RelatedArticleItem = ({
  article,
  onPress,
  styledRelatedArticleContainer: StyledRelatedArticleContainer,
  styledImageContainer: StyledImageContainer,
  styledSummaryContainer: StyledSummaryContainer
}) => {
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
      <StyledRelatedArticleContainer>
        {imageUri ? (
          <StyledImageContainer>
            <Image uri={`${imageUri}&resize=996`} aspectRatio={16 / 9} />
          </StyledImageContainer>
        ) : null}
        <StyledSummaryContainer>
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
        </StyledSummaryContainer>
      </StyledRelatedArticleContainer>
    </Link>
  );
};

RelatedArticleItem.propTypes = relatedArticleItemPropTypes;

export default RelatedArticleItem;
