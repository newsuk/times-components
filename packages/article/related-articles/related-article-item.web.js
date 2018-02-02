import React from "react";
import get from "lodash.get";
import ArticleSummary from "@times-components/article-summary";
import Image from "@times-components/image";
import Link from "@times-components/link";
import {
  RelatedArticleContainer,
  ImageContainer,
  SummaryContainer
} from "./styles/responsive";
import { propTypesItem } from "./proptypes";

const RelatedArticleItem = ({ article, articleCount, onPress }) => {
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

  // @TODO: pass these in to ensure items are agnostic of articles.length
  const StyledRelatedArticleContainer = RelatedArticleContainer(articleCount);
  const StyledImageContainer = ImageContainer(articleCount);
  const StyledSummaryContainer = SummaryContainer(articleCount);

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

RelatedArticleItem.propTypes = propTypesItem;

export default RelatedArticleItem;
