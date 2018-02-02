import React from "react";
import get from "lodash.get";
import { StyleSheet, View } from "react-native";
import ArticleSummary from "@times-components/article-summary";
import Image from "@times-components/image";
import Link from "@times-components/link";
import withResponsiveStyles from "@times-components/responsive-styles";
import { propTypesItem } from "./proptypes";

const RelatedArticleContainer = withResponsiveStyles(View, {
  base: () => `
    border-style: solid;
    border-bottom-color: #dbdbdb;
    border-bottom-width: ${StyleSheet.hairlineWidth}px;
    display: flex;
    flex-direction: column;
    padding-bottom: 10px;
    padding-top: 10px;
  `,
  mediumUp: () => `
    flex-direction: row;
  `
});

const ImageContainer = withResponsiveStyles(View, {
  base: () => `
    flex-grow: 1;
    margin-bottom: 10px;
  `,
  mediumUp: () => `
    flex-grow: 2;
    flex-basis: 0;
    margin-bottom: 0;
  `
});

const SummaryContainer = withResponsiveStyles(View, {
  base: () => `
    flex-grow: 1;
  `,
  mediumUp: () => `
    padding-left: 15px;
    flex-grow: 2.7;
    flex-basis: 0 !important;
  `
});

const RelatedArticleItem = ({ article, onPress }) => {
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
      <RelatedArticleContainer>
        {imageUri ? (
          <ImageContainer>
            <Image uri={`${imageUri}&resize=996`} aspectRatio={16 / 9} />
          </ImageContainer>
        ) : null}
        <SummaryContainer>
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
        </SummaryContainer>
      </RelatedArticleContainer>
    </Link>
  );
};

RelatedArticleItem.propTypes = propTypesItem;

export default RelatedArticleItem;
