import React, { Fragment } from "react";
import ArticleSummary, {
  ArticleSummaryHeadline,
  ArticleSummaryContent
} from "@times-components/article-summary";
import Card from "@times-components/card";
import Link from "@times-components/link";
import { Animations, colours } from "@times-components/styleguide";
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
    byline,
    fadeImageIn,
    hasVideo,
    headline,
    highResSize,
    imageRatio,
    isLoading,
    label,
    lowResSize,
    longSummary,
    publicationName,
    publishedTime,
    section,
    shortHeadline,
    shortSummary,
    showImage,
    summary,
    url
  } = props;

  const imageUri = getImageUri(props);

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
    bylineProps: byline
      ? {
          ast: byline,
          color: colours.section.default
        }
      : null,
    datePublicationProps: {
      date: publishedTime,
      publication: publicationName
    },
    headline: () => (
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
      content={() => <ArticleSummaryContent ast={summary} />}
    />
  ) : (
    <Fragment>
      <ListItemLongText>
        <ArticleSummary
          {...childProps}
          content={() => <ArticleSummaryContent ast={longSummary} />}
        />
      </ListItemLongText>
      <ListItemShortText>
        <ArticleSummary
          {...childProps}
          content={() => <ArticleSummaryContent ast={shortSummary} />}
        />
      </ListItemShortText>
    </Fragment>
  );

  return (
    <Link url={url}>
      <ListItemWrapper>
        <Card
          contentContainerClass="articleListContent"
          fadeImageIn={fadeImageIn}
          highResSize={highResSize}
          imageContainerClass="articleListImage"
          imageRatio={imageRatio}
          imageUri={imageUri}
          isLoading={isLoading}
          lowResSize={lowResSize}
          showImage={showImage}
        >
          <Animations.FadeIn>{children}</Animations.FadeIn>
        </Card>
      </ListItemWrapper>
    </Link>
  );
};

ArticleListItem.propTypes = propTypes;
ArticleListItem.defaultProps = defaultProps;

export default articleListItemTrackingEvents(ArticleListItem);
