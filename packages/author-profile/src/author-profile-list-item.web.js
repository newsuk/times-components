import React, { Fragment } from "react";
import { StyleSheet, View } from "react-native";
import ArticleSummary, {
  ArticleSummaryHeadline,
  ArticleSummaryContent
} from "@times-components/article-summary";
import Card from "@times-components/card";
import Link from "@times-components/link";
import withResponsiveStyles from "@times-components/responsive-styles";
import { colours, spacing } from "@times-components/styleguide";
import authorProfileItemTrackingEvents from "./author-profile-item-tracking-events";
import getImageUri from "./utils";

const CardWrapper = withResponsiveStyles(View, {
  mediumUp: () => `
    .authorProfileImage {
      flex: 2;
      margin-bottom: 0;
      max-width: 285px;
      min-width: auto;
      padding-right: ${spacing(3)};
    }
    .authorProfileContent {
      flex: 2.7;
      flex-basis: 0 !important;
      min-width: 380px;
    }
  `
});

const LongText = withResponsiveStyles(View, {
  base: () => "display: none;",
  mediumUp: () => `display: block; padding-left: ${spacing(3)};`
});

const ShortText = withResponsiveStyles(View, {
  base: () => "display: block;",
  mediumUp: () => "display: none;"
});

const styles = StyleSheet.create({
  container: {
    paddingBottom: spacing(3),
    paddingTop: spacing(3)
  }
});

const AuthorProfileItem = item => {
  const {
    style,
    summary,
    shortSummary,
    longSummary,
    label,
    isLoading,
    onPress,
    publicationName,
    publishedTime,
    headline,
    url,
    imageRatio,
    imageSize,
    showImage
  } = item;

  const imageUri = getImageUri(item);

  if (isLoading) {
    return (
      <View style={[styles.container, style]}>
        <CardWrapper>
          <Card
            contentContainerClass="authorProfileContent"
            imageContainerClass="authorProfileImage"
            imageRatio={imageRatio}
            isLoading={isLoading}
            showImage={showImage}
          />
        </CardWrapper>
      </View>
    );
  }

  const childProps = {
    labelProps: {
      title: label,
      color: colours.functional.primary
    },
    headline: () => <ArticleSummaryHeadline headline={headline} />,
    datePublicationProps: {
      date: publishedTime,
      publication: publicationName
    }
  };

  const children = showImage ? (
    <ArticleSummary
      {...childProps}
      content={() => <ArticleSummaryContent ast={summary} />}
    />
  ) : (
    <Fragment>
      <LongText>
        <ArticleSummary
          {...childProps}
          content={() => <ArticleSummaryContent ast={longSummary} />}
        />
      </LongText>
      <ShortText>
        <ArticleSummary
          {...childProps}
          content={() => <ArticleSummaryContent ast={shortSummary} />}
        />
      </ShortText>
    </Fragment>
  );

  return (
    <Link url={url} onPress={onPress}>
      <View style={[styles.container, style]}>
        <CardWrapper>
          <Card
            contentContainerClass="authorProfileContent"
            imageContainerClass="authorProfileImage"
            image={imageUri ? { uri: imageUri } : null}
            imageRatio={imageRatio}
            imageSize={imageSize}
            showImage={showImage}
          >
            {children}
          </Card>
        </CardWrapper>
      </View>
    </Link>
  );
};

export default authorProfileItemTrackingEvents(AuthorProfileItem);
