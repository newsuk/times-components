import React from "react";
import { View } from "react-native";
import ArticleSummary, {
  ArticleSummaryHeadline,
  ArticleSummaryContent
} from "@times-components/article-summary";
import Card from "@times-components/card";
import Link from "@times-components/link";
import { colours } from "@times-components/styleguide";
import authorProfileListItemTrackingEvents from "./author-profile-list-item-tracking-events";
import getImageUri from "./utils";
import styles from "./styles";

const AuthorProfileListItem = item => {
  const {
    headline,
    imageRatio,
    isLoading,
    label,
    onPress,
    publicationName,
    publishedTime,
    shortSummary,
    showImage,
    summary,
    style,
    url
  } = item;

  const imageUri = getImageUri(item);

  if (isLoading) {
    return (
      <View style={[styles.listItemContainer, style]}>
        <Card
          imageRatio={imageRatio}
          isLoading={isLoading}
          showImage={showImage}
        />
      </View>
    );
  }

  const content = showImage ? summary : shortSummary;

  return (
    <Link url={url} onPress={onPress}>
      <View style={[styles.listItemContainer, style]}>
        <Card
          image={imageUri ? { uri: imageUri } : null}
          imageRatio={imageRatio}
          showImage={showImage}
        >
          <ArticleSummary
            content={() => <ArticleSummaryContent ast={content} />}
            datePublicationProps={{
              date: publishedTime,
              publication: publicationName
            }}
            headline={() => <ArticleSummaryHeadline headline={headline} />}
            labelProps={{
              title: label,
              color: colours.functional.primary
            }}
          />
        </Card>
      </View>
    </Link>
  );
};

export default authorProfileListItemTrackingEvents(AuthorProfileListItem);
