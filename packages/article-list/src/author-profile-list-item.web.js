import React, { Fragment } from "react";
import ArticleSummary, {
  ArticleSummaryHeadline,
  ArticleSummaryContent
} from "@times-components/article-summary";
import Card from "@times-components/card";
import Link from "@times-components/link";
import { colours } from "@times-components/styleguide";
import authorProfileListItemTrackingEvents from "./author-profile-list-item-tracking-events";
import { propTypes, defaultProps } from "./author-profile-list-item-prop-types";
import getImageUri from "./utils";
import {
  ListItemWrapper,
  ListItemLongText,
  ListItemShortText
} from "./styles/responsive";

const AuthorProfileListItem = item => {
  const {
    headline,
    imageRatio,
    imageSize,
    isLoading,
    label,
    longSummary,
    onPress,
    publicationName,
    publishedTime,
    shortSummary,
    showImage,
    summary,
    url
  } = item;

  const imageUri = getImageUri(item);

  if (isLoading) {
    return (
      <ListItemWrapper>
        <Card
          contentContainerClass="authorProfileContent"
          imageContainerClass="authorProfileImage"
          imageRatio={imageRatio}
          isLoading={isLoading}
          showImage={showImage}
        />
      </ListItemWrapper>
    );
  }

  const childProps = {
    datePublicationProps: {
      date: publishedTime,
      publication: publicationName
    },
    headline: () => <ArticleSummaryHeadline headline={headline} />,
    labelProps: {
      title: label,
      color: colours.functional.primary
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
    <Link url={url} onPress={onPress}>
      <ListItemWrapper>
        <Card
          contentContainerClass="authorProfileContent"
          image={imageUri ? { uri: imageUri } : null}
          imageContainerClass="authorProfileImage"
          imageRatio={imageRatio}
          imageSize={imageSize}
          isLoading={isLoading}
          showImage={showImage}
        >
          {children}
        </Card>
      </ListItemWrapper>
    </Link>
  );
};

AuthorProfileListItem.propTypes = propTypes;
AuthorProfileListItem.defaultProps = defaultProps;

export default authorProfileListItemTrackingEvents(AuthorProfileListItem);
