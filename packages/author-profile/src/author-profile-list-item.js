import React from "react";
import { StyleSheet, View } from "react-native";
import Card from "@times-components/card";
import Link from "@times-components/link";
import { colours, spacing } from "@times-components/styleguide";
import ArticleSummary, {
  ArticleSummaryHeadline,
  ArticleSummaryContent
} from "@times-components/article-summary";
import authorProfileItemTrackingEvents from "./author-profile-item-tracking-events";
import getImageUri from "./utils";

const styles = StyleSheet.create({
  container: {
    paddingBottom: spacing(3),
    paddingTop: spacing(3)
  }
});

const AuthorProfileListItem = item => {
  const {
    style,
    summary,
    shortSummary,
    label,
    isLoading,
    onPress,
    publicationName,
    publishedTime,
    headline,
    url,
    imageRatio,
    showImage
  } = item;

  const imageUri = getImageUri(item);

  if (isLoading) {
    return (
      <View style={[styles.container, style]}>
        <Card
          isLoading={isLoading}
          imageRatio={imageRatio}
          showImage={showImage}
        />
      </View>
    );
  }

  const content = showImage ? summary : shortSummary;

  return (
    <Link url={url} onPress={onPress}>
      <View style={[styles.container, style]}>
        <Card
          image={imageUri ? { uri: imageUri } : null}
          imageRatio={imageRatio}
          showImage={showImage}
        >
          <ArticleSummary
            labelProps={{
              title: label,
              color: colours.functional.primary
            }}
            headline={() => <ArticleSummaryHeadline headline={headline} />}
            content={() => <ArticleSummaryContent ast={content} />}
            datePublicationProps={{
              date: publishedTime,
              publication: publicationName
            }}
          />
        </Card>
      </View>
    </Link>
  );
};

export default authorProfileItemTrackingEvents(AuthorProfileListItem);
