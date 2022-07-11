import React, { Fragment } from "react";
import ArticleSummary, {
  ArticleSummaryHeadline,
  ArticleSummaryContent
} from "@times-components/article-summary";
import Card from "@times-components/card";
import Context from "@times-components/context";
import Link from "@times-components/link";
import { Animations, colours } from "@times-components/ts-styleguide";
import articleListItemTrackingEvents from "./article-list-item-tracking-events";
import { propTypes, defaultProps } from "./article-list-item-prop-types";
import { getImageUri, getHeadline } from "./utils";

import {
  ListItemWrapper,
  ListItemLongText,
  ListItemShortText
} from "./styles/responsive";

const ArticleListItem = props => {
  const {
    article,
    fadeImageIn,
    highResSize,
    imageRatio,
    isLoading,
    lowResQuality,
    lowResSize,
    showImage
  } = props;

  const {
    bylines,
    hasVideo,
    headline,
    label,
    leadAsset,
    longSummary,
    publicationName,
    publishedTime,
    section,
    shortHeadline,
    shortSummary,
    summary
  } = article || {};

  const imageUri = getImageUri(article);
  const imageAccessibilityLabel = (leadAsset && leadAsset.caption) || "";

  if (isLoading) {
    return (
      <ListItemWrapper>
        <Card
          contentContainerClass="articleListContent"
          imageContainerClass="articleListImage"
          imageRatio={imageRatio}
          isLoading={isLoading}
          showImage={showImage}
        />
      </ListItemWrapper>
    );
  }

  const childProps = {
    bylineProps: bylines
      ? {
          ast: bylines,
          color: colours.section.default
        }
      : null,
    datePublicationProps: {
      date: publishedTime,
      publication: publicationName
    },
    headline: (
      <ArticleSummaryHeadline headline={getHeadline(headline, shortHeadline)} />
    ),
    labelProps: {
      color: colours.section[section] || colours.section.default,
      isVideo: hasVideo,
      title: label
    }
  };

  const children = showImage ? (
    <ArticleSummary
      {...childProps}
      content={<ArticleSummaryContent ast={summary} />}
    />
  ) : (
    <Fragment>
      <ListItemLongText>
        <ArticleSummary
          {...childProps}
          content={<ArticleSummaryContent ast={longSummary} />}
        />
      </ListItemLongText>
      <ListItemShortText>
        <ArticleSummary
          {...childProps}
          content={<ArticleSummaryContent ast={shortSummary} />}
        />
      </ListItemShortText>
    </Fragment>
  );

  return (
    <Context.Consumer>
      {({ makeArticleUrl }) => {
        const canonicalUrl = makeArticleUrl(props.article);

        return (
          <Link url={canonicalUrl}>
            <ListItemWrapper>
              <Card
                contentContainerClass="articleListContent"
                fadeImageIn={fadeImageIn}
                highResSize={highResSize}
                imageAccessibilityLabel={imageAccessibilityLabel}
                imageContainerClass="articleListImage"
                imageRatio={imageRatio}
                imageUri={imageUri}
                isLoading={isLoading}
                lowResQuality={lowResQuality}
                lowResSize={lowResSize}
                showImage={showImage}
              >
                <Animations.FadeIn>{children}</Animations.FadeIn>
              </Card>
            </ListItemWrapper>
          </Link>
        );
      }}
    </Context.Consumer>
  );
};

ArticleListItem.propTypes = propTypes;
ArticleListItem.defaultProps = defaultProps;

export default articleListItemTrackingEvents(ArticleListItem);
