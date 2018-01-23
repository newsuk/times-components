import React from "react";
import get from "lodash.get";
import { StyleSheet, View } from "react-native";
import Card from "@times-components/card";
import Link from "@times-components/link";
import { withTrackEvents } from "@times-components/tracking";
import ArticleSummary from "@times-components/article-summary";

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
    paddingTop: 10
  }
});

const AuthorProfileItem = item => {
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
    imageSize,
    showImage
  } = item;

  const imageUri = get(
    item,
    "leadAsset.crop.url",
    get(item, "leadAsset.posterImage.crop.url", null)
  );

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

  return (
    <Link url={url} onPress={onPress}>
      <View style={[styles.container, style]}>
        <Card
          image={imageUri ? { uri: imageUri } : null}
          imageRatio={imageRatio}
          imageSize={imageSize}
          showImage={showImage}
        >
          <ArticleSummary
            label={label}
            headline={headline}
            text={showImage ? summary : shortSummary}
            date={publishedTime}
            publication={publicationName}
          />
        </Card>
      </View>
    </Link>
  );
};

export default withTrackEvents(AuthorProfileItem, {
  analyticsEvents: [
    {
      eventName: "onPress",
      actionName: "Pressed",
      trackingName: "AuthorProfileItem",
      getAttrs: ({ headline, id }) => ({
        articleHeadline: headline,
        articleId: id
      })
    }
  ]
});
